const fs = require('fs');
const index = require('../index.js');
const update = require('./update.js');

// console.log(index.config);
// const config = require(index.config.xampp_directory);

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
	// add the suffix .local so that the url is friendly in development
	if(url.slice(-6) != ".local") {
		console.log("If you do not include .local in the url it is automatically added");
		element = url + ".local";
	}else{
		element = url;
	}
	project.url = element;
}

//check if the url is in the registry
function checkUrlPathExists() {
	// console.log(JSON.parse(myAllProjects));
	var myAllProjects = JSON.parse(fs.readFileSync(index.config.htdocs_directory + index.config.conf_file));	
	for (var i = 0; i < myAllProjects.projects.length; i++){
		if (myAllProjects.projects[i].url == project.url) return i;
	}
}

//check if the url of the folder is in the registry
function checkFolderPathExists(path) {
	var myAllProjects = JSON.parse(fs.readFileSync(index.config.htdocs_directory + index.config.conf_file));
	for(var i = 0; i < myAllProjects.projects.length; i++){
		if (myAllProjects.projects[i].folder == index.config.xampp_directory + path) return i;
	}
}

// If the directory does not exist and is not registered, it is created
function ifDoesNotExistCreateFolder(path){

	fs.lstat(index.config.xampp_directory + path, function(notexists, exists){
		if(notexists){
			fs.mkdir(index.config.xampp_directory + path, function(err,data){
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
	project.folder = index.config.htdocs_directory + parameterFolder;
	
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
		fs.readFile(index.config.htdocs_directory + index.config.conf_file, 'utf-8', function(err, data){
			if (err == "EPERM"){
				console.log("You need permision admins to")
			} 
			else{
				ifDoesNotExistCreateFolder(parameterFolder);
				var mocha = JSON.parse(data);
				mocha.projects.push(project);
				update.forCreate(function(){
					fs.writeFileSync(index.config.htdocs_directory + index.config.conf_file, JSON.stringify(mocha), 'utf-8');
					console.log("The project was registered correctly");
				});
			}
		});
	}
}

module.exports.new = checkout;
