import {NextResponse,type NextRequest} from 'next/server';
import {localeFromPath} from './lib/i18n';
export function proxy(request:NextRequest){const headers=new Headers(request.headers);headers.set('x-albireno-language',localeFromPath(request.nextUrl.pathname));const response=NextResponse.next({request:{headers}});response.headers.set('Content-Language',localeFromPath(request.nextUrl.pathname));return response;}
export const config={matcher:['/((?!api|_next|.*\\..*).*)']};
