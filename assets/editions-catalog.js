/* DOMINUS editions — one data source, no fabricated or empty store links. */
(()=>{'use strict';const el=document.querySelector('[data-editions-catalog]');if(!el)return;
const lang=(document.documentElement.lang||'en').toLowerCase(),locale=['en','de','it','fr','es','pt-br','nl','pl'].includes(lang)?lang:'en';
const prefix=location.pathname.match(/\/(en|de|it|fr|es|pt-br|nl|pl)\//)?'../':'';
const dom=(tag,cls,value)=>{const x=document.createElement(tag);if(cls)x.className=cls;if(value!==undefined)x.textContent=value;return x};
Promise.all([fetch(prefix+'data/editions.json').then(r=>{if(!r.ok)throw Error('No editions data');return r.json()}),fetch(prefix+'i18n/'+locale+'.json').then(r=>r.json())]).then(([data,t])=>{
const records=data.editions.filter(e=>el.dataset.editionsCatalog==='all'||(e.language===locale&&(!el.dataset.volume||e.volume===Number(el.dataset.volume))));
const byBook=new Map();for(const rec of records){const id=rec.language+':'+rec.volume;if(!byBook.has(id))byBook.set(id,{title:rec.title,language:rec.language,entries:[]});byBook.get(id).entries.push(rec)}
el.textContent='';for(const b of byBook.values()){
const card=dom('article','edition-card');card.lang=b.language;card.append(dom('h2','',b.title));
const active=b.entries.filter(e=>e.status==='live'&&typeof e.url==='string'&&/^https:\/\//.test(e.url));
if(active.length===0){card.append(dom('p','unavailable',t.soon||'Coming soon'));el.append(card);continue}
for(const fmt of [...new Set(active.map(e=>e.format))]){
const stores=active.filter(e=>e.format===fmt),line=dom('div','edition-format'),info=dom('div');
info.append(dom('strong','',t.formats?.[fmt]||fmt));const first=stores[0];
const price=first.price==null?'':new Intl.NumberFormat(b.language,{style:'currency',currency:first.currency}).format(Number(first.price));
info.append(dom('small','',price));line.append(info);
for(const e of stores){const a=dom('a','',(t.buy||'Buy')+' · '+(e.store.startsWith('amazon-')?'Amazon':e.store==='google-play'?'Google Play Books':'Kobo'));a.href=e.url;a.target='_blank';a.rel='noopener noreferrer';a.dataset.outbound=e.store;line.append(a)}card.append(line)}
el.append(card)}
}).catch(()=>{el.replaceChildren(dom('p','todo','TODO: catalogue unavailable'))});
})();