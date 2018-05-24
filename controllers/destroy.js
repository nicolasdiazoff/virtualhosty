const fs = require('fs');
const index = require('../index.js');
const update = require('./update.js');

var ans = process.argv;

var parameterIndex = ans[3];

function Delete(){

	var myAllProjects = JSON.parse(fs.readFileSync(index.config.conf_file));

	this.checkUrlPathSame = function(parameterIndex) {
		myAllProjects.projects.forEach(function(currentValue, index, array) {
			if(index == parameterIndex){
				myAllProjects.projects.splice(parameterIndex, 1);
			}
		});
		return myAllProjects.projects;
	}

}


function deleteProject() {

	var deleted = new Delete(); 

	if(parameterIndex <= deleted.checkUrlPathSame(parameterIndex).length){
		update.forCreate(function(){
			fs.writeFileSync(index.config.conf_file, 
				JSON.stringify({"projects": deleted.checkUrlPathSame(parameterIndex)}),
			'utf-8');
			console.log("The project was eliminated");
		});
	}
}

module.exports.deleteProject = deleteProject;