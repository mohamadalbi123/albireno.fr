'use client';
import {createContext,useContext,type ReactNode} from 'react';
import type {Locale} from '@/lib/i18n';
const LanguageContext=createContext<Locale>('fr');
export const useLocale=()=>useContext(LanguageContext);
export function LanguageProvider({locale,children}:{locale:Locale;children:ReactNode}){return <LanguageContext.Provider value={locale}>{children}</LanguageContext.Provider>;}
