import {parseEstimate,itemRates,type EstimateInput} from './kitchen-estimate.ts';
export const estimateSessionKey='albireno-estimate-session-v2';
export function parseEstimatorSession(raw:string):{input:EstimateInput;drafts:Record<string,string>}{
 if(raw.length>50000)throw new Error('Invalid saved estimate');
 const saved=JSON.parse(raw);
 return {input:parseEstimate(saved.input),drafts:saved.drafts&&typeof saved.drafts==='object'?Object.fromEntries(Object.entries(saved.drafts).filter(([key,value])=>Object.hasOwn(itemRates,key)&&typeof value==='string'&&value.length<=30)) as Record<string,string>:{}};
}
