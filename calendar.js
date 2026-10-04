// Weber County Hive Community Calendar — shared page script (reads events-data.js)
(function(){
const MODE = window.CAL_MODE || 'politics';          // "politics" | "county" | "community" | "hub"
const COUNTY = window.CAL_COUNTY || '';
const MONTHS=['January','February','March','April','May','June','July','August','September','October','November','December'];
const MS=['Jan.','Feb.','March','April','May','June','July','Aug.','Sept.','Oct.','Nov.','Dec.'];
const WD=['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
const TYPES={election:'Election',deadline:'Deadline',meeting:'Public meeting',community:'Community event',memorial:'Memorial'};
const $=s=>document.querySelector(s);
const esc=s=>String(s==null?'':s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const pd=s=>{const [y,m,d]=s.split('-').map(Number);return new Date(y,m-1,d);};
const today=new Date();today.setHours(0,0,0,0);
const cname=k=>k==='statewide'?'Statewide':(COUNTIES[k]?COUNTIES[k].name:k);
function t12(t){if(!t)return'';let [h,m]=t.split(':').map(Number);const ap=h>=12?'p.m.':'a.m.';h=h%12||12;return m?`${h}:${String(m).padStart(2,'0')} ${ap}`:`${h} ${ap}`;}
function whenText(e){
  const a=pd(e.date);let s=`${WD[a.getDay()]}., ${MS[a.getMonth()]} ${a.getDate()}`;
  if(e.endDate){const b=pd(e.endDate);s+=` – ${b.getMonth()===a.getMonth()?'':MS[b.getMonth()]+' '}${b.getDate()}`;}
  if(e.start)s+=` · ${t12(e.start)}${e.end?' – '+t12(e.end):''}`;else s+=' · All day';
  return s;
}
const lastDay=e=>pd(e.endDate||e.date);
document.querySelectorAll('[data-site]').forEach(el=>{el.textContent=SITE[el.dataset.site];});

// ---- calendar files ----
function icsStamp(d,t){return d.replace(/-/g,'')+(t?'T'+t.replace(':','')+'00':'');}
function nextDay(s){const d=pd(s);d.setDate(d.getDate()+1);return `${d.getFullYear()}${String(d.getMonth()+1).padStart(2,'0')}${String(d.getDate()).padStart(2,'0')}`;}
function icsEsc(s){return String(s||'').replace(/\\/g,'\\\\').replace(/;/g,'\\;').replace(/,/g,'\\,').replace(/\n/g,'\\n');}
function vevent(e){
  const url=pageUrl()+'#'+e.id; const L=['BEGIN:VEVENT','UID:'+e.id+'@weber-county-hive','DTSTAMP:'+icsStamp(e.added||e.date,'00:00')];
  if(e.start){L.push('DTSTART;TZID=America/Denver:'+icsStamp(e.date,e.start));L.push('DTEND;TZID=America/Denver:'+icsStamp(e.date,e.end||e.start));
    if(e.endDate){const n=Math.round((pd(e.endDate)-pd(e.date))/864e5)+1;L.push('RRULE:FREQ=DAILY;COUNT='+n);}}
  else{L.push('DTSTART;VALUE=DATE:'+icsStamp(e.date));L.push('DTEND;VALUE=DATE:'+nextDay(e.endDate||e.date));}
  L.push('SUMMARY:'+icsEsc((e.tentative?'(Tentative) ':'')+e.title));
  if(e.place)L.push('LOCATION:'+icsEsc(e.place));
  L.push('DESCRIPTION:'+icsEsc(e.desc+'\n'+(e.link?'Source: '+e.link+'\n':'')+(e.caseFile?'Hive page: '+e.caseFile+'\n':'')+'From the Weber County Hive Community Calendar: '+url));
  L.push('URL:'+url,'END:VEVENT');return L.join('\r\n');
}
function download(list,name){
  const body=['BEGIN:VCALENDAR','VERSION:2.0','PRODID:-//Weber County Hive//Community Calendar//EN','CALSCALE:GREGORIAN',list.map(vevent).join('\r\n'),'END:VCALENDAR'].join('\r\n');
  const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([body],{type:'text/calendar'}));a.download=name+'.ics';document.body.appendChild(a);a.click();a.remove();
}
function gcal(e){
  const d=e.start?`${icsStamp(e.date,e.start)}/${icsStamp(e.date,e.end||e.start)}`:`${icsStamp(e.date)}/${nextDay(e.endDate||e.date)}`;
  return 'https://calendar.google.com/calendar/render?action=TEMPLATE&text='+encodeURIComponent((e.tentative?'(Tentative) ':'')+e.title)+'&dates='+d+'&ctz=America/Denver&location='+encodeURIComponent(e.place||'')+'&details='+encodeURIComponent(e.desc+'\n'+pageUrl()+'#'+e.id);
}
function pageUrl(){return location.href.split('#')[0];}
function toast(m){const t=$('#toast');if(!t)return;t.textContent=m;t.style.display='block';clearTimeout(t._h);t._h=setTimeout(()=>t.style.display='none',2200);}

// ---- cards ----
function evHTML(e,showCounty){
  const a=pd(e.date);
  const chips=[`<span class="chip">${TYPES[e.type]||e.type}</span>`];
  if(showCounty)chips.push(`<span class="chip">${esc(cname(e.county))}</span>`);
  if(e.from==='reader')chips.push('<span class="chip rdr">Sent in by a reader</span>');
  if(e.tentative)chips.push('<span class="chip tent">Date not final</span>');
  return `<article class="ev t-${e.type}" id="${esc(e.id)}"><div class="day"><div class="m">${MS[a.getMonth()]}</div><div class="d">${a.getDate()}</div><div class="w">${WD[a.getDay()]}</div></div><div class="evb"><div class="chips">${chips.join('')}</div><h4>${esc(e.title)}</h4><div class="when">🕒 ${whenText(e)}</div>${e.place?`<div class="where">📍 ${esc(e.place)}</div>`:''}<p>${esc(e.desc)}</p><div class="acts">${e.caseFile?`<a href="${esc(e.caseFile)}" target="_blank" rel="noopener">Hive page${e.repo?' · '+esc(e.repo):''} ↗</a>`:''}${e.link&&e.link!==e.caseFile?`<a class="src" href="${esc(e.link)}" target="_blank" rel="noopener">Source: ${esc(e.linkLabel||'link')} ↗</a>`:''}<button data-ics="${esc(e.id)}">＋ Add to my calendar</button><a href="${gcal(e)}" target="_blank" rel="noopener">Google Calendar</a><button data-share="${esc(e.id)}">Share</button><a href="https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(pageUrl()+'#'+e.id)}" target="_blank" rel="noopener">Facebook</a></div></div></article>`;
}
function bindActs(root){
  root.querySelectorAll('[data-ics]').forEach(b=>b.onclick=()=>{const e=EVENTS.find(x=>x.id===b.dataset.ics);download([e],e.id);});
  root.querySelectorAll('[data-share]').forEach(b=>b.onclick=async()=>{const e=EVENTS.find(x=>x.id===b.dataset.share);const url=pageUrl()+'#'+e.id;
    if(navigator.share){try{await navigator.share({title:e.title,text:whenText(e),url});return;}catch(_){}}
    try{await navigator.clipboard.writeText(url);toast('Link copied');}catch(_){prompt('Copy this link:',url);}});
}

// ---- which events ----
function pool(){
  if(MODE==='county')return EVENTS.filter(e=>e.cal==='politics'&&(e.county===COUNTY||(e.county==='statewide'&&st())));
  if(MODE==='community')return EVENTS.filter(e=>e.cal==='community');
  if(MODE==='hub')return EVENTS.slice();
  return EVENTS.filter(e=>e.cal==='politics');
}
const st=()=>{const c=$('#statewide');return !c||c.checked;};
const params=new URLSearchParams(location.search);
let view='list',gridMonth=null;

function filtered(){
  let L=pool();
  const cs=$('#county');if(cs&&cs.value)L=L.filter(e=>e.county===cs.value||(MODE==='politics'&&cs.value&&e.county==='statewide'&&st()));
  const ts=$('#type');if(ts&&ts.value)L=L.filter(e=>e.type===ts.value);
  const past=$('#past');if(!(past&&past.checked)&&view==='list')L=L.filter(e=>lastDay(e)>=today);
  return L.sort((a,b)=>a.date.localeCompare(b.date)||(a.start||'').localeCompare(b.start||''));
}
function renderList(){
  const L=filtered(),out=$('#events');const showCounty=MODE!=='county'||true;
  if(!L.length){out.innerHTML=`<div class="empty"><h3>No dates here yet</h3><div>Know of one? Send it to <a href="mailto:${SITE.email}?subject=Calendar%20Event">${SITE.email}</a>.</div></div>`;}
  else{let html='',cur='';L.forEach(e=>{const d=pd(e.date),k=d.getFullYear()+'-'+d.getMonth();if(k!==cur){if(cur)html+='</div>';cur=k;html+=`<div class="month"><h3>${MONTHS[d.getMonth()]} ${d.getFullYear()}</h3>`;}html+=evHTML(e,showCounty);});out.innerHTML=html+'</div>';bindActs(out);}
  const c=$('#count');if(c)c.textContent=`${L.length} date${L.length===1?'':'s'} shown`;
}
function renderGrid(){
  const L=filtered(),out=$('#events');
  if(!gridMonth){const up=L.find(e=>lastDay(e)>=today);const b=up?pd(up.date):new Date();gridMonth=new Date(b.getFullYear(),b.getMonth(),1);}
  const y=gridMonth.getFullYear(),m=gridMonth.getMonth(),first=new Date(y,m,1).getDay(),days=new Date(y,m+1,0).getDate();
  let h=`<div class="gridhead"><button id="prev" aria-label="Previous month">‹ Prev</button><h3>${MONTHS[m]} ${y}</h3><button id="next" aria-label="Next month">Next ›</button></div><table class="grid"><tr>${WD.map(w=>`<th>${w}</th>`).join('')}</tr><tr>`;
  for(let i=0;i<first;i++)h+='<td></td>';
  for(let d=1;d<=days;d++){const dt=new Date(y,m,d);const evs=L.filter(e=>pd(e.date)<=dt&&lastDay(e)>=dt);
    h+=`<td class="${+dt===+today?'today':''}"><div class="n">${d}</div>${evs.map(e=>`<a href="#${esc(e.id)}" data-go="${esc(e.id)}" title="${esc(e.title)}">${esc(e.title)}</a>`).join('')}</td>`;
    if((first+d)%7===0&&d<days)h+='</tr><tr>';}
  h+='</tr></table><p class="count">Tap an item to see the full listing.</p>';
  out.innerHTML=h;
  $('#prev').onclick=()=>{gridMonth=new Date(y,m-1,1);renderGrid();};$('#next').onclick=()=>{gridMonth=new Date(y,m+1,1);renderGrid();};
  out.querySelectorAll('[data-go]').forEach(a=>a.onclick=ev=>{ev.preventDefault();const id=a.dataset.go;view='list';const p=$('#past');if(p&&lastDay(EVENTS.find(x=>x.id===id))<today)p.checked=true;setView();render();location.hash=id;});
  const c=$('#count');if(c)c.textContent='';
}
function render(){view==='grid'?renderGrid():renderList();}
function setView(){document.querySelectorAll('[data-view]').forEach(b=>b.classList.toggle('on',b.dataset.view===view));}

// ---- hub ----
function renderHub(){
  const up=EVENTS.filter(e=>lastDay(e)>=today).sort((a,b)=>a.date.localeCompare(b.date)).slice(0,8);
  const out=$('#events');out.innerHTML=up.length?up.map(e=>evHTML(e,true)).join(''):'<div class="empty"><h3>No upcoming dates yet</h3></div>';bindActs(out);
  const n=(f)=>EVENTS.filter(f).filter(e=>lastDay(e)>=today).length;
  let cards=`<a class="card g-politics" href="politics.html"><h3>Utah Politics</h3><p>Election dates, filing deadlines, referendum deadlines and hearings from every Hive repo, statewide and county by county.</p><span class="meta">${n(e=>e.cal==='politics')} upcoming</span></a>`;
  cards+=`<a class="card g-community" href="community.html"><h3>Community Events</h3><p>Festivals, fairs, fundraisers, parades and memorials, many sent in by neighbors. Starting with Weber County.</p><span class="meta">${n(e=>e.cal==='community')} upcoming</span></a>`;
  $('#maincards').innerHTML=cards;
  $('#countycards').innerHTML=Object.entries(COUNTIES).map(([k,c])=>`<a class="card" href="${c.file}"><h3>${esc(c.name)}</h3><p>Election and government dates for ${esc(c.name)}, plus statewide dates.</p><span class="meta">${n(e=>e.cal==='politics'&&e.county===k)} upcoming county dates</span></a>`).join('');
}

// ---- setup ----
function fillCountySelect(){
  const s=$('#county');if(!s)return;
  const used=new Set(pool().map(e=>e.county));
  const keys=MODE==='community'?Object.keys(COUNTIES).filter(k=>k==='weber'||used.has(k)):Object.keys(COUNTIES);
  keys.forEach(k=>{const o=document.createElement('option');o.value=k;o.textContent=COUNTIES[k].name;s.appendChild(o);});
  const want=params.get('county');if(want&&COUNTIES[want])s.value=want;
}
function navCounties(){
  const n=$('#countynav');if(!n)return;
  n.innerHTML='<span class="lbl">County calendars</span>'+Object.entries(COUNTIES).map(([k,c])=>`<a href="${c.file}" class="${k===COUNTY?'on':''}">${esc(c.name.replace(' County',''))}</a>`).join('');
}
navCounties();
if(MODE==='hub'){renderHub();}
else{
  fillCountySelect();
  document.querySelectorAll('[data-view]').forEach(b=>b.onclick=()=>{view=b.dataset.view;setView();render();});
  ['#county','#type','#past','#statewide'].forEach(id=>{const el=$(id);if(el)el.onchange=()=>{gridMonth=null;render();};});
  const dl=$('#dlall');if(dl)dl.onclick=()=>download(filtered().filter(e=>lastDay(e)>=today),(window.CAL_FILE||'hive-calendar'));
  render();
  if(location.hash){const t=document.getElementById(location.hash.slice(1));if(!t){const p=$('#past');if(p){p.checked=true;render();}}setTimeout(()=>{const el=document.getElementById(location.hash.slice(1));if(el)el.scrollIntoView();},50);}
}
})();
