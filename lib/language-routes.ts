import {services} from './services';import {publishedProjects} from './projects';import {localePath} from './i18n';
export const publicLanguagePaths=['/','/realisations','/notre-approche','/contact','/devis',...services.filter(s=>s.confirmed).map(s=>`/${s.slug}`),...publishedProjects.filter(p=>p.indexable!==false).map(p=>`/realisations/${p.slug}`)];
export function languageUrls(path:string,origin:string){return {fr:origin+path,en:origin+localePath(path,'en'),ar:origin+localePath(path,'ar'),'x-default':origin+path};}
