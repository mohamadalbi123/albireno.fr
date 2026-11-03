"use client";
import Link from "next/link";
import Script from "next/script";
import { useEffect, useRef, useState } from "react";
import { projectOptions, type ProjectType } from "@/lib/quote-flow";
import { validateQuote, quoteMessage, type QuoteData, type FieldErrors } from "@/lib/quote-validation";
import { whatsappUrl, business } from "@/lib/business";
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
  const container = useRef<HTMLDivElement>(null);
  const widget = useRef<string | undefined>(undefined);
  function render() {
    if (container.current && window.turnstile && widget.current === undefined)
      widget.current = window.turnstile.render(container.current, {
        sitekey: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY,
        action: "quote",
        language: "fr",
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
const blank:QuoteData={projectType:'',postcode:'',name:'',email:'',phone:'',comments:'',consent:false,website:'',token:''};
export function QuoteForm({mailEnabled=false,initialService=''}:{mailEnabled?:boolean;initialService?:ProjectType|''}){
 const [data,setData]=useState<QuoteData>({...blank,projectType:initialService}),[errors,setErrors]=useState<FieldErrors>({}),[pending,setPending]=useState(false),[status,setStatus]=useState(''),[prepared,setPrepared]=useState(''),[success,setSuccess]=useState(false),[challengeKey,setChallengeKey]=useState(0);
 const form=useRef<HTMLFormElement>(null),result=useRef<HTMLDivElement>(null),inFlight=useRef(false);
 function change<K extends keyof QuoteData>(key:K,value:QuoteData[K]){setData(d=>({...d,[key]:value}));setErrors(e=>{const next={...e};delete next[key];if(key==='email'||key==='phone')delete next.contact;return next;});setPrepared('');setStatus('');setSuccess(false);}
 async function submit(e:React.FormEvent<HTMLFormElement>){
  e.preventDefault();if(inFlight.current)return;
  const controls=new FormData(e.currentTarget);
  const input={...data,projectType:controls.get('projectType'),postcode:controls.get('postcode'),name:controls.get('name'),email:controls.get('email'),phone:controls.get('phone'),comments:controls.get('comments'),website:controls.get('website'),consent:controls.get('consent')==='on'};
  const validation=validateQuote(input);setErrors(validation.errors);setStatus('');setPrepared('');setSuccess(false);
  if(!validation.valid){const key=Object.keys(validation.errors)[0];requestAnimationFrame(()=>document.getElementById(key==='contact'?'email':key)?.focus());return;}
  if(!mailEnabled){setPrepared(whatsappUrl(quoteMessage(validation.data)));setStatus('Votre message est prêt. Aucun message n’a été envoyé. Ouvrez WhatsApp pour le vérifier et décidez de l’envoyer dans l’application.');requestAnimationFrame(()=>result.current?.focus());return;}
  if(!data.token){setStatus('Veuillez effectuer la vérification anti-spam.');return;}
  inFlight.current=true;setPending(true);
  try{
   const response=await fetch('/api/devis',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(validation.data),signal:AbortSignal.timeout(20000)});
   const receipt=await response.json();
   if(!response.ok){if(receipt.errors)setErrors(receipt.errors);throw new Error(receipt.message||'L’envoi n’a pas pu être confirmé.');}
   if(receipt.sent!==true)throw new Error('L’envoi n’a pas pu être confirmé. Contactez-nous directement.');
   setSuccess(true);setStatus('Votre demande a été acceptée par notre service d’envoi. Nous reviendrons vers vous pour préciser le projet. Cet échange ne constitue ni un devis ni une réservation.');
  }catch(error){setStatus(error instanceof Error?error.message:'L’envoi n’a pas pu être confirmé. Contactez-nous directement.');}
  finally{inFlight.current=false;setPending(false);setData(d=>({...d,token:''}));setChallengeKey(k=>k+1);requestAnimationFrame(()=>result.current?.focus());}
 }
 const field=(key:'postcode'|'name'|'email'|'phone',label:string,type='text',required=false)=><div className="form-field"><label htmlFor={key}>{label}{required?' *':''}</label><input id={key} name={key} type={type} autoComplete={{postcode:'postal-code',name:'name',email:'email',phone:'tel'}[key]} inputMode={key==='postcode'?'numeric':key==='phone'?'tel':key==='email'?'email':'text'} maxLength={key==='postcode'?5:key==='email'?254:key==='phone'?30:100} value={data[key]} required={required} aria-invalid={!!errors[key]||((key==='email'||key==='phone')&&!!errors.contact)} aria-describedby={errors[key]?`${key}-error`:(key==='email'||key==='phone')?'contact-help':undefined} onChange={e=>change(key,e.target.value)}/>{errors[key]&&<p className="field-error" id={`${key}-error`} role="alert">{errors[key]}</p>}</div>;
 return <div className="quote-wizard short-inquiry"><div className="wizard-inner"><p className="inquiry-note">Conception seule, installation seule ou les deux. Quelques informations suffisent ; les détails techniques seront étudiés ensuite.</p>{!mailEnabled&&<p className="wizard-delivery-note">L’envoi automatique par e-mail est désactivé. Ce formulaire prépare votre message pour WhatsApp ; vous le vérifiez et l’envoyez vous-même. Vous pouvez aussi écrire directement à <a href={`mailto:${business.email}`}>{business.email}</a>.</p>}<form ref={form} noValidate onSubmit={submit}><fieldset className="inquiry-types"><legend>Type de projet *</legend>{projectOptions.map((option,i)=><label key={option.id} className={`inquiry-choice ${data.projectType===option.id?'selected':''}`}><input type="radio" id={i===0?'projectType':`projectType-${option.id}`} name="projectType" value={option.id} checked={data.projectType===option.id} onChange={()=>change('projectType',option.id)} aria-invalid={!!errors.projectType} aria-describedby={errors.projectType?'projectType-error':undefined} required/><span>{option.label}</span></label>)}{errors.projectType&&<p className="field-error" id="projectType-error" role="alert">{errors.projectType}</p>}</fieldset><div className="inquiry-contact-grid">{field('postcode','Code postal','text',true)}{field('name','Votre nom','text',true)}</div><div className="form-field"><label htmlFor="comments">Votre projet <span>(facultatif)</span></label><textarea id="comments" name="comments" rows={4} maxLength={3000} placeholder="Décrivez votre cuisine, votre fournisseur, les dimensions approximatives ou la date souhaitée…" value={data.comments} onChange={e=>change('comments',e.target.value)} aria-invalid={!!errors.comments} aria-describedby={errors.comments?'comments-error':undefined}/>{errors.comments&&<p className="field-error" id="comments-error" role="alert">{errors.comments}</p>}</div><p id="contact-help" className="contact-help">Renseignez au moins un moyen de contact : e-mail ou téléphone. Les deux ne sont pas obligatoires.</p><div className="inquiry-contact-grid">{field('email','Adresse e-mail','email')}{field('phone','Téléphone','tel')}</div>{errors.contact&&<p className="field-error" id="contact-error" role="alert">{errors.contact}</p>}<div className="hp-field" aria-hidden="true"><label htmlFor="website">Votre site</label><input id="website" name="website" tabIndex={-1} autoComplete="off" value={data.website} onChange={e=>change('website',e.target.value)}/></div><label className="consent"><input id="consent" name="consent" type="checkbox" checked={data.consent} onChange={e=>change('consent',e.target.checked)} aria-invalid={!!errors.consent} aria-describedby={errors.consent?'consent-error':undefined}/><span>J’ai lu la <Link href="/politique-confidentialite">politique de confidentialité</Link> et j’accepte l’utilisation de ces informations pour préparer mon échange avec ALBI RENO. {mailEnabled?'Les données seront transmises via le formulaire.':'Le texte sera transmis à WhatsApp uniquement si j’ouvre le lien préparé.'}</span></label>{errors.consent&&<p className="field-error" id="consent-error" role="alert">{errors.consent}</p>}{errors.website&&<p className="field-error" role="alert">{errors.website}</p>}{mailEnabled&&<SpamCheck key={challengeKey} onToken={token=>setData(d=>({...d,token}))} onError={()=>{setData(d=>({...d,token:''}));setStatus('La vérification anti-spam a échoué. Recommencez ou contactez-nous directement.');}}/>}<div className="wizard-actions"><button className="button" type="submit" disabled={pending||success}>{pending?'Envoi en cours…':mailEnabled?'Envoyer ma demande':'Préparer ma demande WhatsApp'}<Icon name="arrow" width={18}/></button></div><p className="inquiry-no-upload">Aucun fichier n’est téléversé par ce formulaire. Vous pourrez partager vos photos ou votre plan directement lors de l’échange par e-mail ou WhatsApp.</p></form>{status&&<div className={`form-status ${success?'success':''}`} role="status" tabIndex={-1} ref={result}><p>{status}</p>{prepared&&<a className="button" href={prepared} target="_blank" rel="noopener noreferrer">Ouvrir WhatsApp pour vérifier <Icon name="diagonal" width={18}/></a>}{!prepared&&!success&&<p><a href={whatsappUrl()} target="_blank" rel="noopener noreferrer">Contacter ALBI RENO sur WhatsApp</a> ou <a href={`mailto:${business.email}`}>par e-mail</a>.</p>}</div>}</div></div>;
}
