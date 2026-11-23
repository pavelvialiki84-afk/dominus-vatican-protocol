import { chromium, devices } from 'playwright';
import { mkdir } from 'node:fs/promises';

const base = process.env.DOMINUS_ORIGIN ?? 'https://dominusbooks.com';
const locales = [
  ['en', 'world-atlas.html', 'www.amazon.com'],
  ['de', 'world-atlas-de.html', 'www.amazon.de'],
  ['fr', 'world-atlas-fr.html', 'www.amazon.fr'],
  ['it', 'world-atlas-it.html', 'www.amazon.it'],
  ['es', 'world-atlas-es.html', 'www.amazon.es'],
];
const errors = [];
const qa = (passed, message) => {
  if (!passed) { errors.push(message); console.error('FAIL', message); }
};
const browser = await chromium.launch({headless:true,args:['--no-sandbox']});
await mkdir('qa-screenshots',{recursive:true});
for (const device of [
  {name:'desktop',viewport:{width:1440,height:900},isMobile:false,hasTouch:false},
  {name:'mobile',...devices['iPhone 13'],viewport:{width:390,height:844}}
]) {
  const context = await browser.newContext({...device,locale:'en-US',reducedMotion:'reduce'});
  for (const [lang, file, market] of locales) {
    const page = await context.newPage();
    const pageErrors = [];
    page.on('pageerror', e=>pageErrors.push(e.message));
    const url = new URL('/'+file,base);
    url.searchParams.set('browserQA', String(Date.now()));
    try {
      const response = await page.goto(url.toString(),{waitUntil:'domcontentloaded',timeout:45000});
      qa(response?.ok(),device.name+'/'+lang+' page status '+response?.status());
      qa((await page.locator('html').getAttribute('lang')) === lang,
        device.name+'/'+lang+' unexpected html language');
      qa((await page.title()).includes('DOMINUS'),device.name+'/'+lang+' missing title');
      const tabs = page.locator('[role="tab"]');
      qa((await tabs.count())===3, device.name+'/'+lang+' expected three tabs');
      for (let i=0;i<3;i++) {
        await tabs.nth(i).click();
        qa((await tabs.nth(i).getAttribute('aria-selected'))==='true',
          device.name+'/'+lang+' tab '+i+' not selected');
        const panelId = await tabs.nth(i).getAttribute('aria-controls');
        const panel = page.locator('#'+panelId);
        qa(await panel.isVisible(),device.name+'/'+lang+' tab '+i+' panel hidden');
      }
      const links = await page.locator('a[href]').evaluateAll(nodes =>
        nodes.map(a => a.getAttribute('href')||''));
      qa(links.some(url=>url.includes(market+'/dp/')),
        device.name+'/'+lang+' marketplace link mismatch');
      for (const [, alternate] of locales) {
        qa(links.some(href=>href.split(/[?#]/)[0]===alternate),
          device.name+'/'+lang+' language link missing '+alternate);
      }
      await tabs.first().click();
      await page.locator('[role="tabpanel"]:visible img').first().scrollIntoViewIfNeeded({timeout:6000});
      await page.waitForTimeout(350);
      const broken = await page.locator('img').evaluateAll(nodes =>
        nodes.filter(img=>img.complete && img.naturalWidth===0).map(img=>img.src));
      qa(broken.length===0,device.name+'/'+lang+' broken images: '+broken.join(','));
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth > innerWidth + 2);
      qa(!overflow,device.name+'/'+lang+' horizontal overflow at viewport width '+device.viewport.width);
      qa(pageErrors.length===0,device.name+'/'+lang+' JS console errors: '+pageErrors.join(','));
      await page.screenshot({path:'qa-screenshots/'+lang+'-'+device.name+'.png',
        fullPage:true,animations:'disabled'});
      console.log('SCREENSHOT',lang,device.name,'tabs and locale links checked');
    } catch(e) {
      qa(false,device.name+'/'+lang+' browser test exception '+e.message);
    } finally { await page.close(); }
  }
  await context.close();
}
await browser.close();
if (errors.length) {
  console.error('\nBROWSER QA FAILED: '+errors.length+' issue(s).');
  process.exitCode=1;
} else console.log('\nBROWSER QA PASSED for all 5 locales on desktop and mobile.');
