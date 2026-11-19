/* DOMINUS site soundtrack: attempt to start immediately on entry.
   Browser autoplay policy may deny audible play until visitor interacts.
   This audio module does not transmit data. Website analytics is in analytics.js. */
(()=>{'use strict';
 const soundtrack=new Audio('assets/dominus-score.mp3');
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
 // Avoid enlarging Canva previews beyond their source pixels.
 // The same cards automatically return to full-bleed presentation when
 // the original HD versions are published under these URLs.
 document.querySelectorAll('.gallery > figure.illustrated img, .cast-film img, .dossier-portrait img').forEach(img=>{
   const holder=img.closest('figure.illustrated, .cast-film figure, .dossier-portrait');
   const threshold=img.closest('.gallery')?600:480;
   const update=()=>{if(holder && img.naturalWidth>0)holder.classList.toggle('source-preview',img.naturalWidth<threshold);};
   if(img.complete)update();
   else img.addEventListener('load',update,{once:true});
 });
 document.querySelectorAll('.book-cover-frame .book-cover-image').forEach(img=>{
   const frame=img.closest('.book-cover-frame');
   const sync=()=>frame?.classList.toggle('source-preview',img.naturalWidth>0 && img.naturalWidth<500);
   if(img.complete)sync();else img.addEventListener('load',sync,{once:true});
 });
 document.querySelectorAll('a[data-outbound="amazon"]').forEach(link=>{
   link.addEventListener('click',()=>{
     const u=new URL(link.href);
     document.dispatchEvent(new CustomEvent('dominus:retailer-click',{detail:{retailer:'amazon',marketplace:u.hostname,edition:u.pathname,language:document.documentElement.lang}}));
   });
 });
})();