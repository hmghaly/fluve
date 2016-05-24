var isAndroid=false;
if (window.location.pathname.indexOf("android_asset") > -1) isAndroid=true;
var w,h;
var canvas, stage;
var hero;
var hero_w,hero_h;
var contour_dict={};
var g_counter=0; //gloabal counter
var click_audio, lang_audio, bg_audio;

var elevating=false;
var delta_x=5;
var delta_y=5;
var all_xs; //all the x coordinates of the current set of bubbles

var font="bold 20px Arial";
var click_audio_path="audio/game/jingles_pizza00.mp3";
var bg_audio_path="audio/game/alpha.mp3"
var lang_audio_path="audio/game/highup.mp3"

var correct_tokens=[];
var cur_correct_tok
var t_counter=0; //token counter
var src_sent="";
var trg_sent="";
var trg_audio_fname="";
var bubbles=[]
var bubble_dict={} //matching the bubble object with its id as a key
var collected_tokens=[]

var text1,text2,text_msg;
var score, health;
var cur_view;

var ids_to_remove=[];
var last_wrong_id;

var played=false; //to play the sounds intially with any touch

function init(){
	hero_img=$$("hero_img")
	canvas=$$("myCanvas")
	
	canvas.style.background = 'LightSkyBlue';
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	w=canvas.width;
	h=canvas.height;
	stage = new createjs.Stage("myCanvas");
	createjs.Touch.enable(stage);

	hero = new createjs.Bitmap(hero_img);
	
	hero_w=hero.getBounds().width;
	hero_h=hero.getBounds().height;
	stage.addChild(hero);
	hero.x=w*0.2;
	hero.y=h*0.5;
	stage.update();
	
	
	half_diagonal=0.5*get_dist(0,0,hero_w,hero_h)
	console.log("half_diagonal: "+half_diagonal)
	
	//half_diagonal=130;
	
	mid_x=hero.x+hero_w*0.5;
	mid_y=hero.y+hero_h*0.5;
	for (var deg=0;deg<2*Math.PI;deg=deg+0.1){
		sin=Math.sin(deg);
		cos=Math.cos(deg);
		//console.log([deg,sin,cos])
		y_pt=mid_y+half_diagonal*sin;
		x_pt=mid_x+half_diagonal*cos;
		//console.log([x_pt,y_pt])
		var rect = new createjs.Shape();
		color="black";
		obj_under_pt=stage.getObjectUnderPoint (x_pt, y_pt)
		while (obj_under_pt==null) {
			y_pt-=sin;
			x_pt-=cos;
			obj_under_pt=stage.getObjectUnderPoint (x_pt, y_pt)
		}
		//if (stage.getObjectUnderPoint (x_pt, y_pt)==null) color="red"
		//rect.graphics.beginFill(color).drawRect(x_pt, y_pt, 2, 2);
		//stage.addChild(rect)
		contour_dict[Math.round(deg*10)]=[x_pt-mid_x,y_pt-mid_y]
		//console.log(stage.getObjectUnderPoint (x_pt, y_pt))

	}
	//alert("finished calculating")
	
	
	//if (stage.getObjectUnderPoint (x,cur_y)==null) local_xs.push(x)
	//contour_dict=get_contour1(hero)
	console.log(contour_dict)

	

		
	try{
		if (app){
			document.addEventListener("deviceready",onDeviceReady, false);
		}
		else onDeviceReady()
	
	}
	catch(err){
		document.getElementById("demo").innerHTML = err.message;
	}
	
	
}



function play_app(src){
	if (window.location.pathname.indexOf("android_asset") > -1) {
		src='/android_asset/www/'+src
	}
	cur_audio=new Media(src,function(){console.log("success")},onError);
	cur_audio.play()
}

function app_audio(src){
	if (window.location.pathname.indexOf("android_asset") > -1) {
		src='/android_asset/www/'+src
	}
	cur_audio=new Media(src,function(){console.log("success")},onError);
	return cur_audio;
}

function play_all(src){
	if (app) play_app(src);
	else {
		try {
			corr_obj=audio_obj_dict[src]
			corr_obj.play();
		}
		catch (e) {
			var node = document.createElement("audio"); 
			node.id=src
			node.src=src
			
			node.controls=false;
			document.body.appendChild(node); 
			node.oncanplay=function(){
				node.play();
			};
			
		}
	}
	
}

function onDeviceReady(){
	
	if (app) click_audio=app_audio(click_audio_path)
	else click_audio=$$("click_audio")
	stage.addEventListener("stagemouseup", handleMouseUp);
	stage.addEventListener("stagemousedown", handleMouseDown);
	correct_tokens=["el-","walaaaaaaad","dah","ma-","ye3raffffffffff","-hom","-sh"]
	correct_tokens=["el-","walad","dah","ma-","ye3raf","-hom","-sh"]
	t_counter=0;
	cur_correct_tok=correct_tokens[t_counter]
	populate();
    createjs.Ticker.setFPS(60);
	createjs.Ticker.addEventListener("tick", handleTick);
}


function deployQ(){
	src_sent="this boy does not know them";
	trg_sent="el- walad dah ma- ye3raf -hom -sh"
	correct_tokens=["el-","walad","dah","ma-","ye3raf","-hom","-sh"]
}
function populate(){
	text1=draw_txt("this boy does not know them")
	text1.y=h*0.05;
	text1.x=w*0.5;
	text1.textBaseline = "top";
	stage.addChild(text1);
	text2=draw_txt("")
	text2.y=h*0.1;
	text2.x=w*0.5;
	text2.textBaseline = "top";
	stage.addChild(text2);

	max_size=0;
	console.log(correct_tokens)
	shuffled_tokens=shuffle(correct_tokens.slice())
	//console.log(correct_tokens)
	console.log(shuffled_tokens)
	x0=w*0.5;
	y0=h*0.2;
	
	for (var b=0;b<shuffled_tokens.length;b++){
		txt=shuffled_tokens[b]
		var circle3 = new createjs.Shape();
		var label = new createjs.Text(txt, "bold 28px Arial", "#FFFFFF");//
		label.textAlign = "center";
		label.y = -7;

		bubble_size=label.getMeasuredWidth()*0.55; //the size here is basically the radius
		bubble_size=Math.max(bubble_size,canvas.height*0.08)

		color_hex='#'+Math.floor(Math.random()*16777215).toString(16);
		circle3.graphics.beginFill(color_hex).drawCircle(0, 0, bubble_size);
		circle3.name=txt;
		circle3.id=txt+b;
		circle3.width=bubble_size*2;
		
		
		 

		var bubble = new createjs.Container();
		bubble.width=bubble_size*2;
		//bubble.x = w*0.1+Math.random()*w*0.8;
		//bubble.y=h*0.1+Math.random()*h*0.8;
		bubble.x = x0+bubble_size;
		bubble.y=y0+bubble_size+Math.random()*(h*0.6-bubble_size);
		x0+=bubble_size*2*1.5;
		//y0+=bubble_size*2*orientation;

		bubble.name=txt;
		bubble.id=txt+b;
		bubble.addChild(circle3,label)
		
		//var rect = new createjs.Rectangle(bubble.x-bubble_size, bubble.y-bubble_size, bubble.x+bubble_size, bubble.y+bubble_size);
		
		bubble_dict[bubble.id]=bubble;
		stage.addChild(bubble);
		bubbles.push(bubble)
		//bubble_size_dict[txt]=bubble_size;
	}
	
}

function handleMouseUp(evt){
	elevating=false;
	cur_x=evt.stageX;
	cur_y=evt.stageY;
	/*
	createjs.Tween.get(hero, { loop: false })
	  .to({ x: cur_x, y: cur_y}, 1000, createjs.Ease.bounceOut)
	*/
	stage.update();
	/*
	if (app) click_audio_app.play()
	else click_audio.play()
	play_all(click_audio_path)
	*/
	
}

function handleMouseDown(evt){
	elevating=true;
	cur_x=evt.stageX;
	cur_y=evt.stageY;
	factor=2;
	if (app) factor=1;
	delta_x=5*factor;
	if (cur_x<hero.x) delta_x=-5*factor;
	if (cur_x<w && cur_x>hero.x && cur_x<hero.x+hero_w) delta_x=0;
	
	if (!played){
		click_audio.play();
		click_audio.pause();
		played=true;
	}
	
}

function handleTick(){
	canvas.style.background = 'LightSkyBlue';
	hh=hero_h;
	hw=hero_w;
	if (elevating) {
		hero.y-=delta_y;
		hero.x+=delta_x;
		
	}
	else hero.y+=delta_y;
	if (hero.y+hh>0.9*h) hero.y=0.9*h-hh;
	if (hero.x+hw>w) hero.x=w-hw;
	if (hero.y<0) hero.y=0;
	if (hero.x<0) hero.x=0;	
	
	bubbles_clone=bubbles.slice();
	all_bubble_ids=[];
	bubbles_to_remove=[];
		new_bubbles=[];
		all_xs=[];
		
		for (var b=0;b<bubbles.length;b++){
			cur_bubble=bubbles[b]
			cur_bubble.alpha=1
			bubble_name=cur_bubble.name
			bubble_id=cur_bubble.id
			//if (all_bubble_ids.indexOf(cur_bubble).id>-1) continue;
			//all_bubble_ids.push(cur_bubble.id)
			bubble_size=cur_bubble.width;
			all_xs.push(cur_bubble.x+bubble_size*0.5)

			collision=false;
			col_pt=[];
			
			//if (hero.x+hero_w)
			
			if (hero.x<cur_bubble.x-bubble_size*0.5 && cur_bubble.x-bubble_size*0.5-hero.x<hero_w) {
				if (hero.y<cur_bubble.y-bubble_size*0.5 && cur_bubble.y-bubble_size*0.5-hero.y<hero_h) {
					col_pt=new_col(hero,hero_w,hero_h,contour_dict,cur_bubble,bubble_size*0.5)

					//col_pt=col_obj_circle(hero,hero_w,hero_h,cur_bubble,contour_dict,bubble_size*0.5)
					//cur_bubble.alpha=0.7;
					//collision=true;
				}
				else if (hero.y>cur_bubble.y-bubble_size*0.5 && hero.y<cur_bubble.y+bubble_size*0.5) {
					col_pt=new_col(hero,hero_w,hero_h,contour_dict,cur_bubble,bubble_size*0.5)

				//if (get_dist(hero.x+hero_w,hero.y+hero_h,cur_bubble.x,cur_bubble.y)=<bubble_size*0.5) collision=true;
					//dist=get_dist(hero.x+hero_w,hero.y+hero_h,cur_bubble.x,cur_bubble.y)
					//col_pt=col_obj_circle(hero,hero_w,hero_h,cur_bubble,contour_dict,bubble_size*0.5)
					//collision=true;
					//cur_bubble.alpha=0.7;
				}
			}
			else if (hero.x>cur_bubble.x-bubble_size*0.5 && hero.x<cur_bubble.x+bubble_size*0.5) {

				if (hero.y<cur_bubble.y-bubble_size*0.5 && cur_bubble.y-bubble_size*0.5-hero.y<hero_h) {
					col_pt=new_col(hero,hero_w,hero_h,contour_dict,cur_bubble,bubble_size*0.5)
					//col_pt=col_obj_circle(hero,hero_w,hero_h,cur_bubble,contour_dict,bubble_size*0.5)
					//collision=true;
					//cur_bubble.alpha=0.1;
				}
				else if (hero.y>cur_bubble.y-bubble_size*0.5 && hero.y<cur_bubble.y+bubble_size*0.5) {
					col_pt=new_col(hero,hero_w,hero_h,contour_dict,cur_bubble,bubble_size*0.5)
					//col_pt=col_obj_circle(hero,hero_w,hero_h,cur_bubble,contour_dict,bubble_size*0.5)
					//collision=true;
					//cur_bubble.alpha=0.1;
				}
				

			}
			
			if (col_pt.length==2) {
				//console.log([col_pt,bubble_name])
				hero_midx=hero.x+hero_w*0.5;
				hero_midy=hero.y+hero_h*0.5;
				bubble_xd=cur_bubble.x-col_pt[0];
				bubble_yd=cur_bubble.y-col_pt[1];
				hero_xd=hero_midx-col_pt[0];
				hero_yd=hero_midy-col_pt[1];

				cur_y=cur_bubble.y+0;
				if (cur_correct_tok==bubble_name) {
					click_audio.play();
					collected_tokens.push(bubble_name)
					trg_sent=collected_tokens.join(" ")
					
					console.log("Success!")
					bubbles_clone.splice(b, 1);
					ids_to_remove.push(bubble_id)
					console.log(bubble_id)
					console.log(ids_to_remove)
					createjs.Tween.get(cur_bubble)
					.to({ x: cur_bubble.x+bubble_xd*5, y: cur_bubble.y+bubble_yd*5}, 400, createjs.Ease.bounceOut)
					.to({ x:w*0.5, y: h*0.2}, 1000, createjs.Ease.bounceOut)
					.call(function(){
						for (var rv=0;rv<ids_to_remove.length;rv++) {
							stage.removeChild(bubble_dict[ids_to_remove[rv]])
							text2.text=trg_sent;
						}
					})

					t_counter+=1
					if (t_counter==correct_tokens.length){
						console.log("Question solved")
						}
					else cur_correct_tok=correct_tokens[t_counter]
					
				}
				else {
					if (bubble_id!=last_wrong_id) {
						canvas.style.background = 'Crimson';
					}
					last_wrong_id=bubble_id;
					
					//createjs.Tween.get(hero)
					//.to({ x: hero.x+hero_xd*1.5, y: hero.y+hero_yd*1.5}, 20, createjs.Ease.bounceOut)

					//console.log("Incorrect")
				}

				

			}
			if (collision){
				console.log(bubble_name)
				if (cur_correct_tok==bubble_name) {
					console.log("Success!")
					t_counter+=1
					if (t_counter==correct_tokens.length){
						console.log("Question solved")
						populate()
						}
					else cur_correct_tok=correct_tokens[t_counter]
					
				}
				else {
					console.log("Incorrect")
				}
				hero_midx=hero.x+hero_w*0.5;
				hero_midy=hero.y+hero_h*0.5;
				hero_bubble_xd=cur_bubble.x-hero_midx;
				hero_bubble_yd=cur_bubble.y-hero_midy;
				cur_y=cur_bubble.y+0;
				createjs.Tween.get(cur_bubble)
				.to({ x: cur_bubble.x+hero_bubble_xd*3, y: cur_bubble.y+hero_bubble_yd*3}, 1000, createjs.Ease.bounceOut)
				.to({ y: cur_y}, 1000, createjs.Ease.bounceOut)
				.call(function(){
					
				})
				
			}
			cur_bubble.x-=2;
			//if (all_xs.length>0) max_x=Math.max(Math.max(...all_xs)+cur_bubble.width*0.55,w)
			//else max_x=w;
			if (cur_bubble.x<0) cur_bubble.x=w;
			//if (collision_pt.length==2) console.log(collision_pt)

			
			//if (hero.x<cur_bubble.x-bubble_size*0.5 && cur_bubble.x-bubble_size*0.5-hero.x<hero_w) cur_bubble.alpha=0.2;
			//if (hero.x>cur_bubble.x-bubble_size*0.5 && hero.x-cur_bubble.x-bubble_size*0.5<bubble_size) cur_bubble.alpha=0.2;
			

			/*
			if (hero.x<cur_bubble.x && cur_bubble.x-hero.x<hero_w) {
				if (hero.y<cur_bubble.y && cur_bubble.y-hero.y<hero_h) cur_bubble.alpha=0.2;
				else if (hero.y>cur_bubble.y && hero.y-cur_bubble.y<bubble_size*0.5) cur_bubble.alpha=0.2;
				
			}
			else if (hero.x>cur_bubble.x && hero.x-cur_bubble.x<bubble_size*0.5) {
				if (hero.y<cur_bubble.y && cur_bubble.y-hero.y<hero_h) cur_bubble.alpha=0.2;
				else if (hero.y>cur_bubble.y && hero.y-cur_bubble.y<bubble_size*0.5) cur_bubble.alpha=0.2;
			}
			*/


		}
		bubbles=bubbles_clone;		
		//hero_rect.x=hero.x;
		//hero_rect.y=hero.y;
		stage.update();
	
}

function resize(){
	stage.clear();
	console.log("Resizing")
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	w=canvas.width;
	h=canvas.height;

}

function onError(e){
	alert("An error Occurred:"+e+e.code+e.message)
	document.getElementById("demo").innerHTML = JSON.stringify(e);
	
}
function check_answer(){
	console.log("finished")
}
function handleCorrect(cur_bubble,collision_pt){}
