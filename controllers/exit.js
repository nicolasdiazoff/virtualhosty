rl.on('SIGINT', () => {   
	rl.question('Are you sure you want to exit? ', (answer) => {     
		if (answer.match(/^y(es)?$/i)) rl.pause();   
	}); 
});
