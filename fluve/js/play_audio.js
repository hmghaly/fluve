var aud={};
var click_audio, bg_audio;
function app_audio(src){
	if (window.location.pathname.indexOf("android_asset") > -1) {
		src='/android_asset/www/'+src
	}
	cur_audio=new Media(src,function(){console.log("success")},onError);
	aud[src]=cur_audio;
	return cur_audio;
}



//create a cross platform audio object
function odio(src){
	if (app) return app_audio(src);
	else {
		var node = document.createElement("audio"); 
		node.id=src
		node.src=src
		node.controls=false;
		document.body.appendChild(node); 
		node.oncanplay=function(){
			console.log(src+": ready")
			aud[src]=node;
		};


	}
	return node;

}



function onError(e){
	alert("error loading audio:"+e+e.code+e.message)
	document.getElementById("demo").innerHTML = JSON.stringify(e);
}
