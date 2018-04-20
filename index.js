#!/usr/bin/env node

const create = require('./controllers/create.js');
const update = require('./controllers/update.js');
const edit = require('./controllers/edit.js');
const read = require('./controllers/read.js');
const destroy = require('./controllers/destroy.js');
const setting = require('./controllers/setting.js');

var ans = process.argv;

switch(ans[2]){
	case "create":
		create.new();
		break;
	case "-c":
		create.new();
		break;
	case "-update":
		update.all();
		break;
	case "-u":
		update.all();
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
	case "-s":
		setting.file();
		break;
	case "settings":
		setting.file();
		break;
	default:
		console.log("No hay parametros");
		break;
}

