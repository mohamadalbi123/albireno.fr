import type {ReactNode} from 'react';
import * as ui from '@/components/ui';
import {Footer} from '@/components/footer';
import {ServiceCards} from '@/components/service-cards';
import {ProjectImage} from '@/components/project-image';
import {InspirationFigure} from '@/components/inspiration-figure';
import {PricingOverview} from '@/components/pricing-overview';
import {HowItWorks} from '@/components/how-it-works';
import {translatedNodes} from '@/components/translated-content';
import type {Locale} from './i18n';
// Expand only these known, synchronous server presentation components. Never call hooks/client boundaries.
const renderers=new Set<unknown>([...Object.values(ui),Footer,ServiceCards,ProjectImage,InspirationFigure,PricingOverview,HowItWorks]);
export function serverTranslation(node:ReactNode,locale:Locale){return translatedNodes(node,locale,element=>renderers.has(element.type)?(element.type as (props:Record<string,unknown>)=>ReactNode)(element.props):element);}
