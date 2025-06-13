/*
Autores:
- Juan Ignacio Avverame — 346425
- Ignacio Kapitan — 367560
*/

class Sistema {
    constructor() {
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
        this.inscriptos = [];
        this.patrocinadores = [];
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
        this.tipo = tipo;
    }
    toString() {
        return this.nombre + " " + this.edad + " años, CI:" + this.cedula + ", Ficha Médica: " + this.fichaMedica + ", " + (this.tipo === "elite" ? "Deportista de élite" : "Deportista común");
    }
}

class Inscripcion {
    constructor(corredor, carrera, numero) {
        this.corredor = corredor;
        this.carrera = carrera;
        this.numero = numero;
    }
    toString() {
        return "Número: " + this.numero + ", " + this.corredor.toString() + ", Carrera: " + this.carrera.toString();
    }
}

class Patrocinador {
    constructor(nombre, rubro) {
        this.nombre = nombre;
        this.rubro = rubro;
        this.carreras = [];
    }
    toString() {
        return this.nombre + " (" + this.rubro + ")";
    }
}