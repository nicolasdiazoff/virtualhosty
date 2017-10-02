var fs = require('fs'),
	inquirer = require("inquirer");
	
	inquirer.registerPrompt('chalk-pipe', require('inquirer-chalk-pipe'));

function randomString(){
	var text = "";
	var posissible = "ABCDFGHIJKLMNOPQRSTUVWXYZabcdfghijklmnopqrstuvwxyz";

	for (var i = 0; i < 32; i++) 
		text += posissible.charAt(Math.floor(Math.random() * posissible.length));
	
	return text;
}

function createProject(){

	var phaty = "C:/ark/" + randomString();

	const promptList = [
		{
			type: "list",
				name: "tipo",
				message: "Tipo:",
				choices: [
					"Laravel",
					"Lumen",
					"Ror",
					"Express"
				]
		},
		{
			type: 'chalk-pipe',
			name: 'name',
			message: 'Titulo:',
			default: '#cccccc'
		}, 
		{
			type: 'chalk-pipe',
			name: 'version',
			message: 'Version:',
			default: '0.0.1'
		}, 
		{
			type: 'chalk-pipe',
			name: 'description',
			message: 'Descripcion:',
			default: '#cccccc'
		}, 
		{
			type: 'chalk-pipe',
			name: 'author',
			message: 'Author:',
			default: '#cccccc'
		}
	];

	inquirer.prompt(promptList).then(function(ans){
		console.log(ans);
		fs.mkdir(phaty, function(){
			fs.writeFile(phaty + "/package.json", JSON.stringify(ans) , function(){
				console.log("Se creo el proyecto");
			});
		});
	});
	
}

module.exports.new = createProject;
