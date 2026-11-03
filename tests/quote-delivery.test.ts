import {test} from 'node:test';
import assert from 'node:assert/strict';
import {quoteEmailPayload,isDeliveryReceipt} from '../lib/quote-delivery.ts';
import {validateQuote} from '../lib/quote-validation.ts';
const data=validateQuote({projectType:'installation',postcode:'17000',name:'Test de livraison',phone:'0600000000',email:'',consent:true}).data;
test('phone-only inquiry goes to the public business inbox without a forged reply-to',()=>{const payload=quoteEmailPayload(data,'Approved Sender <sender@example.com>');assert.deepEqual(payload.to,['albireno@icloud.com']);assert.equal('reply_to' in payload,false);assert.match(payload.text,/Téléphone : 0600000000/);assert.equal(payload.subject,'Demande de devis — 17000');});
test('email inquiry sets a validated visitor reply-to while preserving sender config',()=>{const payload=quoteEmailPayload({...data,email:'visitor@example.com'},'Verified Sender <sender@example.com>');assert.equal(payload.reply_to,'visitor@example.com');assert.equal(payload.from,'Verified Sender <sender@example.com>');});
test('only a nonempty provider receipt can confirm sending',()=>{assert.equal(isDeliveryReceipt({id:'provider-receipt'}),true);for(const value of [null,{},true,{id:''},{id:' '},{id:123},{error:'denied'}])assert.equal(isDeliveryReceipt(value),false);});
