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

export { patronazo, imgDinamica, intaciarClase };
