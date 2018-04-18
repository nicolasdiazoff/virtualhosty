const fs = require('fs');
const config = require('../config.json');

function createProject() {

	// formato para crear un proyecto // -c name[optional] url folder
	// if the project not have a name , the program use the url same name

	// task and conditions
	//- condicion para saber si existe el nombre con la cantidad de parametros
	// crear direcciones si no existen
	var ans = process.argv;

	console.log(ans.length);

	if (ans.length <= 3){
		console.log("You need more to create a virtual server for example:");		
		console.log("The name is " , ans[3]);
		console.log("The local url is " , ans[4]);
		console.log("The folder is " , ans[5]);
	}
	else if (ans.length <= 4){
		console.log("You need more to create a virtual server for example:");		
		console.log("The local url is " , ans[4]);
		console.log("The folder is " , ans[5]);
	}	
	else if (ans.length <= 5){
		console.log("You need more to create a virtual server for example:");
		console.log("The folder is " , ans[5]);
	}

}

module.exports.new = createProject;
