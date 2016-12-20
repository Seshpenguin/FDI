/* FusionDiscordIntergration (FDI)
 * (C) 2016 DolphinBox
 */
 
var net = require('net');
var command = '';
var counter = 0;

var client = new net.Socket();
client.connect(36000, 'internal.estinet.net', function(){
	console.log('Connected to ClioteSky!');
	client.write('create hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh\n');
	//console.log(client.bytesWritten);
	client.setEncoding('utf-8');
});
client.on('error', function(error){
	console.log('There was an error establshing a connection to ClioteSky.');
});
client.on('data', function(data){
	command = command.concat(data);
	counter++
	if(counter == 2){
		console.log(command);
	}
	//console.log('hmm')
	/*console.log('Read:' + client.bytesRead);
	if(command == 'rror 101\n'){
		console.log('I got a thing')
		client.write('Hai\n');
	}*/
	
});
client.on('close', function() {
	console.log('Connection closed');
});