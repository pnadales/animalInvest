class Animal {
    static _nextId = 1;
    constructor(nombre, edad, img, comentarios, sonido) {
        this._id = Animal._nextId++;
        this._nombre = nombre;
        this._edad = edad;
        this._img = img;
        this._comentarios = comentarios;
        this._sonido = sonido;
    }
    get id() {
        return this._id;
    }
    get nombre() {
        return this._nombre;
    }
    get edad() {
        return this._edad;
    }
    get img() {
        return this._img;
    }
    get comentarios() {
        return this._comentarios;
    }
    get sonido() {
        return this._sonido;
    }

}

class Leon extends Animal {
    rugir() {

    }
}
class Lobo extends Animal {
    aullar() {

    }
}
class Oso extends Animal {
    gruñir() {

    }
}
class Serpiente extends Animal {
    sisear() {

    }
}
class Aguila extends Animal {
    chillar() {

    }
}

export { Leon, Lobo, Oso, Serpiente, Aguila };