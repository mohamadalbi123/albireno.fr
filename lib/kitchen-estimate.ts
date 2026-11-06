/** Owner-supplied labour rates, 5 November 2026. No tax regime inferred. */
export const estimateVersion = 2;
export const cabinetRates = {
 baseSmall: ['Meuble bas 30–60 cm',75], baseLarge:['Meuble bas 61–120 cm',95], baseDrawers:['Meuble bas avec tiroirs',95],
 wallSmall:['Meuble haut 30–60 cm',65],wallLarge:['Meuble haut 61–120 cm',85],tall:['Colonne standard',150],tallDrawers:['Colonne avec tiroirs',175],
 tallOven:['Colonne four / micro-ondes',180],corner:['Meuble d’angle',130],island:['Meuble pour îlot',95],sinkCabinet:['Meuble sous-évier',85],
} as const;
export const itemRates = {
 worktop:['Plan de travail stratifié',55,'m','Finitions'],sinkCutout:['Découpe évier',50,'u','Finitions'],hobCutout:['Découpe plaque de cuisson',50,'u','Finitions'],joint:['Jonction d’angle',65,'u','Finitions'],
 backsplash:['Crédence stratifiée',50,'m²','Finitions'],endPanel:['Joue de finition',30,'u','Finitions'],filler:['Fileur / panneau d’ajustement',25,'u','Finitions'],plinth:['Plinthe de cuisine',15,'m','Finitions'],
 oven:['Four encastrable',55,'u','Électroménager'],microwave:['Micro-ondes encastrable',45,'u','Électroménager'],hob:['Plaque de cuisson',50,'u','Électroménager'],dishwasher:['Lave-vaisselle intégrable',85,'u','Électroménager'],fridge:['Réfrigérateur intégrable',85,'u','Électroménager'],hood:['Hotte aspirante',90,'u','Électroménager'],washer:['Lave-linge encastrable',75,'u','Électroménager'],
 sink:['Évier',65,'u','Évier et accessoires'],tap:['Robinet / mitigeur',45,'u','Évier et accessoires'],siphon:['Siphon et raccordement sur évacuation existante',40,'u','Évier et accessoires'],dishwasherConnection:['Raccordement lave-vaisselle sur attente existante',35,'u','Évier et accessoires'],
 removeCabinet:['Dépose meuble bas / haut',30,'u','Dépose'],removeTall:['Dépose colonne',50,'u','Dépose'],removeWorktop:['Dépose ancien plan de travail',25,'m','Dépose'],
} as const;
export const quoteOnlyLabels = {specialistWorktop:'Plan de travail en pierre, quartz, céramique ou autre matériau spécialisé',complexFixing:'Fixations complexes',networks:'Modifications de plomberie ou d’électricité',disposal:'Évacuation des anciens meubles'} as const;
export type CabinetType=keyof typeof cabinetRates;
export type ItemType=keyof typeof itemRates;
export type EstimateInput={version:2;cabinets:{id:string;type:CabinetType}[];items:Record<ItemType,number>;quoteOnly:Record<keyof typeof quoteOnlyLabels,boolean>;design:boolean};
export const estimateDisclaimer="Estimation indicative de main-d'œuvre, sous réserve de validation du projet, des conditions de pose et d'un devis définitif. Mobilier, équipements, fournitures spécifiques et travaux supplémentaires non inclus.";
export const formatEuros=(n:number)=>new Intl.NumberFormat('fr-FR',{style:'currency',currency:'EUR'}).format(n);
export function emptyEstimate():EstimateInput{return {version:2,cabinets:[],items:Object.fromEntries(Object.keys(itemRates).map(k=>[k,0])) as EstimateInput['items'],quoteOnly:Object.fromEntries(Object.keys(quoteOnlyLabels).map(k=>[k,false])) as EstimateInput['quoteOnly'],design:false};}
/** Ignore external totals/rates: only validated quantities are retained and priced here. */
export function parseEstimate(raw:unknown):EstimateInput{
 if(!raw||typeof raw!=='object')throw new Error('Estimation invalide.');
 const r=raw as Record<string,unknown>;
 if(r.version!==estimateVersion||!Array.isArray(r.cabinets)||r.cabinets.length>100||!r.items||typeof r.items!=='object'||!r.quoteOnly||typeof r.quoteOnly!=='object'||typeof r.design!=='boolean')throw new Error('Version ou contenu de l’estimation invalide.');
 const result=emptyEstimate(), ids=new Set<string>();
 result.cabinets=r.cabinets.map(c=>{if(!c||typeof c.id!=='string'||!/^[\w-]{1,60}$/.test(c.id)||ids.has(c.id)||!Object.hasOwn(cabinetRates,c.type))throw new Error('Chaque meuble doit avoir un identifiant unique et un seul type.');ids.add(c.id);return {id:c.id,type:c.type as CabinetType};});
 for(const [key,rate] of Object.entries(itemRates)){
  const value=(r.items as Record<string,unknown>)[key];
  if(typeof value!=='number'||!Number.isFinite(value)||value<0||value>100||(rate[2]==='u'?!Number.isInteger(value):Math.abs(value*100-Math.round(value*100))>1e-6))throw new Error('Quantité invalide : '+rate[0]);
  result.items[key as ItemType]=value;
 }
 for(const key of Object.keys(quoteOnlyLabels) as (keyof typeof quoteOnlyLabels)[]){const value=(r.quoteOnly as Record<string,unknown>)[key];if(typeof value!=='boolean')throw new Error('Option sur devis invalide.');result.quoteOnly[key]=value;}
 result.design=r.design;return result;
}
export function calculateEstimate(raw:unknown){
 const input=parseEstimate(raw),counts=new Map<CabinetType,number>();input.cabinets.forEach(c=>counts.set(c.type,(counts.get(c.type)||0)+1));
 const lines:{key:string;label:string;quantity:number;unit:string;rate:number;total:number}[]=[];
 for(const [key,n] of counts){const [label,rate]=cabinetRates[key];lines.push({key,label,quantity:n,unit:'u',rate,total:n*rate});}
 for(const [key,[label,rate,unit]] of Object.entries(itemRates)){const quantity=input.items[key as ItemType];if(quantity)lines.push({key,label,quantity,unit,rate,total:Math.round(quantity*rate*100)/100});}
 const subtotal=Math.round(lines.reduce((sum,l)=>sum+l.total,0)*100)/100,minimum=subtotal>0&&subtotal<150?Math.round((150-subtotal)*100)/100:0;
 const quoteOnly=Object.entries(quoteOnlyLabels).filter(([key])=>input.quoteOnly[key as keyof typeof quoteOnlyLabels]).map(([,label])=>label);
 return {input,lines,subtotal,minimum,total:subtotal?subtotal+minimum:input.design&&!quoteOnly.length?0:null,quoteOnly,hasSelection:!!(lines.length||quoteOnly.length||input.design)};
}
export function estimateMessage(raw:unknown){const e=calculateEstimate(raw);return ['ESTIMATION INDICATIVE DE MAIN-D’ŒUVRE',...e.lines.map(l=>`${l.label} : ${l.quantity.toLocaleString('fr-FR')} ${l.unit} × ${formatEuros(l.rate)} = ${formatEuros(l.total)}`),...(e.minimum?[`Complément au minimum d’intervention de 150 € : ${formatEuros(e.minimum)}`]:[]),`Total indicatif${e.quoteOnly.length?' hors prestations sur devis':''} : ${e.total===null?'Sur devis':formatEuros(e.total)}`,...e.quoteOnly.map(l=>`${l} : sur devis`),...(e.input.design?['Conception 3D gratuite, sans engagement. Une proposition initiale et une révision raisonnable pour les projets éligibles ; périmètre confirmé lors du premier échange.']:[]),estimateDisclaimer,'Fiscalité à confirmer sur le devis définitif. Activité cuisine en préparation : aucune prestation payante ni réservation à ce stade.'].join('\n');}
