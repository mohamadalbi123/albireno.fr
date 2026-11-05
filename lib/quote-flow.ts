export const projectOptions = [
  {id:'conception',label:'Je souhaite concevoir ma cuisine'},
  {id:'installation',label:'Je souhaite faire installer ma cuisine'},
  {id:'complet',label:'Je souhaite concevoir et installer ma cuisine'},
] as const;
export type ProjectType = typeof projectOptions[number]['id'];
export function serviceSelection(value?:string):ProjectType|''{
 if(value==='conception'||value==='conception-cuisine-3d')return 'conception';
 if(value==='installation'||value==='installation-cuisine-la-rochelle')return 'installation';
 return value==='complet'?'complet':'';
}

export const planOptions = [
  {id:'plan',label:'J’ai un plan de cuisine'},
  {id:'photos',label:'J’ai des photos de l’espace'},
  {id:'both',label:'J’ai un plan et des photos'},
  {id:'none',label:'Je n’ai pas encore de plan ni de photos'},
] as const;
export type PlanStatus = typeof planOptions[number]['id'];
