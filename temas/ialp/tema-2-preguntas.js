/* IALP · Tema 2 — banco de preguntas (la primera opción es la correcta; el test las mezcla) */
(function(){
window.TEMA_TOPICS={secuencial:'Secuenciales',es:'Variables y E/S',oper:'Operadores',si:'Si / Sino',elif:'elif',segun:'Según / match',mientras:'Mientras',para:'Para',repetir:'Repetir hasta',patrones:'Patrones',elegir:'Elegir estructura',ejercicios:'Ejercicios'};
const q=(b,l,p,o,e,c)=>[b,l,p,o,0,e,c];
window.TEMA_QUESTIONS=[
/* secuencial */
q('secuencial',1,'¿Cómo se ejecutan las instrucciones en una estructura secuencial?',['Una tras otra, sin empezar la siguiente hasta terminar la anterior','Todas a la vez','En orden aleatorio','Solo si se cumple una condición'],'Es el orden natural: de arriba abajo.'),
q('secuencial',1,'¿Cuántos tipos de estructuras secuenciales se indican en los apuntes?',['4: declaración, asignación, lectura y escritura','2: leer y escribir','3: si, mientras y para','5: con los bucles'],'Declaración, asignación, lectura y escritura.'),
q('secuencial',1,'¿Qué instrucción de pseudocódigo pide un dato?',['Leer a','Escribir a','a <- a','VAR a'],'Leer guarda en la variable lo que escribe el usuario.'),
q('secuencial',2,'¿Qué hace la instrucción a <- a + 1?',['Aumenta a en una unidad','Compara a con a + 1','Escribe a','Declara a'],'Es una asignación: calcula a + 1 y lo guarda en a.'),
q('secuencial',2,'¿Qué instrucción muestra un mensaje?',['Escribir "Hola mundo"','Leer "Hola mundo"','VAR "Hola mundo"','a <- "Hola mundo"'],'Escribir es la salida por pantalla.'),
q('secuencial',2,'¿Qué ocurre en este código?',['Error: x todavía no tiene valor','Imprime 0','Imprime 5','Imprime None'],'Se usa x antes de asignarla: NameError. El orden importa.','print(x)\nx = 5'),
q('secuencial',3,'¿Qué imprime este código?',['3','2','1','5'],'Cada línea usa el valor que dejó la anterior: a=1, a=2, a=3.','a = 1\na = a + 1\na = a + 1\nprint(a)'),
q('secuencial',3,'¿Qué imprime?',['10 10','10 20','20 10','20 20'],'b = a copia el 10 en b: las dos valen 10.','a = 10\nb = 20\nb = a\nprint(a, b)'),
q('secuencial',3,'Una estructura secuencial NO puede…',['Tomar decisiones ni repetir instrucciones','Leer datos','Hacer cálculos','Mostrar resultados'],'Para decidir hay condicionales y para repetir, bucles.'),

/* es */
q('es',1,'¿Qué función de Python muestra información?',['print()','input()','int()','len()'],'print() es la salida.'),
q('es',1,'¿Qué función lee texto del teclado?',['input()','print()','float()','read()'],'input() devuelve lo escrito como cadena.'),
q('es',1,'¿Cómo se leen enteros?',['int(input())','input(int)','integer()','input().int'],'Se convierte la cadena con int().'),
q('es',2,'¿Cómo se leen decimales?',['float(input())','int(input())','double(input())','input()'],'float() convierte a número real.'),
q('es',2,'¿Qué hace {dato:.2f} dentro de un f-string?',['Muestra el dato con 2 decimales','Muestra 2 veces el dato','Redondea a entero','Da un error'],':.2f formatea un real con dos decimales.'),
q('es',2,'¿Qué muestra este código con nombre = "Ana"?',['Hola Ana','Hola {nombre}','Hola nombre','Error'],'Con la f, las llaves se sustituyen por el valor de la variable.','print(f"Hola {nombre}")'),
q('es',2,'¿Qué muestra este código con nombre = "Ana"?',['Hola {nombre}','Hola Ana','Hola nombre','Error'],'Sin la f delante, el texto se escribe literalmente.','print("Hola {nombre}")'),
q('es',3,'Con nota = 7.456, ¿qué muestra print(f"Nota: {nota:.2f}")?',['Nota: 7.46','Nota: 7.456','Nota: 7.5','Nota: 7'],'Dos decimales, redondeando: 7.46.'),
q('es',3,'¿Qué ocurre con edad = input("Edad: ") y luego edad + 1?',['TypeError: no se puede sumar texto y número','Se suma 1 sin problema','Devuelve edad','Imprime 1'],'input devuelve str; hay que convertir con int().'),

/* oper */
q('oper',1,'¿Qué operador de Python calcula el resto de una división?',['%','//','/','**'],'% es el módulo (resto).'),
q('oper',1,'¿Cuánto vale 7 // 2?',['3','3.5','4','1'],'// es división entera.'),
q('oper',1,'¿Cuánto vale 7 / 2?',['3.5','3','4','1'],'/ siempre devuelve un real.'),
q('oper',1,'¿Cuál es el operador de potencia?',['**','^','pow=','//'],'7 ** 2 = 49.'),
q('oper',2,'¿Qué operador compara si dos valores son iguales?',['==','=','!=','<-'],'= asigna; == compara.'),
q('oper',2,'¿Qué operador significa «distinto»?',['!=','<>','=/=','not='],'En Python es !=.'),
q('oper',2,'¿Qué operador lógico exige que se cumplan las dos condiciones?',['and','or','not','xor'],'and → los dos; or → al menos uno; not → lo contrario.'),
q('oper',2,'¿Qué hace x += 1?',['x = x + 1','x = 1','x == 1','x = x + x'],'Es un atajo de asignación.'),
q('oper',3,'¿Cuánto vale 17 % 5 + 17 // 5 ?',['5','2','3','6'],'17 % 5 = 2 y 17 // 5 = 3; 2 + 3 = 5.'),
q('oper',3,'¿Qué imprime?',['True','False','Error','None'],'5 > 3 es True; 2 > 4 es False; True or False = True.','print(5 > 3 or 2 > 4)'),
q('oper',3,'¿Qué imprime?',['False','True','7','Error'],'not (x == 7): x == 7 es True y not lo invierte.','x = 7\nprint(not (x == 7))'),
q('oper',3,'¿Qué ocurre con if nota = 5: ?',['SyntaxError: se debe comparar con ==','Compara nota con 5','Asigna 5 y entra','Nada'],'En una condición hay que usar ==; un = da error de sintaxis.'),

/* si */
q('si',1,'¿Para qué sirve una estructura condicional?',['Para bifurcar la ejecución según una condición','Para repetir instrucciones','Para leer datos','Para declarar variables'],'Ejecuta un bloque u otro dependiendo de si se cumple.'),
q('si',1,'¿Con qué palabra se indica la alternativa en Python?',['else','sino','otherwise','elseif'],'En Python: if … else.'),
q('si',1,'¿Qué signo debe llevar al final la línea de un if en Python?',['Dos puntos :','Punto y coma ;','Nada','Una flecha'],'Los dos puntos abren el bloque.'),
q('si',2,'¿Cómo sabe Python qué instrucciones pertenecen al if?',['Por la sangría','Por las llaves { }','Por FinSi','Por los paréntesis'],'La sangría de 4 espacios delimita el bloque.'),
q('si',2,'En un condicional doble, ¿cuántos bloques se ejecutan?',['Exactamente uno','Los dos','Ninguno','Depende de la sangría'],'O el del Si, o el del Sino.'),
q('si',2,'¿Qué cierra un condicional en PSeInt?',['FinSi','End','Fin if','}'],'PSeInt usa FinSi.'),
q('si',2,'¿Qué imprime con edad = 15?',['Menor de edad','Mayor de edad','Nada','Error'],'15 >= 18 es falso: se ejecuta el else.','if edad >= 18:\n    print("Mayor de edad")\nelse:\n    print("Menor de edad")'),
q('si',3,'¿Qué imprime con edad = 15?',['Fin','Mayor de edad y Fin','Nada','Error'],'El print("Fin") no está sangrado: se ejecuta siempre, pero el otro no.','if edad >= 18:\n    print("Mayor de edad")\nprint("Fin")'),
q('si',3,'¿Qué imprime con edad = 20?',['Mayor de edad\nFin','Mayor de edad','Fin','Nada'],'Los dos prints se ejecutan: el primero dentro del if y el segundo siempre.','if edad >= 18:\n    print("Mayor de edad")\nprint("Fin")'),
q('si',3,'¿Cuál es el fallo del código?',['Falta la sangría en el print','Sobra el else','Falta un FinSi','Está bien'],'Tras los dos puntos, la línea siguiente debe estar sangrada (IndentationError).','if x > 0:\nprint("positivo")'),

/* elif */
q('elif',1,'¿Qué palabra de Python encadena condiciones?',['elif','elseif','else if','elsif'],'elif = else + if.'),
q('elif',1,'Con nota = 10, ¿qué imprime?',['Sobresaliente','Aprobado','Suspenso','Nada'],'La primera condición (nota >= 9) es cierta.','if nota >= 9:\n    print("Sobresaliente")\nelif nota >= 5:\n    print("Aprobado")\nelse:\n    print("Suspenso")'),
q('elif',1,'Con nota = 6, ¿qué imprime?',['Aprobado','Sobresaliente','Suspenso','Aprobado y Suspenso'],'No cumple la primera pero sí la segunda; el resto se ignora.','if nota >= 9:\n    print("Sobresaliente")\nelif nota >= 5:\n    print("Aprobado")\nelse:\n    print("Suspenso")'),
q('elif',2,'Con nota = 4, ¿qué imprime?',['Suspenso','Aprobado','Sobresaliente','Nada'],'Ninguna condición es cierta: se ejecuta el else.','if nota >= 9:\n    print("Sobresaliente")\nelif nota >= 5:\n    print("Aprobado")\nelse:\n    print("Suspenso")'),
q('elif',2,'¿Cuántos bloques se ejecutan en una cadena if/elif/else?',['Como máximo uno','Todos','Dos','Depende del número de elif'],'Se ejecuta el de la primera condición cierta, y se termina.'),
q('elif',2,'¿El else final es obligatorio?',['No, es opcional','Sí, siempre','Solo con elif','Solo en PSeInt'],'Sirve de caso por defecto, pero puede omitirse.'),
q('elif',3,'¿Qué imprime con nota = 9.5?',['Aprobado','Sobresaliente','Suspenso','Nada'],'Se evalúa primero nota >= 5: ya es cierta y no se llega a la otra. El orden está mal.','if nota >= 5:\n    print("Aprobado")\nelif nota >= 9:\n    print("Sobresaliente")'),
q('elif',3,'¿Qué imprime con x = 0?',['cero','positivo','negativo','Nada'],'No es > 0 ni < 0: se ejecuta el else.','if x > 0:\n    print("positivo")\nelif x < 0:\n    print("negativo")\nelse:\n    print("cero")'),
q('elif',3,'¿Qué imprime con a = 5, b = 5 ?',['igual','mayor','menor','Nada'],'Ni a > b ni a < b: queda el else.','if a > b:\n    print("mayor")\nelif a < b:\n    print("menor")\nelse:\n    print("igual")'),

/* segun */
q('segun',1,'¿Cómo se llama el condicional múltiple de Python?',['match','switch','select','choose'],'Python 3.10 incorporó match … case.'),
q('segun',1,'¿Cómo se llama en PSeInt?',['Según','Switch','Elegir','Caso'],'SEGÚN expresión HACER … FIN.'),
q('segun',2,'¿Qué significa case _ en Python?',['El caso por defecto: cualquier otro valor','Un error','Un caso con valor vacío','Un comentario'],'_ es el comodín (el * de PSeInt).'),
q('segun',2,'Con opcion = 2, ¿qué imprime?',['Baja','Alta','Opción incorrecta','Nada'],'Coincide con case 2.','match opcion:\n    case 1:\n        print("Alta")\n    case 2:\n        print("Baja")\n    case _:\n        print("Opción incorrecta")'),
q('segun',2,'Con opcion = 7, ¿qué imprime?',['Opción incorrecta','Alta','Baja','Nada'],'No coincide con 1 ni con 2: entra el comodín.','match opcion:\n    case 1:\n        print("Alta")\n    case 2:\n        print("Baja")\n    case _:\n        print("Opción incorrecta")'),
q('segun',2,'¿Cuándo es mejor Según/match que if/elif?',['Cuando se comparan valores concretos, como una opción de menú','Cuando hay rangos de valores','Cuando solo hay dos caminos','Nunca'],'match encaja con opciones exactas; los rangos van mejor con if/elif.'),
q('segun',3,'¿Qué pasa con opcion = 5 si no hay case _?',['No se ejecuta ningún caso','Error siempre','Se ejecuta el primero','Se ejecuta el último'],'Sin caso por defecto, simplemente no ocurre nada: por eso se aconseja incluirlo.'),
q('segun',3,'¿Qué pasa si se usa match en Python 3.8?',['SyntaxError: no existe en esa versión','Funciona igual','Se ignora','Se ejecuta como if'],'match requiere Python 3.10 o superior.'),
q('segun',3,'En PSeInt, ¿qué representa CASO * en el Según?',['Cualquier otro valor','Multiplicación','Un comentario','El primer caso'],'* es el caso por defecto.'),

/* mientras */
q('mientras',1,'¿Cuándo se evalúa la condición de un Mientras?',['Antes de cada vuelta','Después de cada vuelta','Solo la primera vez','Nunca'],'Por eso puede no ejecutarse ni una vez.'),
q('mientras',1,'¿Cuántas veces se ejecuta un while cuya condición es falsa desde el principio?',['0','1','Infinitas','2'],'Si la condición es falsa de entrada, el bloque no se ejecuta.'),
q('mientras',1,'¿Qué imprime este código?',['0 1 2 3 4','1 2 3 4 5','0 1 2 3 4 5','5'],'Imprime mientras contador < 5, desde 0.','contador = 0\nwhile contador < 5:\n    print(contador)\n    contador += 1'),
q('mientras',2,'¿Qué provoca un bucle infinito?',['No modificar la variable de la condición','Usar contador += 1','Escribir dos puntos al final','Usar print'],'Si la condición nunca se vuelve falsa, el bucle no acaba.'),
q('mientras',2,'¿Cómo se detiene un programa en un bucle infinito en la terminal?',['Ctrl + C','Ctrl + V','Alt + F4 siempre','Esc'],'Ctrl+C lanza KeyboardInterrupt.'),
q('mientras',2,'¿Cuántas veces se ejecuta el bucle?',['3','2','4','Infinitas'],'i vale 1, 2 y 3 durante la ejecución del cuerpo.','i = 1\nwhile i <= 3:\n    i += 1'),
q('mientras',3,'¿Qué imprime?',['Nada','0','1','Error'],'La condición ya es falsa desde el principio.','n = 10\nwhile n < 5:\n    print(n)\n    n += 1'),
q('mientras',3,'¿Qué valor tiene s al terminar?',['6','10','3','0'],'Suma 1 + 2 + 3.','s = 0\ni = 1\nwhile i <= 3:\n    s += i\n    i += 1'),
q('mientras',3,'¿Qué problema tiene este bucle?',['Es infinito','Imprime pocas veces','No compila','Ninguno'],'x nunca cambia, así que x < 3 siempre es cierta.','x = 0\nwhile x < 3:\n    print(x)'),

/* para */
q('para',1,'¿Cuándo se usa el bucle Para?',['Cuando se sabe cuántas veces hay que repetir','Cuando no se sabe cuántas veces','Para tomar decisiones','Para leer datos'],'Para lleva contador, límite y paso.'),
q('para',1,'¿Qué genera range(5)?',['0 1 2 3 4','1 2 3 4 5','0 1 2 3 4 5','5'],'Empieza en 0 y no incluye el final.'),
q('para',1,'¿Qué genera range(1, 6)?',['1 2 3 4 5','1 2 3 4 5 6','0 1 2 3 4 5','2 3 4 5 6'],'El inicio se incluye y el final no.'),
q('para',2,'¿Qué genera range(0, 10, 2)?',['0 2 4 6 8','2 4 6 8 10','0 2 4 6 8 10','0 1 2 3 4'],'Paso 2 hasta antes de 10.'),
q('para',2,'¿Qué genera range(5, 0, -1)?',['5 4 3 2 1','5 4 3 2 1 0','4 3 2 1 0','0 1 2 3 4'],'Cuenta atrás sin llegar al 0.'),
q('para',2,'¿Qué escribe un range para que incluya el 100 al contar de 2 en 2 desde 0?',['range(0, 101, 2)','range(0, 100, 2)','range(100, 2)','range(0, 2, 100)'],'El final no se incluye: hay que llegar a 101.'),
q('para',2,'¿Cuántas vueltas da for i in range(3, 8)?',['5','4','6','8'],'3, 4, 5, 6, 7.'),
q('para',3,'¿Cuál es el equivalente en Python de PARA i = 10 MIENTRAS i > 0 CON i = i - 2?',['range(10, 0, -2)','range(10, 0, 2)','range(0, 10, -2)','range(10, 2)'],'Empieza en 10, para antes de 0 y resta 2.'),
q('para',3,'¿Qué imprime?',['6','10','3','1'],'Acumula 1 + 2 + 3.','s = 0\nfor i in range(1, 4):\n    s += i\nprint(s)'),
q('para',3,'¿Cuántas veces se ejecuta el cuerpo?',['0','1','5','Error'],'range(5, 1) está vacío porque el paso es positivo y el inicio ya supera el fin.','for i in range(5, 1):\n    print(i)'),

/* repetir */
q('repetir',1,'¿Cuándo se evalúa la condición en Repetir-Hasta?',['Después de ejecutar el bloque','Antes del bloque','Nunca','Solo si falla'],'Por eso el bloque se ejecuta al menos una vez.'),
q('repetir',1,'¿Cuántas veces se ejecuta como mínimo un Repetir-Hasta?',['1','0','2','Depende'],'Siempre una vez al menos.'),
q('repetir',1,'¿Existe el bucle Repetir-Hasta en Python?',['No, se simula con while True y break','Sí, con repeat','Sí, con do-while','Sí, con until'],'«No existe, se puede simular con if y break».'),
q('repetir',2,'En REPETIR … HASTA cond, ¿cuándo se sale del bucle?',['Cuando la condición es verdadera','Cuando es falsa','Nunca','Tras una vuelta'],'Hasta = se repite hasta que se cumple la condición.'),
q('repetir',2,'En Python, la condición del if … break equivale a…',['La condición del HASTA','La negación de la condición del HASTA','La del MIENTRAS','Ninguna'],'if cond: break sale cuando cond es cierta, igual que el HASTA.'),
q('repetir',2,'¿Qué imprime?',['5','Nada','4','Error'],'El cuerpo se ejecuta una vez (imprime 5) y después n = 6 cumple la condición de salida.','n = 5\nwhile True:\n    print(n)\n    n += 1\n    if n >= 5:\n        break'),
q('repetir',3,'Un uso típico del Repetir-Hasta es…',['Validar una entrada hasta que sea correcta','Recorrer una lista conocida','Elegir entre opciones','Declarar variables'],'Hay que pedir el dato al menos una vez.'),
q('repetir',3,'Comparado con Mientras, la condición del Repetir es…',['De salida, opuesta a la de continuar','Idéntica','Siempre numérica','Siempre falsa'],'Mientras continúa si es verdadera; Repetir sale si es verdadera.'),
q('repetir',3,'¿Qué se imprime con n = 0 en un Repetir que escribe n y resta 1 hasta n < 1?',['0 (una vez)','Nada','0 y -1','Infinito'],'Escribe 0, resta 1 y la condición ya es cierta.'),

/* patrones */
q('patrones',1,'¿Qué es un contador?',['Una variable que se incrementa al contar algo','Una constante','Una función','Un comentario'],'Suele hacerse cont += 1.'),
q('patrones',1,'¿Qué es un acumulador?',['Una variable que suma valores sucesivos','Una variable que guarda texto','Un bucle','Una condición'],'suma += x.'),
q('patrones',2,'Para hallar el mayor de varios valores, ¿con qué se inicializa?',['Con el primer valor leído','Con 0 siempre','Con 100','Con -1 siempre'],'Con 0 fallaría si todos fueran negativos.'),
q('patrones',2,'Para saber si n es primo basta probar divisores hasta…',['La raíz cuadrada de n','n entero','n / 2 siempre','10'],'Si no hay divisor ≤ √n, no hay ninguno.'),
q('patrones',2,'¿Qué es una bandera?',['Una variable lógica que recuerda si ha ocurrido algo','Un tipo de bucle','Un operador','Un comentario'],'Por ejemplo primo = False al encontrar un divisor.'),
q('patrones',3,'¿Cuál es el resultado de es primo(1)?',['No es primo','Es primo','Error','Depende'],'Los primos empiezan en 2.'),
q('patrones',3,'¿Qué mide este código?',['Cuántos pares hay en 1..10','La suma de 1..10','El mayor de 1..10','Nada'],'Cuenta cada número divisible entre 2.','c = 0\nfor i in range(1, 11):\n    if i % 2 == 0:\n        c += 1'),
q('patrones',3,'¿Qué valor tiene c?',['5','10','4','6'],'Pares del 1 al 10: 2, 4, 6, 8, 10.','c = 0\nfor i in range(1, 11):\n    if i % 2 == 0:\n        c += 1'),
q('patrones',3,'¿Qué hace este código?',['Imprime si n es primo','Suma divisores','Cuenta números','Da error'],'Si algún i divide a n, primo pasa a False.','primo = n > 1\ni = 2\nwhile i * i <= n:\n    if n % i == 0:\n        primo = False\n    i += 1'),

/* elegir */
q('elegir',1,'Si no sabes cuántas veces repetir, ¿qué usas?',['while','for con range','match','if'],'while repite mientras se cumpla una condición.'),
q('elegir',1,'Si sabes cuántas veces repetir, ¿qué usas?',['for','match','if','input'],'for con range es lo natural.'),
q('elegir',2,'¿Qué bucle se ejecuta siempre al menos una vez?',['Repetir-Hasta','Mientras','Para','Ninguno'],'Su condición está al final.'),
q('elegir',2,'Con n = 0, ¿cuántas veces se ejecuta un Mientras i >= 1?',['0','1','Infinitas','2'],'La condición es falsa de entrada.'),
q('elegir',2,'Los tres bucles con n = 0 se ejecutan:',['0, 0 y 1 vez','1, 1 y 1 vez','0, 0 y 0 veces','1, 0 y 0 veces'],'Mientras y Para: 0; Repetir: 1.'),
q('elegir',3,'¿Qué estructura usarías para un menú de 5 opciones numeradas?',['Según / match','Para','Repetir','Una secuencia'],'Son valores concretos.'),
q('elegir',3,'¿Qué estructura usarías para clasificar una nota en tramos?',['if / elif / else','match con valores','Un solo print','Un for'],'Son rangos, no valores exactos.'),
q('elegir',3,'¿Pueden reescribirse todos los bucles con while?',['Sí','No, el for es único','Solo el repetir','Depende del lenguaje'],'while es el más general; los otros son comodidades.'),

/* ejercicios */
q('ejercicios',1,'En el ejercicio de los pares entre 0 y 100, ¿qué paso usa el bucle?',['2','1','10','100'],'range(0, 101, 2).'),
q('ejercicios',1,'¿Qué tamaño tiene un sector en el ejercicio del disco duro?',['512 bytes','1024 bytes','4 KB','1 MB'],'Cada sector almacena 512 bytes.'),
q('ejercicios',2,'¿Cómo se calcula la capacidad del disco en bytes?',['cilindros · pistas · sectores · 512','cilindros + pistas + sectores','cilindros · 512','pistas · sectores'],'Es el producto de las cuatro cantidades.'),
q('ejercicios',2,'¿Cómo se pasa de bytes a KB?',['Dividiendo entre 1024','Multiplicando por 1024','Dividiendo entre 1000 siempre','Restando 1024'],'1 KB = 1024 bytes.'),
q('ejercicios',2,'En la división por restas sucesivas, ¿qué es el cociente?',['Las veces que se pudo restar el divisor','El dividendo restante','El divisor','La suma de restos'],'Cada resta cuenta una vez; lo que sobra es el resto.'),
q('ejercicios',2,'¿Qué hay que comprobar antes de dividir por restas sucesivas?',['Que el divisor no sea 0','Que el dividendo sea par','Que ambos sean primos','Nada'],'Con divisor 0 el bucle no termina nunca.'),
q('ejercicios',2,'Para intercambiar dos variables en PSeInt hace falta…',['Una variable auxiliar','Dos constantes','Un bucle','Un Según'],'Se guarda uno de los valores antes de pisarlo.'),
q('ejercicios',3,'¿Cuál es la forma de Python de intercambiar a y b sin auxiliar?',['a, b = b, a','a = b; b = a','swap(a, b)','a <-> b'],'La asignación múltiple evalúa la derecha primero.'),
q('ejercicios',3,'En la combinación aleatoria de 6 números, ¿cómo se evitan repeticiones?',['Comprobando si el número ya está antes de añadirlo','Ordenando al final','Usando 49 bucles','No hace falta'],'if num not in lista, o usando random.sample.'),
q('ejercicios',3,'¿Qué se obtiene con print("*" * 4)?',['****','* * * *','4','Error'],'Una cadena multiplicada por un entero se repite.'),
q('ejercicios',3,'¿Para qué sirve end="" en print("*", end="")?',['Para no saltar de línea','Para terminar el programa','Para borrar el texto','Para repetir'],'Por defecto print termina con salto de línea.')
];
})();
