/*
Autores:
- Juan Ignacio Avverame — 346425
- Ignacio Kapitan — 367560
*/

class Sistema {
    constructor() {
        // Es un array vacío, pero cuando agregás carreras, se agregan objetos de la clase Carrera
        this.listaCarreras = [];
        this.listaCorredores = [];
        this.listaInscripciones = [];
        this.listaPatrocinadores = [];
    }

    agregarCarrera(unaCarrera) {
        this.listaCarreras.push(unaCarrera);
    }

    agregarCorredor(unCorredor) {
        this.listaCorredores.push(unCorredor);
    }

    agregarInscripcion(unaInscripcion) {
        this.listaInscripciones.push(unaInscripcion);
    }

    agregarPatrocinador(unPatrocinador) {
        this.listaPatrocinadores.push(unPatrocinador);
    }

    // Métodos para buscar por nombre o cédula
    buscarCarreraPorNombre(nombre) {
        for (let i = 0; i < this.listaCarreras.length; i++) {
            if (this.listaCarreras[i].nombre.toLowerCase() === nombre.toLowerCase()) {
                return this.listaCarreras[i];
            }
        }
        return null;
    }

    buscarCorredorPorCedula(cedula) {
        for (let i = 0; i < this.listaCorredores.length; i++) {
            if (this.listaCorredores[i].cedula === cedula) {
                return this.listaCorredores[i];
            }
        }
        return null;
    }

    buscarPatrocinadorPorNombre(nombre) {
        for (let i = 0; i < this.listaPatrocinadores.length; i++) {
            if (this.listaPatrocinadores[i].nombre.toLowerCase() === nombre.toLowerCase()) {
                return this.listaPatrocinadores[i];
            }
        }
        return null;
    }
}

class Carrera {
    constructor(nombre, departamento, fecha, cupo) {
        this.nombre = nombre;
        this.departamento = departamento;
        this.fecha = fecha;
        this.cupo = cupo;
        this.inscriptos = []; // array de cédulas de corredores
        this.patrocinadores = []; // array de nombres de patrocinadores
    }
    toString() {
        return this.nombre + " (" + this.departamento + ") " + this.fecha + " Cupo:" + this.cupo;
    }
}

class Corredor {
    constructor(nombre, edad, cedula, fichaMedica, tipo) {
        this.nombre = nombre;
        this.edad = edad;
        this.cedula = cedula;
        this.fichaMedica = fichaMedica;
        this.tipo = tipo; // "elite" o "comun"
    }
    toString() {
        return this.nombre + " " + this.edad + " años, CI:" + this.cedula + ", Ficha Médica: " + this.fichaMedica + ", " + (this.tipo === "elite" ? "Deportista de élite" : "Deportista común");
    }
}

class Inscripcion {
    constructor(corredor, carrera, numero) {
        this.corredor = corredor; // objeto Corredor
        this.carrera = carrera;   // objeto Carrera
        this.numero = numero;     // número de inscripción
    }
    toString() {
        return "Número: " + this.numero + ", " + this.corredor.toString() + ", Carrera: " + this.carrera.toString();
    }
}

class Patrocinador {
    constructor(nombre, rubro) {
        this.nombre = nombre;
        this.rubro = rubro;
        this.carreras = []; // array de nombres de carreras que apoya
    }
    toString() {
        return this.nombre + " (" + this.rubro + ")";
    }
}

// Ejemplo de uso (esto ocurre en tu funciones.js):
// let nuevaCarrera = new Carrera("San Antonio 5k", 3, "2025-01-31", 150);
// sistema.listaCarreras.push(nuevaCarrera);

// Después de esto, sistema.listaCarreras[0] es un objeto de la clase Carrera.
// Podés comprobarlo así:
console.log(sistema.listaCarreras[0] instanceof Carrera); // Devuelve true si es un objeto Carrera

// Cuando agregás una carrera, hacés:
// let nuevaCarrera = new Carrera(nombre, departamento, fecha, cupo);
// sistema.listaCarreras.push(nuevaCarrera);

// Por lo tanto, cada elemento de sistema.listaCarreras es una instancia de la clase Carrera.
// Si hacés sistema.listaCarreras[0], accedés a un objeto Carrera y podés usar sus propiedades y métodos.