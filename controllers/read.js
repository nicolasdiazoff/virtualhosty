var fs = require('fs'),
    inquirer = require("inquirer");


function projectRead(){

    var phaty = "C:/ark/";
    var files = fs.readdirSync(phaty);
    var proyectos = new Array;
    
    for(var i = 0; i < files.length ; i++){    
        fs.readFileSync(phaty + files[i] + "/package.json"
            // , "utf8", function(err, data){
            //     throw err
            //     if (err === 'ENOENT') {
            //         console.log(err);                        
            //     }
            //     else if(data === undefined){
            //         // console.log('File not found!');                        
            //     }
            //     else{
            //         var project = JSON.parse(data);
            //         // console.log(project.name);
            //         proyectos.push(project.name);
            //         console.log(proyectos);
            //     }
            // }
        );

    }

    console.log(proyectos);


    // const promptList = [
    //     {
    //         type: "list",
    //         name: "projects",
    //         message: "Escoge un proyecto para abrirlo:",
    //         choices: proyectos
    //     }
    // ];

    // inquirer.prompt(promptList).then(function(ans){
    //     console.log("Open");
    // });


}

module.exports.all = projectRead;
