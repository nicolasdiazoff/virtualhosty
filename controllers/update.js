const fs = require('fs');
const index = require('../index.js');

function randomString(){
	var text = "";
	var posissible = "ABCDFGHIJKLMNOPQRSTUVWXYZabcdfghijklmnopqrstuvwxyz";

	for (var i = 0; i < 32; i++) 
		text += posissible.charAt(Math.floor(Math.random() * posissible.length));
	
	return text;
}

function updateApacheVhost(updateHostDriver){

	var myAllProjects = JSON.parse(fs.readFileSync(index.config.htdocs_directory + index.config.conf_file));

	fs.readFile("./archive/httpd-vhosts", 'utf-8', function(err, data){
		if (err) throw err;
		fs.writeFile(index.config.xampp_directory + index.config.xampp_vhost_directory, data + "\n", 'utf-8', function(err, data){
			if (err) {
				console.log("Please run Git BASH with Admin rights.", err)
			}
			for (var i = 0; i < myAllProjects.projects.length; i++) {		
				fs.appendFile(index.config.xampp_directory + index.config.xampp_vhost_directory, 
					"<VirtualHost *:80>" + '\r\n' + '\t' +
					'DocumentRoot "' + myAllProjects.projects[i].folder + '"' + '\r\n\t' +
					"ServerName "+ myAllProjects.projects[i].url + '\r\n\t' +
					"ServerAlias "+ myAllProjects.projects[i].url + '\r\n\t' +
				    '<Directory "' + myAllProjects.projects[i].folder + '">' + '\r\n\t\t' +
					"AllowOverride All" + '\r\n\t\t' +
					"Require all Granted" + '\r\n\t' +
					// "Order allow,deny" + '\r\n\t\t' +
					// "Allow from all" + '\r\n\t' +
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

function updateDriversHostforCreate(createproject){
	fs.readFile("/archive/hosts", 'utf-8', function(err, data){
		if (err) throw err;
		fs.writeFile(index.config.host_directory, data + "\n", 'utf-8', function(err, data){
			console.log(index.config.host_directory);
			if (err) {
				if (err.code == 'EPERM') {
					console.log("ERROR!: Please run Git BASH with Admin rights.", "Error for driver host");
				} else {
					return console.log(err);
				}
			} else{			
				createproject();
				var myAllProjects = JSON.parse(fs.readFileSync(index.config.htdocs_directory + index.config.conf_file));

				for (var i = 0; i < myAllProjects.projects.length; i++) {		
					fs.appendFile(index.config.host_directory, "127.0.0.1       " + myAllProjects.projects[i].url + "\n" , 'utf8', function (err, data) {
						if (err) throw err;
					});		
				}
				console.log("Drivers Host were updated")
				updateApacheVhost()
			}
		});
	});
}

function updateDriversHostforUpdate() {
	fs.readFile("./archive/hosts", 'utf-8', function(err, data){
		if (err) throw err;
		fs.writeFile(index.config.host_directory, data + "\n", 'utf-8', function(err, data){
			if (err) {
				if (err.code == 'EPERM') {
					console.log("ERROR!: Please run Git BASH with Admin rights.", "Error for driver host");
				} else {
					return console.log(err);
				}
			} else{			
				var myAllProjects = JSON.parse(fs.readFileSync(index.config.htdocs_directory + index.config.conf_file));

				for (var i = 0; i < myAllProjects.projects.length; i++) {		
					fs.appendFile(index.config.host_directory, "127.0.0.1       " + myAllProjects.projects[i].url + "\n" , 'utf8', function (err, data) {
						if (err) throw err;
					});		
				}
				console.log("Drivers Host were updated")
				updateApacheVhost()
			}
		});
	});
}

module.exports.forCreate = updateDriversHostforCreate;
module.exports.forUpdate = updateDriversHostforUpdate;