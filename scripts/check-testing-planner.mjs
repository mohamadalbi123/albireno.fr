import {createRequire} from 'node:module';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {itemRates} from '../lib/kitchen-estimate.ts';
const origin=process.env.TEST_BASE_URL||'http://127.0.0.1:3012';
for(const path of ['/testing','/testing/planner']){const r=await fetch(origin+path);assert.equal(r.status,200);assert.match(r.headers.get('x-robots-tag'),/noindex/);assert.equal(r.headers.get('referrer-policy'),'no-referrer');assert.match(await r.text(),/name="robots" content="noindex, nofollow"/);}
assert.ok(!(await (await fetch(origin+'/sitemap.xml')).text()).includes('/testing'));
const require=createRequire(process.env.PLAYWRIGHT_PACKAGE||import.meta.url),{chromium}=require('playwright');
const browser=await chromium.launch({headless:true,...(process.env.CHROME_PATH?{executablePath:process.env.CHROME_PATH}:{})});
const context=await browser.newContext({viewport:{width:1440,height:1000}}),page=await context.newPage(),errors=[],failed=[];
page.on('pageerror',e=>errors.push(e.message));page.on('requestfailed',r=>failed.push(r.url()));
const dir='docs/audit/estimator-final';fs.mkdirSync(dir,{recursive:true});
page.setDefaultTimeout(10000);
const total=page.getByTestId('instant-total');
const reset=async()=>{await page.getByRole('button',{name:'Réinitialiser mon estimation',exact:true}).click();await page.getByRole('button',{name:'Fermer le message'}).click();};
const field=key=>page.getByRole('textbox',{name:`${itemRates[key][0]} — ${new Intl.NumberFormat('fr-FR',{style:'currency',currency:'EUR'}).format(itemRates[key][1])} / ${itemRates[key][2]}`,exact:true});
const fill=async(key,n)=>{await field(key).fill(String(n));};
async function cabinet(type){await page.getByLabel('Type de meuble à ajouter',{exact:true}).selectOption(type);await page.getByRole('button',{name:'+ Ajouter ce meuble',exact:true}).click();}
await page.goto(origin+'/testing',{waitUntil:'networkidle'});
assert.match(await total.innerText(),/Ajoutez/);
await fill('tap',1);assert.match(await total.innerText(),/150,00/);await fill('tap',4);assert.match(await total.innerText(),/180,00/);await reset();
await page.getByLabel('Je souhaite une conception 3D gratuite').check();assert.match(await total.innerText(),/^0,00/);await page.getByLabel(/Plan de travail en pierre/).check();assert.equal(await total.innerText(),'Sur devis');await reset();
await cabinet('baseSmall');await cabinet('baseSmall');assert.match(await total.innerText(),/150,00/);await page.getByLabel('Type du meuble 1',{exact:true}).selectOption('baseDrawers');assert.match(await total.innerText(),/170,00/);assert.equal(await page.locator('.cabinet-entry').count(),2);await page.getByRole('button',{name:'Retirer le meuble 1',exact:true}).click();assert.equal(await page.locator('.cabinet-entry').count(),1);await reset();
for(const type of ['tallDrawers','baseSmall','baseSmall','island','wallSmall','wallSmall','wallSmall'])await cabinet(type);
for(const [key,n] of Object.entries({worktop:3,backsplash:1.5,sink:1,sinkCutout:1,tap:1,siphon:1}))await fill(key,n);
assert.match(await total.innerText(),/1[\s\u00a0\u202f]055,00/);assert.equal(await page.locator('.cabinet-entry').count(),7);
await fill('worktop','-2');assert.equal(await total.innerText(),'À vérifier');assert.ok(await page.getByRole('button',{name:/Recevoir mon devis/}).isDisabled());await fill('worktop','3');
await fill('sink','1.5');assert.equal(await total.innerText(),'À vérifier');await fill('sink',1);
for(const width of [1440,390,320]){await page.setViewportSize({width,height:950});assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1),false);if(width===1440||width===390)await page.screenshot({path:`${dir}/calculator-${width}.png`,fullPage:true});}
await page.getByRole('button',{name:/J’ai les dimensions/}).click();assert.ok(await page.getByRole('button',{name:'Proposer des meubles de 60 cm'}).isDisabled());
await page.getByRole('button',{name:/J’ai un plan ou une vue 3D/}).click();await page.locator('input[type=file]').setInputFiles({name:'reference.png',mimeType:'image/png',buffer:Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII=','base64')});await page.locator('.estimate-reference img').waitFor();assert.match(await page.locator('.reference-limit').innerText(),/Lecture automatique non activée/);
await page.getByRole('button',{name:/Recevoir mon devis/}).click();await page.waitForURL('**/devis?service=installation**');await page.locator('.estimate-attachment pre').waitFor();assert.match(await page.locator('.estimate-attachment').innerText(),/1[\s\u00a0\u202f]055,00/);assert.equal(new URL(page.url()).hash,'');assert.equal(await page.locator('input[type=file]').count(),0);
for(const width of [1440,390,320]){await page.setViewportSize({width,height:950});assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1),false);}
await page.getByLabel('Code postal',{exact:false}).fill('17000');await page.getByLabel('Votre nom',{exact:false}).fill('Client test');await page.getByLabel('Adresse e-mail',{exact:true}).fill('test@example.com');await page.locator('#consent').check();
let handoff='';await page.route('https://wa.me/**',async route=>{handoff=new URL(route.request().url()).searchParams.get('text')||'';await route.fulfill({status:200,contentType:'text/html',body:'<p>Navigation WhatsApp interceptée — aucun message envoyé.</p>'});});
await page.getByRole('button',{name:'Continuer sur WhatsApp'}).click();await page.waitForURL('https://wa.me/**');assert.match(handoff,/1[\s\u00a0\u202f]055,00/);assert.match(handoff,/Siphon et raccordement/);assert.match(handoff,/Main|MAIN/);assert.match(handoff,/préparation/);
await page.goto(origin+'/devis#estimate=invalid',{waitUntil:'networkidle'});await page.getByText(/Le récapitulatif n’a pas pu/).waitFor();assert.ok(await page.getByRole('button',{name:'Continuer sur WhatsApp'}).isDisabled());await page.getByRole('button',{name:'Retirer l’estimation de ma demande'}).click();assert.ok(await page.getByRole('button',{name:'Continuer sur WhatsApp'}).isEnabled());
await page.goto(origin+'/testing/planner',{waitUntil:'networkidle'});await page.getByRole('dialog').waitFor();await page.getByRole('button',{name:'Appliquer les mesures'}).click();await page.getByRole('dialog').waitFor({state:'hidden'});await page.locator('a.brand').click();await page.waitForURL(origin+'/testing');
await page.goto(origin,{waitUntil:'networkidle'});assert.equal(await page.locator('a[href^="/testing"]').count(),0);assert.ok(await page.locator('.site-header').isVisible());
assert.deepEqual(errors,[]);assert.deepEqual(failed,[]);
const report={origin,sampleTotal:1055,cabinets:7,checks:['noindex isolated calculator and optional designer; no public navigation or sitemap entry','minimum, free-design-only and quote-only cases','exclusive cabinet replacement and removal','all sample quantities, decimal area, invalid inputs and reset','no horizontal overflow at 1440, 390 and 320 pixels on calculator and quote form','local image reference, no automatic plan reading or attachment upload','estimate transferred to existing quote form and recalculated','WhatsApp itemized handoff intercepted; no real enquiry sent','corrupt handoff blocked until explicitly removed','public homepage retains layout'],browserErrors:errors,failedRequests:failed};fs.writeFileSync(`${dir}/results.json`,JSON.stringify(report,null,2));console.log(JSON.stringify(report,null,2));await browser.close();
