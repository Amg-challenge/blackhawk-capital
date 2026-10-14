'use strict';
const reduceMotion=matchMedia('(prefers-reduced-motion: reduce)');
const escapeHtml=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const allocation=document.getElementById('alloc');
allocation.innerHTML='<div class="trow h" role="row"><div role="columnheader">Position</div><div aria-hidden="true">Capital / risk</div><div class="w" role="columnheader">Weight</div><div class="risk" role="columnheader">Risk share</div></div>'+ALLOC.map(a=>`<div class="trow" role="row"><div class="tick" role="rowheader"><b>${a[0]}</b><span>${a[1]}</span></div><div class="bars" aria-hidden="true"><div class="bar"><i style="width:${a[2]/25*100}%"></i></div><div class="bar rc"><i style="width:${a[3]/25*100}%"></i></div></div><div class="w" role="cell">${a[2].toFixed(2)}%</div><div class="risk" role="cell">${a[3].toFixed(2)}%</div></div>`).join('');
allocation.setAttribute('role','table');
allocation.setAttribute('aria-label','Provisional capital weights and normalized risk contributions');

function renderDocs(round){
  const docs=document.getElementById('docs');
  docs.setAttribute('aria-labelledby','tab-'+round);
  docs.innerHTML=CONFIG.docs[round].map((d,i)=>{
    let live=false;
    if(d.url){try{live=['https:','http:'].includes(new URL(d.url,location.href).protocol)}catch{}}
    const tag=live?`<span class="tag go">Open ${escapeHtml(d.type)} ↗</span>`:`<span class="tag">${escapeHtml(d.type)} · ${escapeHtml(d.status)}</span>`;
    const inner=`<div class="n">0${i+1}</div><div><h3>${escapeHtml(d.title)}</h3><p>${escapeHtml(d.desc)}</p></div>${tag}`;
    return live?`<a class="doc" href="${escapeHtml(d.url)}" target="_blank" rel="noopener">${inner}</a>`:`<div class="doc">${inner}</div>`;
  }).join('');
}
const tabs=[...document.querySelectorAll('#tabs button')];
function selectTab(tab,focus=false){
  tabs.forEach(t=>{const on=t===tab;t.classList.toggle('on',on);t.setAttribute('aria-selected',String(on));t.tabIndex=on?0:-1});
  renderDocs(tab.dataset.r);
  if(focus)tab.focus();
}
tabs.forEach((tab,i)=>{
  tab.addEventListener('click',()=>selectTab(tab));
  tab.addEventListener('keydown',e=>{
    let next;
    if(e.key==='ArrowRight')next=(i+1)%tabs.length;
    if(e.key==='ArrowLeft')next=(i+tabs.length-1)%tabs.length;
    if(e.key==='Home')next=0;
    if(e.key==='End')next=tabs.length-1;
    if(next!==undefined){e.preventDefault();selectTab(tabs[next],true)}
  });
});
selectTab(tabs[0]);

const P=CONFIG.performance;
[['ret',P.ret],['vol',P.vol],['sh',P.sharpe],['dd',P.mdd]].forEach(([key,value])=>document.getElementById('p-'+key).textContent=value);
if(P.asOf)document.getElementById('p-status').textContent='Live portfolio data as of '+P.asOf+'. Source: Bloomberg; Black Hawk Capital calculations.';
document.getElementById('team-grid').innerHTML=CONFIG.team.map(m=>{
  const initials=m.name.split(' ').map(s=>s[0]).join('').slice(0,2);
  return `<div class="member"><div class="ph" aria-hidden="true">${m.photo?`<img src="${escapeHtml(m.photo)}" alt="">`:initials}</div><h3>${escapeHtml(m.name)}</h3><span>${escapeHtml(m.role)}</span></div>`;
}).join('');

const nav=document.getElementById('nav');
const menu=document.getElementById('menu-toggle');
const closeMenu=()=>{nav.classList.remove('menu-open');menu.setAttribute('aria-expanded','false')};
menu.addEventListener('click',()=>{const open=!nav.classList.contains('menu-open');nav.classList.toggle('menu-open',open);menu.setAttribute('aria-expanded',String(open))});
nav.addEventListener('keydown',e=>{if(e.key==='Escape'){closeMenu();menu.focus()}});
document.querySelectorAll('[data-go]').forEach(a=>a.addEventListener('click',()=>closeMenu()));
addEventListener('resize',()=>{if(innerWidth>900)closeMenu()},{passive:true});

/* Only the original landscape crossfade remains. No particles, flying emblem,
   fog, automatic zoom, scroll smoothing loop or animated content entrances. */
const scenes=[...document.querySelectorAll('.scene')];
scenes.forEach(s=>{s.style.backgroundImage=`url("${s.dataset.src}")`});
let anchors=[];
let activeScene=-1;
let queued=false;
function measure(){anchors=[0,...[...document.querySelectorAll('.interlude')].map(c=>c.offsetTop+c.offsetHeight/2-innerHeight/2)]}
function updateView(){
  queued=false;
  let sceneIndex=0;
  anchors.forEach((top,i)=>{if(scrollY>=top)sceneIndex=i});
  sceneIndex=Math.min(sceneIndex,scenes.length-1);
  if(sceneIndex!==activeScene){scenes.forEach((s,i)=>s.style.opacity=i===sceneIndex?'1':'0');activeScene=sceneIndex}
  const max=document.documentElement.scrollHeight-innerHeight;
  document.getElementById('progress').style.width=(max>0?scrollY/max*100:0)+'%';
  let current='';
  ['approach','portfolio','research','performance','team'].forEach(id=>{if(document.getElementById(id).getBoundingClientRect().top<innerHeight*.45)current=id});
  document.querySelectorAll('.nav ul a').forEach(a=>{const on=a.getAttribute('href')==='#'+current;a.classList.toggle('on',on);if(on)a.setAttribute('aria-current','location');else a.removeAttribute('aria-current')});
}
function scheduleView(){if(!queued){queued=true;requestAnimationFrame(updateView)}}
addEventListener('scroll',scheduleView,{passive:true});
addEventListener('resize',()=>{measure();scheduleView()},{passive:true});
addEventListener('load',()=>{measure();scheduleView()});
measure();updateView();
