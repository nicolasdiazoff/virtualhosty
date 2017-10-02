var fs = require('fs'),
    inquirer = require("inquirer");


function projectRead(){
	fs.readdir("C:/ark/", function(err, files){
        var proyectos = new Array;
        var phaty = "C:/ark/";
        for(var i = 0; i < files.length ; i++){    
            fs.readFile(phaty + files[i] + "/package.json", "utf8", function(err, data){
                console.log(JSON.parse(data));
                proyectos.push(JSON.parse(data));

                // if (err === 'ENOENT') {
                //         console.log('File not found!');                        
                //     }
                //     else if(data === undefined){
                //         console.log('File not found!');                        
                //     }
                //     else{
                //         var project = JSON.parse(data);
                //         console.log(project.name);
                //     }

                }
            );
        }

        console.log(proyectos);

        const promptList = [
            {
                type: "list",
                name: "projects",
                message: "Escoge un proyecto para abrirlo:",
                choices: proyectos
            }
        ];

        inquirer.prompt(promptList).then(function(ans){
            console.log("Open");
        });

    });

}

module.exports.all = projectRead;
