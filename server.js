/* FusionDiscordIntergration (FDI)
 * Intergrates FusionPlay with Discord. Allows players to be automaticlly placed into a certain discord channel
 * when they join a FusionPlay games. Plays music, soundeffects, etc.
 *
 * (C) 2016 DolphinBox
 */
 
var net = require('net');
var command = '';
var counter = 0;
var hasAuthenticated = false;

//Configuration
var clioteName = 'FDI1234';
var cliotePassword = '123';

var client = new net.Socket();
client.connect(36000, 'internal.estinet.net', function(){
	console.log('Connected to ClioteSky!');
	
	// send some arbitrary data to make sure cliotesky is working. (and to initiate the handshake process)
	client.write('hello\n'); //should return an error 101
	
	// make sure that our output is in utf-8 (aka a normal string), not a Buffer object.
	client.setEncoding('utf-8');
	
	console.log('create')
	createCliote();
	console.log('login');
	login();
	//client.write('WUT');

	
	// keep-alive
	setInterval(function() {
		console.log('Im alive!');
		client.write('alive');
	}, 5000);
});
client.on('error', function(error){
	// could not establish a connection with cliotesky
	console.log('There was an error establshing a connection to ClioteSky.');
});
client.on('data', function(data){
	// This is where incoming data from cliotesky is handled.
	// Note! Any data to and from cliotesky is appended with "\n", aka a newline.
	
	// concat takes 2 varibles and add's their values together (in this case we append 'command' with 'data'.)
	// we do this because of some weird glitch in the way data is sent (first character is sent in a packet, then the rest in another.)
	//command = command.concat(data);
	command = data;
	counter++
	console.log('raw:' + data)
	if(counter == 2 || 1){
		//once we get the 2 packets of data, then we can do stuff with it.
		/*if(hasAuthenticated == false){
			console.log('Attempting to authenticate with ClioteSky');
			
			if(command == 'error 201\n'){
				// cliote doesn't exist. create it.
				
			}
			hasAuthenticated = true;
		}*/
		console.log(command);
		switch(command){
			case 'error 100\n':
				console.log('Uhoh! Error 100 recived!');
				break;
			case 'error 301\n':
				console.log('Cliote name already registed.');
				break;
		}
		counter = 0;
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



function login(){
	// first we try to login as a cliote
	//client.write('hello ' + clioteName + ' ' + cliotePassword + '\n');
}
function createCliote(){
	// if the cliote doesn't exsit, create it.
	//client.write('create ' + clioteName + ' Default ' + cliotePassword + '\n');
	client.write('hello ' + clioteName + ' ' + cliotePassword + '\n');
}
function 