import { Leon, Lobo, Oso, Serpiente, Aguila } from './clases.js'


const patronazo = (() => {



    return {
        datosJSON: async (especie) => {
            const path = '../../animales.json';
            try {
                const response = await fetch(path);
                const data = await response.json();
                // console.log(data)
                const salida = data.animales.filter((animal) => animal.name == especie)
                // console.log(salida[0])

                return salida[0]



            } catch (err) {
                alert(err);
            }
        }
    }
})();




let selectAnimal = document.getElementById('animal')

selectAnimal.addEventListener('change', function () {
    let imagenFormulario = document.getElementById('preview');
    imagenFormulario.style.backgroundImage = "none";
    if (selectAnimal.value == 'Leon' || selectAnimal.value == 'Aguila') {
        imagenFormulario.innerHTML = `<img src="assets/imgs/${selectAnimal.value}.png" alt="" style="max-width: 100%; max-height: 100%;"></img>`
    } else {
        imagenFormulario.innerHTML = `<img src="assets/imgs/${selectAnimal.value}.jpg" alt="" style="max-width: 100%; max-height: 100%;"></img>`
    }
})

let btnAgregar = document.getElementById('btnRegistrar');
let selectEdad = document.getElementById('edad')
let textareaComentarios = document.getElementById('comentarios')
let lienzo = document.getElementById('Animales')

let agregados;
let modalImg
let modalEdad
let modalComentario

btnAgregar.addEventListener('click', async function () {
    let nombre = selectAnimal.value;
    let edad = selectEdad.value;
    let comentarios = textareaComentarios.value;
    let json = await patronazo.datosJSON(nombre)
    let img = json.imagen
    let sound = json.sonido
    let animalillo;
    switch (nombre) {
        case "Leon":
            animalillo = new Leon(nombre, edad, img, comentarios, sound)
            break;
        case "Lobo":
            animalillo = new Lobo(nombre, edad, img, comentarios, sound)
            break;

        case "Serpiente":
            animalillo = new Serpiente(nombre, edad, img, comentarios, sound)
            break;

        case "Oso":
            animalillo = new Oso(nombre, edad, img, comentarios, sound)
            break;
        case "Aguila":
            animalillo = new Aguila(nombre, edad, img, comentarios, sound)
            break;
    }
    lienzo.innerHTML += `<div class="card" style="width: 10rem;">
    <button id="animal${animalillo.id}" edad="${animalillo.edad}" comentario="${animalillo.comentarios}" class="btnModal"><img src="assets/imgs/${animalillo.img}" class="card-img-top" >
    </button>
    <button id="sonido${animalillo.nombre}" style="background-color: gray;"><img src="assets/imgs/audio.svg" style="max-width: 25%;" ;"></button>
  </div>`

    agregados = document.querySelectorAll('.btnModal')
    console.log(agregados)


    modalImg = document.getElementById('imagenModal')
    modalEdad = document.getElementById('edadModal')
    modalComentario = document.getElementById('textComentario')

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

})




