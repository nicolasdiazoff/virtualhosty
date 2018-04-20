const fs = require('fs');
const config = require('../config.json');

function projectRead(){
    
    fs.readFile(config.settings.conf_file, 'utf-8', function(err, data){
        if (err) throw err;
        var mocha = JSON.parse(data);
        mocha.projects.forEach(function(element,index,array) {
            console.log(element.title);
            console.log('\t' + "URL:" + element.url);
            console.log('\t' + "FOLDER:" + element.folder);
        });
    });
}

module.exports.all = projectRead;
