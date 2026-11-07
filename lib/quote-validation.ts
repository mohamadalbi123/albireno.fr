import {t,type Locale} from './i18n.ts';
import {localizedEstimateMessage} from './localized-estimate.ts';
import {parseEstimate,estimateMessage,type EstimateInput} from './kitchen-estimate.ts';
import { business } from './business.ts';
import { projectOptions, planOptions, type PlanStatus, type ProjectType } from './quote-flow.ts';
export type QuoteData={projectType:ProjectType|'';postcode:string;name:string;email:string;phone:string;comments:string;consent:boolean;website:string;token:string;planStatus?:PlanStatus|'';installationEstimate?:EstimateInput;language?:Locale};
export type FieldErrors=Record<string,string>;
export function validateQuote(input:unknown):{data:QuoteData;errors:FieldErrors;valid:boolean}{
 const raw=input&&typeof input==='object'?input as Record<string,unknown>:{};
 const text=(key:string)=>typeof raw[key]==='string'?(raw[key] as string).trim():'';
 const type=text('projectType');
 const data:QuoteData={...(raw.language!==undefined?{language:raw.language==='en'?'en':raw.language==='ar'?'ar':'fr'}:{}),planStatus:planOptions.some(p=>p.id===text('planStatus'))?text('planStatus') as PlanStatus:'',projectType:projectOptions.some(p=>p.id===type)?type as ProjectType:'',postcode:text('postcode'),name:text('name'),email:text('email'),phone:text('phone'),comments:text('comments'),consent:raw.consent===true,website:text('website'),token:text('token')};
 const errors:FieldErrors={};
 if(raw.language!==undefined&&!['fr','en','ar'].includes(raw.language as string))errors.language='Langue invalide.';
 if(raw.installationEstimate!==undefined){try{data.installationEstimate=parseEstimate(raw.installationEstimate);}catch{errors.installationEstimate='Le récapitulatif de l’estimation est invalide. Revenez au calculateur ou retirez-le.';}}
 if(text('planStatus')&&!data.planStatus)errors.planStatus='Choisissez une option proposée ou laissez ce champ vide.';
 if(!data.projectType)errors.projectType='Choisissez la conception, l’installation ou les deux.';
 if(!/^(?:0[1-9]|[1-8]\d|9[0-8])\d{3}$/.test(data.postcode))errors.postcode='Indiquez un code postal français à 5 chiffres (ex. 17000).';
 if(data.name.length<2||data.name.length>100||/[\x00-\x1f\x7f]/.test(data.name))errors.name='Indiquez votre nom (2 à 100 caractères).';
 if(!data.email&&!data.phone)errors.contact='Indiquez au moins une adresse e-mail ou un numéro de téléphone valide.';
 if(data.email&&(data.email.length>254||!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)||/[\r\n]/.test(data.email)))errors.email='Indiquez une adresse e-mail valide ou laissez ce champ vide si vous renseignez un téléphone.';
 const digits=data.phone.replace(/\D/g,'');
 if(data.phone&&(!/^[+\d\s().-]+$/.test(data.phone)||digits.length<9||digits.length>15||data.phone.length>30))errors.phone='Indiquez un numéro de téléphone valide ou laissez ce champ vide si vous renseignez un e-mail.';
 if(data.comments.length>3000||/[\x00-\x08\x0b\x0c\x0e-\x1f\x7f]/.test(data.comments))errors.comments='Limitez votre message à 3 000 caractères, sans caractères de contrôle.';
 if(!data.consent)errors.consent='Veuillez lire la politique de confidentialité et confirmer votre accord.';
 if(data.website)errors.website='La demande n’a pas pu être validée.';
 if(data.token.length>2048)errors.token='Vérification anti-spam invalide.';
 return {data,errors,valid:Object.keys(errors).length===0};
}
export function quoteMessage(data:QuoteData){const locale=data.language||'fr',tr=(s:string)=>t(s,locale);return `${tr('Bonjour ALBI RENO, je souhaite vous parler de mon projet de cuisine.')}\n\n${tr('Projet :')} ${tr(projectOptions.find(p=>p.id===data.projectType)?.label||'À préciser')}\n${tr('Code postal :')} ${data.postcode}\n${tr('Nom :')} ${data.name}\n${tr('E-mail :')} ${data.email||tr('Non renseigné')}\n${tr('Téléphone :')} ${data.phone||tr('Non renseigné')}\n${tr('Plan ou photos :')} ${tr(planOptions.find(p=>p.id===data.planStatus)?.label||'À préciser')}\n\n${tr('Mon projet :')} ${data.comments||tr('À préciser lors de notre échange')}${data.installationEstimate?'\n\n'+localizedEstimateMessage(data.installationEstimate,locale):''}`;}
