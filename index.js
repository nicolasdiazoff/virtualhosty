#!/usr/bin/env node

const create = require('./controllers/create.js');

// process.argv.forEach(function (val, index, array) {
//   console.log(index + ': ' + val);
// });

var ans = process.argv;

switch(ans[2]){
	case "create":
		create.new();
		break;
	case "-c":
		create.new();
		break;
	case "-update":
		create.new();
		break;
	case "-u":
		create.new();
		break;
	case "new":
		console.log("Crear", ans[0]);
		break;
	case "edit":
		console.log("Editar", ans[1]);
		break;
	case "read":
		console.log("Leer", ans[1]);
		break;
	case "delete":
		console.log("Eliminar", ans[1]);
		break;
	default:
		console.log("No hay parametros");
		break;
}

