(async()=>{
  const {chromium}=require('playwright');
  const pages=[['author.html','en'],['autor-de.html','de'],['auteur-fr.html','fr']];
  const widths=[320,375,430,768,1024,1440];
  const browser=await chromium.launch({headless:true,args:['--no-sandbox']});
  let failures=0;
  for(const [file,lang] of pages){
    for(const width of widths){
      const page=await browser.newPage({viewport:{width,height:900},reducedMotion:'reduce'});
      const issues=[];
      const resp=await page.goto('http://127.0.0.1:8765/'+file,{waitUntil:'load',timeout:16000});
      if(resp?.status()!==200)issues.push('HTTP status differs from 200');
      const state=await page.evaluate(async()=>{
        const image=document.querySelector('.author-cover img');
        await image?.decode().catch(()=>{});
        return {
          lang:document.documentElement.lang,
          viewport:innerWidth,
          width:document.documentElement.scrollWidth,
          title:document.title,
          headline:document.querySelector('.author-hero h1')?.textContent.trim(),
          canonical:document.querySelector('link[rel="canonical"]')?.getAttribute('href'),
          availableLang:Array.from(document.querySelectorAll('nav.lang a')).map(a=>a.textContent.trim()),
          editLinks:Array.from(document.querySelectorAll('.author-editions a')).map(a=>a.getAttribute('href')),
          imageLoaded:!!image?.naturalWidth,
          links:Array.from(document.querySelectorAll('a[href]')).filter(a=>!a.hasAttribute('href')||!a.getAttribute('href')),
          main:document.querySelectorAll('main').length,
          headings:Array.from(document.querySelectorAll('main h2')).map(x=>x.textContent.trim())
        };
      });
      if(state.width>width+3)issues.push('horizontal overflow '+state.width);
      if(state.lang!==lang)issues.push('incorrect page language '+state.lang);
      if(state.headline!=='Pavel Velichii')issues.push('missing approved author name');
      if(!state.title.includes('Pavel Velichii'))issues.push('title missing author');
      if(!state.canonical?.endsWith('/'+file))issues.push('canonical mismatch');
      if(state.availableLang.join(',')!=='EN,DE,FR')issues.push('language navigation missing');
      if(state.editLinks.length!==3)issues.push('3-language books navigation missing');
      if(!state.imageLoaded)issues.push('cover preview failed');
      if(state.main!==1||state.headings.length<3)issues.push('profile content incomplete');
      if(state.links.length)issues.push('empty navigation link');
      if(width===375||width===1440) await page.screenshot({path:'test/screenshots/'+file.replace('.html','')+'-'+width+'.png',fullPage:true});
      console.log(JSON.stringify({page:file,width,status:issues.length?'FAIL':'PASS',issues}));
      failures+=issues.length;
      await page.close();
    }
  }
  await browser.close();
  if(failures)process.exit(1);
  console.log('PASS: all 18 author-page EN/DE/FR viewport tests');
})().catch(e=>{console.error(e);process.exit(1)});
