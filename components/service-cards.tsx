import Link from 'next/link';
import { featuredServices } from '@/lib/services';
import { serviceEditorialImage } from '@/lib/inspiration';
import { ProjectImage } from './project-image';
import { Icon } from './icon';
export function ServiceCards(){return <div className="service-grid kitchen-services two-services">{featuredServices.map(s=><article className={`service-card service-${s.id}`} id={s.id} key={s.slug}><figure className="service-thumb photo-thumb"><Link href={`/${s.slug}`} tabIndex={-1} aria-hidden="true"><ProjectImage image={serviceEditorialImage(s.id)} sizes="(max-width: 700px) 90vw, 45vw"/></Link><figcaption>Inspiration générée par IA · illustration du service</figcaption></figure><span className="service-number">{s.number}</span><h3><Link href={`/${s.slug}`}>{s.title}<Icon name="diagonal" width={22}/></Link></h3><p className="service-subtitle">{s.short}</p><p>{s.intro}</p><ul className="service-features">{s.examples.map(feature=><li key={feature}>{feature}</li>)}</ul><Link className="service-enquiry" href="/contact">Nous contacter<Icon name="arrow" width={16}/></Link></article>)}</div>;}
