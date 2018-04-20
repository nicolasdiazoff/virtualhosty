const fs = require('fs');
const config = require('../config.json');
const update = require('./update.js');

var project = {
	"title" : "",
	"url" : "",
	"folder": ""
}

//validator of a url
function correctUrl(url) {
	var element;
	// we eliminate the prefix so that the url is compatible with the requested apache format
	if(url.indexOf("https://") > -1 || url.indexOf("http://") > -1){	
		console.log("If you include https: // or http: // in the url it will be automatically deleted");	
		if (url.indexOf("https://") > -1) {
			var url = url.replace("https://", "");
		}
		if (url.indexOf("http://") > -1) {
			var url = url.replace("http://", "");
		}
	}
	// add the suffix .dev so that the url is friendly in development
	if(url.slice(-4) != ".dev") {
		console.log("If you do not include .dev in the url it is automatically added");
		element = url + ".dev";
	}else{
		element = url;
	}
	project.url = element;
}

//comprueba si la url esta en el registro
function checkUrlPathExists() {
	for (var i = 0; i < config.projects.length; i++){
		if (config.projects[i].url == project.url) return i;
	}
}

//comprueba si la url de la carpeta esta en el registro
function checkFolderPathExists(path) {
	for(var i = 0; i < config.projects.length; i++) {
		if (config.projects[i].folder == config.settings.xampp_files_directory + path ) return i;
	}
}

// If the directory does not exist and is not registered, it is created
function existenceFolder(path){

	fs.lstat(config.settings.xampp_files_directory + path, function(notexists, exists){
		if(notexists){
			fs.mkdir(config.settings.xampp_files_directory + path, function(err,data){
				if (err) throw err;
				console.log("El directorio fue creado con exito")
			});
		}
		else {
	    	console.log("There is a directory, do you want to update the project information?");
		}
	});

	if(fs.existsSync(config.settings.xampp_files_directory + path)){
		project.folder = config.settings.xampp_files_directory + path;
	}

}

function checkout(argument) {
	// body...
	// formato para crear un proyecto // -c name[optional] url folder
	var ans = process.argv;
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

	project.title = ans[3];
	project.folder = config.settings.xampp_files_directory + ans[5];

	correctUrl(ans[4]);
	var checkedUrl = checkUrlPathExists();
	var checkedFolder = checkFolderPathExists(ans[5]);

	if (checkedUrl > -1) {
		console.log("There is a project with the same url");		
	}
	else{
		console.log("La url esta disponible");
		if(checkedFolder > -1) {
			console.log("There is a project with the same path folder");					
		}
		else{
			console.log("La url del directorio esta disponible");
			existenceFolder(ans[5]);
		}
	}
}

function createProject() {

	checkout(function() {
		fs.readFile(config.settings.conf_file, 'utf-8', function(err, data){
			if (err) throw err;
			var mocha = JSON.parse(data);
			mocha.projects.push(project);
			fs.writeFileSync(config.settings.conf_file, JSON.stringify(mocha), 'utf-8');
			update.all();
		});
	});

}

module.exports.new = createProject;
