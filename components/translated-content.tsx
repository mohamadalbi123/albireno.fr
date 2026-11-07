import {cloneElement,isValidElement,type ReactNode,type ReactElement} from 'react';
import {t,localePath,type Locale} from '@/lib/i18n';
type Props=Record<string,unknown>;
export function translatedNodes(node:ReactNode,locale:Locale,resolve?:(node:ReactElement<Props>)=>ReactNode):ReactNode{
 if(typeof node==='string')return t(node,locale);
 if(Array.isArray(node))return node.map((n,i)=><TranslatedKey key={isValidElement(n)?n.key??i:i}>{translatedNodes(n,locale,resolve)}</TranslatedKey>);
 if(!isValidElement<Props>(node))return node;
 if(resolve){const expanded=resolve(node);if(expanded!==node)return translatedNodes(expanded,locale,resolve);}
 const props:Props={};
 for(const key of ['alt','title','aria-label','placeholder','label','text','eyebrow'])if(typeof node.props[key]==='string')props[key]=t(node.props[key] as string,locale);
 if(typeof node.props.href==='string')props.href=localePath(node.props.href,locale);
 if('children' in node.props)props.children=translatedNodes(node.props.children as ReactNode,locale,resolve);
 return cloneElement(node,props);
}
function TranslatedKey({children}:{children:ReactNode}){return children;}
