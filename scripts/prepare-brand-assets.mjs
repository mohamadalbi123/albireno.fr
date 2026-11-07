/** Deterministic derivatives of the owner-supplied logo; artwork is never redrawn. */
import sharp from 'sharp';import {readFile,writeFile,mkdir} from 'node:fs/promises';import {resolve} from 'node:path';
const source=process.argv[2];if(!source)throw new Error('Provide the original logo PNG path.');
const bytes=await readFile(source),meta=await sharp(bytes).metadata();if(!meta.width||!meta.height)throw new Error('Invalid logo.');
const crop=(l,t,w,h)=>({left:Math.round(meta.width*l),top:Math.round(meta.height*t),width:Math.round(meta.width*w),height:Math.round(meta.height*h)});
await mkdir('public/brand',{recursive:true});await writeFile('public/brand/albireno-logo-original.png',bytes);
await sharp(bytes).resize({width:720,withoutEnlargement:true}).webp({quality:90}).toFile('public/brand/albireno-logo.webp');
await sharp(bytes).extract(crop(.10,.61,.80,.29)).resize({width:600,withoutEnlargement:true}).webp({quality:92}).toFile('public/brand/albireno-wordmark.webp');
const emblem=await sharp(bytes).extract(crop(.26,.07,.50,.54)).resize(256,256,{fit:'contain',background:'#ffffff'}).png().toBuffer();
await writeFile('public/brand/albireno-emblem.png',emblem);
await sharp(emblem).resize(180,180).png().toFile('app/apple-icon.png');await sharp(emblem).resize(192,192).png().toFile('public/brand/icon-192.png');await sharp(emblem).resize(512,512).png().toFile('public/brand/icon-512.png');
const entries=await Promise.all([32,48,64].map(async size=>({size,png:await sharp(emblem).resize(size,size).ensureAlpha().png().toBuffer()})));
const header=Buffer.alloc(6+entries.length*16);header.writeUInt16LE(1,2);header.writeUInt16LE(entries.length,4);let offset=header.length;entries.forEach(({size,png},i)=>{const p=6+i*16;header[p]=size;header[p+1]=size;header.writeUInt16LE(1,p+4);header.writeUInt16LE(32,p+6);header.writeUInt32LE(png.length,p+8);header.writeUInt32LE(offset,p+12);offset+=png.length;});await writeFile('app/favicon.ico',Buffer.concat([header,...entries.map(e=>e.png)]));
// SVG container embeds the original raster emblem: this is not a traced/vector logo claim.
await writeFile('app/icon.svg',`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><image width="256" height="256" href="data:image/png;base64,${emblem.toString('base64')}"/></svg>`);
console.log(JSON.stringify({sourceDimensions:[meta.width,meta.height],assets:'original, full WebP, wordmark crop, emblem, SVG/ICO/PNG/Apple icons'}));
