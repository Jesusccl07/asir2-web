/* IALP · Tema 3 — contenido: programación modular (UT3) */
(function(){
const H=window.H;
window.TEMA={
key:'ia3',rank:'ialp3-ranking',
allDone:'🏆 ¡Batería de ejercicios completada!',
typer:[['p','$ ','python modular.py'],['o','','La suma es: 8'],
  ['p','>> ','def sumar(a, b): return a + b'],['o','','sumar(5, 3)  →  8'],
  ['p','>> ','import math'],['o','','math.sqrt(144)  →  12.0'],
  ['p','>> ','F10  # paso a paso'],['o','','total = 3 · i = 2'],['c','','# ¿Listo para el test? 🔥']],
levels:[[0,'Novato de las funciones','🐣'],[120,'Aprendiz de def','🧩'],[300,'Domador de parámetros','🎛️'],[600,'Maestro del ámbito','🔭'],[1000,'Señor de las librerías','📚'],[1600,'Cazador de bugs','🐞'],[2400,'Arquitecto modular','🏗️'],[3400,'Ninja de la depuración','🥷'],[4800,'Gurú de Python','🐍'],[6500,'Leyenda del código','👑']],
where:{pse:['w-vb','PSeInt','PSeInt'],py:['w-xu','Python','Python'],vs:['w-vs','VS Code','Python'],win:['w-win','Terminal','terminal'],gh:['w-gh','Repasar','Notas']},

sections:[
/* 1 */{id:'t-divide',title:'Divide y vencerás',short:'Divide y vencerás',sub:'Resolver un problema grande dividiéndolo en problemas pequeños.',c:'#8b3fc9',html:
 H.p('En la tradición popular, «divide y vencerás» es sembrar la discordia entre el enemigo. Para los programadores significa otra cosa: <b>subdividir un problema en problemas más simples</b> hasta lograr una implementación sencilla y resoluble. Este modo de plantear la solución es la base de la <b>programación modular</b>.')+
 H.flow([['Problema grande','calculadora|científica','rose'],['Módulos','raíz · potencia|áreas · menú','amber',true],['Subproblemas','cada uno|sencillo','sky'],['Solución','módulos unidos','acc']],'El problema se parte en módulos pequeños que se programan y prueban por separado.')+
 H.cards([['🧱','Piezas pequeñas','Cada módulo hace una sola cosa y la hace bien.','acc'],['🔎','Más fácil de entender','Se lee el programa principal como un guion y se entra en el detalle solo cuando hace falta.','sky'],['🧪','Se prueba por partes','Un fallo se localiza en el módulo que lo causa.','rose']])+
 H.note('tip','Idea','Un programa modular tiene un programa principal corto que va llamando a subprogramas con nombres claros: <code>leer_datos()</code>, <code>calcular()</code>, <code>mostrar()</code>.')},

/* 2 */{id:'t-subprograma',title:'Subprogramas',short:'Subprogramas',sub:'Un bloque con nombre que se define una vez y se usa muchas.',c:'#1a6fd6',html:
 H.p('Un <b>subprograma</b> es un bloque de instrucciones que realiza una tarea específica dentro de un programa. Se <b>define una vez</b> y puede ser <b>utilizado varias veces</b> desde distintas partes, favoreciendo la reutilización, la organización y el mantenimiento.')+
 H.dia('<rect x="30" y="70" width="230" height="90" rx="16" fill="var(--violet-soft)" stroke="var(--violet)" stroke-width="2.5" class="pulse"/><text x="145" y="102" text-anchor="middle" class="svg-t" fill="var(--violet)" font-size="16">SUBPROGRAMA</text><text x="145" y="126" text-anchor="middle" class="svg-m" fill="var(--ink)" font-size="12">se define una vez</text><text x="145" y="144" text-anchor="middle" class="svg-m" fill="var(--muted)" font-size="11.5">def sumar(a, b): …</text>'+
  [['llamada 1','sumar(5, 3)',20],['llamada 2','sumar(10, 4)',90],['llamada 3','sumar(7, 7)',160]].map(([t,c,y],i)=>'<path d="M440 '+(y+25)+'C 350 '+(y+25)+' 340 115 262 115" stroke="var(--muted)" stroke-width="2.2" fill="none" class="flow"/><rect x="442" y="'+y+'" width="240" height="50" rx="12" fill="var(--sky-soft)" stroke="var(--sky)"/><text x="562" y="'+(y+22)+'" text-anchor="middle" class="svg-t" fill="var(--sky)" font-size="13">'+t+'</text><text x="562" y="'+(y+40)+'" text-anchor="middle" class="svg-m" fill="var(--ink)" font-size="12">'+c+'</text>').join(''),
  'Una definición y varias llamadas: el código no se repite.','0 0 760 225','Un subprograma con tres llamadas')+
 H.h3('Ventajas')+
 H.cards([['♻️','Evitan repetir código','Lo escribes una vez y lo llamas cuando quieras.','acc'],['📖','Facilitan la lectura','El programa se entiende de un vistazo.','sky'],['✂️','Dividen problemas complejos','Tareas más pequeñas y manejables.','amber'],['🛠️','Simplifican el mantenimiento','Corriges el error en un único sitio.','rose']],4)},

/* 3 */{id:'t-tipos',title:'Funciones y procedimientos',short:'Función / procedimiento',sub:'Los dos tipos de subprograma: con y sin valor devuelto.',c:'#c76a05',html:
 H.p('Una <b>función</b> realiza una tarea y <b>devuelve un valor</b> como resultado. Un <b>procedimiento</b> realiza una tarea determinada pero <b>no devuelve ningún valor</b>.')+
 H.flow([['Entrada','parámetros|5 y 3','sky'],['Función','sumar(a, b)','amber',true],['Salida','return 8','acc']],'La función recibe datos, trabaja y devuelve un resultado que se puede guardar o usar.',{h:76})+
 H.grid(2,H.code('Funcion resultado <- Sumar(num1, num2)\n  resultado <- num1 + num2\nFinFuncion\n\nProceso Principal\n  Definir total Como Entero\n  total <- Sumar(5, 3)\n  Escribir "La suma es: ", total\nFinProceso','PSeInt · función'),H.code('def sumar(num1, num2):\n    return num1 + num2\n\ntotal = sumar(5, 3)\nprint("La suma es:", total)','Python · función'))+
 H.grid(2,H.code('SubProceso MostrarSaludo(nombre)\n  Escribir "Hola ", nombre\nFinSubProceso\n\nProceso Principal\n  MostrarSaludo("Alfonso")\nFinProceso','PSeInt · procedimiento'),H.code('def mostrar_saludo(nombre):\n    print("Hola", nombre)\n\nmostrar_saludo("Alfonso")','Python · procedimiento'))+
 H.tbl(['','Función','Procedimiento'],[['¿Devuelve valor?','<b>Sí</b> (<code>return</code>)','<b>No</b>'],['Se usa como…','parte de una expresión: <code>total = sumar(5, 3)</code>','una instrucción: <code>mostrar_saludo("Ana")</code>'],['En PSeInt','<code>Funcion … FinFuncion</code>','<code>SubProceso … FinSubProceso</code>'],['En Python','<code>def … return …</code>','<code>def …</code> (sin return)']],'amber')+
 H.posts([['pink','Error típico','Escribir <code>print</code> dentro de una función en vez de <code>return</code> y luego intentar guardar su resultado: la variable vale <code>None</code>.'],['','Python devuelve None','Una función sin return devuelve <code>None</code> automáticamente.']])},

/* 4 */{id:'t-params',title:'Paso de parámetros',short:'Parámetros',sub:'Por valor (una copia) o por referencia (la variable original).',c:'#d93b55',html:
 H.p('Un <b>parámetro</b> es el dato que se le pasa a un subprograma. Hay dos formas de pasarlo.')+
 H.grid(2,H.card('📄','Por valor','El subprograma recibe una <b>copia</b>. Lo que haga con ella <b>no afecta</b> a la variable original.','sky'),H.card('🔗','Por referencia','El subprograma trabaja <b>directamente sobre la variable original</b>: los cambios <b>sí</b> se ven fuera.','rose'))+
 H.dia('<rect x="30" y="30" width="320" height="150" rx="16" fill="var(--sky-soft)" stroke="var(--sky)" stroke-width="2"/><text x="190" y="58" text-anchor="middle" class="svg-t" fill="var(--sky)" font-size="15">POR VALOR</text><rect x="60" y="76" width="90" height="42" rx="8" fill="var(--panel)" stroke="var(--sky)"/><text x="105" y="102" text-anchor="middle" class="svg-m" fill="var(--ink)" font-size="13">x = 5</text><path d="M152 97H210" stroke="var(--muted)" stroke-width="2.5" class="flow"/><rect x="212" y="76" width="110" height="42" rx="8" fill="var(--panel)" stroke="var(--sky)" stroke-dasharray="4 3"/><text x="267" y="102" text-anchor="middle" class="svg-m" fill="var(--ink)" font-size="13">num = 10 (copia)</text><text x="190" y="152" text-anchor="middle" class="svg-m" fill="var(--muted)" font-size="11.5">fuera: x sigue valiendo 5</text>'+
  '<rect x="410" y="30" width="320" height="150" rx="16" fill="var(--rose-soft)" stroke="var(--rose)" stroke-width="2"/><text x="570" y="58" text-anchor="middle" class="svg-t" fill="var(--rose)" font-size="15">POR REFERENCIA</text><rect x="500" y="76" width="140" height="42" rx="8" fill="var(--panel)" stroke="var(--rose)" class="pulse"/><text x="570" y="102" text-anchor="middle" class="svg-m" fill="var(--ink)" font-size="13">numero = 6</text><path d="M440 97H498M700 97H642" stroke="var(--muted)" stroke-width="2.5" class="flow"/><text x="570" y="152" text-anchor="middle" class="svg-m" fill="var(--muted)" font-size="11.5">fuera y dentro: la misma variable</text>',
  'Por valor se copia; por referencia se comparte la misma variable.','0 0 760 205','Paso por valor y por referencia')+
 H.grid(2,H.code('SubProceso Duplicar(num)\n  num <- num * 2\n  Escribir "Dentro: ", num\nFinSubProceso\n\nProceso Principal\n  Definir x Como Entero\n  x <- 5\n  Duplicar(x)\n  Escribir "Fuera: ", x\nFinProceso','PSeInt · por valor'),H.code('def duplicar(num):\n    num = num * 2\n    print("Dentro:", num)\n\nx = 5\nduplicar(x)\nprint("Fuera:", x)','Python · por valor'))+
 H.out('Dentro: 10\nFuera: 5')+
 H.grid(2,H.code('SubProceso Incrementar(valor Por Referencia)\n  valor <- valor + 1\nFinSubProceso\n\nProceso Principal\n  Definir numero Como Entero\n  numero <- 5\n  Incrementar(numero)\n  Escribir numero\nFinProceso','PSeInt · por referencia'),H.code('# Python no tiene paso por referencia nativo.\n# Con estructuras de datos se simula:\ndef agregar_elemento(lista):\n    lista.append(4)\n\nnumeros = [1, 2, 3]\nagregar_elemento(numeros)\nprint(numeros)   # [1, 2, 3, 4]','Python · simulado con una lista'))+
 H.note('info','Por qué la lista sí cambia','En Python los números y textos no se pueden modificar «en su sitio» (inmutables), así que una reasignación dentro de la función crea otra variable local. Las listas sí se modifican, y por eso funcionan como paso por referencia.')+
 H.lab('labPar','¿Cambia la variable de fuera?',
  '<div class="row">'+H.seg('parSel',[['num','Número (int)'],['txt','Texto (str)'],['lst','Lista (list)']])+'</div><div class="code" data-fn="Python" data-nohl id="parCode"><pre></pre></div><div class="term-out" id="parOut"></div>')},

/* 5 */{id:'t-defecto',title:'Parámetros por defecto',short:'Por defecto',sub:'Valores que se usan cuando al llamar no se da ninguno.',c:'#4f46e5',html:
 H.p('Los <b>parámetros con valor por defecto</b> reciben un valor ya en la definición. Si al llamar al subprograma no se proporciona, se usa automáticamente ese valor.')+
 H.grid(2,H.code('// No implementado en PSeInt','PSeInt'),H.code('def saludar(nombre, idioma="español"):\n    print("Hola", nombre)\n    print("Idioma:", idioma)\n\nsaludar("Alfonso")\nsaludar("Ana", "inglés")','Python · por defecto'))+
 H.out('Hola Alfonso\nIdioma: español\nHola Ana\nIdioma: inglés')+
 H.note('warn','Los obligatorios, primero','Los parámetros con valor por defecto van <b>detrás</b> de los obligatorios: <code>def f(a, b=2)</code> es válido y <code>def f(a=1, b)</code> da error.')+
 H.lab('labDef','Prueba saludar()',
  '<div class="row"><label for="dfN">nombre</label><input type="text" id="dfN" value="Alfonso" style="max-width:160px"><label for="dfI">idioma (vacío = por defecto)</label><input type="text" id="dfI" value="" style="max-width:160px"></div><div class="term-out" id="dfOut"></div>')+
 H.posts([['','Útil para opciones','Valores razonables que casi siempre son los mismos: decimales a mostrar, separador, idioma…'],['blue','En PSeInt','No está implementado: hay que pasar siempre todos los parámetros.']])},

/* 6 */{id:'t-comentarios',title:'Comentarios',short:'Comentarios',sub:'Texto para personas: el ordenador lo ignora.',c:'#0c9a6a',html:
 H.p('Los <b>comentarios</b> son textos incluidos en el código que explican su funcionamiento a otros programadores o recuerdan detalles importantes. El ordenador los <b>ignora</b> durante la ejecución.')+
 H.grid(2,H.code('// Esto es un comentario en PSeInt\nProceso Principal\n  Escribir "Hola" // también al final de línea\nFinProceso','PSeInt · //'),H.code('# Esto es un comentario en Python\nprint("Hola")  # también al final de línea','Python · #'))+
 H.vs('Comentario inútil','x = x + 1   # suma 1 a x','Repite lo que ya dice el código.','Comentario útil','x = x + 1   # pasamos al siguiente alumno','Explica el porqué, no el qué.')+
 H.posts([['green','Qué comentar','El propósito de cada función, los parámetros que recibe y lo que devuelve.'],['pink','Qué no comentar','Lo evidente. Es mejor un buen nombre de variable que un comentario.'],['blue','Docstring','En Python, una cadena entre triples comillas justo después del <code>def</code> documenta la función (y <code>help()</code> la muestra).']])+
 H.code('def area_circulo(radio):\n    """Devuelve el área de un círculo de radio dado."""\n    return 3.1416 * radio ** 2','Python · documentar una función')},

/* 7 */{id:'t-ambito',title:'Variables globales y locales',short:'Ámbito',sub:'Dónde existe y desde dónde se puede usar cada variable.',c:'#0e7bbd',html:
 H.p('Las variables tienen distinto <b>ámbito</b> (scope): las zonas del programa donde son accesibles.')+
 H.grid(2,H.card('🌍','Globales','Se declaran <b>fuera</b> de los subprogramas y se pueden utilizar desde cualquier parte del programa.','sky'),H.card('🏠','Locales','Se declaran <b>dentro</b> de una función o procedimiento y solo existen durante su ejecución.','amber'))+
 H.dia('<rect x="20" y="20" width="720" height="185" rx="18" fill="var(--sky-soft)" stroke="var(--sky)" stroke-width="2"/><text x="40" y="48" class="svg-t" fill="var(--sky)" font-size="15">🌍 Ámbito global</text><text x="40" y="72" class="svg-m" fill="var(--ink)" font-size="13">contador = 0</text>'+
  '<rect x="60" y="92" width="290" height="92" rx="14" fill="var(--amber-soft)" stroke="var(--amber)" stroke-width="2" class="pulse"/><text x="80" y="118" class="svg-t" fill="var(--amber)" font-size="14">🏠 def saludar():</text><text x="80" y="142" class="svg-m" fill="var(--ink)" font-size="13">nombre = "Alfonso"</text><text x="80" y="164" class="svg-m" fill="var(--muted)" font-size="11.5">solo existe aquí dentro</text>'+
  '<rect x="400" y="92" width="310" height="92" rx="14" fill="var(--panel)" stroke="var(--line)"/><text x="420" y="118" class="svg-t" fill="var(--ink)" font-size="14">Fuera de la función</text><text x="420" y="142" class="svg-m" fill="var(--ink)" font-size="13">print(contador)  ✔</text><text x="420" y="164" class="svg-m" fill="var(--rose)" font-size="13">print(nombre)    ✘ NameError</text>',
  'Dentro de la función se ven las dos; fuera solo la global.','0 0 760 225','Ámbito global y local')+
 H.grid(2,H.code('Definir contador Como Entero\ncontador <- 0\n\nSubProceso Incrementar()\n  contador <- contador + 1\nFinSubProceso\n\nProceso Principal\n  Incrementar()\n  Escribir contador\nFinProceso','PSeInt · global'),H.code('contador = 0\n\ndef incrementar():\n    global contador\n    contador = contador + 1\n\nincrementar()\nprint(contador)   # 1','Python · global'))+
 H.grid(2,H.code('SubProceso Saludar()\n  Definir nombre Como Cadena\n  nombre <- "Alfonso"\n  Escribir nombre\nFinSubProceso','PSeInt · local'),H.code('def saludar():\n    nombre = "Alfonso"\n    print(nombre)\n\nsaludar()','Python · local'))+
 H.note('warn','global es necesario para modificar','En Python se puede <b>leer</b> una global sin más, pero para <b>modificarla</b> dentro de una función hay que declararla con <code>global</code>. Sin ello, Python crea una variable local nueva (o da UnboundLocalError).')+
 H.lab('labAmb','¿Qué pasa con y sin global?',
  '<div class="row">'+H.seg('ambSel',[['con','con global'],['sin','sin global']])+'</div><div class="code" data-fn="Python" data-nohl id="ambCode"><pre></pre></div><div class="term-out" id="ambOut"></div>')+
 H.posts([['pink','Buena práctica','Usar pocas variables globales: es mejor pasar datos por parámetros y devolver resultados con return.']])},

/* 8 */{id:'t-builtin',title:'Funciones predefinidas',short:'Built-in',sub:'Las funciones integradas de Python que siempre están disponibles.',c:'#c76a05',html:
 H.p('Python incluye <b>funciones integradas (built-in)</b> que no necesitan <code>import</code>.')+
 H.tbl(['Función','Qué hace','Ejemplo'],[['<code>print()</code>','Muestra información por pantalla','<code>print("Hola")</code>'],['<code>input()</code>','Solicita datos al usuario','<code>input("Nombre: ")</code>'],['<code>len()</code>','Longitud de una cadena, lista, tupla…','<code>len("hola")</code> → 4'],['<code>type()</code>','Indica el tipo de un dato','<code>type(3.5)</code> → float'],['<code>int() float() str() bool()</code>','Convierten un valor de tipo','<code>int("7")</code> → 7'],['<code>max() min()</code>','Mayor y menor valor','<code>max(3, 9, 5)</code> → 9'],['<code>sum()</code>','Suma los elementos de una colección','<code>sum([1, 2, 3])</code> → 6'],['<code>round()</code>','Redondea un número','<code>round(3.14159, 2)</code> → 3.14'],['<code>abs()</code>','Valor absoluto','<code>abs(-4)</code> → 4'],['<code>pow()</code>','Calcula una potencia','<code>pow(2, 3)</code> → 8'],['<code>range()</code>','Genera secuencias numéricas','<code>range(1, 4)</code> → 1 2 3'],['<code>sorted()</code>','Ordena una colección','<code>sorted([3, 1, 2])</code> → [1, 2, 3]'],['<code>enumerate()</code>','Devuelve índice y valor al iterar','<code>for i, x in enumerate(lista)</code>'],['<code>zip()</code>','Combina varias colecciones','<code>zip(a, b)</code>']],'amber')+
 H.code('notas = [7, 9, 5, 10]\nprint(len(notas))              # 4\nprint(max(notas), min(notas))  # 10 5\nprint(sum(notas) / len(notas)) # 7.75\nprint(sorted(notas))           # [5, 7, 9, 10]\nfor i, n in enumerate(notas):\n    print(i, n)','Python · funciones predefinidas')+
 H.posts([['','No pises sus nombres','Llamar <code>max</code> o <code>sum</code> a tus variables oculta la función predefinida.'],['blue','round no es truncar','<code>round(2.5)</code> da 2 (redondeo al par). Para truncar, <code>int()</code>.']])},

/* 9 */{id:'t-librerias',title:'Librerías',short:'Librerías',sub:'Módulos de Python que se importan para ampliar el lenguaje.',c:'#d93b55',html:
 H.p('Una <b>librería</b> (módulo) agrupa funciones relacionadas. Se carga con <code>import</code> y se usa con la notación <code>módulo.función()</code>.')+
 H.code('import math\nimport random\n\nprint(math.sqrt(144))         # 12.0\nprint(random.randint(1, 6))   # un dado\nfrom math import pi           # importar solo pi\nprint(pi)','Python · import')+
 H.grid(3,
  H.tbl(['math','Qué hace'],[['<code>math.sqrt(x)</code>','raíz cuadrada'],['<code>math.pow(x, y)</code>','potencia'],['<code>math.pi</code>','constante π']],'sky'),
  H.tbl(['random','Qué hace'],[['<code>randint(a, b)</code>','entero entre a y b'],['<code>random()</code>','decimal entre 0 y 1'],['<code>choice(lista)</code>','elemento al azar']],'rose'),
  H.tbl(['datetime','Qué hace'],[['<code>datetime.now()</code>','fecha y hora actuales'],['<code>datetime.today()</code>','fecha actual']],'amber'))+
 H.grid(3,
  H.tbl(['statistics','Qué hace'],[['<code>mean(datos)</code>','media'],['<code>median(datos)</code>','mediana'],['<code>stdev(datos)</code>','desviación típica']],'violet'),
  H.tbl(['os','Qué hace'],[['<code>os.getcwd()</code>','directorio actual'],['<code>os.mkdir(c)</code>','crea una carpeta'],['<code>os.listdir()</code>','lista ficheros y carpetas']],'acc'),
  H.tbl(['time','Qué hace'],[['<code>time.sleep(s)</code>','pausa la ejecución'],['<code>time.time()</code>','tiempo actual en segundos']],'sky'))+
 H.grid(3,
  H.tbl(['string','Qué hace'],[['<code>ascii_letters</code>','letras del alfabeto'],['<code>digits</code>','dígitos 0-9']],'amber'),
  H.tbl(['turtle','Qué hace'],[['<code>forward(100)</code>','avanza 100 píxeles'],['<code>left(90)</code>','gira 90 grados'],['<code>circle(50)</code>','dibuja un círculo']],'rose'),
  H.tbl(['tkinter','Qué hace'],[['<code>Tk()</code>','crea una ventana gráfica'],['<code>Button()</code>','crea un botón'],['<code>Label()</code>','crea una etiqueta']],'violet'))+
 H.lab('labLib','Prueba una función de librería',
  '<div class="row"><select id="lbSel" aria-label="Función"></select><button class="btn pri sm" id="lbRun" type="button">▶ Ejecutar</button></div><div class="term-out" id="lbOut"></div>')},

/* 10 */{id:'t-depuracion',title:'Depuración de código',short:'Depuración',sub:'Ejecutar de forma controlada para encontrar errores.',c:'#8b3fc9',html:
 H.p('La <b>depuración</b> (debugging) es el proceso de ejecutar un programa de forma controlada para observar su comportamiento, comprobar el valor de las variables y localizar posibles errores.')+
 H.cards([['⏯️','Ejecución paso a paso','Una instrucción cada vez (F10 / F11 en VS Code).','acc'],['🔴','Puntos de interrupción','El programa se detiene al llegar a una línea marcada (F9).','rose'],['👁️','Observación de variables','Ver cómo cambia el valor de cada variable.','sky']])+
 H.lab('labDeb','Depurador simulado: pon puntos de interrupción',
  '<p class="muted" style="margin:0 0 10px;font-size:.88rem">Haz clic en el número de una línea para poner o quitar un punto de interrupción 🔴. Después pulsa «Continuar».</p><div class="row"><button class="btn pri sm" id="dbStep" type="button">⤵ Paso (F10)</button><button class="btn sm" id="dbCont" type="button">▶ Continuar (F5)</button><button class="btn sm" id="dbRst" type="button">↺ Reiniciar</button></div><div class="code" data-fn="Python · suma de 1 a 3" data-nohl id="dbCode"><pre></pre></div><div class="cells" id="dbVars" style="margin-top:10px"></div><div class="term-out" id="dbOut" style="margin-top:8px"></div>')+
 H.posts([['','Atajos de VS Code','<kbd>F5</kbd> iniciar/continuar · <kbd>F9</kbd> punto de interrupción · <kbd>F10</kbd> paso por encima · <kbd>F11</kbd> entrar · <kbd>Mayús+F5</kbd> parar.'],['pink','Errores sin excepción','Si no sale error pero el resultado es incorrecto, es un error lógico: solo el paso a paso te enseña dónde se tuerce.'],['green','Método','1) reproducir el fallo, 2) poner un punto de interrupción antes, 3) avanzar mirando las variables, 4) corregir y repetir.']])},

/* 11 */{id:'t-diseno',title:'Diseño de programas modulares',short:'Diseño modular',sub:'Cómo estructurar los ejercicios con un menú y varias funciones.',c:'#1a6fd6',html:
 H.p('Los ejercicios de la batería (calculadora, primos, fuerza bruta…) se resuelven con el mismo esquema: <b>funciones pequeñas</b> y un <b>programa principal</b> que las coordina.')+
 H.flow([['main()','menú y bucle','violet',true],['leer_dato()','pide y valida','sky'],['calcular()','la lógica','amber'],['mostrar()','el resultado','acc']],'El programa principal solo coordina; cada función hace una tarea.')+
 H.code('import math\n\ndef raiz(x):\n    return math.sqrt(x)\n\ndef area_circulo(r):\n    return math.pi * r ** 2\n\ndef menu():\n    print("1. Raíz  2. Área círculo  s. Salir")\n    return input("Opción: ")\n\ndef main():\n    opcion = menu()\n    while opcion != "s":\n        if opcion == "1":\n            print(raiz(float(input("Número: "))))\n        elif opcion == "2":\n            print(area_circulo(float(input("Radio: "))))\n        opcion = menu()\n\nmain()','Python · estructura modular')+
 H.note('tip','Reglas','1) Cada función hace <b>una</b> cosa. 2) Recibe los datos por parámetros y devuelve con <code>return</code>. 3) Nombres claros. 4) Prueba cada función por separado antes de unirlas.')+
 H.posts([['','El menú con while','«El programa seguirá ejecutándose hasta que pulses la tecla s» → bucle que termina cuando opcion == "s".'],['pink','No leas dentro de las funciones de cálculo','Así se pueden reutilizar y probar con datos fijos.']])}
],

flips:{},
datos:[['Profesor','Alfonso José Padilla Navarrete'],['Unidad','UT3 · Programación modular'],['Ejercicios','Batería 1 · 5 ejercicios'],['Carpeta','ialp_tema3'],['Librerías','math · random'],['Fichero','ialp_t3_eN.py']],
pDiagram:H.flow([['Enunciado','leer con calma','rose'],['Funciones','qué módulos hacen falta','amber'],['main()','el menú y el flujo','violet',true],['Pruebas','cada función sola','sky'],['Depurar','F9 · F10','acc']],'Método: dividir primero, programar después, probar cada módulo y depurar lo que falle.',{gap:34}),
phases:[
 {t:'Preparar',c:'#8b3fc9',s:[
  ['a1','win','Crear la carpeta del tema','Una carpeta para los ejercicios del tema.','mkdir ialp_tema3\ncd ialp_tema3\ncode .'],
  ['a2','py','Probar una librería','Comprueba que math y random funcionan.','python -c "import math, random; print(math.sqrt(16), random.randint(1, 6))"']]},
 {t:'Batería de ejercicios 1',c:'#d93b55',s:[
  ['b1','py','E1 · calculadora científica','Menú con raíz, potencia, área del círculo y del cuadrado. Termina con la tecla s.',''],
  ['b2','py','E2 · números primos','Todos los primos hasta el número dado, con una función es_primo.',''],
  ['b3','py','E3 · ataque por fuerza bruta','El ordenador adivina un número de 4 cifras probando 0000, 0001, 0002…',''],
  ['b4','py','E4 · adivina el número','Número aleatorio 0-100, pistas «mayor/menor» y contador de intentos.',''],
  ['b5','py','E5 · piedra, papel o tijera','Primero a 3 victorias contra el ordenador.','']]},
 {t:'Depuración y repaso',c:'#0c9a6a',s:[
  ['c1','vs','Depurar un ejercicio con VS Code','Pon un punto de interrupción (F9), inicia (F5) y avanza con F10 mirando las variables.',''],
  ['c2','pse','Traducir un ejercicio a PSeInt','Pasa una de las soluciones a funciones y SubProceso de PSeInt.',''],
  ['c3','py','Comentar tus funciones','Añade un comentario o docstring a cada función.','']]}],
cheat:[
 ['Funcion res <- Nombre(a, b) … FinFuncion','pse','Función en PSeInt'],['SubProceso Nombre(a) … FinSubProceso','pse','Procedimiento en PSeInt'],['SubProceso Inc(v Por Referencia)','pse','Parámetro por referencia'],['// comentario','pse','Comentario'],['Aleatorio(0, 100)','pse','Aleatorio entero'],['Raiz(x)  Trunc(x)  Abs(x)','pse','Funciones matemáticas'],
 ['def nombre(a, b=0):','py','Definir función (b por defecto)'],['return valor','py','Devolver un resultado'],['global x','py','Modificar una variable global'],['import math','py','Importar una librería'],['from random import randint','py','Importar solo una función'],['math.sqrt(x) · math.pi','py','Raíz cuadrada y π'],['random.randint(0, 100)','py','Entero aleatorio'],['random.choice(["a", "b"])','py','Elemento al azar'],['len · max · min · sum · sorted','py','Funciones predefinidas'],['F5 · F9 · F10 · F11','vs','Depurar en VS Code'],['if __name__ == "__main__":','py','Punto de entrada del programa']],
fails:[
 ['pink','TypeError: falta un argumento','Llamas a la función con menos parámetros de los que pide (y sin valor por defecto).'],
 ['','La función devuelve None','Usaste print en vez de return, o te falta el return en alguna rama.'],
 ['blue','UnboundLocalError','Modificas una variable global dentro de la función sin declararla con global.'],
 ['green','NameError al llamar a la función','La llamas antes de definirla: la definición (def) debe ir antes de la llamada.'],
 ['orange','ModuleNotFoundError','Escribiste mal el import o la librería no está instalada.']],
exCats:{Menús:'#8b3fc9',Números:'#1a6fd6',Juegos:'#d93b55'},
ex:[
 ['e1','Menús','Calculadora científica','Desarrolla una calculadora con un menú que permita realizar raíces cuadradas, potencias, cálculo de áreas de círculos y de cuadrados. El programa seguirá ejecutándose hasta que pulses la tecla «s».',
  'Funcion r <- AreaCirculo(radio)\n  r <- PI * radio ^ 2\nFinFuncion\n\nFuncion r <- AreaCuadrado(lado)\n  r <- lado ^ 2\nFinFuncion\n\nProceso Calculadora\n  Definir op Como Cadena\n  Definir x, y Como Real\n  Repetir\n    Escribir "1.Raíz 2.Potencia 3.Área círculo 4.Área cuadrado s.Salir"\n    Leer op\n    Segun op Hacer\n      "1": Leer x\n           Escribir raiz(x)\n      "2": Leer x, y\n           Escribir x ^ y\n      "3": Leer x\n           Escribir AreaCirculo(x)\n      "4": Leer x\n           Escribir AreaCuadrado(x)\n    FinSegun\n  Hasta Que op = "s"\nFinProceso',
  'import math\n\ndef raiz(x):\n    return math.sqrt(x)\n\ndef potencia(base, exp):\n    return base ** exp\n\ndef area_circulo(r):\n    return math.pi * r ** 2\n\ndef area_cuadrado(lado):\n    return lado ** 2\n\ndef menu():\n    print("1. Raíz  2. Potencia  3. Área círculo  4. Área cuadrado  s. Salir")\n    return input("Opción: ")\n\nopcion = menu()\nwhile opcion != "s":\n    match opcion:\n        case "1":\n            print(raiz(float(input("Número: "))))\n        case "2":\n            b = float(input("Base: "))\n            e = float(input("Exponente: "))\n            print(potencia(b, e))\n        case "3":\n            print(area_circulo(float(input("Radio: "))))\n        case "4":\n            print(area_cuadrado(float(input("Lado: "))))\n        case _:\n            print("Opción incorrecta")\n    opcion = menu()',
  'Opción: 3\nRadio: 2\n12.566370614359172\nOpción: s','Cada operación es una función; el bucle principal solo las llama. La salida con «s» se comprueba en la condición del while. (En PSeInt se escribiría como función que devuelve el valor.)'],
 ['e2','Números','Números primos hasta N','Crea un programa que pida un número y muestre todos los números primos que existen hasta llegar a él.',
  'Funcion r <- EsPrimo(n)\n  Definir i Como Entero\n  r <- n > 1\n  i <- 2\n  Mientras i * i <= n Y r Hacer\n    Si n MOD i = 0 Entonces\n      r <- Falso\n    FinSi\n    i <- i + 1\n  FinMientras\nFinFuncion\n\nProceso Primos\n  Definir n, k Como Entero\n  Leer n\n  Para k <- 2 Hasta n Con Paso 1 Hacer\n    Si EsPrimo(k) Entonces\n      Escribir k\n    FinSi\n  FinPara\nFinProceso',
  'def es_primo(n):\n    if n < 2:\n        return False\n    i = 2\n    while i * i <= n:\n        if n % i == 0:\n            return False\n        i += 1\n    return True\n\nn = int(input("Número: "))\nfor k in range(2, n + 1):\n    if es_primo(k):\n        print(k, end=" ")\nprint()',
  'Número: 20\n2 3 5 7 11 13 17 19','La función es_primo se reutiliza para cada número: es la ventaja de la programación modular. return sale en cuanto encuentra un divisor.'],
 ['e3','Juegos','Ataque por fuerza bruta','Escribe un programa que pida un número de 4 cifras. A continuación utiliza el método de fuerza bruta para que el ordenador adivine el número tecleado.',
  'Proceso FuerzaBruta\n  Definir secreto, intento, intentos Como Entero\n  Escribir "Número de 4 cifras:"\n  Leer secreto\n  intento <- 0\n  intentos <- 1\n  Mientras intento <> secreto Hacer\n    intento <- intento + 1\n    intentos <- intentos + 1\n  FinMientras\n  Escribir "Encontrado: ", intento, " tras ", intentos, " intentos"\nFinProceso',
  'def fuerza_bruta(secreto):\n    for intento in range(10000):\n        if intento == secreto:\n            return intento\n\nsecreto = int(input("Número de 4 cifras: "))\nprint("Encontrado:", f"{fuerza_bruta(secreto):04d}")',
  'Número de 4 cifras: 4321\nEncontrado: 4321','Fuerza bruta = probar todas las combinaciones (0000 a 9999) hasta dar con la buena. Por eso las contraseñas cortas son inseguras. {:04d} rellena con ceros.'],
 ['e4','Juegos','Adivina el número','Genera un número aleatorio entre 0 y 100 y guárdalo en una variable. El programa irá pidiendo números hasta que aciertes el aleatorio generado, mostrando finalmente el número de intentos.',
  'Proceso Adivina\n  Definir secreto, n, intentos Como Entero\n  secreto <- Aleatorio(0, 100)\n  intentos <- 0\n  Repetir\n    Escribir "Tu número:"\n    Leer n\n    intentos <- intentos + 1\n    Si n < secreto Entonces\n      Escribir "Más alto"\n    SiNo\n      Si n > secreto Entonces\n        Escribir "Más bajo"\n      FinSi\n    FinSi\n  Hasta Que n = secreto\n  Escribir "¡Acertaste en ", intentos, " intentos!"\nFinProceso',
  'import random\n\ndef pedir_numero():\n    return int(input("Tu número: "))\n\nsecreto = random.randint(0, 100)\nintentos = 0\nwhile True:\n    n = pedir_numero()\n    intentos += 1\n    if n < secreto:\n        print("Más alto")\n    elif n > secreto:\n        print("Más bajo")\n    else:\n        break\nprint(f"¡Acertaste en {intentos} intentos!")',
  'Tu número: 50\nMás alto\nTu número: 75\nMás bajo\nTu número: 62\n¡Acertaste en 3 intentos!','Es un Repetir-Hasta clásico: se pide al menos una vez y se sale al acertar (while True + break).'],
 ['e5','Juegos','Piedra, papel o tijera','Desarrolla el juego piedra, papel o tijera para jugar contra el PC. El sistema genera un valor de los 3 aleatorio y lo enfrenta al que tú introduzcas. Gana el que primero llegue a 3.',
  'Funcion r <- Gana(a, b)\n  r <- (a = 1 Y b = 3) O (a = 2 Y b = 1) O (a = 3 Y b = 2)\nFinFuncion\n\nProceso PPT\n  Definir yo, pc, puntosYo, puntosPc Como Entero\n  puntosYo <- 0\n  puntosPc <- 0\n  Mientras puntosYo < 3 Y puntosPc < 3 Hacer\n    Escribir "1.Piedra 2.Papel 3.Tijera"\n    Leer yo\n    pc <- Aleatorio(1, 3)\n    Si yo = pc Entonces\n      Escribir "Empate"\n    SiNo\n      Si Gana(yo, pc) Entonces\n        puntosYo <- puntosYo + 1\n      SiNo\n        puntosPc <- puntosPc + 1\n      FinSi\n    FinSi\n  FinMientras\nFinProceso',
  'import random\n\nNOMBRES = {1: "piedra", 2: "papel", 3: "tijera"}\n\ndef gana(a, b):\n    return (a, b) in [(1, 3), (2, 1), (3, 2)]\n\nyo_p = pc_p = 0\nwhile yo_p < 3 and pc_p < 3:\n    yo = int(input("1 piedra, 2 papel, 3 tijera: "))\n    pc = random.randint(1, 3)\n    print(f"Tú: {NOMBRES[yo]} · PC: {NOMBRES[pc]}")\n    if yo == pc:\n        print("Empate")\n    elif gana(yo, pc):\n        yo_p += 1\n        print("¡Punto para ti!")\n    else:\n        pc_p += 1\n        print("Punto para el PC")\n    print(f"Marcador {yo_p} - {pc_p}")\nprint("¡Ganaste!" if yo_p == 3 else "Ha ganado el PC")',
  'Tú: papel · PC: piedra\n¡Punto para ti!\nMarcador 1 - 0\n…\n¡Ganaste!','La función gana(a, b) encapsula las reglas del juego; el bucle principal solo cuenta puntos hasta que alguien llega a 3.']],
qa:[
 ['¿Qué es un subprograma y qué ventajas tiene?','Un bloque de instrucciones con una tarea concreta que se define una vez y se usa varias. Evita repetir código, mejora la lectura, divide problemas complejos y simplifica el mantenimiento.'],
 ['¿Qué diferencia hay entre función y procedimiento?','La función devuelve un valor (return) y se usa dentro de expresiones; el procedimiento realiza una tarea pero no devuelve nada.'],
 ['¿Qué diferencia hay entre paso por valor y por referencia?','Por valor el subprograma recibe una copia y no modifica la variable original; por referencia trabaja con la original y los cambios se ven fuera.'],
 ['¿Python tiene paso por referencia?','No de forma nativa. Se simula pasando estructuras mutables como listas, que sí se modifican dentro de la función.'],
 ['¿Cuándo se necesita la palabra global?','Cuando una función tiene que modificar (no solo leer) una variable global.'],
 ['¿Qué es el ámbito de una variable?','La zona del programa donde se puede usar. Las locales solo existen dentro de su función; las globales, en todo el programa.'],
 ['¿Qué son los parámetros por defecto?','Valores que se asignan en la definición y se usan si al llamar no se da ninguno. PSeInt no los implementa.'],
 ['¿Qué es una librería y cómo se usa?','Un módulo con funciones ya hechas (math, random, datetime…). Se carga con import y se llama con módulo.función().'],
 ['¿Qué es depurar y qué técnicas hay?','Ejecutar el programa de forma controlada para encontrar errores: ejecución paso a paso, puntos de interrupción y observación de variables.']]
};
})();
