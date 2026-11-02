/* SRI · Tema 1 — contenido: redes TCP/IP, direccionamiento IP y DHCP (UT1) */
(function(){
const H=window.H;
window.TEMA={
key:'sri1',rank:'sri1-ranking',
allDone:'🏆 ¡Servidor DHCP montado y ejercicios hechos!',
typer:[['p','$ ','sudo systemctl status isc-dhcp-server'],['o','','Active: active (running)'],
  ['p','$ ','ip -4 a show enp0s3'],['o','','inet 192.168.100.101/24 scope global dynamic'],
  ['p','C:\\> ','ipconfig /all'],['o','','Servidor DHCP . . . : 192.168.50.1'],
  ['c','','# DORA: Discover → Offer → Request → Ack'],['c','','# ¿Listo para el test? 🔥']],
levels:[[0,'Cable suelto','🔌'],[120,'Aprendiz de IP','🌱'],[300,'Maestro de octetos','🔢'],[600,'Cortador de subredes','✂️'],[1000,'Dominador de máscaras','🎭'],[1600,'Cliente DHCP','💻'],[2400,'Operador de concesiones','📜'],[3400,'Guardián del snooping','🛡️'],[4800,'Arquitecto de redes','🏗️'],[6500,'Leyenda del DHCP','🌐']],
where:{srv:['w-vb','Servidor','Terminal'],cli:['w-win','Cliente','Terminal'],vbx:['w-gh','VirtualBox','Notas'],wsv:['w-vs','Win Server','PowerShell'],doc:['w-xu','Informe','Notas']},

sections:[
/* 1 */{id:'t-redes',title:'Redes y servicios',short:'Redes y servicios',sub:'Qué es una red, qué es un servicio y cómo se comunican los equipos.',c:'#13893f',html:
 H.p('Una <b>red</b> es la infraestructura de comunicación que permite intercambiar y distribuir información. Un <b>servicio</b> es una funcionalidad concreta (DNS, web, DHCP…) que resuelve un problema usando la red y un <b>protocolo estándar</b>. <b>Internet</b> es la red de redes: muchas redes interconectadas.')+
 H.cards([['📡','Red','Infraestructura que permite intercambiar y distribuir información entre equipos.','acc'],['🛎️','Servicio','Funcionalidad concreta que resuelve un problema usando la red y un protocolo estándar.','sky'],['🌍','Internet','La red de redes: permite comunicar y transferir ficheros entre cualquier par de equipos.','amber']])+
 H.h3('Tres modelos de comunicación')+
 H.dia('<g><rect x="20" y="20" width="230" height="170" rx="16" fill="var(--acc-soft)" stroke="var(--acc)" stroke-width="2"/><text x="135" y="48" text-anchor="middle" class="svg-t" fill="var(--acc)" font-size="14">CLIENTE / SERVIDOR</text><rect x="95" y="62" width="80" height="34" rx="8" fill="var(--panel)" stroke="var(--acc)"/><text x="135" y="84" text-anchor="middle" class="svg-m" fill="var(--ink)" font-size="12">Servidor</text><rect x="36" y="140" width="64" height="30" rx="8" fill="var(--panel)" stroke="var(--muted)"/><text x="68" y="160" text-anchor="middle" class="svg-m" fill="var(--ink)" font-size="11">Cliente</text><rect x="170" y="140" width="64" height="30" rx="8" fill="var(--panel)" stroke="var(--muted)"/><text x="202" y="160" text-anchor="middle" class="svg-m" fill="var(--ink)" font-size="11">Cliente</text><path d="M68 138L110 98M202 138L160 98" stroke="var(--acc)" stroke-width="2.5" class="flow"/></g>'+
  '<g><rect x="265" y="20" width="230" height="170" rx="16" fill="var(--sky-soft)" stroke="var(--sky)" stroke-width="2"/><text x="380" y="48" text-anchor="middle" class="svg-t" fill="var(--sky)" font-size="14">P2P (ENTRE PARES)</text><circle cx="320" cy="95" r="22" fill="var(--panel)" stroke="var(--sky)"/><circle cx="440" cy="95" r="22" fill="var(--panel)" stroke="var(--sky)"/><circle cx="320" cy="160" r="22" fill="var(--panel)" stroke="var(--sky)"/><circle cx="440" cy="160" r="22" fill="var(--panel)" stroke="var(--sky)"/><path d="M342 95H418M320 117V138M440 117V138M342 160H418M338 112L424 146M422 112L336 146" stroke="var(--sky)" stroke-width="2" class="flow"/></g>'+
  '<g><rect x="510" y="20" width="230" height="170" rx="16" fill="var(--amber-soft)" stroke="var(--amber)" stroke-width="2"/><text x="625" y="48" text-anchor="middle" class="svg-t" fill="var(--amber)" font-size="14">HÍBRIDO</text><rect x="585" y="62" width="80" height="34" rx="8" fill="var(--panel)" stroke="var(--amber)"/><text x="625" y="84" text-anchor="middle" class="svg-m" fill="var(--ink)" font-size="12">Servidor</text><circle cx="560" cy="160" r="22" fill="var(--panel)" stroke="var(--amber)"/><circle cx="690" cy="160" r="22" fill="var(--panel)" stroke="var(--amber)"/><path d="M570 140L600 98M680 140L650 98" stroke="var(--amber)" stroke-width="2" stroke-dasharray="5 4"/><path d="M584 160H666" stroke="var(--amber)" stroke-width="2.5" class="flow"/></g>',
  'En cliente/servidor uno pide y otro presta el servicio; en P2P todos son iguales; en el híbrido el servidor solo pone en contacto a los clientes.','0 0 760 210','Tres modelos de comunicación')+
 H.tbl(['Modelo','Cómo funciona','Ejemplo'],[['<b>Cliente/servidor</b>','Un proceso pide y otro presta el servicio. El más extendido.','Web, correo, DHCP, DNS'],['<b>P2P (pares)</b>','Todos los nodos son clientes y servidores a la vez; no hay elemento central.','BitTorrent'],['<b>Híbrido</b>','El servidor pone en contacto a los clientes y luego ellos se comunican entre sí.','Mensajería, videollamada']],'acc')+
 H.h3('¿De qué se compone una red?')+
 H.tf([['Ordenadores','servidores y clientes',1],['Interconexión','switch y router',1],['Protocolo','por ejemplo TCP/IP',1],['Medio','cable o inalámbrico',1],['Software','SO y aplicaciones',1]])+
 H.note('tip','La red del aula','El router tiene una IP pública hacia Internet (WAN) y una IP privada hacia la red local (LAN, por ejemplo 192.168.1.1/24). Detrás hay un switch al que se conectan servidor, PCs e impresora; cada dispositivo tiene su interfaz y su IP.')},

/* 2 */{id:'t-tcpip',title:'TCP/IP y modelo OSI',short:'TCP/IP y OSI',sub:'La familia de protocolos de Internet y sus capas.',c:'#1a6fd6',html:
 H.p('<b>TCP/IP</b> es la familia de protocolos de Internet. Se demostró en 1972 por el Departamento de Defensa de EE. UU. sobre <b>ARPAnet</b> y se diseñó para resistir situaciones extremas. <b>IP</b> es del nivel de red y <b>TCP</b> del nivel de transporte.')+
 H.dia('<defs><marker id="arT" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0L10 5L0 10z" fill="var(--muted)"/></marker></defs>'+
  [['Aplicación','HTTP · FTP · SMTP · SSH · DHCP · DNS','rose'],['Transporte','TCP · UDP','amber'],['Red (Internet)','IP · ARP · ICMP','sky'],['Acceso a red','Enlace de datos + físico','acc']].map(([t,s,c],i)=>'<g'+(i===2?' class="pulse"':'')+'><rect x="40" y="'+(14+i*50)+'" width="360" height="42" rx="10" fill="var(--'+c+'-soft)" stroke="var(--'+c+')" stroke-width="'+(i===2?2.5:1.5)+'"/><text x="62" y="'+(40+i*50)+'" class="svg-t" fill="var(--'+c+')" font-size="14">'+t+'</text><text x="390" y="'+(40+i*50)+'" text-anchor="end" class="svg-m" fill="var(--ink)" font-size="11.5">'+s+'</text></g>').join('')+
  [['7 Aplicación','rose'],['6 Presentación','rose'],['5 Sesión','rose'],['4 Transporte','amber'],['3 Red','sky'],['2 Enlace de datos','acc'],['1 Físico','acc']].map(([t,c],i)=>'<rect x="470" y="'+(10+i*29)+'" width="230" height="25" rx="7" fill="var(--'+c+'-soft)" stroke="var(--'+c+')"/><text x="585" y="'+(27+i*29)+'" text-anchor="middle" class="svg-m" fill="var(--ink)" font-size="12">'+t+'</text>').join('')+
  '<text x="585" y="224" text-anchor="middle" class="svg-t" fill="var(--muted)" font-size="12">Modelo OSI (7 niveles)</text><text x="220" y="224" text-anchor="middle" class="svg-t" fill="var(--muted)" font-size="12">Modelo TCP/IP (4 niveles)</text><path d="M404 100H466" stroke="var(--muted)" stroke-width="2.5" class="flow" marker-end="url(#arT)"/>',
  'TCP/IP agrupa aplicación, presentación y sesión en un solo nivel; enlace de datos y físico forman el acceso a red.','0 0 760 236','Modelo TCP/IP frente a modelo OSI')+
 H.cards([['🔌','TCP (transporte)','Orientado a conexión: fiable, ordena y confirma los datos. Web, correo, SSH.','amber'],['⚡','UDP (transporte)','Sin conexión: rápido, sin confirmaciones. DHCP, DNS, streaming.','rose'],['🧭','IP (red)','Direcciona y encamina los paquetes entre redes distintas.','sky']])+
 H.posts([['','Dato clave','DHCP viaja sobre <b>UDP</b>: cliente puerto 68, servidor puerto 67.'],['blue','OSI describe, TCP/IP funciona','OSI describe la comunicación en 7 niveles; TCP/IP es el modelo que realmente se usa en Internet.'],['pink','Error típico','Confundir «nivel de red» (IP) con «nivel de transporte» (TCP/UDP).']])},

/* 3 */{id:'t-ipv4',title:'La dirección IPv4',short:'Dirección IPv4',sub:'32 bits en 4 octetos: la identidad de una interfaz.',c:'#c76a05',html:
 H.p('Una dirección IPv4 tiene <b>32 bits</b> repartidos en <b>4 octetos</b>, cada uno de 0 a 255. En total hay 2<sup>32</sup> = <b>4.294.967.296</b> direcciones. Identifica una <b>interfaz</b>, no una máquina: un portátil con Ethernet y WiFi tiene dos IP.')+
 H.dia('<text x="380" y="34" text-anchor="middle" class="svg-t" fill="var(--ink)" font-size="15">216.128.74.52</text>'+
  [['11011000','216','rose'],['10000000','128','amber'],['01001010','74','sky'],['00110100','52','acc']].map(([b,d,c],i)=>'<g><rect x="'+(30+i*178)+'" y="52" width="160" height="62" rx="12" fill="var(--'+c+'-soft)" stroke="var(--'+c+')" stroke-width="2"/><text x="'+(110+i*178)+'" y="82" text-anchor="middle" class="svg-m" fill="var(--ink)" font-size="19" font-weight="700">'+b+'</text><text x="'+(110+i*178)+'" y="104" text-anchor="middle" class="svg-m" fill="var(--muted)" font-size="12">octeto '+(i+1)+' = '+d+'</text></g>').join('')+
  '<path d="M30 140H710" stroke="var(--acc)" stroke-width="2.5" class="flow"/><text x="380" y="168" text-anchor="middle" class="svg-m" fill="var(--muted)" font-size="12">4 octetos × 8 bits = 32 bits</text>',
  'Cada octeto son 8 bits, de 00000000 (0) a 11111111 (255).','0 0 760 190','Una IP en binario y en decimal')+
 H.p('Para pasar de binario a decimal se suman los pesos de los bits a 1: <code>128 · 64 · 32 · 16 · 8 · 4 · 2 · 1</code>.')+
 H.lab('labBin','Conversor IP ⇄ binario',
  '<div class="row"><input type="text" id="bnIn" value="192.168.10.77" aria-label="Dirección IP" spellcheck="false" placeholder="Ej: 192.168.10.77"></div><div class="term-out" id="bnOut"></div>')+
 H.posts([['','Identifica una conexión','Un host con varias conexiones tiene una IP por cada una.'],['blue','Red + host','Cada IP se forma con el identificador de red y el del host dentro de esa red.'],['pink','Error típico','Un octeto no puede pasar de 255: 192.168.1.256 no es una IP válida.']])},

/* 4 */{id:'t-mascara',title:'Máscara de red y prefijo',short:'Máscara y prefijo',sub:'Cómo se separan la parte de red y la parte de host.',c:'#d93b55',html:
 H.p('La <b>máscara</b> marca con unos los bits de red y con ceros los bits de host. Haciendo <code>IP AND máscara</code> se obtiene la <b>dirección de red</b>. Hoy se escribe también como <b>prefijo</b>: <code>192.168.0.1/24</code> significa 24 bits de red.')+
 H.dia('<text x="20" y="40" class="svg-m" fill="var(--muted)" font-size="12">IP</text><text x="110" y="40" class="svg-m" fill="var(--ink)" font-size="14">192.168.0.1</text><text x="290" y="40" class="svg-m" fill="var(--ink)" font-size="14" letter-spacing="1">11000000.10101000.00000000.00000001</text>'+
  '<text x="20" y="80" class="svg-m" fill="var(--muted)" font-size="12">Máscara</text><text x="110" y="80" class="svg-m" fill="var(--ink)" font-size="14">255.255.255.0</text><text x="290" y="80" class="svg-m" fill="var(--acc)" font-size="14" letter-spacing="1">11111111.11111111.11111111</text><text x="627" y="80" class="svg-m" fill="var(--amber)" font-size="14" letter-spacing="1">.00000000</text>'+
  '<path d="M20 98H740" stroke="var(--muted)" stroke-width="1.5"/><text x="20" y="128" class="svg-m" fill="var(--muted)" font-size="12">AND = Red</text><text x="110" y="128" class="svg-t" fill="var(--rose)" font-size="14">192.168.0.0</text><text x="290" y="128" class="svg-m" fill="var(--ink)" font-size="14" letter-spacing="1">11000000.10101000.00000000.00000000</text>'+
  '<g class="pulse"><rect x="286" y="146" width="336" height="30" rx="8" fill="var(--acc-soft)" stroke="var(--acc)"/><text x="454" y="166" text-anchor="middle" class="svg-m" fill="var(--acc)" font-size="12">24 unos = prefijo /24 (red)</text></g><rect x="624" y="146" width="100" height="30" rx="8" fill="var(--amber-soft)" stroke="var(--amber)"/><text x="674" y="166" text-anchor="middle" class="svg-m" fill="var(--amber)" font-size="12">8 ceros (host)</text>',
  'Unos = identificador de red · ceros = identificador de host.','0 0 760 196','IP AND máscara = red')+
 H.tbl(['Prefijo','Máscara','Bits de host','Hosts útiles'],[['<code>/8</code>','255.0.0.0','24','16.777.214'],['<code>/16</code>','255.255.0.0','16','65.534'],['<code>/24</code>','255.255.255.0','8','254'],['<code>/25</code>','255.255.255.128','7','126'],['<code>/26</code>','255.255.255.192','6','62'],['<code>/27</code>','255.255.255.224','5','30'],['<code>/28</code>','255.255.255.240','4','14'],['<code>/30</code>','255.255.255.252','2','2']],'rose')+
 H.note('warn','Hosts útiles','Hosts = 2<sup>(32 − n)</sup> − 2. Se restan la dirección de <b>red</b> (host todo a 0) y la de <b>broadcast</b> (host todo a 1): no se pueden asignar a un equipo.')+
 H.lab('labNet','Calculadora de red',
  '<div class="row"><input type="text" id="nwIn" value="192.168.10.77" aria-label="IP" spellcheck="false" style="max-width:190px"><span style="align-self:center">/</span><input type="number" id="nwPf" value="26" min="1" max="32" aria-label="Prefijo" style="max-width:90px"></div><div class="term-out" id="nwOut"></div>')},

/* 5 */{id:'t-clases',title:'Clases, CIDR y VLSM',short:'Clases y CIDR',sub:'Del reparto original por clases al direccionamiento sin clases.',c:'#4f46e5',html:
 H.p('El esquema original dividía el espacio en <b>clases</b>. La clase va codificada en los primeros bits de la propia dirección. Este reparto desperdiciaba direcciones y por eso apareció <b>CIDR</b>.')+
 H.tbl(['Clase','1.er octeto','Bits iniciales','Máscara por defecto','Hosts por red','Uso'],[['<b>A</b>','0 – 127','<code>0</code>','255.0.0.0 (/8)','2²⁴ − 2','Redes grandes'],['<b>B</b>','128 – 191','<code>10</code>','255.255.0.0 (/16)','2¹⁶ − 2','Redes medianas'],['<b>C</b>','192 – 223','<code>110</code>','255.255.255.0 (/24)','2⁸ − 2','Redes pequeñas'],['<b>D</b>','224 – 239','<code>1110</code>','—','—','Multicast'],['<b>E</b>','240 – 255','<code>1111</code>','—','—','Experimental']],'violet')+
 H.dia([['A','1 octeto red · 3 host','rose',0],['B','2 octetos red · 2 host','amber',1],['C','3 octetos red · 1 host','sky',2]].map(([cl,t,c,k])=>[0,1,2,3].map(o=>'<rect x="'+(130+o*140)+'" y="'+(20+k*56)+'" width="130" height="42" rx="8" fill="var(--'+(o<=k?c:'panel')+(o<=k?'-soft':'')+')" stroke="var(--'+(o<=k?c:'muted')+')" stroke-width="'+(o<=k?2:1)+'"/><text x="'+(195+o*140)+'" y="'+(46+k*56)+'" text-anchor="middle" class="svg-m" fill="var(--'+(o<=k?'ink':'muted')+')" font-size="12">'+(o<=k?'RED':'HOST')+'</text>').join('')+'<text x="20" y="'+(46+k*56)+'" class="svg-t" fill="var(--'+c+')" font-size="16">Clase '+cl+'</text>').join(''),'Clases A, B y C: cuántos octetos son de red y cuántos de host.','0 0 760 200','Octetos de red y de host por clase')+
 H.h3('CIDR y VLSM')+
 H.cards([['✂️','CIDR','Notación <code>a.b.c.d/n</code> con n bits de red. Cada organización ajusta el tamaño de su red a sus necesidades.','acc'],['📏','VLSM','Máscara de longitud variable: subredes de distinto tamaño dentro de una misma red. La técnica que se usa hoy.','sky'],['🧮','Fórmula','Hosts útiles = 2<sup>(32 − n)</sup> − 2. Ejemplo: /21 → 2048 direcciones, 2046 hosts.','amber']])+
 H.posts([['','Reconoce la clase','Mira solo el primer octeto: 10 → A, 172 → B, 192 → C.'],['pink','Error típico','Pensar que 127.x.x.x es clase A «normal»: 127.0.0.1 es el loopback y no se asigna.']])},

/* 6 */{id:'t-subredes',title:'Subredes',short:'Subredes',sub:'Dividir una red en trozos más pequeños tomando bits de host.',c:'#0c9a6a',html:
 H.p('Para crear subredes se <b>piden prestados bits de host</b> y se pasan a la parte de red. Con <b>s</b> bits prestados salen <b>2<sup>s</sup></b> subredes, y quedan <b>(32 − n)</b> bits de host para cada una.')+
 H.dia('<rect x="20" y="20" width="720" height="40" rx="10" fill="var(--sky-soft)" stroke="var(--sky)" stroke-width="2"/><text x="380" y="46" text-anchor="middle" class="svg-t" fill="var(--sky)" font-size="14">192.168.10.0/24 · 256 direcciones</text>'+
  [['192.168.10.0/26','.1 – .62','bc .63'],['192.168.10.64/26','.65 – .126','bc .127'],['192.168.10.128/26','.129 – .190','bc .191'],['192.168.10.192/26','.193 – .254','bc .255']].map(([n,r,b],i)=>'<path d="M'+(110+i*180)+' 60V84" stroke="var(--muted)" stroke-width="2" class="flow"/><g'+(i===1?' class="pulse"':'')+'><rect x="'+(20+i*180)+'" y="86" width="170" height="92" rx="12" fill="var(--acc-soft)" stroke="var(--acc)" stroke-width="'+(i===1?2.5:1.5)+'"/><text x="'+(105+i*180)+'" y="112" text-anchor="middle" class="svg-t" fill="var(--acc)" font-size="12.5">'+n+'</text><text x="'+(105+i*180)+'" y="136" text-anchor="middle" class="svg-m" fill="var(--ink)" font-size="12">hosts '+r+'</text><text x="'+(105+i*180)+'" y="158" text-anchor="middle" class="svg-m" fill="var(--muted)" font-size="12">'+b+'</text></g>').join(''),
  'Se toman 2 bits de host: 2² = 4 subredes y quedan 6 bits: 2⁶ − 2 = 62 hosts por subred. Máscara 255.255.255.192.','0 0 760 200','192.168.10.0/24 dividida en cuatro subredes /26')+
 H.h3('Método rápido (el «salto»)')+
 H.flow([['1 · Bits','2<sup>s</sup> ≥ nº de|subredes pedidas','rose'],['2 · Máscara','n + s bits|de red','amber'],['3 · Salto','256 − valor del|octeto de máscara','sky',true],['4 · Redes','0, salto, 2·salto…','acc'],['5 · Rango','red+1 … bc−1','violet']],'Ejemplo /26: el octeto de máscara es 192 → salto 256 − 192 = 64 → redes .0, .64, .128, .192.',{gap:30})+
 H.lab('labSub','Divide una red en subredes',
  '<div class="row"><input type="text" id="sbNet" value="192.168.10.0" aria-label="Red" spellcheck="false" style="max-width:190px"><span style="align-self:center">/</span><input type="number" id="sbPf" value="24" min="1" max="30" style="max-width:90px" aria-label="Prefijo"><span style="align-self:center">en</span>'+H.seg('sbN',[['2','2'],['4','4'],['8','8'],['16','16']])+'<span style="align-self:center">subredes</span></div><div class="term-out" id="sbOut"></div>')+
 H.note('info','Ejemplo resuelto: 192.168.10.77/26','Máscara 255.255.255.192 → red <b>192.168.10.64</b>, broadcast <b>192.168.10.127</b>, hosts <b>.65 – .126</b> (2⁶ − 2 = 62).')},

/* 7 */{id:'t-tipos',title:'Tipos de direcciones IP',short:'Tipos de IP',sub:'Públicas, privadas, estáticas, dinámicas y especiales.',c:'#8b3fc9',html:
 H.p('No todas las direcciones se reparten igual: unas son visibles en Internet, otras solo en tu red, y algunas no se asignan nunca a un equipo.')+
 H.vs('Privada','192.168.1.10','Solo accesible desde la misma red. Sale a Internet a través de un router con IP pública.','Pública','88.7.24.10','Única en Internet, visible en toda la red y asignada por el ISP.')+
 H.tbl(['Rango privado (RFC 1918)','Prefijo CIDR','Clase'],[['10.0.0.0 – 10.255.255.255','<code>10.0.0.0/8</code>','A'],['172.16.0.0 – 172.31.255.255','<code>172.16.0.0/12</code>','B'],['192.168.0.0 – 192.168.255.255','<code>192.168.0.0/16</code>','C']],'violet')+
 H.flow([['LAN privada','PCs con|192.168.1.x','sky'],['Router','LAN 192.168.1.1|WAN 88.7.24.10','acc',true],['Internet','IP públicas','amber']],'El router usa su IP pública para comunicar a los equipos privados; un paquete con IP privada que llega a Internet se descarta.')+
 H.grid(2,H.card('📌','Estática','Siempre la misma dirección. Configurada a mano o con una <b>reserva DHCP</b>. Servidores públicos: IP pública y estática.','rose'),H.card('🔄','Dinámica','Cambia cada vez que se conecta. La reparte DHCP, PPPoE o PPPoA. Los ISP tienen menos IP públicas que clientes.','sky'))+
 H.h3('Direcciones que no se asignan a un host')+
 H.tbl(['Tipo','Ejemplo','Significado'],[['Red','<code>192.168.0.0/24</code>','Bits de host a 0'],['Broadcast dirigido','<code>192.168.0.255</code>','Bits de host a 1'],['Difusión limitada','<code>255.255.255.255</code>','Todos los equipos de la red propia'],['Loopback','<code>127.0.0.1</code>','Comunicación interna del sistema'],['Enlace local (APIPA)','<code>169.254.0.0/16</code>','Autoasignada si nadie da IP'],['Esta red','<code>0.0.0.0</code>','Dirección sin asignar (p. ej. cliente que aún no tiene IP)']],'rose')+
 H.note('warn','169.254.x.x en un cliente','Si un cliente muestra una IP 169.254.x.x es que el <b>DHCP no ha respondido</b>: se ha autoasignado una dirección de enlace local.')},

/* 8 */{id:'t-ipv6',title:'IPv6 básico',short:'IPv6',sub:'128 bits para acabar con el agotamiento de IPv4.',c:'#0e7bbd',html:
 H.p('<b>IPv6</b> usa <b>128 bits</b> en <b>8 grupos de 4 dígitos hexadecimales</b>. La parte de host son los últimos 64 bits (prefijo típico /64). En una URL va entre corchetes.')+
 H.dia('<text x="380" y="40" text-anchor="middle" class="svg-m" fill="var(--ink)" font-size="17" letter-spacing="1">2001:0db8:85a3:0000:0000:8a2e:0370:7334</text><path d="M380 52V76" stroke="var(--muted)" stroke-width="2.5" class="flow"/><text x="380" y="92" text-anchor="middle" class="svg-m" fill="var(--muted)" font-size="12">1) quitar ceros iniciales de cada grupo</text><text x="380" y="122" text-anchor="middle" class="svg-m" fill="var(--ink)" font-size="17" letter-spacing="1">2001:db8:85a3:0:0:8a2e:370:7334</text><path d="M380 134V158" stroke="var(--muted)" stroke-width="2.5" class="flow"/><text x="380" y="174" text-anchor="middle" class="svg-m" fill="var(--muted)" font-size="12">2) sustituir grupos de ceros seguidos por :: (una sola vez)</text><g class="pulse"><rect x="190" y="186" width="380" height="36" rx="10" fill="var(--acc-soft)" stroke="var(--acc)" stroke-width="2"/><text x="380" y="210" text-anchor="middle" class="svg-t" fill="var(--acc)" font-size="16">2001:db8:85a3::8a2e:370:7334</text></g>',
  'Para abreviar: ceros iniciales fuera y un solo «::» para los grupos de ceros seguidos.','0 0 760 236','Abreviar una dirección IPv6')+
 H.lab('labV6','Abreviador IPv6',
  '<div class="row"><input type="text" id="v6In" value="2001:0db8:85a3:0000:0000:8a2e:0370:7334" aria-label="IPv6" spellcheck="false"></div><div class="term-out" id="v6Out"></div>')+
 H.tbl(['Tipo IPv6','Prefijo','Equivale en IPv4'],[['Loopback','<code>::1</code>','127.0.0.1'],['Enlace local','<code>fe80::/10</code>','169.254.0.0/16'],['Local única (privada)','<code>fc00::/7</code>','10/8, 172.16/12, 192.168/16'],['Multicast','<code>ff00::/8</code>','224.0.0.0/4'],['Documentación','<code>2001:db8::/32</code>','—'],['Indefinida','<code>::</code>','0.0.0.0']],'sky')+
 H.cards([['🎯','Unicast','Identifica una interfaz: el paquete llega a ella.','acc'],['📢','Multicast','Llega a todo un grupo de interfaces (por ejemplo <code>ff02::1</code>).','amber'],['📍','Anycast','Llega a la interfaz más cercana del grupo.','sky']])+
 H.note('warn','Sin broadcast','En IPv6 <b>no existe el broadcast</b>: se usa multicast. Los ámbitos son enlace (red directa), sitio (routers internos) y global (Internet).')},

/* 9 */{id:'t-dhcp',title:'Qué es DHCP',short:'Qué es DHCP',sub:'Configuración automática de red sin teclear nada a mano.',c:'#13893f',html:
 H.p('<b>DHCP</b> (Dynamic Host Configuration Protocol) permite a los nodos de una red IP obtener sus parámetros de configuración <b>automáticamente</b>. Si tienes 200 equipos, ¿configurarías la IP a mano en cada uno? Ahí entra el DHCP.')+
 H.cards([['🖥️','Cliente / servidor','El servidor tiene rangos de IP y las asigna a los clientes según quedan libres.','acc'],['🔍','Control total','Sabe quién tuvo una IP, cuánto tiempo y a quién se la dio después.','sky'],['🛠️','Administración central','Configuración TCP/IP segura y sin direcciones repetidas.','amber']])+
 H.h3('Qué configura DHCP')+
 H.grid(2,H.card('📦','Parámetros básicos','Dirección IP, máscara de red, puerta de enlace (gateway) y broadcast.','acc'),H.card('➕','Parámetros opcionales','Servidores DNS, dominio, tiempos de espera ARP, servidor horario (NTP) y otros servicios (SMTP, TFTP…).','violet'))+
 H.h3('Vocabulario DHCP')+
 '<div class="flips rv" data-flips="flipsV"></div>'+
 H.note('warn','Conflicto de IP','Una IP estática dentro del rango del servidor DHCP puede asignarse a otro PC y provocar un <b>conflicto de IP</b>. Por eso las IP fijas se ponen fuera del rango o se excluyen.')+
 H.h3('Tres formas de asignar')+
 H.tbl(['Tipo','Cómo funciona'],[['<b>Automática</b>','El administrador define un rango y el servidor hace concesiones permanentes.'],['<b>Dinámica</b>','El servidor asigna direcciones libres del rango (o rangos) definido; la concesión caduca.'],['<b>Manual / estática</b>','Según la MAC del cliente, con una tabla de correspondencias; las MAC desconocidas no se atienden.']],'acc')},

/* 10 */{id:'t-dora',title:'DORA: cómo se pide una IP',short:'DORA y mensajes',sub:'Discover, Offer, Request y Ack sobre UDP 67 y 68.',c:'#1a6fd6',html:
 H.p('La petición viaja en un paquete <b>UDP de broadcast</b>. El cliente usa el puerto <b>68</b> y el servidor el <b>67</b>. Son cuatro mensajes: <b>D</b>iscover, <b>O</b>ffer, <b>R</b>equest y <b>A</b>ck.')+
 H.dia('<defs><marker id="arD" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0L10 5L0 10z" fill="var(--sky)"/></marker><marker id="arD2" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0L10 5L0 10z" fill="var(--acc)"/></marker></defs>'+
  '<rect x="60" y="14" width="150" height="34" rx="10" fill="var(--sky-soft)" stroke="var(--sky)" stroke-width="2"/><text x="135" y="36" text-anchor="middle" class="svg-t" fill="var(--sky)" font-size="14">CLIENTE · UDP 68</text><rect x="550" y="14" width="150" height="34" rx="10" fill="var(--acc-soft)" stroke="var(--acc)" stroke-width="2"/><text x="625" y="36" text-anchor="middle" class="svg-t" fill="var(--acc)" font-size="14">SERVIDOR · UDP 67</text>'+
  '<path d="M135 50V270M625 50V270" stroke="var(--muted)" stroke-width="2" stroke-dasharray="4 4"/>'+
  [['1 · DHCPDISCOVER','¿hay algún servidor DHCP? (broadcast)',0,0],['2 · DHCPOFFER','te ofrezco 192.168.1.50',1,1],['3 · DHCPREQUEST','acepto esa dirección',0,2],['4 · DHCPACK','confirmado, con estos parámetros',1,3]].map(([t,s,back,i])=>{const y=84+i*58;return '<path d="'+(back?'M620 '+y+'H146':'M140 '+y+'H614')+'" stroke="var(--'+(back?'acc':'sky')+')" stroke-width="2.8" class="flow" marker-end="url(#'+(back?'arD2':'arD')+')"/><text x="380" y="'+(y-18)+'" text-anchor="middle" class="svg-t" fill="var(--ink)" font-size="13">'+t+'</text><text x="380" y="'+(y-3)+'" text-anchor="middle" class="svg-m" fill="var(--muted)" font-size="11.5">'+s+'</text>'}).join(''),
  'Discover: 0.0.0.0:68 → 255.255.255.255:67. Offer: el servidor responde al puerto 68 del cliente.','0 0 760 290','Los cuatro pasos de DHCP')+
 H.lab('labDora','Simulador de una concesión',
  '<div class="row"><button class="btn sm pri" type="button" id="drNext">Siguiente mensaje →</button><button class="btn sm" type="button" id="drReset">Reiniciar</button></div><div class="term-out" id="drOut"></div>')+
 H.h3('Mensajes DHCP')+
 H.tbl(['Mensaje','Sentido','Para qué sirve'],[['<code>DHCPDISCOVER</code>','Cliente → todos','Broadcast para localizar servidores (0.0.0.0 → 255.255.255.255)'],['<code>DHCPOFFER</code>','Servidor → cliente','Oferta de parámetros según la MAC; incluye la IP'],['<code>DHCPREQUEST</code>','Cliente → servidor','Acepta una oferta, rechaza otras o confirma una IP anterior'],['<code>DHCPACK</code>','Servidor → cliente','Confirmación con los parámetros definitivos'],['<code>DHCPNACK</code>','Servidor → cliente','IP no válida en esa subred o ya asignada a otro equipo'],['<code>DHCPDECLINE</code>','Cliente → servidor','La dirección ya está en uso (p. ej. IP manual de otro equipo)'],['<code>DHCPRELEASE</code>','Cliente → servidor','El cliente deja de usar la IP'],['<code>DHCPINFORM</code>','Cliente → servidor','Ya configurado, pide más información local'],['<code>DHCPRENEW</code>','Cliente → servidor','Notifica la renovación durante el contrato']],'acc')+
 H.h3('Cabecera de un mensaje DHCP')+
 H.tbl(['Campo','Bytes','Descripción'],[['<code>op</code>','1','1 = Bootrequest, 2 = Bootreply'],['<code>htype</code> / <code>hlen</code>','1 + 1','Tipo (1 = Ethernet) y longitud (6) de la dirección hardware'],['<code>hops</code>','1','El cliente lo pone a 0; cada router que retransmite lo incrementa'],['<code>xid</code>','4','ID de transacción aleatorio: relaciona peticiones y respuestas'],['<code>secs</code> / <code>flags</code>','2 + 2','Segundos desde el arranque; bit de broadcast'],['<code>ciaddr</code>','4','IP del cliente (su IP real o 0.0.0.0)'],['<code>yiaddr</code>','4','IP que el servidor ofrece al cliente'],['<code>siaddr</code>','4','IP del servidor que ofrece la concesión'],['<code>giaddr</code>','4','Dirección del agente de retransmisión (relay)'],['<code>chaddr</code>','16','Dirección física (MAC) del cliente'],['<code>sname</code> / <code>file</code>','64 + 128','Nombre del servidor y fichero de arranque'],['<code>options</code>','variable','Empieza con la cookie 99.130.83.99; después, las opciones']],'sky')},

/* 11 */{id:'t-escenarios',title:'Renovar, liberar y APIPA',short:'Concesión y APIPA',sub:'Qué pasa cuando caduca la IP, y qué hace el cliente sin DHCP.',c:'#c76a05',html:
 H.p('La IP se concede por un <b>tiempo</b> (concesión o <i>lease</i>). El cliente debe renovarla antes de que caduque.')+
 H.cards([['🔁','Renovar','Solo REQUEST y ACK (o NAK si la configuración no es válida o no es la red correcta).','acc'],['🚪','Liberar','El cliente envía DHCPRELEASE con sus direcciones; el servidor libera la IP.','rose'],['⏳','Vigilar el tiempo','Antes de caducar, REQUEST para ampliar; si no hay respuesta, se lo pide a otro servidor.','amber']])+
 H.dia('<rect x="30" y="60" width="700" height="30" rx="15" fill="var(--bg2)" stroke="var(--line)"/><rect x="30" y="60" width="350" height="30" rx="15" fill="var(--acc-soft)" stroke="var(--acc)" stroke-width="2"/><rect x="380" y="60" width="268" height="30" fill="var(--amber-soft)" stroke="var(--amber)" stroke-width="2"/><rect x="648" y="60" width="82" height="30" rx="15" fill="var(--rose-soft)" stroke="var(--rose)" stroke-width="2"/>'+
  '<text x="30" y="46" class="svg-t" fill="var(--ink)" font-size="13">0 · ACK</text><text x="380" y="46" text-anchor="middle" class="svg-t" fill="var(--acc)" font-size="13">T1 = 50 %</text><text x="648" y="46" text-anchor="middle" class="svg-t" fill="var(--amber)" font-size="13">T2 = 87,5 %</text><text x="730" y="46" text-anchor="end" class="svg-t" fill="var(--rose)" font-size="13">100 % caduca</text>'+
  '<text x="205" y="80" text-anchor="middle" class="svg-m" fill="var(--ink)" font-size="12">usa la IP con normalidad</text><text x="514" y="80" text-anchor="middle" class="svg-m" fill="var(--ink)" font-size="12">renueva con su servidor</text><text x="689" y="80" text-anchor="middle" class="svg-m" fill="var(--ink)" font-size="11">cualquiera</text>'+
  '<g class="pulse"><rect x="190" y="116" width="380" height="54" rx="12" fill="var(--sky-soft)" stroke="var(--sky)" stroke-width="2"/><text x="380" y="140" text-anchor="middle" class="svg-t" fill="var(--sky)" font-size="13">T1: unicast al servidor · T2: broadcast a cualquier servidor</text><text x="380" y="158" text-anchor="middle" class="svg-m" fill="var(--ink)" font-size="12">Si caduca sin renovar → deja de usar la IP y vuelve al Discover</text></g>',
  'Tiempos de renovación: T1 (50 %) y T2 (87,5 %) de la duración de la concesión.','0 0 760 190','Línea de tiempo de una concesión')+
 H.lab('labLease','Calculadora de renovación',
  '<div class="row"><input type="number" id="lsIn" value="1200" min="60" aria-label="Segundos de concesión" style="max-width:150px"><span style="align-self:center">segundos de concesión</span></div><div class="term-out" id="lsOut"></div>')+
 H.note('info','Ejemplo de DHCPNAK','Un portátil llega al aula con la IP 192.168.1.100 de casa y pide renovarla. El servidor del aula reparte 192.168.2.0/24, no es la red correcta, y responde con <b>NACK</b>.')+
 H.h3('APIPA (169.254.0.0/16)')+
 H.p('Si no hay servidor DHCP ni IP manual, el equipo se asigna una dirección privada automática de <code>169.254.0.1 – 169.254.255.254</code> con máscara 255.255.0.0, al azar. Comprueba cada 5 minutos si hay un servidor DHCP (según Microsoft).')+
 H.vs('Con APIPA','169.254.12.7/16 · sin gateway ni DNS','Red local sí, Internet no. Señal de que el DHCP no responde.','Con DHCP','192.168.1.50/24 · gateway · DNS','Configuración completa y salida a Internet.')+
 H.h3('Varios servidores y BOOTP')+
 H.cards([['🥇','Varios servidores DHCP','El cliente acepta el primer mensaje que llega y rechaza el resto. Los servidores no se comunican entre sí: el administrador debe lograr configuraciones independientes y consistentes.','sky'],['🕰️','BOOTP (antecesor)','RFC 951 (1985), para estaciones sin disco. Asocia IP a MAC de forma predefinida; si la MAC no está en la tabla, no devuelve IP. Pensado para redes estáticas.','violet']])+
 H.tbl(['Aspecto','BOOTP','DHCP'],[['Asignación','Predefinida por MAC','Dinámica, automática o manual'],['Tramas','Muy sencillas, poco tráfico','Misma base, con opciones'],['Eficacia','Muy baja; timeout y retransmisión','Concesiones y renovación'],['Entorno','Redes estáticas','Portátiles y redes inalámbricas']],'amber')},

/* 12 */{id:'t-relay',title:'Relay, snooping y failover',short:'Relay y seguridad',sub:'DHCP entre subredes, servidores falsos y alta disponibilidad.',c:'#d93b55',html:
 H.p('El broadcast no atraviesa routers. Por eso, para que un servidor atienda a otras subredes hace falta un <b>agente de retransmisión</b>.')+
 H.dia('<defs><marker id="arR" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0L10 5L0 10z" fill="var(--sky)"/></marker></defs>'+
  [['Cliente','Subred 2','sky',20],['Router · Relay','giaddr = su IP','amber',290],['Servidor DHCP','Subred 1','acc',560]].map(([t,s,c,x])=>'<g'+(c==='amber'?' class="pulse"':'')+'><rect x="'+x+'" y="40" width="180" height="76" rx="14" fill="var(--'+c+'-soft)" stroke="var(--'+c+')" stroke-width="2"/><text x="'+(x+90)+'" y="72" text-anchor="middle" class="svg-t" fill="var(--'+c+')" font-size="15">'+t+'</text><text x="'+(x+90)+'" y="94" text-anchor="middle" class="svg-m" fill="var(--ink)" font-size="12">'+s+'</text></g>').join('')+
  '<path d="M200 66H286" stroke="var(--sky)" stroke-width="2.8" class="flow" marker-end="url(#arR)"/><path d="M470 66H556" stroke="var(--sky)" stroke-width="2.8" class="flow" marker-end="url(#arR)"/><text x="243" y="58" text-anchor="middle" class="svg-m" fill="var(--ink)" font-size="11">1 DISCOVER</text><text x="513" y="58" text-anchor="middle" class="svg-m" fill="var(--ink)" font-size="11">2 reenvía</text><path d="M556 98H470M286 98H200" stroke="var(--acc)" stroke-width="2.8" class="flow" marker-end="url(#arR)"/><text x="513" y="116" text-anchor="middle" class="svg-m" fill="var(--ink)" font-size="11">3 OFFER</text><text x="243" y="116" text-anchor="middle" class="svg-m" fill="var(--ink)" font-size="11">4 OFFER</text>'+
  '<text x="380" y="160" text-anchor="middle" class="svg-m" fill="var(--muted)" font-size="12">REQUEST y ACK siguen el mismo camino (paso 5). Sin relay, cada subred necesita su propio servidor DHCP.</text>',
  'El router con relay habilitado escucha los broadcast DHCP y los reenvía al servidor de otra subred.','0 0 760 180','DHCP Relay Agent entre dos subredes')+
 H.h3('Seguridad: DHCP Spoofing y Snooping')+
 H.cards([['🦹','DHCP Spoofing','Un atacante responde antes que el servidor autorizado y da una IP válida, pero con <b>su equipo como puerta de enlace</b>: todo el tráfico pasa por él.','rose'],['🛡️','DHCP Snooping','Función de los switches: solo los <b>puertos de confianza</b> (servidor legítimo, troncales y relays) dejan pasar OFFER y ACK. En el resto, se descartan.','acc']])+
 H.dia('<rect x="290" y="14" width="180" height="50" rx="12" fill="var(--amber-soft)" stroke="var(--amber)" stroke-width="2"/><text x="380" y="45" text-anchor="middle" class="svg-t" fill="var(--amber)" font-size="15">SWITCH</text><rect x="20" y="110" width="170" height="52" rx="12" fill="var(--acc-soft)" stroke="var(--acc)" stroke-width="2"/><text x="105" y="134" text-anchor="middle" class="svg-t" fill="var(--acc)" font-size="13">Servidor legítimo</text><text x="105" y="152" text-anchor="middle" class="svg-m" fill="var(--ink)" font-size="11">puerto de confianza ✓</text><rect x="295" y="110" width="170" height="52" rx="12" fill="var(--sky-soft)" stroke="var(--sky)" stroke-width="2"/><text x="380" y="140" text-anchor="middle" class="svg-t" fill="var(--sky)" font-size="13">Cliente</text><rect x="570" y="110" width="170" height="52" rx="12" fill="var(--rose-soft)" stroke="var(--rose)" stroke-width="2"/><text x="655" y="134" text-anchor="middle" class="svg-t" fill="var(--rose)" font-size="13">Servidor falso</text><text x="655" y="152" text-anchor="middle" class="svg-m" fill="var(--ink)" font-size="11">no fiable: se descarta ✗</text><path d="M105 108L320 66M380 108V66M655 108L440 66" stroke="var(--muted)" stroke-width="2" class="flow"/>',
  'Snooping: los mensajes de servidores en puertos no fiables se rechazan.','0 0 760 180','DHCP Snooping')+
 H.h3('DHCP Failover')+
 H.grid(2,H.card('💾','Copia de seguridad','El secundario no concede hasta que falla el primario.','sky'),H.card('⚖️','Balanceo de carga','Los dos conceden y se sincronizan, repartiendo las peticiones.','amber'))+
 H.note('tip','Resumen','Entre subredes → <b>relay agent</b>. Contra servidores falsos → <b>snooping</b>. Si cae el servidor → <b>failover</b>.')},

/* 13 */{id:'t-ubuntu',title:'Servidor DHCP en Ubuntu',short:'Ubuntu Server',sub:'isc-dhcp-server, netplan y dhcpd.conf paso a paso.',c:'#0c9a6a',html:
 H.p('En Ubuntu Server el servicio se instala con el paquete <code>isc-dhcp-server</code> (el demonio <code>dhcpd</code>). Se toca la <b>red del servidor</b> (netplan) y <b>dos ficheros</b> de DHCP.')+
 H.flow([['1 · Instalar','apt install|isc-dhcp-server','sky'],['2 · IP fija','netplan|dhcp4: false','amber'],['3 · Interfaz','/etc/default/|isc-dhcp-server','violet'],['4 · Ámbito','/etc/dhcp/|dhcpd.conf','acc',true],['5 · Probar','dhcpd -t · status|cliente','rose']],'Orden de trabajo: instalar con internet (NAT), pasar a red interna, fijar la IP, configurar y probar.',{gap:30})+
 H.tbl(['Fichero','Para qué sirve'],[['<code>/etc/default/isc-dhcp-server</code>','Interfaz por la que sirve el DHCP (<code>INTERFACESv4="enp0s3"</code>)'],['<code>/etc/dhcp/dhcpd.conf</code>','Subredes, rangos, DNS, puerta de enlace y reservas'],['<code>/var/lib/dhcp/dhcpd.leases</code>','Concesiones concedidas (no se edita a mano)'],['<code>/etc/netplan/*.yaml</code>','IP fija del servidor']],'acc')+
 H.h3('IP fija del servidor (netplan)')+
 H.code(`network:
  version: 2
  ethernets:
    enp0s3:
      dhcp4: false
      addresses: [192.168.100.254/24]`,'/etc/netplan/50-cloud-init.yaml')+
 H.note('warn','Solo espacios','netplan usa sangría con <b>espacios, nunca tabuladores</b>. Aplica con <code>sudo netplan apply</code> y comprueba con <code>ip a</code>.')+
 H.h3('Fichero dhcpd.conf')+
 H.code(`ddns-update-style none;
authoritative;
option domain-name "aula.org";
option domain-name-servers 8.8.8.8, 8.8.4.4;
default-lease-time 600;
max-lease-time 7200;

subnet 192.168.100.0 netmask 255.255.255.0 {
  option routers 192.168.100.254;
  option subnet-mask 255.255.255.0;
  option broadcast-address 192.168.100.255;
  range 192.168.100.101 192.168.100.109;
  range 192.168.100.191 192.168.100.199;
}`,'/etc/dhcp/dhcpd.conf')+
 H.tbl(['Línea','Qué hace'],[['<code>authoritative;</code>','Este es el servidor oficial: si un cliente trae una IP que no corresponde, se la corrige.'],['<code>default-lease-time</code>','Segundos que dura la concesión si el cliente no pide otra (600 = 10 min).'],['<code>max-lease-time</code>','Máximo aunque el cliente pida más (7200 = 2 h).'],['<code>subnet … netmask … { }</code>','Declara la red que atiende; lo de dentro solo vale para esa red.'],['<code>option routers</code>','Puerta de enlace para los clientes.'],['<code>range a b;</code>','Intervalo repartible. Con dos <code>range</code> hay dos tramos; la IP del servidor (.254) queda fuera.']],'sky')+
 H.lab('labConf','Generador de dhcpd.conf',
  '<div class="row"><label class="muted" style="align-self:center">Red</label><input type="text" id="cfNet" value="192.168.100.0" style="max-width:150px" spellcheck="false"><span style="align-self:center">/</span><input type="number" id="cfPf" value="24" min="8" max="30" style="max-width:80px"><label class="muted" style="align-self:center">Rango</label><input type="text" id="cfA" value="192.168.100.101" style="max-width:150px" spellcheck="false"><input type="text" id="cfB" value="192.168.100.199" style="max-width:150px" spellcheck="false"></div>'+
  '<div class="row"><label class="muted" style="align-self:center">Gateway</label><input type="text" id="cfGw" value="192.168.100.254" style="max-width:150px" spellcheck="false"><label class="muted" style="align-self:center">DNS</label><input type="text" id="cfDns" value="8.8.8.8, 8.8.4.4" style="max-width:170px" spellcheck="false"><label class="muted" style="align-self:center">Dominio</label><input type="text" id="cfDom" value="aula.org" style="max-width:120px"><label class="muted" style="align-self:center">Concesión (s)</label><input type="number" id="cfLease" value="600" style="max-width:100px"></div><div class="term-out" id="cfOut"></div>')+
 H.h3('Arrancar y comprobar')+
 H.code(`sudo dhcpd -t -cf /etc/dhcp/dhcpd.conf     # comprueba la sintaxis
sudo systemctl restart isc-dhcp-server
sudo systemctl status isc-dhcp-server      # debe poner active (running)
sudo journalctl -u isc-dhcp-server -n 20   # DISCOVER, OFFER, REQUEST, ACK
sudo cat /var/lib/dhcp/dhcpd.leases        # concesiones`,'Servidor')+
 H.h3('Reserva por MAC')+
 H.code(`host cliente1 {
  hardware ethernet 08:00:27:AA:BB:CC;
  fixed-address 192.168.100.50;
}`,'dhcpd.conf · reserva')+
 H.note('tip','Idea clave','La IP reservada debe estar en la red pero <b>fuera de los range</b>, para que no se conceda a otro equipo. La ventaja frente a una IP fija en el cliente: se administra todo desde el servidor.')+
 H.h3('Ver los paquetes DHCP')+
 H.code(`sudo tcpdump -i enp0s3 -n -vv port 67 or port 68
# en el cliente: sudo networkctl renew enp0s3`,'Servidor')},

/* 14 */{id:'t-windows',title:'Servidor DHCP en Windows Server',short:'Windows Server',sub:'Rol DHCP, ámbito, superámbito, reservas y comprobación.',c:'#4f46e5',html:
 H.p('En <b>Windows Server 2019</b> el DHCP es un <b>rol</b> que se instala desde el Administrador del servidor. Antes de empezar, el servidor debe tener una <b>IP estática</b>.')+
 H.flow([['1 · Rol','Agregar roles|Servidor DHCP','sky'],['2 · Ámbito','Ámbito nuevo|rango y máscara','amber',true],['3 · Opciones','router, DNS,|dominio','violet'],['4 · Activar','Sí, activar|ahora','acc'],['5 · Probar','ipconfig /renew','rose']],'Pasos del asistente de Windows Server.',{gap:30})+
 H.h3('Datos del ejemplo')+
 H.tbl(['Dato','Valor'],[['Nombre del ámbito','AULA B9 (descripción: Clase DAM1)'],['Red y máscara','192.168.50.128 / 255.255.255.192 (/26)'],['Rango que reparte','192.168.50.129 a 192.168.50.190'],['Servidor DNS','8.8.8.8'],['Superámbito','AULAS INFORM (ámbitos AULA B8, B15 y B9)']],'violet')+
 H.h3('El asistente de ámbito nuevo')+
 H.tbl(['Pantalla','Qué se indica','Para qué sirve'],[['Nombre de ámbito','Nombre y descripción','Solo identifica el ámbito en la consola'],['Intervalo de IP','Inicio, fin y prefijo (26)','Conjunto de IP que se puede conceder y máscara para los clientes'],['Exclusiones y retraso','Direcciones a excluir','IP que el servidor nunca reparte (servidores, impresoras)'],['Duración de la concesión','Tiempo','Largo si hay equipos fijos, corto si hay móviles'],['Opciones DHCP','Router, dominio y DNS','Datos que recibe el cliente junto con la IP'],['Servidores WINS','(vacío)','Nombres NetBIOS antiguos; casi no se usa'],['Activar ámbito','Sí, activar ahora','Un ámbito solo concede IP si está activado']],'amber')+
 H.h3('Las cinco carpetas de un ámbito')+
 H.grid(3,H.card('🧩','Conjunto de direcciones','El rango repartido y las exclusiones.','acc'),H.card('📜','Concesiones','Los equipos que ya tienen una IP.','sky'),H.card('📌','Reservas','Equipos con IP fija según su MAC.','rose'),H.card('⚙️','Opciones de ámbito','Router, DNS, dominio.','amber'),H.card('🧭','Directivas','Reglas según el cliente.','violet'))+
 H.note('info','Superámbito','Agrupa varios ámbitos de redes distintas para <b>administrarlos y activarlos juntos</b>, como una sola unidad.')+
 H.h3('Reserva de IP')+
 H.p('Botón derecho en <b>Reservas → Reserva nueva</b>. Se rellena el nombre, la IP (dentro del ámbito) y la <b>MAC</b> del equipo, que se obtiene en el cliente con <code>ipconfig /all</code> (Dirección física).')+
 H.h3('Probar con un cliente Windows')+
 H.code(`ipconfig /release
ipconfig /renew
ipconfig /all`,'Cliente · cmd')+
 H.tbl(['Qué mirar en ipconfig /all','Qué debes ver'],[['Dirección IPv4','Una IP dentro del rango del ámbito (o la reservada)'],['Servidor DHCP','La IP del servidor'],['Puerta de enlace','La que configuraste en el asistente'],['Servidores DNS','El del ejemplo: 8.8.8.8'],['Concesión obtenida / expira','Fechas acordes a la duración elegida']],'acc')+
 H.h3('Cliente DHCP en Windows y Linux')+
 H.grid(2,H.card('🪟','Windows','<code>Win + R</code> → <code>control.exe netconnections</code> → Propiedades → Protocolo IPv4. «Obtener IP automáticamente» = cliente DHCP. Comprobar con <code>ipconfig</code>.','sky'),H.card('🐧','Ubuntu','Gráfico: Red → Ajustes IPv4 → Automático (DHCP). En consola: editar <code>/etc/netplan/</code> con <code>dhcp4: true</code>.','acc'))}
],

flips:{flipsV:[['Á','Ámbito','Intervalo consecutivo completo de IP de una red; suele definir una subred física.'],['SÁ','Superámbito','Agrupa ámbitos para varias subredes lógicas en una física; se activan juntos.'],['EX','Exclusión','Direcciones del ámbito que el servidor nunca ofrece a los clientes.'],['CJ','Conjunto disponible','Direcciones que quedan tras las exclusiones, entre la primera y la última.'],['⏱','Concesión','Periodo en que el cliente puede usar la IP; se renueva antes de caducar.'],['📌','Reserva','Asignación definitiva: un dispositivo siempre recibe la misma IP (por su MAC).']]},
datos:[['Red del tutorial Ubuntu','192.168.100.0/24'],['IP del servidor Ubuntu','192.168.100.254'],['Rangos dinámicos','192.168.100.101-109 y 191-199'],['DNS de ejemplo','8.8.8.8 y 8.8.4.4'],['Red interna VirtualBox','intnet (o redlan)'],['Red del tutorial Windows','192.168.50.128/26']],
pDiagram:H.flow([['Servidor','Ubuntu o Windows|IP fija','acc',true],['Switch','red interna|VirtualBox','amber'],['Cliente','pide IP por DHCP','sky'],['Prueba','ip a · ipconfig|leases','violet']],'Laboratorio: un servidor con IP fija y un cliente en la misma red interna, sin internet.',{gap:40}),
phases:[
 {t:'Preparar las máquinas virtuales',c:'#13893f',s:[
  ['a1','vbx','Crear la VM del servidor','VirtualBox → Nueva. Ubuntu Server, 1024 MB, 1 CPU, 10 GB, un adaptador NAT. No marques la instalación desatendida.',''],
  ['a2','vbx','Instalar Ubuntu Server','Teclado Spanish, usar todo el disco, equipo linux-server-01 y usuario alumno. Sin SSH ni snaps.',''],
  ['a3','srv','Actualizar mientras hay internet','Con la red en NAT todavía.','sudo apt-get update\nsudo apt-get upgrade -y'],
  ['a4','vbx','Clonar el cliente','Apaga, haz una instantánea «limpia» y clona con «Reinicializar la dirección MAC» y clon completo.','sudo shutdown now'],
  ['a5','srv','Instalar isc-dhcp-server y tcpdump','Hazlo antes de pasar a red interna: después ya no habrá internet.','sudo apt-get install isc-dhcp-server tcpdump\nsudo systemctl stop isc-dhcp-server.service']]},
 {t:'Red interna e IP fija',c:'#1a6fd6',s:[
  ['b1','vbx','Pasar a Red interna','Con las VM apagadas: Configuración → Red → Adaptador 1 → Red interna (mismo nombre en servidor y cliente).',''],
  ['b2','srv','Copiar y editar netplan','El fichero puede llamarse 50-cloud-init.yaml u otro. Solo espacios.','ls /etc/netplan/\nsudo cp /etc/netplan/*.yaml ~/netplan.orig\nsudo nano /etc/netplan/*.yaml'],
  ['b3','srv','Aplicar y comprobar la IP fija','enp0s3 debe tener 192.168.100.254/24.','sudo netplan apply\nip a']]},
 {t:'Configurar y probar el DHCP en Ubuntu',c:'#c76a05',s:[
  ['c1','srv','Copia de seguridad de los ficheros','Antes de tocar nada.','sudo cp /etc/default/isc-dhcp-server /etc/default/isc-dhcp-server.orig\nsudo cp /etc/dhcp/dhcpd.conf /etc/dhcp/dhcpd.conf.orig'],
  ['c2','srv','Indicar la interfaz','Si queda vacío: «Not configured to listen on any interfaces».','sudo nano /etc/default/isc-dhcp-server\nINTERFACESv4="enp0s3"'],
  ['c3','srv','Escribir dhcpd.conf','Borra todo (Ctrl+K en nano) y escribe el ámbito con sus range, routers y DNS.','sudo nano /etc/dhcp/dhcpd.conf'],
  ['c4','srv','Validar y arrancar','dhcpd -t solo comprueba la sintaxis. Debe salir active (running).','sudo dhcpd -t -cf /etc/dhcp/dhcpd.conf\nsudo systemctl start isc-dhcp-server.service\nsudo systemctl status isc-dhcp-server.service'],
  ['c5','cli','Comprobar en el cliente','IP del rango, ruta por defecto, DNS y ping al servidor.','ip a\nip route\nresolvectl status enp0s3\nping -c 3 192.168.100.254'],
  ['c6','srv','Ver la concesión','El registro muestra los cuatro mensajes y el fichero de leases la IP y la MAC.','sudo journalctl -u isc-dhcp-server -n 20\nsudo cat /var/lib/dhcp/dhcpd.leases'],
  ['c7','cli','Renovar la IP','Tras cambiar el range en el servidor.','sudo networkctl renew enp0s3\nip a'],
  ['c8','srv','Crear una reserva por MAC','Obtén la MAC con ip link show enp0s3 y añade el bloque host fuera de los range.','host cliente1 {\n  hardware ethernet 08:00:27:AA:BB:CC;\n  fixed-address 192.168.100.50;\n}'],
  ['c9','srv','Capturar los cuatro mensajes','Renueva en el cliente sin cerrar la captura. Ctrl+C para parar.','sudo tcpdump -i enp0s3 -n -vv port 67 or port 68']]},
 {t:'Práctica 1 obligatoria (10.20.30.40/8)',c:'#d93b55',s:[
  ['d1','srv','Tarea 1: nombre del equipo e instalación','Tu nombre de pila en minúsculas y sin tildes; captura de la instalación y del estado del servicio.','sudo hostnamectl set-hostname tunombre\nsudo apt update\nsudo apt install isc-dhcp-server\nsystemctl status isc-dhcp-server'],
  ['d2','srv','Tarea 2: IP fija 10.20.30.40/8','Adaptador en red interna redlan; netplan con addresses: [10.20.30.40/8].','sudo netplan apply\nip -4 a show enp0s3'],
  ['d3','srv','Tarea 3: un ámbito y un cliente','authoritative, lease 1200, subnet 10.0.0.0 netmask 255.0.0.0 con range 10.20.30.50 10.20.30.80.','sudo dhcpd -t -cf /etc/dhcp/dhcpd.conf\nsudo systemctl restart isc-dhcp-server\nsudo dhcp-lease-list'],
  ['d4','srv','Tarea 4: dos ámbitos y todos los parámetros','Segundo range 10.60.70.100-120, routers 10.0.0.254, DNS 1.1.1.1 y 10.0.0.53, dominio tunombre.dhcp.','sudo dhcpd -t -cf /etc/dhcp/dhcpd.conf'],
  ['d5','cli','Tarea 4: renovar en el cliente','Comprueba IP, gateway, DNS y dominio.','sudo dhclient -r enp0s3\nsudo dhclient enp0s3\nip route\nresolvectl status enp0s3'],
  ['d6','srv','Tarea 5: reserva 10.77.88.99','Por la MAC real de cliente1, fuera del bloque subnet.','host cliente1 {\n  hardware ethernet 08:00:27:aa:bb:cc;\n  fixed-address 10.77.88.99;\n}'],
  ['d7','srv','Tarea 6: servidor NTP (opción 42)','Añade la opción a la subred y comprueba en el cliente.','option ntp-servers 10.0.0.123;\n# cliente: nmcli device show enp0s3 | grep -i ntp'],
  ['d8','doc','Tarea 7: cierre e informe','Parar el servicio, revisar capturas (con fecha y hora, sin recortar) y responder las preguntas del informe.','sudo systemctl stop isc-dhcp-server\nsystemctl status isc-dhcp-server']]},
 {t:'Servidor DHCP en Windows Server',c:'#4f46e5',s:[
  ['e1','wsv','IP estática y contraseña segura','Sin esto el asistente no continúa.',''],
  ['e2','wsv','Instalar el rol Servidor DHCP','Administrador del servidor → Agregar roles y características → Servidor DHCP (incluir herramientas de administración).',''],
  ['e3','wsv','Crear el ámbito AULA B9','Herramientas → DHCP → IPv4 → Ámbito nuevo. 192.168.50.129 a .190, prefijo 26.',''],
  ['e4','wsv','Router, DNS y activar el ámbito','Enrutador, dominio y DNS 8.8.8.8; WINS vacío; activar ahora.',''],
  ['e5','wsv','Crear una reserva','Reservas → Reserva nueva con la MAC de ipconfig /all.',''],
  ['e6','cli','Probar con un cliente Windows','Debe salir una IP del rango y el servidor DHCP.','ipconfig /release\nipconfig /renew\nipconfig /all']]}],
cheat:[
 ['sudo apt-get install isc-dhcp-server','srv','Instalar el servidor DHCP'],['sudo netplan apply','srv','Aplicar la IP fija'],['ip a','srv','Ver IP e interfaces'],['ip link show enp0s3','srv','Ver la MAC'],['sudo dhcpd -t -cf /etc/dhcp/dhcpd.conf','srv','Comprobar la sintaxis del dhcpd.conf'],['sudo systemctl start|stop|restart|status isc-dhcp-server','srv','Gestionar el servicio'],['sudo journalctl -u isc-dhcp-server -n 20','srv','Ver el registro del servicio'],['sudo cat /var/lib/dhcp/dhcpd.leases','srv','Concesiones concedidas'],['sudo dhcp-lease-list','srv','Resumen de concesiones'],['sudo tcpdump -i enp0s3 -n -vv port 67 or port 68','srv','Capturar paquetes DHCP'],
 ['sudo networkctl renew enp0s3','cli','Renovar la IP (Ubuntu moderno)'],['sudo dhclient -r enp0s3 && sudo dhclient enp0s3','cli','Liberar y pedir IP de nuevo'],['ip route','cli','Ver la puerta de enlace'],['resolvectl status enp0s3','cli','Ver DNS y dominio recibidos'],['ipconfig /release · /renew · /all','cli','Equivalentes en Windows'],
 ['Rol Servidor DHCP · Ámbito nuevo','wsv','Crear el servicio y el ámbito'],['Reservas → Reserva nueva','wsv','Fijar una IP por MAC']],
fails:[
 ['pink','Servicio failed al arrancar','Error de sintaxis o falta la interfaz. <code>sudo dhcpd -t -cf /etc/dhcp/dhcpd.conf</code> indica la línea; revisa los <code>;</code> y las llaves.'],
 ['','Not configured to listen on any interfaces','<code>INTERFACESv4</code> está vacío en <code>/etc/default/isc-dhcp-server</code>.'],
 ['blue','No subnet declaration for enp0s3','La IP fija del servidor no está dentro de ninguna subred declarada en dhcpd.conf.'],
 ['green','El cliente recibe 10.0.2.15 o no recibe IP','Redes internas con nombres distintos, servicio parado o cliente en NAT. Mismo nombre de red interna en ambas VM.'],
 ['orange','El cliente se queda en 169.254.x.x','Ningún DHCP responde (servicio parado, ámbito sin activar o redes distintas).'],
 ['pink','netplan apply da error','Sangría mal o tabuladores. Usa solo espacios y revisa los dos puntos y los corchetes.'],
 ['blue','VERR_SVM_DISABLED / VERR_VMX_NO_VMX','Virtualización desactivada: activa SVM (AMD) o Intel VT-x en la BIOS.'],
 ['green','El guion sale como /','Teclado en inglés: <code>sudo loadkeys es</code> y <code>sudo localectl set-keymap es</code>.'],
 ['orange','Windows: ámbito con flecha roja','Aún no está activado o el servidor no está autorizado (Active Directory).']],
exCats:{Cuestiones:'#13893f',Binario:'#c76a05',Subredes:'#1a6fd6',Máscaras:'#d93b55',DHCP:'#4f46e5'},
ex:[
 ['e1','Cuestiones','Modelo y arquitectura · P2P y cliente-servidor','Diferencia entre modelo y arquitectura de red, y entre igual a igual y cliente-servidor.',
  'Modelo de red: describe las capas y funciones de la comunicación (OSI, TCP/IP).\nArquitectura de red: cómo se organizan físicamente los equipos y el reparto de funciones.\n\nP2P: todos son clientes y servidores a la vez, sin elemento central.\nCliente-servidor: un proceso pide y otro presta el servicio; el servidor centraliza.',
  '','','Orienta la respuesta a la idea: modelo = capas/protocolos; arquitectura = organización de los equipos.'],
 ['e2','Cuestiones','TCP frente a UDP y funciones de la IP','Diferencias entre TCP y UDP. Funciones de red de las direcciones IP.',
  'TCP: orientado a conexión, fiable, ordena y confirma los datos (web, correo, SSH).\nUDP: sin conexión, sin confirmaciones, más rápido (DHCP, DNS, streaming).\n\nFunciones de la IP: identificar una interfaz en la red y permitir el encaminamiento (parte de red + parte de host).',
  '','','DHCP usa UDP: cliente 68, servidor 67.'],
 ['e3','Cuestiones','Direcciones especiales (ordenador 192.168.5.65/24)','Qué significan 0.0.0.0, 0.0.0.29, 192.168.67.0, 255.255.255.255, 192.130.10.255 y 127.0.0.1.',
  '0.0.0.0           → esta red / dirección sin asignar\n0.0.0.29          → host 29 de «esta red» (origen en arranque)\n192.168.67.0      → dirección de red de otra red privada (192.168.67.0/24)\n255.255.255.255   → broadcast limitado: todos los equipos de la red propia\n192.130.10.255    → broadcast dirigido de la red 192.130.10.0/24\n127.0.0.1         → loopback: el propio equipo',
  '','','Ningún host usa dirección de red ni de broadcast.'],
 ['e4','Binario','IP a binario y clase','Convierte a binario y di la clase: 10.0.3.2, 128.45.7.1, 192.200.5.4, 151.23.32.50, 47.50.3.2, 100.90.80.70, 124.45.6.1.',
  '10.0.3.2       00001010.00000000.00000011.00000010  A\n128.45.7.1     10000000.00101101.00000111.00000001  B\n192.200.5.4    11000000.11001000.00000101.00000100  C\n151.23.32.50   10010111.00010111.00100000.00110010  B\n47.50.3.2      00101111.00110010.00000011.00000010  A\n100.90.80.70   01100100.01011010.01010000.01000110  A\n124.45.6.1     01111100.00101101.00000110.00000001  A',
  '','','Usa el conversor de la teoría para comprobarlo.'],
 ['e5','Binario','142.226.0.15: preguntas rápidas','Binario del 2.º octeto, clase, red, ¿host válido?, hosts máximos C, redes B…',
  'a) 226 = 11100010\nb) Clase B (128-191)\nc) 142.226.0.0\nd) Sí es host válido\ne) No es ni red (host a 0) ni broadcast (host a 1): 0.15\nf) Clase C: 2⁸ − 2 = 254 hosts\ng) Redes clase B: 2¹⁴ = 16.384\nh) Hosts por red B: 2¹⁶ − 2 = 65.534\ni) 4 octetos\nj) 8 bits por octeto',
  '','','Clase B: 1.er octeto 128-191; red = 2 octetos, host = 2 octetos.'],
 ['e6','Subredes','192.168.25.0 en 4 subredes','Máscara y tabla de subredes.',
  'Máscara: 255.255.255.192 (/26) · 62 hosts/subred\n\n#  Subred           Primero          Último\n1  192.168.25.0     192.168.25.1     192.168.25.62\n2  192.168.25.64    192.168.25.65    192.168.25.126\n3  192.168.25.128   192.168.25.129   192.168.25.190\n4  192.168.25.192   192.168.25.193   192.168.25.254',
  '','','2 bits prestados → 2² = 4 subredes; salto 256 − 192 = 64.'],
 ['e7','Subredes','192.168.150.0 en 8 subredes','Máscara y tabla de subredes.',
  'Máscara: 255.255.255.224 (/27) · 30 hosts/subred\n\n1  .0    .1   – .30\n2  .32   .33  – .62\n3  .64   .65  – .94\n4  .96   .97  – .126\n5  .128  .129 – .158\n6  .160  .161 – .190\n7  .192  .193 – .222\n8  .224  .225 – .254\n(todas con prefijo 192.168.150.)',
  '','','3 bits prestados → 8 subredes; salto 32.'],
 ['e8','Subredes','Clase B 150.40.0.0 (y 160.20.0.0) en 4 subredes','Máscara y tabla.',
  'Máscara: 255.255.192.0 (/18) · 16.382 hosts/subred\n\n1  150.40.0.0     150.40.0.1     – 150.40.63.254\n2  150.40.64.0    150.40.64.1    – 150.40.127.254\n3  150.40.128.0   150.40.128.1   – 150.40.191.254\n4  150.40.192.0   150.40.192.1   – 150.40.255.254\n\n(160.20.0.0: igual, cambiando 150.40 por 160.20)',
  '','','En clase B se toman bits del 3.er octeto.'],
 ['e9','Subredes','200.10.57.0 en 3 y en 8 subredes','Máscara, hosts, red y broadcast; binario y bits prestados.',
  '3 subredes → hacen falta 2 bits (4 subredes): 255.255.255.192\nHosts por subred: 62\nRedes/broadcast: .0 / .63 · .64 / .127 · .128 / .191\n\n8 subredes:\n- 200.10.57.0 = 11001000.00001010.00111001.00000000\n- Red: 3 primeros octetos · Host: el 4.º\n- Bits prestados: 3\n- Máscara: 255.255.255.224\n- Binario: 11111111.11111111.11111111.11100000',
  '','','Con 3 subredes se desperdicia una de las 4.'],
 ['e10','Máscaras','Tabla IP / máscara / subred / broadcast','Completa las filas del ejercicio 11.',
  '10.1.1.3    255.255.0.0      → 10.1.0.0     bc 10.1.255.255\n10.1.1.8    255.255.0.0      → 10.1.0.0     bc 10.1.255.255\n200.1.1.23  255.0.0.0        → 200.0.0.0    bc 200.255.255.255\n172.16.8.48 255.255.248.0    → 172.16.8.0   bc 172.16.15.255\n172.16.8.48 255.255.255.224  → 172.16.8.32  bc 172.16.8.63',
  '','','Salto de 8 en el 3.er octeto (/21) y de 32 en el 4.º (/27).'],
 ['e11','Máscaras','Red y broadcast por clase (ej. 13)','216.14.55.137, 123.1.1.15, 150.127.221.224, 194.125.35.199, 175.12.239.244.',
  '216.14.55.137    C  red 216.14.55.0     bc 216.14.55.255     255.255.255.0\n123.1.1.15       A  red 123.0.0.0       bc 123.255.255.255   255.0.0.0\n150.127.221.224  B  red 150.127.0.0     bc 150.127.255.255   255.255.0.0\n194.125.35.199   C  red 194.125.35.0    bc 194.125.35.255    255.255.255.0\n175.12.239.244   B  red 175.12.0.0      bc 175.12.255.255    255.255.0.0',
  '','','Hosts válidos: de red+1 a broadcast−1.'],
 ['e12','Máscaras','Direcciones con máscara (a–h)','Red y broadcast de cada IP con su máscara por defecto o indicada.',
  'a) 18.120.16.250          red 18.0.0.0        bc 18.255.255.255\nb) 18.120.16.255/16       red 18.120.0.0      bc 18.120.255.255\nc) 155.4.220.39           red 155.4.0.0       bc 155.4.255.255\nd) 194.209.14.33          red 194.209.14.0    bc 194.209.14.255\ne) 190.33.109.133/24      red 190.33.109.0    bc 190.33.109.255\nf) 190.33.109.133/25      red 190.33.109.128  bc 190.33.109.255\ng) 192.168.20.25/28       red 192.168.20.16   bc 192.168.20.31\nh) 192.168.20.25/26       red 192.168.20.0    bc 192.168.20.63',
  '','','Sin máscara indicada se usa la de su clase.'],
 ['e13','Máscaras','Ejercicios 12 y 18: red, rango y nodos','147.84.32.0/30, 140.220.15.245/28, máscara 255.255.240.0 y 150.84.32.0/27.',
  '147.84.32.0 /30  → red 147.84.32.0 · bc 147.84.32.3 · nodos .1 y .2\n192.168.0.0      → clase C (rango privado)\n140.220.15.245/28→ red .240 · hosts .241 – .254 · bc .255\nMáscara 255.255.240.0 (clase B) → 12 bits de host → 2¹² − 2 = 4.094 nodos\n150.84.32.0/27   → red 150.84.32.0 · bc 150.84.32.31 · nodos .1 – .30\n150.84.32.245/28 → red 150.84.32.240 · hosts .241 – .254 · bc .255',
  '','','Hosts = 2^(bits de host) − 2.'],
 ['e14','Máscaras','Máximo de ordenadores por clase (ej. 14)','Clase A, B, C y C con /25 y /26.',
  'Clase A: 2²⁴ − 2 = 16.777.214\nClase B: 2¹⁶ − 2 = 65.534\nClase C: 2⁸ − 2 = 254\nClase C con 255.255.255.128: 2⁷ − 2 = 126\nClase C con 255.255.255.192: 2⁶ − 2 = 62',
  '','','Siempre restar red y broadcast.'],
 ['e15','Subredes','Clase B 150.10.0.0 en 3 subredes','Máscara, hosts por subred, red y broadcast.',
  'Hacen falta 2 bits (4 subredes) → 255.255.192.0 (/18)\nHosts por subred: 2¹⁴ − 2 = 16.382\n\n150.10.0.0    bc 150.10.63.255\n150.10.64.0   bc 150.10.127.255\n150.10.128.0  bc 150.10.191.255',
  '','','Igual que el ejercicio de clase C, pero con bits del 3.er octeto.'],
 ['e16','DHCP','Examen DHCP · Ejercicio A (Ubuntu)','Instalar isc-dhcp-server, IP fija, dhcpd.conf, cliente y leases.',
  'A) sudo apt-get install isc-dhcp-server\nB) netplan: dhcp4: false + addresses: [IP/prefijo]; sudo netplan apply; ip a\nC) /etc/default/isc-dhcp-server → INTERFACESv4="enp0s3"\n   /etc/dhcp/dhcpd.conf → authoritative, lease 600/7200, subnet con 2 range, routers,\n   DNS y dominio; dhcpd -t; systemctl restart; systemctl status\nD) Cliente clonado: ip a debe mostrar una IP de uno de los range\nE) sudo cat /var/lib/dhcp/dhcpd.leases: lease, starts, ends, binding state active, hardware ethernet',
  'sudo apt-get install isc-dhcp-server\nsudo netplan apply\nsudo dhcpd -t -cf /etc/dhcp/dhcpd.conf\nsudo systemctl restart isc-dhcp-server\nsudo systemctl status isc-dhcp-server\nsudo cat /var/lib/dhcp/dhcpd.leases',
  'Active: active (running)\nListening on LPF/enp0s3/...\nlease 10.12.34.100 { binding state active; ... }','El examen fue el 29/10: cada apartado pedía una captura con tu nombre visible.'],
 ['e17','DHCP','Examen DHCP · Ejercicio B (Windows)','Cliente Windows con IP estática.',
  'Propiedades del adaptador → Protocolo de Internet versión 4 (TCP/IPv4) → «Usar la siguiente dirección IP»:\n- Dirección IP, máscara y puerta de enlace\n- DNS preferido y alternativo\n\nComprobar con ipconfig en cmd.',
  'ipconfig\nipconfig /all','Dirección IPv4, máscara y puerta de enlace con los valores configurados','La captura A muestra el cuadro de propiedades; el apartado B pedía la comprobación con ipconfig.']],
qa:[
 ['¿Qué puertos usa DHCP?','El cliente usa el puerto UDP 68 y el servidor el UDP 67. El Discover va en broadcast: 0.0.0.0:68 → 255.255.255.255:67.'],
 ['¿Qué mensaje envía el cliente para localizar servidores?','DHCPDISCOVER, en broadcast, porque aún no tiene IP ni conoce al servidor.'],
 ['Un cliente muestra 169.254.12.7: ¿qué ha pasado?','Que no ha encontrado ningún servidor DHCP y se ha autoasignado una dirección APIPA (enlace local). Tiene red local pero no puerta de enlace ni DNS.'],
 ['¿Qué es una reserva y para qué sirve?','Una asignación definitiva por MAC: el dispositivo recibe siempre la misma IP aunque se apague o caduque la concesión. Se usa con servidores y equipos importantes.'],
 ['¿Para qué sirve un DHCP Relay Agent?','Para reenviar los broadcast DHCP de una subred al servidor de otra, porque el broadcast no atraviesa routers. Sin relay, cada subred necesita su propio servidor.'],
 ['¿Qué puertos del switch son de confianza en el snooping?','Los del servidor DHCP legítimo, los troncales y los relays. El resto son no fiables y se descartan los mensajes de otros servidores.'],
 ['¿Qué diferencia hay entre default-lease-time y max-lease-time?','default es lo que dura la concesión si el cliente no pide otro tiempo; max es el máximo aunque el cliente pida más.'],
 ['¿Qué es T1 y cuándo se produce con 1200 s?','T1 es el tiempo de renovación: el 50 % de la concesión. Con 1200 s es a los 600 s; con 600 s sería a los 300 s. T2 (rebinding) es el 87,5 %.'],
 ['¿Para qué sirve authoritative?','Indica que ese es el servidor oficial de la red: si un cliente trae una IP que no corresponde, el servidor se lo dice (NAK) y le da una correcta.'],
 ['¿Por qué la IP reservada puede estar fuera de los rangos?','Porque la reserva no depende del range: se asigna por MAC. De hecho conviene que esté fuera para que no se conceda a otro equipo.'],
 ['¿Qué ocurre si agotas el primer rango?','El servidor sigue con el siguiente range; si se agotan todos, los clientes nuevos no reciben IP.'],
 ['¿Dirección de red y broadcast de 10.20.30.40/8?','Máscara 255.0.0.0 → red 10.0.0.0 y broadcast 10.255.255.255.']]
};
})();
