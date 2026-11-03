import {createRequire} from 'node:module';
import fs from 'node:fs';
import assert from 'node:assert/strict';
const require=createRequire(process.env.PLAYWRIGHT_PACKAGE || import.meta.url);
const {chromium}=require('playwright');
const browser=await chromium.launch({headless:true,...(process.env.CHROME_PATH?{executablePath:process.env.CHROME_PATH}:{})});
const origin=process.env.TEST_BASE_URL || 'http://127.0.0.1:3006';
const paths=['/','/installation-cuisine-la-rochelle','/conception-cuisine-3d','/realisations','/realisations/cuisine-optimisee','/realisations/cuisine-rochefort','/notre-approche','/devis','/contact','/mentions-legales','/politique-confidentialite'];
fs.mkdirSync('docs/audit/repositioning',{recursive:true});
const results={pages:[],flows:[],consoleErrors:[],accessibility:[]};
const page=await browser.newPage({reducedMotion:'reduce'});let handoff='';await page.route('https://wa.me/**',async route=>{handoff=route.request().url();await route.fulfill({status:200,contentType:'text/html',body:'<!doctype html><title>Intercepted WhatsApp handoff test</title><p>No request sent.</p>'});});page.on('pageerror',e=>results.consoleErrors.push(e.message));
for(const width of [1440,1024,768,430,320]){
 await page.setViewportSize({width,height:1000});
 for(const path of paths){
  const r=await page.goto(origin+path,{waitUntil:'networkidle'});await page.locator('h1').waitFor();
  const data=await page.evaluate(()=>({title:document.title,description:document.querySelector('meta[name="description"]')?.content,h1:document.querySelectorAll('h1').length,overflow:document.documentElement.scrollWidth>innerWidth+1,broken:[...document.images].filter(i=>i.complete&&!i.naturalWidth).map(i=>i.src)}));
  assert.equal(r.status(),200,path);for(const actions of await page.locator('.cta-section .cta-actions').all())assert.equal(await actions.locator('a').count(),1,'one CTA per contact block');assert.equal(data.h1,1,path);assert.ok(data.description,path);assert.equal(data.overflow,false,`${width} ${path}`);assert.deepEqual(data.broken,[],path);results.pages.push({width,path,...data});
  if(path==='/'){
   assert.equal(await page.locator('#services .service-card').count(),2);
   assert.equal(await page.locator('.journey-steps>li').count(),4);
   assert.equal(await page.getByRole('link',{name:'Concevoir ma cuisine',exact:true}).getAttribute('href'),'/devis?service=conception');
   assert.equal(await page.getByRole('link',{name:'Faire installer ma cuisine',exact:true}).getAttribute('href'),'/devis?service=installation');
   assert.equal(await page.locator('a[href*="simulateur"]').count(),0);
   if(width===1440||width===430){for(const img of await page.locator('img').all())if(await img.isVisible()){await img.scrollIntoViewIfNeeded();await img.evaluate(i=>i.decode());}await page.evaluate(()=>scrollTo(0,0));}if(width===1440||width===430)await page.screenshot({path:`docs/audit/repositioning/home-${width}.jpg`,type:'jpeg',quality:78,fullPage:true});
  }
  if(path==='/devis'){assert.equal(await page.locator('input[type=file]').count(),0);assert.equal(await page.getByRole('radio').count(),3);assert.equal(await page.locator('progress').count(),0);if(width===430||width===1440)await page.screenshot({path:`docs/audit/repositioning/inquiry-${width}.jpg`,type:'jpeg',quality:80,fullPage:true});}
 }
}
await page.setViewportSize({width:430,height:900});await page.goto(origin,{waitUntil:'networkidle'});await page.getByRole('button',{name:'Ouvrir le menu'}).click();for(const label of ['Accueil','Conception','Installation','Réalisations','Contact'])assert.ok(await page.locator('#mobile-menu').getByRole('link',{name:label,exact:true}).isVisible());await page.keyboard.press('Escape');assert.equal(await page.getByRole('button',{name:'Ouvrir le menu'}).getAttribute('aria-expanded'),'false');results.flows.push('mobile navigation and Escape');
for(const service of ['conception','installation','complet']){
 await page.goto(origin+'/devis?service='+service,{waitUntil:'networkidle'});
 assert.ok(await page.locator(`input[name=projectType][value="${service}"]`).isChecked());
 await page.getByRole('button',{name:'Continuer sur WhatsApp',exact:true}).click();assert.ok(await page.locator('#postcode-error').isVisible());
 await page.locator('#postcode').fill(service==='installation'?'75008':'17000');await page.locator('#name').fill('Test de parcours');
 await page.getByRole('button',{name:'Continuer sur WhatsApp',exact:true}).click();assert.ok(await page.locator('#contact-error').isVisible());
 if(service==='installation')await page.locator('#phone').fill('0600000000');else await page.locator('#email').fill('test@example.com');
 await page.locator('#comments').fill('Plan fournisseur déjà disponible.');
 handoff='';await page.locator('#consent').check();await page.getByRole('button',{name:'Continuer sur WhatsApp',exact:true}).click();
 await page.waitForURL('https://wa.me/**');const url=new URL(handoff);assert.equal(url.pathname,'/33763734372');assert.match(url.searchParams.get('text'),/Test de parcours/);assert.match(url.searchParams.get('text'),/Plan fournisseur déjà disponible/);
 results.flows.push({service,contacts:service==='installation'?'phone-only, outside La Rochelle':'email-only',handoff:'single validated click; WhatsApp navigation intercepted; no message sent'});
}
await page.goto(origin+'/realisations/cuisine-rochefort',{waitUntil:'networkidle'});await page.getByRole('button',{name:/Agrandir/}).first().click();assert.ok(await page.locator('dialog').isVisible());await page.getByRole('button',{name:'Suivante'}).click();assert.match(await page.locator('#gallery-title').innerText(),/2 \/ 2/);await page.keyboard.press('Escape');assert.ok(!await page.locator('dialog').isVisible());results.flows.push('Rochefort gallery next/Escape preserved');
assert.deepEqual(results.consoleErrors,[]);fs.writeFileSync('docs/audit/repositioning/browser-results.json',JSON.stringify(results,null,2));console.log(JSON.stringify({layouts:results.pages.length,flows:results.flows,consoleErrors:results.consoleErrors},null,2));await browser.close();
