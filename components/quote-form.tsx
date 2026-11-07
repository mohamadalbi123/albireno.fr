"use client";
import {QuotePhotos} from "./quote-photos";
import {submitContact,ContactSubmissionError,contactSendFailure} from "@/lib/contact-submission";
import type {PhotoPayload} from "@/lib/photo-rules";
import {localizedEstimateMessage} from "@/lib/localized-estimate";
import {useLocale} from "./language-context";
import {translatedNodes} from "./translated-content";
import Link from "next/link";
import {parseEstimate,estimateMessage} from "@/lib/kitchen-estimate";
import Script from "next/script";
import { useEffect, useRef, useState } from "react";
import { projectOptions, planOptions, type PlanStatus, type ProjectType } from "@/lib/quote-flow";
import { validateQuote, quoteMessage, type QuoteData, type FieldErrors } from "@/lib/quote-validation";
import { whatsappUrl, business } from "@/lib/business";
import { trackContact } from "@/lib/contact-events";
import { Icon } from "./icon";
declare global {
  interface Window {
    turnstile?: {
      render: (
        element: HTMLElement,
        options: Record<string, unknown>,
      ) => string;
      remove: (id: string) => void;
      reset: (id: string) => void;
    };
  }
}
function SpamCheck({
  onToken,
  onError,
}: {
  onToken: (token: string) => void;
  onError: () => void;
}) {
  const locale=useLocale();
  const container = useRef<HTMLDivElement>(null);
  const widget = useRef<string | undefined>(undefined);
  function render() {
    if (container.current && window.turnstile && widget.current === undefined)
      widget.current = window.turnstile.render(container.current, {
        sitekey: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY,
        action: "quote",
        size: "compact",
        language: locale,
        callback: onToken,
        "expired-callback": () => onToken(""),
        "error-callback": onError,
      });
  }
  useEffect(
    () => () => {
      if (widget.current !== undefined)
        window.turnstile?.remove(widget.current);
    },
    [],
  );
  return (
    <>
      <div ref={container} />
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
        onReady={render}
      />
    </>
  );
}
const blank:QuoteData={projectType:'',postcode:'',name:'',email:'',phone:'',comments:'',consent:false,website:'',token:'',planStatus:''};
export function QuoteForm({mailEnabled=false,initialService='',simpleContact=false}:{mailEnabled?:boolean;initialService?:ProjectType|'';simpleContact?:boolean}){
 const locale=useLocale();
 const [data,setData]=useState<QuoteData>({...blank,projectType:initialService}),[errors,setErrors]=useState<FieldErrors>({}),[pending,setPending]=useState(false),[status,setStatus]=useState(''),[success,setSuccess]=useState(false),[challengeKey,setChallengeKey]=useState(0);
 const [estimateTransferError,setEstimateTransferError]=useState('');
 const [photos,setPhotos]=useState<PhotoPayload[]>([]),[photoError,setPhotoError]=useState('');
 useEffect(()=>{
  if(!window.location.hash.startsWith('#estimate='))return;
  const fragment=window.location.hash.slice(10);
  window.history.replaceState(null,'',window.location.pathname+window.location.search);
  try{if(fragment.length>30000)throw new Error();const estimate=parseEstimate(JSON.parse(decodeURIComponent(fragment)));setData(d=>({...d,installationEstimate:estimate}));}catch{setEstimateTransferError('Le récapitulatif n’a pas pu être chargé. Revenez au calculateur ou retirez cette pièce de votre demande.');}
 },[]);
 const form=useRef<HTMLFormElement>(null),result=useRef<HTMLDivElement>(null),inFlight=useRef(false);
 function change<K extends keyof QuoteData>(key:K,value:QuoteData[K]){setData(d=>({...d,[key]:value}));setErrors(e=>{const next={...e};delete next[key];if(key==='email'||key==='phone')delete next.contact;return next;});setStatus('');setSuccess(false);}
 async function submit(e:React.FormEvent<HTMLFormElement>){
  e.preventDefault();if(inFlight.current||estimateTransferError||photoError)return;
  const controls=new FormData(e.currentTarget);
  const input={...data,...(simpleContact?{kind:"contact"}:{}),language:locale,projectType:simpleContact?'':controls.get('projectType'),postcode:simpleContact?'':controls.get('postcode'),name:controls.get('name'),email:controls.get('email'),phone:controls.get('phone'),comments:controls.get('comments'),planStatus:controls.get('planStatus'),website:controls.get('website'),consent:controls.get('consent')==='on'};
  const validation=validateQuote(input);setErrors(validation.errors);setStatus('');setSuccess(false);
  if(!validation.valid){const key=Object.keys(validation.errors)[0];requestAnimationFrame(()=>document.getElementById(key==='contact'?'email':key)?.focus());return;}
  // Capture the actual controls as state too: autofill or input before hydration may not emit React changes.
  setData(validation.data);
  if(mailEnabled&&!data.token){setStatus('Veuillez effectuer la vérification anti-spam.');return;}
  inFlight.current=true;setPending(true);
  try{
   await submitContact({...validation.data,photos});
   trackContact({event:'inquiry_submitted',method:'email',project_type:simpleContact?'contact':validation.data.projectType as ProjectType});
   setSuccess(true);setStatus('Votre demande a été acceptée par notre service d’envoi. Nous reviendrons vers vous pour préciser le projet. Cet échange ne constitue ni un devis ni une réservation.');
  }catch(error){setStatus(error instanceof ContactSubmissionError?error.message:contactSendFailure);}
  finally{inFlight.current=false;setPending(false);setData(d=>({...d,token:''}));setChallengeKey(k=>k+1);requestAnimationFrame(()=>result.current?.focus());}
 }
 const field=(key:'postcode'|'name'|'email'|'phone',label:string,type='text',required=false)=><div className="form-field"><label htmlFor={key}>{label}{required?' *':''}</label><input id={key} name={key} type={type} autoComplete={{postcode:'postal-code',name:'name',email:'email',phone:'tel'}[key]} inputMode={key==='postcode'?'numeric':key==='phone'?'tel':key==='email'?'email':'text'} maxLength={key==='postcode'?5:key==='email'?254:key==='phone'?30:100} value={data[key]} required={required} aria-invalid={!!errors[key]||((key==='email'||key==='phone')&&!!errors.contact)} aria-describedby={errors[key]?`${key}-error`:(key==='email'||key==='phone')?'contact-help':undefined} onChange={e=>change(key,e.target.value)}/>{errors[key]&&<p className="field-error" id={`${key}-error`} role="alert">{errors[key]}</p>}</div>;
 return translatedNodes(<div className="quote-wizard short-inquiry"><div className="wizard-inner"><p className="inquiry-note">{simpleContact?"Votre nom, un moyen de contact et quelques mots sur votre projet suffisent.":"Conception seule, installation seule ou les deux. Quelques informations suffisent ; les détails techniques seront étudiés ensuite."}</p>{!mailEnabled&&<p className="wizard-delivery-note">L’envoi par e-mail n’est pas encore configuré. Le formulaire ne redirige pas vers WhatsApp. En attendant son activation, vous pouvez nous écrire directement à <a href={`mailto:${business.email}`}>{business.email}</a>.</p>}{(data.installationEstimate||estimateTransferError)&&<section className="estimate-attachment" aria-label="Estimation jointe"><h2>Votre estimation jointe</h2>{data.installationEstimate&&<pre>{localizedEstimateMessage(data.installationEstimate,locale)}</pre>}{estimateTransferError&&<p role="alert">{estimateTransferError}</p>}<button className="text-link" type="button" onClick={()=>{setData(d=>({...d,installationEstimate:undefined}));setEstimateTransferError('');}}>Retirer l’estimation de ma demande</button><p>Ce récapitulatif sera inclus dans votre demande. Vous pouvez joindre des photos ci-dessous.</p></section>}<form ref={form} noValidate onSubmit={submit}>{!simpleContact&&<><fieldset className="inquiry-types"><legend>Type de projet *</legend>{projectOptions.map((option,i)=><label key={option.id} className={`inquiry-choice ${data.projectType===option.id?'selected':''}`}><input type="radio" id={i===0?'projectType':`projectType-${option.id}`} name="projectType" value={option.id} checked={data.projectType===option.id} onChange={()=>change('projectType',option.id)} aria-invalid={!!errors.projectType} aria-describedby={errors.projectType?'projectType-error':undefined} required/><span>{option.label}</span></label>)}{errors.projectType&&<p className="field-error" id="projectType-error" role="alert">{errors.projectType}</p>}</fieldset><div className="inquiry-contact-grid">{field('postcode','Code postal','text',true)}{field('name','Votre nom','text',true)}</div><div className="form-field"><label htmlFor="planStatus">Avez-vous déjà un plan ou des photos ? <span>(facultatif)</span></label><select id="planStatus" name="planStatus" value={data.planStatus||''} onChange={e=>change('planStatus',e.target.value as PlanStatus|'')} aria-describedby="plan-help"><option value="">À préciser lors de notre échange</option>{planOptions.map(option=><option key={option.id} value={option.id}>{option.label}</option>)}</select><p id="plan-help" className="contact-help">Un plan finalisé permet de demander directement l’installation. Vous pourrez partager vos fichiers par e-mail ou WhatsApp après ce formulaire.</p></div></>}{simpleContact&&field('name','Votre nom','text',true)}<div className="form-field"><label htmlFor="comments">Votre projet <span>(facultatif)</span></label><textarea id="comments" name="comments" rows={4} maxLength={3000} placeholder="Décrivez votre cuisine, votre fournisseur, les dimensions approximatives et ce que vous souhaitez réaliser…" value={data.comments} onChange={e=>change('comments',e.target.value)} aria-invalid={!!errors.comments} aria-describedby={errors.comments?'comments-error':undefined}/>{errors.comments&&<p className="field-error" id="comments-error" role="alert">{errors.comments}</p>}</div><QuotePhotos onChange={setPhotos} onError={setPhotoError}/><p id="contact-help" className="contact-help">Renseignez au moins un moyen de contact : e-mail ou téléphone. Les deux ne sont pas obligatoires.</p><div className="inquiry-contact-grid">{field('email','Adresse e-mail','email')}{field('phone','Téléphone','tel')}</div>{errors.contact&&<p className="field-error" id="contact-error" role="alert">{errors.contact}</p>}<div className="hp-field" aria-hidden="true"><label htmlFor="website">Votre site</label><input id="website" name="website" tabIndex={-1} autoComplete="off" value={data.website} onChange={e=>change('website',e.target.value)}/></div><label className="consent"><input id="consent" name="consent" type="checkbox" checked={data.consent} onChange={e=>change('consent',e.target.checked)} aria-invalid={!!errors.consent} aria-describedby={errors.consent?'consent-error':undefined}/><span>J’ai lu la <Link href="/politique-confidentialite">politique de confidentialité</Link> et j’accepte l’utilisation de ces informations pour préparer mon échange avec ALBI RENO. Les données et les photos sélectionnées seront transmises au site pour traiter ma demande.</span></label>{errors.consent&&<p className="field-error" id="consent-error" role="alert">{errors.consent}</p>}{errors.installationEstimate&&<p className="field-error" role="alert">{errors.installationEstimate}</p>}{errors.website&&<p className="field-error" role="alert">{errors.website}</p>}{mailEnabled&&<SpamCheck key={challengeKey} onToken={token=>setData(d=>({...d,token}))} onError={()=>{setData(d=>({...d,token:''}));setStatus('La vérification anti-spam a échoué. Recommencez ou contactez-nous directement.');}}/>}<div className="wizard-actions"><button className="button" type="submit" disabled={pending||success||!!estimateTransferError||!!photoError}>{pending?'Envoi en cours…':'Envoyer une demande'}<Icon name="arrow" width={18}/></button></div><p className="inquiry-no-upload">Les photos sont facultatives. Elles seront jointes à l’envoi uniquement lorsque le service e-mail sera activé. Aucun fichier n’est publié sur le site.</p></form>{status&&<div className={`form-status ${success?'success':''}`} role="status" tabIndex={-1} ref={result}><p>{status}</p>{!success&&<p><a href={whatsappUrl()} target="_blank" rel="noopener noreferrer">Contacter ALBI RENO sur WhatsApp</a> ou <a href={`mailto:${business.email}`}>par e-mail</a>.</p>}</div>}</div></div>,locale);
}
