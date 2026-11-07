import { business } from './business.ts';
import { quoteMessage, type QuoteData } from './quote-validation.ts';
export function quoteEmailPayload(data:QuoteData,from:string,attachments:{filename:string;content:string}[]=[]){return {
 from,to:[business.email],...(data.email?{reply_to:data.email}:{}),attachments,
 subject:data.kind==='contact'?'Demande de contact — AlbiReno':`Demande de devis — ${data.postcode}`,
 text:quoteMessage(data)+'\n\nLa personne a accepté le traitement de cette demande via le formulaire.',
};}
export function isDeliveryReceipt(receipt:unknown):boolean{return !!receipt&&typeof receipt==='object'&&'id' in receipt&&typeof receipt.id==='string'&&receipt.id.trim().length>0;}
