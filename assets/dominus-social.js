/* DOMINUS official contacts: no social embeds, SDKs, trackers or fabricated Facebook links. */
(()=>{'use strict';
const script=document.currentScript;if(!script)return;
const path=new URL(script.src).pathname;const root=path.slice(0,path.lastIndexOf('/assets/')+1);
const locale=(document.documentElement.lang||'en').toLowerCase();
const words={
en:['Follow and contact','Official Instagram','Official Facebook','Email DOMINUS'],de:['Kontakt & soziale Netzwerke','Offizielles Instagram','Offizielles Facebook','E-Mail an DOMINUS'],it:['Contatti e social','Instagram ufficiale','Facebook ufficiale','Scrivi a DOMINUS'],fr:['Contact et réseaux','Instagram officiel','Facebook officiel','Contacter DOMINUS'],es:['Contacto y redes','Instagram oficial','Facebook oficial','Escribir a DOMINUS'],'pt-br':['Contato e redes','Instagram oficial','Facebook oficial','Fale com DOMINUS'],nl:['Contact en sociale media','Officiële Instagram','Officiële Facebook','E-mail DOMINUS'],pl:['Kontakt i media społecznościowe','Oficjalny Instagram','Oficjalny Facebook','Napisz do DOMINUS']};
fetch(root+'data/social-contacts.json').then(r=>{if(!r.ok)throw Error('contacts unavailable');return r.json()}).then(data=>{
const footer=document.querySelector('footer');if(!footer||footer.querySelector('[data-dominus-official-contacts]'))return;
const t=words[locale]||words.en;
const box=document.createElement('nav');box.className='dominus-official-contacts';box.dataset.dominusOfficialContacts='';box.setAttribute('aria-label',t[0]);
const heading=document.createElement('strong');heading.textContent=t[0];box.append(heading);
const add=(label,href,external)=>{const a=document.createElement('a');a.textContent=label;a.href=href;if(external){a.target='_blank';a.rel='noopener noreferrer';}box.append(a)};
if(data.instagram?.status==='verified'&&/^https:\/\/www\.instagram\.com\/[a-z0-9._]+\/?$/i.test(data.instagram.url||''))add(t[1],data.instagram.url,true);
if(data.facebook?.status==='verified'&&/^https:\/\/(www\.)?facebook\.com\/[a-z0-9._-]+\/?$/i.test(data.facebook.url||''))add(t[2],data.facebook.url,true);
if(data.email?.status==='connected'&&/^[a-z0-9._%+-]+@dominusbooks\.com$/i.test(data.email.primary||''))add(t[3], 'mailto:'+data.email.primary,false);
const inner=footer.querySelector('.shell')||footer;inner.append(box);
}).catch(err=>console.warn('Official contacts not loaded:',err.message));
})();
