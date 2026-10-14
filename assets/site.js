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
  return '<article class="member"><div class="portrait">'+portrait+'</div><h3>'+escapeHtml(m.name)+'</h3><p class="role">'+escapeHtml(m.role)+'</p></article>';
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
/* A single natural glide on entry; no flying logo or looping particle effects. */
const eagle=document.getElementById('hero-eagle');
function startGlide(){if(eagle.naturalWidth>0&&!matchMedia('(prefers-reduced-motion: reduce)').matches)eagle.classList.add('fly')}
if(eagle.complete)startGlide();else eagle.addEventListener('load',startGlide,{once:true});
