//Set the needed OS variables
var app = document.URL.indexOf( 'http://' ) === -1 && document.URL.indexOf( 'https://' ) === -1; //test whether the code is running on a browser or in an app

var isAndroid=false;
if (window.location.pathname.indexOf("android_asset") > -1) isAndroid=true;

var dt = new Date();
var cur_time = dt.getTime();
console.log(cur_time)

//Set Window/stage variables
var w,h;
var canvas, stage;
var hero;
var hero_w,hero_h;
var contour_dict={};
