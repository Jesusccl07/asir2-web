/* IALP · Tema 1 — banco de preguntas. Formato: [bloque, nivel 1/2/3, pregunta, opciones, índice correcta, explicación, código]
   (la primera opción es siempre la correcta: el test las mezcla al mostrarlas) */
(function(){
window.TEMA_TOPICS={algoritmo:'Algoritmo',elementos:'Datos y variables',tipos:'Tipos de datos',expresiones:'Expresiones',prioridad:'Prioridad',asignacion:'Asignación',es:'Entrada / salida',traduccion:'PSeInt → Python',ide:'IDE',depuracion:'Depuración',ejercicios:'Ejercicios'};
const q=(b,l,p,o,e,c)=>[b,l,p,o,0,e,c];
window.TEMA_QUESTIONS=[
/* ── algoritmo ── */
q('algoritmo',1,'¿Qué es un algoritmo?',['Un conjunto ordenado y finito de operaciones que resuelve un problema','Un lenguaje de programación','Un programa ya compilado','Un tipo de variable'],'Es una secuencia ordenada y finita de operaciones que permite hallar la solución a un problema.'),
q('algoritmo',1,'¿Un algoritmo depende del lenguaje de programación?',['No, es independiente del lenguaje y de la máquina','Sí, solo existe en Python','Sí, solo existe en PSeInt','Depende del sistema operativo'],'El algoritmo es la idea de solución; después se puede escribir en cualquier lenguaje.'),
q('algoritmo',1,'¿Cómo deben ser las operaciones de un algoritmo?',['Simples, no ambiguas y con un orden establecido','Complejas y flexibles','Aleatorias','Infinitas'],'Cada paso debe ser sencillo, tener una única interpretación y seguir un orden.'),
q('algoritmo',1,'¿Qué significa que un algoritmo sea finito?',['Que termina después de un número limitado de pasos','Que solo tiene diez líneas','Que no usa variables','Que solo se ejecuta una vez en la vida'],'Un algoritmo que no acabara nunca no llegaría a dar la solución.'),
q('algoritmo',2,'¿Cuál es el orden de trabajo recomendado?',['Pensar el algoritmo, escribirlo en pseudocódigo y traducirlo a un lenguaje','Escribir código directamente y ver qué sale','Compilar primero y pensar después','Copiar un programa parecido'],'El algoritmo va antes que el código: así se evitan programas que no hacen lo pedido.'),
q('algoritmo',2,'Una receta de cocina, ¿puede considerarse un algoritmo?',['Sí, si sus pasos son ordenados, claros y terminan','No, los algoritmos solo existen en informática','Solo si está escrita en inglés','Solo si lleva ingredientes numéricos'],'Cumple la definición: pasos ordenados, no ambiguos y finitos que llevan a un resultado.'),
q('algoritmo',2,'Un paso que dice «añade un poco de sal» incumple la característica de…',['No ambigüedad','Finitud','Orden','Independencia del lenguaje'],'«Un poco» se puede interpretar de muchas formas: la operación no es precisa.'),
q('algoritmo',3,'Un bucle que nunca llega a cumplir su condición de salida incumple…',['La finitud del algoritmo','La independencia del lenguaje','Que sea ordenado','Que use variables'],'Si no termina nunca, deja de ser un algoritmo válido porque no es finito.'),
q('algoritmo',3,'¿Por qué el mismo algoritmo puede escribirse en PSeInt y en Python?',['Porque describe la solución, no la sintaxis de un lenguaje concreto','Porque ambos lenguajes son iguales','Porque Python traduce PSeInt automáticamente','Porque ambos usan la misma sintaxis'],'La lógica de la solución es la misma; solo cambia cómo se escribe cada instrucción.'),

/* ── datos y variables ── */
q('elementos',1,'¿Qué es una variable?',['Un espacio de memoria con nombre cuyo valor puede cambiar','Un valor que nunca cambia','Un tipo de operador','Un comentario'],'Tiene nombre identificativo, almacena información temporal y su valor se puede modificar.'),
q('elementos',1,'¿Qué es una constante?',['Un valor que permanece invariable durante toda la ejecución','Una variable que cambia cada vez','Un dato de tipo texto','Un operador lógico'],'Una vez definida, no puede modificarse.'),
q('elementos',1,'¿Cuál de estos es un dato de tipo texto?',['"Programación"','25.7','Verdadero','-3'],'Los textos o cadenas van entre comillas.'),
q('elementos',1,'¿Cuál de estos es un dato lógico?',['Falso','"Falso"','0.5','"hola"'],'Los lógicos o booleanos solo toman los valores Verdadero o Falso (sin comillas).'),
q('elementos',2,'¿Para qué sirve usar constantes?',['Facilitan la comprensión y el mantenimiento del programa','Hacen que el programa corra más rápido siempre','Permiten cambiar su valor al ejecutar','Sustituyen a los comentarios'],'Representan valores fijos con nombre: si hay que cambiarlos, se hace en un único sitio.'),
q('elementos',2,'Una variable almacena información…',['Temporal, mientras se ejecuta el algoritmo','Permanente en disco siempre','Solo numérica','Solo de texto'],'Su contenido existe durante la ejecución y puede variar.'),
q('elementos',2,'¿Qué dato NO sería adecuado guardar en una constante?',['La edad del usuario, que se lee por teclado','El valor de PI','El número de días de la semana','El IVA fijo de un ejercicio'],'Lo que cambia o depende de la ejecución se guarda en variables.'),
q('elementos',2,'En Python, ¿cómo se indica por convención que algo es una constante?',['Escribiendo su nombre en MAYÚSCULAS','Con la palabra const','Con una flecha <-','Con comillas'],'Python no tiene constantes reales; es una convención que se respeta sin que el lenguaje obligue.','PI = 3.1416'),
q('elementos',3,'Tras ejecutar el código, ¿cuánto vale edad?',['18','17','35','Da error'],'La segunda asignación sustituye el valor anterior: el 17 se pierde.','edad = 17\nedad = 18\nprint(edad)'),
q('elementos',3,'¿Cuál es el nombre más adecuado para una variable que guarda el radio de un círculo?',['radio','x1','a','dato_de_cosas'],'Un nombre identificativo hace el programa más fácil de leer.'),

/* ── tipos de datos ── */
q('tipos',1,'¿Qué tipo de dato es 10?',['Entero','Real','Cadena','Lógico'],'Un número sin decimales es un entero (integer).'),
q('tipos',1,'¿Qué tipo de dato es 3.14?',['Real','Entero','Cadena','Carácter'],'Un número con decimales es un real (float).'),
q('tipos',1,'¿Qué tipo de dato es "hola"?',['Cadena de caracteres','Entero','Real','Lógico'],'Texto entre comillas: string.'),
q('tipos',1,'¿Qué valores puede tomar un dato lógico?',['Verdadero o Falso','Cualquier número','Cualquier texto','Solo 0'],'El tipo lógico (bool) solo tiene dos valores.'),
q('tipos',2,'¿Qué tipo de dato es "a" (una sola letra entre comillas)?',['Carácter','Entero','Real','Lógico'],'Un único símbolo es un carácter (char). En Python se trata como str.'),
q('tipos',2,'¿Cómo se llama el tipo real en Python?',['float','double','real','decimal'],'Los números con decimales son float.'),
q('tipos',2,'¿Qué devuelve type(5) en Python?',['<class \'int\'>','<class \'float\'>','<class \'str\'>','<class \'bool\'>'],'5 es un entero.','print(type(5))'),
q('tipos',2,'¿Cómo se escribe el número tres con catorce en Python?',['3.14','3,14','3;14','"3,14"'],'Los decimales llevan punto. Con coma sería otra cosa o un error.'),
q('tipos',3,'¿Qué imprime este código?',['55','10','Da error','5 5'],'"5" son cadenas: + las concatena, no las suma.','a = "5"\nb = "5"\nprint(a + b)'),
q('tipos',3,'¿Qué tipo tiene la variable x tras ejecutar?',['float','int','str','bool'],'10 / 4 con / siempre da un float (2.5).','x = 10 / 4\nprint(type(x))'),
q('tipos',3,'¿Qué tipo tiene True en Python?',['bool','str','int siempre','No tiene tipo'],'True y False son de tipo bool.'),

/* ── expresiones ── */
q('expresiones',1,'¿Qué es una expresión?',['Una combinación de valores, variables, operadores y funciones que produce un resultado','Un comentario del código','Un tipo de dato','Una instrucción de salida'],'Se evalúa y devuelve un valor.'),
q('expresiones',1,'¿Qué tipo de expresión es precio + impuesto?',['Aritmética','Relacional','Lógica','De salida'],'Realiza una operación matemática.'),
q('expresiones',1,'¿Qué tipo de expresión es edad >= 18?',['Relacional','Aritmética','De asignación','De entrada'],'Compara valores y produce Verdadero o Falso.'),
q('expresiones',1,'¿Qué tipo de expresión es edad >= 18 Y tieneCarnet?',['Lógica','Aritmética','Relacional pura','Una constante'],'Combina condiciones con un operador lógico.'),
q('expresiones',2,'¿Qué resultado da una expresión relacional?',['Verdadero o Falso','Siempre un entero','Siempre un texto','Nada'],'Las comparaciones se evalúan a un valor lógico.'),
q('expresiones',2,'En Python, ¿cómo se escribe el operador lógico Y?',['and','&&','Y','AND'],'En Python los operadores lógicos son and, or y not.'),
q('expresiones',2,'En Python, ¿qué operador compara si dos valores son iguales?',['==','=','<-','!='],'= es asignación; para comparar se usa ==.'),
q('expresiones',2,'¿Qué resultado da 17 % 5 en Python?',['2','3','3.4','12'],'% es el resto de la división entera: 17 = 3·5 + 2.'),
q('expresiones',3,'¿Qué resultado da 7 // 2 en Python?',['3','3.5','4','1'],'// es la división entera: descarta los decimales.','print(7 // 2)'),
q('expresiones',3,'¿Qué imprime este código?',['False','True','12','Da error'],'edad >= 18 es True, pero tiene_carnet es False: True and False = False.','edad = 20\ntiene_carnet = False\nprint(edad >= 18 and tiene_carnet)'),
q('expresiones',3,'¿Cuál es el resultado de 2 ** 3?',['8','6','9','5'],'** es la potencia: 2 elevado a 3.'),

/* ── prioridad ── */
q('prioridad',1,'¿Qué se resuelve primero en una expresión?',['Lo que va entre paréntesis','Las sumas','Las comparaciones','Los operadores lógicos'],'Los paréntesis tienen la máxima prioridad.'),
q('prioridad',1,'¿Cuánto vale 2 + 3 * 4?',['14','20','24','9'],'La multiplicación se hace antes que la suma: 3·4 = 12 y luego 2 + 12.'),
q('prioridad',1,'¿Cuánto vale (2 + 3) * 4?',['20','14','24','11'],'Los paréntesis obligan a sumar primero: 5 · 4.'),
q('prioridad',2,'¿Cuál es el orden de prioridad de los apuntes, de mayor a menor?',['Paréntesis, multiplicación y división, suma y resta, comparaciones, lógicos','Suma y resta, paréntesis, lógicos, comparaciones, multiplicación','Lógicos, comparaciones, suma y resta, multiplicación, paréntesis','Comparaciones, paréntesis, suma, lógicos, multiplicación'],'1 paréntesis, 2 multiplicación y división, 3 suma y resta, 4 comparaciones, 5 operadores lógicos.'),
q('prioridad',2,'¿Cuánto vale 10 - 4 - 3?',['3','9','-3','11'],'Con igual prioridad se resuelve de izquierda a derecha: (10 - 4) - 3.'),
q('prioridad',2,'¿Cuánto vale 20 / 4 * 5?',['25','1','100','4'],'División y multiplicación tienen igual prioridad: (20 / 4) · 5 = 25.','print(20 / 4 * 5)'),
q('prioridad',2,'¿Qué se evalúa antes: una suma o una comparación?',['La suma','La comparación','Se evalúan a la vez','Depende del lenguaje'],'Los aritméticos tienen más prioridad que los relacionales: 5 + 3 > 7 se calcula como (5 + 3) > 7.'),
q('prioridad',3,'¿Qué resultado da esta expresión?',['True','False','12','Da error'],'Primero 3 * 2 = 6, luego 5 + 6 = 11, 11 > 10 es True y True and True = True.','print(5 + 3 * 2 > 10 and True)'),
q('prioridad',3,'¿Qué resultado da esta expresión?',['False','True','16','Da error'],'2 + 3 = 5; 5 > 4 es True; not True es False; False and True = False.','print(not (2 + 3 > 4) and True)'),
q('prioridad',3,'¿Cuánto vale 2 ** 3 * 2 en Python?',['16','64','12','10'],'La potencia se calcula antes que el producto: 8 · 2.'),
q('prioridad',3,'Para dividir la suma de x e y entre 2, ¿cuál es correcta?',['(x + y) / 2','x + y / 2','x + (y / 2)','x / 2 + y'],'Sin paréntesis solo se dividiría y entre 2, porque / se hace antes que +.'),

/* ── asignación ── */
q('asignacion',1,'¿Qué es una asignación?',['Guardar o actualizar el valor de una variable','Mostrar un valor por pantalla','Leer del teclado','Comparar dos valores'],'Almacena un dato en una variable o actualiza el que ya tenía.'),
q('asignacion',1,'¿Cómo se asigna el valor 45 a la variable a en Python?',['a = 45','a <- 45','45 = a','a == 45'],'En Python la asignación es un solo =. La flecha es de PSeInt.'),
q('asignacion',1,'¿Cómo se asigna en PSeInt?',['a <- 45','a = 45','a := 45','a == 45'],'PSeInt usa una flecha: variable ← valor.'),
q('asignacion',2,'Si a vale 5, ¿cuánto vale a tras a = a + 1?',['6','5','51','Da error'],'Se calcula a + 1 con el valor actual y se guarda en a.'),
q('asignacion',2,'En a = a + 1, ¿qué parte se evalúa primero?',['La derecha, a + 1','La izquierda','Ninguna: es un error','Las dos a la vez'],'Siempre se calcula la expresión de la derecha y luego se guarda el resultado.'),
q('asignacion',2,'¿Qué pasa con el valor anterior de una variable al asignarle otro?',['Se pierde','Se guarda en otra variable automáticamente','Se suma al nuevo','Se convierte en constante'],'La variable solo guarda un valor: el último asignado.'),
q('asignacion',3,'¿Qué imprime este código?',['3 8','8 3','3 3','8 8'],'No cambia nada: solo se asigna, no se intercambia.','a = 3\nb = 8\nprint(a, b)'),
q('asignacion',3,'¿Qué valores tienen a y b al final?',['a=8 y b=3','a=3 y b=3','a=8 y b=8','a=3 y b=8'],'aux guarda el 3, a toma el 8 y b recibe el 3 guardado: así se intercambian.','a = 3\nb = 8\naux = a\na = b\nb = aux'),
q('asignacion',3,'¿Qué error tiene este intercambio?',['Se pierde el valor original de a','Ninguno','Falta imprimir','Falta una constante'],'Tras a = b, a ya vale lo mismo que b y el valor original de a se perdió: hace falta una variable auxiliar.','a = 3\nb = 8\na = b\nb = a'),

/* ── entrada/salida ── */
q('es',1,'¿Para qué sirve la entrada/salida?',['Comunicar el algoritmo con el usuario','Hacer cálculos','Declarar constantes','Escribir comentarios'],'Permite leer datos del usuario y mostrarle resultados.'),
q('es',1,'¿Qué instrucción de PSeInt lee un dato del teclado?',['Leer','Escribir','Definir','Mostrar siempre'],'Leer guarda en una variable lo que escribe el usuario.'),
q('es',1,'¿Qué función de Python muestra información por pantalla?',['print()','input()','show()','write()'],'print() es la salida; input() es la entrada.'),
q('es',1,'¿Qué función de Python pide un texto al usuario?',['input()','print()','read()','scan()'],'input() lee del teclado y devuelve una cadena.'),
q('es',2,'¿Qué tipo devuelve input()?',['Siempre una cadena de texto','Un entero','Un real','Lo que escriba el usuario, convertido solo'],'Aunque escribas 5, input() devuelve "5": hay que convertirlo.'),
q('es',2,'¿Cómo se lee un número entero en Python?',['int(input("Edad: "))','input("Edad: ")','integer(input())','read_int()'],'Se convierte el texto leído a entero con int().'),
q('es',2,'¿Cómo se lee un número con decimales en Python?',['float(input("Nota: "))','int(input("Nota: "))','decimal(input())','input("Nota: ")'],'float() convierte a número real.'),
q('es',2,'Un dispositivo de entrada típico es…',['El teclado','La pantalla','La impresora','Los altavoces'],'Entrada: teclado, disco; salida: pantalla, disco...'),
q('es',3,'¿Qué imprime este código si el usuario escribe 4 y luego 6?',['46','10','Da error','4 6'],'input() devuelve texto: "4" + "6" es "46", no una suma.','a = input()\nb = input()\nprint(a + b)'),
q('es',3,'¿Qué imprime este código con 4 y 6?',['10','46','Da error','4+6'],'Con int() los datos son números y + suma.','a = int(input())\nb = int(input())\nprint(a + b)'),
q('es',3,'Con nota = 7.456, ¿qué muestra print(f"Nota: {nota:.2f}")?',['Nota: 7.46','Nota: 7.456','Nota: 7','Nota: .2f'],':.2f formatea con dos decimales (redondea).'),

/* ── PSeInt → Python ── */
q('traduccion',1,'¿Cómo se escribe un comentario en Python?',['# comentario','// comentario','/* comentario */','-- comentario'],'En Python los comentarios empiezan por #. En PSeInt, por //.'),
q('traduccion',1,'¿Cómo se escribe un comentario en PSeInt?',['// comentario','# comentario','<!-- -->','% comentario'],'PSeInt usa //.'),
q('traduccion',1,'La instrucción de PSeInt Escribir "Hola" equivale en Python a…',['print("Hola")','input("Hola")','write("Hola")','echo "Hola"'],'Escribir muestra por pantalla, como print().'),
q('traduccion',2,'¿Cómo se traduce edad <- 17 a Python?',['edad = 17','edad <- 17','edad := 17','17 -> edad'],'La flecha pasa a ser un igual.'),
q('traduccion',2,'¿Cómo se traduce Leer nombre a Python?',['nombre = input()','input(nombre)','read(nombre)','nombre <- input'],'Se guarda en la variable lo que devuelve input().'),
q('traduccion',2,'¿Qué hay que hacer con Definir x Como Entero en Python?',['Nada: no se declaran los tipos','Escribir int x','Escribir var x','Usar la palabra const'],'Python crea la variable al asignarle un valor, con el tipo del valor.'),
q('traduccion',2,'a MOD b en PSeInt se escribe en Python…',['a % b','a mod b','a // b','a ** b'],'El resto de la división es %.'),
q('traduccion',3,'¿Cómo se escribe NO(a Y b O c) en Python?',['not (a and b or c)','!(a && b || c)','NO (a Y b O c)','~(a & b | c)'],'Los operadores lógicos de Python son palabras: and, or y not.'),
q('traduccion',3,'¿Qué traducción de PSeInt es correcta para x ^ 2?',['x ** 2','x ^ 2','pow x 2','x ^^ 2'],'En Python ^ es otra cosa (XOR); la potencia es **.'),
q('traduccion',3,'En PSeInt a = b compara; en Python comparar es…',['a == b','a = b','a === b','a is = b'],'En Python un = asigna y dos == comparan.'),

/* ── IDE ── */
q('ide',1,'¿Qué significa IDE?',['Entorno de Desarrollo Integrado','Interfaz De Escritorio','Intérprete de Datos Especiales','Instrucción de Escritura'],'Integrated Development Environment.'),
q('ide',1,'¿Cuál de estos es un IDE?',['Visual Studio Code','Windows Update','Google Chrome','El Bloc de notas'],'VS Code, Eclipse y NetBeans son los ejemplos de los apuntes.'),
q('ide',1,'¿Para qué sirve el editor de código de un IDE?',['Para escribir los programas','Para depurar','Para organizar proyectos','Para traducir'],'Es la parte donde se escribe el código.'),
q('ide',2,'¿Qué hace el depurador (debugger) de un IDE?',['Ayuda a localizar y corregir errores','Escribe el código por ti','Traduce el programa','Organiza los archivos'],'Permite ejecutar paso a paso y ver las variables.'),
q('ide',2,'¿Qué hace el compilador o intérprete?',['Traduce y ejecuta el código','Corrige los errores solo','Dibuja diagramas','Descarga librerías'],'Convierte el código que escribes en algo que el ordenador ejecuta.'),
q('ide',2,'¿Qué ventaja da el autocompletado?',['Agiliza la programación y reduce errores','Evita tener que pensar','Ejecuta el programa','Hace copias de seguridad'],'Sugiere instrucciones y nombres mientras se escribe.'),
q('ide',2,'¿Qué es la gestión de proyectos en un IDE?',['Organizar archivos y recursos','Escribir comentarios','Medir el tiempo de ejecución','Instalar Windows'],'Agrupa todos los ficheros de un programa.'),
q('ide',3,'¿Qué diferencia a un IDE de un simple editor de texto?',['Además de escribir, ejecuta, depura y sugiere','Es gratuito','Solo funciona con Python','Ocupa menos'],'Reúne en una sola herramienta todo lo necesario para desarrollar.'),
q('ide',3,'¿Qué hace falta en VS Code para programar cómodamente en Python?',['Instalar la extensión de Python','Cambiar el sistema operativo','Instalar PSeInt','Nada: no admite Python'],'La extensión Python de Microsoft añade ejecución, depuración y autocompletado.'),

/* ── depuración ── */
q('depuracion',1,'¿Qué es depurar?',['Ejecutar el programa de forma controlada para localizar errores','Borrar el código','Traducir a otro lenguaje','Comentar el programa'],'Se observa el comportamiento y el valor de las variables.'),
q('depuracion',1,'¿Qué es un punto de interrupción?',['Una marca donde se detiene la ejecución','Un error del programa','El final del programa','Un comentario'],'Al llegar a esa línea, el depurador se para para que puedas inspeccionar.'),
q('depuracion',1,'¿Qué significa ejecutar paso a paso?',['Ejecutar una instrucción cada vez','Ejecutar solo la última línea','Ejecutar más rápido','Ejecutar sin errores'],'Permite ver el efecto de cada línea.'),
q('depuracion',2,'¿Qué tecla de VS Code añade un punto de interrupción?',['F9','F1','F12','Esc'],'F9 activa o desactiva el punto de interrupción en la línea actual.'),
q('depuracion',2,'¿Qué hace F10 durante la depuración en VS Code?',['Avanza una línea sin entrar en las funciones','Para el programa','Reinicia','Crea un punto de interrupción'],'F10 = paso por encima; F11 = entrar en la función.'),
q('depuracion',2,'¿Qué permite la observación de variables?',['Ver el valor de cada variable en cada momento','Cambiar el lenguaje','Ocultar errores','Guardar el programa'],'Los paneles Variables e Inspección muestran su contenido.'),
q('depuracion',2,'¿Cuántas técnicas de depuración se indican en los apuntes?',['Tres: paso a paso, puntos de interrupción y observación de variables','Una: usar print','Dos: compilar y ejecutar','Cuatro: todas las del IDE'],'Ejecución paso a paso, puntos de interrupción y observación de variables.'),
q('depuracion',3,'Depuras este código y total vale 3 tras la 2ª vuelta. ¿Cuánto valdrá al terminar el bucle?',['6','3','4','9'],'Suma 1, 2 y 3: total pasa por 1, 3 y 6.','total = 0\nfor i in range(1, 4):\n    total = total + i\nprint(total)'),
q('depuracion',3,'Si el programa da un resultado mal pero sin errores, ¿qué te ayuda más?',['Paso a paso mirando las variables','Reinstalar Python','Quitar los comentarios','Cambiar de IDE'],'Es un error lógico: hay que ver cómo cambian los valores para encontrar dónde se desvía.'),

/* ── ejercicios ── */
q('ejercicios',1,'En el ejercicio 1, ¿qué debe mostrar el algoritmo?',['La suma y el producto de dos números','Solo la suma','La media','El mayor de los dos'],'Pide dos números y muestra su suma y su producto, en PSeInt y en Python.'),
q('ejercicios',1,'¿Qué valor se da a la constante del ejercicio 2?',['3.1416','3.14','2.71','4'],'La constante PI vale 3.1416.'),
q('ejercicios',2,'¿Qué fórmula calcula el área de un círculo?',['PI * radio ** 2','2 * PI * radio','PI * radio','radio ** 2 / PI'],'Área = π·r²; la longitud sería 2·π·r.'),
q('ejercicios',2,'En el ejercicio 4 (ecuación de segundo grado), ¿qué fórmula calcula el discriminante?',['b ** 2 - 4 * a * c','b - 4 * a * c','a ** 2 - 4 * b * c','b ** 2 + 4 * a * c'],'Δ = b² − 4ac. Si es negativo no hay soluciones reales.'),
q('ejercicios',2,'En el ejercicio 5, si el nombre es Ana y los apellidos López Ruiz, ¿qué se muestra?',['López Ruiz, Ana','Ana López Ruiz','Ana, López Ruiz','Ruiz López, Ana'],'El formato pedido es «apellidos, nombre».'),
q('ejercicios',2,'¿Qué se pide en el ejercicio 6?',['Investigar la depuración de código en un IDE como VS Code','Resolver una ecuación','Crear una constante','Traducir a Java'],'Depuración: paso a paso, puntos de interrupción y observación de variables.'),
q('ejercicios',3,'En la solución de la ecuación, ¿por qué se escribe (2 * a) entre paréntesis en el denominador?',['Porque / y * tienen igual prioridad y, sin paréntesis, se dividiría solo entre 2 y luego se multiplicaría por a','Porque Python lo exige','Porque a es una constante','Por estética'],'-b / 2 * a se calcula como (-b / 2) * a, que no es lo mismo que -b / (2 * a).'),
q('ejercicios',3,'¿Qué sale al ejecutar print(2 + 3 * 4 == 14)?',['True','False','14','Da error'],'2 + 3·4 = 14, y comparar 14 == 14 da True.'),
q('ejercicios',3,'Quieres mostrar «López Ruiz, Ana» en Python. ¿Cuál es correcta?',['print(apellidos + ", " + nombre)','print(apellidos, nombre)','print(apellidos - nombre)','print(nombre, apellidos)'],'La concatenación une las cadenas con +; también vale un f-string.')
];
})();
