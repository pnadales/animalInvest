import { patronazo, imgDinamica, intaciarClase, camposCompletos, restaurarFormulario, buscarMetodoSonido } from './funciones.js';

let btnAgregar = document.getElementById('btnRegistrar');
let selectEdad = document.getElementById('edad')
let textareaComentarios = document.getElementById('comentarios')
let lienzo = document.getElementById('Animales')

imgDinamica();
let animalesInstanciados = []
btnAgregar.addEventListener('click', async function () {
    try {
        if (!camposCompletos()) {
            let selectAnimal = document.getElementById('animal')
            let nombre = selectAnimal.value;
            let edad = selectEdad.value;
            let comentarios = textareaComentarios.value;
            let datosAnimales = await patronazo.datosJSON(nombre)
            let img = datosAnimales.imagen
            let sound = datosAnimales.sonido
            let animalillo = intaciarClase(nombre, edad, img, comentarios, sound);
            animalesInstanciados.push(animalillo)
            lienzo.innerHTML += `<div class="card tarjeta m-2">
        <button id="animal${animalillo.id}" edad="${animalillo.edad}" comentario="${animalillo.comentarios}" class="btnModal"><img src="assets/imgs/${animalillo.img}" class="card-img-top" >
        </button>
        <button instancia="${animalillo.id}" class="sonido" sonido="${animalillo.sonido}" style="background-color: gray;"><img src="assets/imgs/audio.svg" style="max-width: 15%;"></button>
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
                    modal.show();
                })
            })



            let sonidos = document.querySelectorAll('.sonido')
            sonidos.forEach(function (sonido) {
                sonido.addEventListener('click', function () {
                    let instaciado = animalesInstanciados[Number(sonido.getAttribute('instancia')) - 1]
                    let ruidoAnimal = buscarMetodoSonido(instaciado)
                    ruidoAnimal(instaciado.sonido)
                })
            })
            restaurarFormulario()
        } else {
            alert(`Se debe agregar ${camposCompletos().join(', ')}`);
        }

    } catch (error) {
        alert(error)
    }


})




