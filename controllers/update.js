const fs = require('fs');
const config = require('../config.json');

function randomString(){
	var text = "";
	var posissible = "ABCDFGHIJKLMNOPQRSTUVWXYZabcdfghijklmnopqrstuvwxyz";

	for (var i = 0; i < 32; i++) 
		text += posissible.charAt(Math.floor(Math.random() * posissible.length));
	
	return text;
}

function updateApacheVhost(){

	fs.readFile("./archive/httpd-vhosts", 'utf-8', function(err, data){
		if (err) throw err;
		fs.writeFile(config.settings.xampp_vhost_directory, data + "\n", 'utf-8', function(err, data){
			if (err) {
				console.log("Please run Git BASH with Admin rights.", err)
			}
			for (var i = 0; i < config.projects.length; i++) {		
				fs.appendFile(config.settings.xampp_vhost_directory, 
					"<VirtualHost *:80>" + '\r\n' + '\t' +
					'DocumentRoot "' + config.projects[i].folder + '"' + '\r\n\t' +
					"ServerName "+ config.projects[i].url + '\r\n\t' +
				    '<Directory "' + config.projects[i].folder + '">' + '\r\n\t\t' +
					"Order allow,deny" + '\r\n\t\t' +
					"Allow from all" + '\r\n\t' +
					"</Directory>" + '\r\n' +
					"</VirtualHost>" + '\r\n\n' , 
					'utf8', 
					function (err, data) {
						if (err) throw err;
					}
				);		
			}
		});
		console.log("The vhost apache were updated")
	});
}

function updateDriversHost(callback){

	fs.readFile("./archive/hosts", 'utf-8', function(err, data){
		if (err) throw err;
		fs.writeFile(config.settings.hosts_directory, data + "\n", 'utf-8', function(err, data){
			if (err) {
				if (err.code == 'EPERM') {
					console.log("ERROR!: Please run Git BASH with Admin rights.", "Error for driver host");
				} else {
					return console.log(err);
				}
			} else{			
				for (var i = 0; i < config.projects.length; i++) {		
					fs.appendFile(config.settings.hosts_directory, "127.0.0.1       " + config.projects[i].url + "\n" , 'utf8', function (err, data) {
						if (err) throw err;
					});		
				}
				console.log("Drivers Host were updated")
				updateApacheVhost()
				callback();
			}
		});
	});
}

module.exports.all = updateDriversHost;
