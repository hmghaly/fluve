//JQuery
function $$(el_id){
	return 	document.getElementById(el_id);
}

//Geometric
function get_dist(x1,y1,x2,y2){
	//delta_x=Math.abs(x1-x0)
	//delta_y=Math.abs(y1-y0)
	//delta_x2=Math.pow(delta_x,2)
	//delta_y2=Math.pow(delta_y,2)
	//dist=Math.pow(delta_x2+delta_y2,0.5)
	var d = Math.sqrt( (x2-=x1)*x2 + (y2-=y1)*y2 );
	return d
}


function new_col_OLD(cur_obj,obj_w,obj_h,cur_contour,cur_circle,cur_radius){
	obj_midx=cur_obj.x+obj_w*0.5;
	obj_midy=cur_obj.y+obj_h*0.5;

	obj_circle_dx=cur_circle.x-obj_midx;
	obj_circle_dy=cur_circle.y-obj_midy;
	
	if (obj_circle_dx==0) {
		angle=Math.PI*0.5;
		if (obj_midy>cur_circle.y) angle=Math.PI*1.5;
	}
	else angle=Math.atan(obj_circle_dy/obj_circle_dx)
	if (angle<0) angle+=Math.PI;
	angle_key=Math.round(10*angle)
	try {
		//console.log([angle_key,cur_contour[angle_key]])
		rel_pt=contour_dict[angle_key]
		col_pt=[rel_pt[0]+obj_midx,rel_pt[1]+obj_midy]
		return col_pt
	}
	catch (err){return []}
	
	if (get_dist(col_pt[0],col_pt[1],cur_circle.x,cur_circle.y)<=cur_radius) return col_pt
	else return []

}
//UI
function create_button(btn_txt,btn_x,btn_y,btn_width,btn_height,btn_font,btn_font_color,btn_color){
	
	var label = new createjs.Text(btn_txt, btn_font, btn_font_color);
	label.name = "label";
	label.textAlign = "center";
	label.textBaseline = "middle";
	max_width=label.getMeasuredWidth()
	if (max_width*1.1>btn_width) btn_width=max_width*1.1;
	label.x = btn_width/2;
	label.y = btn_height/2;

	var background = new createjs.Shape();
	background.name = "background";
	background.graphics.beginFill(btn_color).drawRoundRect(0, 0, btn_width, btn_height, 10);
	
	var button = new createjs.Container();
	button.name = "button";
	button.x = btn_x;
	button.y = btn_y;
	button.addChild(background, label);
	// setting mouseChildren to false will cause events to be dispatched directly from the button instead of its children.
	// button.mouseChildren = false;
	
	//stage.addChild(button);
	return button;

}

//Loading Audio
audio_manifest=[["aud_zh1","https://champolu.net:80/audio/zh.cháng_jià.mp3"],
				["aud_zh2","https://champolu.net:80/audio/zh.zhè_shì_yi_gè_bái_yi_zi.mp3"],
				["aud_zh3","https://champolu.net:80/audio/zh.lèi_de_gong_rén_hé_xué_sheng.mp3"]]
function loadAllAudio(aud_manifest,onComplete_fn){
		for (var i=0; i<aud_manifest.length; i++){
				var node = document.createElement("audio"); 
				cur_item=aud_manifest[i]
				node.id=cur_item[0]
				node.src=cur_item[1]
				node.controls=true
				document.body.appendChild(node); 
				node.onload=function(){
					console.log("loaded audio: "+node.id)
					//alert(node.readyState)
					//alert(node.HAVE_FUTURE_DATA)
					audio_counter+=1;
					if (audio_counter==aud_manifest.length){
						audio_loaded=true;
						onComplete_fn()
					}
				};

		}

}
function onAudioLoaded(){
	alert("Audio Loaded!")
}


function get_screen_matrix(x0,x1,y0,y1,delta){
	screen_matrix=[]
	for (var yc=y0;yc<y1;yc+=delta*1.15){
		for (var xc=x0;xc<x1;xc+=delta*1.15){
			
			screen_matrix.push([xc,yc])
		}
	}
	return screen_matrix
}


function draw_bubble(txt,x,y){
	btn_font="bold 24px Arial"
	btn_font_color="#FFFFFF"
	var circle3 = new createjs.Shape();

	var label = new createjs.Text(txt, "bold 24px Arial", "#FFFFFF");//
	label.textAlign = "center";
	label.y = -7;
	
	bubble_size=label.getMeasuredWidth()*0.55;
	bubble_size=Math.max(bubble_size,canvas.height*0.08)
	
	color_hex='#'+Math.floor(Math.random()*16777215).toString(16);
	circle3.graphics.beginFill(color_hex).drawCircle(0, 0, bubble_size);
	
	var bubble = new createjs.Container();
	bubble.x = x;
	bubble.y=y;
	bubble.name=txt;
	bubble.width=bubble_size;
	bubble.addChild(circle3,label)
	return bubble
	
}

function col(cur_obj,cur_obj_w,cur_obj_h,cur_circle){
	radius=cur_circle.width*0.5;
	obj_x0=cur_obj.x;
	obj_x1=cur_obj.x+cur_obj_w;
	obj_y0=cur_obj.y;
	obj_y1=cur_obj.y+cur_obj_h;
	cir_x0=cur_circle.x-radius;
	cir_x1=cur_circle.x+radius;
	cir_y0=cur_circle.y-radius;
	cir_y1=cur_circle.y+radius;
	if (obj_x0>=cir_x0 && obj_x0<=cir_x1){
		if (obj_y0>=cir_y0 && obj_y0<=cir_y1){
			return [obj_x0,obj_y0]
		}
		if (obj_y1>=cir_y0 && obj_y1<=cir_y1){
			return [obj_x0,obj_y1]
		}
		
	}
	if (obj_x1>=cir_x0 && obj_x1<=cir_x1){
		if (obj_y0>=cir_y0 && obj_y0<=cir_y1){
			return [obj_x1,obj_y0]
		}
		if (obj_y1>=cir_y0 && obj_y1<=cir_y1){
			return [obj_x1,obj_y1]
		}
		
	}
	if (cir_x0>=obj_x0 && cir_x0<=obj_x1){
		if (cir_y0>=obj_y0 && cir_y0<=obj_y1){
			return [cir_x0,cir_y0]
		}
		if (cir_y1>=obj_y0 && cir_y1<=obj_y1){
			return [cir_x0,cir_y1]
		}
		
	}
	if (cir_x1>=obj_x0 && cir_x1<=obj_x1){
		if (cir_y0>=obj_y0 && cir_y0<=obj_y1){
			return [cir_x1,cir_y0]
		}
		if (cir_y1>=obj_y0 && cir_y1<=obj_y1){
			return [cir_x1,cir_y1]
		}
		
	}	
	return []
	
}
//Deploy Question - not used
function deployQ1(){
correct_trg_tokens=["el","3arabeyyah","el","baidah"]
collected_trg_tokens=[]
screen_matrix=[]

btn_width=canvas.width*0.1;
btn_height=70;
starting_x=canvas.width*0.1;
end_x=canvas.width*0.8;
starting_y=canvas.height*0.3;
end_y=canvas.height*0.9;


for (var yc=starting_y;yc<end_y;yc+=btn_height*1.15){
	for (var xc=starting_x;xc<end_x;xc+=btn_width*1.15){
		
		screen_matrix.push([xc,yc])
	}
}


for (var ik=0; ik<correct_trg_tokens.length; ik++){
	cur_token_to_add=correct_trg_tokens[ik]
	cur_matrix_i=Math.floor((Math.random() * screen_matrix.length) + 0);
	cur_coords=screen_matrix[cur_matrix_i]
	//screen_matrix.splice(cur_matrix_i,1)
	btn_x=cur_coords[0];
	btn_y=cur_coords[1];
	new_screen_matrix=[];
	for (var sm=0;sm<screen_matrix.length;sm++){
		cur_item=screen_matrix[sm]
		cur_x=cur_item[0]
		cur_y=cur_item[1]
		if (cur_x==btn_x || cur_y==btn_y) continue;
		new_screen_matrix.push(cur_item)
	}
	screen_matrix=new_screen_matrix;
	//console.log([btn_x,btn_y])
	btn_font="bold 24px Arial"
	btn_font_color="#FFFFFF"
	color_hex='#'+Math.floor(Math.random()*16777215).toString(16);
	btn_color=color_hex
	//btn_width=250;
	//btn_height=60;
	cur_button=create_button(cur_token_to_add,btn_x,btn_y,btn_width,btn_height,btn_font,btn_font_color,btn_color)
	cur_button.name=cur_token_to_add;
	stage.addChild(cur_button)
	bubbles.push(cur_button)
	}
}

//Load Text - not used
	function loadText1(){
		lang1='en'
		lang2='fr'
		lang2_os=lang2+'-os'
		
		txt_path = "txt/_.txt"
		lang1_txt_path = txt_path.replace('_', lang1);
		lang2_txt_path = txt_path.replace('_', lang2);
		lang2_txt_os_path = txt_path.replace('_', lang2_os);

		$.get(lang1_txt_path, function(data) {
				src_txt = data
				src_2d = get_list(src_txt);
				src_sents = item_getter(src_2d, 0)
				num_columns = src_2d[0].length;
				src_audio_files = item_getter(src_2d, num_columns - 1)
				src_tokens = item_getter(src_2d, num_columns - 2)
				//console.log(src_sents)
				lang1_loaded=true;
				//if (lang1_loaded && lang2_loaded) doneLoading();
				if (lang1_loaded && lang2_loaded && clusters_loaded && meta_loaded && corr_loaded) doneLoading();
				//console.log(src_audio_files)
				//audio_path='http://champolu.com/game/audio/'
			});
			$.get(lang2_txt_path, function(data1) {
				trg_txt = data1
				trg_2d = get_list(trg_txt);
				trg_sents = item_getter(trg_2d, 0)
				num_columns = trg_2d[0].length;
				trg_audio_files = item_getter(trg_2d, num_columns - 1)
				trg_tokens = item_getter(trg_2d, num_columns - 2)
				lang2_loaded=true;
				//if (lang1_loaded && lang2_loaded && clusters_loaded && meta_loaded && corr_loaded) doneLoading();
			});
			$.get(lang2_txt_os_path, function(data1) {
				trg_os_txt = data1
				trg_os_2d = get_list(trg_os_txt);
				trg_os_sents = item_getter(trg_os_2d, 0)
				trg_os_loaded=true;
				if (lang1_loaded && lang2_loaded && clusters_loaded && meta_loaded && corr_loaded) doneLoading();
			});
			$.get('txt/clusters.txt', function(data1) {
				clusters_txt = data1
				clusters_2d = get_list(clusters_txt);
				clusters_loaded=true;
				if (lang1_loaded && lang2_loaded && clusters_loaded && meta_loaded && corr_loaded) doneLoading();
			});
			$.get('txt/meta.txt', function(data1) {
				meta_txt = data1
				meta_2d = get_list(meta_txt);
				meta_loaded=true;
				if (lang1_loaded && lang2_loaded && clusters_loaded && meta_loaded && corr_loaded) doneLoading();
			});
			$.get('txt/corr.txt', function(data1) {
				corr_txt = data1
				corr_2d = get_list(corr_txt);
				corr_loaded=true;
				if (lang1_loaded && lang2_loaded && clusters_loaded && meta_loaded && corr_loaded) doneLoading();
			});
			


	
	}
	
//main game functions
function load_audio(audio_src,audio_id){
	console.log("loading audio:"+audio_src)
	var node = document.createElement("audio"); 
	node.id=audio_id
	node.src=audio_src
	node.controls=true
	document.body.appendChild(node); 
	node.oncanplay=function(){
		console.log("loaded audio: "+node.id)
	};
	return node;
}

function load_img(img_src,img_id,onload_fn){
	console.log("loading img:"+img_src)
	var node = document.createElement("img"); 
	node.id=img_id
	node.src=img_src
	//node.controls=true
	document.body.appendChild(node); 
	node.onload=function(){
		console.log("loaded img: "+node.id)
		onload_fn()
	};
}

function get_contour(cur_obj){
		contour_dict={}
		for (var y=Math.ceil(cur_obj.y);y<cur_obj.y+cur_obj.getBounds().height;y++){
			//console.log(y)
			local_xs=[]
			for (var x=Math.ceil(cur_obj.x);x<cur_obj.x+cur_obj.getBounds().width;x++){
				//if (hero.hitTest(x,y)) console.log([x,y])
				if (stage.getObjectUnderPoint (x,y)==null) local_xs.push(x)
			}
			//console.log(local_xs)
			boundary_pts=[]
			for (var i=0; i<local_xs.length; i++){
				if (i>0 && local_xs[i]-local_xs[i-1]!=1){
					//console.log("first point to the left")
					//console.log([y,local_xs[i-1]])
					boundary_pts.push(local_xs[i-1])
					boundary_pts.push(local_xs[i])
				}
			
			}
			//console.log(boundary_pts)
			left_pt=cur_obj.x;
			right_pt=cur_obj.x+cur_obj.getBounds().width;
			if (boundary_pts.length>0){
				left_pt=boundary_pts[0]
				right_pt=boundary_pts[boundary_pts.length-1]
			}
			//console.log([y,left_pt,right_pt])
			contour_dict[y-cur_obj.y]=[left_pt-cur_obj.x,right_pt-cur_obj.x]
		}
		return contour_dict;

}

function get_contour1(cur_obj){
		contour_dict={}
		obj_h=cur_obj.getBounds().height;
		obj_w=cur_obj.getBounds().width;
		for (var y=0;y<obj_h;y++){
			cur_y=cur_obj.y+y;
			//console.log(y)
			local_xs=[]
			for (var x=Math.ceil(cur_obj.x);x<cur_obj.x+obj_w;x++){
				//if (hero.hitTest(x,y)) console.log([x,y])
				if (stage.getObjectUnderPoint (x,cur_y)==null) local_xs.push(x)
			}
			//console.log(local_xs)
			boundary_pts=[]
			for (var i=0; i<local_xs.length; i++){
				if (i>0 && local_xs[i]-local_xs[i-1]!=1){
					//console.log("first point to the left")
					//console.log([y,local_xs[i-1]])
					boundary_pts.push(local_xs[i-1])
					boundary_pts.push(local_xs[i])
				}
			
			}
			//console.log(boundary_pts)
			left_pt=cur_obj.x;
			right_pt=cur_obj.x+cur_obj.getBounds().width;
			if (boundary_pts.length>0){
				left_pt=boundary_pts[0]
				right_pt=boundary_pts[boundary_pts.length-1]
			}
			//console.log([y,left_pt,right_pt])
			contour_dict[y]=[left_pt-cur_obj.x,right_pt-cur_obj.x]
		}
		return contour_dict;

}


//simple collision detection
function s_coll(cur_obj,obj_w,obj_h,cur_circle,cur_circle_radius){
	//obj_w=cur_obj.getBounds().width;
	//obj_h=cur_obj.getBounds().height;
	//cur_circle_radius=cur_circle.width;
	ox0=cur_obj.x;
	ox1=cur_obj.x+obj_w;
	oy0=cur_obj.y;
	oy1=oy0+obj_h;
	cx0=cur_circle.x-cur_circle_radius;
	cx1=cur_circle.x+cur_circle_radius;
	cy0=cur_circle.y-cur_circle_radius;
	cy1=cur_circle.y+cur_circle_radius;

	if (cur_obj.x>cur_circle.x+cur_circle_radius) return []
	if (cur_circle.x-cur_circle_radius>cur_obj.x+obj_w) return []
	if (cur_circle.y-cur_circle_radius>cur_obj.y+obj_h) return []
	if (cur_obj.y>cur_circle.y+cur_circle_radius) return []
	if (get_dist(cur_circle.x,cur_circle.y,ox1,oy0)<cur_circle_radius) return [ox1,oy0]
	
	return []
	
}

//Collision detection for obj with contour and a circle
function col_obj_circle(cur_obj,obj_w,obj_h,cur_circle,cur_obj_contour,cur_circle_radius){
	//obj_w=cur_obj.getBounds().width;
	//obj_h=cur_obj.getBounds().height;
	if (cur_obj.x>cur_circle.x+cur_circle_radius) return []
	if (cur_circle.x-cur_circle_radius>cur_obj.x+obj_w) return []
	if (cur_circle.y-cur_circle_radius>cur_obj.y+obj_h) return []
	if (cur_obj.y>cur_circle.y+cur_circle_radius) return []
	
	o1_xs=[cur_obj.x,cur_obj.x+cur_obj.getBounds().width]
	o2_xs=[cur_circle.x-cur_circle_radius,cur_circle.x+cur_circle_radius]
	diffs=[]
	for (var o1_i=0;o1_i<2;o1_i++){
		for (var o2_i=0;o2_i<2;o2_i++){
			diffs.push(Math.abs(o1_xs[o1_i]-o2_xs[o2_i]))
		
		}
	}
	//diffs.sort()
	diffs.sort(function(a, b){return a-b});
	//console.log(diffs)
	if (diffs[0]>cur_circle_radius) return [];

	if (cur_obj.y>cur_circle.y-cur_circle_radius && cur_obj.y<cur_circle.y+cur_circle_radius) { 
		
		
		
		
		for (var y=cur_obj.y; y<cur_circle.y+cur_circle_radius;y++){
			cur_y=Math.ceil(y-cur_obj.y)
			span=cur_obj_contour[cur_y];
			if (typeof(span) == 'undefined') continue;
			left_pt=span[0]+cur_obj.x
			right_pt=span[1]+cur_obj.x
			left_pt_dist=get_dist(cur_circle.x,cur_circle.y,left_pt,y)
			right_pt_dist=get_dist(cur_circle.x,cur_circle.y,right_pt,y)
			//lt_rt=[]
			if (left_pt_dist<=cur_circle_radius){
				//lt_rt.push([left_pt_dist,y,left_pt])
				return [left_pt,y]
				console.log([y,left_pt,left_pt_dist])
				cur_circle.alpha = 1; 
				} 
			if (right_pt_dist<=cur_circle_radius){
				//lt_rt.push([right_pt_dist,y,right_pt])
				return [right_pt,y]
				console.log([y,right_pt,right_pt_dist])
				cur_circle.alpha = 1; 
				} 
			//if (left_pt_dist<right_pt_dist) return [y,left_pt]
			//else return [y,right_pt]
			}
			
		}	
	if (cur_obj.y+cur_obj.getBounds().height>cur_circle.y-cur_circle_radius && cur_obj.y+cur_obj.getBounds().height<cur_circle.y+cur_circle_radius) { 
		for (var y=cur_circle.y-cur_circle_radius; y<cur_obj.y+cur_obj.getBounds().height;y++){
			cur_y=Math.ceil(y-cur_obj.y)
			span=cur_obj_contour[cur_y];
			if (typeof(span) == 'undefined') continue;
			left_pt=span[0]+cur_obj.x
			right_pt=span[1]+cur_obj.x
			left_pt_dist=get_dist(cur_circle.x,cur_circle.y,left_pt,y)
			right_pt_dist=get_dist(cur_circle.x,cur_circle.y,right_pt,y)
			if (left_pt_dist<cur_circle_radius){
				//console.log("left")
				return [left_pt,y]
				console.log([y,left_pt,left_pt_dist])
				cur_circle.alpha = 1; 
				} 
			if (right_pt_dist<cur_circle_radius){
				//console.log("right")
				return [right_pt,y]
				console.log([y,right_pt,right_pt_dist])
				cur_circle.alpha = 1; 
				} 
			
			}
	
		
		//dragger.alpha = 1; 
		}
		return []

}


	function get_list(txt)
		{
		structured_list=[]
		lines=txt.split('\n');
		for (var i=0;i<lines.length;i++)
			{
			cur_line=lines[i];
			if (cur_line.length>1)
				{
				line_split=cur_line.split('\t');
				structured_list.push(line_split)
				}
			}
		return structured_list;
		}
	//shuffle an array to ensure randomness in questions
	function shuffle(array) {
		var currentIndex = array.length, temporaryValue, randomIndex ;

		// While there remain elements to shuffle...
		while (0 !== currentIndex) {

		// Pick a remaining element...
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;

		// And swap it with the current element.
		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
		}
	return array;
	}

	//gets the items of a certain column within a multidimensional array
	function item_getter(our_list,item_num){
		new_list=[]
		for (var i=0; i<our_list.length; i++){
			new_list.push(our_list[i][item_num])
			}
		return new_list
		}
