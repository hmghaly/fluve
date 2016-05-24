//Set the needed OS variables
var app = document.URL.indexOf( 'http://' ) === -1 && document.URL.indexOf( 'https://' ) === -1; //test whether the code is running on a browser or in an app

var isAndroid=false;
if (window.location.pathname.indexOf("android_asset") > -1) isAndroid=true;

var dt = new Date();
var cur_time = dt.getTime();

//Set Window/stage variables
var w,h;
var canvas, stage;
var hero;
var hw,hh; //Hero width and height
var start_btn;
var click_audio;
var bg_audio;

var img_loaded=false;
var device_ready=false;
function init(){
	hero_img=$$("hero_img")
	canvas=$$("myCanvas")
	//bg_audio=$$("bg_audio")
	bg_src="audio/game/alpha.mp3"
	bg_audio=odio(bg_src,false,function (){})
	click_src="audio/game/highup.mp3"
	click_audio=odio(click_src,true,function (){})

	
	canvas.style.background = 'LightSkyBlue';
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	w=canvas.width;
	h=canvas.height;
	stage = new createjs.Stage("myCanvas");
	createjs.Touch.enable(stage);
	hero = new createjs.Bitmap(hero_img);
	
	hw=hero.getBounds().width;
	hh=hero.getBounds().height;
	
	//contour_dict=get_contour(hero)
	hero.x=w*0.1;
	hero.y=h*0.5;
	click_src="audio/game/highup.mp3"
	click_audio=odio(click_src,false,function (){})
	img_loaded=true;
	try{
		if (app){
			document.addEventListener("deviceready",onDeviceReady, false);
		}
		else onDeviceReady()
	
	}
	catch(err){
		document.getElementById("demo").innerHTML = err.message;
	}
	all_ready();
	//console.log(contour_dict)
	//document.getElementById("demo").innerHTML=JSON.stringify(contour_dict)


}


//check if everything is ready
function all_ready(){
	dt=new Date();
	interval= dt.getTime()-cur_time;
	if (img_loaded && meta_loaded && lang_loaded && device_ready) {
		console.log("Game Assets Loaded in "+ interval);
		start_btn=draw_btn("Start!")
		start_btn.x=w*0.5;
		start_btn.y=h*0.5;
		start_btn.on("click", start, null, false, null, false);
		stage.addChild(start_btn);
		stage.update();
	}


}


function resize(){}


