/** The form always uses our server. Provider credentials and recipient never enter the client. */
export class ContactSubmissionError extends Error{}
export const contactSendFailure='L’envoi n’a pas pu être confirmé. Vos informations sont conservées dans le formulaire. Réessayez ou contactez-nous directement.';
export async function submitContact(payload:unknown,request:typeof fetch=fetch){
 let response:Response;
 try{response=await request('/api/devis',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload),signal:AbortSignal.timeout(20000)});}catch{throw new ContactSubmissionError(contactSendFailure);}
 let receipt:{sent?:unknown;message?:unknown;errors?:Record<string,string>};
 try{receipt=await response.json();}catch{throw new ContactSubmissionError(contactSendFailure);}
 if(!response.ok)throw new ContactSubmissionError(typeof receipt.message==='string'?receipt.message:contactSendFailure);
 if(receipt.sent!==true)throw new ContactSubmissionError(contactSendFailure);
 return receipt;
}
