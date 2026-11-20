(async()=>{const { chromium } = require('playwright');
const pages = ['index.html','dominus-band1-de.html','dominus-volume1-fr.html'];
const widths = [320,375,430,768,1024,1440];
const base='http://127.0.0.1:8765/';
const browser=await chromium.launch({headless:true,args:['--no-sandbox']});
let failures=0;
for(const filename of pages){
  for(const width of widths){
    const page=await browser.newPage({viewport:{width,height:900},deviceScaleFactor:1,reducedMotion:'reduce'});
    const bad=[];
    const response=await page.goto(base+filename,{waitUntil:'domcontentloaded',timeout:15000});
    if(!response||response.status()!==200)bad.push('HTTP status is not 200');
    const result=await page.evaluate(async()=>{
      await Promise.all(Array.from(document.querySelectorAll('.gallery img,.world-feature-card img,.cast-film img,.dossier-portrait img,.book-cover-image')).map(async img=>{img.loading='eager';try{await img.decode();}catch(_e){}}));
      const box=el=>{const b=el.getBoundingClientRect();return {x:b.x,y:b.y,width:b.width,height:b.height,right:b.right,bottom:b.bottom}};
      const select=s=>Array.from(document.querySelectorAll(s)).map(box);
      const images=Array.from(document.querySelectorAll('.gallery img,.cast-film img,.dossier-portrait img,.book-cover-image'));
      return {viewport:innerWidth,documentWidth:document.documentElement.scrollWidth,gallery:select('.gallery > .visual'),cast:select('.cast-film > figure'),dossiers:select('.character-grid > article'),brokenImages:images.filter(i=>!i.complete||i.naturalWidth===0).map(i=>i.getAttribute('src')),imageSizes:images.map(i=>({src:i.getAttribute('src'),width:i.naturalWidth,height:i.naturalHeight})),bookCover:select('.book-cover-image'),portraitSources:Array.from(document.querySelectorAll('.cast-film img,.dossier-portrait img')).map(i=>i.getAttribute('src')),sceneSources:Array.from(document.querySelectorAll('.gallery > .visual.illustrated img,.world-feature-card img')).map(i=>i.getAttribute('src')),allBuy:Array.from(document.querySelectorAll('a[href*="amazon."]')).map(a=>a.getAttribute('href')),heroBuy:Array.from(document.querySelectorAll('.hero .buttons a')).map(a=>a.getAttribute('href')),printBuy:Array.from(document.querySelectorAll('#edition .market a')).map(a=>a.getAttribute('href')),mobileBuy:document.querySelector('.mobile-buy-link')?.getAttribute('href'),navLanguages:Array.from(document.querySelectorAll('nav.lang a')).map(a=>a.getAttribute('href')),navVisible:Array.from(document.querySelectorAll('nav.toplinks a')).every(a=>getComputedStyle(a).display!=='none'&&a.getBoundingClientRect().height>0),email:!!document.querySelector('a[href="mailto:contact@dominusbooks.com"]'),canonical:document.querySelector('link[rel="canonical"]')?.href,styles: getComputedStyle(document.querySelector('.gallery')).gridTemplateColumns};
    });
    if(result.documentWidth>width+3)bad.push('Horizontal overflow '+result.documentWidth);
    const expectedGalleryCount=filename==='index.html'?3:6;
    if(result.gallery.length!==expectedGalleryCount)bad.push('Expected '+expectedGalleryCount+' gallery items, got '+result.gallery.length);
    const expectedDossierCount=filename==='index.html'?6:3;
    if(result.cast.length!==0||result.dossiers.length!==expectedDossierCount)bad.push('Unexpected cast strip or dossier count (expected '+expectedDossierCount+', cast '+result.cast.length+', dossier '+result.dossiers.length+')');
    for(const [selector,rects] of [['gallery',result.gallery],['cast',result.cast],['dossiers',result.dossiers]]){
      for(let i=0;i<rects.length;i++){
        let a=rects[i];if(a.width<35||a.height<35)bad.push(selector+' card too small '+i);
        if(a.x< -2||a.right>width+3)bad.push(selector+' item outside screen '+i);
        for(let j=i+1;j<rects.length;j++){
          let b=rects[j],dx=Math.min(a.right,b.right)-Math.max(a.x,b.x),dy=Math.min(a.bottom,b.bottom)-Math.max(a.y,b.y);
          if(dx>2&&dy>2)bad.push(selector+' overlapping cards '+i+'-'+j);
        }
      }
    }
    if(result.heroBuy.length<2)bad.push('Hero missing sample/purchase actions');
    if(result.navLanguages.length!==5)bad.push('Language navigation missing');
    if(!result.canonical?.startsWith('https://dominusbooks.com/'))bad.push('Wrong canonical domain');
    if(!result.navVisible)bad.push('Section navigation is hidden');
    if(!result.email)bad.push('Contact email link missing');
    if(filename==='index.html' && !result.allBuy.some(h=>h.includes('amazon.com/dp/B0HM4CLBZ2')))bad.push('English Kindle direct CTA missing from page');
    if(filename==='dominus-band1-de.html' && !result.heroBuy.some(h=>h.includes('amazon.de/dp/B0HRM5NLBY')))bad.push('German Kindle direct CTA missing');
    if(filename==='dominus-band1-de.html' && !result.printBuy?.some(h=>h.includes('amazon.de/dp/B0HRQMHRW4')))bad.push('Published German paperback link missing');
    if(filename==='dominus-band1-de.html' && !result.printBuy?.some(h=>h.includes('amazon.de/dp/B0HRQT4453')))bad.push('Published German hardcover link missing');
    if(filename==='dominus-volume1-fr.html' && !result.heroBuy.some(h=>h.includes('amazon.fr/dp/B0HRS1TDS6')))bad.push('Confirmed French Kindle direct CTA missing');
    if(filename==='dominus-volume1-fr.html' && !result.printBuy.some(h=>h.includes('amazon.fr/dp/B0HRSBN5VV')))bad.push('Confirmed French paperback direct CTA missing');
    if(width<=680 && !result.mobileBuy)bad.push('Mobile purchase CTA missing');
    const expectedPortraits=['portrait-salvatore-realistic.webp','portrait-rafael-realistic.webp','portrait-luiza-realistic.webp'];
    const actualPortraits=result.portraitSources.map(u=>u?.split('/').pop());
    if(JSON.stringify(actualPortraits)!==JSON.stringify(expectedPortraits))bad.push('Character portrait mismatch: '+actualPortraits.join(','));
    const expectedScenes=['scene-corridor-noir.webp','scene-archive-noir.webp','scene-ai-noir.webp'];
    const actualScenes=result.sceneSources.map(u=>u?.split('/').pop());
    if(JSON.stringify(actualScenes)!==JSON.stringify(expectedScenes))bad.push('Wrong illustrated scene sources: '+actualScenes.join(','));
    if(result.brokenImages.length)bad.push('Missing artwork: '+result.brokenImages.join(','));
    if(filename!=='index.html' && (result.bookCover.length!==1 || Math.abs(result.bookCover[0].width/result.bookCover[0].height-0.625)>.04))bad.push('Book cover is broken, cropped, or missing');
    if(width===375||width===1440)await page.screenshot({path:'test/screenshots/'+filename.replace('.html','')+'-'+width+'.png',fullPage:true,timeout:20000});
    console.log(JSON.stringify({page:filename,width,status:bad.length?'FAIL':'PASS',columns:result.styles,galleryCount:result.gallery.length,documentWidth:result.documentWidth,brokenImages:result.brokenImages,issues:bad}));
    failures+=bad.length;
    await page.close();
  }
}
await browser.close();
if(failures){console.error('Responsive gallery audit failed, issues: '+failures);process.exit(1);}
console.log('PASS: all 18 EN/DE/FR viewport/image/layout checks with page-specific gallery and real artwork.');
})().catch(e=>{console.error(e);process.exit(1)});

