import {estimatorPath} from '../lib/estimator-path.mjs';
/** Import a prebuilt standalone planner export; no access to deployment credentials. */
import { readFile, cp, mkdir, rm, readdir, writeFile } from 'node:fs/promises';
import { resolve, join } from 'node:path';
import { createHash } from 'node:crypto';
const source=process.argv[2];
if(!source)throw new Error('Usage: node scripts/sync-testing-planner.mjs /path/to/planner/export');
const exportDir=resolve(source), root=resolve(import.meta.dirname,'..');
const html=await readFile(join(exportDir,'index.html'),'utf8');
if(!/<meta[^>]*name="robots"[^>]*content="noindex,\s*nofollow"/.test(html)||!html.includes(estimatorPath+'/_next/static/'))throw new Error('Expected a noindex static planner export built with the production estimator basePath.');
const designer=await readFile(join(exportDir,'planner.html'),'utf8');
if(!designer.includes('noindex'))throw new Error('The optional designer must also remain noindex.');
const assets=join(root,'public'+estimatorPath+'/_next');
await rm(assets,{recursive:true,force:true});await mkdir(assets,{recursive:true});await cp(join(exportDir,'_next'),assets,{recursive:true});
await mkdir(join(root,'testing-planner'),{recursive:true});await writeFile(join(root,'testing-planner/index.html'),html);await writeFile(join(root,'testing-planner/planner.html'),designer);
for(const locale of ['en','ar']){let localized=await readFile(join(exportDir,locale+'.html'),'utf8');if(!localized.includes('noindex'))throw new Error('Localized estimator must remain noindex.');localized=localized.replace('<html lang="fr">',`<html lang="${locale}" dir="${locale==='ar'?'rtl':'ltr'}">`);await writeFile(join(root,'testing-planner',locale+'.html'),localized);}
await rm(join(root,'public/testing'),{recursive:true,force:true});
const files=await readdir(assets,{recursive:true});
await writeFile(join(root,'testing-planner/manifest.json'),JSON.stringify({basePath:estimatorPath,htmlSha256:createHash('sha256').update(html).digest('hex'),assetEntries:files.length,storageKey:'albireno-planner-testing-v1-projects',indexable:false,submissionBackend:false,rateStatus:'owner-supplied-2026-11-05',rateVersion:2,taxStatus:'unconfirmed',pricingMode:'owner-unit-rates',automaticPlanReading:false,entryModes:['visual-catalog'],catalogItems:33,languages:['fr','en','ar']},null,2)+'\n');
console.log(`Imported noindex production estimator (${files.length} asset entries).`);
