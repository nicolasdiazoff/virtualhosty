const fs = require('fs');
const index = require('../index.js');

function projectRead(){
    fs.readFile(index.config.conf_file, 'utf-8', function(err, data){
        if (err == 'ENOENT'){
        	console.log("The project file does not exist ... we will create it");
        	index.createProjectFile();
        }else{
	        var mocha = JSON.parse(data);
	        mocha.projects.forEach(function(element,index,array){
	            console.log(index + " <= " + element.title);
	        });        	
        }
    });
}


function readAllProjectsComplete(){
    fs.readFile(index.config.conf_file, 'utf-8', function(err, data){
        if (err == 'ENOENT'){
            console.log("The project file does not exist ... we will create it");
            index.createProjectFile();
        }else{
            var mocha = JSON.parse(data);
            mocha.projects.forEach(function(element,index,array){
                console.log(index + " <= " + element.title);
                console.log('\t' + "URL:" + element.url);
                console.log('\t' + "FOLDER:" + element.folder);
            });         
        }
    });
}

module.exports.all = projectRead;
module.exports.allComplete = readAllProjectsComplete;