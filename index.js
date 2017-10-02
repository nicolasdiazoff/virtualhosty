#!/usr/bin/env node

var create = require('./controllers/create.js'),
	destroy = require('./controllers/delete.js'),
	read = require('./controllers/read.js'),
	inquirer = require("inquirer");


var checkbox = {
	type: "list",
	name: "opciones",
	message: "Que quieres hacer?",
	choices: [
		"Abrir",
		"Crear",
		"Editar",
		"Eliminar",
		new inquirer.Separator(),
		"Semilla",
		"Configuraciones",
		"Salir",
	]
}

inquirer.prompt(checkbox).then(function(answers){
	//console.log(answers.opciones);
	var ans = answers.opciones;
	switch(answers.opciones){
		case checkbox.choices[0]:
			read.all();
			break;
		case checkbox.choices[1]:	
			create.new();		
			break;
	}

});

