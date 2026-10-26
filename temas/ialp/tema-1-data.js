/* IALP · Tema 1 — contenido: estructura de un programa y elementos básicos (UT1) */
(function(){
const H=window.H;
window.TEMA={
key:'ia1',rank:'ialp1-ranking',
allDone:'🏆 ¡Entorno preparado y ejercicios hechos!',
typer:[['p','$ ','python ialp_t1_suma.py'],['o','','Primer número: 7\nSegundo número: 5\nLa suma es 12 y el producto 35'],
  ['p','>> ','Escribir "Hola mundo"'],['o','','Hola mundo'],
  ['p','>> ','PI = 3.1416 ; radio = 2'],['o','','area = PI * radio ** 2  →  12.5664'],
  ['p','>> ','5 + 3 * 2 > 10 and True'],['o','','→ 11 > 10 and True → True'],['c','','# ¿Listo para el test? 🔥']],
levels:[[0,'Becario del código','🐣'],[120,'Aprendiz de variables','🧮'],[300,'Domador de datos','📦'],[600,'Maestro de expresiones','🧠'],[1000,'Señor de la prioridad','⚖️'],[1600,'Traductor PSeInt→Python','🔁'],[2400,'Ninja del IDE','🥷'],[3400,'Depurador nato','🐞'],[4800,'Arquitecto de algoritmos','🏗️'],[6500,'Leyenda del código','🐍']],
where:{pse:['w-vb','PSeInt','PSeInt'],py:['w-xu','Python','Python'],vs:['w-vs','VS Code','Python'],win:['w-win','Windows','terminal'],gh:['w-gh','Investigar','Notas']},

sections:[
/* 1 */{id:'t-algoritmo',title:'¿Qué es un algoritmo?',short:'Algoritmo',sub:'La receta que resuelve un problema, antes de escribir una sola línea de código.',c:'#8b3fc9',html:
 H.p('Un <b>algoritmo</b> es un conjunto <b>ordenado y finito</b> de operaciones que permiten hallar la solución a un problema. Es independiente tanto del <b>lenguaje</b> como de la <b>máquina</b>: lo mismo se puede escribir en PSeInt, en Python o en un papel.')+
 H.flow([['Problema','calcular el|área de un círculo','rose'],['Algoritmo','pasos ordenados|y sin ambigüedad','acc',true],['Programa','el algoritmo en|PSeInt o Python','sky'],['Resultado','12.5664','amber']],'El algoritmo va antes que el código: primero se piensa la solución y después se traduce a un lenguaje.')+
 H.cards([['1️⃣','Ordenado','Las operaciones tienen un orden establecido: no se puede calcular el área antes de leer el radio.','acc'],['🎯','Simple y no ambiguo','Cada operación es sencilla y solo se puede entender de una manera.','sky'],['🏁','Finito','Termina siempre: un algoritmo que no acaba nunca no resuelve nada.','amber']])+
 H.posts([['','Independiente del lenguaje','Se puede escribir en pseudocódigo y traducir a cualquier lenguaje.'],['pink','Error típico','Escribir código sin pensar el algoritmo antes: sale un programa que no hace lo que se pedía.'],['blue','Ejemplo de la vida real','Una receta de cocina o las instrucciones de montaje de un mueble son algoritmos.']])+
 H.note('tip','Regla de oro','Si no sabes explicar los pasos en castellano, todavía no puedes programarlos. Primero papel, después PSeInt y por último Python.')},

/* 2 */{id:'t-elementos',title:'Datos, constantes y variables',short:'Datos y variables',sub:'Con qué trabaja un algoritmo y dónde guarda la información.',c:'#1a6fd6',html:
 H.p('Los <b>datos</b> son la información que un algoritmo utiliza para operar y resolver un problema. Pueden guardarse en <b>constantes</b> (no cambian) o en <b>variables</b> (cambian durante la ejecución).')+
 H.cards([['📊','Datos','Información con la que opera el algoritmo: números (<code>10</code>, <code>25.7</code>, <code>-3</code>), texto (<code>"Hola"</code>) o lógicos (Verdadero, Falso).','sky'],['🔒','Constantes','Valores que permanecen invariables durante <b>toda</b> la ejecución. Una vez definidas no se pueden modificar. Facilitan la comprensión y el mantenimiento.','rose'],['📦','Variables','Espacios de memoria con un <b>nombre</b> que almacenan datos <b>temporales</b> cuyo valor puede cambiar durante la ejecución.','acc']])+
 H.dia('<rect x="30" y="40" width="200" height="130" rx="16" fill="var(--rose-soft)" stroke="var(--rose)" stroke-width="2"/><text x="130" y="72" text-anchor="middle" class="svg-t" fill="var(--rose)" font-size="16">🔒 CONSTANTE</text><text x="130" y="102" text-anchor="middle" class="svg-m" fill="var(--ink)" font-size="13">PI</text><rect x="95" y="114" width="70" height="36" rx="8" fill="var(--panel)" stroke="var(--rose)"/><text x="130" y="138" text-anchor="middle" class="svg-m" fill="var(--ink)" font-size="14" font-weight="700">3.1416</text>'+
  '<rect x="300" y="40" width="200" height="130" rx="16" fill="var(--acc-soft)" stroke="var(--acc)" stroke-width="2" class="pulse"/><text x="400" y="72" text-anchor="middle" class="svg-t" fill="var(--acc)" font-size="16">📦 VARIABLE</text><text x="400" y="102" text-anchor="middle" class="svg-m" fill="var(--ink)" font-size="13">edad</text><rect x="365" y="114" width="70" height="36" rx="8" fill="var(--panel)" stroke="var(--acc)"/><text x="400" y="138" text-anchor="middle" class="svg-m" fill="var(--ink)" font-size="14" font-weight="700">17 → 18</text>'+
  '<text x="130" y="195" text-anchor="middle" class="svg-m" fill="var(--muted)" font-size="11.5">no puede cambiar</text><text x="400" y="195" text-anchor="middle" class="svg-m" fill="var(--muted)" font-size="11.5">cambia al ejecutar</text>'+
  '<rect x="560" y="60" width="170" height="90" rx="14" fill="var(--amber-soft)" stroke="var(--amber)"/><text x="645" y="90" text-anchor="middle" class="svg-t" fill="var(--amber)" font-size="14">MEMORIA</text><text x="645" y="112" text-anchor="middle" class="svg-m" fill="var(--ink)" font-size="11.5">cada variable = un</text><text x="645" y="128" text-anchor="middle" class="svg-m" fill="var(--ink)" font-size="11.5">hueco con nombre</text><path d="M504 105H556" stroke="var(--muted)" stroke-width="2.5" class="flow"/>',
  'Una constante es una caja cerrada con candado; una variable es una caja con nombre cuyo contenido se puede cambiar.','0 0 760 220','Constante frente a variable')+
 H.h3('En PSeInt y en Python')+
 H.grid(2,H.code('Proceso Ejemplo\n  Definir edad Como Entero\n  Definir nombre Como Cadena\n  edad <- 17\n  nombre <- "Ana"\nFinProceso','PSeInt · variables'),H.code('PI = 3.1416      # constante (por convención, en MAYÚSCULAS)\nedad = 17        # variable\nnombre = "Ana"   # variable de texto\nedad = 18        # el valor cambia','Python · variables'))+
 H.note('warn','Python no tiene constantes reales','En Python una «constante» es solo una convención: se escribe en MAYÚSCULAS y no se toca, pero el lenguaje no lo impide. En PSeInt sí se puede declarar una constante.')},

/* 3 */{id:'t-tipos',title:'Tipos de datos',short:'Tipos de datos',sub:'Entero, real, carácter, cadena y lógico.',c:'#c76a05',html:
 H.p('Cada dato tiene un <b>tipo</b> que decide qué valores admite y qué operaciones se pueden hacer con él.')+
 H.tbl(['Tipo','Qué guarda','Ejemplo','En Python'],[['<b>Entero</b> (integer)','números sin decimales','<code>10</code>, <code>-5</code>','<code>int</code>'],['<b>Real</b> (float)','números con decimales','<code>3.14</code>','<code>float</code>'],['<b>Carácter</b> (char)','un solo símbolo','<code>"a"</code>','<code>str</code> de longitud 1'],['<b>Cadena</b> (string)','texto','<code>"hola"</code>','<code>str</code>'],['<b>Lógico</b> (bool)','verdadero o falso','Verdadero, Falso','<code>bool</code> (True, False)']],'amber')+
 H.posts([['','Cuidado con las comillas','<code>"5"</code> es texto y <code>5</code> es un número: <code>"5" + "5"</code> da <code>"55"</code>, no 10.'],['blue','El decimal lleva punto','En PSeInt y Python los decimales se escriben con punto: <code>3.14</code>, no <code>3,14</code>.'],['pink','Python decide el tipo solo','No hace falta declarar: <code>x = 5</code> crea un entero. Con <code>type(x)</code> se comprueba.']])+
 H.lab('labTipo','¿De qué tipo es este dato?',
  '<div class="row"><input type="text" id="tpIn" value="3.14" aria-label="Dato" placeholder="Escribe un dato: 10, 3.14, &quot;hola&quot;, Verdadero…"></div><div class="term-out" id="tpOut"></div>')+
 H.code('x = 10\nprint(type(x))        # <class \'int\'>\nx = 3.14\nprint(type(x))        # <class \'float\'>\nx = "hola"\nprint(type(x))        # <class \'str\'>\nx = True\nprint(type(x))        # <class \'bool\'>','Python · type()')},

/* 4 */{id:'t-expresiones',title:'Expresiones',short:'Expresiones',sub:'Valores, variables, operadores y funciones que producen un resultado.',c:'#d93b55',html:
 H.p('Una <b>expresión</b> es una combinación de valores, variables, operadores y funciones que produce un <b>resultado</b>. Según el resultado, hay tres tipos.')+
 H.cards([['➕','Aritméticas','Realizan operaciones matemáticas y dan un número.<br><code>precio + impuesto</code><br><code>a * b</code><br><code>(x + y) / 2</code>','acc'],['⚖️','Relacionales','Comparan valores y dan <b>Verdadero o Falso</b>.<br><code>edad &gt;= 18</code><br><code>nota &lt; 5</code>','sky'],['🔗','Lógicas','Combinan condiciones con operadores lógicos.<br><code>edad &gt;= 18 Y tieneCarnet</code>','violet']])+
 H.flow([['edad = 20','dato','sky'],['edad &gt;= 18','relacional|→ Verdadero','amber',true],['Y tieneCarnet','lógica|→ Verdadero','violet'],['Puede conducir','resultado final','acc']],'Una expresión lógica se construye a base de expresiones relacionales, que a su vez usan datos y variables.')+
 H.grid(2,H.code('edad <- 20\ntieneCarnet <- Verdadero\npuedeConducir <- (edad >= 18) Y tieneCarnet\nEscribir puedeConducir','PSeInt · expresiones'),H.code('edad = 20\ntiene_carnet = True\npuede_conducir = (edad >= 18) and tiene_carnet\nprint(puede_conducir)   # True','Python · expresiones'))+
 H.tbl(['Operador','PSeInt','Python'],[['Suma, resta','<code>+</code> <code>-</code>','<code>+</code> <code>-</code>'],['Multiplicación, división','<code>*</code> <code>/</code>','<code>*</code> <code>/</code>'],['Resto de la división','<code>MOD</code> o <code>%</code>','<code>%</code>'],['División entera','<code>trunc(a/b)</code>','<code>//</code>'],['Potencia','<code>^</code>','<code>**</code>'],['Y, O, NO','<code>Y</code> <code>O</code> <code>NO</code>','<code>and</code> <code>or</code> <code>not</code>'],['Igual, distinto','<code>=</code> <code>&lt;&gt;</code>','<code>==</code> <code>!=</code>']],'rose')},

/* 5 */{id:'t-prioridad',title:'Prioridad de operadores',short:'Prioridad',sub:'En qué orden se resuelve una expresión.',c:'#4f46e5',html:
 H.p('Cuando una expresión tiene varios operadores no se resuelve de izquierda a derecha sin más: cada operador tiene su <b>prioridad</b>.')+
 H.dia('<defs><marker id="arP" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0L10 5L0 10z" fill="var(--muted)"/></marker></defs>'+
  [['1','Paréntesis','( )','acc'],['2','Producto y división','* / %','sky'],['3','Suma y resta','+ -','amber'],['4','Comparaciones','&lt; &gt; = &lt;&gt;','violet'],['5','Operadores lógicos','NO · Y · O','rose']].map(([n,t,o,c],i)=>'<g'+(i===0?' class="pulse"':'')+'><rect x="'+(20+i*146)+'" y="'+(30+i*14)+'" width="132" height="'+(150-i*14)+'" rx="14" fill="var(--'+c+'-soft)" stroke="var(--'+c+')" stroke-width="'+(i===0?2.5:1.5)+'"/><text x="'+(86+i*146)+'" y="'+(62+i*14)+'" text-anchor="middle" class="svg-t" fill="var(--'+c+')" font-size="26">'+n+'</text><text x="'+(86+i*146)+'" y="'+(92+i*14)+'" text-anchor="middle" class="svg-m" fill="var(--ink)" font-size="11.5">'+t+'</text><text x="'+(86+i*146)+'" y="'+(116+i*14)+'" text-anchor="middle" class="svg-m" fill="var(--muted)" font-size="12">'+o+'</text></g>').join('')+
  '<path d="M20 205H740" stroke="var(--muted)" stroke-width="2.5" class="flow" marker-end="url(#arP)"/><text x="30" y="198" class="svg-m" fill="var(--muted)" font-size="11">se resuelve primero</text><text x="740" y="198" text-anchor="end" class="svg-m" fill="var(--muted)" font-size="11">se resuelve al final</text>',
  'De mayor a menor prioridad. A igual prioridad, de izquierda a derecha.','0 0 760 220','Niveles de prioridad de los operadores')+
 H.vs('Sin paréntesis','2 + 3 * 4   →   14','Primero se multiplica (3·4 = 12) y después se suma.','Con paréntesis','(2 + 3) * 4   →   20','Los paréntesis cambian el orden: primero la suma.')+
 H.note('tip','Ejercicio 3 del tema','«Crea ejemplos de operaciones donde se pueda probar la prioridad.» Usa el laboratorio de abajo: te muestra paso a paso qué se resuelve primero.')+
 H.lab('labPrio','Resuelve paso a paso',
  '<div class="row"><input type="text" id="prIn" value="5 + 3 * 2 > 10 and not (4 < 2)" aria-label="Expresión" spellcheck="false"></div><div class="row" id="prEj"></div><div class="term-out" id="prOut"></div>')},

/* 6 */{id:'t-asignacion',title:'Asignación',short:'Asignación',sub:'Guardar o actualizar el valor de una variable.',c:'#0c9a6a',html:
 H.p('La <b>asignación</b> es la operación mediante la cual se almacena un dato en una variable o se actualiza el valor que ya contiene. Siempre se evalúa primero la parte derecha y el resultado se guarda en la izquierda.')+
 H.flow([['a','antes: 5','sky'],['a + 1','se calcula: 6','amber',true],['a','ahora: 6','acc']],'En a = a + 1 primero se calcula a + 1 con el valor antiguo y luego se guarda el resultado en a.',{h:76})+
 H.grid(2,H.code('a <- 45\na <- a + 1\nEscribir a        // 46','PSeInt · asignación'),H.code('a = 45\na = a + 1\nprint(a)          # 46','Python · asignación'))+
 H.posts([['','El = no es una igualdad','<code>a = a + 1</code> en matemáticas es imposible; en programación significa «guarda en a lo que valga a más uno».'],['blue','PSeInt usa una flecha','<code>variable ← valor</code> se escribe <code>&lt;-</code>. En Python basta con <code>=</code>.'],['orange','El valor antiguo se pierde','Al asignar un valor nuevo, el anterior desaparece de la variable.']])+
 H.lab('labTraza','Traza de variables: ejecuta línea a línea',
  '<div class="row">'+H.seg('trSel',[['0','Contador'],['1','Intercambio (E. 9)'],['2','Acumulador']]).replace(' rv','')+'<button class="btn pri sm" id="trStep" type="button">▶ Siguiente línea</button><button class="btn sm" id="trRst" type="button">↺ Reiniciar</button></div><div class="code" data-fn="Python" data-nohl id="trCode"><pre></pre></div><div class="cells" id="trMem" style="margin-top:12px"></div>')},

/* 7 */{id:'t-es',title:'Entrada y salida',short:'Entrada / salida',sub:'La comunicación entre el algoritmo y el usuario.',c:'#c76a05',html:
 H.p('La <b>entrada/salida</b> permite la comunicación entre el algoritmo y el usuario. La <b>entrada</b> puede venir del teclado, de un disco u otro dispositivo; la <b>salida</b> puede ir a la pantalla, a un disco u otro dispositivo.')+
 H.flow([['Entrada','teclado · disco|Leer / input()','sky'],['Algoritmo','procesa los datos','acc',true],['Salida','pantalla · disco|Escribir / print()','amber']],'Todo programa útil lee datos, los procesa y muestra un resultado.',{h:80})+
 H.grid(2,H.code('Proceso Saludo\n  Definir nombre Como Cadena\n  Escribir "¿Cómo te llamas?"\n  Leer nombre\n  Escribir "Hola ", nombre\nFinProceso','PSeInt · Leer y Escribir'),H.code('nombre = input("¿Cómo te llamas? ")\nprint("Hola", nombre)','Python · input y print'))+
 H.note('warn','input() siempre devuelve texto','Para leer un número hay que convertirlo: <code>edad = int(input("Edad: "))</code> para enteros y <code>float(input(...))</code> para decimales. Si no, <code>"5" + "3"</code> da <code>"53"</code>.')+
 H.tbl(['Quiero…','PSeInt','Python'],[['Leer un texto','<code>Leer nombre</code>','<code>nombre = input("Nombre: ")</code>'],['Leer un entero','<code>Leer edad</code>','<code>edad = int(input("Edad: "))</code>'],['Leer un real','<code>Leer nota</code>','<code>nota = float(input("Nota: "))</code>'],['Mostrar un mensaje','<code>Escribir "Hola"</code>','<code>print("Hola")</code>'],['Mostrar una variable','<code>Escribir edad</code>','<code>print(edad)</code>']],'amber')},

/* 8 */{id:'t-traduccion',title:'De PSeInt a Python',short:'PSeInt → Python',sub:'El mismo algoritmo en dos lenguajes.',c:'#d93b55',html:
 H.p('El ejercicio 1 pide escribir un algoritmo en PSeInt y <b>traducirlo a Python</b>. Como el algoritmo es independiente del lenguaje, solo cambia la sintaxis.')+
 H.grid(2,H.code('Proceso SumaProducto\n  Definir a, b Como Real\n  Escribir "Primer número:"\n  Leer a\n  Escribir "Segundo número:"\n  Leer b\n  Escribir "Suma: ", a + b\n  Escribir "Producto: ", a * b\nFinProceso','PSeInt · E1'),H.code('a = float(input("Primer número: "))\nb = float(input("Segundo número: "))\nprint("Suma:", a + b)\nprint("Producto:", a * b)','Python · E1'))+
 H.tbl(['PSeInt','Python','Detalle'],[['<code>Proceso … FinProceso</code>','(no hace falta)','Python ejecuta el fichero de arriba abajo.'],['<code>Definir x Como Entero</code>','<code>x = 0</code>','Python no declara tipos.'],['<code>x &lt;- 5</code>','<code>x = 5</code>','La flecha pasa a ser un igual.'],['<code>Leer x</code>','<code>x = int(input())</code>','Hay que convertir el tipo.'],['<code>Escribir x</code>','<code>print(x)</code>',''],['<code>//comentario</code>','<code># comentario</code>','Otro símbolo de comentario.']],'rose')+
 H.lab('labTrad','Traductor de instrucciones',
  '<div class="row"><select id="tdSel" aria-label="Instrucción de PSeInt"></select></div><div class="term-out" id="tdOut"></div>')},

/* 9 */{id:'t-ide',title:'El IDE de desarrollo',short:'IDE',sub:'Todo lo necesario para programar en una sola herramienta.',c:'#0e7bbd',html:
 H.p('Un <b>IDE</b> (Integrated Development Environment) o Entorno de Desarrollo Integrado es una aplicación que reúne en una sola herramienta todos los elementos necesarios para desarrollar programas. Su objetivo es facilitar el trabajo del programador: escribir, ejecutar, depurar y organizar el código de forma más eficiente.')+
 H.cards([['✍️','Editor de código','Permite escribir los programas, con colores y sangrado automático.','acc'],['⚙️','Compilador o intérprete','Traduce y ejecuta el código que has escrito.','sky'],['🐞','Depurador (debugger)','Ayuda a localizar y corregir errores ejecutando paso a paso.','rose'],['🗂️','Gestión de proyectos','Organiza los archivos y recursos del programa.','amber'],['💡','Autocompletado','Sugiere instrucciones, agiliza la programación y reduce errores.','violet']],3)+
 H.flow([['Editor','escribes el código','sky'],['Intérprete','traduce y ejecuta','acc',true],['Depurador','busca los fallos','rose'],['Proyecto','organiza ficheros','amber']],'Las cuatro piezas de un IDE trabajan juntas en la misma ventana.',{gap:36})+
 H.h3('Ejemplos de IDE')+
 H.grid(3,H.card('🟦','Visual Studio Code','Editor ligero y muy extendido. Con la extensión de Python sirve como IDE completo.','sky'),H.card('🌑','Eclipse','IDE clásico, muy usado en Java.','violet'),H.card('☕','NetBeans','IDE de Apache, también orientado a Java y otros lenguajes.','amber'))+
 H.posts([['','PSeInt también es un entorno','Tiene editor, ejecución paso a paso y diagramas de flujo, pensado para aprender algoritmos.'],['blue','IDE ≠ editor de texto','El Bloc de notas solo escribe; un IDE además ejecuta, depura y sugiere.']])},

/* 10 */{id:'t-depuracion',title:'Depuración de código',short:'Depuración',sub:'Ejercicio 6: investigar cómo se depura en un IDE como VS Code.',c:'#8b3fc9',html:
 H.p('<b>Depurar</b> (debugging) es ejecutar un programa de forma controlada para observar su comportamiento, comprobar el valor de las variables y localizar errores. El ejercicio 6 pide investigarlo en VS Code.')+
 H.cards([['⏯️','Ejecución paso a paso','Se ejecuta una línea cada vez. En VS Code: <kbd>F10</kbd> (paso por encima) y <kbd>F11</kbd> (entrar en la función).','acc'],['🔴','Puntos de interrupción','Marcas con un clic a la izquierda del número de línea; la ejecución se detiene ahí. Tecla <kbd>F9</kbd>.','rose'],['👁️','Observación de variables','Los paneles Variables y Inspección muestran el valor de cada variable en cada momento.','sky']])+
 H.dia('<rect x="30" y="30" width="330" height="150" rx="14" fill="var(--code-bg)"/><text x="52" y="62" class="svg-m" fill="#7d8796" font-size="12">1</text><text x="80" y="62" class="svg-m" fill="#d7dee8" font-size="13">total = 0</text><circle cx="42" cy="88" r="6" fill="#fb7185"/><text x="52" y="92" class="svg-m" fill="#7d8796" font-size="12">2</text><text x="80" y="92" class="svg-m" fill="#d7dee8" font-size="13">for i in range(3):</text><rect x="36" y="104" width="318" height="24" fill="#c084fc" opacity=".25" class="pulse"/><text x="52" y="121" class="svg-m" fill="#7d8796" font-size="12">3</text><text x="80" y="121" class="svg-m" fill="#d7dee8" font-size="13">    total = total + i</text><text x="52" y="152" class="svg-m" fill="#7d8796" font-size="12">4</text><text x="80" y="152" class="svg-m" fill="#d7dee8" font-size="13">print(total)</text>'+
  '<rect x="400" y="30" width="330" height="150" rx="14" fill="var(--panel2)" stroke="var(--line)"/><text x="420" y="58" class="svg-t" fill="var(--ink)" font-size="14">VARIABLES</text><text x="420" y="90" class="svg-m" fill="var(--ink)" font-size="13">total = 1</text><text x="420" y="114" class="svg-m" fill="var(--ink)" font-size="13">i = 1</text><text x="420" y="150" class="svg-m" fill="var(--muted)" font-size="11.5">🔴 punto de interrupción en la línea 2</text>',
  'El depurador se detiene en el punto de interrupción y enseña el valor de cada variable.','0 0 760 210','Depurador de VS Code')+
 H.posts([['','Atajos de VS Code','<kbd>F5</kbd> iniciar o continuar · <kbd>F9</kbd> punto de interrupción · <kbd>F10</kbd> paso por encima · <kbd>F11</kbd> entrar · <kbd>Mayús+F5</kbd> parar.'],['pink','La técnica del print','Poner prints por todas partes funciona, pero el depurador es más limpio y no ensucia el código.'],['green','Depurar en PSeInt','«Ejecutar paso a paso» muestra cada instrucción y permite ver el valor de las variables.']])+
 H.note('info','Más adelante','En el Tema 3 hay un depurador simulado para practicar con puntos de interrupción.')},

/* 11 */{id:'t-ejemplos',title:'Del problema al programa',short:'Ejemplos resueltos',sub:'Constantes, prioridad y cadenas en dos ejemplos de los ejercicios.',c:'#1a6fd6',html:
 H.h3('Área de un círculo con constante (ejercicio 2)')+
 H.flow([['Constante','PI = 3.1416','rose'],['Entrada','radio','sky'],['Cálculo','PI · radio²','amber',true],['Salida','área','acc']],'Primero se define la constante, luego se lee el radio, se calcula y se muestra.')+
 H.grid(2,H.code('Proceso AreaCirculo\n  Definir radio, area Como Real\n  Constante PI <- 3.1416\n  Escribir "Radio:"\n  Leer radio\n  area <- PI * radio ^ 2\n  Escribir "Área: ", area\nFinProceso','PSeInt · área'),H.code('PI = 3.1416\nradio = float(input("Radio: "))\narea = PI * radio ** 2\nprint("Área:", area)','Python · área'))+
 H.h3('Apellidos, nombre (ejercicio 5)')+
 H.grid(2,H.code('Proceso Nombre\n  Definir nom, ape, res Como Cadena\n  Escribir "Nombre:"\n  Leer nom\n  Escribir "Apellidos:"\n  Leer ape\n  res <- Concatenar(ape, Concatenar(", ", nom))\n  Escribir res\nFinProceso','PSeInt · concatenar'),H.code('nombre = input("Nombre: ")\napellidos = input("Apellidos: ")\nprint(f"{apellidos}, {nombre}")','Python · f-string'))+
 H.out('Nombre: Ana\nApellidos: López Ruiz\nLópez Ruiz, Ana')+
 H.note('tip','Fíjate en la precedencia','En <code>PI * radio ** 2</code> la potencia se hace antes que la multiplicación. Si quisieras elevar todo al cuadrado, necesitarías paréntesis: <code>(PI * radio) ** 2</code> sería un error.')}
],

flips:{},
datos:[['Profesor','Alfonso José Padilla Navarrete'],['Unidad','UT1 · Estructura de un programa'],['Lenguajes','PSeInt y Python'],['IDE recomendado','Visual Studio Code'],['Fichero Python','ialp_t1_ejercicio.py'],['Fichero PSeInt','ialp_t1_ejercicio.psc']],
pDiagram:H.flow([['Problema','enunciado','rose'],['Papel','pasos y fórmulas','amber'],['PSeInt','algoritmo','sky',true],['Python','traducción','acc'],['Prueba','casos y depurar','violet']],'Método de trabajo: primero papel, luego PSeInt y por último Python, probando con varios datos.',{gap:34}),
phases:[
 {t:'Preparar el entorno',c:'#8b3fc9',s:[
  ['a1','pse','Instalar PSeInt','Descarga PSeInt, instálalo y ábrelo. Es el programa donde escribirás los algoritmos en pseudocódigo.',''],
  ['a2','py','Instalar Python 3','Instala Python y marca «Add Python to PATH». Comprueba la versión desde el terminal.','python --version'],
  ['a3','vs','Instalar VS Code y la extensión de Python','Instala Visual Studio Code y, desde la pestaña de extensiones, la extensión «Python» de Microsoft.','code --install-extension ms-python.python'],
  ['a4','py','Crear la carpeta de trabajo','Una carpeta para todos los ejercicios del tema.','mkdir ialp_tema1\ncd ialp_tema1\ncode .']]},
 {t:'Primer algoritmo',c:'#1a6fd6',s:[
  ['b1','pse','Escribir y ejecutar «Hola mundo»','Nuevo algoritmo en PSeInt, escríbelo y pulsa Ejecutar (F9).','Proceso HolaMundo\n  Escribir "Hola mundo"\nFinProceso'],
  ['b2','py','El mismo programa en Python','Crea hola.py en VS Code y ejecútalo con el botón ▶ o desde el terminal.','print("Hola mundo")\n# python hola.py'],
  ['b3','pse','Ejecutar paso a paso','En PSeInt: Ejecutar → Paso a paso. Observa cómo cambia cada variable.',''],
  ['b4','vs','Poner un punto de interrupción','En VS Code, clic a la izquierda de una línea y F5 para depurar. Usa F10 para avanzar.','']]},
 {t:'Ejercicios del tema',c:'#0c9a6a',s:[
  ['c1','pse','Ejercicio 1: suma y producto','PSeInt y después Python.',''],
  ['c2','py','Ejercicio 2: área con constante PI','Usa la constante 3.1416.',''],
  ['c3','py','Ejercicio 3: prioridad de operaciones','Prueba expresiones con y sin paréntesis y comprueba el resultado a mano.',''],
  ['c4','pse','Ejercicio 4: ecuación de segundo grado','Primero a papel y luego en PSeInt.',''],
  ['c5','py','Ejercicio 5: apellidos, nombre','Lee nombre y apellidos y muéstralos en el orden pedido.',''],
  ['c6','gh','Ejercicio 6: depuración en VS Code','Investiga puntos de interrupción, paso a paso y observación de variables.','']]}],
cheat:[
 ['Proceso Nombre … FinProceso','pse','Estructura de un algoritmo'],['Definir x Como Entero','pse','Declarar una variable'],['x <- 5','pse','Asignar un valor'],['Leer x','pse','Leer del teclado'],['Escribir "Hola ", x','pse','Mostrar por pantalla'],['Constante PI <- 3.1416','pse','Declarar una constante'],['// comentario','pse','Comentario en PSeInt'],
 ['x = 5','py','Asignar (crea la variable)'],['int(input("Edad: "))','py','Leer un entero'],['float(input("Nota: "))','py','Leer un decimal'],['input("Nombre: ")','py','Leer un texto'],['print("Suma:", a + b)','py','Mostrar datos'],['type(x)','py','Ver el tipo de un dato'],['# comentario','py','Comentario en Python'],['**  //  %','py','Potencia, división entera, resto'],['and  or  not','py','Operadores lógicos'],
 ['F5 · F9 · F10 · F11','vs','Depurar: iniciar, punto, paso, entrar'],['Ctrl+Mayús+P → Python: Select Interpreter','vs','Elegir el intérprete de Python']],
fails:[
 ['pink','NameError: name \'x\' is not defined','Usas una variable que no has creado o la has escrito distinto. Python distingue mayúsculas de minúsculas.'],
 ['','TypeError al sumar texto y número','<code>input()</code> devuelve texto. Convierte con <code>int()</code> o <code>float()</code>.'],
 ['blue','En PSeInt: variable no definida','Falta <code>Definir x Como …</code> o has escrito mal el nombre.'],
 ['green','Salen muchos decimales','Para 2 decimales en Python: <code>print(f"{x:.2f}")</code>.'],
 ['orange','«python» no se reconoce como comando','No marcaste «Add Python to PATH». Reinstala o usa <code>py</code> en Windows.']],
exCats:{Básicos:'#8b3fc9',Fórmulas:'#1a6fd6',Texto:'#c76a05',IDE:'#0c9a6a'},
ex:[
 ['e1','Básicos','Suma y producto de dos números','Escribe en PSeInt un algoritmo que pida dos números y muestre su suma y su producto. Después tradúcelo a Python.',
  'Proceso SumaProducto\n  Definir a, b Como Real\n  Escribir "Primer número:"\n  Leer a\n  Escribir "Segundo número:"\n  Leer b\n  Escribir "Suma: ", a + b\n  Escribir "Producto: ", a * b\nFinProceso',
  'a = float(input("Primer número: "))\nb = float(input("Segundo número: "))\nprint("Suma:", a + b)\nprint("Producto:", a * b)',
  'Primer número: 7\nSegundo número: 5\nSuma: 12\nProducto: 35','Lee los dos datos como Real para admitir decimales.'],
 ['e2','Fórmulas','Área de un círculo con constante','Crea una constante con el valor de PI (3.1416). Pide el radio y calcula el área.',
  'Proceso AreaCirculo\n  Definir radio, area Como Real\n  Constante PI <- 3.1416\n  Escribir "Radio:"\n  Leer radio\n  area <- PI * radio ^ 2\n  Escribir "Área: ", area\nFinProceso',
  'PI = 3.1416\nradio = float(input("Radio: "))\narea = PI * radio ** 2\nprint("Área:", area)',
  'Radio: 2\nÁrea: 12.5664','La potencia (^ o **) tiene más prioridad que el producto.'],
 ['e3','Básicos','Probar la prioridad de operaciones','Crea ejemplos de operaciones donde se pueda probar la prioridad.',
  'Proceso Prioridad\n  Escribir "2 + 3 * 4 = ", 2 + 3 * 4\n  Escribir "(2 + 3) * 4 = ", (2 + 3) * 4\n  Escribir "10 - 4 - 3 = ", 10 - 4 - 3\n  Escribir "2 ^ 3 * 2 = ", 2 ^ 3 * 2\n  Escribir "5 > 3 Y 2 > 4 = ", 5 > 3 Y 2 > 4\n  Escribir "5 > 3 O 2 > 4 = ", 5 > 3 O 2 > 4\nFinProceso',
  'print("2 + 3 * 4 =", 2 + 3 * 4)\nprint("(2 + 3) * 4 =", (2 + 3) * 4)\nprint("10 - 4 - 3 =", 10 - 4 - 3)\nprint("2 ** 3 * 2 =", 2 ** 3 * 2)\nprint("5 > 3 and 2 > 4 =", 5 > 3 and 2 > 4)\nprint("5 > 3 or 2 > 4 =", 5 > 3 or 2 > 4)',
  '2 + 3 * 4 = 14\n(2 + 3) * 4 = 20\n10 - 4 - 3 = 3\n2 ** 3 * 2 = 16\n5 > 3 and 2 > 4 = False\n5 > 3 or 2 > 4 = True','A igual prioridad se resuelve de izquierda a derecha: 10 - 4 - 3 = (10 - 4) - 3.'],
 ['e4','Fórmulas','Ecuación de segundo grado','Resuelve ax² + bx + c = 0, primero a papel y luego en PSeInt.',
  'Proceso EcuacionSegundoGrado\n  Definir a, b, c, d, x1, x2 Como Real\n  Escribir "Introduce a, b y c:"\n  Leer a, b, c\n  d <- b^2 - 4*a*c\n  Si d < 0 Entonces\n    Escribir "No tiene soluciones reales"\n  SiNo\n    x1 <- (-b + raiz(d)) / (2*a)\n    x2 <- (-b - raiz(d)) / (2*a)\n    Escribir "x1 = ", x1\n    Escribir "x2 = ", x2\n  FinSi\nFinProceso',
  'import math\na = float(input("a: "))\nb = float(input("b: "))\nc = float(input("c: "))\nd = b ** 2 - 4 * a * c\nif d < 0:\n    print("No tiene soluciones reales")\nelse:\n    x1 = (-b + math.sqrt(d)) / (2 * a)\n    x2 = (-b - math.sqrt(d)) / (2 * a)\n    print("x1 =", x1)\n    print("x2 =", x2)',
  'a=1, b=-5, c=6\nx1 = 3.0\nx2 = 2.0','Los paréntesis en (2*a) son imprescindibles: sin ellos solo se dividiría entre 2 y se multiplicaría por a. El condicional se estudia en el Tema 2.'],
 ['e5','Texto','Apellidos, nombre','Pide un nombre, luego los apellidos y devuelve «apellidos, nombre».',
  'Proceso Nombre\n  Definir nom, ape, res Como Cadena\n  Escribir "Nombre:"\n  Leer nom\n  Escribir "Apellidos:"\n  Leer ape\n  res <- Concatenar(ape, Concatenar(", ", nom))\n  Escribir res\nFinProceso',
  'nombre = input("Nombre: ")\napellidos = input("Apellidos: ")\nprint(f"{apellidos}, {nombre}")',
  'Nombre: Ana\nApellidos: López Ruiz\nLópez Ruiz, Ana','En Python también vale apellidos + ", " + nombre.'],
 ['e6','IDE','Depuración en Visual Studio Code','Investiga sobre la depuración de código en entornos IDE como Visual Studio Code.',
  '',
  'total = 0\nfor i in range(1, 4):\n    total = total + i      # punto de interrupción aquí (F9)\nprint(total)',
  'Con F5 se inicia; F10 avanza una línea; el panel Variables muestra total e i en cada vuelta: total pasa por 1, 3 y 6.','Un punto de interrupción detiene el programa; paso a paso lo hace avanzar una línea; el panel de variables permite comprobar los valores.']],
qa:[
 ['¿Qué es un algoritmo?','Un conjunto ordenado y finito de operaciones, simples y no ambiguas, que permite hallar la solución a un problema. Es independiente del lenguaje y de la máquina.'],
 ['¿Qué diferencia hay entre constante y variable?','La constante mantiene siempre el mismo valor durante toda la ejecución y no se puede modificar; la variable es un espacio de memoria con nombre cuyo valor puede cambiar.'],
 ['¿Cuáles son los tipos de datos básicos?','Entero, real, carácter, cadena de caracteres y lógico (booleano).'],
 ['¿Qué es una expresión?','Una combinación de valores, variables, operadores y funciones que produce un resultado. Puede ser aritmética, relacional o lógica.'],
 ['¿Cuál es el orden de prioridad de los operadores?','1) paréntesis, 2) multiplicación y división, 3) suma y resta, 4) comparaciones y 5) operadores lógicos.'],
 ['¿Qué significa a = a + 1?','Que se calcula a + 1 con el valor actual de a y el resultado se guarda de nuevo en a. Incrementa a en uno.'],
 ['¿Por qué hay que convertir lo que devuelve input()?','Porque input() siempre devuelve texto. Para operar con números hay que usar int() o float().'],
 ['¿Qué es un IDE y qué funciones tiene?','Un entorno de desarrollo integrado: editor de código, compilador o intérprete, depurador, gestión de proyectos y autocompletado.'],
 ['¿Qué es depurar?','Ejecutar el programa de forma controlada para observar su comportamiento, ver el valor de las variables y localizar errores.']]
};
})();
