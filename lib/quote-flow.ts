export const projectOptions = [
  {id:'conception',label:'Je souhaite concevoir ma cuisine'},
  {id:'installation',label:'J’ai déjà ma cuisine et je cherche un installateur'},
  {id:'complet',label:'Je souhaite concevoir et installer ma cuisine'},
] as const;
export type ProjectType = typeof projectOptions[number]['id'];
export function serviceSelection(value?:string):ProjectType|''{
 if(value==='conception'||value==='conception-cuisine-3d')return 'conception';
 if(value==='installation'||value==='installation-cuisine-la-rochelle')return 'installation';
 return value==='complet'?'complet':'';
}
