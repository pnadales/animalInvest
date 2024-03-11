import { patronazo, imgDinamica, intaciarClase } from './funciones.js';

let btnAgregar = document.getElementById('btnRegistrar');
let selectEdad = document.getElementById('edad')
let textareaComentarios = document.getElementById('comentarios')
let lienzo = document.getElementById('Animales')

imgDinamica();

btnAgregar.addEventListener('click', async function () {
    let selectAnimal = document.getElementById('animal')
    let nombre = selectAnimal.value;
    let edad = selectEdad.value;
    let comentarios = textareaComentarios.value;
    let datosAnimales = await patronazo.datosJSON(nombre)
    let img = datosAnimales.imagen
    let sound = datosAnimales.sonido
    let animalillo = intaciarClase(nombre, edad, img, comentarios, sound);
    lienzo.innerHTML += `<div class="card tarjeta m-2">
    <button id="animal${animalillo.id}" edad="${animalillo.edad}" comentario="${animalillo.comentarios}" class="btnModal"><img src="assets/imgs/${animalillo.img}" class="card-img-top" >
    </button>
    <button id="sonido${animalillo.id}" class="sonido" sonido="${animalillo.sonido}" style="background-color: gray;"><img src="assets/imgs/audio.svg" style="max-width: 15%;"></button>
  </div>`

    let agregados = document.querySelectorAll('.btnModal')



    let modalImg = document.getElementById('imagenModal')
    let modalEdad = document.getElementById('edadModal')
    let modalComentario = document.getElementById('textComentario')

    agregados.forEach(function (agregado) {
        agregado.addEventListener('click', function () {
            console.log("joad")
            modalImg.setAttribute('src', agregado.querySelector('img').getAttribute('src'))
            modalEdad.innerHTML = agregado.getAttribute('edad');
            modalComentario.innerHTML = agregado.getAttribute('comentario')

            let modal = new bootstrap.Modal(document.getElementById('exampleModal1'));

            // Mostrar el modal
            modal.show();
        })
    })



    let sonidos = document.querySelectorAll('.sonido')
    sonidos.forEach(function (sonido) {
        sonido.addEventListener('click', function () {
            let audio = document.getElementById('player');
            console.log(sonido);
            let source = document.querySelector('source')
            source.setAttribute('src', `assets/sounds/${sonido.getAttribute('sonido')}`)
            // audio.innerHTML = `<source src="assets/sounds/${sonido.getAttribute('sonido')}" type="audio/mpeg"></source>`
            console.log(audio);
            audio.load();
            audio.play();
        })
    })


})




