import {localizedPage,localizedMetadata} from '@/lib/localized-pages';
export async function generateMetadata({params}:{params:Promise<{segments?:string[]}>}){return localizedMetadata('en',(await params).segments);}
export default async function Page({params,searchParams}:{params:Promise<{segments?:string[]}> ;searchParams:Promise<{service?:string}>}){return localizedPage('en',(await params).segments,searchParams);}
