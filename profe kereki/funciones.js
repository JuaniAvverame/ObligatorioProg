window.addEventListener("load",inicio);
let ultimoEstilo= 0;


let sistema = new Sistema();
// Datos de Prueba
let e1= new Empresa("DesarrollosFull SA", "18 de Julio 1234",1111);
let e2= new Empresa("ProgCity Ltd", "Yaguaron 2222", 4444);

let f1 = new Funcion("Programador", "Programar y testing basico", 1);
let f2 = new Funcion("Arquitecto", "Disena la solucion", 2);
let f3 = new Funcion("Jefe", "controla el desarrollo", 2);
let f4 = new Funcion("Secretaria", "administracion", 1);
let f5 = new Funcion("CEO", "dirige toda el area ", 5);

let p1 = new Puesto(e1, f1, "Programador de Java", 5100);
let p2 = new Puesto(e1, f2, "Arquitecto especializado", 4400);
let p3 = new Puesto(e2, f3, "Jefe de proyecto", 500);
let p4 = new Puesto(e1, f1, "Programacion de C++", 8100);
let p5 = new Puesto(e2, f4, "Secretaria bilingue", 3100);
let p6 = new Puesto(e1, f1, "Programador web", 400);
let p7 = new Puesto(e1, f5, "CEO general", 8700);

sistema.agregarEmpresa(e1);
sistema.agregarEmpresa(e2);

sistema.agregarFuncion(f1);
sistema.agregarFuncion(f2);
sistema.agregarFuncion(f3);
sistema.agregarFuncion(f4);
sistema.agregarFuncion(f5);

sistema.agregarPuesto(p1);
sistema.agregarPuesto(p2);
sistema.agregarPuesto(p3);
sistema.agregarPuesto(p4);
sistema.agregarPuesto(p5);
sistema.agregarPuesto(p6);
sistema.agregarPuesto(p7);




function inicio(){
	//document.getElementById("idCambiarEstilo").addEventListener("click", cambiarEstilo);
	
	document.getElementById("idBotonE").addEventListener("click", agregarEmpresa);
	document.getElementById("idBotonF").addEventListener("click", agregarFuncion);
	document.getElementById("idBotonP").addEventListener("click", agregarPuesto);
	document.getElementById("idBotonTipoMayor").addEventListener("click",calcularTipoMas);
	document.getElementById("idBotonConsultarPromedio").addEventListener("click", consultarPromedio);
	document.getElementById("idBotonListadoPuestos").addEventListener("click", cargarTabla);
	cargar();
}
function cambiarEstilo(){
    let miEstilo=document.getElementById("idEstilo");
    if (ultimoEstilo%2==0){
        miEstilo.href="css/consultora4.css";
	}
	else{
        miEstilo.href="css/consultora10.css";
	}
	ultimoEstilo++;
}

function calcularTipoMas(){
	let par = document.getElementById("idTipoMasSolicitado");
	let resul = sistema.tipoMasSolicitado();
	if (resul ==0){
		resul = "sin datos";
	}
	par.innerHTML= resul;
}

function limpiar(){
	document.getElementById("idFormularioEmpresa").reset();
	document.getElementById("idFormularioFunciones").reset();
	document.getElementById("idFormularioPuestos").reset();
	document.getElementById("idTipoMasSolicitado").innerHTML="";
	document.getElementById("idSueldoPromedio").innerHTML= "";
	document.getElementById("idTablaPuestos").innerHTML="";
	
	cargar();
}

function cargar(){
	// carga las listas
	cargarLista("idListaF", sistema.listaFunciones);
	cargarLista("idListaE", sistema.listaEmpresas);
	// cargo idCombos
	cargarComboEmpresas();
	cargarComboFunciones();
}


function consultarPromedio(){
	let indiceF= document.getElementById("idComboFuncionesConsulta").selectedIndex;
	let funcion = sistema.darFuncionIndice(indiceF);
	let resp = sistema.promedioFuncion(funcion);
	document.getElementById("idSueldoPromedio").innerHTML= resp;
}

function agregarEmpresa(){
	if (document.getElementById("idFormularioEmpresa").reportValidity()){
		let nombre = document.getElementById("idTxtNombreE").value;
		let direccion = document.getElementById("idTxtDireccion").value;
		let rut = document.getElementById("idTxtRUT").value;
		sistema.agregarEmpresa(new Empresa(nombre, direccion, rut));
		limpiar();
	}
}
function agregarFuncion(){
	if (document.getElementById("idFormularioFunciones").reportValidity()){
		let nombre = document.getElementById("idTxtNombreF").value;
		let descripcion = document.getElementById("idTxtDescripcion").value;
		let tipo = document.getElementById("idTxtTipo").value;
		sistema.agregarFuncion(new Funcion(nombre, descripcion, tipo));
		limpiar();
	}
}

function agregarPuesto(){
	if (document.getElementById("idFormularioPuestos").reportValidity()){
		
		let indiceE= document.getElementById("idComboEmpresas").selectedIndex;
		let indiceF= document.getElementById("idComboFuncionesPuesto").selectedIndex;
		
		let detalle = document.getElementById("idTxtDetalle").value;
		let sueldo = parseInt(document.getElementById("idTxtSueldo").value);
		let empresa = sistema.darEmpresaIndice(indiceE);
		let funcion = sistema.darFuncionIndice(indiceF);
		sistema.agregarPuesto(new Puesto(empresa, funcion, detalle, sueldo));
		limpiar();
		
	}
}


function cargarLista(elemento, datos){
	let lista = document.getElementById(elemento);
	lista.innerHTML="";
	for (elemento of datos){
		let x = document.createElement("LI");
		let nodo = document.createTextNode(elemento);
		x.appendChild(nodo);
		lista.appendChild(x);
	}
}

function cargarTabla(){
	let tablita = document.getElementById("idTablaPuestos");
	tablita.innerHTML="";
	let datos= sistema.ordenar();
	if (datos.length==0){
		tablita.innerHTML = "Sin datos";
	}
	else {
		//  encabezado
		let h = tablita.createTHead();
		let r = h.insertRow();
		let c = r.insertCell();
		c.innerHTML="Puestos";
		// datos
		for (elemento of datos){
			let fila = tablita.insertRow();
			let celda = fila.insertCell();
			celda.innerHTML=elemento;
			
			
		}}
}

function cargarComboFunciones(){
	cargarCombo(sistema.listaFunciones, "idComboFuncionesPuesto");
	cargarCombo(sistema.listaFunciones,"idComboFuncionesConsulta");
}
function cargarComboEmpresas(){
	cargarCombo(sistema.listaEmpresas, "idComboEmpresas");
}

function cargarCombo(lista, elem){
	let combito = document.getElementById(elem);
	combito.innerHTML="";
	for (let i = 0; i < lista.length; i++){
		let nodoC = document.createElement("option");
		let nodoTextoC = document.createTextNode(lista[i]);
		nodoC.appendChild(nodoTextoC);
		combito.appendChild(nodoC);
	}
}
