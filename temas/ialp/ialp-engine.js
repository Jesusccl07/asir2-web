/* IALP · motor común de los temas (misma estructura que ASO Tema 2):
   ayudantes para escribir la teoría (H), utilidades (TE) y TE.boot() que monta navegación,
   índice, práctica y test gamificado con ranking. Cada tema aporta su contenido en window.TEMA. */
(function(){
'use strict';
const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const rd=(k,d)=>{try{const v=localStorage.getItem(k);return v?JSON.parse(v):d}catch(e){return d}};
const wr=(k,v)=>{try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}};
const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ═════════ ayudantes para escribir la teoría ═════════ */
const H={};let uid=0;
const ICON={info:'i',warn:'!',tip:'✓',bad:'✗',vio:'★'};
H.p=t=>'<p class="rv">'+t+'</p>';
H.h3=t=>'<h3 class="rv">'+t+'</h3>';
H.grid=(n,...a)=>'<div class="grid g'+n+' rv">'+a.join('')+'</div>';
H.card=(ic,t,d,c='acc',tag)=>'<div class="card hov" style="--c:var(--'+c+')">'+(tag?'<span class="tag">'+tag+'</span>':'')+(ic?'<div class="ic">'+ic+'</div>':'')+'<h4'+(tag?' style="margin-top:8px"':'')+'>'+t+'</h4><p>'+d+'</p></div>';
H.cards=(list,n)=>H.grid(n||(list.length===2||list.length===4?2:3),...list.map(x=>H.card(...x)));
H.posts=l=>'<div class="postits rv">'+l.map(([c,t,d])=>'<div class="postit'+(c?' '+c:'')+'">'+t+'<small>'+d+'</small></div>').join('')+'</div>';
H.note=(type,t,d)=>'<div class="note '+type+' rv"><div class="ni">'+ICON[type]+'</div><p><b class="t">'+t+'</b>'+d+'</p></div>';
H.code=(code,fn)=>'<div class="code rv" data-fn="'+esc(fn||'Python')+'"><pre>'+esc(code)+'</pre></div>';
H.out=t=>'<div class="out rv">'+esc(t)+'</div>';
H.tbl=(head,rows,c='acc')=>'<div class="tscroll rv"><table class="tbl" style="--c:var(--'+c+')"><thead><tr>'+head.map(h=>'<th>'+h+'</th>').join('')+'</tr></thead><tbody>'+rows.map(r=>'<tr>'+r.map(x=>'<td>'+x+'</td>').join('')+'</tr>').join('')+'</tbody></table></div>';
H.vs=(kt,kc,kd,ot,oc,od)=>'<div class="vs rv"><div class="ko"><h5>✗ '+kt+'</h5><code>'+esc(kc)+'</code><p style="margin:6px 0 0;font-size:.88rem">'+kd+'</p></div><div class="ok"><h5>✓ '+ot+'</h5><code>'+esc(oc)+'</code><p style="margin:6px 0 0;font-size:.88rem">'+od+'</p></div></div>';
H.tf=l=>'<div class="tf rv">'+l.map(([a,b,y])=>'<div'+(y?' class="y"':'')+'>'+a+'<small>'+b+'</small></div>').join('')+'</div>';
H.dia=(inner,cap,vb='0 0 760 220',label='Esquema')=>'<div class="diagram rv"><svg viewBox="'+vb+'" role="img" aria-label="'+esc(label)+'">'+inner+'</svg>'+(cap?'<div class="cap">'+cap+'</div>':'')+'</div>';
H.marker=id=>'<defs><marker id="'+id+'" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0L10 5L0 10z" fill="var(--muted)"/></marker></defs>';
H.mk=()=>'ar'+(++uid);
/* cajas en fila unidas por flechas animadas: items = [titulo, subtitulo|con|barras, color, ¿clave?] */
H.flow=(items,cap,o={})=>{const n=items.length,gap=o.gap||46,pad=14,bw=(760-2*pad-(n-1)*gap)/n,bh=o.h||84,id=H.mk();let s=H.marker(id);
  items.forEach(([t,sub,c,key],i)=>{const x=pad+i*(bw+gap),y=30,cx=x+bw/2;
    s+='<g'+(key?' class="pulse"':'')+'><rect x="'+x+'" y="'+y+'" width="'+bw+'" height="'+bh+'" rx="14" fill="var(--'+c+'-soft)" stroke="var(--'+c+')" stroke-width="'+(key?2.5:1.5)+'"/><text x="'+cx+'" y="'+(y+28)+'" text-anchor="middle" class="svg-t" fill="var(--'+c+')" font-size="'+(bw<120?13:15)+'">'+t+'</text>'+
      (sub||'').split('|').map((l,k)=>'<text x="'+cx+'" y="'+(y+50+k*16)+'" text-anchor="middle" class="svg-m" fill="var(--ink)" font-size="11.5">'+l+'</text>').join('')+'</g>';
    if(i<n-1)s+='<path d="M'+(x+bw+4)+' '+(y+bh/2)+'H'+(x+bw+gap-6)+'" stroke="var(--muted)" stroke-width="2.5" class="flow" marker-end="url(#'+id+')"/>'});
  return H.dia(s,cap,'0 0 760 '+(bh+60),cap||'Esquema')};
H.lab=(id,t,inner)=>'<div class="lab rv" id="'+id+'"><h4>'+t+'</h4>'+inner+'</div>';
H.seg=(id,opts)=>'<span class="seg" id="'+id+'">'+opts.map(([v,l],i)=>'<button type="button" aria-pressed="'+(i===0)+'" data-v="'+v+'">'+l+'</button>').join('')+'</span>';
H.term=(id,t='# salida…')=>'<div class="term-out" id="'+id+'"><span class="d">'+t+'</span></div>';
H.flips=(id,l)=>'<div class="flips rv" id="'+id+'"></div>';

/* ═════════ utilidades ═════════ */
let toastT;
function toast(msg){const t=$('#toast');t.textContent=msg;t.classList.add('on');clearTimeout(toastT);toastT=setTimeout(()=>t.classList.remove('on'),2600)}
function confetti(n=70){if(reduce)return;const cs=['#c084fc','#60a5fa','#818cf8','#fbbf24','#fb7185','#f472b6'];
  for(let i=0;i<n;i++){const d=document.createElement('i');d.className='confetti';d.style.left=Math.random()*100+'vw';d.style.background=cs[i%cs.length];
    d.style.animationDuration=(1.6+Math.random()*1.6)+'s';d.style.animationDelay=Math.random()*.4+'s';d.style.borderRadius=Math.random()>.5?'50%':'2px';
    document.body.appendChild(d);setTimeout(()=>d.remove(),3800)}}
function copyText(txt,btn){const done=()=>{if(btn){const o=btn.textContent;btn.textContent='¡Copiado!';btn.classList.add('ok');setTimeout(()=>{btn.textContent=o;btn.classList.remove('ok')},1400)}};
  if(navigator.clipboard&&navigator.clipboard.writeText)navigator.clipboard.writeText(txt).then(done,()=>fallback());else fallback();
  function fallback(){const ta=document.createElement('textarea');ta.value=txt;ta.style.position='fixed';ta.style.opacity='0';document.body.appendChild(ta);ta.select();try{document.execCommand('copy')}catch(e){}ta.remove();done()}}
function seg(id,cb){const s=$(id);$$('button',s).forEach(b=>b.onclick=()=>{$$('button',s).forEach(x=>x.setAttribute('aria-pressed',x===b));cb&&cb(b.dataset.v)});return()=>$('button[aria-pressed="true"]',s).dataset.v}

/* ═════════ resaltado de PSeInt y Python ═════════ */
const KP='Proceso|FinProceso|Algoritmo|FinAlgoritmo|Definir|Como|Entero|Real|Cadena|Caracter|Logico|Leer|Escribir|Mostrar|Si|Entonces|Sino|SiNo|FinSi|Segun|Hacer|Caso|De|Otro|Modo|FinSegun|Mientras|FinMientras|Para|Hasta|Con|Paso|FinPara|Repetir|Que|Funcion|FinFuncion|SubProceso|FinSubProceso|Por|Referencia|Valor|Verdadero|Falso|Y|O|NO|MOD|Dimension|Borrar|Pantalla|Esperar|Tecla|Segundos|Constante';
const KY='def|return|if|elif|else|for|while|in|import|from|as|match|case|global|nonlocal|break|continue|pass|and|or|not|True|False|None|lambda|class|try|except|with|is|del';
const BI='print|input|int|float|str|bool|len|type|max|min|sum|round|abs|pow|range|sorted|enumerate|zip|random|math|string|turtle|datetime|statistics|os|time|tkinter|append|randint|choice|sqrt|sleep|now|today';
const rxs={};
function rxFor(lang){if(rxs[lang])return rxs[lang];
  const com=lang==='pse'?'(\\/\\/.*$)':'((?:^|(?<=\\s))#.*$)';
  const kw=lang==='pse'?KP:KY;
  return rxs[lang]=new RegExp(com+'|("(?:\\\\.|[^"\\\\])*"|\'[^\']*\')|(\\b(?:'+kw+')\\b)|(\\b(?:'+(lang==='pse'?'Aleatorio|Raiz|Trunc|Redon|Longitud|Subcadena|Mayusculas|Minusculas|ConvertirANumero|ConvertirATexto|Abs|Azar|Sen|Cos|Tan|Ln|Exp':BI)+')\\b)|(\\b\\d+(?:\\.\\d+)?\\b)|(<-|<=|>=|<>|==|!=|\\*\\*|\\/\\/|[+\\-*\\/%<>=])','g')}
function hlLine(line,lang){const RX=rxFor(lang);let out='',last=0,m;RX.lastIndex=0;
  while((m=RX.exec(line))){if(m[0]===''){RX.lastIndex++;continue}
    out+=esc(line.slice(last,m.index));const t=m[0];
    const cls=m[1]?'k-com':m[2]?'k-str':m[3]?'k-kw':m[4]?'k-var':m[5]?'k-num':'k-op';
    out+='<span class="'+cls+'">'+esc(t)+'</span>';last=m.index+t.length}
  return out+esc(line.slice(last))}
const langOf=fn=>/pse/i.test(fn||'')?'pse':'py';
function hl(code,lines,lang){return code.split('\n').map((l,i)=>(lines?'<span class="ln">'+(i+1)+'</span>':'')+hlLine(l,lang)).join('\n')}
function codeBlock(code,fn,opts={}){
  return '<div class="code"><div class="ch"><span class="dots"><i></i><i></i><i></i></span><span class="fn">'+esc(fn||'Python')+'</span><button class="copy" type="button">Copiar</button></div><pre>'+hl(code,opts.lines,langOf(fn))+'</pre></div>'}
function enhanceCode(el){if(el.dataset.done)return;el.dataset.done=1;const pre=$('pre',el);const raw=pre.textContent;
  if(!el.hasAttribute('data-nohl'))pre.innerHTML=hl(raw,false,langOf(el.dataset.fn));
  const h=document.createElement('div');h.className='ch';h.innerHTML='<span class="dots"><i></i><i></i><i></i></span><span class="fn">'+esc(el.dataset.fn||'Python')+'</span><button class="copy" type="button">Copiar</button>';
  el.insertBefore(h,pre);el.dataset.raw=raw}
document.addEventListener('click',e=>{const b=e.target.closest('.copy');if(!b)return;const c=b.closest('.code');
  let txt=c.dataset.raw;if(!txt){const p=$('pre',c).cloneNode(true);$$('.ln',p).forEach(x=>x.remove());txt=p.textContent}copyText(txt,b)});

window.H=H;
window.TE={$,$$,esc,rd,wr,seg,toast,confetti,copyText,codeBlock,enhanceCode,reduce,H,boot};

/* ═════════ arranque ═════════ */
function boot(){
const T=window.TEMA,K=T.key+'.';
const Q=window.TEMA_QUESTIONS||[],TOP=window.TEMA_TOPICS||{};

/* tema claro/oscuro */
const root=document.documentElement,savedTheme=rd(K+'theme',null);
if(savedTheme)root.dataset.theme=savedTheme;
$('#themeBtn').onclick=()=>{const dark=root.dataset.theme?root.dataset.theme==='dark':matchMedia('(prefers-color-scheme: dark)').matches;root.dataset.theme=dark?'light':'dark';wr(K+'theme',root.dataset.theme)};

/* racha de días */
const today=new Date().toISOString().slice(0,10);
const days=rd(K+'days',[]);if(days[days.length-1]!==today){days.push(today);wr(K+'days',days.slice(-400))}
(()=>{let n=0,d=new Date();const set=new Set(rd(K+'days',[]));while(set.has(d.toISOString().slice(0,10))){n++;d.setDate(d.getDate()-1)}$('#dsN').textContent=n;$('#dayStreak b').textContent=n===1?'día':'días'})();

/* teoría */
$('#theory').innerHTML=T.sections.map((s,i)=>'<section class="sec" id="'+s.id+'" data-title="'+esc(s.short||s.title)+'" style="--c:'+s.c+'"><div class="sec-head rv"><div class="sec-num">'+String(i+1).padStart(2,'0')+'</div><div><h2>'+s.title+'</h2><p>'+s.sub+'</p></div></div>'+s.html+'</section>').join('');
$$('.code').forEach(enhanceCode);
$('#hBlocks').textContent=T.sections.length;$('#readTotal').textContent=T.sections.length;$('#hEx').textContent=T.ex.length;$('#nQ').textContent=Q.length;

/* revelar al hacer scroll */
const rvObs=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');rvObs.unobserve(e.target)}}),{rootMargin:'0px 0px -8% 0px'});
function watchRv(scope=document){$$('.rv:not(.in)',scope).forEach(el=>reduce?el.classList.add('in'):rvObs.observe(el))}

/* navegación entre vistas */
const views=['teoria','practica','test'];
function movePill(){const a=$('.tabs a[aria-current="page"]'),p=$('#pill');if(!a)return;p.style.left=a.offsetLeft+'px';p.style.width=a.offsetWidth+'px'}
let curView=null;
function route(){const h=(location.hash||'#teoria').slice(1);
  let v=views.includes(h)?h:h.startsWith('t-')?'teoria':h.startsWith('p-')?'practica':h.startsWith('test')?'test':'teoria';
  if(v!==curView){views.forEach(x=>$('#v-'+x).classList.toggle('on',x===v));$$('.tabs a').forEach(a=>a.setAttribute('aria-current',a.dataset.v===v?'page':'false'));
    curView=v;movePill();if(v==='test')Test.home();if(!views.includes(h)){const t=document.getElementById(h);t&&setTimeout(()=>t.scrollIntoView({behavior:reduce?'auto':'smooth'}),60)}else scrollTo({top:0,behavior:'auto'});watchRv()}
  else if(!views.includes(h)){const t=document.getElementById(h);t&&t.scrollIntoView({behavior:reduce?'auto':'smooth'})}}
addEventListener('hashchange',route);addEventListener('resize',movePill);document.fonts&&document.fonts.ready.then(movePill);
if(window.ResizeObserver)$$('.tabs a').forEach(a=>new ResizeObserver(movePill).observe(a));

/* hero: terminal que escribe */
(function typer(){const el=$('#typer');const L=T.typer;
  if(reduce){el.innerHTML=L.map(([t,p,s])=>t==='p'?'<span class="p">'+p+'</span>'+esc(s):'<span class="'+t+'">'+esc(s)+'</span>').join('\n')+'\n<span class="cursor"></span>';return}
  let i=0,html='';const cur='<span class="cursor"></span>';
  function line(){if(i>=L.length){setTimeout(()=>{html='';i=0;line()},4200);return}
    const [t,p,s]=L[i++];if(t==='p'){let k=0;const pre=html+'<span class="p">'+p+'</span>';(function ty(){el.innerHTML=pre+esc(s.slice(0,k))+cur;if(k++<s.length)setTimeout(ty,28+Math.random()*40);else{html=pre+esc(s)+'\n';setTimeout(line,350)}})()}
    else{html+='<span class="'+t+'">'+esc(s)+'</span>\n';el.innerHTML=html+cur;setTimeout(line,550)}}
  line()})();

/* índice de teoría + progreso de lectura */
const secs=$$('#theory .sec'),read=new Set(rd(K+'read',[]));
$('#tocNav').innerHTML=secs.map((s,i)=>'<a href="#'+s.id+'" data-id="'+s.id+'"><b><span>'+(i+1)+'</span></b>'+esc(s.dataset.title)+'</a>').join('');
$('#mtoc').innerHTML=secs.map((s,i)=>'<a href="#'+s.id+'">'+(i+1)+'. '+esc(s.dataset.title)+'</a>').join('');
function paintRead(){$$('#tocNav a').forEach(a=>a.classList.toggle('read',read.has(a.dataset.id)));$('#readN').textContent=read.size;$('#readBar').style.width=(read.size/secs.length*100)+'%'}
paintRead();
const spy=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)$$('#tocNav a').forEach(a=>a.classList.toggle('active',a.dataset.id===e.target.id))}),{rootMargin:'-30% 0px -60% 0px'});
secs.forEach(s=>{spy.observe(s);const end=document.createElement('div');end.style.height='1px';s.appendChild(end);
  new IntersectionObserver((es,o)=>es.forEach(e=>{if(e.isIntersecting&&$('#v-teoria').classList.contains('on')){if(!read.has(s.id)){read.add(s.id);wr(K+'read',[...read]);paintRead();if(read.size===secs.length){toast('🎓 ¡Has leído toda la teoría!');confetti()}}o.disconnect()}})).observe(end)});

/* tarjetas que giran + anatomía */
$$('.flips[data-flips]').forEach(box=>{const L=(T.flips||{})[box.dataset.flips]||[];const cols=['#8b3fc9','#1a6fd6','#4f46e5','#c76a05','#d93b55','#0e7bbd'];
  box.innerHTML=L.map(([c,n,d],i)=>'<button class="flip" type="button" style="--c:'+cols[i%6]+'"><div class="in"><div class="fa"><b>'+c+'</b><span>'+n+'</span></div><div class="fb"><strong>'+n+'</strong>'+d+'</div></div></button>').join('');
  $$('.flip',box).forEach(f=>f.onclick=()=>f.classList.toggle('on'))});
$$('.anat li').forEach(li=>{const on=v=>{$$('.anat [data-a="'+li.dataset.a+'"]').forEach(x=>x.classList.toggle('hl',v))};li.onmouseenter=()=>on(true);li.onmouseleave=()=>on(false);li.onfocus=()=>on(true);li.tabIndex=0;li.onblur=()=>on(false)});

/* ═════════ PRÁCTICA ═════════ */
const W=T.where;
$('#pDiagram').innerHTML=T.pDiagram||'';
$('#datos').innerHTML=(T.datos||[]).map(([k,v])=>'<div class="dato"><div><span>'+esc(k)+'</span><b>'+esc(v)+'</b></div><button type="button" aria-label="Copiar '+esc(k)+'" data-copy="'+esc(v)+'">⧉</button></div>').join('');
$$('#datos [data-copy]').forEach(b=>b.onclick=()=>{copyText(b.dataset.copy);toast('Copiado: '+b.dataset.copy)});
const PH=T.phases;
const done=new Set(rd(K+'steps',[]));
const totalSteps=PH.reduce((a,p)=>a+p.s.length,0);
$('#phases').innerHTML=PH.map((p,pi)=>'<div class="phase rv"><div class="phase-h" style="--c:'+p.c+'"><div class="pn">'+(pi+1)+'</div><h2>'+esc(p.t)+'</h2><span class="pp" data-pp="'+pi+'"></span></div>'+
  p.s.map(([id,w,t,d,cmd])=>'<div class="step" data-id="'+id+'"><button class="chk" type="button" aria-label="Marcar '+esc(t)+'"><svg viewBox="0 0 24 24"><path d="M5 12l5 5 9-10"/></svg></button><div><h4><span class="where '+W[w][0]+'">'+W[w][1]+'</span>'+esc(t)+'</h4><p>'+esc(d)+'</p>'+(cmd?codeBlock(cmd,W[w][2]||W[w][1]):'')+'</div></div>').join('')+'</div>').join('');
function paintSteps(){$$('.step').forEach(s=>s.classList.toggle('done',done.has(s.dataset.id)));const n=[...done].filter(id=>$('.step[data-id="'+id+'"]')).length;
  $('#pDone').textContent=n;$('#pTotal').textContent=totalSteps;$('#pRing').style.strokeDashoffset=182.2*(1-n/totalSteps);
  PH.forEach((p,i)=>{$('[data-pp="'+i+'"]').textContent=p.s.filter(s=>done.has(s[0])).length+'/'+p.s.length})}
$$('.step .chk').forEach(b=>b.onclick=()=>{const id=b.closest('.step').dataset.id;done.has(id)?done.delete(id):done.add(id);wr(K+'steps',[...done]);paintSteps();
  if(done.size===totalSteps){toast(T.allDone||'🏆 ¡Todo listo!');confetti()}});
$('#pReset').onclick=()=>{if(confirm('¿Desmarcar todos los pasos?')){done.clear();wr(K+'steps',[]);paintSteps()}};
paintSteps();
$('#cheat tbody').innerHTML=T.cheat.map(([c,w,d])=>'<tr><td><code style="white-space:normal;word-break:break-word">'+esc(c)+'</code></td><td><span class="where '+W[w][0]+'">'+W[w][1]+'</span></td><td>'+esc(d)+'</td></tr>').join('');
$('#pFail').innerHTML=H.posts(T.fails).replace(' rv','');

/* ejercicios + modal */
const EX=T.ex,CATC=T.exCats;let exCat='Todos';
function paintEx(){$('#exFilter').innerHTML=['Todos',...Object.keys(CATC)].map(c=>'<button class="tchip" type="button" aria-pressed="'+(c===exCat)+'" data-c="'+c+'">'+c+'</button>').join('');
  $$('#exFilter button').forEach(b=>b.onclick=()=>{exCat=b.dataset.c;paintEx()});
  $('#exGrid').innerHTML=EX.filter(e=>exCat==='Todos'||e[1]===exCat).map(([id,cat,t,d])=>'<div class="card hov ex" style="--c:'+CATC[cat]+'"><span class="tag cat">'+cat+'</span><span class="exn">'+id.toUpperCase()+'</span><h4>'+esc(t)+'</h4><p>'+esc(d)+'</p><div class="actions"><button class="btn sm pri" type="button" data-ex="'+id+'">Ver solución</button></div></div>').join('');
  $$('[data-ex]').forEach(b=>b.onclick=()=>openEx(b.dataset.ex))}
function openEx(id){const e=EX.find(x=>x[0]===id);
  $('#modalBox').innerHTML='<button class="btn sm close" type="button" id="mClose">✕ Cerrar</button><span class="tag" style="--c:'+CATC[e[1]]+'">'+e[1]+'</span><h3 style="margin-top:8px">'+id.toUpperCase()+' · '+esc(e[2])+'</h3><p class="muted">'+esc(e[3])+'</p>'+
    (e[4]?'<h4 style="margin:14px 0 4px">Solución en PSeInt</h4>'+codeBlock(e[4],'PSeInt · '+id+'.psc',{lines:true}):'')+
    (e[5]?'<h4 style="margin:14px 0 4px">Solución en Python</h4>'+codeBlock(e[5],'Python · '+id+'.py',{lines:true}):'')+
    (e[6]?'<h4 style="margin:14px 0 4px">Qué tiene que salir</h4><div class="out" style="margin:0">'+esc(e[6])+'</div>':'')+(e[7]?'<div class="note tip" style="margin-top:14px"><div class="ni">✓</div><p><b class="t">Idea clave</b>'+esc(e[7])+'</p></div>':'');
  $('#modal').classList.add('on');$('#mClose').focus();$('#mClose').onclick=closeModal}
function closeModal(){$('#modal').classList.remove('on')}
$('#modal').onclick=e=>{if(e.target.id==='modal')closeModal()};
addEventListener('keydown',e=>{if(e.key==='Escape')closeModal()});
paintEx();
$('#qa').innerHTML=T.qa.map(([q,a])=>'<details class="qa"><summary>'+esc(q)+'</summary><div class="ans"><p>'+esc(a)+'</p></div></details>').join('');

/* ═════════ TEST ═════════ */
const Test=(function(){
  const LV=T.levels;
  const BASE={1:10,2:20,3:30},LVN={1:'Fácil',2:'Medio',3:'Difícil'};
  const hash=s=>{let h=0;for(let i=0;i<s.length;i++)h=(h*31+s.charCodeAt(i))|0;return 'q'+(h>>>0).toString(36)};
  const items=Q.map((q,i)=>({i,id:hash(q[2]+(q[6]||'')),t:q[0],l:q[1],q:q[2],o:q[3],a:q[4],e:q[5],c:q[6]}));
  const codeFn=c=>/Proceso|Escribir|FinSi|FinPara|FinMientras|<-/.test(c)?'PSeInt':'Python';
  let S=rd(K+'test',null)||{xp:0,best:0,ans:0,ok:0,qs:{},games:0,nick:'',bestNota:0};
  const save=()=>wr(K+'test',S);
  const cfg={lv:new Set([1,2,3]),tp:new Set(Object.keys(TOP)),n:10};
  let G=null;const R=$('#testRoot');
  function level(xp){let k=0;for(let i=0;i<LV.length;i++)if(xp>=LV[i][0])k=i;const cur=LV[k],nx=LV[k+1];return{k,name:cur[1],emo:cur[2],pct:nx?(xp-cur[0])/(nx[0]-cur[0])*100:100,next:nx?nx[0]-xp:0}}
  const shuffle=a=>{a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.random()*(i+1)|0;[a[i],a[j]]=[a[j],a[i]]}return a};
  const pool=()=>items.filter(x=>cfg.lv.has(x.l)&&cfg.tp.has(x.t));
  const wrongs=()=>items.filter(x=>{const s=S.qs[x.id];return s&&s[1]>0&&s[2]===0});
  const MODES=[
    ['rapido','⚡','Práctica','Las preguntas que elijas abajo (nivel, bloques y cuántas), con corrección al momento.','#8b3fc9'],
    ['examen','🎯','Modo examen','30 preguntas mezcladas, 25 minutos y la nota al final. Sin pistas.','#1a6fd6'],
    ['super','❤️','Supervivencia','Preguntas sin fin hasta fallar 3. ¿Hasta dónde llega tu racha?','#d93b55'],
    ['flash','⏱️','Relámpago','60 segundos para acertar todas las que puedas. Cada acierto suma 3 s.','#c76a05'],
    ['fallos','🩹','Repasar fallos','Solo las preguntas que has fallado y aún no has acertado.','#4f46e5'],
    ['dificil','🔥','Solo difíciles','Las preguntas de nivel difícil de todos los bloques.','#0e7bbd']];
  function home(){if(G&&G.run)return;clearInterval(G&&G.tick);G=null;const L=level(S.xp),w=wrongs().length,mastered=items.filter(x=>{const s=S.qs[x.id];return s&&s[0]>0}).length;
    R.innerHTML='<div class="t-hero"><div><span class="eyebrow"><i></i> '+items.length+' preguntas · 3 niveles · '+Object.keys(TOP).length+' bloques</span><h1>Test y <span style="color:var(--amber)">preguntas rápidas</span></h1><p class="muted" style="margin:0;max-width:60ch">Acierta seguido para subir la racha 🔥 y el multiplicador de XP. Atajos: teclas <kbd>1</kbd>–<kbd>4</kbd> para responder y <kbd>Intro</kbd> para seguir.</p></div>'+
      '<div class="lvlcard"><div class="badge">'+L.emo+'</div><div><small>Nivel '+(L.k+1)+'</small><br><b>'+L.name+'</b><div class="xp"><i style="width:'+L.pct+'%"></i></div><small>'+S.xp+' XP'+(L.next?' · faltan '+L.next+' para el siguiente':' · ¡nivel máximo!')+'</small></div></div></div>'+
      '<div class="kpis"><div class="kpi"><b>🔥 '+S.best+'</b><span>mejor racha</span></div><div class="kpi"><b>'+(S.ans?Math.round(S.ok/S.ans*100):0)+'%</b><span>aciertos ('+S.ok+'/'+S.ans+')</span></div><div class="kpi"><b>'+mastered+'/'+items.length+'</b><span>preguntas dominadas</span></div><div class="kpi"><b>'+(S.bestNota?S.bestNota.toFixed(1):'—')+'</b><span>mejor nota de examen</span></div></div>'+
      '<div class="modes">'+MODES.map(([id,ic,t,d,c])=>'<button class="mode" type="button" data-m="'+id+'" style="--c:'+c+(id==='fallos'&&!w?';opacity:.5" disabled':'"')+'><div class="mi">'+ic+'</div><h4>'+t+'</h4><p>'+d+'</p><span class="mt">'+(id==='fallos'?w+' pendientes':id==='rapido'?'según la configuración':'EMPEZAR')+' →</span></button>').join('')+'</div>'+
      '<div class="cfg"><span class="lbl">Nivel</span><span class="topics" id="cLv">'+[1,2,3].map(l=>'<button class="tchip" type="button" data-l="'+l+'" aria-pressed="'+cfg.lv.has(l)+'">'+LVN[l]+' <i>'+items.filter(x=>x.l===l).length+'</i></button>').join('')+'</span>'+
      '<span class="lbl" style="margin-left:8px">Preguntas</span><span class="seg" id="cN">'+[10,20,40,0].map(n=>'<button type="button" data-v="'+n+'" aria-pressed="'+(cfg.n===n)+'">'+(n||'Todas')+'</button>').join('')+'</span>'+
      '<span class="lbl" style="width:100%">Bloques <button class="btn sm" type="button" id="cAll" style="margin-left:6px">Todos / ninguno</button> <span style="text-transform:none;letter-spacing:0;font-family:var(--f-b)" id="cCount"></span></span><span class="topics" id="cTp">'+Object.entries(TOP).map(([k,v])=>'<button class="tchip" type="button" data-t="'+k+'" aria-pressed="'+cfg.tp.has(k)+'">'+esc(v)+' <i>'+items.filter(x=>x.t===k).length+'</i></button>').join('')+'</span></div>'+
      '<h3 style="margin:26px 0 4px;font-size:1.2rem">Dominio por bloque</h3><p class="muted" style="margin:0;font-size:.88rem">% de preguntas del bloque que has acertado alguna vez.</p><div class="mastery">'+Object.entries(TOP).map(([k,v])=>{const its=items.filter(x=>x.t===k),m=its.filter(x=>{const s=S.qs[x.id];return s&&s[0]>0}).length,p=its.length?Math.round(m/its.length*100):0;
        return '<div class="mrow"><div><span>'+esc(v)+'</span><b>'+p+'%</b></div><div class="mb"><i style="width:'+p+'%;background:'+(p>=80?'var(--acc)':p>=40?'var(--amber)':'var(--rose)')+'"></i></div></div>'}).join('')+'</div>'+
      '<h3 style="margin:30px 0 8px;font-size:1.2rem">🏆 Ranking</h3><div class="row" style="display:flex;gap:8px;flex-wrap:wrap;align-items:center;margin-bottom:10px"><label for="nick" class="muted" style="font-size:.88rem">Tu nombre en el ranking:</label><input id="nick" type="text" maxlength="20" value="'+esc(S.nick)+'" placeholder="Escribe tu nombre" style="font:inherit;padding:8px 12px;border-radius:10px;border:1px solid var(--line);background:var(--panel);color:var(--ink)"></div><div id="rank" class="card" style="padding:6px 10px"><p class="muted" style="margin:8px">Cargando…</p></div>'+
      '<p class="muted" style="font-size:.8rem;margin-top:18px"><button class="btn sm" type="button" id="tReset">Borrar mi progreso del test</button></p>';
    $$('.mode',R).forEach(b=>b.onclick=()=>start(b.dataset.m));
    $$('#cLv .tchip').forEach(b=>b.onclick=()=>{const l=+b.dataset.l;cfg.lv.has(l)?cfg.lv.delete(l):cfg.lv.add(l);if(!cfg.lv.size)cfg.lv.add(l);b.setAttribute('aria-pressed',cfg.lv.has(l));cnt()});
    $$('#cTp .tchip').forEach(b=>b.onclick=()=>{const t=b.dataset.t;cfg.tp.has(t)?cfg.tp.delete(t):cfg.tp.add(t);b.setAttribute('aria-pressed',cfg.tp.has(t));cnt()});
    $('#cAll').onclick=()=>{const all=cfg.tp.size===Object.keys(TOP).length;cfg.tp=new Set(all?[]:Object.keys(TOP));$$('#cTp .tchip').forEach(b=>b.setAttribute('aria-pressed',cfg.tp.has(b.dataset.t)));cnt()};
    seg('#cN',v=>{cfg.n=+v});
    $('#nick').onchange=e=>{S.nick=e.target.value.trim().slice(0,20);save();toast('Nombre guardado')};
    $('#tReset').onclick=()=>{if(confirm('¿Borrar XP, rachas y estadísticas del test?')){S={xp:0,best:0,ans:0,ok:0,qs:{},games:0,nick:S.nick,bestNota:0};save();home()}};
    function cnt(){$('#cCount').textContent='→ '+pool().length+' preguntas disponibles'}
    cnt();ranking()}
  function start(m){let list,opts={mode:m,lives:null,time:null,instant:true,endless:false};
    if(m==='rapido'){list=shuffle(pool());if(cfg.n)list=list.slice(0,cfg.n)}
    else if(m==='examen'){const p=shuffle(items);list=[...p.filter(x=>x.l===1).slice(0,9),...p.filter(x=>x.l===2).slice(0,13),...p.filter(x=>x.l===3).slice(0,8)];list=shuffle(list);opts.time=25*60;opts.instant=false}
    else if(m==='super'){list=shuffle(pool());opts.lives=3;opts.endless=true}
    else if(m==='flash'){list=shuffle(items.filter(x=>x.l<3));opts.time=60;opts.endless=true;opts.flash=true}
    else if(m==='fallos'){list=shuffle(wrongs())}
    else if(m==='dificil'){list=shuffle(items.filter(x=>x.l===3))}
    if(!list.length){toast('No hay preguntas con esa configuración');return}
    G=Object.assign(opts,{list,k:0,ok:0,streak:0,best:0,xp:0,log:[],run:true,t0:Date.now()});
    if(G.time){G.left=G.time;G.tick=setInterval(()=>{G.left--;const t=$('#tTimer');if(t){t.textContent=fmtT(G.left);t.classList.toggle('low',G.left<=(G.flash?10:60))}if(G.left<=0){clearInterval(G.tick);finish()}},1000)}
    location.hash!=='#test'&&history.replaceState(null,'','#test');show()}
  const fmtT=s=>Math.floor(s/60)+':'+String(s%60).padStart(2,'0');
  const mult=()=>1+Math.min(4,Math.floor(G.streak/3))*.5;
  function show(){if(G.k>=G.list.length){if(G.endless&&G.mode==='super'){G.list=G.list.concat(shuffle(pool()))}else if(G.endless){G.list=G.list.concat(shuffle(items.filter(x=>x.l<3)))}else return finish()}
    const it=G.list[G.k],order=shuffle(it.o.map((o,i)=>i));G.order=order;G.answered=false;
    const total=G.endless?'∞':G.list.length;
    R.innerHTML='<div class="qwrap"><div class="qtop"><button class="btn sm" type="button" id="tQuit">✕ Salir</button><span class="qn">'+(G.k+1)+' / '+total+'</span>'+
      (G.endless?'':'<div class="qprog"><i style="width:'+(G.k/G.list.length*100)+'%"></i></div>')+
      (G.lives!=null?'<span class="lives">'+'❤️'.repeat(G.lives)+'🖤'.repeat(3-G.lives)+'</span>':'')+
      (G.time?'<span class="timer" id="tTimer">'+fmtT(G.left)+'</span>':'')+
      (G.instant?'<span class="mult" title="Multiplicador de XP">x'+mult()+'</span><span class="flame'+(G.streak>=3?' hot':'')+'" id="tFlame"><span class="f">🔥</span>'+G.streak+'</span>':'')+'</div>'+
      '<div class="qcard" id="qc"><div class="qmeta"><span class="tag lv'+it.l+'">'+LVN[it.l].toUpperCase()+'</span><span class="tag" style="--c:var(--violet)">'+esc(TOP[it.t])+'</span></div><h3>'+esc(it.q)+'</h3>'+(it.c?codeBlock(it.c,codeFn(it.c)):'')+
      '<div class="opts">'+order.map((oi,n)=>'<button class="opt" type="button" data-oi="'+oi+'"><kbd>'+(n+1)+'</kbd><span>'+esc(it.o[oi])+'</span></button>').join('')+'</div><div id="tFb"></div>'+
      '<div class="qbar"><span class="hint">Teclas 1–'+order.length+' para responder · Intro para seguir</span><button class="btn pri" type="button" id="tNext" hidden>Siguiente →</button></div></div></div>';
    $$('.opt',R).forEach(b=>b.onclick=()=>answer(+b.dataset.oi,b));
    $('#tQuit').onclick=()=>{if(G.k===0||confirm('¿Salir? Se guardará lo que llevas.'))finish(true)};
    $('#tNext').onclick=next;
    $('#qc .code')&&($('#qc .code').dataset.raw=it.c)}
  function answer(oi,btn){if(G.answered||!G.run)return;G.answered=true;const it=G.list[G.k],good=oi===it.a;
    G.log.push({it,oi,good});S.ans++;const st=S.qs[it.id]||[0,0,0];good?st[0]++:st[1]++;st[2]=good?1:0;S.qs[it.id]=st;
    if(good){G.ok++;S.ok++;G.streak++;G.best=Math.max(G.best,G.streak);const g=Math.round(BASE[it.l]*(G.instant?mult():1));G.xp+=g;S.xp+=g;
      if(G.streak>S.best){S.best=G.streak}if(G.flash){G.left+=3}
      if(G.instant){floatXP('+'+g+' XP',btn);if([5,10,15,20,30,50].includes(G.streak)){toast('🔥 ¡Racha de '+G.streak+'!');confetti(G.streak>=10?90:45)}}}
    else{G.streak=0;if(G.lives!=null)G.lives--}
    save();
    if(G.instant){$$('.opt',R).forEach(b=>{b.disabled=true;const v=+b.dataset.oi;if(v===it.a)b.classList.add('ok');else if(v===oi)b.classList.add('ko');else b.classList.add('dim')});
      if(!good){$('#qc').classList.remove('shake');void $('#qc').offsetWidth;$('#qc').classList.add('shake')}
      $('#tFb').innerHTML='<div class="fb '+(good?'ok':'ko')+'"><span class="fi">'+(good?'✅':'❌')+'</span><div><b>'+(good?['¡Correcto!','¡Bien!','¡Exacto!','¡Eso es!'][Math.random()*4|0]:'Incorrecto · la buena es: '+esc(it.o[it.a]))+'</b><p>'+esc(it.e)+'</p></div></div>';
      const fl=$('#tFlame');if(fl){fl.innerHTML='<span class="f">🔥</span>'+G.streak;fl.classList.toggle('hot',G.streak>=3);fl.classList.remove('bump');void fl.offsetWidth;good&&fl.classList.add('bump')}
      $('.mult',R)&&($('.mult',R).textContent='x'+mult());
      if(G.lives!=null){$('.lives',R).textContent='❤️'.repeat(G.lives)+'🖤'.repeat(3-G.lives);if(G.lives<=0){$('#tNext').textContent='Ver resultados'}}
      if(G.flash){setTimeout(()=>{if(G&&G.run&&G.answered)next()},good?450:1300)}
      $('#tNext').hidden=false;$('#tNext').focus({preventScroll:true})}
    else{$$('.opt',R).forEach(b=>{b.disabled=true;if(b===btn)b.style.borderColor='var(--sky)';else b.classList.add('dim')});setTimeout(next,280)}}
  function next(){if(!G||!G.run)return;if(G.lives!=null&&G.lives<=0)return finish();G.k++;show()}
  function floatXP(t,el){if(reduce)return;const r=el.getBoundingClientRect(),d=document.createElement('div');d.className='xpfloat';d.textContent=t;d.style.left=(r.right-90)+'px';d.style.top=(r.top-6)+'px';document.body.appendChild(d);setTimeout(()=>d.remove(),1000)}
  function finish(quit){if(!G)return;clearInterval(G.tick);G.run=false;const n=G.log.length,ok=G.ok,nota=n?ok/n*10:0;S.games++;
    if(G.mode==='examen'&&!quit&&n)S.bestNota=Math.max(S.bestNota||0,nota);
    if(!G.instant){G.log.forEach(l=>{if(l.good){const g=BASE[l.it.l];G.xp+=g;S.xp+=g}})}
    save();
    if(n)persist(ok,n,nota);
    const C=2*Math.PI*86,msg=nota>=9?'¡Bestial! 🏆':nota>=7?'¡Muy bien! 💪':nota>=5?'Aprobado 👍':'A repasar un poco más 📚';
    R.innerHTML='<div class="res"><div class="big"><svg viewBox="0 0 200 200"><circle class="bg" cx="100" cy="100" r="86"/><circle class="fg" id="rRing" cx="100" cy="100" r="86" stroke-dasharray="'+C+'" stroke-dashoffset="'+C+'"/></svg><div><b id="rNota">0.0</b><span>sobre 10</span></div></div>'+
      '<h2>'+msg+'</h2><p class="muted">'+({rapido:'Práctica',examen:'Modo examen',super:'Supervivencia',flash:'Relámpago',fallos:'Repaso de fallos',dificil:'Solo difíciles'}[G.mode])+' · '+ok+' de '+n+' aciertos'+(quit?' (abandonado)':'')+'</p>'+
      '<div class="kpis"><div class="kpi"><b>+'+G.xp+'</b><span>XP ganada</span></div><div class="kpi"><b>🔥 '+G.best+'</b><span>mejor racha</span></div><div class="kpi"><b>'+Math.round((Date.now()-G.t0)/1000)+' s</b><span>tiempo</span></div><div class="kpi"><b>'+level(S.xp).emo+'</b><span>'+level(S.xp).name+'</span></div></div>'+
      '<div style="display:flex;gap:10px;justify-content:center;flex-wrap:wrap"><button class="btn pri" type="button" id="rAgain">↻ Repetir modo</button>'+(G.log.some(l=>!l.good)?'<button class="btn" type="button" id="rWrong">🩹 Repetir mis fallos</button>':'')+'<button class="btn" type="button" id="rHome">⌂ Menú del test</button></div>'+
      '<div class="rev"><h3 style="margin:26px 0 10px;font-size:1.15rem">Revisión</h3><div class="seg" id="rF"><button type="button" data-v="ko" aria-pressed="true">Fallos</button><button type="button" data-v="all" aria-pressed="false">Todas</button></div><div id="rList" style="margin-top:12px"></div></div></div>';
    const draw=f=>{$('#rList').innerHTML=G.log.filter(l=>f==='all'||!l.good).map(l=>'<div class="ri'+(l.good?' c':'')+'"><b>'+esc(l.it.q)+'</b>'+(l.it.c?'<pre style="font:500 .8rem var(--f-m);background:var(--code-bg);color:var(--code-fg);padding:8px 10px;border-radius:8px;overflow:auto;margin:6px 0">'+esc(l.it.c)+'</pre>':'')+'<p>'+(l.good?'✅ '+esc(l.it.o[l.it.a]):'❌ Tu respuesta: <s>'+esc(l.it.o[l.oi])+'</s><br>✅ Correcta: <b>'+esc(l.it.o[l.it.a])+'</b>')+'</p><p>'+esc(l.it.e)+'</p></div>').join('')||'<p class="muted">¡Sin fallos! 🎉</p>'};
    draw('ko');seg('#rF',draw);
    const mode=G.mode,wrongList=G.log.filter(l=>!l.good).map(l=>l.it);
    $('#rAgain').onclick=()=>start(mode);$('#rHome').onclick=()=>{G=null;home()};
    $('#rWrong')&&($('#rWrong').onclick=()=>{G={mode:'fallos',list:shuffle(wrongList),k:0,ok:0,streak:0,best:0,xp:0,log:[],run:true,instant:true,t0:Date.now(),lives:null,time:null};show()});
    requestAnimationFrame(()=>requestAnimationFrame(()=>{$('#rRing').style.strokeDashoffset=C*(1-nota/10)}));
    if(reduce)$('#rNota').textContent=nota.toFixed(1);else{let t0;const an=ts=>{t0=t0||ts;const p=Math.min(1,(ts-t0)/1300),e=1-Math.pow(1-p,3);$('#rNota').textContent=(nota*e).toFixed(1);if(p<1)requestAnimationFrame(an)};requestAnimationFrame(an)}
    if(nota>=7&&n>=5)setTimeout(()=>confetti(110),500);
    scrollTo({top:0,behavior:reduce?'auto':'smooth'})}
  function persist(ok,n,nota){if(!window.claude||!claude.use)return;
    Promise.all([claude.use('db'),claude.use('user')]).then(([db,u])=>u.id().then(id=>db.doc(T.rank+'/'+id).get().then(snap=>{const prev=snap.exists?snap.data():{};
      return db.doc(T.rank+'/'+id).set({nick:S.nick||prev.nick||'Anónimo',score:ok,total:n,final:Math.round(nota*10)/10,best:Math.max(prev.best||0,Math.round(nota*10)/10),streak:Math.max(prev.streak||0,S.best),xp:S.xp,t:Date.now()})}))).catch(()=>{})}
  function ranking(){const box=$('#rank');if(!box)return;if(!window.claude||!claude.use){box.innerHTML='<p class="muted" style="margin:8px">Ranking no disponible.</p>';return}
    Promise.all([claude.use('db'),claude.use('user')]).then(([db,u])=>Promise.all([db.collection(T.rank).get(),u.id()])).then(([snap,me])=>{
      const rows=snap.docs.map(d=>Object.assign({id:d.id},d.data())).sort((a,b)=>(b.xp||0)-(a.xp||0)).slice(0,15);
      if(!$('#rank'))return;
      $('#rank').innerHTML=rows.length?'<table class="rank"><thead><tr><th>#</th><th>Nombre</th><th>XP</th><th>Mejor nota</th><th>🔥</th></tr></thead><tbody>'+rows.map((r,i)=>'<tr class="'+(r.id===me?'me':'')+'"><td>'+(['🥇','🥈','🥉'][i]||i+1)+'</td><td>'+esc(r.nick||'Anónimo')+'</td><td>'+(r.xp||0)+'</td><td>'+(r.best!=null?r.best:'—')+'</td><td>'+(r.streak||0)+'</td></tr>').join('')+'</tbody></table>':'<p class="muted" style="margin:8px">Aún no hay partidas. ¡Juega una para aparecer!</p>'}).catch(()=>{$('#rank')&&($('#rank').innerHTML='<p class="muted" style="margin:8px">No se pudo cargar el ranking.</p>')})}
  addEventListener('keydown',e=>{if(curView!=='test'||!G||!G.run||e.target.matches('input,select,textarea'))return;
    if(/^[1-5]$/.test(e.key)){const b=$$('.opt',R)[+e.key-1];if(b&&!b.disabled){e.preventDefault();b.click()}}
    else if(e.key==='Enter'){const n=$('#tNext');if(n&&!n.hidden){e.preventDefault();next()}}});
  return{home}})();

route();watchRv();
}
})();
