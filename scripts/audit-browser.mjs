import {createRequire} from 'node:module';
import fs from 'node:fs';
import assert from 'node:assert/strict';
const require=createRequire(process.env.PLAYWRIGHT_PACKAGE || import.meta.url);
const {chromium}=require('playwright');
const browser=await chromium.launch({headless:true,...(process.env.CHROME_PATH ? {executablePath:process.env.CHROME_PATH} : {})});
const origin=process.env.TEST_BASE_URL || 'http://127.0.0.1:3000';
const paths=['/','/installation-cuisine-la-rochelle','/renovation-cuisine-la-rochelle','/optimisation-petite-cuisine','/reparation-cuisine-la-rochelle','/conception-cuisine-3d','/realisations','/realisations/cuisine-optimisee','/notre-approche','/devis','/contact','/mentions-legales','/politique-confidentialite'];
fs.mkdirSync('docs/audit',{recursive:true});
const results={pages:[],flows:[],consoleErrors:[],accessibility:[]};
const page=await browser.newPage();
page.on('pageerror',e=>results.consoleErrors.push(e.message));
for(const width of [1440,768,390,320]){
 await page.setViewportSize({width,height:1000});
 for(const path of paths){
  const response=await page.goto(origin+path,{waitUntil:'networkidle'}); await page.locator('h1').waitFor();
  const data=await page.evaluate(()=>({title:document.title,h1:document.querySelectorAll('h1').length,description:document.querySelector('meta[name="description"]')?.content,canonical:document.querySelector('link[rel="canonical"]')?.href,overflow:document.documentElement.scrollWidth>innerWidth+1,brokenImages:[...document.images].filter(i=>i.complete&&!i.naturalWidth).map(i=>i.src),images:[...document.images].map(i=>({alt:i.alt,width:i.getBoundingClientRect().width,loading:i.loading}))}));
  assert.ok([200,304].includes(response.status()),path);assert.equal(data.h1,1,path);assert.ok(data.description,path);assert.ok(!data.overflow,`${width} overflow ${path}`);assert.equal(data.brokenImages.length,0,path);
  results.pages.push({width,path,status:response.status(),...data});
  if(width===390||width===1440){
   if(process.env.AXE_SCRIPT && fs.existsSync(process.env.AXE_SCRIPT)){
    await page.addScriptTag({path:process.env.AXE_SCRIPT});
    const a=await page.evaluate(async()=>{const a=await axe.run(document,{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21aa']}});return a.violations.map(v=>({id:v.id,impact:v.impact,help:v.help,nodes:v.nodes.map(n=>n.target)}))});results.accessibility.push({width,path,violations:a});
   }
  }
  if(['/', '/installation-cuisine-la-rochelle','/realisations/cuisine-optimisee'].includes(path)&&[1440,390,768].includes(width))await page.screenshot({path:`docs/audit/${path==='/'?'home':path.includes('installation')?'service':'gallery'}-${width}.jpg`,type:'jpeg',quality:75,fullPage:true});
 }
}
fs.writeFileSync('docs/audit/browser-results.json',JSON.stringify(results,null,2));
await page.setViewportSize({width:390,height:844});
await page.goto(origin+'/',{waitUntil:'networkidle'});await page.getByRole('button',{name:'Ouvrir le menu'}).click();assert.equal(await page.getByRole('button',{name:'Fermer le menu'}).getAttribute('aria-expanded'),'true');await page.keyboard.press('Escape');assert.equal(await page.getByRole('button',{name:'Ouvrir le menu'}).getAttribute('aria-expanded'),'false');results.flows.push('Mobile menu opens, Escape closes and returns focus');
await page.goto(origin+'/realisations/cuisine-optimisee',{waitUntil:'networkidle'});await page.getByRole('button',{name:/Agrandir/}).first().click();assert.ok(await page.locator('dialog').isVisible());await page.getByRole('button',{name:'Suivante'}).click();assert.match(await page.locator('#gallery-title').innerText(),/2 \/ 2/);await page.getByRole('button',{name:'Précédente'}).click();assert.match(await page.locator('#gallery-title').innerText(),/1 \/ 2/);await page.keyboard.press('Escape');assert.ok(!await page.locator('dialog').isVisible());await page.waitForFunction(() => document.activeElement?.getAttribute('aria-label')?.startsWith('Agrandir'));assert.match(await page.locator(':focus').getAttribute('aria-label'),/Agrandir/);results.flows.push('Gallery opens, advances, closes with Escape and restores focus');
// Exercise every service, plus combined needs and the undecided branch, without sending anything.
for(const needs of [['installation'],['renovation'],['optimisation'],['reparation'],['conception'],['installation','renovation','optimisation','reparation','conception'],['autre']]){
 await page.goto(origin+'/devis',{waitUntil:'networkidle'});await page.getByRole('button',{name:'Continuer',exact:true}).click();assert.ok(await page.locator('#needs-error').isVisible());
 const labels={installation:'Installer une cuisine',renovation:'Rénover ma cuisine',optimisation:'Optimiser mon espace',reparation:'Réparer ou modifier',conception:'Concevoir en 3D',autre:'Je ne sais pas encore'};
 for(const need of needs)await page.getByRole('button',{name:new RegExp(labels[need])}).click();
 await page.getByRole('button',{name:'Continuer',exact:true}).click();
 let screens=0;
 while(!await page.locator('#name').isVisible()){
  assert.ok(++screens<24,'wizard loop');
  const radios=page.locator('.choice-grid input[type=radio]');const checks=page.locator('.choice-grid input[type=checkbox]');
  if(await radios.count())await radios.first().check();
  else if(await checks.count())await checks.first().check();
  else if(await page.locator('textarea').count())await page.locator('textarea').first().fill('Nous souhaitons améliorer les rangements de notre cuisine.');
  await page.getByRole('button',{name:'Continuer',exact:true}).click();
 }
 await page.getByRole('button',{name:'Vérifier ma demande',exact:true}).click();assert.ok(await page.locator('#name-error').isVisible());
 await page.locator('#name').fill('Audit local');await page.locator('#phone').fill('0600000000');await page.locator('#email').fill('audit@example.com');await page.locator('#city').fill('La Rochelle');
 assert.equal(await page.locator('#phone').getAttribute('inputmode'),'tel');await page.locator('#name').focus();await page.keyboard.press('Escape');assert.equal(await page.locator(':focus').getAttribute('id'),'name','closed menu must not steal Escape focus');
 await page.locator('#photos').setInputFiles({name:'invalid.webp',mimeType:'image/webp',buffer:Buffer.from('not a photo')});await page.locator('#photo-error').waitFor();await page.getByRole('button',{name:'Continuer sans photos'}).click();
 await page.locator('#photos').setInputFiles('public/images/projects/kitchen/cuisine-01.webp');await page.getByRole('button',{name:/Retirer/}).waitFor();
 await page.getByRole('button',{name:'Vérifier ma demande',exact:true}).click();
 await page.getByRole('button',{name:'Préparer le message WhatsApp',exact:true}).click();assert.ok(await page.locator('#consent-error').isVisible());
 await page.locator('.consent input').check();await page.getByRole('button',{name:'Préparer le message WhatsApp',exact:true}).click();
 const link=page.getByRole('link',{name:'Ouvrir WhatsApp pour vérifier'});await link.waitFor();const href=await link.getAttribute('href');assert.ok(href.startsWith('https://wa.me/33763734372?text='));assert.ok(decodeURIComponent(href).includes('Photos à joindre manuellement dans WhatsApp :'));
 assert.match(await page.locator('.form-status').innerText(),/Aucun message n’a été envoyé et aucune photo n’a été transmise/);
 if(process.env.AXE_SCRIPT){await page.addScriptTag({path:process.env.AXE_SCRIPT});const violations=await page.evaluate(async()=>{const a=await axe.run(document,{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21aa']}});return a.violations.map(v=>({id:v.id,impact:v.impact,nodes:v.nodes.map(n=>n.target)}))});results.accessibility.push({width:390,path:'/devis review '+needs.join('+'),violations});}
 await page.getByRole('button',{name:'Modifier les coordonnées'}).click();assert.equal(await page.locator('#name').inputValue(),'Audit local');assert.equal(await page.getByRole('link',{name:'Ouvrir WhatsApp pour vérifier'}).count(),0);
 results.flows.push({needs,screens,validation:'needs, contact, consent, invalid photo recovery',handoff:'WhatsApp prepared only; photo attachment manual; edits invalidate link'});
}
assert.equal(results.consoleErrors.length,0);
fs.writeFileSync('docs/audit/browser-results.json',JSON.stringify(results,null,2));
assert.equal(results.accessibility.filter(a=>a.violations.length).length,0,'WCAG violations remain; inspect browser-results.json');
console.log(JSON.stringify({pages:results.pages.length,flows:results.flows.length,accessibilityViolations:results.accessibility.filter(a=>a.violations.length),consoleErrors:results.consoleErrors},null,2));
await browser.close();
