/* Calendario de exámenes de la portada. Lee y guarda en 'examenes.data.v1', el mismo almacén que usa
   la herramienta «Exámenes», así que lo que apuntes en uno aparece en el otro. */
(function(){
  var KEY='examenes.data.v1',DIRTY='examenes.dirty';
  var SUBJ={
    SAD:{c:'#FF3B30',t:'Óscar Gómez García'},IPEI:{c:'#FF9500',t:'Gema Abad Rubio'},IALP:{c:'#AF52DE',t:'Alfonso José Padilla Navarrete'},
    PIMA:{c:'#FF2D78',t:'Manuel Peña Villanueva'},ASO:{c:'#007AFF',t:'Alberto Montoro Gavilán'},SRI:{c:'#28B850',t:'Raúl'},
    IAW:{c:'#00A8CC',t:'Raúl'},ASGB:{c:'#E09B00',t:'Javier García-Retamero Redondo'}};
  var ORDER=['SAD','IPEI','IALP','PIMA','ASO','SRI','IAW','ASGB'];
  var TYPES={examen:'Examen',practica:'Práctica',entrega:'Entrega',recuperacion:'Recuperación'};
  var MONTHS=['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'];
  var WD=['L','M','X','J','V','S','D'];
  var root=document.getElementById('examCal');if(!root)return;

  function esc(s){return String(s==null?'':s).replace(/[&<>"]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}
  function pad(n){return n<10?'0'+n:''+n}
  function ymd(d){return d.getFullYear()+'-'+pad(d.getMonth()+1)+'-'+pad(d.getDate())}
  function parse(s){var p=s.split('-');return new Date(+p[0],+p[1]-1,+p[2])}
  function uid(){return Date.now().toString(36)+Math.random().toString(36).slice(2,8)}
  function load(){try{return JSON.parse(localStorage.getItem(KEY)||'{"exams":[]}').exams||[]}catch(e){return[]}}
  var exams=load();
  function save(){try{localStorage.setItem(KEY,JSON.stringify({version:1,exams:exams}));localStorage.setItem(DIRTY,'1')}catch(e){}}
  function visible(){return exams.filter(function(e){return !e.deleted&&e.date&&SUBJ[e.subject]})}
  function key(e){return e.date+' '+(e.time||'00:00')}

  var today=ymd(new Date()),cur=new Date();cur.setDate(1);var sel=null;

  function when(date){
    var d=Math.round((parse(date)-parse(today))/864e5);
    return d===0?'Hoy':d===1?'Mañana':d>1?'En '+d+' días':d===-1?'Ayer':'Hace '+(-d)+' días';
  }
  function fmt(date){var d=parse(date);return d.getDate()+' '+MONTHS[d.getMonth()].slice(0,3)}

  function draw(){
    var vis=visible(),by={};vis.forEach(function(e){(by[e.date]=by[e.date]||[]).push(e)});
    var y=cur.getFullYear(),m=cur.getMonth(),first=new Date(y,m,1),off=(first.getDay()+6)%7,days=new Date(y,m+1,0).getDate();
    var cells='';for(var i=0;i<off;i++)cells+='<i class="xc ghost"></i>';
    for(var d=1;d<=days;d++){
      var ds=y+'-'+pad(m+1)+'-'+pad(d),list=by[ds]||[];
      cells+='<button type="button" class="xc'+(ds===today?' today':'')+(ds===sel?' sel':'')+(list.length?' has':'')+'" data-d="'+ds+'" aria-label="'+d+' de '+MONTHS[m]+(list.length?', '+list.length+' examen(es)':'')+'"><b>'+d+'</b>'+
        (list.length?'<span class="dots">'+list.slice(0,3).map(function(e){return '<u style="background:'+SUBJ[e.subject].c+(e.done?';opacity:.35':'')+'"></u>'}).join('')+'</span>':'')+'</button>';
    }
    var shown=sel?(by[sel]||[]).slice().sort(function(a,b){return key(a)<key(b)?-1:1}):
      vis.filter(function(e){return !e.done&&e.date>=today}).sort(function(a,b){return key(a)<key(b)?-1:1}).slice(0,6);
    var title=sel?'Día '+fmt(sel):'Próximos exámenes';
    var items=shown.map(function(e){
      var s=SUBJ[e.subject];
      return '<button type="button" class="xi'+(e.done?' done':'')+'" data-id="'+esc(e.id)+'" style="--c:'+s.c+'"><span class="xs">'+e.subject+'</span>'+
        '<span class="xt"><b>'+esc(TYPES[e.type]||'Examen')+' · '+fmt(e.date)+(e.time?' · '+esc(e.time):'')+'</b>'+(e.topics?'<small>'+esc(e.topics)+'</small>':'<small>'+esc(s.t)+'</small>')+'</span>'+
        '<span class="xw">'+(e.done?(e.grade?'Nota '+esc(e.grade):'Hecho'):when(e.date))+'</span></button>';
    }).join('');
    if(!items)items='<div class="xe">'+(sel?'No hay nada apuntado este día.':'No tienes exámenes pendientes. ¡Apunta el próximo!')+'</div>';
    root.innerHTML=
      '<div class="xhead"><div><h2>Calendario de exámenes</h2><p>'+vis.filter(function(e){return !e.done&&e.date>=today}).length+' pendientes</p></div>'+
      '<button type="button" class="xnew" id="xNew"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.8" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg>Nuevo examen</button></div>'+
      '<div class="xbody"><div class="xcal"><div class="xnav"><button type="button" id="xPrev" aria-label="Mes anterior">‹</button><b>'+MONTHS[m]+' '+y+'</b><button type="button" id="xNext" aria-label="Mes siguiente">›</button><button type="button" id="xToday" class="xhoy">Hoy</button></div>'+
      '<div class="xwd">'+WD.map(function(w){return '<span>'+w+'</span>'}).join('')+'</div><div class="xgrid">'+cells+'</div>'+
      '<div class="xleg">'+ORDER.map(function(s){return '<span><i style="background:'+SUBJ[s].c+'"></i>'+s+'</span>'}).join('')+'</div></div>'+
      '<div class="xlist"><h3>'+title+(sel?' <button type="button" class="xclr" id="xClr">Ver próximos</button>':'')+'</h3>'+items+'</div></div>';
    document.getElementById('xPrev').onclick=function(){cur.setMonth(cur.getMonth()-1);draw()};
    document.getElementById('xNext').onclick=function(){cur.setMonth(cur.getMonth()+1);draw()};
    document.getElementById('xToday').onclick=function(){cur=new Date();cur.setDate(1);sel=null;draw()};
    document.getElementById('xNew').onclick=function(){openForm({date:sel||''})};
    var clr=document.getElementById('xClr');if(clr)clr.onclick=function(){sel=null;draw()};
    [].forEach.call(root.querySelectorAll('.xc[data-d]'),function(b){b.onclick=function(){
      var d=b.getAttribute('data-d');if((by[d]||[]).length){sel=sel===d?null:d;draw()}else openForm({date:d})}});
    [].forEach.call(root.querySelectorAll('.xi'),function(b){b.onclick=function(){openForm({id:b.getAttribute('data-id')})}});
  }

  /* ── formulario (ventana) ── */
  var modal=document.createElement('div');modal.className='xmodal';modal.setAttribute('aria-hidden','true');
  modal.innerHTML='<div class="xbox" role="dialog" aria-modal="true" aria-labelledby="xTitle"></div>';
  document.body.appendChild(modal);
  var box=modal.firstChild,F=null;

  function openForm(o){
    if(o.id){var e=exams.filter(function(x){return x.id===o.id})[0];if(!e)return;F=JSON.parse(JSON.stringify(e));F._edit=true}
    else F={id:uid(),subject:null,date:o.date||'',time:'',teacher:'',type:'examen',topics:'',notes:'',grade:'',done:false,createdAt:Date.now(),_edit:false};
    form();modal.classList.add('on');modal.setAttribute('aria-hidden','false');document.body.style.overflow='hidden';
  }
  function close(){modal.classList.remove('on');modal.setAttribute('aria-hidden','true');document.body.style.overflow='';F=null}
  function form(){
    box.innerHTML='<button type="button" class="xclose" id="fX" aria-label="Cerrar">✕</button><h3 id="xTitle">'+(F._edit?'Editar examen':'Nuevo examen')+'</h3>'+
      '<label class="fl">Asignatura</label><div class="fsub">'+ORDER.map(function(s){return '<button type="button" data-s="'+s+'" class="'+(F.subject===s?'on':'')+'" style="--c:'+SUBJ[s].c+'"><i></i>'+s+'</button>'}).join('')+'</div>'+
      '<div class="f2"><div><label class="fl" for="fD">Fecha</label><input type="date" id="fD" value="'+F.date+'"></div><div><label class="fl" for="fT">Hora</label><input type="time" id="fT" value="'+F.time+'"></div></div>'+
      '<label class="fl">Tipo</label><div class="fseg">'+Object.keys(TYPES).map(function(k){return '<button type="button" data-t="'+k+'" class="'+(F.type===k?'on':'')+'">'+TYPES[k]+'</button>'}).join('')+'</div>'+
      '<label class="fl" for="fP">Temas / contenido</label><textarea id="fP" maxlength="1000" placeholder="Ej.: Temas 3 y 4, ejercicios de subredes…">'+esc(F.topics)+'</textarea>'+
      (F._edit?'<div class="f2"><div><label class="fl" for="fG">Nota (0-10)</label><input type="text" id="fG" inputmode="decimal" value="'+esc(F.grade)+'"></div><label class="ftog"><input type="checkbox" id="fH"'+(F.done?' checked':'')+'><span>Hecho</span></label></div>':'')+
      '<div class="fact"><button type="button" class="fsave" id="fS">'+(F._edit?'Guardar cambios':'Guardar examen')+'</button>'+(F._edit?'<button type="button" class="fdel" id="fDel">Eliminar</button>':'')+'</div><p class="ferr" id="fE" role="alert"></p>';
    document.getElementById('fX').onclick=close;
    [].forEach.call(box.querySelectorAll('.fsub button'),function(b){b.onclick=function(){F.subject=b.getAttribute('data-s');F.teacher=SUBJ[F.subject].t;keep();form()}});
    [].forEach.call(box.querySelectorAll('.fseg button'),function(b){b.onclick=function(){F.type=b.getAttribute('data-t');keep();form()}});
    document.getElementById('fS').onclick=submit;
    var del=document.getElementById('fDel');if(del)del.onclick=function(){
      if(!confirm('¿Eliminar este examen?'))return;
      var e=exams.filter(function(x){return x.id===F.id})[0];if(e){e.deleted=true;e.updatedAt=Date.now()}
      save();close();draw()};
  }
  function keep(){ /* conserva lo escrito al redibujar */
    var g=function(id){return document.getElementById(id)};
    if(g('fD'))F.date=g('fD').value;if(g('fT'))F.time=g('fT').value;if(g('fP'))F.topics=g('fP').value;
    if(g('fG'))F.grade=g('fG').value;if(g('fH'))F.done=g('fH').checked;
  }
  function submit(){
    keep();var err=document.getElementById('fE');
    if(!F.subject){err.textContent='Elige una asignatura.';return}
    if(!F.date){err.textContent='Elige la fecha del examen.';return}
    var e=JSON.parse(JSON.stringify(F));delete e._edit;e.teacher=e.teacher||SUBJ[e.subject].t;e.updatedAt=Date.now();
    var i=-1;exams.forEach(function(x,k){if(x.id===e.id)i=k});
    if(i>=0)exams[i]=Object.assign({},exams[i],e);else exams.push(e);
    save();var d=parse(e.date);cur=new Date(d.getFullYear(),d.getMonth(),1);sel=null;close();draw();
  }
  modal.addEventListener('click',function(e){if(e.target===modal)close()});
  document.addEventListener('keydown',function(e){if(e.key==='Escape'&&F)close()});
  /* si cambian los exámenes desde otra pestaña (p. ej. la herramienta «Exámenes»), se refleja aquí */
  window.addEventListener('storage',function(e){if(e.key===KEY){exams=load();draw()}});
  window.addEventListener('pageshow',function(e){if(e.persisted){exams=load();draw()}});
  draw();
})();
