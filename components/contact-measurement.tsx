'use client';
import { business } from '@/lib/business';
import { useEffect } from 'react';
import { trackContact } from '@/lib/contact-events';

/** Prepare contact events without installing an analytics or advertising provider. */
export function ContactMeasurement() {
  useEffect(() => {
    function click(event: MouseEvent) {
      const target = event.target instanceof Element ? event.target : null;
      const link = target?.closest('a[href]');
      if (!link) return;
      const href = link.getAttribute('href') || '';
      if (href.startsWith('tel:')) {
        // Exclude the hosting provider's legal phone number.
        if (href === `tel:${business.phone.replace(/[^+\d]/g, '')}`) trackContact({ event: 'contact_click', method: 'phone' });
      } else if (href.startsWith(`https://wa.me/${business.whatsappNumber}?`)) {
        trackContact({ event: 'contact_click', method: 'whatsapp' });
      } else if (href.toLowerCase() === `mailto:${business.email.toLowerCase()}`) {
        trackContact({ event: 'contact_click', method: 'email' });
      }
    }
    document.addEventListener('click', click, true);
    return () => document.removeEventListener('click', click, true);
  }, []);
  return null;
}
