/* IALP · Tema 3 — laboratorios interactivos */
(function(){
'use strict';
const {$,$$,esc,seg,confetti}=TE;
function lines(el,arr,on){$('pre',el).innerHTML=arr.map((l,i)=>'<div style="padding:2px 8px;border-radius:6px;'+(on.includes(i)?'background:#2a3340;outline:1px solid #c084fc':'')+'">'+esc(l)+'</div>').join('')}

/* valor / referencia */
const PAR={
 num:{code:['def cambiar(n):','    n = n + 100','    print("dentro:", n)','','x = 5','cambiar(x)','print("fuera:", x)'],out:'dentro: 105\nfuera: 5',note:'Los enteros son inmutables: n es una copia y x no cambia (como el paso por valor).'},
 txt:{code:['def cambiar(t):','    t = t + "!!!"','    print("dentro:", t)','','x = "hola"','cambiar(x)','print("fuera:", x)'],out:'dentro: hola!!!\nfuera: hola',note:'Los textos tampoco se modifican «en su sitio»: se crea otro texto local.'},
 lst:{code:['def cambiar(l):','    l.append(100)','    print("dentro:", l)','','x = [1, 2, 3]','cambiar(x)','print("fuera:", x)'],out:'dentro: [1, 2, 3, 100]\nfuera: [1, 2, 3, 100]',note:'La lista se modifica directamente: ¡cambia fuera! Así se simula el paso por referencia.'}};
function par(k){const p=PAR[k];lines($('#parCode'),p.code,[]);$('#parOut').innerHTML='<span class="p">$</span> python ejemplo.py\n'+esc(p.out)+'\n<span class="d"># '+esc(p.note)+'</span>'}
const parV=seg('#parSel',par);par('num');

/* por defecto */
function df(){const n=$('#dfN').value.trim()||'(sin nombre)',i=$('#dfI').value.trim();
  $('#dfOut').innerHTML='<span class="p">&gt;&gt;</span> saludar("'+esc(n)+'"'+(i?', "'+esc(i)+'"':'')+')\nHola '+esc(n)+'\nIdioma: <span class="y">'+esc(i||'español')+'</span>'+(i?'':'   <span class="d"># valor por defecto</span>')}
$('#dfN').oninput=df;$('#dfI').oninput=df;df();

/* ámbito */
const AMB={
 con:{code:['contador = 0','','def incrementar():','    global contador','    contador = contador + 1','','incrementar()','print(contador)'],out:'1',note:'Con global, la función modifica la variable de fuera.',hl:[3,4]},
 sin:{code:['contador = 0','','def incrementar():','    contador = contador + 1','','incrementar()','print(contador)'],out:'UnboundLocalError: local variable \'contador\' referenced before assignment',note:'Sin global, Python cree que contador es local, y la usa antes de darle valor.',hl:[3],err:true}};
function amb(k){const a=AMB[k];lines($('#ambCode'),a.code,a.hl);$('#ambOut').innerHTML='<span class="p">$</span> python ambito.py\n<span class="'+(a.err?'e':'y')+'">'+esc(a.out)+'</span>\n<span class="d"># '+esc(a.note)+'</span>'}
seg('#ambSel',amb);amb('con');

/* librerías */
const LB=[['math.sqrt(144)',()=>Math.sqrt(144),'import math'],['math.pow(2, 10)',()=>Math.pow(2,10),'import math'],['math.pi',()=>Math.PI,'import math'],['random.randint(1, 6)',()=>1+Math.floor(Math.random()*6),'import random'],['random.random()',()=>Math.random(),'import random'],['random.choice(["piedra", "papel", "tijera"])',()=>'"'+['piedra','papel','tijera'][Math.floor(Math.random()*3)]+'"','import random'],['statistics.mean([7, 9, 5, 10])',()=>7.75,'import statistics'],['statistics.median([7, 9, 5, 10])',()=>8.0,'import statistics'],['datetime.now()',()=>{const d=new Date(),p=n=>String(n).padStart(2,'0');return d.getFullYear()+'-'+p(d.getMonth()+1)+'-'+p(d.getDate())+' '+p(d.getHours())+':'+p(d.getMinutes())+':'+p(d.getSeconds())},'from datetime import datetime'],['string.digits',()=>'"0123456789"','import string'],['len("programación")',()=>12,'(integrada, no necesita import)'],['round(3.14159, 2)',()=>3.14,'(integrada, no necesita import)']];
$('#lbSel').innerHTML=LB.map((l,i)=>'<option value="'+i+'">'+esc(l[0])+'</option>').join('');
function lb(){const l=LB[+$('#lbSel').value];$('#lbOut').innerHTML='<span class="d">'+esc(l[2])+'</span>\n<span class="p">&gt;&gt;</span> '+esc(l[0])+'\n<span class="y">'+esc(String(l[1]()))+'</span>'}
$('#lbRun').onclick=lb;$('#lbSel').onchange=lb;lb();

/* depurador */
const DB=['total = 0','for i in range(1, 4):','    total = total + i','print(total)'];
const ST=[{l:0,v:{}},{l:1,v:{total:0}}];(function(){let t=0;for(let i=1;i<=3;i++){ST.push({l:2,v:{total:t,i}});t+=i;ST.push({l:1,v:{total:t,i}})}ST.push({l:3,v:{total:t,i:3}});ST.push({l:-1,v:{total:t,i:3},out:String(t)})})();
let dbK=0,dbBp=new Set();
function dbDraw(){const s=ST[dbK];
  $('#dbCode pre').innerHTML=DB.map((l,i)=>'<div style="padding:2px 8px;border-radius:6px;'+(s.l===i?'background:#2a3340;outline:1px solid #c084fc':'')+'"><span class="ln" data-bp="'+i+'" style="cursor:pointer;color:'+(dbBp.has(i)?'#fb7185':'')+'" title="Punto de interrupción">'+(dbBp.has(i)?'●':i+1)+'</span>'+esc(l)+'</div>').join('');
  $$('#dbCode [data-bp]').forEach(e=>e.onclick=()=>{const i=+e.dataset.bp;dbBp.has(i)?dbBp.delete(i):dbBp.add(i);dbDraw()});
  const names=Object.keys(s.v);
  $('#dbVars').innerHTML=names.length?names.map(n=>'<div class="cell on" style="width:auto;padding:0 16px;min-height:44px;height:auto;animation:none"><span style="opacity:.7;margin-right:8px">'+n+'</span> '+s.v[n]+'</div>').join(''):'<span class="muted">Variables: todavía ninguna</span>';
  $('#dbOut').innerHTML=s.l===-1?'<span class="p">Salida:</span> '+s.out+'\n<span class="d"># programa terminado</span>':s.l===0&&!dbK?'<span class="d"># parado antes de la primera línea</span>':'<span class="d"># parado en la línea '+(s.l+1)+'</span>';
  $('#dbStep').disabled=$('#dbCont').disabled=s.l===-1;
  if(s.l===-1&&!dbDraw.done){dbDraw.done=1;confetti(20)}}
function dbRst(){dbK=0;dbDraw.done=0;dbDraw()}
$('#dbStep').onclick=()=>{if(dbK<ST.length-1){dbK++;dbDraw()}};
$('#dbCont').onclick=()=>{do{dbK++}while(dbK<ST.length-1&&!dbBp.has(ST[dbK].l));dbDraw()};
$('#dbRst').onclick=dbRst;dbRst();
})();
