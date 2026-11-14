/* DOMINUS: original soundtrack, explicit sound opt-in, reduced-motion controls.
   No analytics or external tracking scripts are loaded. */
(() => {
 'use strict';
 const teaser=document.querySelector('.trailer');
 const replay=teaser?.querySelector('[data-play]');
 const sound=teaser?.querySelector('[data-sound]');
 const video=teaser?.querySelector('video.film');
 const reduce=window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches??false;
 const conserve=!!navigator.connection?.saveData;
 let timer;
 let chosenSound=false;
 if (video) { video.muted=true; video.volume=.7; video.defaultMuted=true; }
 const label=()=>{
   if(!sound)return;
   sound.textContent=(chosenSound?'🔊 ':'🔇 ')+(chosenSound?sound.dataset.unmutedLabel:sound.dataset.mutedLabel);
   sound.setAttribute('aria-pressed',chosenSound?'true':'false');
 };
 const stop=()=>{
   if(!teaser)return;
   teaser.classList.remove('playing');
   if(video)video.pause();
   clearTimeout(timer);
 };
 const play=(explicit=false)=>{
   if(!teaser)return;
   stop();
   void teaser.offsetWidth;
   teaser.classList.add('playing');
   if(video){
      try{video.currentTime=0;}catch(_){}
      video.muted=!chosenSound;
      const attempt=video.play();
      if(attempt?.catch)attempt.catch(()=>{});
   }
   if(replay)replay.textContent=replay.dataset.replay||'Replay';
   clearTimeout(timer);
   timer=setTimeout(stop,12000);
 };
 replay?.addEventListener('click',()=>play(true));
 sound?.addEventListener('click',()=>{
   chosenSound=!chosenSound;
   if(video){
     video.muted=!chosenSound;
     if(chosenSound&&video.paused)play(true);
   }
   label();
 });
 label();
 document.addEventListener('visibilitychange',()=>{if(document.hidden)stop();});
 if('IntersectionObserver' in window&&teaser) {
   const observer=new IntersectionObserver(entries=>{
     if(entries[0]&&entries[0].intersectionRatio<.12)stop();
   },{threshold:[0,.12,.4]});
   observer.observe(teaser);
 }
 if(!reduce&&!conserve&&teaser){
   const start=()=>{if(!document.hidden&&teaser.getBoundingClientRect().top<window.innerHeight)play();};
   if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true}); else start();
 }
 document.querySelectorAll('a[data-outbound="amazon"]').forEach(link=>{
   link.addEventListener('click',()=>{
     const u=new URL(link.href);
     document.dispatchEvent(new CustomEvent('dominus:retailer-click',{
       detail:{retailer:'amazon',marketplace:u.hostname,edition:u.pathname,language:document.documentElement.lang}
     }));
   });
 });
})();