/** Browser-only measurement contract. No storage, identifiers or external collector. */
export const contactEventName = 'albireno:conversion';
export type ContactEvent =
  | { event: 'contact_click'; method: 'phone' | 'whatsapp' | 'email' }
  | { event: 'inquiry_handoff'; method: 'whatsapp'; project_type: 'conception' | 'installation' | 'complet' }
  | { event: 'inquiry_submitted'; method: 'email'; project_type: 'conception' | 'installation' | 'complet' };
export function trackContact(detail: ContactEvent) {
  if (typeof window === 'undefined') return;
  // Explicit allowlist: never forward the form, link text/URL, query string or contact details.
  const payload = {
    event: detail.event,
    method: detail.method,
    ...('project_type' in detail ? { project_type: detail.project_type } : {}),
    page_path: window.location.pathname,
  };
  try {
    window.dispatchEvent(new CustomEvent(contactEventName, { detail: payload }));
  } catch {
    // Measurement must never interrupt contact navigation or a confirmed submission.
  }
}
