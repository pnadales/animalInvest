import { Leon, Lobo, Oso, Serpiente, Aguila } from './clases.js'

const patronazo = (() => {



    return {
        datosJSON: async (especie) => {
            const path = 'animales.json';
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

function imgDinamica() {
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

}

function intaciarClase(tipo, edad, img, comentarios, sound) {
    let animalillo;
    switch (tipo) {
        case "Leon":
            animalillo = new Leon(tipo, edad, img, comentarios, sound)
            break;
        case "Lobo":
            animalillo = new Lobo(tipo, edad, img, comentarios, sound)
            break;

        case "Serpiente":
            animalillo = new Serpiente(tipo, edad, img, comentarios, sound)
            break;

        case "Oso":
            animalillo = new Oso(tipo, edad, img, comentarios, sound)
            break;
        case "Aguila":
            animalillo = new Aguila(tipo, edad, img, comentarios, sound)
            break;
    }
    return animalillo;

}

function camposCompletos() {
    let tipoAnimal = document.getElementById('animal')
    let edadAnimal = document.getElementById('edad')
    let comentario = document.getElementById('comentarios')
    let faltas = []
    if (tipoAnimal.value == "Seleccione un animal") {
        faltas.push('Nombre del animal')
    }
    if (edadAnimal.value == "Seleccione un rango de años") {
        faltas.push('Edad')
    }
    if (comentario.value == "") {
        faltas.push('Comentario')
    }
    if (faltas.length == 0) {
        return false;
    } else {
        return faltas;
    }

}

function restaurarFormulario() {
    document.getElementById('edad').selectedIndex = 0
    document.getElementById('animal').selectedIndex = 0
    document.getElementById('comentarios').value = ""
    let imagen = document.getElementById('preview')
    imagen.innerHTML = ""
    imagen.style.backgroundImage = "url(assets/imgs/lion.svg)";
}

function buscarMetodoSonido(instancia) {
    let metodo;
    switch (instancia.nombre) {
        case "Leon":
            metodo = instancia.rugir
            break;
        case "Lobo":
            metodo = instancia.aullar
            break;

        case "Serpiente":
            metodo = instancia.sisear
            break;

        case "Oso":
            metodo = instancia.grunir
            break;
        case "Aguila":
            metodo = instancia.chillar
            break;
    }
    return metodo;

}


export { patronazo, imgDinamica, intaciarClase, camposCompletos, restaurarFormulario, buscarMetodoSonido };
