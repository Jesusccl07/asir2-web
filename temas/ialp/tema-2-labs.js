/* IALP · Tema 2 — laboratorios interactivos */
(function(){
'use strict';
const {$,$$,esc,confetti}=TE;
function codeLines(el,lines,on){$('pre',el).innerHTML=lines.map((l,i)=>'<div style="padding:2px 8px;border-radius:6px;'+(on.includes(i)?'background:#2a3340;outline:1px solid #c084fc':'opacity:.5')+'">'+esc(l)+'</div>').join('')}

/* elif con la nota */
const NT=['if nota >= 9:','    print("Sobresaliente")','elif nota >= 5:','    print("Aprobado")','else:','    print("Suspenso")'];
function nota(){const s=$('#ntIn').value.trim().replace(',','.'),n=parseFloat(s);
  if(s===''||isNaN(n)){codeLines($('#ntCode'),NT,[]);$('#ntOut').innerHTML='<span class="e">Escribe un número</span>';return}
  const k=n>=9?0:n>=5?1:2;
  codeLines($('#ntCode'),NT,k===0?[0,1]:k===1?[0,2,3]:[0,2,4,5]);
  $('#ntOut').innerHTML='<span class="d"># nota = '+n+' → '+(k===0?'1ª condición cierta':k===1?'1ª falsa, 2ª cierta':'ninguna cierta: else')+'</span>\n<span class="p">'+['Sobresaliente','Aprobado','Suspenso'][k]+'</span>'}
$('#ntIn').oninput=nota;nota();

/* match */
const MT=['match opcion:','    case 1:','        print("Alta")','    case 2:','        print("Baja")','    case _:','        print("Opción incorrecta")'];
function mt(){const v=$('#mtIn').value.trim();const k=v==='1'?1:v==='2'?2:3;
  codeLines($('#mtCode'),MT,k===1?[0,1,2]:k===2?[0,3,4]:[0,5,6]);
  $('#mtOut').innerHTML='<span class="d"># opcion = '+esc(v||'(vacío)')+'</span>\n<span class="p">'+['','Alta','Baja','Opción incorrecta'][k]+'</span>'}
$('#mtIn').oninput=mt;mt();

/* while paso a paso */
let wlC,wlLog,wlN;
function wlReset(){wlC=parseInt($('#wlIni').value);wlN=parseInt($('#wlMax').value);if(isNaN(wlC)||isNaN(wlN)){wlC=0;wlN=5}wlLog=[];wlDraw(true)}
function wlDraw(first){const cond=wlC<wlN;
  $('#wlCells').innerHTML='<div class="cell '+(cond?'on':'stop')+'" style="width:auto;padding:0 16px">contador = '+wlC+'</div><div class="cell '+(cond?'cur':'stop')+'" style="width:auto;padding:0 16px">'+wlC+' &lt; '+wlN+' → '+(cond?'True':'False')+'</div>';
  $('#wlOut').innerHTML=(wlLog.length?wlLog.join('\n')+'\n':'')+(cond?'<span class="d"># la condición es cierta: se ejecutará otra vuelta</span>':'<span class="y"># la condición es falsa: el bucle termina'+(first&&wlLog.length===0?' sin ejecutarse nunca':'')+'</span>');
  $('#wlStep').disabled=!cond}
$('#wlStep').onclick=()=>{if(wlC<wlN&&wlLog.length<60){wlLog.push('<span class="p">print</span>('+wlC+')');wlC++;wlDraw()}};
$('#wlRst').onclick=wlReset;$('#wlIni').oninput=wlReset;$('#wlMax').oninput=wlReset;wlReset();

/* range */
function rg(){const a=parseInt($('#rgA').value),b=parseInt($('#rgB').value),c=parseInt($('#rgC').value);
  if([a,b,c].some(isNaN)||c===0){$('#rgCells').innerHTML='';$('#rgOut').innerHTML='<span class="e">Escribe tres enteros (el paso no puede ser 0)</span>';return}
  const v=[];for(let i=a;c>0?i<b:i>b;i+=c){v.push(i);if(v.length>40)break}
  $('#rgCells').innerHTML=v.map((x,i)=>'<div class="cell on" style="animation:none">'+x+'</div>').join('')||'<span class="muted">range vacío: el bucle no se ejecuta</span>';
  $('#rgOut').innerHTML='<span class="p">Python</span>  for i in range('+a+', '+b+', '+c+')\n<span class="p">PSeInt</span>  Para i <- '+a+' Hasta '+(c>0?b-1:b+1)+' Con Paso '+c+' Hacer\n<span class="d"># '+v.length+' vueltas'+(v.length>40?' (se muestran 40)':'')+'</span>'}
['#rgA','#rgB','#rgC'].forEach(s=>$(s).oninput=rg);rg();

/* primo */
function prm(){const n=parseInt($('#prmIn').value);
  if(isNaN(n)||n>100000){$('#prmCells').innerHTML='';$('#prmOut').innerHTML='<span class="e">Escribe un entero entre 0 y 100000</span>';return}
  if(n<2){$('#prmCells').innerHTML='';$('#prmOut').innerHTML='<span class="y">'+n+' no es primo</span> <span class="d"># los primos empiezan en 2</span>';return}
  const t=[];let div=null;for(let i=2;i*i<=n;i++){t.push(i);if(n%i===0){div=i;break}}
  $('#prmCells').innerHTML=t.slice(0,30).map(i=>'<div class="cell '+(n%i===0?'stop':'on')+'" style="animation:none" title="'+n+' % '+i+' = '+(n%i)+'">'+i+'</div>').join('');
  $('#prmOut').innerHTML=(t.length?'<span class="d"># probados los divisores: '+t.slice(0,30).join(', ')+(t.length>30?'…':'')+' (hasta √'+n+')</span>\n':'<span class="d"># no hace falta probar ningún divisor</span>\n')+(div?'<span class="e">'+n+' % '+div+' = 0 → NO es primo</span>':'<span class="p">Ningún divisor lo divide → '+n+' ES primo</span>')}
$('#prmIn').oninput=prm;prm();

/* mientras / para / repetir */
function cp(){const n=parseInt($('#cpN').value);if(isNaN(n)||Math.abs(n)>50){$('#cpOut').innerHTML='<span class="e">Escribe un entero entre -50 y 50</span>';return}
  const m=[];for(let i=n;i>=1;i--)m.push(i);const r=[];let i=n;do{r.push(i);i--}while(!(i<1));
  const f=a=>a.length?a.join(' '):'(nada)';
  $('#cpOut').innerHTML='<span class="p">Mientras</span> i >= 1      → '+m.length+' vueltas: '+f(m)+'\n<span class="p">Para</span>     i = n..1    → '+m.length+' vueltas: '+f(m)+'\n<span class="y">Repetir</span>  hasta i < 1 → '+r.length+' vueltas: '+f(r)}
$('#cpN').oninput=cp;cp();
})();
