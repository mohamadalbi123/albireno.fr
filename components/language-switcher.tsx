'use client';
import {usePathname} from 'next/navigation';
import {useEffect,useRef,useState} from 'react';
import {locales,localePath,t,type Locale} from '@/lib/i18n';
const names={fr:'Français',en:'English',ar:'العربية'};
export function LanguageSwitcher({locale,beforeNavigate,pathOverride}:{locale:Locale;pathOverride?:string;beforeNavigate?:(target:Locale)=>string|undefined}){
 const currentPath=usePathname(),pathname=pathOverride||currentPath,[open,setOpen]=useState(false);
 const container=useRef<HTMLDivElement>(null),toggle=useRef<HTMLButtonElement>(null);
 useEffect(()=>{if(!open)return;const key=(e:KeyboardEvent)=>{if(e.key==='Escape'){setOpen(false);toggle.current?.focus();}};const outside=(e:PointerEvent)=>{if(e.target instanceof Node&&!container.current?.contains(e.target))setOpen(false);};document.addEventListener('keydown',key);document.addEventListener('pointerdown',outside);return()=>{document.removeEventListener('keydown',key);document.removeEventListener('pointerdown',outside);};},[open]);
 return <div ref={container} className="language-switcher"><button ref={toggle} type="button" className="language-toggle" aria-label={t('Choisir la langue',locale)} aria-expanded={open} aria-controls="language-options" onClick={()=>setOpen(!open)}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><circle cx="12" cy="12" r="9"/><ellipse cx="12" cy="12" rx="4" ry="9"/><path d="M3 12h18"/></svg><span>{locale==='ar'?'ع':locale.toUpperCase()}</span><span aria-hidden="true">⌄</span></button>{open&&<nav id="language-options" aria-label={t('Choisir la langue',locale)}>{locales.map(lang=><a key={lang} lang={lang} dir={lang==='ar'?'rtl':'ltr'} href={localePath(pathname,lang)} aria-current={lang===locale?'true':undefined} onClick={e=>{e.preventDefault();const href=beforeNavigate?.(lang)||localePath(pathname,lang)+window.location.search;window.location.assign(href);}}>{names[lang]} {lang===locale&&'✓'}</a>)}</nav>}</div>;
}
