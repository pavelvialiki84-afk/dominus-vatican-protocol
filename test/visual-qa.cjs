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
      await Promise.all(Array.from(document.querySelectorAll('.gallery img,.cast-film img,.dossier-portrait img')).map(async img=>{img.loading='eager';try{await img.decode();}catch(_e){}}));
      const box=el=>{const b=el.getBoundingClientRect();return {x:b.x,y:b.y,width:b.width,height:b.height,right:b.right,bottom:b.bottom}};
      const select=s=>Array.from(document.querySelectorAll(s)).map(box);
      const images=Array.from(document.querySelectorAll('.gallery img,.cast-film img,.dossier-portrait img'));
      return {viewport:innerWidth,documentWidth:document.documentElement.scrollWidth,gallery:select('.gallery > .visual'),cast:select('.cast-film > figure'),dossiers:select('.character-grid > article'),brokenImages:images.filter(i=>!i.complete||i.naturalWidth===0).map(i=>i.getAttribute('src')),imageSizes:images.map(i=>({src:i.getAttribute('src'),width:i.naturalWidth,height:i.naturalHeight})),styles: getComputedStyle(document.querySelector('.gallery')).gridTemplateColumns};
    });
    if(result.documentWidth>width+3)bad.push('Horizontal overflow '+result.documentWidth);
    if(result.gallery.length!==6)bad.push('Expected 6 gallery items, got '+result.gallery.length);
    if(result.cast.length!==3||result.dossiers.length!==3)bad.push('Character count mismatch');
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
    if(result.brokenImages.length)bad.push('Missing artwork: '+result.brokenImages.join(','));
    if(width===375||width===1440)await page.screenshot({path:'test/screenshots/'+filename.replace('.html','')+'-'+width+'.png',fullPage:true,timeout:20000});
    console.log(JSON.stringify({page:filename,width,status:bad.length?'FAIL':'PASS',columns:result.styles,galleryCount:result.gallery.length,documentWidth:result.documentWidth,brokenImages:result.brokenImages,issues:bad}));
    failures+=bad.length;
    await page.close();
  }
}
await browser.close();
if(failures){console.error('Responsive gallery audit failed, issues: '+failures);process.exit(1);}
console.log('PASS: all 18 EN/DE/FR viewport/image/layout checks.');
})().catch(e=>{console.error(e);process.exit(1)});
