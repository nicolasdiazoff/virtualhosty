const fs = require('fs');
const index = require('../index.js');

function projectRead(){
    console.log(index);
    fs.readFile(index.config.htdocs_directory + index.config.conf_file, 'utf-8', function(err, data){
        if (err == 'ENOENT'){
        	console.log("The project file does not exist ... we will create it");
        	index.createProjectFile();
        }else{
	        var mocha = JSON.parse(data);
	        mocha.projects.forEach(function(element,index,array){
	            console.log(element.title);
	            console.log('\t' + "URL:" + element.url);
	            console.log('\t' + "FOLDER:" + element.folder);
	        });        	
        }
    });
}

module.exports.all = projectRead;