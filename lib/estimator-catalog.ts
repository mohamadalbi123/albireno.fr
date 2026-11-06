/** Presentation metadata only. All prices come from kitchen-estimate.ts. */
import {cabinetRates,itemRates,type CabinetType,type ItemType,type EstimateInput} from './kitchen-estimate.ts';
export const categories=['Meubles bas','Meubles hauts','Colonnes','Électroménager','Finitions et équipements'] as const;
export type CatalogCategory=typeof categories[number];
export type CatalogProduct={id:CabinetType|ItemType;kind:'cabinet'|'item';category:CatalogCategory;label:string;rate:number;unit:string};
const cabinetCategory:Record<CabinetType,CatalogCategory>={baseSmall:'Meubles bas',baseLarge:'Meubles bas',baseDrawers:'Meubles bas',sinkCabinet:'Meubles bas',corner:'Meubles bas',island:'Meubles bas',wallSmall:'Meubles hauts',wallLarge:'Meubles hauts',tall:'Colonnes',tallDrawers:'Colonnes',tallOven:'Colonnes'};
export const catalog:CatalogProduct[]=[...Object.entries(cabinetRates).map(([id,[label,rate]])=>({id:id as CabinetType,kind:'cabinet' as const,category:cabinetCategory[id as CabinetType],label,rate,unit:'u'})),...Object.entries(itemRates).map(([id,[label,rate,unit,group]])=>({id:id as ItemType,kind:'item' as const,category:(group==='Électroménager'?'Électroménager':'Finitions et équipements') as CatalogCategory,label,rate,unit}))];
export function withCabinetCount(input:EstimateInput,type:CabinetType,count:number,makeId:()=>string=()=>crypto.randomUUID()):EstimateInput{
 const current=input.cabinets.filter(c=>c.type===type),others=input.cabinets.filter(c=>c.type!==type);
 if(!Number.isInteger(count)||count<0||count+others.length>100)throw new Error('Nombre de meubles invalide.');
 return {...input,cabinets:[...others,...current.slice(0,count),...Array.from({length:Math.max(0,count-current.length)},()=>({id:makeId(),type}))]};
}
