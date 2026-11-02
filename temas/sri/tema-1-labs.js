/* SRI · Tema 1 — laboratorios interactivos */
(function(){
'use strict';
const {$,$$,esc,seg}=TE;

/* utilidades IPv4 */
const parseIp=s=>{const m=String(s).trim().match(/^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/);if(!m)return null;const o=m.slice(1).map(Number);if(o.some(x=>x>255))return null;return((o[0]<<24)>>>0)+(o[1]<<16)+(o[2]<<8)+o[3]};
const ipStr=n=>[n>>>24,(n>>>16)&255,(n>>>8)&255,n&255].join('.');
const bin=n=>[n>>>24,(n>>>16)&255,(n>>>8)&255,n&255].map(x=>x.toString(2).padStart(8,'0')).join('.');
const maskOf=p=>p===0?0:((0xFFFFFFFF<<(32-p))>>>0);
const cls=ip=>{const a=ip>>>24;return a<128?'A':a<192?'B':a<224?'C':a<240?'D (multicast)':'E (experimental)'};
const priv=ip=>{const a=ip>>>24,b=(ip>>>16)&255;return a===10||(a===172&&b>=16&&b<=31)||(a===192&&b===168)};
const special=ip=>{const a=ip>>>24,b=(ip>>>16)&255;if(a===127)return'loopback';if(a===169&&b===254)return'enlace local (APIPA)';if(a===0)return'esta red (0.0.0.0/8)';return null};

/* lab: IP ⇄ binario */
function lb(){const s=$('#bnIn').value;const ip=parseIp(s);const o=$('#bnOut');
  if(ip==null){o.innerHTML='<span class="e">'+(s.trim()?'IP no válida: 4 octetos de 0 a 255':'<span class="d"># escribe una IP, por ejemplo 192.168.10.77</span>')+'</span>';return}
  const oct=s.trim().split('.').map(Number);
  o.innerHTML='<span class="d">decimal  </span>'+oct.map(x=>String(x).padStart(8,' ')).join(' ')+'\n<span class="d">binario  </span><span class="y">'+bin(ip).split('.').join(' ')+'</span>\n<span class="d">clase    </span>'+cls(ip)+'\n<span class="d">tipo     </span>'+(special(ip)||(priv(ip)?'privada (RFC 1918)':'pública'))+'\n<span class="d"># cada octeto = 128+64+32+16+8+4+2+1</span>'}
$('#bnIn').oninput=lb;lb();

/* lab: calculadora de red */
function ln(){const ip=parseIp($('#nwIn').value),p=parseInt($('#nwPf').value,10),o=$('#nwOut');
  if(ip==null||!(p>=1&&p<=32)){o.innerHTML='<span class="e">Escribe una IP válida y un prefijo entre 1 y 32</span>';return}
  const m=maskOf(p),net=(ip&m)>>>0,bc=(net|(~m>>>0))>>>0,hosts=p>=31?(p===32?1:2):Math.pow(2,32-p)-2;
  const first=p>=31?net:net+1,last=p>=31?bc:bc-1;
  o.innerHTML='<span class="d">IP         </span>'+bin(ip)+'  '+ipStr(ip)+'\n<span class="d">máscara    </span>'+bin(m)+'  <span class="y">'+ipStr(m)+'</span>\n<span class="d">AND = red  </span>'+bin(net)+'  <span class="y">'+ipStr(net)+'</span>\n<span class="d">broadcast  </span>'+bin(bc)+'  <span class="y">'+ipStr(bc)+'</span>\n<span class="d">hosts      </span><span class="y">'+ipStr(first)+'</span> – <span class="y">'+ipStr(last)+'</span>   (<b>'+hosts.toLocaleString('es-ES')+'</b> útiles = 2^'+(32-p)+' − 2)\n<span class="d">clase/tipo </span>'+cls(ip)+' · '+(special(ip)||(priv(ip)?'privada':'pública'))+
   (ip===net?'\n<span class="e">¡Ojo! esa IP es la dirección de red: no se puede asignar a un host</span>':ip===bc?'\n<span class="e">¡Ojo! esa IP es el broadcast: no se puede asignar a un host</span>':'')}
$('#nwIn').oninput=ln;$('#nwPf').oninput=ln;ln();

/* lab: subredes */
const getN=seg('#sbN',()=>ls());
function ls(){const base=parseIp($('#sbNet').value),p=parseInt($('#sbPf').value,10),n=parseInt(getN(),10),o=$('#sbOut');
  if(base==null||!(p>=1&&p<=30)){o.innerHTML='<span class="e">Escribe una red válida y un prefijo entre 1 y 30</span>';return}
  const s=Math.log2(n),np=p+s;
  if(np>30){o.innerHTML='<span class="e">No caben '+n+' subredes: el prefijo sería /'+np+' (máximo /30)</span>';return}
  const net=(base&maskOf(p))>>>0,size=Math.pow(2,32-np),m=maskOf(np);
  let r='<span class="d">'+ipStr(net)+'/'+p+'  →  '+s+' bit'+(s>1?'s prestados':' prestado')+'  →  /'+np+'  ·  máscara <b>'+ipStr(m)+'</b>  ·  salto '+size+'  ·  '+(size-2)+' hosts/subred</span>\n\n';
  r+='<span class="d">#   subred             primero          último           broadcast</span>\n';
  for(let i=0;i<n;i++){const a=net+i*size,b=a+size-1;
    r+=String(i+1).padEnd(4)+'<span class="y">'+(ipStr(a)+'/'+np).padEnd(19)+'</span>'+ipStr(a+1).padEnd(17)+ipStr(b-1).padEnd(17)+ipStr(b)+'\n'}
  o.innerHTML=r}
['sbNet','sbPf'].forEach(id=>$('#'+id).oninput=ls);ls();

/* lab: IPv6 */
function l6(){const s=$('#v6In').value.trim(),o=$('#v6Out');
  if(!s){o.innerHTML='<span class="d"># escribe una IPv6 completa</span>';return}
  let g;
  if(/^[0-9a-f:]+$/i.test(s)&&!/:::/.test(s)&&(s.match(/::/g)||[]).length<=1){
    if(s.includes('::')){const [a,b]=s.split('::'),A=a?a.split(':'):[],B=b?b.split(':'):[];const miss=8-A.length-B.length;if(miss<1){o.innerHTML='<span class="e">Demasiados grupos</span>';return}g=[...A,...Array(miss).fill('0'),...B]}
    else g=s.split(':');
    if(g.length!==8||g.some(x=>x.length>4||!x.length)){o.innerHTML='<span class="e">Una IPv6 tiene 8 grupos de 1 a 4 dígitos hexadecimales</span>';return}
  }else{o.innerHTML='<span class="e">IPv6 no válida: solo dígitos hexadecimales y «:»</span>';return}
  const full=g.map(x=>x.toLowerCase().padStart(4,'0'));
  const short=g.map(x=>x.toLowerCase().replace(/^0+(?=.)/,''));
  let bs=-1,bl=0;for(let i=0;i<8;){if(short[i]==='0'){let j=i;while(j<8&&short[j]==='0')j++;if(j-i>bl&&j-i>=2){bs=i;bl=j-i}i=j}else i++}
  let comp=bs<0?short.join(':'):(short.slice(0,bs).join(':')+'::'+short.slice(bs+bl).join(':'));
  if(comp===':::')comp='::';
  o.innerHTML='<span class="d">completa     </span>'+full.join(':')+'\n<span class="d">sin ceros   </span>'+short.join(':')+'\n<span class="d">abreviada   </span><span class="y">'+comp+'</span>\n<span class="d"># en una URL: http://['+comp+']/</span>'}
$('#v6In').oninput=l6;l6();

/* lab: simulador DORA */
const DORA=[
 ['DHCPDISCOVER','Cliente → todos (broadcast)','0.0.0.0:68 → 255.255.255.255:67','El cliente no tiene IP ni sabe quién es el servidor: grita «¿hay algún servidor DHCP?». Incluye su MAC (chaddr) y un xid aleatorio.'],
 ['DHCPOFFER','Servidor → cliente','192.168.100.254:67 → cliente:68','El servidor reserva una IP libre del range y la ofrece (yiaddr = 192.168.100.101) con máscara, gateway, DNS y tiempo de concesión.'],
 ['DHCPREQUEST','Cliente → servidor (broadcast)','0.0.0.0:68 → 255.255.255.255:67','El cliente acepta esa oferta (y rechaza las de otros servidores si las hubiera): «quiero la 192.168.100.101».'],
 ['DHCPACK','Servidor → cliente','192.168.100.254:67 → cliente:68','Confirmación con los parámetros definitivos. Se anota en dhcpd.leases y empieza la concesión.']];
let dr=0;
function paintDora(){const o=$('#drOut');
  if(dr===0){o.innerHTML='<span class="d"># pulsa «Siguiente mensaje» para ver cada paso de DORA</span>';return}
  o.innerHTML=DORA.slice(0,dr).map((m,i)=>'<span class="p">'+(i+1)+' · </span><span class="y">'+m[0]+'</span>  <span class="d">'+m[1]+'</span>\n    '+m[2]+'\n    <span class="d">'+m[3]+'</span>').join('\n\n')+(dr===4?'\n\n<span class="y">✓ El cliente ya tiene IP.</span> <span class="d">Renovará a los T1 (50 %) y T2 (87,5 %).</span>':'');
  $('#drNext').textContent=dr===4?'Completado ✓':'Siguiente mensaje →';$('#drNext').disabled=dr===4}
$('#drNext').onclick=()=>{if(dr<4){dr++;paintDora()}};
$('#drReset').onclick=()=>{dr=0;$('#drNext').disabled=false;$('#drNext').textContent='Siguiente mensaje →';paintDora()};
paintDora();

/* lab: tiempos de concesión */
const fmt=s=>{s=Math.round(s);const m=Math.floor(s/60),r=s%60;return s+' s'+(m?' ('+m+' min'+(r?' '+r+' s':'')+')':'')};
function ll(){const L=parseFloat($('#lsIn').value),o=$('#lsOut');
  if(!(L>0)){o.innerHTML='<span class="e">Escribe una duración mayor que 0</span>';return}
  o.innerHTML='<span class="d">Concesión  </span><span class="y">'+fmt(L)+'</span>\n<span class="d">T1 (50 %)  </span>'+fmt(L*.5)+'  → el cliente intenta renovar con su servidor (unicast)\n<span class="d">T2 (87,5%) </span>'+fmt(L*.875)+'  → si no hubo respuesta, pide a cualquier servidor (broadcast)\n<span class="d">Caduca    </span>'+fmt(L)+'  → deja de usar la IP y vuelve a empezar con Discover'}
$('#lsIn').oninput=ll;ll();

/* lab: generador de dhcpd.conf */
function lc(){const g=id=>$('#'+id).value.trim(),o=$('#cfOut');
  const net=parseIp(g('cfNet')),p=parseInt(g('cfPf'),10),a=parseIp(g('cfA')),b=parseIp(g('cfB')),gw=parseIp(g('cfGw'));
  if(net==null||!(p>=8&&p<=30)||a==null||b==null){o.innerHTML='<span class="e">Revisa red, prefijo y rango (IP válidas)</span>';return}
  const m=maskOf(p),n0=(net&m)>>>0,bc=(n0|(~m>>>0))>>>0,warns=[];
  if(net!==n0)warns.push('«'+g('cfNet')+'» no es la dirección de red de /'+p+': sería '+ipStr(n0));
  if(((a&m)>>>0)!==n0||((b&m)>>>0)!==n0)warns.push('el rango no está dentro de la subred '+ipStr(n0)+'/'+p);
  if(a>b)warns.push('el inicio del rango es mayor que el final');
  if(gw==null)warns.push('gateway no válido');else if(((gw&m)>>>0)!==n0)warns.push('el gateway está fuera de la subred');
  else if(gw>=a&&gw<=b)warns.push('el gateway cae dentro del rango: se podría conceder a un cliente');
  const lease=parseInt(g('cfLease'),10)||600;
  const txt='ddns-update-style none;\nauthoritative;\noption domain-name "'+g('cfDom')+'";\noption domain-name-servers '+g('cfDns')+';\ndefault-lease-time '+lease+';\nmax-lease-time '+(lease*12)+';\n\nsubnet '+ipStr(n0)+' netmask '+ipStr(m)+' {\n  option routers '+g('cfGw')+';\n  option subnet-mask '+ipStr(m)+';\n  option broadcast-address '+ipStr(bc)+';\n  range '+g('cfA')+' '+g('cfB')+';\n}';
  o.innerHTML=esc(txt).replace(/(range|option|subnet|authoritative|default-lease-time|max-lease-time)/g,'<span class="y">$1</span>')+(warns.length?'\n\n'+warns.map(w=>'<span class="e">⚠ '+esc(w)+'</span>').join('\n'):'\n\n<span class="d"># ✓ guarda en /etc/dhcp/dhcpd.conf y valida con: sudo dhcpd -t -cf /etc/dhcp/dhcpd.conf</span>')}
['cfNet','cfPf','cfA','cfB','cfGw','cfDns','cfDom','cfLease'].forEach(id=>$('#'+id).oninput=lc);lc();
})();
