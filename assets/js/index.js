// Bloque import
import { patronazo, imgDinamica, intaciarClase, camposCompletos, restaurarFormulario, buscarMetodoSonido } from './funciones.js';

// capturar boton, datos y lugar para mostrar tarjetas
let btnAgregar = document.getElementById('btnRegistrar');
let selectEdad = document.getElementById('edad')
let textareaComentarios = document.getElementById('comentarios')
let lienzo = document.getElementById('Animales')
let selectAnimal = document.getElementById('animal')

// Funcion para que la imagen del formulario cambie de acuerdo a la opcion seleccionada
imgDinamica();

// arreglo para guardar las instancias creadas
let animalesInstanciados = []

// listener donde se ejecuta la mayor parte del código
btnAgregar.addEventListener('click', async function () {
    try {
        // condicional para comprobar que todos los campos se llenaron
        if (!camposCompletos()) {
            //Se capturan los datos para instanciar la clase
            let nombre = selectAnimal.value;
            let edad = selectEdad.value;
            let comentarios = textareaComentarios.value;
            let datosAnimales = await patronazo.datosJSON(nombre)
            let img = datosAnimales.imagen
            let sound = datosAnimales.sonido

            //Se instancia la clase corresponiente mediante una función que escoje la correcta
            let animalillo = intaciarClase(nombre, edad, img, comentarios, sound);

            // se agrega la insancia al arrego
            animalesInstanciados.push(animalillo)

            // se agrega la tarjeta correspondiente a la pagina, se pasan los valores como atributos de etiqueta
            lienzo.innerHTML += `<div class="card tarjeta m-2">
        <button id="animal${animalillo.id}" edad="${animalillo.edad}" comentario="${animalillo.comentarios}" class="btnModal"><img src="assets/imgs/${animalillo.img}" class="card-img-top" >
        </button>
        <button instancia="${animalillo.id}" class="sonido" sonido="${animalillo.sonido}" style="background-color: gray;"><img src="assets/imgs/audio.svg" style="max-width: 15%;"></button>
      </div>`


            // se capturan todos lo elementos del modal
            let agregados = document.querySelectorAll('.btnModal')
            let modalImg = document.getElementById('imagenModal')
            let modalEdad = document.getElementById('edadModal')
            let modalComentario = document.getElementById('textComentario')


            //se recorre el arreglo que contiene los botones y se agrega un listener para mostrar la ventana modal que corresponda
            agregados.forEach(function (agregado) {
                agregado.addEventListener('click', function () {
                    modalImg.setAttribute('src', agregado.querySelector('img').getAttribute('src'))
                    modalEdad.innerHTML = agregado.getAttribute('edad');
                    modalComentario.innerHTML = agregado.getAttribute('comentario')

                    let modal = new bootstrap.Modal(document.getElementById('exampleModal1'));
                    modal.show();
                })
            })


            // se capturan los botones de sonido y se les agrega un listener para reproducir el sonido correspondiente
            let sonidos = document.querySelectorAll('.sonido')
            sonidos.forEach(function (sonido) {
                sonido.addEventListener('click', function () {
                    // Se captura el objeto instanciado mediante su id
                    let instaciado = animalesInstanciados[Number(sonido.getAttribute('instancia')) - 1]
                    //Se busca el metodo correspondiente al animal instanciado
                    let ruidoAnimal = buscarMetodoSonido(instaciado)
                    //se ejecuta el método que reproduce el sonido
                    ruidoAnimal(instaciado.sonido)
                })
            })
            restaurarFormulario()
        } else {
            // si hay campos sin completar se alerta de cuáles son
            alert(`Se debe agregar ${camposCompletos().join(', ')}`);
        }

    } catch (error) {
        alert(error)
    }


})




