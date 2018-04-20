const fs = require('fs');
const config = require('../config.json');

function projectDestroy(){
	
    var ans = process.argv;

    var valor = ans[3];

    if (valor == null || valor.length == 0 || /^\s+$/.test(valor)){
        console.log("Escoge el numero del proyecto que deseas eliminar");       
		fs.readFile(config.settings.conf_file, 'utf-8', function(err, data){
			if (err) throw err;
			var mocha = JSON.parse(data);
	
	        mocha.projects.forEach(function(element,index,array) {
	            console.log(index + " <- " + element.title);
	        });	

		});
    }

    else if (ans.length <= 4 && valor == null || valor.length == 0 || /^\s+$/.test(valor)){
    	if (isNaN(ans[4])) {}
		fs.readFile(config.settings.conf_file, 'utf-8', function(err, data){
			if (err) throw err;
			var mocha = JSON.parse(data);

            mocha.projects.splice(ans[4], 1);

	        console.log("Eliminaste el proyecto ", mocha.projects[ans[3]].folder);
			
			fs.writeFileSync(config.settings.conf_file, JSON.stringify(mocha), 'utf-8');
			// update.all();
	        mocha.projects.forEach(function(element,index,array) {
	            console.log(index + " " + element.title);
	        });	

		});
    }
	
}

module.exports.vhost = projectDestroy;
