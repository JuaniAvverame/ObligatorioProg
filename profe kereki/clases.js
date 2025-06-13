class Empresa {
	
	constructor(nombre,direccion,rut) {
		
		this.nombre=nombre;
		this.direccion= direccion;
		this.rut=rut;
	}
	toString(){
		return this.nombre +" en: "+ this.direccion+ " RUT: "+ this.rut  ;
	}
}

class Funcion {
	constructor(nombre,descripcion,tipo) {
		this.nombre=nombre;
		this.descripcion= descripcion;
		this.tipo=tipo;
	}
	toString(){
		return this.nombre +" "+ this.descripcion+ " tipo: "+ this.tipo  ;
	}
}

class Puesto{
	constructor(empresa, funcion, detalle, sueldo){
		this.empresa=empresa;
		this.funcion= funcion;
		this.detalle= detalle;
		this.sueldo=sueldo;
	}
	toString(){
		return this.empresa +"\n "+ this.funcion + "\n "+ this.detalle+ "\n " + this.sueldo  ;
	}
	compararCon(otro){
		return otro.sueldo- this.sueldo;
	}
}	
class Sistema {
	constructor(){
		this.listaEmpresas=[];
		this.listaFunciones=[];
		this.listaPuestos=[];
	}
	agregarEmpresa(unElemento){
		this.listaEmpresas.push(unElemento);
	}
	agregarFuncion(unElemento){
		this.listaFunciones.push(unElemento);
	}
	agregarPuesto(unElemento){
		this.listaPuestos.push(unElemento);
	}
	darEmpresaIndice(unIndice){
		return this.listaEmpresas[unIndice];
	}
	darFuncionIndice(unIndice){
		return this.listaFunciones[unIndice];
	}
	toString(){
		return "Empresas " + this.listaEmpresas + "funciones " + this.listaFunciones+ " Puestos " + this.listaPuestos;
	}
	ordenar(){   
		this.listaPuestos.sort(function(a,b){return a.compararCon(b)});
		return this.listaPuestos;
	}
	promedioFuncion(unaFuncion){
		let suma = 0;
		let cant = 0;
		for (let elem of this.listaPuestos){
			if(elem.funcion==unaFuncion){
				suma += elem.sueldo;
				cant++;
			}
		}
		let retorno ="Sin datos";
		if (cant>0){ 
			retorno = suma/cant;
			retorno = retorno.toFixed(2);
		}
		

		return retorno
	}
	
	tipoMasSolicitado(){
		let tot = [];
		for (let i = 0;	 i <=5; i++){
			tot[i]=0;
		}
		for (let elem of this.listaPuestos){
			let tipo= elem.funcion.tipo;
			tot[tipo]++;
		}
		let max = 0;
		let posMax = 0;
		for (let i = 1; i <=5;i++){
			if (tot[i]>max){
				max = tot[i];
				posMax= i;
			}
		}
		return posMax;
	}
	totalPorTipo(){
		let tot = [];
		for (let i = 1;	 i <=6; i++){
			tot[i]=0;
		}
		
		for (let elem of this.listaPuestos){
			let tipo= elem.funcion.tipo;
			tot[tipo]++;
		}
		return tot;
	}
	empresasSinPuestos(){
		let lista = [];
		for (let elemE of this.listaEmpresas){
			// por cada empresa reviso si tiene puestos
			let tiene = false;
			for (let elemP of this.listaPuestos){
				if (elemP.empresa == elemE){
					// la empresa tiene un puesto
					tiene = true;
				}
			}
			if (!tiene){
				lista.push(elemE);
			}
		}
		return lista;
	}
	
	rangoSueldos(){
		let valorMax = Number.MIN_SAFE_INTEGER;
		let valorMin = Number.MAX_SAFE_INTEGER;
		for (let elemS of this.listaPuestos){
			let suel = elemS.sueldo;
			if (suel>= valorMax){
				valorMax = suel;
			}
			if (suel <= valorMin){
				valorMin = suel;
			}
		}
		return valorMax-valorMin;
	}
	
	empresasConPuestosTodosTipos(){
		let emp = [];
		for (let elemE of this.listaEmpresas){
			// por cada empresa, defino lista nueva
			let lista = [];
			for (let elemP of this.listaPuestos){
				if (elemP.empresa == elemE){
					let tipo = elemP.funcion.tipo;
					if (!lista.includes(tipo)){
						lista.push(tipo);
					}
				}
			}
			if (lista.length==5){
					emp.push(elemE);
			}
		}
		return emp;
	}
	
	puestosPorTipoDeEmpresa (emp){
		let res = [];
		for (let i = 0; i <=4; i++){
			res.push(0);
		}
		for (let elemP of this.listaPuestos){
			if (elemP.empresa == emp){
					let tipo = elemP.funcion.tipo;
					res[tipo-1]++;
			}
		}
		return res;
	}
}


