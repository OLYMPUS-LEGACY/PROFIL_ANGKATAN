/* UPGRADE.JS · interaksi dinamis ringan (tidak mengubah script.js) */
(function(){
  var bar=document.createElement('div');bar.className='scroll-progress';document.body.appendChild(bar);
  var hd=document.querySelector('.site-header');
  function onScroll(){
    var h=document.documentElement,p=h.scrollTop/(h.scrollHeight-h.clientHeight||1);
    bar.style.transform='scaleX('+Math.min(1,p)+')';
    if(hd)hd.classList.toggle('is-scrolled',h.scrollTop>40);
  }
  addEventListener('scroll',onScroll,{passive:true});onScroll();

  // spotlight kartu mengikuti kursor (delegasi, aman untuk kartu yang dirender dinamis)
  document.addEventListener('pointermove',function(e){
    var c=e.target.closest&&e.target.closest('.member-card,.gallery-card,.stat-card,.symbol-card');
    if(!c)return;var r=c.getBoundingClientRect();
    c.style.setProperty('--mx',(e.clientX-r.left)+'px');c.style.setProperty('--my',(e.clientY-r.top)+'px');
  },{passive:true});

  // parallax tilt logo hero
  var st=document.getElementById('heroParallax');
  if(st&&matchMedia('(hover:hover)').matches){
    st.addEventListener('pointermove',function(e){
      var r=st.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;
      st.style.transform='perspective(900px) rotateY('+x*10+'deg) rotateX('+(-y*10)+'deg)';
    });
    st.addEventListener('pointerleave',function(){st.style.transform='';});
    st.style.transition='transform .5s cubic-bezier(.22,1,.36,1)';
  }
})();

/* v3: splash, reveal bertahap, smooth scroll */
(function(){
  var RM=matchMedia('(prefers-reduced-motion:reduce)').matches;
  var seen=false;try{seen=sessionStorage.getItem('olSplash')}catch(e){}
  if(!seen&&!RM){
    var s=document.createElement('div');s.className='splash';
    s.innerHTML='<div class="splash-in"><img src="assets/logo.png" alt=""><h2>Welcome to<br>Olympus Legacy</h2><p>PSTI UPI · MMXXVI</p></div>';
    document.body.appendChild(s);document.documentElement.style.overflow='hidden';
    setTimeout(function(){s.classList.add('is-out');document.documentElement.style.overflow='';
      try{sessionStorage.setItem('olSplash','1')}catch(e){}setTimeout(function(){s.remove()},1000)},1900);
  }
  var sel='.section-header-split,.section-heading-group,.about-narrative-grid>*,.stats-ledger,.symbol-anatomy-panel,.vision-mission-grid>*,.members-toolbar,.quiz-layout-grid>*,.timeline-track,.gallery-grid>*,.footer-top-grid>*,.member-card,.stat-card,.timeline-item,.org-level';
  var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{threshold:.1,rootMargin:'0px 0px -6% 0px'});
  function arm(){document.querySelectorAll(sel).forEach(function(el,i){
    if(el.dataset.rv)return;el.dataset.rv=1;el.classList.add('rv');el.style.setProperty('--d',(i%6)*.07+'s');io.observe(el)})}
  arm();
  new MutationObserver(arm).observe(document.querySelector('main'),{childList:true,subtree:true});
  document.querySelectorAll('[data-reveal]').forEach(function(el){io.observe(el)});
  function ease(t){return t<.5?4*t*t*t:1-Math.pow(-2*t+2,3)/2}
  document.addEventListener('click',function(e){
    var a=e.target.closest&&e.target.closest('a[href^="#"]');if(!a||RM)return;
    var id=a.getAttribute('href').slice(1),t=id&&document.getElementById(id);if(!t)return;
    e.preventDefault();
    var y0=scrollY,y1=t.getBoundingClientRect().top+y0-(id==='hero'?0:70),d=Math.min(1400,500+Math.abs(y1-y0)*.35),st=performance.now();
    document.documentElement.style.scrollBehavior='auto';
    (function f(n){var p=Math.min(1,(n-st)/d);scrollTo(0,y0+(y1-y0)*ease(p));
      if(p<1)requestAnimationFrame(f);else{document.documentElement.style.scrollBehavior='';history.replaceState(null,'','#'+id)}})(st);
  });
  var tb=document.getElementById('themeToggle');
  if(tb)tb.addEventListener('click',function(){document.body.classList.add('theme-fade');setTimeout(function(){document.body.classList.remove('theme-fade')},600)});
})();
