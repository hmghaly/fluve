this.myNameSpace = this.myNameSpace || {};
        (function() {
            function MyApp() {
                this.init();
            }
 
            MyApp.prototype = {
                displayMessage:null,
                counter:0,
                init: function() {
                    //this.displayMessage = document.getElementById("status");
                    bg_src="audio/game/alpha.mp3"
                    this.bg_audio=odio(bg_src,false,function (){})
                    click_src="audio/game/highup.mp3"
                    this.click_audio=odio(click_src,false,function (){})

 
 
                    //this.displayMessage.innerHTML = "loading audio";
                    //var loadProxy = createjs.proxy(this.handleLoad, this);
                    //createjs.Sound.addEventListener("fileload", loadProxy);
                    //createjs.Sound.registerSounds(sounds, audioPath);
                    var tickProxy = createjs.proxy(this.handleTick, this);
                    createjs.Ticker.addEventListener("tick", tickProxy);
                    //createjs.Sound.addEventListener("fileload", tickProxy);
                },
 
                handleTick: function(event) {
                    this.counter+=1;
                    if (this.counter%200==0) this.click_audio.play();

                    //handleTick();
                    //createjs.Sound.play(event.src);
                    //this.displayMessage.innerHTML = "Playing " + event.src;
                },

                odio: function(src){
                	console.log("lets try this")
                	return odio(src);
                },
                play: function(audio_obj){
                	audio_obj.play();
                }                
            }
 
            myNameSpace.MyApp = MyApp;
        }());