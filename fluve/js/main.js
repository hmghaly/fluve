//draw_txt
function draw_txt(txt){
	cur_font = font || "bold 24px Arial"
	var label=new createjs.Text(txt, cur_font, "#ff7700")
	label.textAlign = "center";
	label.textBaseline = "middle";
	return label;
}

//draw rectangle
	
function draw_rect(rx,ry,rw,rh,rcolor){
	var rect = new createjs.Shape();
	rect.graphics.beginFill(rcolor).drawRect(rx, ry, rw, rh);
	return rect;
	
}


//draw menu panel
function draw_menu_panel(px,py,pw,ph,p_top_h,p_color,top_color){
	var menu_panel = new createjs.Container();
	var corner_radius=10;
	
	//pw=panel_width=canvas.width*0.4
	//px=panel_x=canvas.width*0.3
	//py=100
	//p_top_h=40
	
	var panel_background = new createjs.Shape();
	panel_background.name = "panel_background";
	panel_background.graphics.beginFill(p_color).drawRoundRect(px, py, pw, ph, corner_radius);
	menu_panel.addChild(panel_background);
	
	var panel_top = new createjs.Shape();
	panel_top.name = "panel_top";
	panel_top.graphics.beginFill(top_color).drawRoundRect(px, py, pw, p_top_h+corner_radius, corner_radius);
	menu_panel.addChild(panel_top);

	var panel_body = new createjs.Shape();
	panel_body.name = "panel_body";
	panel_body.graphics.beginFill(p_color).drawRect(px, py+p_top_h, pw, ph-p_top_h-corner_radius);
	menu_panel.addChild(panel_body);
	
	return menu_panel;	
}

//draw main menu
function draw_main_menu(){
	top_label=new createjs.Text("Main Menu", font, "#ff7700")
	top_label.textAlign = "center";
	top_label.textBaseline = "middle";
	top_label.y=h*0.15;
	top_label.x=w*0.5;
	button_w=w*0.5
	button_h=h*0.1
	button_x=w*0.25

	startGamebutton1=create_button("New Game",button_x,h*0.25,button_w,h*0.1,font,"White","BlueViolet");
	startGamebutton1.addEventListener("click", goStartGame)
	startGamebutton2=create_button("Load Game",button_x,h*0.4,button_w,h*0.1,font,"White","BlueViolet");
	startGamebutton2.addEventListener("click", goLoadGame)
	startGamebutton3=create_button("Settings",button_x,h*0.55,button_w,h*0.1,font,"White","BlueViolet");
	startGamebutton3.addEventListener("click", goSettings)
	startGamebutton4=create_button("High Scores",button_x,h*0.7,button_w,h*0.1,font,"White","BlueViolet");
	startGamebutton4.addEventListener("click", goHighscore)
	//menu_panel=draw_menu_panel()
	cur_menu_panel=draw_menu_panel(w*0.2,h*0.1,w*0.6,h*0.75,h*0.1,"White","Azure")
	cur_menu_panel.addChild(top_label,startGamebutton1,startGamebutton2,startGamebutton3,startGamebutton4)
	return cur_menu_panel

}

//draw main menu
function draw_settings_menu(){
	top_label=new createjs.Text("Settings", font, "#ff7700")
	top_label.textAlign = "center";
	top_label.textBaseline = "middle";
	top_label.y=h*0.15;
	top_label.x=w*0.5;
	button_w=w*0.5
	button_h=h*0.1
	button_x=w*0.25

	//startGamebutton0=create_button("GamePlay Mode: Navigate Character",button_x,h*0.25,button_w,button_h,font,"White","BlueViolet");
	startGamebutton1=create_button("Music: OFF",button_x,h*0.25,button_w,button_h,font,"White","BlueViolet");
	startGamebutton2=create_button("Sound Effects: OFF",button_x,h*0.4,button_w,button_h,font,"White","BlueViolet");
	startGamebutton3=create_button("Language Audio: ON",button_x,h*0.55,button_w,button_h,font,"White","BlueViolet");
	startGamebutton4=create_button("Back to Main Menu",button_x,h*0.7,button_w,button_h,font,"White","BlueViolet");
	startGamebutton4.addEventListener("click", back2Menu)

	//menu_panel=draw_menu_panel()
	cur_menu_panel=draw_menu_panel(w*0.2,h*0.1,w*0.6,h*0.75,h*0.1,"White","Azure")
	cur_menu_panel.addChild(top_label,startGamebutton1,startGamebutton2,startGamebutton3, startGamebutton4)
	return cur_menu_panel

}

//draw main menu
function draw_start_game_menu(){
	top_label=new createjs.Text("Start Game", font, "#ff7700")
	top_label.textAlign = "center";
	top_label.textBaseline = "middle";
	top_label.y=h*0.15;
	top_label.x=w*0.5;

	button_w=w*0.5
	button_h=h*0.1
	button_x=w*0.25

	startGamebutton1=create_button("I speak: English",button_x,h*0.25,button_w,h*0.1,font,"White","BlueViolet");
	startGamebutton2=create_button("I want to learn: Chinese",button_x,h*0.4,button_w,h*0.1,font,"White","BlueViolet");
	console.log(html)
	var lang2_el = new createjs.DOMElement(html);
	lang2_el.x = w*0.5;
	lang2_el.y = h*0.25;
	stage.addChild(lang2_el)
	stage.update()


	startGamebutton3=create_button("Start Game",button_x,h*0.55,button_w,h*0.1,font,"White","BlueViolet");
	startGamebutton4=create_button("Back to Menu",button_x,h*0.7,button_w,h*0.1,font,"White","BlueViolet");
	startGamebutton3.addEventListener("click", startGame)
	startGamebutton4.addEventListener("click", back2Menu)
	
	

	//menu_panel=draw_menu_panel()
	cur_menu_panel=draw_menu_panel(w*0.2,h*0.1,w*0.6,h*0.75,h*0.1,"White","Azure")
	cur_menu_panel.addChild(top_label,startGamebutton1,startGamebutton2,startGamebutton3, startGamebutton4)
	return cur_menu_panel

}

function draw_game_screen(txt1,tx2,q_type,cur_score,cur_health,cur_level,tokens){
	gcontainer = new createjs.Container(); //game container
	gcontainer.addChild(hero);	
	
	top_panel=draw_rect(0,0,w,h*0.1,"DeepSkyBlue")
	gcontainer.addChild(top_panel);
	
	in_text=draw_txt(txt1)
	in_text.x=w*0.5;
	in_text.y=h*0.12;
	in_text.textBaseline = "top";
	gcontainer.addChild(in_text);
	
	out_text=draw_txt("")
	out_text.x=w*0.5;
	out_text.y=h*0.2;
	gcontainer.addChild(out_text);

	msg_text=draw_txt("Good Job!")
	msg_text.x=w*0.5;
	msg_text.y=h*1.5;
	gcontainer.addChild(msg_text);
	
	back2menuButton=create_button("Menu",w*0.80,0,w*0.2,h*0.1,font,"White","BlueViolet");
	back2menuButton.addEventListener("click", back2Menu)
	gcontainer.addChild(back2menuButton);
	
	//health_bar=new createjs.Shape();
	//health_bar.graphics.beginLinearGradientFill(["rgba(255,0,0,1)", "rgba(0,255,0,1)"], [0, 1], w*0.05, 20, w*0.05+100,  20).drawRect(w*0.05, 20, w*0.05+cur_health, 30);
	health_bar=draw_rect(w*0.02,h*0.02,w*0.2*cur_health/100,h*0.06,"Green")
	gcontainer.addChild(health_bar);
	
	
	score_text=draw_txt("score: "+cur_score)
	score_text.x=w*0.3;
	score_text.y=h*0.05;
	score_text.textBaseline = "middle";
	gcontainer.addChild(score_text);

	level_text=draw_txt("level: "+cur_level)
	level_text.x=w*0.6;
	level_text.y=h*0.05;
	level_text.textBaseline = "middle";
	gcontainer.addChild(level_text);
	
	
	max_size=0;
	//tokens=["welcome","to","this","game"]
	for (var b=0;b<tokens.length;b++){
		txt=tokens[b]
		var circle3 = new createjs.Shape();
		var label = new createjs.Text(txt, "bold 28px Arial", "#FFFFFF");//
		label.textAlign = "center";
		label.y = -7;

		bubble_size=label.getMeasuredWidth()*0.7;
		bubble_size=Math.max(bubble_size,canvas.height*0.08)
		if (bubble_size>max_size) max_size=bubble_size

		color_hex='#'+Math.floor(Math.random()*16777215).toString(16);
		circle3.graphics.beginFill(color_hex).drawCircle(0, 0, bubble_size);

		var bubble = new createjs.Container();
		bubble.x = w*0.1+Math.random()*w*0.8;
		bubble.y=h*0.1+Math.random()*h*0.8;
		bubble.name=txt;
		bubble.id=txt+b;
		bubble.addChild(circle3,label)
		gcontainer.addChild(bubble);
		bubbles.push(bubble)
		bubble_size_dict[txt]=bubble_size;
	}
	
	hh=hero.getBounds().height
	hw=hero.getBounds().width

	matrix=get_screen_matrix(hw*1.2+max_size*2,w*0.9,h*0.2,h*0.8,max_size)
	console.log(matrix)
	active_bubbles=[];
	standby_bubbles=[];
	for (var b=0; b<bubbles.length;b++){
		matrix_i=Math.floor((Math.random() * matrix.length-1) + 0);
		cur_coor=matrix[matrix_i]
		matrix.splice(matrix_i, 1);
		cur_x=cur_coor[0]
		cur_y=cur_coor[1]
		bubbles[b].x=cur_x;
		bubbles[b].y=cur_y;
		
	}



	
		
	
	return gcontainer;
}


function back2Menu(evt){
	current_view="main_menu"
	parent=evt.target.parent.parent;
	createjs.Tween.get(parent, {override: true}).to({x: -4*w}, (0.5 + 1 * 0.04) * 1500, createjs.Ease.linear);
	createjs.Tween.get(main_menu, {override: true}).to({x: 0}, (0.5 + 1 * 0.04) * 1500, createjs.Ease.linear);
}
function goStartGame(evt){	
	click_audio.play()
	click_audio.pause()
	//lang_audio.play()
	//lang_audio.pause()

	console.log("start game menu")
	current_view="start_game_menu"
	//alert("type: "+evt.type+" target: "+evt.target+" stageX: "+evt.stageX);
	createjs.Tween.get(main_menu, {override: true}).to({x: w*4}, (0.5 + 1 * 0.04) * 1500, createjs.Ease.linear);
	start_game_menu.x=-w;
	stage.addChild(start_game_menu);
	createjs.Tween.get(start_game_menu, {override: true}).to({x: 0}, (0.5 + 1 * 0.04) * 1500, createjs.Ease.linear);

	


}

function startGameTransitionComplete() {
	
	main_menu.x=-w;
	stage.update()
	}

function goLoadGame(){
	console.log("Loading Game")
	
}

function goSettings(){
	current_view="settings_menu"
	console.log("Settings Menu")
	createjs.Tween.get(main_menu, {override: true}).to({x: w*4}, (0.5 + 1 * 0.04) * 1500, createjs.Ease.linear);
	settings_menu.x=-w;
	stage.addChild(settings_menu);
	createjs.Tween.get(settings_menu, {override: true}).to({x: 0}, (0.5 + 1 * 0.04) * 1500, createjs.Ease.linear);
	
}

function goHighscore(){
	console.log("Highscore")
	
}

function startGame(){	
	loadText(lang1,lang2);		
	createjs.Tween.get(start_game_menu, {override: true}).to({x: w*4}, (0.5 + 1 * 0.04) * 1500, createjs.Ease.linear).call(function(){
		startFlag=true;
		});		
	
}


function deployQ(q_n){
	
	tn=0;
	cur_src_sent=src_sents[q_n]
	cur_trg_sent=trg_sents[q_n]
	cur_audio_fname=trg_audio_files[q_n]
	cur_audio_src=audio_url+lang2+'.'+cur_audio_fname+'.mp3'
	//lang_audio=load_audio(cur_audio_src,cur_audio_fname)
	//console.log(cur_audio_src)
	//lang_audio.src=cur_audio_src
	cur_correct_tokens=trg_tokens[q_n].split(" ")
	correct_token=cur_correct_tokens[tn]
	
}
function begin(){	
	current_view="in_game";	
	console.log("now we start playing the game");	
	//stage.addChild(hero);	
	
	deployQ(0)
	game_container=draw_game_screen(cur_src_sent,cur_trg_sent,"G",score,health,level,cur_correct_tokens);				
	stage.addChild(game_container);			
		
}