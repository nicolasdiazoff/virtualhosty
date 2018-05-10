#!/usr/bin/env node
const fs = require('fs');
const config = require('./config.json');
const os = require('os');
const create = require('./controllers/create.js');
const update = require('./controllers/update.js');
// const edit = require('./controllers/edit.js');
const read = require('./controllers/read.js');
// const destroy = require('./controllers/destroy.js');
// const setting = require('./controllers/setting.js');

var ans = process.argv;

const objetoDefino = {
	"host_directory": undefined,
	"xampp_directory": undefined,
	"htdocs_directory": undefined,
	"xampp_vhost_directory": config.settings.xampp_vhost_directory, 
	"conf_file": config.settings.conf_file
};

module.exports.config = objetoDefino;
module.exports.createProjectFile = createProjectFile;

function createProjectFile() {

	var formatForFileProjects = {
		"projects": [
			{
				"title": "localhost",
				"folder": "/xampp/htdocs/",
				"url": "localhost"
			}
		]
	}

	if(config.settings.xampp_directory_custom == ""){
		fs.writeFileSync("/xampp/htdocs/" + config.settings.conf_file , JSON.stringify(formatForFileProjects), 'utf-8');
	}
	else{
		formatForFileProjects.projects[0].folder = config.settings.xampp_files_directory_default + config.settings.conf_file;
		fs.writeFileSync(config.settings.xampp_files_directory_default + config.settings.conf_file , JSON.stringify(formatForFileProjects), 'utf-8');
	}
}

function optionsHosty(ansParams) {
	switch(ans[2]){
		case "-c":
			create.new();
			break;
		case "create":
			create.new();
			break;
		case "-u":
			update.all();
			break;
		case "-update":
			update.all();
			break;
		case "-r":
			read.all();
			break;
		case "-list":
			read.all();
			break;
		case "edit":
			edit.project();
			break;
		case "-e":
			edit.project();
			break;
		case "-d":
			destroy.vhost();
			break;
		case "delete":
			destroy.vhost();
			break;
		case "-config":
			setting.setting();
			break;
		default:
			console.log("No se reconoce ningun parametro");
			break;
	}
}

function searchHostForArch_Windows() {
	var arch;
 	if (os.arch == 'ia32') {
 		arch = 'System32'
 	}else if(os.arch == 'ia64'){
 		arch = 'System64'
 	}
 	return "/Windows/" + arch + "/drivers/etc/hosts";
}

function searchHostForArch_Linux() {
}

function myOs(os) {
	var drivers;
 	if (os == 'Windows_NT') {
 		drivers = searchHostForArch_Windows();
 	}
 	else if(os == 'Linux'){
 		drivers = searchHostForArch_Linux();
 		console.log("buscamos los drivers en linux")
 	}	
 	return drivers;
}

function xamppDefault(){
	if(config.settings.xampp_directory_custom == ""){
		if (fs.existsSync(config.settings.xampp_directory_default)){
			objetoDefino.xampp_directory = config.settings.xampp_directory_default;		    
		    return true;
		}
		else{
		    return false;
		}
	}
	else{
		return config.settings.xampp_directory_custom;
	}
}

function docsDefault(){
	if(config.settings.xampp_files_directory_custom == ""){
		if (fs.existsSync(config.settings.xampp_files_directory_default)){
			objetoDefino.htdocs_directory = config.settings.xampp_files_directory_default;
		    return true;
		}
		else{
		    return false;
		}
	}
	else{
		return config.settings.xampp_files_directory_custom;
	}
}

(function() {
	if(xamppDefault() == true){
		if (docsDefault() == true) {
			objetoDefino.host_directory = myOs(os.type());
			optionsHosty()
		}
		else{
			objetoDefino.htdocs_directory = config.settings.xampp_directory_custom + config.settings.xampp_files_directory_custom;
			objetoDefino.host_directory = myOs(os.type());
			optionsHosty()
		}
	}
	else{
		objetoDefino.xampp_directory = config.settings.xampp_directory_custom;
		objetoDefino.htdocs_directory = config.settings.xampp_files_directory_custom;
		objetoDefino.host_directory = myOs(os.type());
	}
})();

