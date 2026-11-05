import { PageIntro } from '@/components/ui';
import { QuoteForm } from '@/components/quote-form';
import { serviceSelection } from '@/lib/quote-flow';
import { mailReady, pageMetadata } from '@/lib/site';
export const dynamic='force-dynamic';
export const metadata=pageMetadata('Demande de devis cuisine à La Rochelle','Préparez votre demande de pose ou d’installation de cuisine à La Rochelle, avec ou sans conception 3D. Premier échange pour un futur projet ; activité en préparation.','/devis');
export default async function Quote({searchParams}:{searchParams:Promise<{service?:string}>}){
 const {service}=await searchParams;const selected=serviceSelection(service);
 return <><PageIntro eyebrow="Un premier échange, simplement" title="Préparons votre demande de devis" text="Installation, conception 3D ou les deux : quelques informations suffisent pour préparer un premier échange sur votre futur projet."/><section className="container section wizard-container"><QuoteForm mailEnabled={mailReady} initialService={selected} key={selected||'general'}/><p className="wizard-endnote">Activité cuisine en préparation. Cet échange concerne un futur projet ; il ne constitue ni un devis contractuel, ni une prestation payante, ni une réservation d’intervention.</p></section></>;
}
