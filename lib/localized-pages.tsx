import {notFound} from 'next/navigation';
import type {Metadata} from 'next';
import Home,{metadata as homeMeta} from '@/app/page';
import Contact,{metadata as contactMeta} from '@/app/contact/page';
import Portfolio,{metadata as portfolioMeta} from '@/app/realisations/page';
import Approach,{metadata as approachMeta} from '@/app/notre-approche/page';
import Quote,{metadata as quoteMeta} from '@/app/devis/page';
import Legal,{metadata as legalMeta} from '@/app/mentions-legales/page';
import Privacy,{metadata as privacyMeta} from '@/app/politique-confidentialite/page';
import Project,{generateMetadata as projectMeta} from '@/app/realisations/[slug]/page';
import Service,{generateMetadata as serviceMeta} from '@/app/[service]/page';
import {publishedProjects} from './projects';
import {services} from './services';
import {serverTranslation} from './server-translation';
import {t,localePath,type Locale} from './i18n';
import {siteUrl} from './site';
const pages={ '/':[Home,homeMeta],'/contact':[Contact,contactMeta],'/realisations':[Portfolio,portfolioMeta],'/notre-approche':[Approach,approachMeta],'/devis':[Quote,quoteMeta],'/mentions-legales':[Legal,legalMeta],'/politique-confidentialite':[Privacy,privacyMeta]} as const;
export const publicFrenchPaths=['/','/realisations','/notre-approche','/contact','/devis',...publishedProjects.filter(p=>p.indexable!==false).map(p=>`/realisations/${p.slug}`),...services.filter(s=>s.confirmed).map(s=>`/${s.slug}`)];
export function languageAlternates(path:string){return Object.fromEntries([['fr',path],['en',localePath(path,'en')],['ar',localePath(path,'ar')],['x-default',path]].map(([lang,url])=>[lang,`${siteUrl}${url}`]));}
async function resolvePage(path:string,searchParams:Promise<{service?:string}>){
 if(path in pages){const [Page,metadata]=pages[path as keyof typeof pages];return {node:await Page({searchParams}),metadata};}
 const slug=path.replace('/realisations/','');if(path.startsWith('/realisations/')&&publishedProjects.some(p=>p.slug===slug))return {node:await Project({params:Promise.resolve({slug})}),metadata:await projectMeta({params:Promise.resolve({slug})})};
 const service=path.slice(1);if(services.some(s=>s.slug===service))return {node:await Service({params:Promise.resolve({service})}),metadata:await serviceMeta({params:Promise.resolve({service})})};
 notFound();
}
export async function localizedPage(locale:Locale,segments:string[]|undefined,searchParams:Promise<{service?:string}>){const path='/'+(segments||[]).join('/');return serverTranslation((await resolvePage(path,searchParams)).node,locale);}
export async function localizedMetadata(locale:Locale,segments:string[]|undefined):Promise<Metadata>{
 const path='/'+(segments||[]).join('/'),{metadata}=await resolvePage(path,Promise.resolve({}));
 const title=typeof metadata.title==='string'?t(metadata.title,locale):undefined,description=metadata.description?t(metadata.description,locale):undefined;
 return {...metadata,title,description,alternates:{canonical:`${siteUrl}${localePath(path,locale)}`,...(publicFrenchPaths.includes(path)?{languages:languageAlternates(path)}:{})},openGraph:{...metadata.openGraph,title,description,url:`${siteUrl}${localePath(path,locale)}`,locale:locale==='en'?'en_GB':'ar_AR',images:[{url:`${siteUrl}/opengraph-image`,width:1200,height:630,alt:t('ALBI RENO — Cuisines à La Rochelle',locale)}],alternateLocale:['fr_FR',locale==='en'?'ar_AR':'en_GB']},twitter:{...metadata.twitter,title,description}};
}
