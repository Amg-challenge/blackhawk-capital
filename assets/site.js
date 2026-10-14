"use strict";
const escapeHtml=function(s){return String(s).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]})};
function renderDocs(round){
  const docs=document.getElementById('docs');
  docs.setAttribute('aria-labelledby','tab-'+round);
  docs.innerHTML=CONFIG.docs[round].map(function(d,i){
    let live=false;
    if(d.url){try{live=['https:','http:'].includes(new URL(d.url,location.href).protocol)}catch(e){}}
    const tag=live?'<span class="tag go">Open '+escapeHtml(d.type)+' ↗</span>':'<span class="tag">'+escapeHtml(d.type)+' · '+escapeHtml(d.status)+'</span>';
    const inner='<span class="n">0'+(i+1)+'</span><div><h3>'+escapeHtml(d.title)+'</h3><p>'+escapeHtml(d.desc)+'</p></div>'+tag;
    return live?'<a class="doc" href="'+escapeHtml(d.url)+'" target="_blank" rel="noopener">'+inner+'</a>':'<article class="doc">'+inner+'</article>';
  }).join('');
}
const tabs=Array.from(document.querySelectorAll('#tabs button'));
function selectTab(tab,focus){
  tabs.forEach(function(t){const on=t===tab;t.classList.toggle('on',on);t.setAttribute('aria-selected',String(on));t.tabIndex=on?0:-1});
  renderDocs(tab.dataset.r);if(focus)tab.focus();
}
tabs.forEach(function(tab,i){
  tab.addEventListener('click',function(){selectTab(tab,false)});
  tab.addEventListener('keydown',function(e){
    let next;if(e.key==='ArrowRight')next=(i+1)%tabs.length;if(e.key==='ArrowLeft')next=(i+tabs.length-1)%tabs.length;if(e.key==='Home')next=0;if(e.key==='End')next=tabs.length-1;
    if(next!==undefined){e.preventDefault();selectTab(tabs[next],true)}
  });
});
selectTab(tabs[0],false);
const P=CONFIG.performance;
[['ret',P.ret],['vol',P.vol],['sh',P.sharpe],['dd',P.mdd]].forEach(function(pair){document.getElementById('p-'+pair[0]).textContent=pair[1]});
if(P.asOf)document.getElementById('p-status').textContent='Live portfolio data as of '+P.asOf+'. Source: Bloomberg; BlackHawk Capital calculations.';
document.getElementById('team-grid').innerHTML=CONFIG.team.map(function(m){
  const initials=m.name.split(' ').map(function(s){return s[0]}).join('').slice(0,2);
  const portrait=m.photo?'<img src="'+escapeHtml(m.photo)+'" alt="'+escapeHtml(m.name)+'" loading="lazy">':'<span class="portrait-initials" aria-hidden="true">'+initials+'</span>';
  return '<article class="member soft-reveal"><div class="portrait">'+portrait+'</div><h3>'+escapeHtml(m.name)+'</h3><p class="role">'+escapeHtml(m.role)+'</p></article>';
}).join('');
const nav=document.getElementById('nav'),menu=document.getElementById('menu-toggle');
function closeMenu(){nav.classList.remove('menu-open');menu.setAttribute('aria-expanded','false')}
menu.addEventListener('click',function(){const open=!nav.classList.contains('menu-open');nav.classList.toggle('menu-open',open);menu.setAttribute('aria-expanded',String(open))});
nav.addEventListener('keydown',function(e){if(e.key==='Escape'){closeMenu();menu.focus()}});
document.querySelectorAll('[data-go]').forEach(function(a){a.addEventListener('click',closeMenu)});
addEventListener('resize',function(){if(innerWidth>1000)closeMenu()},{passive:true});
let queued=false;
function updateNavigation(){queued=false;let current='';['approach','research','performance','team'].forEach(function(id){if(document.getElementById(id).getBoundingClientRect().top<innerHeight*.45)current=id});document.querySelectorAll('#main-menu a').forEach(function(a){const on=a.getAttribute('href')==='#'+current;a.classList.toggle('on',on);if(on)a.setAttribute('aria-current','location');else a.removeAttribute('aria-current')})}
addEventListener('scroll',function(){if(!queued){queued=true;requestAnimationFrame(updateNavigation)}},{passive:true});
updateNavigation();

/* Natural wheel scrolling; animation follows scroll rather than replacing it. */
const motionPreference=matchMedia('(prefers-reduced-motion: reduce)');
const photoLayers=Array.from(document.querySelectorAll('.hero-photo,.section-photo'));
const textures=Array.from(document.querySelectorAll('.brand-watermark,.mountain-watermark'));
const hero=document.getElementById('top'),heroCopy=document.querySelector('.hero-inner');
const clamp=function(v,min,max){return Math.max(min,Math.min(max,v))};
function updateScrollVisuals(){
  if(motionPreference.matches)return;
  photoLayers.forEach(function(layer){const owner=layer.parentElement,rect=owner.getBoundingClientRect();if(rect.bottom<-100||rect.top>innerHeight+100)return;const offset=(innerHeight*.5-(rect.top+rect.height*.5))*.11;layer.style.setProperty('--photo-shift',clamp(offset,-52,52).toFixed(2)+'px')});
  textures.forEach(function(mark){const rect=mark.parentElement.getBoundingClientRect();if(rect.bottom<0||rect.top>innerHeight)return;mark.style.setProperty('--mark-shift',clamp((innerHeight*.5-rect.top-rect.height*.5)*.06,-28,28).toFixed(2)+'px')});
  const heroRect=hero.getBoundingClientRect();const progress=clamp(-heroRect.top/heroRect.height,0,1);
  heroCopy.style.setProperty('--copy-shift',(progress*46).toFixed(2)+'px');heroCopy.style.setProperty('--hero-opacity',String(clamp(1-progress*.9,.1,1)));
}
let visualFrame=false;
function queueVisuals(){if(!visualFrame){visualFrame=true;requestAnimationFrame(function(){visualFrame=false;updateScrollVisuals()})}}
addEventListener('scroll',queueVisuals,{passive:true});addEventListener('resize',queueVisuals,{passive:true});
const revealElements=Array.from(document.querySelectorAll('.soft-reveal'));
let revealObserver;
function setMotion(){
  if(revealObserver)revealObserver.disconnect();
  if(motionPreference.matches){document.body.classList.remove('motion-ready');heroCopy.style.removeProperty('--hero-opacity');return}
  document.body.classList.add('motion-ready');
  revealElements.forEach(function(el){const r=el.getBoundingClientRect();if(r.top<innerHeight*.94&&r.bottom>0)el.classList.add('is-visible')});
  revealObserver=new IntersectionObserver(function(entries){entries.forEach(function(entry){if(entry.isIntersecting){entry.target.classList.add('is-visible');revealObserver.unobserve(entry.target)}})},{threshold:.04,rootMargin:'0px 0px -24px 0px'});
  revealElements.forEach(function(el){if(!el.classList.contains('is-visible'))revealObserver.observe(el)});
  queueVisuals();
}
motionPreference.addEventListener('change',setMotion);setMotion();
