//Geometry Functions
function get_contour(cur_obj){
	cur_contour_dict={};
	obj_w=cur_obj.getBounds().width;
	obj_h=cur_obj.getBounds().height;
	half_diagonal=0.5*get_dist(0,0,obj_w,obj_h)
	
	mid_x=cur_obj.x+obj_w*0.5;
	mid_y=cur_obj.y+obj_h*0.5;
	for (var d0=0;d0<2*Math.PI*10;d0++){
		deg=d0*0.1;

		sin=Math.sin(deg);
		cos=Math.cos(deg);
		//console.log([deg,sin,cos])
		y_pt=mid_y+half_diagonal*sin;
		x_pt=mid_x+half_diagonal*cos;
		//console.log([x_pt,y_pt])
		//var rect = new createjs.Shape();
		//color="black";
		obj_under_pt=stage.getObjectUnderPoint (x_pt, y_pt)
		while (obj_under_pt==null) {
			y_pt-=sin;
			x_pt-=cos;
			obj_under_pt=stage.getObjectUnderPoint (x_pt, y_pt)
		}
		//if (stage.getObjectUnderPoint (x_pt, y_pt)==null) color="red"
		//rect.graphics.beginFill(color).drawRect(x_pt, y_pt, 2, 2);
		//stage.addChild(rect)
		cur_contour_dict[Math.round(deg*10)]=[x_pt-mid_x,y_pt-mid_y]
		
		//console.log(stage.getObjectUnderPoint (x_pt, y_pt))

	}

	return cur_contour_dict;
}

