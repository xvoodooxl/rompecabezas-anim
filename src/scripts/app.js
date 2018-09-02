window.onload = function() {
  animateIntro();
  setTimeout(function() {
    hideAndShow('#juego-contenedor', '#intro-logo');
    animateContenedor('#juego-contenedor');
  }, 3000);
  iniciar();
}


// SECCION DE FUNCIONES DE ANIMACION


function animateIntro() {
  // Declarando las constantes para seleccion en el dom los elementos (La forma especifica de declarar es por la libreria, se declara con selectores de CSS)

  // Primera fila
  const boxTop = '.box-top .box';
  // Segunda fila
  const boxMiddle = '.box-middle .box';
  // Tercera fila
  const boxBottom = '.box-bottom .box';


// Poner las constantes dentro de un array para poder hacer un loop
  let boxArray = [boxTop, boxMiddle, boxBottom];

// Declaro un counter para poder incrementar la difencia en que se deben ejecutar las animaciones entre las filas
  let counter = 0;

// El translate value es la distancia vertical hasta donde va la animacion
  let TranslateValue = -300;

// Loop para cambiar los tiempos de cada pieza al hacer la animacion
  for (let pos in boxArray) {
    setTimeout(() => {
      anime({
        targets: boxArray[pos],
        opacity: 0,
        translateY: [
          {value: TranslateValue, duration: 500}
        ],
        rotate: {
          value: '1turn',
          easing: 'easeInOutSine'
        },
        backgroundColor: '#ffb840',
        borderRadius: ['0', '50px'],
        easing: 'easeInOutQuad',
        delay: function(el, i, l){return i * 400},
        autoplay:true
      });
    } , counter);

    counter += 1000;
    TranslateValue += -130;
  };
};

function animateContenedor(target){
  anime({
    targets: target,
    opacity: 1,
    easing: 'easeInOutQuad',
    delay: 80,
    autoplay: true
  });
};

function hideAndShow(item1, item2) {
  let show = document.querySelector(item1);
  var hide = document.querySelector(item2);
  hide.style.display = 'none';
  show.style.display = 'flex';
};


// Seccion del juego

// Declaracion de las variables para cambiar las images
const rompecabezas1 = [10,11,12,13,14,15,16,17];
const rompecabezas2 = [20,21,22,23,24,25,26,27];
const rompecabezas3 = [30,31,32,33,34,35,36,37];

// Arreglo que contiene las intrucciones del juego
const instrucciones = [
  "Selecciona el rompecabezas para empezar",
  "Usa las flechas para mover las piezas",
  "Usa menos de 100 movimientos para ganar",
  "Cuando selecciones un rompecabezas el juego se reiniciara",
  "Completa la imagen para ganar"];


// Arreglo para ir guardando los movimientos que se vayan realizando
var movimientos = [];


// Variable para iniciar el contador para el limite de movimientos
var limiteMovimientos = 100;

// Representación de la grilla. Cada número representa a una pieza.
// El 9 es la posición vacía
  var grilla = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
];

/* Estas dos variables son para guardar la posición de la pieza vacía.
Esta posición comienza siendo la [2, 2]*/
var filaVacia = 2;
var columnaVacia = 2;

/* Esta función deberá recorrer el arreglo de instrucciones pasado por parámetro.
Cada elemento de este arreglo deberá ser mostrado en la lista con id 'lista-instrucciones'.
Para eso deberás usar la función ya implementada mostrarInstruccionEnLista().
Podés ver su implementación en la ultima parte de este codigo. */

// Mostrar instrucciones de a una en un intervalo de 5 segundos
function mostrarInstrucciones(instrucciones) {
  let counter = 0;
    setInterval(() => {
          mostrarInstruccionEnLista(instrucciones[counter], 'lista-instrucciones');
          let ul = document.getElementById('lista-instrucciones');
          ul.removeChild(ul.firstChild);
          counter += 1;
          if (counter == instrucciones.length) {
            counter = 0;
          };
    }, 5000);
};

/* COMPLETAR: Crear función que agregue la última dirección al arreglo de movimientos
y utilice actualizarUltimoMovimiento para mostrarlo en pantalla */
function agregarUltimoMovimiento(direccion) {
  movimientos.push(direccion);
  actualizarUltimoMovimiento(direccion);
  actualizarCantidadMovimientos();
}


// Funcion que actualiza la variable con el numero de movimiento restantess
function actualizarCantidadMovimientos() {
    limiteMovimientos -= 1;
}


// Funcion que muestra el numero de movimientos en pantalla tanto los ya hechos como los restantes
function mostrarMovimientosEnPantalla() {
  let cartel = document.getElementById('movimientos');
  let limite = document.getElementById('movimientos-restantes');
  cartel.innerText = movimientos.length;
  limite.innerText = `Movimientos restantes: ${limiteMovimientos}`;
};


// Actualiza el movimiento inicial a cero
function mostrarMovimientoInicial() {
  let cartel = document.getElementById('movimientos');
  cartel.innerText = movimientos.length;
};


// Funcion para seleccionar el rompecabezas
function seleccionarJuego(rompecabezas){
  var tablero = [];

  for(let i = 1; i < 9; i++) {
	   tablero.push(document.getElementById('pieza'+i));
  };

  var tagStart = "<img class='pieza-juego' src=";
  var tagEnd = " alt='pieza1'>";

  for (pos in rompecabezas) {
    tablero[pos].innerHTML = tagStart + `'../images/${rompecabezas[pos]}.jpg'` + tagEnd;
  }

  mezclarPiezas(30);
  mostrarMovimientoInicial();
  mostrarMovimientosEnPantalla();
  capturarTeclas();
};

/* Esta función va a chequear si el Rompecabezas esta en la posicion ganadora.
Existen diferentes formas de hacer este chequeo a partir de la grilla. */
function chequearSiGano() {
  let grillaGanadora = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9]
  ];

  for (let filaIndex in grillaGanadora) {
    for (let columnaIndex in grillaGanadora[filaIndex]) {
      if(grillaGanadora[filaIndex][columnaIndex] != grilla[filaIndex][columnaIndex]) {
        return false
      };
    };
  };
  return true
}

// Implementar alguna forma de mostrar un cartel que avise que ganaste el juego

// Muestra el cartel ganador y reinicia el juego
function mostrarCartelGanador() {
    hideAndShow('#cartel-ganador','#juego-contenedor');
    setTimeout(() => {
      window.location.href = "index.html";
    }, 4000);
}

// Muestra el cartel perdedor y reinicia el juego
function mostrarCartelPerdio() {
    hideAndShow('#cartel-ganador','#juego-contenedor');
    setTimeout(() => {
      window.location.href = "index.html";
    }, 4000);
}

/* Función que intercambia dos posiciones en la grilla.
Pensar como intercambiar dos posiciones en un arreglo de arreglos.
Para que tengas en cuenta:
Si queremos intercambiar las posiciones [1,2] con la [0, 0], si hacemos:
arreglo[1][2] = arreglo[0][0];
arreglo[0][0] = arreglo[1][2];

En vez de intercambiar esos valores vamos a terminar teniendo en ambas posiciones el mismo valor.
Se te ocurre cómo solucionar esto con una variable temporal?
*/

function intercambiarPosicionesGrilla(filaPos1, columnaPos1, filaPos2, columnaPos2) {
    let tempGrilla = grilla[filaPos1][columnaPos1];
    grilla[filaPos1][columnaPos1] = grilla[filaPos2][columnaPos2];
    grilla[filaPos2][columnaPos2] = tempGrilla;
}

// Actualiza la posición de la pieza vacía
function actualizarPosicionVacia(nuevaFila, nuevaColumna) {
  filaVacia = nuevaFila;
  columnaVacia = nuevaColumna;
}


// Para chequear si la posicón está dentro de la grilla.
function posicionValida(fila, columna) {
    return !(fila > 2 || fila < 0 || columna > 2 || columna < 0);
}

/* Movimiento de fichas, en este caso la que se mueve es la blanca intercambiando su posición con otro elemento.
Las direcciones están dadas por números que representa: arriba (38), abajo (40), izquierda (37), derecha (39) */
function moverEnDireccion(direccion) {
  var nuevaFilaPiezaVacia;
  var nuevaColumnaPiezaVacia;

  // Mueve pieza hacia la abajo, reemplazandola con la blanca
  if (direccion === codigosDireccion.ABAJO) {
    nuevaFilaPiezaVacia = filaVacia - 1;
    nuevaColumnaPiezaVacia = columnaVacia;
  }

  // Mueve pieza hacia arriba, reemplazandola con la blanca
  else if (direccion === codigosDireccion.ARRIBA) {
    nuevaFilaPiezaVacia = filaVacia + 1;
    nuevaColumnaPiezaVacia = columnaVacia;
  }

  // Mueve pieza hacia la derecha, reemplazandola con la blanca
  else if (direccion === codigosDireccion.DERECHA) {
    nuevaFilaPiezaVacia = filaVacia;
    nuevaColumnaPiezaVacia = columnaVacia -1;
  }

  // Mueve pieza hacia la izquierda, reemplazandola con la blanca
  else if (direccion === codigosDireccion.IZQUIERDA) {
    nuevaFilaPiezaVacia = filaVacia;
    nuevaColumnaPiezaVacia = columnaVacia +1;
  }

  /* A continuación se chequea si la nueva posición es válida, si lo es, se intercambia.
  Para que esta parte del código funcione correctamente deberás haber implementado
  las funciones posicionValida, intercambiarPosicionesGrilla y actualizarPosicionVacia */

    if (posicionValida(nuevaFilaPiezaVacia, nuevaColumnaPiezaVacia)) {
        intercambiarPosiciones(filaVacia, columnaVacia, nuevaFilaPiezaVacia, nuevaColumnaPiezaVacia);
        actualizarPosicionVacia(nuevaFilaPiezaVacia, nuevaColumnaPiezaVacia);

  //COMPLETAR: Agregar la dirección del movimiento al arreglo de movimientos
        agregarUltimoMovimiento(direccion);
    }
}


//////////////////////////////////////////////////////////
////////A CONTINUACIÓN FUNCIONES YA IMPLEMENTADAS.////////
/////////NO TOCAR A MENOS QUE SEPAS LO QUE HACES//////////
//////////////////////////////////////////////////////////

/* Las funciones y variables que se encuentran a continuación ya están implementadas.
No hace falta que entiendas exactamente que es lo que hacen, ya que contienen
temas aún no vistos. De todas formas, cada una de ellas tiene un comentario
para que sepas que se está haciendo a grandes rasgos. NO LAS MODIFIQUES a menos que
entiendas perfectamente lo que estás haciendo! */

/* codigosDireccion es un objeto que te permite reemplazar
el uso de números confusos en tu código. Para referirte a la dir
izquierda, en vez de usar el número 37, ahora podés usar:
codigosDireccion.IZQUIERDA. Esto facilita mucho la lectura del código. */
var codigosDireccion = {
    IZQUIERDA: 37,
    ARRIBA: 38,
    DERECHA: 39,
    ABAJO: 40
}

/* Funcion que realiza el intercambio logico (en la grilla) y ademas actualiza
el intercambio en la pantalla (DOM). Para que funcione debera estar implementada
la funcion intercambiarPosicionesGrilla() */
function intercambiarPosiciones(fila1, columna1, fila2, columna2) {
  // Intercambio posiciones en la grilla
  var pieza1 = grilla[fila1][columna1];
  var pieza2 = grilla[fila2][columna2];

  intercambiarPosicionesGrilla(fila1, columna1, fila2, columna2);
  intercambiarPosicionesDOM('pieza' + pieza1, 'pieza' + pieza2);

}

/* Intercambio de posiciones de los elementos del DOM que representan
las fichas en la pantalla */

function intercambiarPosicionesDOM(idPieza1, idPieza2) {
  // Intercambio posiciones en el DOM
  var elementoPieza1 = document.getElementById(idPieza1);
  var elementoPieza2 = document.getElementById(idPieza2);

  var padre = elementoPieza1.parentNode;

  var clonElemento1 = elementoPieza1.cloneNode(true);
  var clonElemento2 = elementoPieza2.cloneNode(true);

  padre.replaceChild(clonElemento1, elementoPieza2);
  padre.replaceChild(clonElemento2, elementoPieza1);
}

/* Actualiza la representación visual del último movimiento
en la pantalla, representado con una flecha. */
function actualizarUltimoMovimiento(direccion) {
  ultimoMov = document.getElementById('flecha');
  switch (direccion) {
    case codigosDireccion.ARRIBA:
      ultimoMov.textContent = '↑';
      break;
    case codigosDireccion.ABAJO:
      ultimoMov.textContent = '↓';
      break;
    case codigosDireccion.DERECHA:
      ultimoMov.textContent = '→';
      break;
    case codigosDireccion.IZQUIERDA:
      ultimoMov.textContent = '←';
      break;
  }
}

/* Esta función permite agregar una instrucción a la lista
con idLista. Se crea un elemento li dinámicamente con el texto
pasado con el parámetro "instrucción". */
function mostrarInstruccionEnLista(instruccion, idLista) {
  var ul = document.getElementById(idLista);
  var li = document.createElement("li");
  li.textContent = instruccion;
  ul.appendChild(li);
}

/* Función que mezcla las piezas del tablero una cantidad de veces dada.
Se calcula una posición aleatoria y se mueve en esa dirección. De esta forma
se mezclará todo el tablero. */

function mezclarPiezas(veces) {
  if (veces <= 0) {
    return;
  }

  var direcciones = [codigosDireccion.ABAJO, codigosDireccion.ARRIBA,
      codigosDireccion.DERECHA, codigosDireccion.IZQUIERDA
    ];

  var direccion = direcciones[Math.floor(Math.random() * direcciones.length)];
  moverEnDireccion(direccion);

  setTimeout(function() {
      mezclarPiezas(veces - 1);
    }, 100);

    movimientos = []; // resetear array de Movimientos para que queden solo los hechos por el usuario
    limiteMovimientos = 100;
}

/* capturarTeclas: Esta función captura las teclas presionadas por el usuario. Javascript
permite detectar eventos, por ejemplo, cuando una tecla es presionada y en
base a eso hacer algo. No es necesario que entiendas como funciona esto ahora,
en el futuro ya lo vas a aprender. Por ahora, sólo hay que entender que cuando
se toca una tecla se hace algo en respuesta, en este caso, un movimiento */
function capturarTeclas() {
  document.body.onkeydown = (function(evento) {
    if (evento.which === codigosDireccion.ABAJO ||
      evento.which === codigosDireccion.ARRIBA ||
      evento.which === codigosDireccion.DERECHA ||
      evento.which === codigosDireccion.IZQUIERDA) {

      moverEnDireccion(evento.which);

        var gano = chequearSiGano();
        if (gano) {
          setTimeout(function() {
              mostrarCartelGanador();
              }, 500);
            }
            evento.preventDefault();
        }
        if (limiteMovimientos == 0) {
          mostrarCartelPerdio();
        }
        mostrarMovimientosEnPantalla();
    })
}

/* Se inicia el rompecabezas mezclando las piezas 60 veces
y ejecutando la función para que se capturen las teclas que
presiona el usuario */
function iniciar() {
    mostrarInstrucciones(instrucciones);
    mostrarMovimientoInicial();
}
