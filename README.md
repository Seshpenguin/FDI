# FDI
FusionDiscordIntergration - Part of FusionPlay.

##What does it do?
FDI is the soundscape for FusionPlay. Players join the Discord Voice Channel when playing on FusionPlay.
This let's them hear music, sound-effects, etc.

##How does it work?
FDI is built on Node-ChakraCore (A fork of Node.js that uses ChakraCore instead of V8).

FDI communicates with the FusionPlay network using ClioteSky, the central communication server for EstiNet. This way FusionPlay can tell FDI to do something, like switch music.

Discord.io is used to connect to the Discord Server. This is what actually send audio data and whatnot to Discord.

##Can I use it?
You can, but you probably don't want to. FDI is essentially proprietary software, being tightly intergrated into FusionPlay and ClioteSky, both custom pieces of software, written just for EstiNet.

Not to mention, FDI wasn't designed to be very scalable or portable. It just works for what we need it to do.

##Copyright
(c) 2016 DolphinBox

https://dolphinbox.net/

https://estinet.net/

