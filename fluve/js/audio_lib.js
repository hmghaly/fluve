var aud={};
var click_audio, bg_audio
function app_audio(src){
	if (window.location.pathname.indexOf("android_asset") > -1) {
		src='/android_asset/www/'+src
	}
	cur_audio=new Media(src,function(){console.log("success")},onError);
	aud[src]=cur_audio;
	return cur_audio;
}



//create a cross platform audio object
function odio1(src){
	var app = document.URL.indexOf( 'http://' ) === -1 && document.URL.indexOf( 'https://' ) === -1; //test whether the code is running on a browser or in an app
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


function odio2(src,autoplay,onend){
	var app = document.URL.indexOf( 'http://' ) === -1 && document.URL.indexOf( 'https://' ) === -1; //test whether the code is running on a browser or in an app
	if (app) {
		if (window.location.pathname.indexOf("android_asset") > -1) src='/android_asset/www/'+src
		cur_audio=new Media(src,onend,function(){console.log("error loading audio in app")});
		if (autoplay) cur_audio.play()
		return cur_audio
	}
	else {
		var node = document.createElement("audio"); 
		node.id=src
		node.src=src
		node.controls=false;
		document.body.appendChild(node); 
		if (autoplay){
			node.oncanplay=function(){
				node.play()
			};	
		}
		node.addEventListener('ended', onend);
		//alert(JSON.stringify(node))
		return node;		
	}
}


function odio(src){
	var app = document.URL.indexOf( 'http://' ) === -1 && document.URL.indexOf( 'https://' ) === -1; //test whether the code is running on a browser or in an app
	if (app) {
		if (window.location.pathname.indexOf("android_asset") > -1) src='/android_asset/www/'+src
		cur_audio=new Media(src,function(){},function(){console.log("error loading audio in app")});
		//if (autoplay) cur_audio.play()
		return cur_audio
	}
	else {
		var node = document.createElement("audio"); 
		node.id=src
		node.src=src
		node.controls=false;
		document.body.appendChild(node); 
		//alert(JSON.stringify(node))
		return node;		
	}
}


function onError(e){
	alert("error loading audio:"+e+e.code+e.message)
	document.getElementById("demo").innerHTML = JSON.stringify(e);
}
