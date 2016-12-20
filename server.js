/* FusionDiscordIntergration (FDI)
 * (C) 2016 DolphinBox
 */
 
var net = require('net');

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
	
	console.log(data);
	console.log('hmm')
	/*console.log('Read:' + client.bytesRead);
	if(command == 'rror 101\n'){
		console.log('I got a thing')
		client.write('Hai\n');
	}*/
	
});
client.on('close', function() {
	console.log('Connection closed');
});