/* DOMINUS storefronts: the ONLY source is /data/editions.json */
(()=>{'use strict';
const lang=(document.documentElement.lang||'en').toLowerCase();const root=document.querySelector('[data-editions-catalog]');if(!root)return;
const languages=['en','de','it','fr','es','pt-br','nl','pl'];const selected=languages.includes(lang)?lang:'en';const rootPath=location.pathname.match(/\/(en|de|it|fr|es|pt-br|nl|pl)\//)?'../':'';
const money=(value,currency,l)=>value==null?'':new Intl.NumberFormat(l,{style:'currency',currency}).format(Number(value));
const node=(tag,cls,content)=>{const n=document.createElement(tag);if(cls)n.className=cls;if(content!==undefined)n.textContent=content;return n};
Promise.all([fetch(rootPath+'data/editions.json').then(r=>{if(!r.ok)throw new Error('Catalogue unavailable');return r.json()}),fetch(rootPath+'i18n/'+selected+'.json').then(r=>r.json())]).then(([data,t])=>{
root.textContent='';const entries=data.editions.filter(e=>root.dataset.editionsCatalog==='all'||(e.language===selected&&(!root.dataset.volume||e.volume===Number(root.dataset.volume))));
const grouped=new Map();for(const e of entries){const key=e.language+'-'+e.volume;if(!grouped.has(key))grouped.set(key,{language:e.language,volume:e.volume,title:e.title,entries:[]});grouped.get(key).entries.push(e)}
for(const item of grouped.values()){
const card=node('article','edition-card');const title=node('h2','',item.title);card.append(title);
const seen=new Set();for(const e of item.entries){const key=e.format;if(seen.has(key))continue;seen.add(key);
const opts=item.entries.filter(x=>x.format===key&&x.status==='live'&&x.url);
const line=node('div','edition-format'),meta=node('div');meta.append(node('strong','',t.formats?.[key]||key));meta.append(node('small','',opts.length?money(opts[0].price,opts[0].currency,item.language):t.soon||'Coming soon'));line.append(meta);
if(opts.length){for(const o of opts){const a=node('a','',t.buy+' · '+(o.store.startsWith('amazon-')?'Amazon':o.store==='google-play'?'Google Play Books':'Kobo'));a.href=o.url;a.rel='noopener noreferrer';a.target='_blank';line.append(a)}}
else line.append(node('span','unavailable',t.soon||'Coming soon'));card.append(line);
}
root.append(card);
}
}).catch(()=>{root.textContent='TODO: catalogue temporarily unavailable';});
})();