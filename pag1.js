
///preguntas

const preguntas = [
    {   
        preguntas: 'Todos me quieren para descansar. Si ya te lo he dicho, no lo pienses más. ¿Qué soy?',
        respuesta: [
        
        { texto: 'Una mochila 🎒​', correcto: false },
        { texto: 'No lo se 🥲​', correct: false},
        { texto: 'La silla 🪑​', correct: true },
        { texto: 'Un carro 🚗​', correct: false },
    
        ]
    },

    {
        preguntas: '¿Cuales son los meses que tienen 28 días?',
        respuesta: [

        { texto: "Febrero", correcto: true },
        { texto: "Enero", correcto: false },
        { texto: "Diciembre", correcto: false },
        { texto: "Septiembre", correcto: false },

        ]

    },

    {
        preguntas: 'Si participas en una carrera y adelantas al que va segundo… ¿En qué puesto estás?',
        respuesta: [

        { texto: 'Tercero', correcto: false },
        { texto: 'Primero', correcto: false},
        { texto: 'Segundo', correcto: true },
        { texto: 'Cuarto', correcto: false },
       
        ]
    },

    {
        preguntas: ' ¿Qué pesa más, un kilo de hierro o un kilo de plumas?',
        respuesta: [

        { texto: 'Obvio el de hierro', correct: false },
        { texto: 'Acero', correcto: false},
        { texto: 'Ambos', correcto: true },
        { texto: 'El de plumas', correcto: false },
       
        ]
    },

    {
        preguntas: ' ¿1+2(5)?',
        respuesta: [

        { texto: '15', correcto: false },
        { texto: '11', correcto: true},
        { texto: '7', correcto: false },
        { texto: 'no tengo la respuesta.', correct: false },
       
        ]
    },

];  

//getElementsById

const listPreguntas = document.getElementById("preguntas")
const botonRespuestas = document.getElementById("botonRespuestas")
const botonSiguiente = document.getElementById("botonSiguiente")

//Var inicio punteo

let preguntaIncioActual = 0;
let punteo = 0;

//funcion iniciarQuiz

function iniciarQuiz() {
    preguntaIncioActual = 0;
    punteo = 0;
    botonSiguiente.innerHTML ="Siguiente"
    mostrarPregunta();
}

//funcion mostrarPregunta
function mostrarPregunta() {
    resetear();
    let preguntaActual = preguntas[preguntaIncioActual];
    let preguntaNo = preguntaIncioActual + 1;
    listPreguntas.innerHTML = preguntaNo + ". " + preguntaActual.
        preguntas;


    preguntaActual.respuesta.forEach(respuestas => {
        const button = document.createElement("button");
        button.innerHTML = respuestas.texto;
        button.classList.add("btn");
        botonRespuestas.appendChild(button);
        if(respuestas.correcto){

            button.dataset.correct= respuestas.correcto;
        }
        button.addEventListener("click", seleccionarRespuesta);
    });


}

//funcion Resetear
function  resetear(){
    botonSiguiente.style.display="none";
    while(botonRespuestas.firstChild){
        botonRespuestas.removeChild(botonRespuestas.firstChild);
    }
}

//funcion seleccionarRespuesta
function  seleccionarRespuesta(e){
    const btnSeleccionado= e.target;
    const esCorrecto= btnSeleccionado.dataset.correct==="true";
    if(esCorrecto){
        btnSeleccionado.classList.add("correct");
        punteo++;

    }else{
        btnSeleccionado.classList.add("incorrecto")
    }
    Array.from(botonRespuestas.children).forEach(button => {
        if(button.dataset.correct=== "true"){
            button.classList.add("correct");
        }
        button.disabled=true;
    });
    botonSiguiente.style.display="block"
}

//funcion mostrarPunteo
function mostrarPunteo(){
    resetear();
listPreguntas.innerHTML=`Obtuviste ${punteo} de ${preguntas.length}!`;
 botonSiguiente.innerHTML="Jugar de nuevo";
 botonSiguiente.style.display="block"
}

//funcion manipulacionBotonSiguiente

function ControlbotonSiguiente(){
    preguntaIncioActual++;
    if(preguntaIncioActual< preguntas.length){
        mostrarPregunta();


    }else{
        mostrarPunteo();
    }
}

botonSiguiente.addEventListener("click", ()=>{
    if(preguntaIncioActual<preguntas.length){
        ControlbotonSiguiente();
        
    }else{
        iniciarQuiz();
    }
})

// else + iniciar quiz

iniciarQuiz()

// Dj cumbia sonido 

function playAudio(){

    document.getElementById("musica1").Play();
}


//Libreria anijs

window.requestAnimFrame = (function(){   return  window.requestAnimationFrame})();
var canvas = document.getElementById("space");
var c = canvas.getContext("2d");

var numStars = 1900;
var radius = '0.'+Math.floor(Math.random() * 9) + 1  ;
var focalLength = canvas.width *2;
var warp = 0;
var centerX, centerY;

var stars = [], star;
var i;

var animate = true;

initializeStars();

function executeFrame(){
  
  if(animate)
    requestAnimFrame(executeFrame);
  moveStars();
  drawStars();
}

function initializeStars(){
  centerX = canvas.width / 2;
  centerY = canvas.height / 2;
  
  stars = [];
  for(i = 0; i < numStars; i++){
    star = {
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      z: Math.random() * canvas.width,
      o: '0.'+Math.floor(Math.random() * 99) + 1
    };
    stars.push(star);
  }
}

function moveStars(){
  for(i = 0; i < numStars; i++){
    star = stars[i];
    star.z--;
    
    if(star.z <= 0){
      star.z = canvas.width;
    }
  }
}

function drawStars(){
  var pixelX, pixelY, pixelRadius;
  
  // Resize to the screen
  if(canvas.width != window.innerWidth || canvas.width != window.innerWidth){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initializeStars();
  }
  if(warp==0)
  {c.fillStyle = "rgba(0,10,20,1)";
  c.fillRect(0,0, canvas.width, canvas.height);}
  c.fillStyle = "rgba(209, 255, 255, "+radius+")";
  for(i = 0; i < numStars; i++){
    star = stars[i];
    
    pixelX = (star.x - centerX) * (focalLength / star.z);
    pixelX += centerX;
    pixelY = (star.y - centerY) * (focalLength / star.z);
    pixelY += centerY;
    pixelRadius = 1 * (focalLength / star.z);
    
    c.fillRect(pixelX, pixelY, pixelRadius, pixelRadius);
    c.fillStyle = "rgba(209, 255, 255, "+star.o+")";
    //c.fill();
  }
}

document.getElementById('warp').addEventListener("click",function(e){
 window.warp = window.warp==1 ? 0 : 1;
window.c.clearRect(0, 0, window.canvas.width, window.canvas.height);
executeFrame();
});

executeFrame();

