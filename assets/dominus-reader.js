/* DOMINUS reader subscription / Substack handoff. No analytics, cookies, or email collection. */
(()=>{'use strict';const langs=['en','de','it','fr','es','pt-br','nl','pl'];const lang=(document.documentElement.lang||'en').toLowerCase(),locale=langs.includes(lang)?lang:'en';const dir=location.pathname.match(/\/(en|de|it|fr|es|pt-br|nl|pl)\//)?'../':'';const url='https://substack.com/@pavelvelichii';const make=(tag,className,text)=>{const el=document.createElement(tag);if(className)el.className=className;if(text!==undefined)el.textContent=text;return el};
fetch(dir+'i18n/'+locale+'.json').then(r=>{if(!r.ok)throw Error('i18n unavailable');return r.json()}).then(({reader:t,projectContact})=>{
if(!t)return;const anchor=dir?'':'./';
const build=(locationName)=>{const wrap=make('section','reader-newsletter');wrap.setAttribute('aria-label',t.newsletterTitle);const inner=make('div','shell');inner.append(make('p','eyebrow','DOMINUS · SUBSTACK'),make('h2','',t.newsletterTitle),make('p','',t.newsletterDescription));const form=make('form','reader-optin');form.noValidate=true;const label=make('label','reader-optin-label');const check=make('input');check.type='checkbox';check.name='external-substack-consent';check.required=true;label.append(check,document.createTextNode(' '+t.consentLabel));form.append(label);const button=make('button','btn gold',t.continueToSubstack);button.type='submit';button.disabled=true;check.addEventListener('change',()=>{button.disabled=!check.checked});form.addEventListener('submit',event=>{event.preventDefault();if(check.checked){location.assign(url)}});form.append(button);const info=make('p','reader-privacy-hint',t.privacyAssurance+' ');const a=make('a','',t.privacyTitle);a.href=(dir||'')+locale+'/privacy.html';if(dir)a.href='privacy.html';info.append(a);inner.append(form,info);wrap.append(inner);return wrap};
const main=document.querySelector('main');if(main){main.append(build('main'))}const footer=document.querySelector('footer');if(footer){footer.prepend(build('footer'))}
const menus=document.querySelectorAll('header .toplinks');for(const menu of menus){const a=make('a','',t.resources);a.href='reader-resources.html';menu.append(a)}

/* Download registry: reveal links only after author uploads a real file and adds its URL. */
if(location.pathname.endsWith('/reader-resources.html'))fetch(dir+'data/reader-downloads.json').then(r=>r.json()).then(({resources})=>{const articles=[...document.querySelectorAll('.reader-resource-item')];if(articles.length<2)return;for(const record of resources){if(record.language!==locale||record.status!=='live'||typeof record.url!=='string'||!record.url.trim())continue;const safe=new URL(record.url,location.href);if(!['https:','http:'].includes(safe.protocol))continue;const index=record.kind==='dossier_pdf'?0:1;const panel=articles[index];if(!panel)continue;const todo=panel.querySelector('.todo');if(todo)todo.remove();const a=make('a','btn',record.kind==='dossier_pdf'?t.dossierTitle:t.chaptersTitle+' · '+record.kind.replace('chapter_','').toUpperCase());a.href=safe.href;a.rel='noopener noreferrer';if(safe.origin!==location.origin)a.target='_blank';panel.append(a)}}).catch(()=>{});

// Official project contact: no contact form, no data collection, no personal email.
const contactLabels=projectContact;
if(contactLabels&&document.querySelector('footer')){
 const container=make('div','dominus-contact');
 const title=make('h2','dominus-contact-title',contactLabels.heading);
 const mail=make('a','dominus-contact-mail','contact@dominusbooks.com');mail.href='mailto:contact@dominusbooks.com';mail.rel='nofollow';
 const social=make('a','dominus-contact-instagram',contactLabels.instagram);social.href='https://www.instagram.com/dominus.vatican.protocol/';social.target='_blank';social.rel='noopener noreferrer';
 const links=make('p','dominus-contact-links');links.append(mail,document.createTextNode(' · '),social);
 container.append(title,make('p','dominus-contact-caption',contactLabels.caption),links);
 document.querySelector('footer').append(container);
}
}).catch(err=>console.warn('DOMINUS reader translations not loaded',err));
})();
