/* DOMINUS site soundtrack: attempt to start immediately on entry.
   Browser autoplay policy may deny audible play until visitor interacts.
   No analytics or personal data is transmitted. */
(()=>{'use strict';
 const soundtrack=new Audio('assets/dominus-original-score.wav');
 soundtrack.preload='auto';
 soundtrack.loop=true;
 soundtrack.volume=.28;
 const globalButton=document.querySelector('[data-site-audio]');
 const trailer=document.querySelector('.trailer');
 const replay=trailer?.querySelector('[data-play]');
 const trailerSound=trailer?.querySelector('[data-sound]');
 const video=trailer?.querySelector('video.film');
 const reduced=window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches??false;
 const dataSaver=!!navigator.connection?.saveData;
 let timer;
 let userPaused=false;
 if(video){video.muted=true;video.defaultMuted=true;}
 const showSound=(playing,blocked=false)=>{
   if(globalButton){
     const phrase=playing?globalButton.dataset.on:blocked?globalButton.dataset.enable:globalButton.dataset.off;
     globalButton.textContent=(playing?'♫ ':'♪ ')+phrase;
     globalButton.setAttribute('aria-pressed',playing?'true':'false');
     globalButton.classList.toggle('awaiting-action',blocked);
   }
   if(trailerSound){
     trailerSound.textContent=(playing?'🔊 ':'🔇 ')+(playing?trailerSound.dataset.unmutedLabel:trailerSound.dataset.mutedLabel);
     trailerSound.setAttribute('aria-pressed',playing?'true':'false');
   }
 };
 const startSound=async()=>{
   userPaused=false;
   try {
     await soundtrack.play();
     showSound(true,false);
   } catch(_error) {
     showSound(false,true);
   }
 };
 const toggleSound=()=>{
   if(!soundtrack.paused){
     userPaused=true;
     soundtrack.pause();
     showSound(false,false);
   }else{
     void startSound();
   }
 };
 globalButton?.addEventListener('click',toggleSound);
 trailerSound?.addEventListener('click',toggleSound);
 soundtrack.addEventListener('ended',()=>{if(!userPaused)void startSound();});
 soundtrack.addEventListener('error',()=>{if(globalButton){globalButton.textContent='♪ Audio unavailable';globalButton.disabled=true;}});
 const stopTrailer=()=>{if(!trailer)return;trailer.classList.remove('playing');video?.pause();clearTimeout(timer);};
 const playTrailer=()=>{
   if(!trailer)return;
   stopTrailer();void trailer.offsetWidth;trailer.classList.add('playing');
   if(video){
     try{video.currentTime=0;}catch(_error){}
     video.muted=true; // Music plays through the dedicated soundtrack, avoiding double audio.
     video.play()?.catch?.(()=>{});
   }
   if(replay)replay.textContent=replay.dataset.replay||'Replay';
   timer=setTimeout(stopTrailer,12000);
 };
 replay?.addEventListener('click',playTrailer);
 if(!reduced&&!dataSaver&&trailer){
   if(trailer.getBoundingClientRect().top<window.innerHeight)playTrailer();
 }
 if('IntersectionObserver' in window&&trailer){
   const observer=new IntersectionObserver(entries=>{if(entries[0]?.intersectionRatio<.12)stopTrailer();},{threshold:[0,.12,.4]});
   observer.observe(trailer);
 }
 // Start background music on entry if permitted by this browser.
 // If it blocks audible autoplay, the visible button offers one-tap activation.
 void startSound();
 document.addEventListener('visibilitychange',()=>{
   if(document.hidden){soundtrack.pause();stopTrailer();}
   else if(!userPaused)void startSound();
 });
 document.querySelectorAll('a[data-outbound="amazon"]').forEach(link=>{
   link.addEventListener('click',()=>{
     const u=new URL(link.href);
     document.dispatchEvent(new CustomEvent('dominus:retailer-click',{detail:{retailer:'amazon',marketplace:u.hostname,edition:u.pathname,language:document.documentElement.lang}}));
   });
 });
})();