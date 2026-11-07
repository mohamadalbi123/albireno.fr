import assert from 'node:assert/strict';import {test} from 'node:test';
import {catalog,withCabinetCount} from '../lib/estimator-catalog.ts';
import {cabinetRates,itemRates,emptyEstimate,calculateEstimate,type CabinetType,type ItemType} from '../lib/kitchen-estimate.ts';
function kitchen(cabinets:Partial<Record<CabinetType,number>>,items:Partial<Record<ItemType,number>>){let e=emptyEstimate();let i=0;for(const [type,n] of Object.entries(cabinets))e=withCabinetCount(e,type as CabinetType,n,()=>`c${i++}`);Object.assign(e.items,items);return e;}
test('catalogue has every existing item once and reads all rates from the unchanged engine',()=>{assert.equal(catalog.length,33);assert.equal(new Set(catalog.map(p=>p.id)).size,33);for(const p of catalog){const rate=p.kind==='cabinet'?cabinetRates[p.id as CabinetType]:itemRates[p.id as ItemType];assert.equal(p.rate,rate[1]);assert.equal(p.label,rate[0]);}});
test('scenario A: 3 base, 2 wall, sink cabinet, oven, hob, 3m worktop = 710 euros',()=>{assert.equal(calculateEstimate(kitchen({baseSmall:3,wallSmall:2,sinkCabinet:1},{oven:1,hob:1,worktop:3})).total,710);});
test('scenario B: family kitchen = 1340 euros',()=>{assert.equal(calculateEstimate(kitchen({baseSmall:4,baseDrawers:2,wallSmall:3,tall:1},{dishwasher:1,oven:1,hood:1,worktop:5})).total,1340);});
test('scenario C: island kitchen = 1627.50 euros with distinct cabinet, appliance, cuts and finishes',()=>{const e=kitchen({baseSmall:3,baseDrawers:2,tallOven:1,island:2},{oven:1,microwave:1,hob:1,dishwasher:1,worktop:4.5,backsplash:1.5,plinth:4,endPanel:2,sinkCutout:1,hobCutout:1, joint:1});assert.equal(calculateEstimate(e).total,1627.5);assert.equal(e.cabinets.length,8);});
test('quantity changes preserve other selections, remove units and never add duplicate physical IDs',()=>{let e=kitchen({baseSmall:3,baseDrawers:2},{oven:1});e=withCabinetCount(e,'baseSmall',1);assert.equal(e.cabinets.filter(c=>c.type==='baseSmall').length,1);assert.equal(e.cabinets.filter(c=>c.type==='baseDrawers').length,2);assert.equal(e.items.oven,1);e=withCabinetCount(e,'baseSmall',0);assert.equal(e.cabinets.length,2);assert.throws(()=>withCabinetCount(e,'baseSmall',-1));assert.throws(()=>withCabinetCount(e,'baseSmall',99));assert.throws(()=>withCabinetCount(e,'baseSmall',.5));});

test('every count product increments by exactly one, clamps at zero, and never becomes fractional',async()=>{
 const {adjustCatalogCount}=await import('../lib/estimator-catalog.ts');
 for(const product of catalog.filter(p=>p.unit==='u')){
  let input=emptyEstimate();input=adjustCatalogCount(input,product,-1);
  const count=()=>product.kind==='cabinet'?input.cabinets.filter(c=>c.type===product.id).length:input.items[product.id as keyof typeof input.items];
  assert.equal(count(),0);for(let n=1;n<=5;n++){input=adjustCatalogCount(input,product,1);assert.equal(count(),n);assert.ok(Number.isInteger(count()));}for(let n=4;n>=0;n--){input=adjustCatalogCount(input,product,-1);assert.equal(count(),n);}
 }
});
