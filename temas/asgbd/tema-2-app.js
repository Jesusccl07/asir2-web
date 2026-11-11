/* ASGBD · Tema 2 — lógica de la página: navegación, laboratorios, práctica y test con rachas */
(function(){
'use strict';
const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const rd=(k,d)=>{try{const v=localStorage.getItem(k);return v?JSON.parse(v):d}catch(e){return d}};
const wr=(k,v)=>{try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}};
const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
const Q=window.ASGBD2_QUESTIONS||[], TOP=window.ASGBD2_TOPICS||{}, SCR=window.ASGBD2_SCRIPTS||{};

/* ───── utilidades visuales ───── */
let toastT;
function toast(msg){const t=$('#toast');t.textContent=msg;t.classList.add('on');clearTimeout(toastT);toastT=setTimeout(()=>t.classList.remove('on'),2600)}
function confetti(n=70){if(reduce)return;const cs=['#34d399','#60a5fa','#a78bfa','#fbbf24','#fb7185','#f2a900'];
  for(let i=0;i<n;i++){const d=document.createElement('i');d.className='confetti';d.style.left=Math.random()*100+'vw';d.style.background=cs[i%cs.length];
    d.style.animationDuration=(1.6+Math.random()*1.6)+'s';d.style.animationDelay=Math.random()*.4+'s';d.style.borderRadius=Math.random()>.5?'50%':'2px';
    document.body.appendChild(d);setTimeout(()=>d.remove(),3800)}}
function copyText(txt,btn){const done=()=>{if(btn){const o=btn.textContent;btn.textContent='¡Copiado!';btn.classList.add('ok');setTimeout(()=>{btn.textContent=o;btn.classList.remove('ok')},1400)}};
  if(navigator.clipboard&&navigator.clipboard.writeText)navigator.clipboard.writeText(txt).then(done,()=>fallback());else fallback();
  function fallback(){const ta=document.createElement('textarea');ta.value=txt;ta.style.position='fixed';ta.style.opacity='0';document.body.appendChild(ta);ta.select();try{document.execCommand('copy')}catch(e){}ta.remove();done()}}

/* ───── tema claro/oscuro ───── */
const root=document.documentElement,savedTheme=rd('asgbd-t2.theme',null);
if(savedTheme)root.dataset.theme=savedTheme;
$('#themeBtn').onclick=()=>{const dark=root.dataset.theme?root.dataset.theme==='dark':matchMedia('(prefers-color-scheme: dark)').matches;root.dataset.theme=dark?'light':'dark';wr('asgbd-t2.theme',root.dataset.theme)};

/* ───── racha de días ───── */
const today=new Date().toISOString().slice(0,10);
const days=rd('asgbd-t2.days',[]);if(days[days.length-1]!==today){days.push(today);wr('asgbd-t2.days',days.slice(-400))}
function dayStreak(){let n=0,d=new Date();const set=new Set(rd('asgbd-t2.days',[]));while(set.has(d.toISOString().slice(0,10))){n++;d.setDate(d.getDate()-1)}return n}
(()=>{const n=dayStreak();$('#dsN').textContent=n;$('#dayStreak b').textContent=n===1?'día':'días'})();

/* ───── resaltado de SQL/shell ───── */
const KW='select|from|where|and|or|not|in|like|order|by|group|having|as|is|null|distinct|insert|into|values|update|set|delete|create|alter|drop|table|view|index|sequence|user|session|system|database|instance|pluggable|startup|shutdown|mount|nomount|open|restrict|force|read|only|immediate|transactional|abort|normal|grant|execute|on|to|desc|describe|commit|rollback|exit|connect|identified|by|sysdba|sysoper|scope|spfile|pfile|memory|both|deferred|show|parameter|spparameter|enable|disable|all|except|upgrade|close';
const RX=new RegExp('(^#!.*$)|((?:^|(?<=\\s))--.*$)|((?:^|(?<=\\s))#.*$)|("(?:\\\\.|[^"\\\\])*")|(\'[^\']*\')|(\\$\\{[^}]+\\}|\\$[A-Za-z_][A-Za-z0-9_]*)|\\b('+KW+')\\b|(\\b\\d+(?:\\.\\d+)?\\b)|(&&|\\|\\||;;|\\[\\[|\\]\\]|\\|)','gi');
function hlLine(line){let out='',last=0,m;RX.lastIndex=0;
  while((m=RX.exec(line))){if(m[0]===''){RX.lastIndex++;continue}
    out+=esc(line.slice(last,m.index));const t=m[0];
    const cls=m[1]?'k-sb':(m[2]||m[3])?'k-com':(m[4]||m[5])?'k-str':m[6]?'k-var':m[7]?'k-kw':m[8]?'k-num':'k-op';
    out+='<span class="'+cls+'">'+esc(t)+'</span>';last=m.index+t.length}
  return out+esc(line.slice(last))}
function hl(code,lines){return code.split('\n').map((l,i)=>(lines?'<span class="ln">'+(i+1)+'</span>':'')+hlLine(l)).join('\n')}
function codeBlock(code,fn,opts={}){
  return '<div class="code"><div class="ch"><span class="dots"><i></i><i></i><i></i></span><span class="fn">'+esc(fn||'sql')+'</span><button class="copy" type="button">Copiar</button></div><pre>'+hl(code,opts.lines)+'</pre></div>'}
function enhanceCode(el){if(el.dataset.done)return;el.dataset.done=1;const pre=$('pre',el);const raw=pre.textContent;
  if(!el.hasAttribute('data-nohl'))pre.innerHTML=hl(raw);
  const h=document.createElement('div');h.className='ch';h.innerHTML='<span class="dots"><i></i><i></i><i></i></span><span class="fn">'+esc(el.dataset.fn||'sql')+'</span><button class="copy" type="button">Copiar</button>';
  el.insertBefore(h,pre);el.dataset.raw=raw}
document.addEventListener('click',e=>{const b=e.target.closest('.copy');if(!b)return;const c=b.closest('.code');
  const txt=c.dataset.raw||$('pre',c).innerText.replace(/^\s*\d+ /gm,'');copyText(txt,b)});
$$('.code').forEach(enhanceCode);

/* ───── revelar al hacer scroll ───── */
const rvObs=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');rvObs.unobserve(e.target)}}),{rootMargin:'0px 0px -8% 0px'});
function watchRv(scope=document){$$('.rv:not(.in)',scope).forEach(el=>reduce?el.classList.add('in'):rvObs.observe(el))}

/* ───── navegación entre vistas ───── */
const views=['teoria','practica','test'];
function movePill(){const a=$('.tabs a[aria-current="page"]'),p=$('#pill');if(!a)return;p.style.left=a.offsetLeft+'px';p.style.width=a.offsetWidth+'px'}
let curView=null;
function route(){const h=(location.hash||'#teoria').slice(1);
  let v=views.includes(h)?h:h.startsWith('a-')?'teoria':h.startsWith('p-')?'practica':h.startsWith('test')?'test':'teoria';
  if(v!==curView){views.forEach(x=>$('#v-'+x).classList.toggle('on',x===v));$$('.tabs a').forEach(a=>a.setAttribute('aria-current',a.dataset.v===v?'page':'false'));
    curView=v;movePill();if(v==='test')Test.home();if(!views.includes(h)){const t=document.getElementById(h);t&&setTimeout(()=>t.scrollIntoView({behavior:reduce?'auto':'smooth'}),60)}else scrollTo({top:0,behavior:'auto'});watchRv()}
  else if(!views.includes(h)){const t=document.getElementById(h);t&&t.scrollIntoView({behavior:reduce?'auto':'smooth'})}}
addEventListener('hashchange',route);addEventListener('resize',movePill);document.fonts&&document.fonts.ready.then(movePill);
if(window.ResizeObserver)$$('.tabs a').forEach(a=>new ResizeObserver(movePill).observe(a));

/* ───── hero: terminal que escribe ───── */
(function typer(){const el=$('#typer');const L=[
  ['p','SQL> ','startup'],['o','','ORACLE instance started.\nDatabase mounted.\nDatabase opened.'],
  ['p','SQL> ','select instance_name, status from v$instance;'],['o','','INSTANCE_NAME   STATUS\nFREE            OPEN'],
  ['p','$ ','lsnrctl status'],['o','','Service "FREEPDB1" has 1 instance(s).'],
  ['p','SQL> ','show parameter spfile'],['o','','spfile  /opt/oracle/.../spfileFREE.ora'],['c','','# ¿Listo para el test? 🔥']];
  if(reduce){el.innerHTML=L.map(([t,p,s])=>t==='p'?'<span class="p">'+p+'</span>'+esc(s):'<span class="'+t+'">'+esc(s)+'</span>').join('\n')+'\n<span class="cursor"></span>';return}
  let i=0,html='';const cur='<span class="cursor"></span>';
  function line(){if(i>=L.length){setTimeout(()=>{html='';i=0;line()},4200);return}
    const [t,p,s]=L[i++];if(t==='p'){let k=0;const pre=html+'<span class="p">'+p+'</span>';(function ty(){el.innerHTML=pre+esc(s.slice(0,k))+cur;if(k++<s.length)setTimeout(ty,22+Math.random()*32);else{html=pre+esc(s)+'\n';setTimeout(line,350)}})()}
    else{html+='<span class="'+t+'">'+esc(s)+'</span>\n';el.innerHTML=html+cur;setTimeout(line,550)}}
  line()})();
$('#nQ').textContent=Q.length;

/* ───── índice de teoría + progreso de lectura ───── */
const secs=$$('#theory .sec'),read=new Set(rd('asgbd-t2.read',[]));
$('#tocNav').innerHTML=secs.map((s,i)=>'<a href="#'+s.id+'" data-id="'+s.id+'"><b><span>'+(i+1)+'</span></b>'+esc(s.dataset.title)+'</a>').join('');
$('#mtoc').innerHTML=secs.map((s,i)=>'<a href="#'+s.id+'">'+(i+1)+'. '+esc(s.dataset.title)+'</a>').join('');
function paintRead(){$$('#tocNav a').forEach(a=>a.classList.toggle('read',read.has(a.dataset.id)));$('#readN').textContent=read.size;$('#readBar').style.width=(read.size/secs.length*100)+'%'}
paintRead();$('#readTot').textContent=secs.length;
const spy=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)$$('#tocNav a').forEach(a=>a.classList.toggle('active',a.dataset.id===e.target.id))}),{rootMargin:'-30% 0px -60% 0px'});
secs.forEach(s=>{spy.observe(s);const end=document.createElement('div');end.style.height='1px';s.appendChild(end);
  new IntersectionObserver((es,o)=>es.forEach(e=>{if(e.isIntersecting&&$('#v-teoria').classList.contains('on')){if(!read.has(s.id)){read.add(s.id);wr('asgbd-t2.read',[...read]);paintRead();if(read.size===secs.length){toast('🎓 ¡Has leído toda la teoría!');confetti()}}o.disconnect()}})).observe(end)});

/* ═════════════ LABORATORIOS DE TEORÍA ═════════════ */

/* lab: estados de arranque (nomount → mount → open) */
const STATE_ORDER=['SHUTDOWN','NOMOUNT','MOUNT','OPEN'];
let curState=0;
function paintState(){$$('.statebox',$('#stStates')).forEach((b,i)=>b.classList.toggle('on',i===curState));
  $('#stCmd').textContent=curState===0?'(instancia parada)':STATE_ORDER[curState]==='NOMOUNT'?'startup nomount':STATE_ORDER[curState]==='MOUNT'?'alter database mount;':'alter database open;';
  $('#stStartup').disabled=curState!==0;$('#stMount').disabled=curState!==1;$('#stOpen').disabled=curState!==2;$('#stShut').disabled=curState===0}
$('#stStates')&&($('#stStates').innerHTML=STATE_ORDER.map(s=>'<div class="statebox">'+s+'</div>').join(''));
$('#stStartup')&&($('#stStartup').onclick=()=>{curState=1;paintState()});
$('#stMount')&&($('#stMount').onclick=()=>{curState=2;paintState()});
$('#stOpen')&&($('#stOpen').onclick=()=>{curState=3;paintState()});
$('#stShut')&&($('#stShut').onclick=()=>{curState=0;paintState()});
paintState();

/* lab genérico de segmentados (usado por otros labs) */
function seg(id,cb){const s=$(id);if(!s)return()=>null;$$('button',s).forEach(b=>b.onclick=()=>{$$('button',s).forEach(x=>x.setAttribute('aria-pressed',x===b));cb&&cb(b.dataset.v)});return()=>{const b=$('button[aria-pressed="true"]',s);return b?b.dataset.v:null}}

/* lab: tipos de shutdown */
const SHUT=[['normal','shutdown','Espera a que terminen todas las transacciones y sesiones. Checkpoint y cierre ordenado.'],
  ['transactional','shutdown transactional','Corta las conexiones sin transacción; espera a que acaben las iniciadas en la CDB.'],
  ['immediate','shutdown immediate','No admite conexiones nuevas; rollback de las transacciones en curso.'],
  ['abort','shutdown abort','Corta todo de golpe. No hace checkpoint ni guarda nada. Requiere recovery al arrancar.']];
function initShut(){if(!$('#shutSeg'))return;
  $('#shutSeg').innerHTML=SHUT.map(([v],i)=>'<button type="button" data-v="'+v+'" aria-pressed="'+(i===0)+'">'+v+'</button>').join('');
  $$('#shutSeg button').forEach(b=>b.onclick=()=>{$$('#shutSeg button').forEach(x=>x.setAttribute('aria-pressed',x===b));const s=SHUT.find(x=>x[0]===b.dataset.v);$('#shutOut').innerHTML='<span class="p">SQL&gt;</span> '+esc(s[1])+'\n<span class="d"># '+esc(s[2])+'</span>'});
  $$('#shutSeg button')[0].click()}
initShut();

/* lab: cambio de contraseña SYS/SYSTEM */
const pwUser=seg('#pwUser',pwPaint);
function pwPaint(){const u=pwUser()||'sys',p=$('#pwVal').value||'nuevaClave123';
  $('#pwOut').innerHTML='<span class="p">SQL&gt;</span> connect system/manager\n<span class="p">SQL&gt;</span> alter user '+u+' identified by "'+esc(p)+'";\n<span class="d"># Usuario '+u.toUpperCase()+' modificado.</span>'}
$('#pwVal')&&($('#pwVal').oninput=pwPaint);pwPaint();

/* lab: SYSDBA vs SYSOPER */
const SYSPRIV={sysdba:['Arrancar/parar la instancia','Crear la base de datos','Modificar cualquier objeto','Acceso total a los datos'],sysoper:['Arrancar/parar la instancia','Hacer backup y recovery básico','Modo ARCHIVELOG','NO accede a los datos de usuario']};
const svSel=seg('#svSel',v=>{$('#svOut').innerHTML=SYSPRIV[v||'sysdba'].map(x=>'<div class="y" style="text-align:left;padding:8px 12px">✓ '+esc(x)+'</div>').join('')});
if($('#svSel')){$$('#svSel button')[0]&&$$('#svSel button')[0].click()}

/* lab: crear pfile/spfile */
function pfSel(){const from=seg('#pfFrom')(),to=seg('#pfTo')();return[from,to]}
function pfPaint(){const from=seg('#pfFrom')()||'spfile',to=seg('#pfTo')()||'pfile';
  const cmd=to==='pfile'?'create pfile from '+from+';':'create spfile from '+from+';';
  $('#pfOut').innerHTML='<span class="p">SQL&gt;</span> '+esc(cmd)+'\n<span class="d"># Crea el '+to.toUpperCase()+' a partir del '+from.toUpperCase()+' actual, en su ubicación por defecto.</span>'}
seg('#pfFrom',pfPaint);seg('#pfTo',pfPaint);if($('#pfFrom')){$$('#pfFrom button')[0].click();$$('#pfTo button')[1]?$$('#pfTo button')[1].click():$$('#pfTo button')[0].click()}

/* lab: ALTER SYSTEM scope */
const scpSel=seg('#scpSel',scpPaint);
function scpPaint(){const s=seg('#scpSel')()||'both';
  const desc={spfile:'Solo se graba en el SPFILE. El cambio se aplicará en el PRÓXIMO arranque.',memory:'Se aplica YA en memoria, pero no se guarda: en el próximo arranque se pierde.',both:'Se aplica ya en memoria Y se guarda en el SPFILE: inmediato y permanente.'}[s];
  $('#scpOut').innerHTML='<span class="p">SQL&gt;</span> alter system set open_cursors=500 scope='+s+';\n<span class="d"># '+esc(desc)+'</span>'}
if($('#scpSel')){$$('#scpSel button')[2]?$$('#scpSel button')[2].click():$$('#scpSel button')[0].click()}

/* lab: tnsnames builder */
function tnsPaint(){const alias=($('#tnAlias').value||'FREEPDB1').trim(),host=($('#tnHost').value||'0.0.0.0').trim(),port=($('#tnPort').value||'1521').trim(),svc=($('#tnSvc').value||'FREEPDB1').trim();
  $('#tnOut').innerHTML='<span class="d"># tnsnames.ora</span>\n'+esc(alias)+' =\n  (DESCRIPTION =\n    (ADDRESS = (PROTOCOL = TCP)(HOST = '+esc(host)+')(PORT = '+esc(port)+'))\n    (CONNECT_DATA =\n      (SERVER = DEDICATED)\n      (SERVICE_NAME = '+esc(svc)+')\n    )\n  )'}
['#tnAlias','#tnHost','#tnPort','#tnSvc'].forEach(s=>$(s)&&$(s).addEventListener('input',tnsPaint));tnsPaint();

/* lab: lsnrctl */
let lsnrUp=true;
function lsnrPaint(cmd){const out=$('#lsnrOut');
  if(cmd==='status'){out.innerHTML=lsnrUp?'<span class="p">LSNRCTL&gt;</span> status\nSTATUS of the LISTENER\n------------------------\nAlias                    listener\nUptime                   <span class="y">activo</span>\nServices Summary...\nService "FREEPDB1" has 1 instance(s).':'<span class="p">LSNRCTL&gt;</span> status\n<span class="e">TNS-12541: Cannot connect. No listener</span>'}
  else if(cmd==='stop'){lsnrUp=false;out.innerHTML='<span class="p">LSNRCTL&gt;</span> stop listener\n<span class="d"># El listener se ha detenido. Las conexiones remotas dejarán de funcionar; las locales siguen.</span>'}
  else if(cmd==='start'){lsnrUp=true;out.innerHTML='<span class="p">LSNRCTL&gt;</span> start listener\nTNSLSNR for Linux: Version 23.0.0.0.0\nListening on: (ADDRESS=(PROTOCOL=tcp)(HOST=0.0.0.0)(PORT=1521))\n<span class="d"># Listener arrancado.</span>'}}
$$('#lsnrBtns button').forEach&&$$('#lsnrBtns button').forEach(b=>b.onclick=()=>lsnrPaint(b.dataset.c));
lsnrPaint('status');

/* lab: cadena de conexión SQL Developer */
function connPaint(){const host=($('#cnHost').value||'localhost').trim(),port=($('#cnPort').value||'1521').trim(),svc=($('#cnSvc').value||'freepdb1').trim(),user=($('#cnUser').value||'sys').trim(),role=seg('#cnRole')()||'SYSDBA';
  const tns='(DESCRIPTION=(ADDRESS=(PROTOCOL=TCP)(HOST='+host+')(PORT='+port+'))(CONNECT_DATA=(SERVICE_NAME='+svc+')))';
  $('#cnOut').innerHTML='<span class="d"># Conexión en SQL Developer</span>\nUsuario: '+esc(user)+'   Rol: '+esc(user==='sys'||user==='system'?role:'Normal')+'\nHost: '+esc(host)+'   Puerto: '+esc(port)+'   Nombre del servicio: '+esc(svc)+'\n\n<span class="d"># Cadena equivalente (JDBC thin)</span>\njdbc:oracle:thin:@'+esc(tns)}
['#cnHost','#cnPort','#cnSvc','#cnUser'].forEach(s=>$(s)&&$(s).addEventListener('input',connPaint));
seg('#cnRole',connPaint);if($('#cnRole')){$$('#cnRole button')[0].click()}
connPaint();

/* lab: diccionario de datos — ver qué vista usar */
const DICC_SCOPE={user:'Solo tus propios objetos',all:'Tus objetos + los que tienes permiso de usar',dba:'TODOS los objetos de la base de datos (requiere privilegios de DBA)',v:'Información dinámica en memoria (se pierde al parar la instancia)'};
const dcObj=seg('#dcObj',dcPaint),dcScope=seg('#dcScope',dcPaint);
function dcPaint(){const obj=dcObj()||'TABLES',scope=dcScope()||'user';
  const view=scope==='v'?'V$'+obj:scope.toUpperCase()+'_'+obj;
  $('#dcOut').innerHTML='<span class="p">SQL&gt;</span> select * from '+view.toLowerCase()+';\n<span class="d"># '+esc(DICC_SCOPE[scope])+'</span>'}
if($('#dcObj')){$$('#dcObj button')[0].click();$$('#dcScope button')[0].click()}

/* lab: en qué estado funciona cada vista */
const DICC_STATE={'v$instance':1,'v$parameter':1,'v$controlfile':2,'v$datafile':2,'dba_users':3,'dba_tables':3,'user_objects':3};
function dsPaint(){const v=$('#dsSel').value,need=DICC_STATE[v],ok=curState>=need;
  $('#dsOut').innerHTML='<span class="p">SQL&gt;</span> select * from '+v+';\n'+(ok?'<span class="p">¡Funciona! (hace falta estado '+STATE_ORDER[need]+' o superior; ahora: '+STATE_ORDER[curState]+')</span>':'<span class="e">ORA-01219: database not open / ORA-01034: ORACLE not available</span>\n<span class="d"># Necesita estado '+STATE_ORDER[need]+' o superior; ahora estás en '+STATE_ORDER[curState]+' (cámbialo en el laboratorio de arranque, arriba).</span>')}
$('#dsSel')&&($('#dsSel').onchange=dsPaint,dsPaint());

/* lab: fichero de traza según el proceso */
const TRACE_PROC={PMON:'Process Monitor: limpia procesos fallidos',SMON:'System Monitor: recuperación de la instancia',DBWR:'Database Writer: vuelca los buffers al disco',LGWR:'Log Writer: escribe los redo log',CKPT:'Checkpoint: sincroniza los datafiles',ARCH:'Archiver: copia los redo log llenos',RECO:'Recoverer: resuelve transacciones distribuidas'};
function trPaint(){const p=$('#trSel').value;
  $('#trOut').innerHTML='<span class="p">SQL&gt;</span> select pid, program, tracefile from v$process;\n<span class="y">PID  PROGRAM           TRACEFILE</span>\n12   oracle_'+p.toLowerCase()+'_FREE  …/trace/FREE_'+p.toLowerCase()+'_000012.trc\n<span class="d"># '+esc(p)+': '+esc(TRACE_PROC[p])+'</span>'}
$('#trSel')&&($('#trSel').onchange=trPaint,trPaint());

/* lab: tkprof */
function tkPaint(){const sys=$('#tkSys').checked?'yes':'no';
  $('#tkOut').innerHTML='<span class="p">$</span> tkprof fichero_traza.trc salida_traza.txt explain=scott/oracle sys='+sys+'\n<span class="d"># Genera salida_traza.txt con las sentencias SQL ejecutadas, su plan de ejecución y sus estadísticas'+(sys==='no'?' (sin usar la cuenta SYS para el EXPLAIN PLAN)':'')+'.</span>'}
$('#tkSys')&&($('#tkSys').onchange=tkPaint,tkPaint());

/* ═════════════ PRÁCTICA ═════════════ */
const DATOS=[['Usuario BBDD','oracle'],['SID / servicio','FREE'],['PDB de pruebas','FREEPDB1'],['Puerto del listener','1521'],['Usuario de prácticas','SCOTT'],['Contraseña SCOTT','oracle'],['Carpeta scripts','~/ASGBD/Tema_2'],['Script de ejemplo','script_scott.sql']];
$('#datos').innerHTML=DATOS.map(([k,v])=>'<div class="dato"><div><span>'+esc(k)+'</span><b>'+esc(v)+'</b></div><button type="button" aria-label="Copiar '+esc(k)+'" data-copy="'+esc(v)+'">⧉</button></div>').join('');
$$('#datos [data-copy]').forEach(b=>b.onclick=()=>{copyText(b.dataset.copy);toast('Copiado: '+b.dataset.copy)});

const W={sql:['w-vs','SQL*Plus'],term:['w-xu','Terminal'],sqld:['w-win','SQL Developer'],sys:['w-gh','Como SYS']};
const PH=[
 {t:'Arranque, parada y cuentas',c:'#0c9a6a',s:[
  ['p1','sql','Arrancar la bbdd','Conéctate como administrador y arranca la instancia.','sqlplus / as sysdba\nSQL> startup'],
  ['p2','sql','Localizar el init.ora / spfile','Busca el fichero de parámetros de tu BD y anota su ruta completa.','SQL> show parameter spfile'],
  ['p3','sql','Asegurar las cuentas SYS y SYSTEM','Cambia las contraseñas por defecto de los dos administradores.','SQL> alter user sys identified by "NuevaClave1";\nSQL> alter user system identified by "NuevaClave2";'],
  ['p4','sql','Crear el usuario SCOTT en freepdb1','Conéctate a la PDB y ejecuta el script de creación de tablas.','SQL> @script_scott.sql\nSQL> alter user scott identified by oracle;'],
  ['p5','term','Dos sesiones: SCOTT y SYS','Abre un terminal con SCOTT conectado y otro con SYS a la CDB; para la BD de forma normal y observa qué pasa.','sqlplus scott/oracle@freepdb1\nsqlplus / as sysdba'],
  ['p6','sql','Probar los tipos de parada','Repite la parada con immediate y con abort, y comprueba la diferencia al reconectar.','SQL> shutdown immediate;\nSQL> shutdown abort;']]},
 {t:'Parámetros de la instancia',c:'#1a6fd6',s:[
  ['q1','sql','Crear una copia de seguridad del spfile','Genera un PFILE a partir del SPFILE actual, por si hace falta arrancar manualmente.','SQL> create pfile from spfile;'],
  ['q2','sql','Consultar un parámetro','Comprueba el valor de NLS_DATE_FORMAT con las distintas vistas.','SQL> show parameter NLS_DATE_FORMAT\nSQL> select * from v$parameter where upper(name) like \'%NLS_DATE%\';'],
  ['q3','sql','Cambiar un parámetro a nivel de sesión','Pon tu propio formato de fecha solo para tu sesión y compruébalo con sysdate.','SQL> alter session set NLS_DATE_FORMAT=\'DD/MM/YYYY\';\nSQL> select sysdate from dual;'],
  ['q4','sql','Cambiar un parámetro a nivel de sistema','Cambia NLS_DATE_FORMAT para toda la instancia con scope=both y reinicia para comprobarlo.','SQL> alter system set NLS_DATE_FORMAT=\'DD/MM/YYYY\' scope=both;\nSQL> shutdown immediate;\nSQL> startup;']]},
 {t:'Red, listener y clientes',c:'#6a48d6',s:[
  ['r1','term','Localizar listener.ora y tnsnames.ora','Comprueba en qué carpeta están (puede ser un enlace simbólico) y anota host, puerto y SERVICE_NAME.','find / -name listener.ora 2>/dev/null'],
  ['r2','term','Comprobar el estado del listener','Entra al programa de control y consulta su estado.','lsnrctl status'],
  ['r3','term','Parar el listener y probar una conexión remota','Para el listener y comprueba qué mensaje da sqlplus usuario/contraseña@bbdd desde fuera.','lsnrctl stop listener\nsqlplus scott/oracle@freepdb1'],
  ['r4','term','Arrancar el listener de nuevo','Vuelve a arrancarlo y repite la conexión remota: ahora debe funcionar.','lsnrctl start listener'],
  ['r5','sqld','Dar de alta conexiones en SQL Developer','Crea 3 conexiones (sys, system y scott) usando el tnsnames y también escribiendo la cadena a mano.',''],
  ['r6','sqld','Probar el diccionario de datos','Desde SCOTT, consulta tus tablas; desde SYSTEM, consulta las tablas de SCOTT (con owner).','SQL> select table_name from user_tables;\nSQL> select table_name from dba_tables where owner=\'SCOTT\';']]},
 {t:'Trazas y ficheros de log',c:'#c76a05',s:[
  ['s1','sql','Localizar el alert log','Averigua la ruta del fichero alert_<SID>.log de tu instancia.','SQL> select * from v$diag_info where name like \'%Alert%\';'],
  ['s2','term','Buscar la parada/arranque en el alert log','Para y arranca la BD, y localiza en el log el texto correspondiente.','tail -50 alert_FREE.log'],
  ['s3','sql','Activar la traza de tu propia sesión','Pide permiso a SYS si hace falta y activa/desactiva tu traza.','SQL> exec dbms_monitor.session_trace_enable(waits=>true, binds=>false);\nSQL> select value from v$diag_info where name=\'Default Trace File\';\nSQL> exec dbms_monitor.session_trace_disable;'],
  ['s4','term','Leer el fichero de traza con tkprof','Genera un informe legible del fichero .trc generado por SCOTT.','tkprof fichero.trc salida.txt explain=scott/oracle sys=no']]}];
const done=new Set(rd('asgbd-t2.steps',[]));
const totalSteps=PH.reduce((a,p)=>a+p.s.length,0);
$('#phases').innerHTML=PH.map((p,pi)=>'<div class="phase rv"><div class="phase-h" style="--c:'+p.c+'"><div class="pn">'+(pi+1)+'</div><h2>'+esc(p.t)+'</h2><span class="pp" data-pp="'+pi+'"></span></div>'+
  p.s.map(([id,w,t,d,cmd])=>'<div class="step" data-id="'+id+'"><button class="chk" type="button" aria-label="Marcar '+esc(t)+'"><svg viewBox="0 0 24 24"><path d="M5 12l5 5 9-10"/></svg></button><div><h4><span class="where '+W[w][0]+'">'+W[w][1]+'</span>'+esc(t)+'</h4><p>'+esc(d)+'</p>'+(cmd?codeBlock(cmd,W[w][1]):'')+'</div></div>').join('')+'</div>').join('');
function paintSteps(){$$('.step').forEach(s=>s.classList.toggle('done',done.has(s.dataset.id)));const n=[...done].filter(id=>$('.step[data-id="'+id+'"]')).length;
  $('#pDone').textContent=n;$('#pTotal').textContent=totalSteps;$('#pRing').style.strokeDashoffset=182.2*(1-n/totalSteps);
  PH.forEach((p,i)=>{$('[data-pp="'+i+'"]').textContent=p.s.filter(s=>done.has(s[0])).length+'/'+p.s.length})}
$$('.step .chk').forEach(b=>b.onclick=()=>{const id=b.closest('.step').dataset.id;done.has(id)?done.delete(id):done.add(id);wr('asgbd-t2.steps',[...done]);paintSteps();
  if(done.size===totalSteps){toast('🏆 ¡Instancia administrada al completo!');confetti()}});
$('#pReset').onclick=()=>{if(confirm('¿Desmarcar todos los pasos?')){done.clear();wr('asgbd-t2.steps',[]);paintSteps()}};
paintSteps();

const CHEAT=[['sqlplus / as sysdba','sql','Conectar como administrador local'],['startup / startup mount / startup nomount','sql','Arrancar la instancia en distintos estados'],['shutdown immediate','sql','Parada ordenada habitual'],['alter database mount;','sql','Pasar de NOMOUNT a MOUNT'],['alter database open;','sql','Pasar de MOUNT a OPEN'],['alter pluggable database freepdb1 open;','sql','Abrir una PDB'],['alter pluggable database all open;','sql','Abrir todas las PDB'],['show parameter spfile','sql','Ver la ruta del SPFILE'],['create pfile from spfile;','sql','Crear un PFILE de seguridad'],['alter system set parametro=valor scope=both;','sql','Cambiar un parámetro ya y para siempre'],['alter session set parametro=valor;','sql','Cambiar un parámetro solo en tu sesión'],['lsnrctl status','term','Ver el estado del listener'],['lsnrctl stop / start listener','term','Parar/arrancar el listener'],['tail -f log.xml','term','Ver el log del listener en vivo'],['select * from dba_tables where owner=\'X\';','sql','Tablas de un usuario (como admin)'],['select * from user_objects;','sql','Todos los objetos propios'],['exec dbms_monitor.session_trace_enable;','sql','Activar la traza de la sesión'],['tkprof f.trc s.txt explain=u/p sys=no','term','Dar formato legible a una traza']];
$('#cheat tbody').innerHTML=CHEAT.map(([c,w,d])=>'<tr><td><code style="white-space:normal;word-break:break-word">'+esc(c)+'</code></td><td><span class="where '+W[w][0]+'">'+W[w][1]+'</span></td><td>'+esc(d)+'</td></tr>').join('');

const EX=[
 ['e1','Arranque','Estados de arranque','Arranca en nomount, pasa a mount y después a open, comprobando en cada paso qué consultas funcionan y cuáles no.','SQL> startup nomount; alter database mount; alter database open;','NOMOUNT → MOUNT → OPEN: la bbdd queda accesible a todos los usuarios.'],
 ['e2','Arranque','Tipos de parada','Repite shutdown normal, transactional, immediate y abort con alguna sesión conectada y anota qué pasa en cada caso.','SQL> shutdown immediate;','immediate corta conexiones nuevas y hace rollback de las transacciones en curso.'],
 ['e3','Cuentas','Asegurar SYS y SYSTEM','Cambia las contraseñas por defecto (change_on_install y manager) por unas seguras.','SQL> alter user sys identified by "...";','Las contraseñas por defecto son públicas y deben cambiarse siempre.'],
 ['e4','Parámetros','Copiar spfile a pfile','Genera un pfile de seguridad a partir del spfile actual y guárdalo aparte.','SQL> create pfile=\'/tmp/initFREE.ora\' from spfile;','Sirve para arrancar manualmente si el spfile da problemas.'],
 ['e5','Parámetros','NLS_DATE_FORMAT en dos sesiones','Cambia el formato de fecha en una sesión y comprueba que la otra no se ve afectada.','SQL> alter session set NLS_DATE_FORMAT=\'DD/MM/YYYY\';','ALTER SESSION solo afecta a la conexión que lo ejecuta.'],
 ['e6','Conexiones','Parar y arrancar el listener','Para el listener, intenta conectar en remoto (debe fallar) y arráncalo de nuevo.','$ lsnrctl stop listener','Las conexiones locales siguen funcionando aunque el listener esté parado.'],
 ['e7','Clientes','Conexión SQL Developer sin tnsnames','Da de alta una conexión a mano con host, puerto y SERVICE_NAME, sin usar el fichero tnsnames.ora.','Host: localhost · Puerto: 1521 · Servicio: freepdb1','SQL Developer no necesita el Oracle Client instalado.'],
 ['e8','Diccionario','Tablas de SCOTT desde SYSTEM','Consulta las tablas de SCOTT conectado como SYSTEM, usando DBA_TABLES con el owner.','SQL> select table_name from dba_tables where owner=\'SCOTT\';','USER_TABLES no sirve aquí: solo muestra las tablas del usuario conectado.'],
 ['e9','Trazas','Traza de una select en SCOTT','Activa la traza, ejecuta una consulta sobre EMP y analiza el .trc con tkprof.','SQL> exec dbms_monitor.session_trace_enable;\nSQL> select * from emp;','tkprof convierte el fichero binario en un informe legible con el plan de ejecución.']];
const CATC={Arranque:'#0c9a6a',Cuentas:'#1a6fd6',Parámetros:'#6a48d6',Conexiones:'#c76a05',Clientes:'#d93b55',Diccionario:'#0e7bbd',Trazas:'#7a4cc2'};
let exCat='Todos';
function paintEx(){$('#exFilter').innerHTML=['Todos',...Object.keys(CATC)].map(c=>'<button class="tchip" type="button" aria-pressed="'+(c===exCat)+'" data-c="'+c+'">'+c+'</button>').join('');
  $$('#exFilter button').forEach(b=>b.onclick=()=>{exCat=b.dataset.c;paintEx()});
  $('#exGrid').innerHTML=EX.filter(e=>exCat==='Todos'||e[1]===exCat).map(([id,cat,t,d])=>'<div class="card hov ex" style="--c:'+CATC[cat]+'"><span class="tag cat">'+cat+'</span><span class="exn">'+id.toUpperCase()+'</span><h4>'+esc(t)+'</h4><p>'+esc(d)+'</p><div class="actions"><button class="btn sm pri" type="button" data-ex="'+id+'">Ver solución</button></div></div>').join('');
  $$('[data-ex]').forEach(b=>b.onclick=()=>openEx(b.dataset.ex))}
function openEx(id){const e=EX.find(x=>x[0]===id);
  $('#modalBox').innerHTML='<button class="btn sm close" type="button" id="mClose">✕ Cerrar</button><span class="tag" style="--c:'+CATC[e[1]]+'">'+e[1]+'</span><h3 style="margin-top:8px">'+id.toUpperCase()+' · '+esc(e[2])+'</h3><p class="muted">'+esc(e[3])+'</p>'+
    '<h4 style="margin:14px 0 4px">Cómo hacerlo</h4>'+codeBlock(e[4],'sql')+(e[5]?'<div class="out" style="margin:0">'+esc(e[5])+'</div>':'');
  $('#modal').classList.add('on');$('#mClose').focus();$('#mClose').onclick=closeModal}
function closeModal(){$('#modal').classList.remove('on')}
$('#modal').onclick=e=>{if(e.target.id==='modal')closeModal()};
addEventListener('keydown',e=>{if(e.key==='Escape')closeModal()});
paintEx();

const QA=[
 ['¿Qué diferencia hay entre init.ora y spfile?','init.ora es un fichero de texto editable que no se puede incluir en backups de RMAN; spfile es binario, permite arranque remoto y guarda los cambios de ALTER SYSTEM.'],
 ['¿Por qué shutdown abort no hace checkpoint?','Porque corta la instancia de golpe sin esperar a sincronizar nada; por eso necesita recovery (automático, vía SMON) en el siguiente arranque.'],
 ['¿Qué pasa si alguien conecta como SYSOPER en vez de SYSDBA?','Puede arrancar, parar y hacer backup/recovery básico, pero no tiene acceso a los datos de usuario ni puede crear la base de datos.'],
 ['¿Por qué conviene separar SYS y SYSTEM?','SYS es el propietario del diccionario de datos y se reserva para tareas internas; SYSTEM se usa para la administración diaria, limitando el uso de la cuenta más sensible.'],
 ['¿Qué diferencia hay entre SCOPE=MEMORY y SCOPE=SPFILE en un ALTER SYSTEM?','MEMORY aplica el cambio ya pero se pierde al reiniciar; SPFILE lo guarda mas no lo aplica hasta el siguiente arranque. BOTH hace las dos cosas.'],
 ['¿Qué hace el listener exactamente?','Escucha en un host y puerto, recibe las peticiones de conexión de los clientes, valida el servicio solicitado y entrega la sesión a la instancia correspondiente.'],
 ['¿Por qué una conexión local no depende del listener?','Porque puede usar directamente el mecanismo del sistema operativo (bequeath) sin pasar por la capa de red de Oracle Net.'],
 ['¿Qué diferencia hay entre USER_TABLES, ALL_TABLES y DBA_TABLES?','USER_ solo tus tablas; ALL_ las tuyas y las que tienes permiso de usar; DBA_ todas las de la base de datos (requiere privilegios de administrador).'],
 ['¿Por qué las vistas V$ no sirven para auditoría histórica?','Porque son tablas dinámicas en memoria: su contenido desaparece al parar la instancia. Para histórico se usan vistas DBA_HIST_* o DBA_AUDIT_*.'],
 ['¿Para qué sirve TRACEFILE_IDENTIFIER?','Para añadir una cadena reconocible al nombre del fichero de traza de tu sesión y así encontrarlo más fácilmente entre todos los .trc generados.']];
$('#qa').innerHTML=QA.map(([q,a])=>'<details class="qa"><summary>'+esc(q)+'</summary><div class="ans"><p>'+esc(a)+'</p></div></details>').join('');

/* ═════════════ TEST ═════════════ */
const Test=(function(){
  const LV=[[0,'Candidato a DBA','🐣'],[120,'Aprendiz de SQL*Plus','📟'],[300,'Domador del listener','📡'],[600,'Maestro del init.ora','🗂️'],[1000,'Señor de las PDB','🧩'],[1600,'Arquitecto de instancias','🏗️'],[2400,'Ninja del diccionario','🥷'],[3400,'Gurú de Oracle','🧙'],[4800,'DBA Senior','👑'],[6500,'Leyenda del ORACLE_HOME','🐘']];
  const BASE={1:10,2:20,3:30},LVN={1:'Fácil',2:'Medio',3:'Difícil'};
  const hash=s=>{let h=0;for(let i=0;i<s.length;i++)h=(h*31+s.charCodeAt(i))|0;return 'q'+(h>>>0).toString(36)};
  const items=Q.map((q,i)=>({i,id:hash(q[2]+(q[6]||'')),t:q[0],l:q[1],q:q[2],o:q[3],a:q[4],e:q[5],c:q[6]}));
  let S=rd('asgbd-t2.test',null)||{xp:0,best:0,ans:0,ok:0,qs:{},games:0,nick:'',bestNota:0};
  const save=()=>wr('asgbd-t2.test',S);
  const cfg={lv:new Set([1,2,3]),tp:new Set(Object.keys(TOP)),n:10};
  let G=null;const R=$('#testRoot');
  function level(xp){let k=0;for(let i=0;i<LV.length;i++)if(xp>=LV[i][0])k=i;const cur=LV[k],nx=LV[k+1];return{k,name:cur[1],emo:cur[2],pct:nx?(xp-cur[0])/(nx[0]-cur[0])*100:100,next:nx?nx[0]-xp:0}}
  const shuffle=a=>{a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.random()*(i+1)|0;[a[i],a[j]]=[a[j],a[i]]}return a};
  const pool=()=>items.filter(x=>cfg.lv.has(x.l)&&cfg.tp.has(x.t));
  const wrongs=()=>items.filter(x=>{const s=S.qs[x.id];return s&&s[1]>0&&s[2]===0});
  const MODES=[
    ['rapido','⚡','Práctica','Las preguntas que elijas abajo (nivel, bloques y cuántas), con corrección al momento.','#0c9a6a'],
    ['examen','🎯','Modo examen','30 preguntas mezcladas, 25 minutos y la nota al final. Sin pistas.','#1a6fd6'],
    ['super','❤️','Supervivencia','Preguntas sin fin hasta fallar 3. ¿Hasta dónde llega tu racha?','#d93b55'],
    ['flash','⏱️','Relámpago','60 segundos para acertar todas las que puedas. Cada acierto suma 3 s.','#c76a05'],
    ['fallos','🩹','Repasar fallos','Solo las preguntas que has fallado y aún no has acertado.','#6a48d6'],
    ['dificil','🔥','Solo difíciles','Las preguntas de nivel difícil de todos los bloques.','#0e7bbd']];
  function home(){if(G&&G.run)return;clearInterval(G&&G.tick);G=null;const L=level(S.xp),w=wrongs().length,mastered=items.filter(x=>{const s=S.qs[x.id];return s&&s[0]>0}).length;
    R.innerHTML='<div class="t-hero"><div><span class="eyebrow"><i></i> '+items.length+' preguntas · 3 niveles · 7 bloques</span><h1>Test y <span style="color:var(--amber)">preguntas rápidas</span></h1><p class="muted" style="margin:0;max-width:60ch">Acierta seguido para subir la racha 🔥 y el multiplicador de XP. Atajos: teclas <kbd>1</kbd>–<kbd>4</kbd> para responder y <kbd>Intro</kbd> para seguir.</p></div>'+
      '<div class="lvlcard"><div class="badge">'+L.emo+'</div><div><small>Nivel '+(L.k+1)+'</small><br><b>'+L.name+'</b><div class="xp"><i style="width:'+L.pct+'%"></i></div><small>'+S.xp+' XP'+(L.next?' · faltan '+L.next+' para el siguiente':' · ¡nivel máximo!')+'</small></div></div></div>'+
      '<div class="kpis"><div class="kpi"><b>🔥 '+S.best+'</b><span>mejor racha</span></div><div class="kpi"><b>'+(S.ans?Math.round(S.ok/S.ans*100):0)+'%</b><span>aciertos ('+S.ok+'/'+S.ans+')</span></div><div class="kpi"><b>'+mastered+'/'+items.length+'</b><span>preguntas dominadas</span></div><div class="kpi"><b>'+(S.bestNota?S.bestNota.toFixed(1):'—')+'</b><span>mejor nota de examen</span></div></div>'+
      '<div class="modes">'+MODES.map(([id,ic,t,d,c])=>'<button class="mode" type="button" data-m="'+id+'" style="--c:'+c+(id==='fallos'&&!w?';opacity:.5" disabled':'"')+'><div class="mi">'+ic+'</div><h4>'+t+'</h4><p>'+d+'</p><span class="mt">'+(id==='fallos'?w+' pendientes':id==='rapido'?'según la configuración':'EMPEZAR')+' →</span></button>').join('')+'</div>'+
      '<div class="cfg"><span class="lbl">Nivel</span><span class="topics" id="cLv">'+[1,2,3].map(l=>'<button class="tchip" type="button" data-l="'+l+'" aria-pressed="'+cfg.lv.has(l)+'">'+LVN[l]+' <i>'+items.filter(x=>x.l===l).length+'</i></button>').join('')+'</span>'+
      '<span class="lbl" style="margin-left:8px">Preguntas</span><span class="seg" id="cN">'+[10,20,40,0].map(n=>'<button type="button" data-v="'+n+'" aria-pressed="'+(cfg.n===n)+'">'+(n||'Todas')+'</button>').join('')+'</span>'+
      '<span class="lbl" style="width:100%">Bloques <button class="btn sm" type="button" id="cAll" style="margin-left:6px">Todos / ninguno</button> <span style="text-transform:none;letter-spacing:0;font-family:var(--f-b)" id="cCount"></span></span><span class="topics" id="cTp">'+Object.entries(TOP).map(([k,v])=>'<button class="tchip" type="button" data-t="'+k+'" aria-pressed="'+cfg.tp.has(k)+'">'+esc(v)+' <i>'+items.filter(x=>x.t===k).length+'</i></button>').join('')+'</span></div>'+
      '<h3 style="margin:26px 0 4px;font-size:1.2rem">Dominio por bloque</h3><p class="muted" style="margin:0;font-size:.88rem">% de preguntas del bloque que has acertado alguna vez.</p><div class="mastery">'+Object.entries(TOP).map(([k,v],i)=>{const its=items.filter(x=>x.t===k),m=its.filter(x=>{const s=S.qs[x.id];return s&&s[0]>0}).length,p=Math.round(m/its.length*100);
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
      '<div class="qcard" id="qc"><div class="qmeta"><span class="tag lv'+it.l+'">'+LVN[it.l].toUpperCase()+'</span><span class="tag" style="--c:var(--violet)">'+esc(TOP[it.t])+'</span></div><h3>'+esc(it.q)+'</h3>'+(it.c?codeBlock(it.c,'sql'):'')+
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
    Promise.all([claude.use('db'),claude.use('user')]).then(([db,u])=>u.id().then(id=>db.doc('asgbd-t2-ranking/'+id).get().then(snap=>{const prev=snap.exists?snap.data():{};
      return db.doc('asgbd-t2-ranking/'+id).set({nick:S.nick||prev.nick||'Anónimo',score:ok,total:n,final:Math.round(nota*10)/10,best:Math.max(prev.best||0,Math.round(nota*10)/10),streak:Math.max(prev.streak||0,S.best),xp:S.xp,t:Date.now()})}))).catch(()=>{})}
  function ranking(){const box=$('#rank');if(!box)return;if(!window.claude||!claude.use){box.innerHTML='<p class="muted" style="margin:8px">Ranking no disponible.</p>';return}
    Promise.all([claude.use('db'),claude.use('user')]).then(([db,u])=>Promise.all([db.collection('asgbd-t2-ranking').get(),u.id()])).then(([snap,me])=>{
      const rows=snap.docs.map(d=>Object.assign({id:d.id},d.data())).sort((a,b)=>(b.xp||0)-(a.xp||0)).slice(0,15);
      if(!$('#rank'))return;
      $('#rank').innerHTML=rows.length?'<table class="rank"><thead><tr><th>#</th><th>Nombre</th><th>XP</th><th>Mejor nota</th><th>🔥</th></tr></thead><tbody>'+rows.map((r,i)=>'<tr class="'+(r.id===me?'me':'')+'"><td>'+(['🥇','🥈','🥉'][i]||i+1)+'</td><td>'+esc(r.nick||'Anónimo')+'</td><td>'+(r.xp||0)+'</td><td>'+(r.best!=null?r.best:'—')+'</td><td>'+(r.streak||0)+'</td></tr>').join('')+'</tbody></table>':'<p class="muted" style="margin:8px">Aún no hay partidas. ¡Juega una para aparecer!</p>'}).catch(()=>{$('#rank')&&($('#rank').innerHTML='<p class="muted" style="margin:8px">No se pudo cargar el ranking.</p>')})}
  addEventListener('keydown',e=>{if(curView!=='test'||!G||!G.run||e.target.matches('input,select,textarea'))return;
    if(/^[1-5]$/.test(e.key)){const b=$$('.opt',R)[+e.key-1];if(b&&!b.disabled){e.preventDefault();b.click()}}
    else if(e.key==='Enter'){const n=$('#tNext');if(n&&!n.hidden){e.preventDefault();next()}}});
  return{home}})();

route();watchRv();
})();
