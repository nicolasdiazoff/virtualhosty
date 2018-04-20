const fs = require('fs');
const config = require('../config.json');
const update = require('./update.js');

var project = {
	"title" : "",
	"url" : "",
	"folder": ""
}

var ans = process.argv;

var parameterName = ans[3];
var parameterUrl = ans[4];
var parameterFolder = ans[5];

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

//check if the url is in the registry
function checkUrlPathExists() {
	for (var i = 0; i < config.projects.length; i++){
		if (config.projects[i].url == project.url) return i;
	}
}

//check if the url of the folder is in the registry
function checkFolderPathExists(path) {
	for(var i = 0; i < config.projects.length; i++) {
		if (config.projects[i].folder == config.settings.xampp_files_directory + path ) return i;
	}
}

// If the directory does not exist and is not registered, it is created
function ifDoesNotExistCreateFolder(path){

	fs.lstat(config.settings.xampp_files_directory + path, function(notexists, exists){
		if(notexists){
			fs.mkdir(config.settings.xampp_files_directory + path, function(err,data){
				if (err) throw err;
				console.log("The directory was created automatically")
			});
		}
	});

}

function checkout() {
	
	if (ans.length <= 3){
		var valor = parameterName;
		if(valor == null || valor.length == 0 || /^\s+$/.test(valor)){
			console.log("You need a -name- to create this virtual server");		
		}
	}
	else if (ans.length <= 4){
		var valor = parameterUrl
		if(valor == null || valor.length == 0 || /^\s+$/.test(valor)){
			console.log("You need a -url- to create this virtual server");		
		}
	}
	else if (ans.length <= 5){
		var valor = parameterFolder
		if(valor == null || valor.length == 0 || /^\s+$/.test(valor)){
			console.log("You need a -folder- to create this virtual server");		
		}
	}else{
		createProject();
	}

}

function createProject() {

	project.title = parameterName;
	project.folder = config.settings.xampp_files_directory + parameterFolder;
	
	correctUrl(parameterUrl);

	var checkedUrl = checkUrlPathExists();
	var checkedFolder = checkFolderPathExists(parameterFolder);

	if (checkedUrl > -1) {
		console.log("There is a project with the same url");		
	}
	else if(checkedFolder > -1){
		console.log("There is a project with the same path folder");					
	}
	else{
		fs.readFile(config.settings.conf_file, 'utf-8', function(err, data){
			if (err == "EPERM"){
				console.log("You need permision admins to")
			} 
			else{
				ifDoesNotExistCreateFolder(parameterFolder);
				var mocha = JSON.parse(data);
				mocha.projects.push(project);
				update.all(function(){
					fs.writeFileSync(config.settings.conf_file, JSON.stringify(mocha), 'utf-8');
					console.log("The project was registered correctly");
				});
			}
		});
	}
}

module.exports.new = checkout;
