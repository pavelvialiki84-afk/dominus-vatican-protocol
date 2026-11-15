/* DOMINUS editions catalogue. Single source of truth: data/editions.json. */
(()=>{"use strict";
const root=document.querySelector("[data-editions-catalog]");
if(!root)return;
const langs=["en","de","fr","it","es","pt-br","nl","pl"];
const marketLabels={en:"English",de:"Deutsch",fr:"Français",it:"Italiano",es:"Español","pt-br":"Português (Brasil)",nl:"Nederlands",pl:"Polski"};
const make=(tag,className,text)=>{const n=document.createElement(tag);if(className)n.className=className;if(text!==undefined)n.textContent=text;return n};
const money=(price,currency,language)=>price==null?"":new Intl.NumberFormat(language,{style:"currency",currency}).format(Number(price));
Promise.all([fetch("data/editions.json").then(r=>{if(!r.ok)throw Error("Edition data unavailable");return r.json()}),Promise.all(langs.map(lang=>fetch("i18n/"+lang+".json").then(r=>r.json())))]).then(([catalogue,translations])=>{
const strings=Object.fromEntries(langs.map((lang,i)=>[lang,translations[i]]));root.textContent="";
for(const edition of catalogue.editions){
const {language,volume,title,formats}=edition,t=strings[language];const article=make("article","edition-card");article.lang=language;
const head=make("div","edition-top");head.append(make("span","edition-lang",marketLabels[language]),make("span","edition-country",t.volume+" "+volume));article.append(head);
article.append(make("h2","",title),make("p","edition-author","Pavel Velichii"));
const list=make("div","edition-formats");
for(const [format,entry] of Object.entries(formats)){
if(entry.status==="not_offered")continue;
const line=make("div","edition-format"),info=make("div");info.append(make("strong","",t.formats[format]));
const description=make("small","",entry.status==="live"&&entry.price!=null?money(entry.price,entry.currency,language)+" · "+t.available:t.soon);info.append(description);line.append(info);
const store=entry.stores?.amazon;
if(entry.status==="live"&&store){const link=make("a","",t.buy+" · Amazon");link.href=store;link.target="_blank";link.rel="noopener noreferrer";link.dataset.outbound="amazon";line.append(link)}
else line.append(make("span","unavailable",t.soon));
list.append(line);
}
article.append(list);root.append(article);
}
}).catch(err=>{root.replaceChildren(make("p","edition-error","The catalogue could not be loaded. Please refresh the page."));console.error("DOMINUS edition catalogue",err)});
})();
