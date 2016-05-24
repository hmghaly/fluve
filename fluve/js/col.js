function get_col(cur_obj,obj_w,obj_h,cur_cir,cir_size,cur_contour){
	col_pt=[]


	if (cur_obj.x<cur_cir.x-cir_size*0.5 && cur_cir.x-cir_size*0.5-cur_obj.x<obj_w) {
		if (cur_obj.y<cur_cir.y-cir_size*0.5 && cur_cir.y-cir_size*0.5-cur_obj.y<obj_h) {
			col_pt=new_col(cur_obj,obj_w,obj_h,cur_contour,cur_cir,cir_size*0.5)

			//col_pt=col_obj_circle(hero,hero_w,hero_h,cur_bubble,contour_dict,bubble_size*0.5)
			//cur_bubble.alpha=0.7;
			//collision=true;
		}
		else if (cur_obj.y>cur_cir.y-cir_size*0.5 && cur_obj.y<cur_cir.y+cir_size*0.5) {
			col_pt=new_col(cur_obj,obj_w,obj_h,cur_contour,cur_cir,cir_size*0.5)

		//if (get_dist(hero.x+hero_w,hero.y+hero_h,cur_bubble.x,cur_bubble.y)=<bubble_size*0.5) collision=true;
			//dist=get_dist(hero.x+hero_w,hero.y+hero_h,cur_bubble.x,cur_bubble.y)
			//col_pt=col_obj_circle(hero,hero_w,hero_h,cur_bubble,contour_dict,bubble_size*0.5)
			//collision=true;
			//cur_bubble.alpha=0.7;
		}
	}
	else if (cur_obj.x>cur_cir.x-cir_size*0.5 && cur_obj.x<cur_cir.x+cir_size*0.5) {

		if (cur_obj.y<cur_cir.y-cir_size*0.5 && cur_cir.y-cir_size*0.5-cur_obj.y<obj_h) {
			col_pt=new_col(cur_obj,obj_w,obj_h,cur_contour,cur_cir,cir_size*0.5)
			//col_pt=col_obj_circle(hero,hero_w,hero_h,cur_bubble,contour_dict,bubble_size*0.5)
			//collision=true;
			//cur_bubble.alpha=0.1;
		}
		else if (cur_obj.y>cur_cir.y-cir_size*0.5 && cur_obj.y<cur_cir.y+cir_size*0.5) {
			col_pt=new_col(cur_obj,obj_w,obj_h,cur_contour,cur_cir,cir_size*0.5)
			//col_pt=col_obj_circle(hero,hero_w,hero_h,cur_bubble,contour_dict,bubble_size*0.5)
			//collision=true;
			//cur_bubble.alpha=0.1;
		}
		

	}
	return col_pt;
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


function new_col(cur_obj,obj_w,obj_h,cur_contour,cur_circle,cur_radius){
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
	angle_key=str(Math.round(10*angle))
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

function new_col1(cur_obj,obj_w,obj_h,cur_contour,cur_circle,cur_radius){
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

function col(cur_obj,obj_w,obj_h,cur_contour,cur_circle,cir_dia){
	obj_x=cur_obj.x;
	obj_y=cur_obj.y;
	cir_x=cur_circle.x;
	cir_y=cur_circle.y;
	radius=cir_dia*0.5;


	min_x=Math.min(obj_x,cir_x-radius)
	max_x=Math.max(obj_x+obj_w,cir_x+radius)
	min_y=Math.min(obj_y,cir_y-radius)
	max_y=Math.max(obj_y+obj_h,cir_y+radius)
	if (max_x-min_x<=obj_w+cir_dia && max_y-min_y<=obj_h+cir_dia) {
		obj_midx=obj_x+obj_w*0.5;
		obj_midy=obj_y+obj_h*0.5;

		obj_circle_dx=Math.abs(cir_x-obj_midx);
		obj_circle_dy=Math.abs(cir_y-obj_midy);
		
		if (obj_circle_dx==0) {
			angle=Math.PI*0.5;
			if (obj_midy>cir_y) angle=Math.PI*1.5;
		}
		//else angle=Math.atan(obj_circle_dy/obj_circle_dx)
		else angle= Math.atan2(obj_circle_dy, obj_circle_dx)
		if (cir_x>=obj_midx){
			if (cir_y>=obj_midy) final_angle=angle
			else final_angle=Math.PI*2-angle

		}
		else{
			if (cir_y>=obj_midy) final_angle=Math.PI-angle
			else final_angle=Math.PI+angle

		}
		if (angle<0) angle+=2*Math.PI;
		angle_key=Math.round(10*final_angle)
		rel_pt=contour_dict[angle_key]

		//console.log([obj_circle_dx,obj_circle_dy,angle_key,cur_circle.id])

		//console.log(angle_key)
		//console.log(rel_pt)
		if (rel_pt==null) return []
		col_pt=[rel_pt[0]+obj_midx,rel_pt[1]+obj_midy]
		if (get_dist(col_pt[0],col_pt[1],cir_x,cir_y)<=radius) return col_pt
		else return []

		/*
		try {
			console.log([angle_key,cur_contour[angle_key]])
			rel_pt=contour_dict[angle_key]
			col_pt=[rel_pt[0]+obj_midx,rel_pt[1]+obj_midy]
			return col_pt
		}
		catch (err){return []}
		

			*/

	}
	return [];


}