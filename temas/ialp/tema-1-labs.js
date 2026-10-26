/* IALP · Tema 1 — laboratorios interactivos */
(function(){
'use strict';
const {$,$$,esc,seg,confetti}=TE;

/* lab: tipo de dato */
function tipo(){const s=$('#tpIn').value.trim();let r;
  const row=(t,py,pse,x)=>'<span class="p">'+esc(s)+'</span>  →  <b>'+t+'</b>\n<span class="d">Python:</span> type() = <span class="y">'+py+'</span>   <span class="d">PSeInt:</span> <span class="y">'+pse+'</span>'+(x?'\n<span class="d"># '+x+'</span>':'');
  if(!s)r='<span class="d"># escribe un dato</span>';
  else if(/^-?\d+$/.test(s))r=row('entero','int','Entero','número sin decimales');
  else if(/^-?\d*\.\d+$/.test(s))r=row('real','float','Real','número con decimales (con punto)');
  else if(/^-?\d+,\d+$/.test(s))r='<span class="e">'+esc(s)+'  →  no es un número</span>\n<span class="d"># el separador decimal es el punto: '+esc(s.replace(',','.'))+'</span>';
  else if(/^(verdadero|falso|true|false)$/i.test(s))r=row('lógico','bool','Logico','solo dos valores posibles');
  else if(/^("[^"]*"|'[^']*')$/.test(s))r=s.length===3?row('carácter (un solo símbolo)','str','Caracter','en Python no hay tipo char: es un str de longitud 1'):row('cadena de texto','str','Cadena','el texto va entre comillas');
  else r='<span class="y">'+esc(s)+'</span>  →  sin comillas Python lo toma por el <b>nombre de una variable</b>\n<span class="d"># si es texto, ponlo entre comillas: "'+esc(s)+'"</span>';
  $('#tpOut').innerHTML=r}
$('#tpIn').oninput=tipo;tipo();

/* lab: prioridad */
const num=v=>typeof v==='number'?String(Math.round(v*1e10)/1e10):v?'True':'False';
function tok(s){const t=[],re=/\s*(\d+(?:\.\d+)?|\*\*|<=|>=|==|!=|<>|[-+*\/%^()<>=]|[A-Za-zÁÉÍÓÚáéíóú]+)/y;let m;re.lastIndex=0;
  while(re.lastIndex<s.length){m=re.exec(s);if(!m){if(/^\s*$/.test(s.slice(re.lastIndex)))break;return null}
    const w=m[1],lw=w.toLowerCase();
    if(/^[a-záéíóú]+$/i.test(w)){
      if(lw==='true'||lw==='verdadero')t.push({k:'v',v:true});else if(lw==='false'||lw==='falso')t.push({k:'v',v:false});
      else if(lw==='and'||lw==='y')t.push({k:'o',v:'and'});else if(lw==='or'||lw==='o')t.push({k:'o',v:'or'});
      else if(lw==='not'||lw==='no')t.push({k:'o',v:'not'});else if(lw==='mod')t.push({k:'o',v:'%'});else return null}
    else if(/^\d/.test(w))t.push({k:'v',v:parseFloat(w)});
    else t.push({k:'o',v:w==='^'?'**':w==='='?'==':w==='<>'?'!=':w})}
  const out=[];for(let i=0;i<t.length;i++){const x=t[i];
    if(x.k==='o'&&x.v==='-'&&(i===0||(t[i-1].k==='o'&&t[i-1].v!==')'))&&t[i+1]&&t[i+1].k==='v'&&typeof t[i+1].v==='number'){out.push({k:'v',v:-t[i+1].v});i++}else out.push(x)}
  return out}
const show=t=>t.map(x=>x.k==='v'?num(x.v):x.v).join(' ').replace(/\( /g,'(').replace(/ \)/g,')');
function stepOnce(t){
  const close=t.findIndex(x=>x.k==='o'&&x.v===')');
  if(close>=0){let open=-1;for(let i=close;i>=0;i--)if(t[i].k==='o'&&t[i].v==='('){open=i;break}
    if(open<0)throw 'Sobra un «)»';
    const inner=t.slice(open+1,close);
    if(!inner.length)throw 'Paréntesis vacíos';
    if(inner.length===1&&inner[0].k==='v')return{t:[...t.slice(0,open),inner[0],...t.slice(close+1)],note:'se quitan los paréntesis'};
    const r=stepOnce(inner);return{t:[...t.slice(0,open+1),...r.t,...t.slice(close)],note:r.note+' · dentro de los paréntesis'}}
  if(t.some(x=>x.k==='o'&&x.v==='('))throw 'Falta un «)»';
  const lv=[['**'],['*','/','%'],['+','-'],['<','>','<=','>=','==','!='],['not'],['and'],['or']];
  for(const L of lv){
    if(L[0]==='not'){let i=-1;t.forEach((x,k)=>{if(x.k==='o'&&x.v==='not'&&t[k+1]&&t[k+1].k==='v')i=k});if(i<0)continue;
      const r=!t[i+1].v;return{t:[...t.slice(0,i),{k:'v',v:r},...t.slice(i+2)],note:'not '+num(t[i+1].v)+' = '+num(r)}}
    const i=t.findIndex(x=>x.k==='o'&&L.includes(x.v));if(i<0)continue;
    const a=t[i-1],b=t[i+1];if(!a||!b||a.k!=='v'||b.k!=='v')throw 'Expresión incompleta cerca de «'+t[i].v+'»';
    const o=t[i].v;let r;
    switch(o){case '**':r=Math.pow(a.v,b.v);break;case '*':r=a.v*b.v;break;case '/':if(b.v===0)throw 'División entre cero';r=a.v/b.v;break;case '%':if(b.v===0)throw 'División entre cero';r=a.v%b.v;break;
      case '+':r=a.v+b.v;break;case '-':r=a.v-b.v;break;case '<':r=a.v<b.v;break;case '>':r=a.v>b.v;break;case '<=':r=a.v<=b.v;break;case '>=':r=a.v>=b.v;break;case '==':r=a.v===b.v;break;case '!=':r=a.v!==b.v;break;
      case 'and':r=a.v&&b.v;break;case 'or':r=a.v||b.v}
    return{t:[...t.slice(0,i-1),{k:'v',v:r},...t.slice(i+2)],note:num(a.v)+' '+o+' '+num(b.v)+' = '+num(r)}}
  return null}
function prio(){const t=tok($('#prIn').value);const out=$('#prOut');
  if(!t||!t.length){out.innerHTML='<span class="e">Solo números, + - * / % ** ( ) < > == != and or not</span>';return}
  let cur=t,lines=['<span class="p">▸</span> '+esc(show(cur))],n=0;
  try{while(n++<40){const r=stepOnce(cur);if(!r)break;cur=r.t;lines.push('<span class="p">▸</span> '+esc(show(cur))+'   <span class="d">← '+esc(r.note)+'</span>')}
    if(cur.length!==1||cur[0].k!=='v')throw 'La expresión no está completa';
    lines.push('\n<span class="y">Resultado: '+esc(num(cur[0].v))+'</span>  <span class="d">('+(typeof cur[0].v==='boolean'?'lógico':Number.isInteger(cur[0].v)?'entero':'real')+')</span>')}
  catch(e){lines.push('<span class="e">'+esc(typeof e==='string'?e:'Expresión no válida')+'</span>')}
  out.innerHTML=lines.join('\n')}
$('#prEj').innerHTML=['2 + 3 * 4','(2 + 3) * 4','10 - 4 - 3','2 ** 3 * 2','5 + 3 * 2 > 10 and not (4 < 2)','7 % 3 + 2 ** 2 * 3','not True or True and False'].map(e=>'<button class="tchip" type="button">'+esc(e)+'</button>').join('');
$$('#prEj .tchip').forEach(b=>b.onclick=()=>{$('#prIn').value=b.textContent;prio()});
$('#prIn').oninput=prio;prio();

/* lab: traza de variables */
const PROG=[
 {fn:'Python · contador',lines:['contador = 0','contador = contador + 1','contador = contador + 1','contador = contador * 3','print(contador)']},
 {fn:'Python · intercambio (ejercicio 9)',lines:['a = 3','b = 8','aux = a','a = b','b = aux','print(a, b)']},
 {fn:'Python · acumulador',lines:['total = 0','precio = 12','total = total + precio','precio = 5','total = total + precio','print(total)']}];
let trP=0,trK=0,trV={},trPrev={},trOut=[];
function trDraw(){const P=PROG[trP];
  $('#trCode .fn').textContent=P.fn;
  $('#trCode pre').innerHTML=P.lines.map((l,i)=>'<div style="padding:2px 8px;border-radius:6px;'+(i===trK-1?'background:#2a3340;outline:1px solid #c084fc':'')+(i>=trK?';opacity:.55':'')+'"><span class="ln">'+(i+1)+'</span>'+esc(l)+'</div>').join('');
  const names=Object.keys(trV);
  $('#trMem').innerHTML=(names.length?names.map(n=>'<div class="cell'+(trV[n]!==trPrev[n]?' on':'')+'" style="width:auto;padding:0 16px;min-height:44px;height:auto"><span style="opacity:.7;margin-right:8px">'+n+'</span> '+esc(trV[n])+'</div>').join(''):'<span class="muted">La memoria está vacía. Pulsa «Siguiente línea».</span>')+(trOut.length?'<div class="term-out" style="flex-basis:100%;margin-top:8px"><span class="p">Salida:</span> '+esc(trOut.join('\n'))+'</div>':'');
  $('#trStep').disabled=trK>=P.lines.length}
function trReset(){trK=0;trV={};trPrev={};trOut=[];trDraw()}
seg('#trSel',v=>{trP=+v;trReset()});
$('#trRst').onclick=trReset;
$('#trStep').onclick=()=>{const P=PROG[trP];if(trK>=P.lines.length)return;const l=P.lines[trK++];trPrev=Object.assign({},trV);
  const names=Object.keys(trV),vals=names.map(n=>trV[n]);
  let m;if((m=l.match(/^print\((.*)\)$/))){trOut.push(String(new Function(...names,'return ['+m[1]+'].join(" ")')(...vals)))}
  else if((m=l.match(/^(\w+) = (.*)$/))){trV[m[1]]=new Function(...names,'return '+m[2])(...vals)}
  trDraw();if(trK>=P.lines.length&&trP===1){confetti(30)}};
trReset();

/* lab: traductor */
const TR=[['Definir x Como Entero','x = 0','Python no declara tipos: la variable se crea al asignarla.'],['x <- 5','x = 5','La flecha de PSeInt es el = de Python.'],['Leer nombre','nombre = input()','Siempre devuelve texto.'],['Leer edad (entero)','edad = int(input())','Hay que convertir con int().'],['Leer nota (real)','nota = float(input())','Con float() para decimales.'],['Escribir "Hola"','print("Hola")',''],['Escribir "Edad: ", edad','print("Edad:", edad)','print separa con un espacio.'],['a <- a + 1','a = a + 1','También se puede escribir a += 1.'],['x ^ 2','x ** 2','La potencia en Python es **.'],['a MOD b','a % b','Resto de la división.'],['a Y b   /   a O b   /   NO a','a and b   /   a or b   /   not a','Los operadores lógicos son palabras en inglés.'],['a <> b','a != b','Distinto.'],['a = b  (comparar)','a == b','En Python comparar lleva dos signos igual.'],['//comentario','# comentario','']];
$('#tdSel').innerHTML=TR.map((r,i)=>'<option value="'+i+'">'+esc(r[0])+'</option>').join('');
function td(){const r=TR[+$('#tdSel').value];$('#tdOut').innerHTML='<span class="d">PSeInt</span>   '+esc(r[0])+'\n<span class="p">Python</span>   <span class="y">'+esc(r[1])+'</span>'+(r[2]?'\n<span class="d"># '+esc(r[2])+'</span>':'')}
$('#tdSel').onchange=td;td();
})();
