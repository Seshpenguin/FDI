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

//Discord Bot
var Discord = require('discord.io');
var bot = new Discord.Client({
    token: "MjYxMTc4ODUzMjYxNzA1MjE3.CzyocA.euxtn4QHAspP-36YvGbgTtoA01s",
    autorun: true
});


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
	
	console.log('Attempting to create Cliote...')
	createCliote();
	//client.write('WUT');

	
	// keep-alive
	setInterval(function() {
		console.log('Sent alive message'); //Turn this off! Debug only.
		client.write('alive\n');
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
	command = command.concat(data);
	//command = data;
	if(data.length > 1) {
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
				console.log('Command not recognized.');
				break;
			case 'error 301\n':
				console.log('Cliote name already registed.'); //Authenticate with cliotesky, we already registered.
				console.log('Attemping to login as Cliote: ' + clioteName);
				client.write('hello ' + clioteName + ' ' + cliotePassword + '\n');
				break;
			case 'error 901\n':
				console.log('Cliote not yet authenticated.'); //Authenticate with cliotesky, we already registered.
				console.log('Attemping to login as Cliote: ' + clioteName);
				client.write('hello ' + clioteName + ' ' + cliotePassword + '\n');
				break;
			default:
				console.log('Unknown command or not yet implemented command recived.')
		}
		command = ''; //Clear the command
	}
	
});
client.on('close', function() {
	console.log('Connection closed');
});

// discord bot
bot.on('ready', function() {
    console.log(bot.username + " - (" + bot.id + ")");
});
bot.on('message', function(user, userID, channelID, message, event) {
    if (message === "ping") {
        bot.sendMessage({
            to: channelID,
            message: "pong"
        });
		client.write('send all ping\n');
    }
});

//functions

function createCliote(){
	// if the cliote doesn't exsit, create it.
	client.write('create ' + clioteName + ' Default ' + cliotePassword + '\n');
	//client.write('hello ' + clioteName + ' ' + cliotePassword + '\n');
	
}
