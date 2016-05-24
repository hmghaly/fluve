function onDeviceReady(){
	console.log("device ready")
	//This is where we define the audio objects
	click_audio=odio("audio/game/jingles_pizza00.mp3")
	bg_audio=odio("audio/game/alpha.mp3")
	device_ready=true;
	all_ready();
}

