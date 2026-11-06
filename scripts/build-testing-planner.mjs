/** Local-only export of the existing sibling planner. Never pushes or deploys. */
import {cp,mkdir,rm,readFile,writeFile,symlink,access} from 'node:fs/promises';
import {resolve,join} from 'node:path';
import {spawnSync} from 'node:child_process';
const root=resolve(import.meta.dirname,'..'),source=resolve(process.argv[2]||join(root,'../AlbiReno Kitchen Planner'));
const staging=resolve('/private/tmp/albireno-testing-export');
await mkdir(staging,{recursive:true});
for(const name of ['app','components','lib']){await rm(join(staging,name),{recursive:true,force:true});await cp(join(source,name),join(staging,name),{recursive:true});}
await mkdir(staging,{recursive:true});
for(const name of ['package.json','package-lock.json','tsconfig.json','postcss.config.mjs']){try{await cp(join(source,name),join(staging,name));}catch(error){if(name!=='postcss.config.mjs')throw error;}}
try{await access(join(staging,'node_modules'));}catch{await symlink(join(source,'node_modules'),join(staging,'node_modules'));}
// One canonical tariff module is used by the UI and the quotation validator.
for(const name of ['kitchen-estimate.ts','estimator-catalog.ts'])await cp(join(root,'lib',name),join(staging,'lib',name));
for(const [name,transform] of [
 ['components/installation-estimator.tsx',s=>s.replace("import Link from 'next/link';",'').replace('<Link href="/planner">','<a href="/testing/planner">').replaceAll('</Link>','</a>')],
 ['components/planner.tsx',s=>s.replace("import Link from 'next/link';",'').replaceAll('<Link className="brand" href="/">','<a className="brand" href="/testing">').replaceAll('</Link>','</a>')],
 ['lib/storage.ts',s=>s.replaceAll('albireno-planner-v1-projects','albireno-planner-testing-v1-projects')],
]){const p=join(staging,name);await writeFile(p,transform(await readFile(p,'utf8')));}
await writeFile(join(staging,'next.config.ts'),"import type { NextConfig } from 'next';\nconst config:NextConfig={output:'export',basePath:'/testing',poweredByHeader:false,devIndicators:false,turbopack:{root:process.cwd()}};\nexport default config;\n");
const built=spawnSync('npm',['run','build','--','--webpack'],{cwd:staging,stdio:'inherit',env:{...process.env,NEXT_PUBLIC_QUOTE_URL:'/devis'}});
if(built.status!==0)process.exit(built.status||1);
const synced=spawnSync(process.execPath,[join(root,'scripts/sync-testing-planner.mjs'),join(staging,'out')],{cwd:root,stdio:'inherit'});process.exit(synced.status||0);
