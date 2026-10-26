/* IALP · Tema 3 — banco de preguntas (la primera opción es la correcta; el test las mezcla) */
(function(){
window.TEMA_TOPICS={divide:'Divide y vencerás',sub:'Subprogramas',tipos:'Función / procedimiento',params:'Parámetros',defecto:'Por defecto',coment:'Comentarios',ambito:'Ámbito',builtin:'Predefinidas',libs:'Librerías',depur:'Depuración',diseno:'Diseño modular',ejercicios:'Ejercicios'};
const q=(b,l,p,o,e,c)=>[b,l,p,o,0,e,c];
window.TEMA_QUESTIONS=[
/* divide */
q('divide',1,'¿Qué significa «divide y vencerás» para un programador?',['Dividir un problema en subproblemas más simples hasta poder resolverlos','Atacar al enemigo por separado','Copiar código ajeno','Escribir todo en un único bloque'],'Es la base de la programación modular.'),
q('divide',1,'¿Cuál es la base de la programación modular?',['Dividir el problema en partes más sencillas','Usar solo variables globales','No usar funciones','Escribir un solo archivo'],'Se resuelve cada parte por separado y luego se unen.'),
q('divide',2,'¿Qué ventaja tiene probar cada módulo por separado?',['Se localiza más fácilmente el módulo que falla','El programa va más rápido','Se necesitan menos variables','No hace falta depurar'],'Un fallo queda acotado a su módulo.'),
q('divide',2,'En un programa modular, ¿cómo debería ser el programa principal?',['Corto, llamando a subprogramas con nombres claros','Muy largo con todo el código','Vacío','Igual que cualquier función'],'Coordina, no calcula.'),
q('divide',3,'Quieres una calculadora con raíz, potencia y áreas. ¿Cómo la modularizas?',['Una función por operación y un menú que las llama','Un único bloque if enorme','Una variable global por operación','Un bucle for'],'Cada operación es un módulo independiente.'),
q('divide',3,'¿Qué NO es una ventaja de dividir el problema?',['Que el programa necesite menos pasos totales siempre','Mejor organización','Reutilización','Mantenimiento más fácil'],'Dividir mejora la organización, no reduce necesariamente el número de operaciones.'),

/* sub */
q('sub',1,'¿Qué es un subprograma?',['Un bloque de instrucciones que realiza una tarea específica dentro de un programa','Un programa más pequeño que se ejecuta aparte','Una variable especial','Un comentario'],'Se define una vez y se usa varias.'),
q('sub',1,'¿Cuántas veces se define un subprograma?',['Una','Cada vez que se usa','Dos','Ninguna'],'Se define una vez y se llama las veces que haga falta.'),
q('sub',1,'¿Cuál es una ventaja de los subprogramas?',['Evitan repetir código','Hacen el código más largo','Impiden el mantenimiento','Obligan a usar globales'],'Lo escribes una vez.'),
q('sub',2,'¿Qué ventaja da en el mantenimiento?',['Un error se corrige en un único sitio','Hay que corregirlo en todas las llamadas','No hay errores','Se ejecuta más veces'],'La definición es única.'),
q('sub',2,'Las ventajas indicadas en los apuntes incluyen…',['Evitar repetir código, facilitar la lectura, dividir problemas y simplificar el mantenimiento','Solo velocidad','Solo ahorro de memoria','Ninguna'],'Cuatro ventajas principales.'),
q('sub',2,'¿Cómo se ejecuta un subprograma?',['Llamándolo por su nombre','Definiéndolo','Con un import','Con global'],'Definir no ejecuta; hay que llamarlo.'),
q('sub',3,'¿Qué imprime este código?',['Nada','Hola','Error','None'],'Solo se define la función; nunca se llama.','def saludar():\n    print("Hola")'),
q('sub',3,'¿Cuántas veces se imprime «Hola»?',['2','1','3','0'],'La función se llama dos veces.','def saludar():\n    print("Hola")\n\nsaludar()\nsaludar()'),
q('sub',3,'¿Cuál es el problema?',['La función se llama antes de definirse','Falta un return','Sobra el print','Ninguno'],'Python lee de arriba abajo: la definición debe ir antes de la llamada (NameError).','saludar()\n\ndef saludar():\n    print("Hola")'),

/* tipos */
q('tipos',1,'¿Qué es una función?',['Un subprograma que realiza una tarea y devuelve un valor','Un subprograma que no devuelve nada','Una variable','Un comentario'],'Devuelve un resultado.'),
q('tipos',1,'¿Qué es un procedimiento?',['Un subprograma que realiza una tarea y no devuelve ningún valor','Un subprograma que devuelve un valor','Un tipo de dato','Un bucle'],'No devuelve resultado.'),
q('tipos',1,'¿Con qué palabra se define una función en Python?',['def','function','func','fun'],'def nombre(parámetros):'),
q('tipos',1,'¿Con qué palabra devuelve un valor una función de Python?',['return','give','out','yield siempre'],'return valor.'),
q('tipos',2,'En PSeInt, ¿cómo se declara un procedimiento?',['SubProceso … FinSubProceso','Funcion … FinFuncion','Proceso … FinProceso','Procedimiento … Fin'],'Funcion devuelve valor; SubProceso, no.'),
q('tipos',2,'En PSeInt, ¿cómo se declara una función?',['Funcion … FinFuncion','SubProceso … FinSubProceso','Def … Fin','Proceso … FinProceso'],'Funcion resultado <- Nombre(params).'),
q('tipos',2,'¿Cuánto vale total?',['8','5','3','None'],'La función devuelve la suma.','def sumar(a, b):\n    return a + b\n\ntotal = sumar(5, 3)'),
q('tipos',2,'¿Qué imprime este código?',['Hola Ana','Hola','None','Error'],'Es un procedimiento: muestra y no devuelve nada.','def saludo(n):\n    print("Hola", n)\n\nsaludo("Ana")'),
q('tipos',3,'¿Qué valor tiene r?',['None','8','Error','0'],'La función solo imprime: sin return devuelve None.','def sumar(a, b):\n    print(a + b)\n\nr = sumar(5, 3)'),
q('tipos',3,'¿Qué imprime este código?',['3','5','None','Error'],'return finaliza la función: lo que está después no se ejecuta.','def f():\n    return 3\n    return 5\n\nprint(f())'),
q('tipos',3,'¿Qué es un parámetro?',['Un dato que se pasa al subprograma','El valor que devuelve','Un tipo de comentario','Un bucle'],'Son los datos de entrada de la función.'),

/* params */
q('params',1,'En el paso por valor, el subprograma recibe…',['Una copia del dato','La variable original','Una librería','Nada'],'Las modificaciones no afectan a la original.'),
q('params',1,'En el paso por referencia, el subprograma trabaja con…',['La variable original','Una copia','Una constante','Un comentario'],'Los cambios sí se ven fuera.'),
q('params',2,'¿Qué muestra la última línea?',['Fuera: 5','Fuera: 10','Error','None'],'num es una copia: x no cambia.','def duplicar(num):\n    num = num * 2\n\nx = 5\nduplicar(x)\nprint("Fuera:", x)'),
q('params',2,'¿Cómo se indica el paso por referencia en PSeInt?',['valor Por Referencia','&valor','ref valor','global valor'],'SubProceso Incrementar(valor Por Referencia).'),
q('params',2,'¿Tiene Python paso por referencia nativo?',['No, se simula con estructuras de datos','Sí, con &','Sí, con ref','Sí, siempre'],'Con listas u objetos mutables se logra un efecto similar.'),
q('params',2,'Tras ejecutar, ¿qué contiene numeros?',['[1, 2, 3, 4]','[1, 2, 3]','[4]','Error'],'La lista es mutable: append la modifica dentro y fuera.','def agregar(lista):\n    lista.append(4)\n\nnumeros = [1, 2, 3]\nagregar(numeros)'),
q('params',3,'¿Qué imprime?',['hola','hola!','!','Error'],'Los str son inmutables: t es otra variable local.','def f(t):\n    t = t + "!"\n\nx = "hola"\nf(x)\nprint(x)'),
q('params',3,'¿Qué imprime?',['[1, 2, 3, 0]','[1, 2, 3]','[0]','Error'],'La lista pasada se modifica por dentro.','def f(l):\n    l.append(0)\n\nx = [1, 2, 3]\nf(x)\nprint(x)'),
q('params',3,'¿Qué imprime?',['[1, 2, 3]','[0]','[1, 2, 3, 0]','Error'],'l = [0] crea una lista nueva local; no modifica la original.','def f(l):\n    l = [0]\n\nx = [1, 2, 3]\nf(x)\nprint(x)'),
q('params',3,'¿Cómo conseguir en Python que una función «cambie» un entero de fuera?',['Devolviéndolo con return y asignándolo','Con la palabra ref','No se puede de ninguna forma','Con un for'],'x = f(x) o usar un contenedor mutable.'),

/* defecto */
q('defecto',1,'¿Qué es un parámetro por defecto?',['Uno con un valor asignado en la definición, que se usa si no se da otro','Uno obligatorio','Uno que no se puede usar','Uno global'],'Si al llamar no se pasa, toma ese valor.'),
q('defecto',1,'¿Los implementa PSeInt?',['No','Sí','Solo en funciones','Solo en procedimientos'],'«No implementado».'),
q('defecto',2,'¿Qué imprime saludar("Ana")?',['Hola Ana / Idioma: español','Hola Ana / Idioma: inglés','Error','Nada'],'Se usa el valor por defecto de idioma.','def saludar(nombre, idioma="español"):\n    print("Hola", nombre)\n    print("Idioma:", idioma)'),
q('defecto',2,'¿Qué imprime saludar("Ana", "inglés")?',['Hola Ana / Idioma: inglés','Hola Ana / Idioma: español','Error','Nada'],'El argumento pasado sustituye al valor por defecto.','def saludar(nombre, idioma="español"):\n    print("Hola", nombre)\n    print("Idioma:", idioma)'),
q('defecto',2,'¿Qué definición es válida?',['def f(a, b=2):','def f(a=1, b):','def f(=1, b):','def f(a, b==2):'],'Los parámetros con valor por defecto van después de los obligatorios.'),
q('defecto',3,'¿Cuánto vale potencia(3)?',['9','3','6','Error'],'exp tiene valor por defecto 2: 3² = 9.','def potencia(base, exp=2):\n    return base ** exp'),
q('defecto',3,'¿Cuánto vale potencia(2, 5)?',['32','4','10','25'],'Se da exp = 5: 2⁵.','def potencia(base, exp=2):\n    return base ** exp'),
q('defecto',3,'¿Qué ocurre al llamar saludar()?',['TypeError: falta el argumento nombre','Imprime Hola','Imprime None','Nada'],'nombre es obligatorio; solo idioma tiene valor por defecto.','def saludar(nombre, idioma="español"):\n    print("Hola", nombre)'),

/* coment */
q('coment',1,'¿Qué hace el ordenador con un comentario?',['Lo ignora al ejecutar','Lo ejecuta','Lo muestra por pantalla','Lo convierte en variable'],'Es solo para las personas.'),
q('coment',1,'¿Cómo se escribe un comentario en Python?',['# comentario','// comentario','/* comentario */','<!-- comentario -->'],'Con almohadilla.'),
q('coment',1,'¿Cómo se escribe un comentario en PSeInt?',['// comentario','# comentario','-- comentario','; comentario'],'Con doble barra.'),
q('coment',2,'¿Para qué sirven los comentarios?',['Para explicar el funcionamiento o recordar detalles','Para que el programa corra más rápido','Para declarar variables','Para ejecutar código'],'Ayudan a otros programadores y a ti mismo.'),
q('coment',2,'¿Qué comentario es más útil?',['# redondeamos porque el cliente pide céntimos','# sumo uno a x','# x','# aquí hay código'],'Explica el porqué, no el qué.'),
q('coment',2,'¿Qué imprime?',['Hola','Hola # mundo','Nada','Error'],'Lo que sigue a # se ignora.','print("Hola")  # mundo'),
q('coment',3,'¿Qué es un docstring?',['Una cadena entre triples comillas que documenta una función','Un tipo de bucle','Una variable global','Un error'],'Aparece justo después del def y la muestra help().'),
q('coment',3,'¿Qué imprime?',['10','5','Error','None'],'Todo lo que sigue a # es comentario: print(5) no se ejecuta.','x = 10  # print(5)\nprint(x)'),
q('coment',3,'¿Qué imprime?',['a # b','a','b','Error'],'Dentro de comillas, # es un carácter normal.','print("a # b")'),

/* ambito */
q('ambito',1,'¿Dónde se declara una variable global?',['Fuera de los subprogramas','Dentro de una función','Solo en procedimientos','En un comentario'],'Se puede usar desde cualquier parte.'),
q('ambito',1,'¿Dónde existe una variable local?',['Solo dentro del subprograma que la declara','En todo el programa','En todos los ficheros','Nunca'],'Se crea al ejecutar el subprograma y desaparece al terminar.'),
q('ambito',1,'¿Qué es el ámbito (scope)?',['La zona del programa donde una variable es accesible','El tipo de la variable','Su valor','Su nombre'],'Global o local.'),
q('ambito',2,'¿Qué palabra permite modificar una global desde una función en Python?',['global','public','static','extern'],'global contador.'),
q('ambito',2,'¿Qué imprime?',['1','0','Error','None'],'global permite modificar la variable de fuera.','contador = 0\n\ndef inc():\n    global contador\n    contador = contador + 1\n\ninc()\nprint(contador)'),
q('ambito',2,'¿Qué ocurre al ejecutar?',['UnboundLocalError','Imprime 1','Imprime 0','Imprime None'],'Sin global, contador se trata como local y se usa antes de asignarla.','contador = 0\n\ndef inc():\n    contador = contador + 1\n\ninc()'),
q('ambito',2,'¿Qué imprime?',['5','Error','None','0'],'La función solo lee la global: no hace falta global para leer.','x = 5\n\ndef mostrar():\n    print(x)\n\nmostrar()'),
q('ambito',3,'¿Qué imprime?',['1','2','Error','None'],'Dentro de f, x es local (otra variable): la global no cambia.','x = 1\n\ndef f():\n    x = 2\n\nf()\nprint(x)'),
q('ambito',3,'¿Qué ocurre?',['NameError: nombre no está definido fuera','Imprime Alfonso','Imprime None','Imprime vacío'],'nombre es local a saludar y no existe fuera.','def saludar():\n    nombre = "Alfonso"\n\nsaludar()\nprint(nombre)'),
q('ambito',3,'Para evitar problemas con globales, ¿qué es mejor práctica?',['Pasar datos por parámetros y devolver con return','Usar más globales','Poner todo en main','Evitar las funciones'],'Las funciones quedan independientes y más fáciles de probar.'),

/* builtin */
q('builtin',1,'¿Qué hace len()?',['Devuelve la longitud de una cadena, lista, tupla…','Convierte a entero','Redondea','Ordena'],'len("hola") = 4.'),
q('builtin',1,'¿Qué hace type()?',['Indica el tipo de un dato','Convierte un dato','Lo muestra','Lo borra'],'type(3.5) → float.'),
q('builtin',1,'¿Qué función redondea un número?',['round()','abs()','sum()','pow()'],'round(3.14159, 2) = 3.14.'),
q('builtin',2,'¿Qué devuelve max(3, 9, 5)?',['9','3','5','17'],'El mayor valor.'),
q('builtin',2,'¿Qué devuelve sum([1, 2, 3])?',['6','3','123','Error'],'Suma los elementos.'),
q('builtin',2,'¿Qué devuelve abs(-4)?',['4','-4','0','Error'],'Valor absoluto.'),
q('builtin',2,'¿Qué devuelve pow(2, 3)?',['8','6','9','5'],'2 elevado a 3.'),
q('builtin',2,'¿Qué hace sorted([3, 1, 2])?',['Devuelve [1, 2, 3]','Devuelve [3, 2, 1]','Devuelve 6','Error'],'Ordena de menor a mayor.'),
q('builtin',3,'¿Qué hace enumerate(lista) en un for?',['Devuelve el índice y el valor en cada vuelta','Cuenta los elementos','Ordena la lista','Elimina duplicados'],'for i, x in enumerate(lista).'),
q('builtin',3,'¿Qué hace zip(a, b)?',['Combina las colecciones elemento a elemento','Las suma','Las ordena','Las borra'],'Empareja el 1º con el 1º, el 2º con el 2º…'),
q('builtin',3,'¿Qué imprime?',['7.75','31','4','Error'],'sum / len = 31 / 4.','n = [7, 9, 5, 10]\nprint(sum(n) / len(n))'),
q('builtin',3,'¿Qué ocurre?',['TypeError: sum no es una función','Suma 6','Imprime 3','Nada'],'Se pisó el nombre de la función predefinida con una variable.','sum = 10\nprint(sum([1, 2, 3]))'),

/* libs */
q('libs',1,'¿Cómo se carga una librería?',['import','include','using','load'],'import math.'),
q('libs',1,'¿Qué librería tiene sqrt()?',['math','random','time','os'],'math.sqrt(x).'),
q('libs',1,'¿Qué librería permite generar números aleatorios?',['random','math','statistics','os'],'random.randint(a, b).'),
q('libs',2,'¿Qué hace random.randint(1, 6)?',['Entero aleatorio entre 1 y 6, ambos incluidos','Decimal entre 1 y 6','Siempre 6','Entre 2 y 5'],'Como un dado.'),
q('libs',2,'¿Qué hace random.choice(lista)?',['Devuelve un elemento aleatorio de la lista','Ordena la lista','Mezcla toda la lista','Cuenta elementos'],'Elige uno al azar.'),
q('libs',2,'¿Qué librería calcula la media y la mediana?',['statistics','math','time','string'],'statistics.mean y statistics.median.'),
q('libs',2,'¿Qué hace time.sleep(2)?',['Pausa la ejecución 2 segundos','Mide 2 segundos','Duerme el ordenador','Nada'],'Útil para animaciones o esperas.'),
q('libs',2,'¿Qué librería se usa para crear ventanas gráficas?',['tkinter','turtle','os','string'],'tkinter: Tk(), Button(), Label().'),
q('libs',3,'¿Qué librería permite dibujar con una «tortuga»?',['turtle','tkinter','math','random'],'turtle.forward(100), left(90), circle(50).'),
q('libs',3,'¿Qué hace os.listdir()?',['Lista los archivos y carpetas','Crea una carpeta','Borra un fichero','Cambia de directorio'],'os.mkdir crea; os.getcwd muestra el directorio.'),
q('libs',3,'¿Cuál es la forma correcta de usar la raíz cuadrada?',['import math; math.sqrt(16)','sqrt(16) sin import','math(16)','import sqrt'],'Hay que importar math y llamar math.sqrt.'),
q('libs',3,'¿Qué ocurre?',['NameError: math no está definido','Imprime 4.0','Imprime 4','Imprime 16'],'Falta el import.','print(math.sqrt(16))'),

/* depur */
q('depur',1,'¿Qué es la depuración?',['Ejecutar el programa de forma controlada para localizar errores','Borrar código','Escribir comentarios','Compilar'],'También se llama debugging.'),
q('depur',1,'¿Qué es un punto de interrupción?',['Una línea donde se detiene la ejecución','Un error','El fin del programa','Un comentario'],'Permite inspeccionar el estado.'),
q('depur',1,'¿Qué es la observación de variables?',['Ver el valor de las variables mientras se ejecuta','Cambiar su nombre','Borrarlas','Declararlas'],'Es una de las tres técnicas.'),
q('depur',2,'¿Qué hace el paso a paso?',['Ejecuta una instrucción cada vez','Salta al final','Corrige el código','Guarda'],'Para ver el efecto de cada línea.'),
q('depur',2,'¿Qué tecla de VS Code pone un punto de interrupción?',['F9','F5','F10','F11'],'F5 inicia, F10 paso por encima, F11 entra.'),
q('depur',2,'¿Qué hace F11 al depurar?',['Entra dentro de la función llamada','Pasa por encima','Para','Reinicia'],'F10 no entra; F11 sí.'),
q('depur',3,'Un programa da resultado incorrecto sin mostrar error. ¿Qué tipo de error es?',['Lógico','De sintaxis','De importación','De sangría'],'El depurador ayuda a ver dónde se tuerce.'),
q('depur',3,'Pones un punto de interrupción y pulsas «Continuar». ¿Qué pasa?',['Se ejecuta hasta el siguiente punto de interrupción o el final','Se ejecuta solo una línea','Se reinicia','Se borra'],'Continuar (F5) corre hasta la siguiente parada.'),
q('depur',3,'En el bucle for i in range(1, 4): total += i, ¿cuánto vale total tras la 2ª vuelta?',['3','1','2','6'],'1 + 2 = 3.'),

/* diseno */
q('diseno',1,'¿Cuántas tareas debería hacer una función?',['Una','Todas','Ninguna','Las que quiera'],'Una función, una responsabilidad.'),
q('diseno',2,'¿Cómo debe una función recibir sus datos?',['Por parámetros','Leyendo variables globales siempre','Con input() oculto','Por un comentario'],'Así se puede reutilizar.'),
q('diseno',2,'¿Cómo debe devolver un resultado una función de cálculo?',['Con return','Con print','Con global','Con input'],'return permite usarlo en otras expresiones.'),
q('diseno',2,'¿Qué hace el programa principal?',['Coordina llamando a las funciones','Contiene toda la lógica','Define las constantes','Compila'],'Un menú y un bucle suelen bastar.'),
q('diseno',3,'¿Por qué conviene no pedir datos dentro de la función de cálculo?',['Para poder reutilizarla y probarla con datos fijos','Porque input es lento','Porque es ilegal','Porque no funciona'],'Separar entrada, cálculo y salida.'),
q('diseno',3,'¿Cómo hace «seguir hasta pulsar s» un menú modular?',['Con un bucle que termina cuando la opción es «s»','Con una función recursiva siempre','Con un if','Con un import'],'while opcion != "s".'),
q('diseno',3,'¿Qué ventaja tiene separar menu() y main()?',['Cada una tiene una tarea clara y se entiende mejor','El programa va más rápido','No hace falta return','Se evitan los bucles'],'Legibilidad y mantenimiento.'),

/* ejercicios */
q('ejercicios',1,'¿Cuántos ejercicios tiene la batería 1 del tema?',['5','3','10','7'],'Calculadora, primos, fuerza bruta, adivina el número y piedra-papel-tijera.'),
q('ejercicios',1,'¿Cuándo termina la calculadora científica?',['Cuando se pulsa la tecla «s»','Tras una operación','Nunca','A los 10 segundos'],'Sigue ejecutándose hasta pulsar «s».'),
q('ejercicios',2,'¿Cuántas cifras tiene el número del ataque por fuerza bruta?',['4','3','6','8'],'Se prueban 0000 a 9999: 10 000 combinaciones.'),
q('ejercicios',2,'¿Cuántas combinaciones hay que probar como máximo con 4 cifras?',['10 000','1 000','4','100 000'],'10 posibilidades por cifra: 10⁴.'),
q('ejercicios',2,'¿Entre qué valores es el número aleatorio de «Adivina el número»?',['0 y 100','1 y 10','0 y 1','1 y 1000'],'random.randint(0, 100).'),
q('ejercicios',2,'¿Cuántos puntos hacen falta para ganar en piedra, papel o tijera?',['3','1','5','10'],'Gana el que primero llegue a 3.'),
q('ejercicios',3,'En «Adivina el número», ¿qué estructura encaja mejor?',['Repetir-Hasta (while True + break)','Un for fijo','Un match','Una sola condición'],'Se pide al menos un número y se repite hasta acertar.'),
q('ejercicios',3,'En piedra-papel-tijera, ¿qué conviene encapsular en una función?',['Las reglas de quién gana','El print del título','El import','Nada'],'gana(a, b) simplifica el bucle principal.'),
q('ejercicios',3,'¿Cómo se comprueba que un número es primo en la función es_primo?',['Probando divisores hasta su raíz cuadrada','Dividiendo entre 2 solo','Comprobando si es par','Con random'],'Si ninguno divide a n, es primo.'),
q('ejercicios',3,'¿Qué hace f"{n:04d}" en Python?',['Muestra n con 4 dígitos rellenando con ceros','Muestra n 4 veces','Redondea a 4 decimales','Da un error'],'Útil para mostrar 0042 en vez de 42.')
];
})();
