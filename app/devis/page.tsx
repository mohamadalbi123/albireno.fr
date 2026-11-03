import { PageIntro } from '@/components/ui';
import { QuoteForm } from '@/components/quote-form';
import { serviceSelection } from '@/lib/quote-flow';
import { mailReady, pageMetadata } from '@/lib/site';
export const dynamic='force-dynamic';
export const metadata=pageMetadata('Parlons de votre projet de cuisine','Conception de cuisine, installation seule ou projet complet à La Rochelle et ses alentours : un formulaire court pour préparer votre premier échange.','/devis');
export default async function Quote({searchParams}:{searchParams:Promise<{service?:string}>}){
 const {service}=await searchParams;const selected=serviceSelection(service);
 return <><PageIntro eyebrow="Un premier échange, simplement" title="Parlons de votre projet de cuisine" text="Quelques informations suffisent pour commencer."/><section className="container section wizard-container"><QuoteForm mailEnabled={mailReady} initialService={selected} key={selected||'general'}/><p className="wizard-endnote">Activité cuisine en préparation. Cet échange concerne un futur projet ; il ne constitue ni un devis contractuel, ni une prestation payante, ni une réservation d’intervention.</p></section></>;
}
