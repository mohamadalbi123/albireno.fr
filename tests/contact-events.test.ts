import { test } from 'node:test';
import assert from 'node:assert/strict';
import { trackContact, contactEventName } from '../lib/contact-events.ts';
import { validateQuote, quoteMessage } from '../lib/quote-validation.ts';

test('optional existing plan information survives validation and the enquiry summary', () => {
  const input={projectType:'installation',postcode:'17000',name:'Test projet',email:'test@example.com',consent:true};
  assert.equal(validateQuote(input).valid,true);
  const result=validateQuote({...input,planStatus:'both'});
  assert.equal(result.valid,true);
  assert.match(quoteMessage(result.data),/J’ai un plan et des photos/);
  assert.equal(validateQuote({...input,planStatus:'untrusted'}).valid,false);
});

test('measurement excludes extra form data and URL query parameters', () => {
  const seen: CustomEvent[]=[];
  Object.defineProperty(globalThis,'window',{configurable:true,value:{location:{pathname:'/devis',search:'?email=private@example.com'},dispatchEvent:(e:CustomEvent)=>{seen.push(e);}}});
  try {
    const input={event:'inquiry_handoff' as const,method:'whatsapp' as const,project_type:'installation' as const,email:'private@example.com',comments:'private text'};
    trackContact(input);
    assert.equal(seen[0].type,contactEventName);
    assert.deepEqual(seen[0].detail,{event:'inquiry_handoff',method:'whatsapp',project_type:'installation',page_path:'/devis'});
    Object.defineProperty(window,'dispatchEvent',{value:()=>{throw new Error('adapter failure');}});
    assert.doesNotThrow(()=>trackContact(input));
  } finally { Reflect.deleteProperty(globalThis,'window'); }
  assert.doesNotThrow(()=>trackContact({event:'contact_click',method:'phone'}));
});
