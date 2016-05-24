var score=0;
var health=100;
//var min_bubble_size=canvas.height*0.08;

//draw_txt
function draw_txt(txt){
	cur_font = "bold 24px Arial"
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

function draw_btn(txt){
	var background = new createjs.Shape();
	background.name = "background";
	background.graphics.beginFill("red").drawRoundRect(0, 0, 150, 60, 10);
	
	var label = new createjs.Text(txt, "bold 24px Arial", "#FFFFFF");
	label.name = "label";
	label.textAlign = "center";
	label.textBaseline = "middle";
	label.x = 150/2;
	label.y = 60/2;
	
	var button = new createjs.Container();
	button.addChild(background, label);
	return button
}


function draw_game_env(){
	draw_score(); //score
	draw_health(); //health
	draw_rep(); //repretoire button
	draw_set(); //settings button
	draw_back2menu(); //back 2 menu button

}

function draw_score(){

}

function draw_health(){
	
}

function draw_rep(){
	
}

function draw_set(){
	
}

function draw_back2menu(){
	
}

function draw_bubble(bubble_txt,bubble_id, min_size){
		min_size=canvas.height*0.08;
		var circle3 = new createjs.Shape();
		var label = new createjs.Text(bubble_txt, "bold 28px Arial", "#FFFFFF");//
		label.textAlign = "center";
		label.y = -7;

		bubble_size=label.getMeasuredWidth()*0.55; //the size here is basically the radius
		bubble_size=Math.max(bubble_size,min_size)

		color_hex='#'+Math.floor(Math.random()*16777215).toString(16);
		circle3.graphics.beginFill(color_hex).drawCircle(0, 0, bubble_size);
		circle3.name=bubble_txt;
		circle3.id=bubble_id;
		circle3.width=bubble_size*2;

		var bubble = new createjs.Container();
		bubble.width=bubble_size*2; //bubble width is the diameter
		//bubble.x = w*0.1+Math.random()*w*0.8;
		//bubble.y=h*0.1+Math.random()*h*0.8;
		//bubble.x = x0+bubble_size;
		//bubble.y=y0+bubble_size+Math.random()*(h*0.6-bubble_size);
		//x0+=bubble_size*2;
		//y0+=bubble_size*2*orientation;

		bubble.name=bubble_txt;
		bubble.id=bubble_id;
		bubble.addChild(circle3,label)
		return bubble;

}
