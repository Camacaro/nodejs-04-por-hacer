const fileSystem = require('fs');

let listadoPorHacer = [];

const guardarDB = () => {

	let data = JSON.stringify(listadoPorHacer);

	fileSystem.writeFile(`db/data.json`, data, (err) => {
		if(err){
			throw new Error('no se pudo grabar', err)
		}
	});

}

const cargarDB = () => {

	try{
		listadoPorHacer = require('../db/data.json');
	} catch (error) {
		listadoPorHacer = [];
	}
}

const crear = (descripcion) => {
	
	cargarDB();

	let porHacer = {
		descripcion,
		completado:false
	};

	listadoPorHacer.push( porHacer );

	guardarDB();

	return porHacer;	
}

const getListado = () => {
	
	cargarDB();
	return listadoPorHacer;
}

//completado=true ya viene por defecto en command
const actualizar = (descripcion, completado=true) => {
	cargarDB();
	//.findIndex es una funcion que recorre el arreglo y me retorna la posicion de ese index
	//si no lo encuentra me regresa un -1
	let index = listadoPorHacer.findIndex( tarea => {
		return tarea.descripcion === descripcion;
	} );

	if ( index >= 0 ) {
		listadoPorHacer[index].completado = completado;
		guardarDB();
		return true;
	} else {
		return false;
	}
}

const borrar = (descripcion) => {

	cargarDB();

	let nuvoListado = listadoPorHacer.filter( tarea => {
		return tarea.descripcion !== descripcion
	});

	if (nuvoListado.length === listadoPorHacer.length) {
		return false;
	} else {
		listadoPorHacer = nuvoListado;
		guardarDB();
		return true;
	}

	/*Borrar de una forma (buscar como borrar con splice)
	let index = listadoPorHacer.findIndex( tarea => {
		return tarea.descripcion === descripcion;
	});

	if ( index >= 0 ) {
		listadoPorHacer.splice()
		return true;
	} else {
		return false;
	}*/
}

module.exports = {
	crear,
	getListado,
	actualizar,
	borrar
}
