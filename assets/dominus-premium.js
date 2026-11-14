/* DOMINUS progressive enhancement: video, accessibility and attribution hooks.
   No analytics scripts are loaded and no personal data is transmitted. */
(()=>{'use strict';
 const teaser=document.querySelector('.trailer');
 const control=teaser?.querySelector('[data-play]');
 const video=teaser?.querySelector('video.film');
 const reduce=window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches??false;
 const conserve=!!navigator.connection?.saveData;
 let runTimer;
 let userStarted=false;
 const stop=()=>{if(!teaser)return;teaser.classList.remove('playing');video?.pause();window.clearTimeout(runTimer);};
 const play=()=>{if(!teaser)return;stop();void teaser.offsetWidth;teaser.classList.add('playing');
   if(video){try{video.currentTime=0;}catch(_e){}const promise=video.play();promise?.catch?.(()=>{});}
   if(control){control.textContent=control.dataset.replay||'Replay';control.setAttribute('aria-label',control.textContent);}
   runTimer=window.setTimeout(stop,12000);
 };
 if(control){control.addEventListener('click',()=>{userStarted=true;play();});}
 document.addEventListener('visibilitychange',()=>{if(document.hidden)stop();});
 if(video && 'IntersectionObserver' in window){
   const observer=new IntersectionObserver(entries=>{if(entries[0] && entries[0].intersectionRatio<0.15)stop();},{threshold:[0,.15,.4]});
   observer.observe(teaser);
 }
 if(!reduce&&!conserve&&teaser){
   const start=()=>{if(!userStarted&&!document.hidden&&teaser.getBoundingClientRect().top<window.innerHeight)play();};
   if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});else start();
 }
 /* An internal click event for future consent-based GA4 configuration.
    This does not itself record, store, or transmit anything. */
 document.querySelectorAll('a[data-outbound="amazon"]').forEach(link=>{
   link.addEventListener('click',()=>{
     const u=new URL(link.href);
     document.dispatchEvent(new CustomEvent('dominus:retailer-click',{
       detail:{retailer:'amazon',marketplace:u.hostname,edition:u.pathname,language:document.documentElement.lang}
     }));
   });
 });
})();