const fs = require('fs');
const index = require('../index.js');
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
var parameterIndex = ans[6];

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


function Validator() {

	var myAllProjects = JSON.parse(fs.readFileSync(index.config.htdocs_directory + index.config.conf_file));

	this.checkUrlPathSame = function(parameterIndex) {
		myAllProjects.projects.forEach(function(currentValue, index, array) {
			if(index == parameterIndex){
				myAllProjects.projects.splice(parameterIndex, 1);
			}
		});
		return myAllProjects.projects;
	}

	this.checkUrlPathExists = function(projects,projectUrl){
		for (var i = 0; i < projects.length; i++){
			if (projects[i].url == projectUrl) return i;
		}
	}

	//check if the url of the folder is in the registry
	this.checkUrlPathFolderExists = function(projects, path){
		for(var i = 0; i < projects.length; i++){
			if (projects[i].folder == index.config.htdocs_directory + path){
				return i;
			} 
			else{
				return -1;				
			}
		}
	}

}

function checkout() {
	
	if (ans.length <= 3){
		var valor = parameterName;
		if(valor == null || valor.length == 0 || /^\s+$/.test(valor)){
			console.log("You need a -name- to edit this virtual server");		
		}
	}
	else if (ans.length <= 4){
		var valor = parameterUrl;
		if(valor == null || valor.length == 0 || /^\s+$/.test(valor)){
			console.log("You need a -url- to edit this virtual server");		
		}
	}
	else if (ans.length <= 5){
		var valor = parameterFolder;
		if(valor == null || valor.length == 0 || /^\s+$/.test(valor)){
			console.log("You need a -folder- to edit this virtual server");		
		}
	}
	else if (ans.length <= 6){
		var valor = parameterIndex;
		if(valor == null || valor.length == 0 || /^\s+$/.test(valor) || isNaN(valor)){
			console.log("You need a -index- to edit this virtual server");		
			console.log("If you do not know the Index of your project, run the command hosty -r or -list and discover it");
		}
	}
	else{
		editProject();
	}
}

function editProject() {

	project.title = parameterName;
	project.folder = index.config.htdocs_directory + parameterFolder;
	
	correctUrl(parameterUrl)
	var checking = new Validator();

	var theClearCollection = checking.checkUrlPathSame(parameterIndex);

	var checkedUrl = checking.checkUrlPathExists(checking.checkUrlPathSame(parameterIndex),project.url)
	var checkedFolder = checking.checkUrlPathFolderExists(checking.checkUrlPathSame(parameterIndex), parameterFolder);

	if (checkedUrl > -1) {
		console.log("There is a project with the same url");		
	}
	else if(checkedFolder > -1){
		console.log("There is a project with the same path folder");					
	}
	else{
		theClearCollection.push(project);
		update.forCreate(function(){
			fs.writeFileSync(index.config.htdocs_directory + index.config.conf_file, 
				JSON.stringify({"projects": theClearCollection}),
			'utf-8');
			console.log("The project was edited");
		});
	}
}



module.exports.editProject = checkout;