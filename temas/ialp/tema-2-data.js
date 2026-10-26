/* IALP · Tema 2 — contenido: estructuras de control básicas y programación estructurada (UT2) */
(function(){
const H=window.H;
const arrows=(id)=>H.marker(id);
/* diagrama de un condicional doble */
const ifSvg=(()=>{const id=H.mk();return H.dia(arrows(id)+
 '<rect x="20" y="85" width="90" height="46" rx="23" fill="var(--ink)"/><text x="65" y="113" text-anchor="middle" class="svg-t" fill="var(--bg)" font-size="14">Inicio</text>'+
 '<path d="M112 108H160" stroke="var(--muted)" stroke-width="2.5" class="flow" marker-end="url(#'+id+')"/>'+
 '<polygon points="235,60 310,108 235,156 160,108" fill="var(--sky-soft)" stroke="var(--sky)" stroke-width="2.5" class="pulse"/><text x="235" y="113" text-anchor="middle" class="svg-m" font-size="13" fill="var(--ink)" font-weight="700">¿condición?</text>'+
 '<path d="M235 60V30H430" stroke="var(--acc)" stroke-width="2.5" fill="none" class="flow" marker-end="url(#'+id+')"/><text x="250" y="48" class="svg-m" font-size="12" fill="var(--acc)" font-weight="700">Verdadero</text>'+
 '<path d="M235 156V190H430" stroke="var(--rose)" stroke-width="2.5" fill="none" class="flow" marker-end="url(#'+id+')"/><text x="250" y="182" class="svg-m" font-size="12" fill="var(--rose)" font-weight="700">Falso</text>'+
 '<rect x="432" y="8" width="170" height="44" rx="12" fill="var(--acc-soft)" stroke="var(--acc)"/><text x="517" y="35" text-anchor="middle" class="svg-m" font-size="12.5" fill="var(--ink)">bloque del SI</text>'+
 '<rect x="432" y="168" width="170" height="44" rx="12" fill="var(--rose-soft)" stroke="var(--rose)"/><text x="517" y="195" text-anchor="middle" class="svg-m" font-size="12.5" fill="var(--ink)">bloque del SINO</text>'+
 '<path d="M604 30H660V100M604 190H660V120" stroke="var(--muted)" stroke-width="2" fill="none" stroke-dasharray="4 4"/>'+
 '<rect x="625" y="100" width="100" height="22" rx="11" fill="var(--ink)"/><text x="675" y="116" text-anchor="middle" class="svg-t" fill="var(--bg)" font-size="12">continúa</text>',
 'Solo se ejecuta uno de los dos bloques, según el resultado de la condición.','0 0 760 225','Diagrama de flujo de un condicional doble')})();
/* diagramas de bucles */
const whileSvg=(()=>{const id=H.mk();return H.dia(arrows(id)+
 '<polygon points="150,40 230,88 150,136 70,88" fill="var(--sky-soft)" stroke="var(--sky)" stroke-width="2.5" class="pulse"/><text x="150" y="92" text-anchor="middle" class="svg-m" font-size="12.5" fill="var(--ink)" font-weight="700">¿contador &lt; 5?</text>'+
 '<path d="M230 88H330" stroke="var(--acc)" stroke-width="2.5" class="flow" marker-end="url(#'+id+')"/><text x="260" y="80" class="svg-m" font-size="12" fill="var(--acc)" font-weight="700">sí</text>'+
 '<rect x="332" y="62" width="190" height="52" rx="12" fill="var(--amber-soft)" stroke="var(--amber)"/><text x="427" y="85" text-anchor="middle" class="svg-m" font-size="12" fill="var(--ink)">Escribir contador</text><text x="427" y="104" text-anchor="middle" class="svg-m" font-size="12" fill="var(--ink)">contador = contador + 1</text>'+
 '<path d="M427 114V170H150V138" stroke="var(--violet)" stroke-width="2.5" fill="none" class="flow" marker-end="url(#'+id+')"/><text x="290" y="188" text-anchor="middle" class="svg-m" font-size="12" fill="var(--violet)" font-weight="700">vuelve a evaluar la condición</text>'+
 '<path d="M150 40V15H610V70" stroke="var(--rose)" stroke-width="2.5" fill="none" class="flow" marker-end="url(#'+id+')"/><text x="380" y="30" text-anchor="middle" class="svg-m" font-size="12" fill="var(--rose)" font-weight="700">no: sale del bucle</text>'+
 '<rect x="560" y="72" width="100" height="32" rx="16" fill="var(--ink)"/><text x="610" y="93" text-anchor="middle" class="svg-t" fill="var(--bg)" font-size="12">continúa</text>',
 'En el Mientras la condición se evalúa ANTES de cada vuelta: si es falsa de entrada, el cuerpo no se ejecuta ni una vez.','0 0 760 205','Diagrama de flujo del bucle Mientras')})();
const repSvg=(()=>{const id=H.mk();return H.dia(arrows(id)+
 '<rect x="40" y="55" width="190" height="52" rx="12" fill="var(--amber-soft)" stroke="var(--amber)"/><text x="135" y="78" text-anchor="middle" class="svg-m" font-size="12" fill="var(--ink)">Escribir contador</text><text x="135" y="97" text-anchor="middle" class="svg-m" font-size="12" fill="var(--ink)">contador = contador + 1</text>'+
 '<path d="M232 81H300" stroke="var(--muted)" stroke-width="2.5" class="flow" marker-end="url(#'+id+')"/>'+
 '<polygon points="380,36 460,84 380,132 300,84" fill="var(--sky-soft)" stroke="var(--sky)" stroke-width="2.5" class="pulse"/><text x="380" y="88" text-anchor="middle" class="svg-m" font-size="12.5" fill="var(--ink)" font-weight="700">¿contador ≥ 5?</text>'+
 '<path d="M460 84H560" stroke="var(--acc)" stroke-width="2.5" class="flow" marker-end="url(#'+id+')"/><text x="490" y="76" class="svg-m" font-size="12" fill="var(--acc)" font-weight="700">sí: termina</text>'+
 '<rect x="562" y="68" width="100" height="32" rx="16" fill="var(--ink)"/><text x="612" y="89" text-anchor="middle" class="svg-t" fill="var(--bg)" font-size="12">continúa</text>'+
 '<path d="M380 132V180H135V109" stroke="var(--rose)" stroke-width="2.5" fill="none" class="flow" marker-end="url(#'+id+')"/><text x="258" y="198" text-anchor="middle" class="svg-m" font-size="12" fill="var(--rose)" font-weight="700">no: otra vuelta</text>',
 'En el Repetir-Hasta la condición se evalúa DESPUÉS: el cuerpo se ejecuta siempre, al menos una vez.','0 0 760 205','Diagrama de flujo del bucle Repetir hasta')})();

window.TEMA={
key:'ia2',rank:'ialp2-ranking',
allDone:'🏆 ¡Todos los pasos del tema hechos!',
typer:[['p','$ ','python nota.py'],['o','','Nota: 7.5\nNotable'],
  ['p','>> ','for i in range(0, 10, 2): print(i)'],['o','','0 2 4 6 8'],
  ['p','>> ','Mientras contador < 5 Hacer'],['o','','  Escribir contador   // 0 1 2 3 4'],
  ['p','>> ','match opcion: case 1: ...'],['o','','→ Alta'],['c','','# ¿Listo para el test? 🔥']],
levels:[[0,'Novato del flujo','🐣'],[120,'Aprendiz de if','🔀'],[300,'Domador del while','🔁'],[600,'Maestro del for','🎯'],[1000,'Señor de los bucles','♾️'],[1600,'Cazador de bugs','🐞'],[2400,'Arquitecto de lógica','🏗️'],[3400,'Ninja del algoritmo','🥷'],[4800,'Gurú de Python','🐍'],[6500,'Leyenda del código','👑']],
where:{pse:['w-vb','PSeInt','PSeInt'],py:['w-xu','Python','Python'],vs:['w-vs','VS Code','Python'],win:['w-win','Terminal','terminal'],gh:['w-gh','Repasar','Notas']},

sections:[
/* 1 */{id:'t-secuencial',title:'Estructuras secuenciales',short:'Secuenciales',sub:'Las instrucciones se ejecutan una tras otra, en el orden en que están escritas.',c:'#8b3fc9',html:
 H.p('Las <b>estructuras secuenciales</b> son aquellas que se ejecutan una tras otra a modo de secuencia: una instrucción no se ejecuta hasta que finaliza la anterior.')+
 H.flow([['Instrucción 1','declarar','sky'],['Instrucción 2','asignar','acc'],['Instrucción 3','leer','amber'],['Instrucción n','escribir','violet']],'Cada instrucción empieza cuando termina la anterior. No hay saltos ni repeticiones.')+
 H.cards([['📝','Declaración','Variables y constantes.<br><code>VAR edad: ENTERO;</code><br><code>VAR nombre: CADENA;</code>','sky'],['⬅️','Asignación','Guardar un valor.<br><code>a ← a + 1</code><br><code>a ← 45</code>','acc'],['⌨️','Lectura','Pedir un dato.<br><code>Leer a</code>','amber'],['🖥️','Escritura','Mostrar un resultado.<br><code>Escribir "Hola mundo"</code>','violet']],4)+
 H.note('info','Los 4 tipos','Declaración de variables y constantes, asignación, lectura y escritura. Con solo estas cuatro se escriben los programas más sencillos.')+
 H.grid(2,H.code('Proceso Secuencia\n  Definir a Como Entero\n  a <- 45\n  a <- a + 1\n  Escribir "Hola mundo"\n  Escribir a\nFinProceso','PSeInt · secuencial'),H.code('a = 45\na = a + 1\nprint("Hola mundo")\nprint(a)','Python · secuencial'))+
 H.posts([['','El orden importa','Si imprimes a antes de asignarla, la variable aún no tiene valor (en Python, error NameError).'],['pink','Error típico','Leer un dato después de usarlo en un cálculo.']])},

/* 2 */{id:'t-es',title:'Variables y entrada/salida',short:'Variables y E/S',sub:'Pseudocódigo frente a Python, con formato de salida.',c:'#1a6fd6',html:
 H.p('Lo básico de leer y mostrar datos, ahora en los dos lenguajes en paralelo.')+
 H.tbl(['Pseudocódigo','Python'],[['<code>VAR edad: ENTERO</code>','<code>edad = int(input("Introduce tu edad: "))</code>'],['<code>VAR nombre: CADENA</code>','<code>nombre = input("Introduce tu nombre: ")</code>'],['<code>Leer edad</code> · <code>Leer nombre</code>','(el <code>input</code> de arriba ya lee)'],['<code>Escribir "Hola"</code>','<code>print("Hola")</code>'],['<code>Escribir edad</code>','<code>print(edad)</code>']],'sky')+
 H.cards([['⌨️','input()','Lee texto.','sky'],['🔢','int(input())','Lee enteros.','acc'],['🔣','float(input())','Lee decimales.','amber'],['🖥️','print()','Muestra información.','violet']],4)+
 H.h3('Formato de salida con f-strings')+
 H.grid(2,H.code('# Leer datos\nnombre = input("Nombre: ")\nedad = int(input("Edad: "))\nnota = float(input("Nota: "))','Python · leer'),H.code('# Mostrar datos\nprint(f"Alumno: {nombre}")\nprint(f"Edad: {edad} años")\nprint(f"Nota: {nota:.2f}")','Python · mostrar'))+
 H.tbl(['Se escribe','Qué hace'],[['<code>f"…"</code>','cadena con variables dentro'],['<code>{variable}</code>','inserta el valor de la variable'],['<code>{dato:.2f}</code>','muestra 2 decimales']],'violet')+
 H.out('Alumno: Ana\nEdad: 17 años\nNota: 8.50')+
 H.note('warn','Sin la f no funciona','<code>print("Edad: {edad}")</code> escribe literalmente {edad}. Hace falta la <b>f</b> delante de las comillas.')},

/* 3 */{id:'t-oper',title:'Operaciones en Python',short:'Operadores',sub:'Aritméticos, relacionales y lógicos.',c:'#c76a05',html:
 H.p('Los operadores de Python se dividen igual que las expresiones del Tema 1: aritméticos, relacionales y lógicos.')+
 H.grid(3,
  H.tbl(['Aritmético','Ej.','Resultado'],[['<code>+</code> suma','<code>7 + 2</code>','9'],['<code>-</code> resta','<code>7 - 2</code>','5'],['<code>*</code> producto','<code>7 * 2</code>','14'],['<code>/</code> división','<code>7 / 2</code>','3.5'],['<code>//</code> entera','<code>7 // 2</code>','3'],['<code>%</code> resto','<code>7 % 2</code>','1'],['<code>**</code> potencia','<code>7 ** 2</code>','49']],'amber'),
  H.tbl(['Relacional','Ej.','Resultado'],[['<code>==</code> igual','<code>3 == 3</code>','True'],['<code>!=</code> distinto','<code>3 != 3</code>','False'],['<code>&gt;</code> mayor','<code>5 &gt; 3</code>','True'],['<code>&lt;</code> menor','<code>5 &lt; 3</code>','False'],['<code>&gt;=</code> mayor o igual','<code>5 &gt;= 5</code>','True'],['<code>&lt;=</code> menor o igual','<code>4 &lt;= 3</code>','False']],'sky'),
  H.tbl(['Lógico','Significa','Ej.'],[['<code>and</code>','los dos','<code>a &gt; 0 and a &lt; 10</code>'],['<code>or</code>','al menos uno','<code>a &lt; 0 or a &gt; 10</code>'],['<code>not</code>','lo contrario','<code>not (a == 0)</code>']],'rose'))+
 H.posts([['pink','= no es ==','<code>nota = 5</code> asigna; <code>nota == 5</code> compara. Confundirlos es el error más típico.'],['blue','Prioridad','Paréntesis → <code>**</code> → <code>* / // %</code> → <code>+ -</code> → comparaciones → <code>not</code> → <code>and</code> → <code>or</code>.'],['','Atajos de asignación','<code>x += 1</code> equivale a <code>x = x + 1</code>; también <code>-=</code>, <code>*=</code>, <code>/=</code>.']])+
 H.code('a = 17\nb = 5\nprint(a / b)    # 3.4\nprint(a // b)   # 3\nprint(a % b)    # 2\nprint(a ** 2)   # 289\nprint(a > b and b > 0)   # True','Python · operadores')},

/* 4 */{id:'t-si',title:'Condicional simple y doble',short:'Si / Sino',sub:'Bifurcar la ejecución según se cumpla o no una condición.',c:'#d93b55',html:
 H.p('Las <b>estructuras condicionales</b> permiten bifurcar la ejecución de un programa de acuerdo con una condición: definen un bloque de código que se ejecutará dependiendo de si se cumple o no.')+
 ifSvg+
 H.grid(2,H.card('1️⃣','1. Simple','Un solo bloque que se ejecuta <b>si</b> la condición es cierta. Si no, no pasa nada.','acc'),H.card('2️⃣','2. Doble','Dos bloques: uno si es cierta y otro (<b>Sino</b>) si es falsa. Siempre se ejecuta exactamente uno.','sky'))+
 H.grid(2,H.code('// Simple\nSi edad >= 18 Entonces\n  Escribir "Mayor de edad"\nFinSi\n\n// Doble\nSi edad >= 18 Entonces\n  Escribir "Mayor de edad"\nSino\n  Escribir "Menor de edad"\nFinSi','PSeInt · Si'),H.code('# Simple\nif edad >= 18:\n    print("Mayor de edad")\n\n# Doble\nif edad >= 18:\n    print("Mayor de edad")\nelse:\n    print("Menor de edad")','Python · if'))+
 H.note('warn','En Python la sangría es la sintaxis','Los bloques no llevan FinSi: el código que está <b>sangrado</b> (4 espacios) bajo el <code>if</code> pertenece a él. Los dos puntos <code>:</code> al final de cada línea son obligatorios.')+
 H.posts([['pink','Error típico','Escribir <code>if edad = 18:</code> con un solo igual: da error de sintaxis. Se compara con <code>==</code>.'],['','Cuidado con la sangría','Si el print no está sangrado, se ejecuta siempre, se cumpla o no la condición.']])},

/* 5 */{id:'t-elif',title:'Condiciones anidadas y elif',short:'Anidadas y elif',sub:'Varias condiciones encadenadas: Sino Si en pseudocódigo, elif en Python.',c:'#4f46e5',html:
 H.p('Cuando hay más de dos caminos se encadenan condiciones: si no se cumple la primera, se pregunta por la segunda, y así. En PSeInt se anidan; en Python se usa <code>elif</code>.')+
 H.grid(2,H.code('SI nota >= 9 ENTONCES\n  Escribir "Sobresaliente"\nSINO\n  SI nota >= 5 ENTONCES\n    Escribir "Aprobado"\n  SINO\n    Escribir "Suspenso"\n  FIN SI\nFIN SI','Pseudocódigo · anidado'),H.code('if nota >= 9:\n    print("Sobresaliente")\nelif nota >= 5:\n    print("Aprobado")\nelse:\n    print("Suspenso")','Python · elif'))+
 H.flow([['nota ≥ 9','sí → Sobresaliente','acc'],['nota ≥ 5','sí → Aprobado','amber',true],['si no','→ Suspenso','rose']],'Se evalúan en orden y se ejecuta solo el bloque de la primera condición que sea cierta.',{h:76})+
 H.note('tip','El orden de las condiciones importa','Con nota = 9.5, la primera condición ya es cierta y no se mira el resto. Si pusieras primero <code>nota &gt;= 5</code>, un 9.5 saldría como «Aprobado».')+
 H.lab('labNota','Prueba el elif con una nota',
  '<div class="row"><label for="ntIn">Nota:</label><input type="text" id="ntIn" value="7" style="max-width:120px"></div><div class="code" data-fn="Python · elif" data-nohl id="ntCode"><pre></pre></div><div class="term-out" id="ntOut"></div>')+
 H.posts([['blue','Python también anida','Puedes poner un <code>if</code> dentro de otro sangrándolo. Si solo hay un camino lógico, <code>elif</code> es más limpio.'],['orange','Un else final','El <code>else</code> recoge todo lo que no cumplen las condiciones anteriores. Es opcional.']])},

/* 6 */{id:'t-segun',title:'Condicional múltiple: Según y match',short:'Según / match',sub:'Elegir entre varios casos según el valor de una expresión.',c:'#0c9a6a',html:
 H.p('Cuando hay muchos casos que dependen del <b>valor exacto</b> de una variable (por ejemplo una opción de menú) es más claro usar <b>Según</b> en PSeInt y <b>match</b> en Python.')+
 H.grid(2,H.code('SEGÚN opcion HACER\n  CASO 1:\n    Escribir "Alta"\n  CASO 2:\n    Escribir "Baja"\n  CASO *:\n    Escribir "Opción incorrecta"\nFIN','Pseudocódigo · Según'),H.code('match opcion:\n    case 1:\n        print("Alta")\n    case 2:\n        print("Baja")\n    case _:\n        print("Opción incorrecta")','Python · match'))+
 H.flow([['opcion = 2','el valor','sky'],['CASO 1','no coincide','amber'],['CASO 2','¡coincide!','acc',true],['CASO *','no se llega','rose']],'Se compara el valor con cada caso; el comodín final (* en PSeInt, _ en Python) recoge todo lo demás.',{h:76})+
 H.note('info','Cuándo usar cada uno','<code>Si/elif</code> sirve para <b>rangos y condiciones</b> (nota ≥ 5). <code>Según/match</code> es mejor para <b>valores concretos</b> (opción 1, 2, 3…), como los menús.')+
 H.posts([['','match necesita Python 3.10','En versiones anteriores se usa if/elif/else.'],['pink','El caso por defecto','No olvides <code>case _</code>: sin él, una opción inesperada no hace nada.']])+
 H.lab('labMatch','Menú con match',
  '<div class="row"><label for="mtIn">Opción:</label><input type="text" id="mtIn" value="2" style="max-width:120px"></div><div class="code" data-fn="Python · match" data-nohl id="mtCode"><pre></pre></div><div class="term-out" id="mtOut"></div>')},

/* 7 */{id:'t-mientras',title:'Bucle Mientras',short:'Mientras (while)',sub:'Repetir mientras se cumpla una condición que se evalúa antes de cada vuelta.',c:'#c76a05',html:
 H.p('Las <b>estructuras iterativas</b> o repetitivas permiten ejecutar más de una vez una instrucción o un bloque. El número de veces puede indicarse de forma explícita o mediante una <b>condición</b>, que se evalúa cada vez que va a comenzar la ejecución del bloque o cada vez que va a finalizar.')+
 whileSvg+
 H.grid(2,H.code('MIENTRAS contador < 5 HACER\n  Escribir contador\n  contador <- contador + 1\nFIN MIENTRAS','Pseudocódigo · Mientras'),H.code('while contador < 5:\n    print(contador)\n    contador += 1','Python · while'))+
 H.out('0\n1\n2\n3\n4')+
 H.note('bad','Bucle infinito','Si olvidas <code>contador += 1</code>, la condición nunca deja de cumplirse y el programa no termina. Para pararlo: <kbd>Ctrl</kbd>+<kbd>C</kbd>.')+
 H.lab('labWhile','Mientras paso a paso',
  '<div class="row"><label for="wlIni">contador inicial</label><input type="text" id="wlIni" value="0" style="max-width:90px"><label for="wlMax">mientras contador &lt;</label><input type="text" id="wlMax" value="5" style="max-width:90px"><button class="btn pri sm" id="wlStep" type="button">▶ Siguiente vuelta</button><button class="btn sm" id="wlRst" type="button">↺ Reiniciar</button></div><div class="cells" id="wlCells"></div><div class="term-out" id="wlOut" style="margin-top:10px"></div>')},

/* 8 */{id:'t-para',title:'Bucle Para',short:'Para (for)',sub:'Repetir un número de veces conocido: inicio, límite y paso.',c:'#0e7bbd',html:
 H.p('El bucle <b>Para</b> se usa cuando se sabe cuántas veces hay que repetir. Lleva un contador con valor inicial, una condición y un incremento.')+
 H.grid(2,H.code('PARA i = 0 MIENTRAS i < 10 CON i = i + 2 HACER\n  Escribir i\nFIN PARA','Pseudocódigo · Para'),H.code('for i in range(0, 10, 2):\n    print(i)','Python · for'))+
 H.out('0\n2\n4\n6\n8')+
 H.cards([['🏁','Inicio','Valor con el que empieza i (aquí 0). Se incluye.','acc'],['🛑','Límite','Valor en el que se detiene. <b>No</b> se incluye en Python: range(0, 10) llega hasta 9.','rose'],['👣','Paso','Lo que se suma a i en cada vuelta (aquí 2). Si es negativo, cuenta hacia atrás.','sky']])+
 H.tbl(['range(…)','Genera'],[['<code>range(5)</code>','0 1 2 3 4'],['<code>range(1, 6)</code>','1 2 3 4 5'],['<code>range(0, 10, 2)</code>','0 2 4 6 8'],['<code>range(5, 0, -1)</code>','5 4 3 2 1'],['<code>range(10, 0, -3)</code>','10 7 4 1']],'sky')+
 H.lab('labRange','Visualizador de range(inicio, fin, paso)',
  '<div class="row"><label for="rgA">inicio</label><input type="text" id="rgA" value="0" style="max-width:80px"><label for="rgB">fin (no incluido)</label><input type="text" id="rgB" value="10" style="max-width:80px"><label for="rgC">paso</label><input type="text" id="rgC" value="2" style="max-width:80px"></div><div class="cells" id="rgCells"></div><div class="term-out" id="rgOut" style="margin-top:10px"></div>')+
 H.posts([['pink','Error típico','Esperar que <code>range(1, 5)</code> incluya el 5: llega hasta el 4.'],['','Para cuenta hacia atrás','<code>PARA i = n MIENTRAS i &gt;= 1 CON i = i - 1</code> ⇒ <code>range(n, 0, -1)</code>.']])},

/* 9 */{id:'t-repetir',title:'Bucle Repetir hasta',short:'Repetir hasta',sub:'El cuerpo se ejecuta al menos una vez y la condición se evalúa al final.',c:'#d93b55',html:
 H.p('En <b>Repetir … Hasta</b> la condición se comprueba <b>después</b> de ejecutar el bloque, por lo que éste se ejecuta como mínimo una vez. Python no tiene este bucle: se simula con <code>while True</code> y <code>break</code>.')+
 repSvg+
 H.grid(2,H.code('REPETIR\n  Escribir contador\n  contador <- contador + 1\nHASTA contador >= 5','Pseudocódigo · Repetir'),H.code('while True:\n    print(contador)\n    contador += 1\n    if contador >= 5:\n        break','Python · while True + break'))+
 H.note('warn','No existe en Python','El bucle <b>Repetir hasta</b> «No existe, se puede simular con if y break»: la condición de salida del <i>Hasta</i> pasa a ser la condición del <code>if … break</code>.')+
 H.grid(2,H.card('🔁','Hasta / break','El bucle se repite hasta que la condición sea <b>verdadera</b>. El if-break sale cuando se cumple.','acc'),H.card('⚖️','Mientras','El bucle se repite mientras la condición sea verdadera: se sale cuando es <b>falsa</b>.','sky'))+
 H.posts([['green','Uso típico','Validar entradas: pedir un dato hasta que sea correcto (<code>REPETIR Leer nota HASTA nota &gt;= 0 Y nota &lt;= 10</code>).'],['pink','Atención al signo','Repetir-Hasta usa la condición de <b>salida</b>; Mientras, la de <b>continuar</b>. Son opuestas.']])},

/* 10 */{id:'t-patrones',title:'Patrones habituales con bucles',short:'Patrones',sub:'Contador, acumulador, máximo/mínimo y comprobar si algo es primo.',c:'#8b3fc9',html:
 H.p('Casi todos los ejercicios del tema son combinaciones de unos pocos patrones. Reconocerlos ahorra mucho tiempo.')+
 H.cards([['🔢','Contador','Cuenta cuántas veces ocurre algo.<br><code>cont += 1</code>','acc'],['➕','Acumulador','Suma valores a un total.<br><code>suma += x</code>','sky'],['🏆','Máximo / mínimo','Se parte del primer valor y se compara.<br><code>if x &gt; mayor: mayor = x</code>','amber'],['🚩','Bandera','Una variable True/False que recuerda si pasó algo.<br><code>primo = False</code>','violet']],4)+
 H.h3('Suma, mayor y menor de N valores (ejercicio 14)')+
 H.code('n = int(input("¿Cuántos valores? "))\nsuma = 0\nfor i in range(n):\n    x = float(input(f"Valor {i + 1}: "))\n    suma += x\n    if i == 0:\n        mayor = menor = x\n    elif x > mayor:\n        mayor = x\n    elif x < menor:\n        menor = x\nprint(f"Suma: {suma}  Mayor: {mayor}  Menor: {menor}")','Python · acumulador y extremos')+
 H.h3('¿Es primo? (ejercicio 13)')+
 H.p('Un número es <b>primo</b> si solo es divisible entre 1 y entre sí mismo. Basta probar los divisores desde 2 hasta la raíz cuadrada del número: si alguno lo divide (resto 0), no es primo.')+
 H.code('n = int(input("Número: "))\nprimo = n > 1\ni = 2\nwhile i * i <= n and primo:\n    if n % i == 0:\n        primo = False\n    i += 1\nprint("Primo" if primo else "No es primo")','Python · primo con bandera')+
 H.lab('labPrimo','Comprobador de primos',
  '<div class="row"><label for="prmIn">Número:</label><input type="text" id="prmIn" value="29" style="max-width:120px"></div><div class="cells" id="prmCells"></div><div class="term-out" id="prmOut" style="margin-top:10px"></div>')},

/* 11 */{id:'t-elegir',title:'¿Qué estructura uso?',short:'Elegir estructura',sub:'Guía rápida para decidir entre condicional y bucles.',c:'#1a6fd6',html:
 H.p('Resumen de todo el tema y cuándo usar cada estructura.')+
 H.tbl(['Estructura','Se usa cuando…','Condición','Mínimo de vueltas'],[['<b>Si / if</b>','hay que decidir entre caminos','al empezar','—'],['<b>Según / match</b>','varios valores concretos (menús)','al empezar','—'],['<b>Mientras / while</b>','no se sabe cuántas veces; puede que ninguna','<b>antes</b> de cada vuelta','0'],['<b>Para / for</b>','se sabe cuántas veces','antes (contador)','0'],['<b>Repetir / while True+break</b>','validar o repetir al menos una vez','<b>después</b> de cada vuelta','1']],'violet')+
 H.flow([['¿Decidir?','sí → Si / Según','rose'],['¿Repetir n veces?','sí → Para','sky'],['¿Repetir hasta?','sí → Mientras','amber',true],['¿Al menos 1?','sí → Repetir','acc']],'Preguntas para elegir estructura.',{h:76})+
 H.lab('labComp','Mismo bucle, tres estructuras: ¿cuántas veces se ejecuta el cuerpo?',
  '<div class="row"><label for="cpN">n =</label><input type="text" id="cpN" value="0" style="max-width:90px"><span class="muted">cuenta atrás desde n hasta 1</span></div><div class="term-out" id="cpOut"></div>')+
 H.note('tip','Truco','Con n = 0, Mientras y Para no ejecutan nada, pero Repetir-Hasta imprime el 0 una vez. Por eso Repetir es peligroso si no se controla la entrada.')+
 H.posts([['','Todos los bucles son intercambiables','Cualquier Para o Repetir puede escribirse con Mientras; la diferencia es la comodidad.'],['blue','Anidamiento','Un bucle dentro de otro (por ejemplo, para comprobar si cada número es primo) multiplica las vueltas.']])}
],

flips:{},
datos:[['Profesor','Alfonso José Padilla Navarrete'],['Unidad','UT2 · Estructuras de control'],['Ejercicios','15 de PSeInt y 7 de Python'],['Lenguajes','PSeInt y Python 3'],['Carpeta','ialp_tema2'],['Fichero Python','ialp_t2_pN.py']],
pDiagram:H.flow([['Enunciado','leer con calma','rose'],['Papel','datos, pasos y casos','amber'],['PSeInt','algoritmo','sky',true],['Python','traducción','acc'],['Casos de prueba','normal, límite, error','violet']],'Método de trabajo para cada ejercicio.',{gap:34}),
phases:[
 {t:'Preparar el trabajo',c:'#8b3fc9',s:[
  ['a1','win','Crear la carpeta del tema','Una carpeta para los .psc y .py de los ejercicios.','mkdir ialp_tema2\ncd ialp_tema2\ncode .'],
  ['a2','py','Comprobar que Python funciona','Python 3.10 o superior para poder usar match.','python --version'],
  ['a3','pse','Abrir PSeInt','Configuración → Opciones del lenguaje: perfil flexible si el profe lo indica.','']]},
 {t:'Condicionales',c:'#d93b55',s:[
  ['b1','pse','P4 · mayor, menor o igual','Con Si / Sino Si / Sino y después en Python con if/elif/else.',''],
  ['b2','pse','P5 · suma o resta','Si el primero es mayor, suma; si no, resta.',''],
  ['b3','pse','P10 · menú de dos opciones','Con Según (match en Python), dos acciones distintas y caso por defecto.',''],
  ['b4','py','P3 · mensaje de error con campo vacío','Prueba pulsando Intro sin escribir nada.','texto = input("Dato: ")\nif texto.strip() == "":\n    print("Error: no has introducido ningún dato")']]},
 {t:'Bucles',c:'#c76a05',s:[
  ['c1','pse','P1 · cuenta atrás con los 3 bucles','Mientras, Para (paso -1) y Repetir. Prueba con 0 y con 5.',''],
  ['c2','pse','P6 · pares entre 0 y 100','Con Para y paso 2.',''],
  ['c3','pse','P7 · potencia con un bucle','Multiplica base por sí misma exponente veces.',''],
  ['c4','pse','P8 · división con restas sucesivas','Cociente = veces que cabe; resto = lo que sobra.',''],
  ['c5','pse','P11 · asteriscos','Dibuja tantos * como indique el mayor.','print("*" * 5)']]},
 {t:'Algoritmos completos',c:'#0c9a6a',s:[
  ['d1','pse','P12 · capacidad de un disco duro','cilindros · pistas · sectores · 512 bytes.',''],
  ['d2','pse','P13 · número primo y primos anteriores','Bucle dentro de bucle.',''],
  ['d3','pse','P14 · suma, mayor y menor de N valores','Contador, acumulador y comparaciones.',''],
  ['d4','pse','P15 · combinación aleatoria sin repetir','Aleatorio(1, 49) y comprobar duplicados.',''],
  ['d5','py','Repasar los 7 ejercicios de Python','P1, P4, P6, P11, P12, P13 y P14 en Python.','']]}],
cheat:[
 ['Si cond Entonces … Sino … FinSi','pse','Condicional doble'],['Segun x Hacer Caso 1: … De Otro Modo: … FinSegun','pse','Condicional múltiple'],['Mientras cond Hacer … FinMientras','pse','Bucle Mientras'],['Para i <- 1 Hasta 10 Con Paso 1 Hacer … FinPara','pse','Bucle Para'],['Repetir … Hasta Que cond','pse','Bucle Repetir'],['Aleatorio(1, 49)','pse','Número entero aleatorio'],['Longitud(texto)','pse','Longitud de una cadena'],['x MOD y','pse','Resto de la división'],
 ['if / elif / else','py','Condicional (con : y sangría)'],['match x: case 1: … case _:','py','Condicional múltiple (3.10+)'],['while cond:','py','Bucle Mientras'],['for i in range(ini, fin, paso):','py','Bucle Para'],['while True: … if cond: break','py','Simula Repetir-Hasta'],['break · continue','py','Salir del bucle · saltar una vuelta'],['random.randint(1, 49)','py','Aleatorio entre 1 y 49 (import random)'],['random.sample(range(1, 50), 6)','py','6 números distintos'],['f"{x:.2f}"','py','Formatear con 2 decimales'],['"*" * n','py','Repetir un texto n veces']],
fails:[
 ['pink','IndentationError','Falta o sobra sangría. Todo el cuerpo del if/while/for debe tener la misma sangría (4 espacios).'],
 ['','SyntaxError: expected \':\'','Olvidaste los dos puntos al final de if, elif, else, while o for.'],
 ['blue','El bucle no termina','No actualizas la variable de la condición (contador += 1). Ctrl+C para parar.'],
 ['green','El for se queda corto','range(1, 5) llega hasta 4. Para llegar a 5 hay que escribir range(1, 6).'],
 ['orange','Siempre sale el mismo camino','Estás usando = en vez de == al comparar, o las condiciones de elif están en mal orden.']],
exCats:{Condicionales:'#d93b55',Bucles:'#c76a05',Cálculo:'#1a6fd6',Texto:'#4f46e5',Aleatorio:'#0c9a6a'},
ex:[
 ['p1','Bucles','Cuenta atrás con los 3 bucles','Pide un número y muestra los números de forma decreciente hasta llegar a 1 con las 3 estructuras repetitivas vistas. (También: Python nº 1)',
  'Proceso Decreciente\n  Definir n, i Como Entero\n  Escribir "Número:"\n  Leer n\n  // Mientras\n  i <- n\n  Mientras i >= 1 Hacer\n    Escribir i\n    i <- i - 1\n  FinMientras\n  // Para\n  Para i <- n Hasta 1 Con Paso -1 Hacer\n    Escribir i\n  FinPara\n  // Repetir\n  i <- n\n  Repetir\n    Escribir i\n    i <- i - 1\n  Hasta Que i < 1\nFinProceso',
  'n = int(input("Número: "))\n\n# Mientras\ni = n\nwhile i >= 1:\n    print(i)\n    i -= 1\n\n# Para\nfor i in range(n, 0, -1):\n    print(i)\n\n# Repetir hasta (simulado)\ni = n\nwhile True:\n    print(i)\n    i -= 1\n    if i < 1:\n        break',
  'Número: 3\n3 2 1   (con el Mientras)\n3 2 1   (con el Para)\n3 2 1   (con el Repetir)','El Repetir siempre escribe al menos un número, aunque n valga 0.'],
 ['p2','Texto','Tres palabras en orden inverso','Lee tres palabras y muéstralas en orden inverso.',
  'Proceso Inverso\n  Definir a, b, c Como Cadena\n  Escribir "Primera palabra:"\n  Leer a\n  Escribir "Segunda palabra:"\n  Leer b\n  Escribir "Tercera palabra:"\n  Leer c\n  Escribir c, " ", b, " ", a\nFinProceso',
  'a = input("Primera palabra: ")\nb = input("Segunda palabra: ")\nc = input("Tercera palabra: ")\nprint(c, b, a)',
  'sol, luna, estrella\nestrella luna sol','Es una estructura secuencial pura: solo cambia el orden en que se escriben.'],
 ['p3','Condicionales','Error si no se introduce ningún dato','Muestra un mensaje de error si el usuario no introduce ningún dato cuando se le solicite.',
  'Proceso ControlVacio\n  Definir texto Como Cadena\n  Escribir "Escribe algo:"\n  Leer texto\n  Si Longitud(texto) = 0 Entonces\n    Escribir "Error: no has introducido ningún dato"\n  Sino\n    Escribir "Has escrito: ", texto\n  FinSi\nFinProceso',
  'texto = input("Escribe algo: ")\nif texto.strip() == "":\n    print("Error: no has introducido ningún dato")\nelse:\n    print("Has escrito:", texto)',
  'Escribe algo: ⏎\nError: no has introducido ningún dato','strip() quita los espacios: así tampoco vale una entrada con solo espacios.'],
 ['p4','Condicionales','Mayor, menor o igual','Lee dos números y muestra si el primero es mayor, menor o igual que el segundo. (También: Python nº 2)',
  'Proceso Comparar\n  Definir a, b Como Real\n  Escribir "Primer número:"\n  Leer a\n  Escribir "Segundo número:"\n  Leer b\n  Si a > b Entonces\n    Escribir "El primero es mayor"\n  Sino\n    Si a < b Entonces\n      Escribir "El primero es menor"\n    Sino\n      Escribir "Son iguales"\n    FinSi\n  FinSi\nFinProceso',
  'a = float(input("Primer número: "))\nb = float(input("Segundo número: "))\nif a > b:\n    print("El primero es mayor")\nelif a < b:\n    print("El primero es menor")\nelse:\n    print("Son iguales")',
  '7 y 3 → El primero es mayor\n4 y 4 → Son iguales','Con dos comparaciones se cubren los tres casos: el tercero es el else.'],
 ['p5','Condicionales','Suma o resta según el mayor','Lee dos números. Si el primero es mayor que el segundo muestra su suma; en caso contrario, su resta.',
  'Proceso SumaOResta\n  Definir a, b Como Real\n  Leer a, b\n  Si a > b Entonces\n    Escribir "Suma: ", a + b\n  Sino\n    Escribir "Resta: ", a - b\n  FinSi\nFinProceso',
  'a = float(input("Primero: "))\nb = float(input("Segundo: "))\nif a > b:\n    print("Suma:", a + b)\nelse:\n    print("Resta:", a - b)',
  '8 y 3 → Suma: 11\n2 y 5 → Resta: -3','«En caso contrario» incluye también cuando son iguales.'],
 ['p6','Bucles','Pares entre 0 y 100','Muestra todos los números pares entre 0 y 100. (También: Python nº 3)',
  'Proceso Pares\n  Definir i Como Entero\n  Para i <- 0 Hasta 100 Con Paso 2 Hacer\n    Escribir i\n  FinPara\nFinProceso',
  'for i in range(0, 101, 2):\n    print(i)',
  '0 2 4 6 … 98 100','El límite de range es 101 para que el 100 se incluya. Alternativa: recorrer todos y filtrar con i % 2 == 0.'],
 ['p7','Cálculo','Potencia con un bucle','Calcula la potencia de un número leyendo base y exponente.',
  'Proceso Potencia\n  Definir base, exp, i, res Como Entero\n  Leer base, exp\n  res <- 1\n  Para i <- 1 Hasta exp Con Paso 1 Hacer\n    res <- res * base\n  FinPara\n  Escribir base, " elevado a ", exp, " = ", res\nFinProceso',
  'base = int(input("Base: "))\nexp = int(input("Exponente: "))\nres = 1\nfor i in range(exp):\n    res *= base\nprint(f"{base} elevado a {exp} = {res}")',
  'Base: 2  Exponente: 10\n2 elevado a 10 = 1024','El resultado empieza en 1 (elemento neutro del producto). Con exponente 0 devuelve 1, correcto.'],
 ['p8','Cálculo','División con restas sucesivas','Realiza una división mediante restas sucesivas mostrando cociente y resto.',
  'Proceso Division\n  Definir dividendo, divisor, cociente Como Entero\n  Leer dividendo, divisor\n  Si divisor = 0 Entonces\n    Escribir "No se puede dividir entre 0"\n  Sino\n    cociente <- 0\n    Mientras dividendo >= divisor Hacer\n      dividendo <- dividendo - divisor\n      cociente <- cociente + 1\n    FinMientras\n    Escribir "Cociente: ", cociente, "  Resto: ", dividendo\n  FinSi\nFinProceso',
  'dividendo = int(input("Dividendo: "))\ndivisor = int(input("Divisor: "))\nif divisor == 0:\n    print("No se puede dividir entre 0")\nelse:\n    cociente = 0\n    while dividendo >= divisor:\n        dividendo -= divisor\n        cociente += 1\n    print(f"Cociente: {cociente}  Resto: {dividendo}")',
  '17 entre 5 → Cociente: 3  Resto: 2','Cuando dividendo < divisor, lo que queda en dividendo es el resto. Siempre hay que controlar divisor = 0 (si no, bucle infinito).'],
 ['p9','Cálculo','Intercambiar dos variables','Intercambia los valores de dos variables.',
  'Proceso Intercambio\n  Definir a, b, aux Como Entero\n  Leer a, b\n  aux <- a\n  a <- b\n  b <- aux\n  Escribir "a = ", a, "  b = ", b\nFinProceso',
  'a = int(input("a: "))\nb = int(input("b: "))\naux = a\na = b\nb = aux\nprint(f"a = {a}  b = {b}")\n# en Python también: a, b = b, a',
  'a=3, b=8 → a = 8  b = 3','Hace falta una variable auxiliar para no perder el valor de a.'],
 ['p10','Condicionales','Menú con dos opciones','Crea un menú con dos opciones que ejecuten acciones distintas.',
  'Proceso Menu\n  Definir opcion Como Entero\n  Escribir "1. Saludar"\n  Escribir "2. Despedirse"\n  Leer opcion\n  Segun opcion Hacer\n    Caso 1:\n      Escribir "¡Hola!"\n    Caso 2:\n      Escribir "¡Hasta luego!"\n    De Otro Modo:\n      Escribir "Opción incorrecta"\n  FinSegun\nFinProceso',
  'print("1. Saludar")\nprint("2. Despedirse")\nopcion = int(input("Opción: "))\nmatch opcion:\n    case 1:\n        print("¡Hola!")\n    case 2:\n        print("¡Hasta luego!")\n    case _:\n        print("Opción incorrecta")',
  'Opción: 2\n¡Hasta luego!','El caso por defecto (De Otro Modo / case _) controla las opciones erróneas.'],
 ['p11','Bucles','Dibujar asteriscos','Pide dos números y dibuja tantos asteriscos como indique el mayor de ellos. (También: Python nº 4)',
  'Proceso Asteriscos\n  Definir a, b, mayor, i Como Entero\n  Leer a, b\n  Si a > b Entonces\n    mayor <- a\n  Sino\n    mayor <- b\n  FinSi\n  Para i <- 1 Hasta mayor Con Paso 1 Hacer\n    Escribir Sin Saltar "*"\n  FinPara\n  Escribir ""\nFinProceso',
  'a = int(input("Primero: "))\nb = int(input("Segundo: "))\nmayor = max(a, b)\nprint("*" * mayor)\n# con un bucle:\nfor i in range(mayor):\n    print("*", end="")\nprint()',
  '3 y 5 → *****','print(..., end="") evita el salto de línea; "*" * n repite el texto n veces.'],
 ['p12','Cálculo','Capacidad de un disco duro','Pide cilindros, pistas por cilindro y sectores por pista (512 bytes por sector) y escribe la capacidad en KB, MB y GB. (También: Python nº 5)',
  'Proceso Disco\n  Definir cil, pistas, sect Como Entero\n  Definir bytes Como Real\n  Escribir "Cilindros:"\n  Leer cil\n  Escribir "Pistas por cilindro:"\n  Leer pistas\n  Escribir "Sectores por pista:"\n  Leer sect\n  bytes <- cil * pistas * sect * 512\n  Escribir "Capacidad: ", bytes / 1024, " KB"\n  Escribir "Capacidad: ", bytes / 1024 / 1024, " MB"\n  Escribir "Capacidad: ", bytes / 1024 / 1024 / 1024, " GB"\nFinProceso',
  'cil = int(input("Cilindros: "))\npistas = int(input("Pistas por cilindro: "))\nsect = int(input("Sectores por pista: "))\nbytes_total = cil * pistas * sect * 512\nprint(f"Capacidad: {bytes_total / 1024:.2f} KB")\nprint(f"Capacidad: {bytes_total / 1024**2:.2f} MB")\nprint(f"Capacidad: {bytes_total / 1024**3:.4f} GB")',
  '1000 · 16 · 63 → 492187.50 KB\n                   480.65 MB\n                   0.4694 GB','Capacidad = cilindros · pistas · sectores · 512 bytes. Cada salto de unidad divide entre 1024.'],
 ['p13','Bucles','Número primo y primos anteriores','Lee un número positivo e indica si es primo. Si lo es, muestra los números primos anteriores a él. (También: Python nº 6)',
  'Proceso Primos\n  Definir n, i, j Como Entero\n  Definir primo Como Logico\n  Leer n\n  primo <- n > 1\n  i <- 2\n  Mientras i * i <= n Y primo Hacer\n    Si n MOD i = 0 Entonces\n      primo <- Falso\n    FinSi\n    i <- i + 1\n  FinMientras\n  Si primo Entonces\n    Escribir n, " es primo. Primos anteriores:"\n    Para i <- 2 Hasta n - 1 Con Paso 1 Hacer\n      primo <- Verdadero\n      Para j <- 2 Hasta trunc(raiz(i)) Con Paso 1 Hacer\n        Si i MOD j = 0 Entonces\n          primo <- Falso\n        FinSi\n      FinPara\n      Si primo Entonces\n        Escribir i\n      FinSi\n    FinPara\n  Sino\n    Escribir n, " no es primo"\n  FinSi\nFinProceso',
  'def es_primo(k):\n    if k < 2:\n        return False\n    i = 2\n    while i * i <= k:\n        if k % i == 0:\n            return False\n        i += 1\n    return True\n\nn = int(input("Número: "))\nif es_primo(n):\n    print(n, "es primo. Primos anteriores:")\n    for i in range(2, n):\n        if es_primo(i):\n            print(i, end=" ")\n    print()\nelse:\n    print(n, "no es primo")',
  'Número: 13\n13 es primo. Primos anteriores:\n2 3 5 7 11','La versión de Python usa una función (Tema 3). Idea: un número es primo si ningún divisor entre 2 y su raíz lo divide.'],
 ['p14','Cálculo','Suma, mayor y menor de N valores','Lee N valores, calcula la suma total y determina el mayor y el menor. El valor de N se solicita al principio. (También: Python nº 7)',
  'Proceso Estadistica\n  Definir n, i Como Entero\n  Definir x, suma, mayor, menor Como Real\n  Escribir "¿Cuántos valores?"\n  Leer n\n  suma <- 0\n  Para i <- 1 Hasta n Con Paso 1 Hacer\n    Leer x\n    suma <- suma + x\n    Si i = 1 Entonces\n      mayor <- x\n      menor <- x\n    Sino\n      Si x > mayor Entonces\n        mayor <- x\n      FinSi\n      Si x < menor Entonces\n        menor <- x\n      FinSi\n    FinSi\n  FinPara\n  Escribir "Suma: ", suma, "  Mayor: ", mayor, "  Menor: ", menor\nFinProceso',
  'n = int(input("¿Cuántos valores? "))\nsuma = 0\nfor i in range(n):\n    x = float(input(f"Valor {i + 1}: "))\n    suma += x\n    if i == 0:\n        mayor = menor = x\n    else:\n        if x > mayor:\n            mayor = x\n        if x < menor:\n            menor = x\nprint(f"Suma: {suma}  Mayor: {mayor}  Menor: {menor}")',
  'N=3 → 4, 9, 2\nSuma: 15.0  Mayor: 9.0  Menor: 2.0','Se inicializan mayor y menor con el primer valor leído; no con 0, porque fallaría con números negativos.'],
 ['p15','Aleatorio','Combinación aleatoria de 6 números','Genera una combinación aleatoria de 6 números entre 1 y 49 sin repetir.',
  'Proceso Primitiva\n  Dimension comb[6]\n  Definir n, i, j, num Como Entero\n  Definir repe Como Logico\n  n <- 0\n  Mientras n < 6 Hacer\n    num <- Aleatorio(1, 49)\n    repe <- Falso\n    Para j <- 1 Hasta n Con Paso 1 Hacer\n      Si comb[j] = num Entonces\n        repe <- Verdadero\n      FinSi\n    FinPara\n    Si no repe Entonces\n      n <- n + 1\n      comb[n] <- num\n    FinSi\n  FinMientras\n  Para i <- 1 Hasta 6 Con Paso 1 Hacer\n    Escribir comb[i]\n  FinPara\nFinProceso',
  'import random\n\ncombinacion = []\nwhile len(combinacion) < 6:\n    num = random.randint(1, 49)\n    if num not in combinacion:\n        combinacion.append(num)\nprint(sorted(combinacion))\n\n# atajo con la librería:\nprint(sorted(random.sample(range(1, 50), 6)))',
  '[4, 11, 23, 28, 37, 45]','Se repite el sorteo hasta tener 6 números distintos. random.sample ya garantiza que no se repiten.']],
qa:[
 ['¿Qué es una estructura secuencial?','Aquella cuyas instrucciones se ejecutan una tras otra, de forma que una no empieza hasta que termina la anterior. Sus cuatro tipos son declaración, asignación, lectura y escritura.'],
 ['¿Qué tipos de estructuras condicionales hay?','Simple (un bloque si se cumple), doble (bloque del Si y del Sino), múltiples condiciones simples encadenadas (elif) y múltiples casos (Según / match).'],
 ['¿Cuándo uso elif y cuándo match?','elif para rangos o condiciones complejas; match para comparar con valores concretos (opciones de menú).'],
 ['¿Qué diferencia hay entre Mientras y Repetir-Hasta?','En Mientras la condición se evalúa antes (puede no ejecutarse nunca); en Repetir-Hasta se evalúa después (se ejecuta al menos una vez). Además, Mientras continúa mientras es verdadera y Repetir sale cuando es verdadera.'],
 ['¿Por qué Python no tiene Repetir-Hasta?','No existe en el lenguaje; se simula con while True y un if … break que comprueba la condición de salida.'],
 ['¿Qué genera range(0, 10, 2)?','0, 2, 4, 6 y 8: el inicio se incluye, el final (10) no, y el paso es 2.'],
 ['¿Cómo evito un bucle infinito?','Asegurándome de que algo dentro del bucle cambia la variable de la condición, de forma que algún día deje de cumplirse.'],
 ['¿Para qué sirve break?','Para salir del bucle inmediatamente, aunque la condición siga siendo cierta.'],
 ['¿Qué es una bandera (flag)?','Una variable lógica que recuerda si ha ocurrido algo durante el bucle; por ejemplo primo = False en cuanto se encuentra un divisor.']]
};
})();
