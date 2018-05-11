const fs = require('fs');
const index = require('../index.js');

function dialogues() {
	// body...
	console.log("Welcome to Hosty's help");
	console.log("These are common Hosty commands used in various situations:");
	console.log("To create new virtual servers");
	console.log('\t' + "[-c 'name' 'url' 'folder']");
	console.log('\t' + "[-create 'name' 'url' 'folder']");
	console.log("To edit the virtual servers");
	console.log('\t' + "[-e 'name' 'url' 'folder' 'INDEX']");
	console.log('\t' + "[-edit 'name' 'url' 'folder' 'INDEX']");
	console.log("To update the drivers in case of a manual modification");
	console.log('\t' + "[-d 'INDEX']");
	console.log('\t' + "[-delete 'INDEX']");
	console.log("To read all virtual servers");
	console.log('\t' + "[-r]");
	console.log("To read all the virtual servers with details");
	console.log('\t' +"[-list]");
	console.log("To update the drivers in case of a manual modification");
	console.log('\t' + "[-u]");
	console.log('\t' + "[-update]");

}

module.exports.show = dialogues;

