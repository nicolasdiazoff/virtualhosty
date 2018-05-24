const fs = require('fs');
const index = require('../index.js');

// $ hosty -config xampp_apache_port 'Example:3000'
// $ hosty -config conf_file 'path'
// $ hosty -config hosts_ip_address 'Example:127.0.0.1'
// $ hosty -config hosts_directory 'Example:C:/Windows/System64/drivers/etc/hosts'
// $ hosty -config xampp_files_directory 'Example: C:/wonderland/'
// $ hosty -config xampp_vhost_directory 'Example: C:/apache/conf/extra/httpd-vhosts.conf'

var ans = process.argv;

var parameterIndex = ans[3];


function config() {

    fs.readFile(index.config.conf_file, 'utf-8', function(err, data){
        if (err == 'ENOENT'){
        	console.log("The project file does not exist ... we will create it");
        	index.createProjectFile();
        }else{
	        var mocha = JSON.parse(data);
	        mocha.projects.forEach(function(element,index,array){
	            console.log(index + " <= " + element.title);
	            // console.log('\t' + "URL:" + element.url);
	            // console.log('\t' + "FOLDER:" + element.folder);
	        });        	
        }
    });

}
