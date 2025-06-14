/*
Autores:
- Juan Ignacio Avverame — 346425
- Ignacio Kapitan — 367560
*/

let sistema;

window.addEventListener("load", inicio);

function inicio() {
    sistema = new Sistema();

    // Mostrar solo la sección de datos al cargar
    document.getElementById("datos").style.display = "block";
    document.getElementById("seccion-estadisticas").style.display = "none";
    resaltarBotonActivo("btn-datos");


    // Alternar secciones usando addEventListener
    let btnDatos = document.getElementById("btn-datos");
    let btnEstadisticas = document.getElementById("btn-estadisticas");
    if (btnDatos && btnEstadisticas) {
        btnDatos.onclick = function() {
            mostrarDatos();
            resaltarBotonActivo("btn-datos");
        };
        btnEstadisticas.onclick = function() {
            mostrarEstadisticas();
            resaltarBotonActivo("btn-estadisticas");
        };
    } else {
        console.log("No se encontraron los botones de sección");
    }

    // Alta de carrera
    let btnAgregarCarrera = document.getElementById("btnagregarcarrera");
    if (btnAgregarCarrera) {
        btnAgregarCarrera.onclick = agregarCarrera;
    }

    // Alta de corredor
    let btnAgregarCorredor = document.getElementById("btnagregarcorredor");
    if (btnAgregarCorredor) {
        btnAgregarCorredor.onclick = agregarCorredor;
    }

    // Alta de patrocinador
    let btnAgregarPatrocinador = document.querySelector('.form-patrocinadores input[type="button"]');
    if (btnAgregarPatrocinador) {
        btnAgregarPatrocinador.onclick = agregarPatrocinador;
    }

    // Evento para inscribir atleta
    let btnInscribir = document.getElementById("btninscribir");
    if (btnInscribir) {
        btnInscribir.onclick = inscribirCorredor;
    }

    // Actualizar combos al inicio
    actualizarCombosCarreras();
    actualizarCombosCorredores();
    actualizarComboPatrocinadores();

    // DATOS DE PRUEBA 
    //let c1 = new Corredor("Maria Gomez", 30, "57033553", "2025-02-22", "comun");
    //let c2 = new Corredor("Juan Perez", 28, "12345678", "2025-03-10", "elite");
    //sistema.listaCorredores.push(c1);
    //sistema.listaCorredores.push(c2);

    //let carrera1 = new Carrera("San Antonio 5k", 3, "2025-01-31", 150);
    //let carrera2 = new Carrera("Ciudad Vieja 10k", 1, "2025-04-15", 200);
    //sistema.listaCarreras.push(carrera1);
    //sistema.listaCarreras.push(carrera2);

    //let pat1 = new Patrocinador("Supermercado Super", "alimenticio");
    //pat1.carreras.push("San Antonio 5k");
    //sistema.listaPatrocinadores.push(pat1);
    //carrera1.patrocinadores.push("Supermercado Super");

    //let inscripto = new Inscripcion(sistema.listaCorredores[0], sistema.listaCarreras[0], 1);
    //sistema.listaInscripciones.push(inscripto);
    //sistema.listaCarreras[0].inscriptos.push(sistema.listaCorredores[0].cedula);

    //actualizarCombosCarreras();
    //actualizarCombosCorredores();
    //actualizarComboPatrocinadores();
    //actualizarCombosInscripciones();
    //actualizarEstadisticas();
}

function mostrarDatos() {
    document.getElementById("datos").style.display = "block";
    document.getElementById("seccion-estadisticas").style.display = "none";
    document.getElementById("mensaje").innerHTML = "";
    document.getElementById("btn-datos").classList.add("activo");
    document.getElementById("btn-estadisticas").classList.remove("activo");
}

function mostrarEstadisticas() {
    document.getElementById("datos").style.display = "none";
    document.getElementById("seccion-estadisticas").style.display = "block";
    document.getElementById("mensaje").innerHTML = "";
    document.getElementById("btn-estadisticas").classList.add("activo");
    document.getElementById("btn-datos").classList.remove("activo");
    actualizarEstadisticas();
}

//es lo mismo que poner alert pero nos parecio mas prolijo
function mostrarMensaje(mensaje) {
  alert(mensaje);
    }

//CARRERAS
function agregarCarrera() {
    let nombre = document.getElementById("nombre-carrera").value.trim();
    let departamento = document.getElementById("departamento").selectedIndex + 1;
    let fecha = document.getElementById("fecha").value;
    let cupo = document.getElementById("cupo").value;
    if (!document.querySelector(".form-carreras").reportValidity()) {
        return;
    }

    
    for (let i = 0; i < sistema.listaCarreras.length; i++) {
        if (sistema.listaCarreras[i].nombre.toLowerCase() === nombre.toLowerCase()) {
            mostrarMensaje("Error: El nombre de la carrera ya existe.");
            return;
        }
    }
     
    

    
    let nuevaCarrera = new Carrera(nombre, departamento, fecha, cupo);
    sistema.listaCarreras.push(nuevaCarrera);
    
    // Ordenar carreras por nombre 
    for (let i = 0; i < sistema.listaCarreras.length - 1; i++) {
        for (let j = i + 1; j < sistema.listaCarreras.length; j++) {
            if (sistema.listaCarreras[i].nombre.toLowerCase() > sistema.listaCarreras[j].nombre.toLowerCase()) {
                let aux = sistema.listaCarreras[i];
                sistema.listaCarreras[i] = sistema.listaCarreras[j];
                sistema.listaCarreras[j] = aux;
            }
        }
    }
    mostrarMensaje("Carrera agregada correctamente.");
    document.getElementById("nombre-carrera").value = "";
    document.getElementById("fecha").value = "";
    document.getElementById("cupo").value = 30;
    actualizarCombosCarreras();
    actualizarComboPatrocinadores(); 
    actualizarCombosInscripciones();
    actualizarEstadisticas();
}

function actualizarCombosCarreras() {
    let combos = [
        document.getElementById("carreras-patrocinador"),
        document.getElementById("idcarreras"),
        document.getElementById("consulta-carrera")
    ];
    for (let i = 0; i < combos.length; i++) {
        let combo = combos[i];
        if (!combo) continue;
        combo.innerHTML = "";
        // Opción por defecto para selects de inscripciones y consulta
        if (combo.id === "idcarreras" || combo.id === "consulta-carrera") {
            let optDefault = document.createElement("option");
            optDefault.value = "";
            optDefault.disabled = true;
            optDefault.selected = true;
            optDefault.text = "Seleccione una carrera";
            combo.appendChild(optDefault);
        }
        for (let j = 0; j < sistema.listaCarreras.length; j++) {
            let carrera = sistema.listaCarreras[j];
            let opt = document.createElement("option");
            opt.value = carrera.nombre;
            opt.text = carrera.nombre + " (" + carrera.fecha + ")";
            combo.appendChild(opt);
        }
    }
}

//CORREDORES
function agregarCorredor() {
    let nombre = document.getElementById("nombre-corredor").value.trim();
    let edad = parseInt(document.getElementById("edad").value);
    let cedula = document.getElementById("cedula").value.trim();
    let fichaMedica = document.getElementById("fichamedica").value;
    let tipo = document.querySelector('input[name="tipo"]:checked').value;
if (!document.querySelector(".form-corredores").reportValidity()) {
        return;
    }
    
    //Validacion la cedula ya esta registrada
    for (let i = 0; i < sistema.listaCorredores.length; i++) {
        if (sistema.listaCorredores[i].cedula === cedula) {
            mostrarMensaje("Error: La cédula ya está registrada.");
            return;
        }
    }
    
    if (tipo !== "elite" && tipo !== "comun") {
        tipo = "comun";
    }

    let nuevoCorredor = new Corredor(nombre, edad, cedula, fichaMedica, tipo);
    sistema.listaCorredores.push(nuevoCorredor);
    // Ordenar corredores por nombre
    for (let i = 0; i < sistema.listaCorredores.length - 1; i++) {
        for (let j = i + 1; j < sistema.listaCorredores.length; j++) {
            if (sistema.listaCorredores[i].nombre.toLowerCase() > sistema.listaCorredores[j].nombre.toLowerCase()) {
                let aux = sistema.listaCorredores[i];
                sistema.listaCorredores[i] = sistema.listaCorredores[j];
                sistema.listaCorredores[j] = aux;
            }
        }
    }
    mostrarMensaje("Corredor agregado correctamente.");
    document.getElementById("nombre-corredor").value = "";
    document.getElementById("edad").value = "";
    document.getElementById("cedula").value = "";
    document.getElementById("fichamedica").value = "";
    actualizarCombosCorredores();
    actualizarCombosInscripciones();
    actualizarEstadisticas();
}

function actualizarCombosCorredores() {
    let combo = document.getElementById("idcorredores");
    if (!combo) return;
    combo.innerHTML = "";
    for (let i = 0; i < sistema.listaCorredores.length; i++) {
        let corredor = sistema.listaCorredores[i];
        let opt = document.createElement("option");
        opt.value = corredor.cedula;
        opt.text = corredor.nombre + " (" + corredor.cedula + ")";
        combo.appendChild(opt);
    }
}

//PATROCINADORES
function agregarPatrocinador() {
    let nombre = document.getElementById("nombre-patrocinador").value.trim();
    let rubro = document.getElementById("rubro").value.toLowerCase();
    let carrerasSelect = document.getElementById("carreras-patrocinador");
    if (!document.querySelector(".form-patrocinadores").reportValidity()) {
        return;
    }
    let carrerasSeleccionadas = [];
    for (let i = 0; i < carrerasSelect.options.length; i++) {
        if (carrerasSelect.options[i].selected) {
            carrerasSeleccionadas.push(carrerasSelect.options[i].value);
        }
    }

    
    
    let mensaje = "";
    let patrocinadorExistente = sistema.buscarPatrocinadorPorNombre(nombre);
    if (patrocinadorExistente !== null) {
        patrocinadorExistente.rubro = rubro;
        patrocinadorExistente.carreras = carrerasSeleccionadas;
        // Actualizar en cada carrera
        for (let i = 0; i < sistema.listaCarreras.length; i++) {
            let carrera = sistema.listaCarreras[i];
         
            let yaEsta = false;
            for (let j = 0; j < carrera.patrocinadores.length; j++) {
                if (carrera.patrocinadores[j] === nombre) {
                    yaEsta = true;
                }
            }
            let seleccionada = false;
            for (let k = 0; k < carrerasSeleccionadas.length; k++) {
                if (carrera.nombre === carrerasSeleccionadas[k]) {
                    seleccionada = true;
                }
            }
            if (seleccionada && !yaEsta) {
                carrera.patrocinadores.push(nombre);
            }
            if (!seleccionada && yaEsta) {
                // Elimina el patrocinador de la lista
                let nuevaLista = [];
                for (let m = 0; m < carrera.patrocinadores.length; m++) {
                    if (carrera.patrocinadores[m] !== nombre) {
                        nuevaLista.push(carrera.patrocinadores[m]);
                    }
                }
                carrera.patrocinadores = nuevaLista;
            }
        }
        mensaje = "Patrocinador actualizado correctamente.";
    } else {
        // Crear y agregar patrocinador
        let nuevoPatrocinador = new Patrocinador(nombre, rubro);
        nuevoPatrocinador.carreras = carrerasSeleccionadas;
        sistema.listaPatrocinadores.push(nuevoPatrocinador);
        // Agregar patrocinador a cada carrera seleccionada
        for (let i = 0; i < sistema.listaCarreras.length; i++) {
            let carrera = sistema.listaCarreras[i];
            for (let j = 0; j < carrerasSeleccionadas.length; j++) {
                if (carrera.nombre === carrerasSeleccionadas[j]) {
                    carrera.patrocinadores.push(nombre);
                }
            }
        }
        mensaje = "Patrocinador agregado correctamente.";
    }
    mostrarMensaje(mensaje);

    document.getElementById("nombre-patrocinador").value = "";
    document.getElementById("rubro").selectedIndex = 0;
    for (let i = 0; i < carrerasSelect.options.length; i++) {
        carrerasSelect.options[i].selected = false;
    }
    actualizarComboPatrocinadores(); // <-- asegúrate de llamar esto aquí también
    actualizarEstadisticas();
}

function actualizarComboPatrocinadores() {
    let combo = document.getElementById("carreras-patrocinador");
    if (!combo) return;
    combo.innerHTML = "";

    for (let i = 0; i < sistema.listaCarreras.length; i++) {
        let carrera = sistema.listaCarreras[i];
        let opt = document.createElement("option");
        opt.value = carrera.nombre;
        opt.text = carrera.nombre + " (" + carrera.fecha + ")";
        combo.appendChild(opt);
    }
}

//INSCRIPCIONES
function inscribirCorredor() {
    let selectCorredores = document.getElementById("idcorredores");
    let selectCarreras = document.getElementById("idcarreras");
    if (!document.querySelector(".form-inscripciones").reportValidity()) {
        return;
    }
    if (!selectCorredores || !selectCarreras) {
        mostrarMensaje("Error interno: No se encuentran los combos de corredores o carreras.");
        return;
    }
    let cedula = selectCorredores.value;
    let nombreCarrera = selectCarreras.value;

    

    // Buscar corredor y carrera correctamente
    let corredor = null;
    for (let i = 0; i < sistema.listaCorredores.length; i++) {
        if (String(sistema.listaCorredores[i].cedula) === String(cedula)) {
            corredor = sistema.listaCorredores[i];
            break;
        }
    }
    let carrera = null;
    for (let i = 0; i < sistema.listaCarreras.length; i++) {
        if (String(sistema.listaCarreras[i].nombre) === String(nombreCarrera)) {
            carrera = sistema.listaCarreras[i];
            break;
        }
    }

    if (!corredor) {
        mostrarMensaje("No se encontró el corredor seleccionado.");
        return;
    }
    if (!carrera) {
        mostrarMensaje("No se encontró la carrera seleccionada.");
        return;
    }
    // Asegurar que inscriptos es un array y que contiene strings
    if (!Array.isArray(carrera.inscriptos)) {
        carrera.inscriptos = [];
    }
    // Convertir todas las cédulas a string para la comparación
    let inscriptosStr = carrera.inscriptos.map(function(ci) { return String(ci); });
    if (inscriptosStr.includes(String(corredor.cedula))) {
        mostrarMensaje("El corredor ya está inscripto en esta carrera.");
        return;
    }
    let fechaFicha = new Date(corredor.fichaMedica);
    let fechaCarrera = new Date(carrera.fecha);
    if (fechaFicha < fechaCarrera) {
        mostrarMensaje("La ficha médica del corredor no está vigente para la fecha de la carrera.");
        return;
    }
    if (carrera.inscriptos.length >= carrera.cupo) {
        mostrarMensaje("No hay cupo disponible en la carrera.");
        return;
    }
    let numero = carrera.inscriptos.length + 1;
    let nuevaInscripcion = new Inscripcion(corredor, carrera, numero);
    sistema.listaInscripciones.push(nuevaInscripcion);
    carrera.inscriptos.push(corredor.cedula);


    let patrocinadoresTxt = (carrera.patrocinadores && carrera.patrocinadores.length > 0)
        ? carrera.patrocinadores.map(function(nombrePat) {
            let pat = null;
            for (let i = 0; i < sistema.listaPatrocinadores.length; i++) {
                if (sistema.listaPatrocinadores[i].nombre === nombrePat) {
                    pat = sistema.listaPatrocinadores[i];
                    break;
                }
            }
            return pat ? pat.nombre + " (" + pat.rubro + ")" : nombrePat;
        }).join(", ")
        : "Ninguno";

    let resumen =
        "\n" +
        "Número: " + numero +
        ", Nombre: " + corredor.nombre +
        ", Edad: " + corredor.edad +
        ", Cédula: " + corredor.cedula +
        ", Ficha Médica: " + corredor.fichaMedica + "\n" +
        (corredor.tipo === "elite" ? "Deportista de élite" : "Deportista común") + "\n" +
        "Carrera: " + carrera.nombre +
        ", Departamento: " + carrera.departamento +
        ", Fecha: " + carrera.fecha +
        ", Cupo: " + carrera.cupo + "\n" +
        patrocinadoresTxt;

    mostrarMensaje(resumen);


    if (typeof generarPDFInscripcion === "function") {
        generarPDFInscripcion({
            numero: numero,
            nombre: corredor.nombre,
            cedula: corredor.cedula,
            fichaMedica: corredor.fichaMedica,
            tipo: corredor.tipo,
            carrera: carrera.nombre,
            fecha: carrera.fecha,
            departamento: carrera.departamento,
            cupo: carrera.cupo,
            patrocinadores: carrera.patrocinadores.map(function(nombrePat) {
                let pat = null;
                for (let i = 0; i < sistema.listaPatrocinadores.length; i++) {
                    if (sistema.listaPatrocinadores[i].nombre === nombrePat) {
                        pat = sistema.listaPatrocinadores[i];
                        break;
                    }
                }
                return pat ? pat.nombre + " (" + pat.rubro + ")" : nombrePat;
            })
        });
    }
    mostrarMensaje("Inscripción realizada correctamente.");
    actualizarEstadisticas();
    if (typeof mostrarInscriptosConsulta === "function") {
        mostrarInscriptosConsulta();
    }
}

function actualizarCombosInscripciones() {
    let comboCorredores = document.getElementById("idcorredores");
    let comboCarreras = document.getElementById("idcarreras");
    if (comboCorredores) {
        comboCorredores.innerHTML = "";
        for (let i = 0; i < sistema.listaCorredores.length; i++) {
            let corredor = sistema.listaCorredores[i];
            let opt = document.createElement("option");
            opt.value = corredor.cedula;
            opt.text = corredor.nombre + " (" + corredor.cedula + ")";
            comboCorredores.appendChild(opt);
        }
    }
    if (comboCarreras) {
        comboCarreras.innerHTML = "";
        for (let i = 0; i < sistema.listaCarreras.length; i++) {
            let carrera = sistema.listaCarreras[i];
            let opt = document.createElement("option");
            opt.value = carrera.nombre;
            opt.text = carrera.nombre + " (" + carrera.fecha + ")";
            comboCarreras.appendChild(opt);
        }
    }
}

//ESTADÍSTICAS
function actualizarEstadisticas() {
    let formEst = document.querySelector(".form-estadisticas");
    if (!formEst) return;

    let ps = formEst.querySelectorAll("p");
    let uls = formEst.querySelectorAll("ul");

    // Promedio de inscriptos por carrera
    let totalInscriptos = 0;
    let totalCarreras = sistema.listaCarreras.length;
    for (let i = 0; i < totalCarreras; i++) {
        totalInscriptos += sistema.listaCarreras[i].inscriptos.length;
    }
    let promedio = "sin datos";
    if (totalCarreras > 0) {
        promedio = totalInscriptos / totalCarreras;
        promedio = promedio.toFixed(2);
    }
    if (ps[0]) ps[0].innerHTML = "Promedio de inscriptos por carrera: " + promedio;

    // Carrera/s con más inscriptos
    let max = 0;
    let carrerasMax = [];
    for (let i = 0; i < sistema.listaCarreras.length; i++) {
        let cant = sistema.listaCarreras[i].inscriptos.length;
        if (cant > max) max = cant;
    }
    for (let i = 0; i < sistema.listaCarreras.length; i++) {
        if (sistema.listaCarreras[i].inscriptos.length === max && max > 0) {
            carrerasMax.push(sistema.listaCarreras[i].nombre);
        }
    }
    if (ps[1]) ps[1].innerHTML = "Carrera/s con más inscriptos:";
    if (uls[0]) {
        uls[0].innerHTML = "";
        if (carrerasMax.length === 0) {
            let li = document.createElement("li");
            li.innerHTML = "sin datos";
            uls[0].appendChild(li);
        } else {
            for (let i = 0; i < carrerasMax.length; i++) {
                let li = document.createElement("li");
                li.innerHTML = carrerasMax[i];
                uls[0].appendChild(li);
            }
        }
    }

    // Carreras sin inscriptos ordenadas por fecha
    let carrerasSin = [];
    for (let i = 0; i < sistema.listaCarreras.length; i++) {
        if (sistema.listaCarreras[i].inscriptos.length === 0) {
            carrerasSin.push(sistema.listaCarreras[i]);
        }
    }
    for (let i = 0; i < carrerasSin.length - 1; i++) {
        for (let j = i + 1; j < carrerasSin.length; j++) {
            if (carrerasSin[i].fecha > carrerasSin[j].fecha) {
                let aux = carrerasSin[i];
                carrerasSin[i] = carrerasSin[j];
                carrerasSin[j] = aux;
            }
        }
    }
    if (ps[2]) ps[2].innerHTML = "Carreras sin inscriptos ordenadas por fecha:";
    if (uls[1]) {
        uls[1].innerHTML = "";
        if (carrerasSin.length === 0) {
            let li = document.createElement("li");
            li.innerHTML = "sin datos";
            uls[1].appendChild(li);
        } else {
            for (let i = 0; i < carrerasSin.length; i++) {
                let li = document.createElement("li");
                li.innerHTML = carrerasSin[i].nombre + " (" + carrerasSin[i].fecha + ")";
                uls[1].appendChild(li);
            }
        }
    }

    // Porcentaje de corredores de élite
    let totalCorredores = sistema.listaCorredores.length;
    let elite = 0;
    for (let i = 0; i < totalCorredores; i++) {
        if (sistema.listaCorredores[i].tipo === "elite") elite++;
    }
    let porcentaje = "sin datos";
    if (totalCorredores > 0) {
        porcentaje = ((elite / totalCorredores) * 100).toFixed(2) + "%";
    }
    if (ps[4]) {
        ps[4].innerHTML = "Porcentaje de corredores de élite: " + porcentaje;
    } else if (ps[3]) {
        ps[3].innerHTML = "Porcentaje de corredores de élite: " + porcentaje;
    }
}

//BOTÓN ACTIVO
function resaltarBotonActivo(idActivo) {
    let btnDatos = document.getElementById("btn-datos");
    let btnEstadisticas = document.getElementById("btn-estadisticas");
    if (btnDatos && btnEstadisticas) {
        btnDatos.classList.remove("activo");
        btnEstadisticas.classList.remove("activo");
        if (idActivo === "btn-datos") {
            btnDatos.classList.add("activo");
        } else {
            btnEstadisticas.classList.add("activo");
        }
    }
}

//PDF
function generarPDFInscripcion(datos) {

    let jsPDF = window.jspdf && window.jspdf.jsPDF ? window.jspdf.jsPDF : window.jsPDF;
    if (!jsPDF) {
        alert("No se pudo generar el PDF porque jsPDF no está cargado.");
        return;
    }
    let doc = new jsPDF();
    let y = 10;
    doc.setFontSize(14);
    doc.text("Datos de Inscripción", 10, y);
    y += 10;
    doc.setFontSize(12);
    doc.text("Número: " + datos.numero, 10, y); y += 8;
    doc.text("Nombre: " + datos.nombre, 10, y); y += 8;
    doc.text("CI: " + datos.cedula, 10, y); y += 8;
    doc.text("Ficha Médica: " + datos.fichaMedica, 10, y); y += 8;
    doc.text("Tipo de corredor: " + (datos.tipo === "elite" ? "Deportista de élite" : "Deportista común"), 10, y); y += 8;
    doc.text("Carrera: " + datos.carrera + " (" + datos.fecha + ") - Departamento: " + datos.departamento, 10, y); y += 8;
    doc.text("Cupo: " + datos.cupo, 10, y); y += 8;
    let patrocinadoresTxt = (datos.patrocinadores && datos.patrocinadores.length > 0)
        ? datos.patrocinadores.join(", ")
        : "Ninguno";
    doc.text("Patrocinador/es: " + patrocinadoresTxt, 10, y); y += 8;
    doc.save("inscripcion_" + datos.cedula + "_" + datos.carrera.replace(/\s/g, "_") + ".pdf");
}

//CONSULTA INSCRIPTOS
function mostrarInscriptosConsulta() {
    let selectCarrera = document.getElementById("consulta-carrera");
    let tbody = document.querySelector(".form-consultas tbody");
    if (!selectCarrera || !tbody) return;

    let carreraNombre = selectCarrera.value;
    let carrera = null;
    for (let i = 0; i < sistema.listaCarreras.length; i++) {
        if (sistema.listaCarreras[i].nombre === carreraNombre) {
            carrera = sistema.listaCarreras[i];
            break;
        }
    }
    tbody.innerHTML = "";
    if (!carrera || !Array.isArray(carrera.inscriptos) || carrera.inscriptos.length === 0) {
        let tr = document.createElement("tr");
        let td = document.createElement("td");
        td.colSpan = 5;
        td.innerText = "Sin inscriptos";
        tr.appendChild(td);
        tbody.appendChild(tr);
        return;
    }

    // Buscar inscripciones de la carrera seleccionada
    let inscripciones = [];
    for (let i = 0; i < sistema.listaInscripciones.length; i++) {
        let insc = sistema.listaInscripciones[i];
        if (
            insc.carrera &&
            insc.carrera.nombre === carrera.nombre
        ) {
            inscripciones.push(insc);
        }
    }

    // Ordenar por nombre o número según radio seleccionado
    let orden = document.querySelector('.form-consultas input[name="ordenar"]:checked');
    if (orden && orden.value === "nombre") {
        inscripciones.sort(function(a, b) {
            return a.corredor.nombre.localeCompare(b.corredor.nombre);
        });
    } else {
        inscripciones.sort(function(a, b) {
            return a.numero - b.numero;
        });
    }

    for (let i = 0; i < inscripciones.length; i++) {
        let insc = inscripciones[i];
        let tr = document.createElement("tr");
        if (insc.corredor.tipo === "elite") {
            tr.className = "resaltado-rojo";
        } else {
            tr.style.backgroundColor = "#98FB98";
        }
        let tdNombre = document.createElement("td");
        tdNombre.innerText = insc.corredor.nombre;
        let tdEdad = document.createElement("td");
        tdEdad.innerText = insc.corredor.edad;
        let tdCedula = document.createElement("td");
        tdCedula.innerText = insc.corredor.cedula;
        let tdFicha = document.createElement("td");
        tdFicha.innerText = insc.corredor.fichaMedica;
        let tdNumero = document.createElement("td");
        tdNumero.innerText = insc.numero;
        tr.appendChild(tdNombre);
        tr.appendChild(tdEdad);
        tr.appendChild(tdCedula);
        tr.appendChild(tdFicha);
        tr.appendChild(tdNumero);
        tbody.appendChild(tr);
    }
}

// Asegúrate de que este evento esté en el archivo:
document.addEventListener("DOMContentLoaded", function() {
    let selectCarrera = document.getElementById("consulta-carrera");
    let radios = document.querySelectorAll('.form-consultas input[name="ordenar"]');
    if (selectCarrera) {
        selectCarrera.addEventListener("change", mostrarInscriptosConsulta);
    }
    for (let i = 0; i < radios.length; i++) {
        radios[i].addEventListener("change", mostrarInscriptosConsulta);
    }
});
