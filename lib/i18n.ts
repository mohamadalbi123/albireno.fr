import { translations } from './translations.ts';
export type Locale='fr'|'en'|'ar';
export const locales:Locale[]=['fr','en','ar'];
export const normalizeCopy=(text:string)=>text.replace(/\s+/g,' ').trim();
export function localeFromPath(path:string):Locale{return /^\/en(?:\/|$)/.test(path)?'en':/^\/ar(?:\/|$)/.test(path)?'ar':'fr';}
export function frenchPath(path:string){const result=path.replace(/^\/(?:en|ar)(?=\/|$)/,'');return result||'/';}
export function localePath(path:string,locale:Locale){if(!path.startsWith('/')||path.startsWith('//')||/^\/(?:api|_next)(?:\/|$)/.test(path)||/\.[a-z0-9]+(?:[?#]|$)/i.test(path))return path;const base=frenchPath(path);return locale==='fr'?base:`/${locale}${base==='/'?'':base}`;}
export function t(text:string,locale:Locale):string{
 if(locale==='fr')return text;const key=normalizeCopy(text),pair=translations[key];
 if(pair)return (text.match(/^\s*/)?.[0]||'')+pair[locale==='en'?0:1]+(text.match(/\s*$/)?.[0]||'');
 const measured=key.match(/^(.*) \((m²|m)\)$/);if(measured)return t(measured[1],locale)+' ('+measured[2]+')';
 const step=key.match(/^(Ajouter|Retirer) (0,1|1) (m²|m) : (.*)$/);if(step)return t(step[1]+' :',locale)+' '+step[2].replace(',','.')+' '+step[3]+' '+t(step[4],locale);
 const suffix=' | ALBI RENO';if(key.endsWith(suffix))return t(key.slice(0,-suffix.length),locale)+suffix;
 for(const prefix of ['Agrandir : ','Supprimer : ','Retirer : ','Ajouter : ','Quantité : '])if(key.startsWith(prefix))return t(prefix.trim(),locale)+' '+t(key.slice(prefix.length),locale);
 return text;
}
export function localeMoney(value:number,locale:Locale){return new Intl.NumberFormat(locale==='en'?'en-GB':locale==='ar'?'ar-FR':'fr-FR',{style:'currency',currency:'EUR'}).format(value);}
export function measurementNumber(text:string){return Number(text.trim().replace(/[٠-٩]/g,c=>String(c.charCodeAt(0)-1632)).replace(/[۰-۹]/g,c=>String(c.charCodeAt(0)-1776)).replace(/[٫,]/g,'.'));}
