//MULTILING Game
var elevating=false;
var delta_x=5;
var delta_y=5;
var stageX, stageY;
var cur_audio;
var cur_audio_path;
var cur_lname; //current level name
var l_i=0 //current counter of levels
var lvl_list; //current level list of questions
var bubbles=[];
var all_ids=[];
var all_xs=[];
var bubble_dict={}
var deployed=false;
var max_x;
var q_i=0; //Question counter
var t_i=0; //token counter
var cur_token; //current correct token
var correct_tokens;
var correct_tokens_size;
var prev_wrong;
var all_toks=[];
var rep=[]; //repretoire
var rep_I=[]; //repretoire for important sentences
var rep_G=[]; //repretoire for others
var cur_qset;
var cur_qtype;
var click_url="audio/game/highup.mp3"
var lang_aud_inst=null;
var play_inst=null;
var cur_audio_loaded=false;
var tc_audio;

var completed_levels=[];

var paused=false;
function handleLoad(evt){
    console.log(evt.src+" loaded")
    if (evt.src.indexOf("audio/lang")>-1) {
        cur_audio_loaded=true;
        cur_audio_path=evt.src;
    }
}
function deployQ(){

    t_i=0;
    cur_qset=lvl_list[q_i]

    src_sent=cur_qset[0];
    q_type=cur_qset[1];
    cur_qtype=q_type;
    trg_sent=cur_qset[2];
    correct_tokens=cur_qset[3];
    cur_token=correct_tokens[t_i]
    q_tokens=shuffle(cur_qset[3].slice());
    cur_audio_path=cur_qset[4]
    //cur_audio=odio(cur_audio_path)
    if (app) {
        cur_audio=odio(cur_audio_path);
        tc_audio=odio(click_url)
        cur_audio.play()
    }  
    else {
        createjs.Sound.registerSound(click_url);  // register sound, which preloads by default
        createjs.Sound.registerSound(cur_audio_path);  // register sound, which preloads by default
        createjs.Sound.addEventListener("fileload", handleLoad);    
    }

    


    //test=createjs.Sound.registerSound(cur_audio_path,cur_audio_path);  // register sound, which preloads by default

    //cur_audio=odio(cur_audio_path)
    //cur_audio=myApp.odio(cur_audio_path)
    //createjs.Sound.registerSound(cur_audio_path);  // register sound, which preloads by default
    //createjs.Sound.on("fileload", this.loadHandler, this);
    //createjs.Sound.registerSound("path/to/mySound.ogg", "sound");
    /*
    function loadHandler(event) {
         // This is fired for each sound that is registered.
         var instance = createjs.Sound.play("sound");  // play using id.  Could also use full source path or event.src.
         //instance.on("complete", this.handleComplete, this);
         instance.volume = 0.5;
     }
     */
     


    text1=draw_txt(src_sent) //Draw Text1
    text1.y=h*0.05;
    text1.x=w*0.5;
    text1.scaleX=4;
    text1.scaleY=4;

    text1.textBaseline = "top";
    stage.addChild(text1);
    //deployed=true;

    text2=draw_txt("") //Draw Text2
    text2.y=h*0.25;
    text2.x=w*0.5;
    //if (app) {}
    //else 
    
    //createjs.Sound.play(cur_audio_path);

    if (q_type!="Q" && q_type!="R") {
        text2.text=trg_sent;
        createjs.Tween.get(text2)
            .wait(500)
            .call(function (){
                //cur_audio.play();
                //myApp.play(cur_audio)

                createjs.Tween.get(text2)
                    .to({x:canvas.width*0.5, y:canvas.height*0.5,scaleX:4,scaleY:4}, 4000)
                    .wait(3000)
                    .call(function (){
                        //cur_audio.play();
                        //myApp.play(cur_audio)
                        createjs.Tween.get(text2)
                            .to({ x: w*1.2}, 1000)
                            .call(function (){
                                draw_qbubbles(q_tokens)
                                
                                stage.removeChild(text2);
                                stage.update();

                            })

                })
            })

    }
    else {
        draw_qbubbles(q_tokens)
    }


    text2.textBaseline = "top";
    stage.addChild(text2);
    //console.log("finished deploying")
    //update_health(health)

} //end of deployQ


function clean_lvl(){
    for (var ii=0;ii<all_ids.length;ii++){
        cur_id=all_ids[ii];
        cur_bub=bubble_dict[cur_id];
        stage.removeChild(cur_bub);
    }
    all_ids=[];
    bubbles=[];
    correct_i=0;
    stage.removeChild(text1);
    bubble_dict={};
    deployed=false;
    //stage.removeAllChildren();
    //stage.addChild(hero);
    stage.update();


}

function draw_qbubbles(q_toks){
    all_xs=[];
    for (var t=0; t<q_toks.length; t++){
        cur_tok=q_toks[t]
        cur_id=cur_tok+"_"+t;
        
        cur_bubble=draw_bubble(cur_tok,cur_id, 30);
        if (all_xs.length==0) cur_bubble.x=w*0.5;
        else cur_bubble.x=all_xs[all_xs.length-1]+cur_bubble.width;
        
        all_xs.push(cur_bubble.x+1.2*cur_bubble.width)
        
        cur_bubble.y=0.25*h+(h*0.75-hh-cur_bubble.width)*Math.random();
        stage.addChild(cur_bubble);
        bubble_dict[cur_id]=cur_bubble;
        all_ids.push(cur_id)
        bubbles.push(cur_bubble)


    }
    deployed=true;
    stage.update();
    //console.log("draw_qbubbles function")

}



function add_toks(all_tok_arr,cur_toks){
    for (var tki=0;tki<cur_toks.length;tki++){
        if (all_tok_arr.indexOf(cur_toks[tki])==-1) all_tok_arr.push(cur_toks[tki])
    }
}

function new_lvl(){
    completed_levels.push(cur_lname)
    av_lvls=av_lvls.slice(1);
    new_levels=post_qui[cur_lname]
    if (new_levels!=null){
        //console.log("this level opens new levels "+cur_lname)
        for (var nli=0;nli<new_levels.length;nli++){
            cur_nlvl=new_levels[nli] //checking if each of the new levels opened by this
            //console.log("now checking "+cur_nlvl)
            cur_pre=pre_req_dict[cur_nlvl]
            pre_counter=0
            for (var p_i=0;p_i<cur_pre.length;p_i++){
                cur_plvl=cur_pre[p_i]
                //console.log("now checking if all the prerequistes for the newly opened level are satisfied "+cur_plvl)
                if (completed_levels.indexOf(cur_plvl)>-1) pre_counter+=1
            }
            //console.log(["checking pre",pre_counter])
            if (pre_counter==cur_pre.length) {
                //console.log("unlocked a new level "+cur_nlvl)
                av_lvls.splice(0, 0, cur_nlvl);
            }
        }

    }
    //console.log([av_lvls])
    l_i+=1;
    cur_lname=av_lvls[0];
    console.log(cur_lname)
    lvl_list=load_level(cur_lname)
    cur_I=shuffle(rep_I.slice()).slice(0,2)
    cur_G=shuffle(rep_G.slice()).slice(0,2)
    for (var ci=0; ci<cur_I.length;ci++) lvl_list.push(cur_I[ci])
    for (var ci=0; ci<cur_G.length;ci++) lvl_list.push(cur_G[ci])

    q_i=0;
    
    deployQ();


}

function check_ans(bub,pt){
    
    bub_name=bub.name;
    bub_id=bub.id;
    
    if (bub_name==cur_token) this.right_ans(bub,pt);
    else {
        if (bub_name!=prev_wrong) wrong_ans()
        prev_wrong=bub_name;

    }

}
function right_ans(bub,pt){
//what to do if the answer is right

    //click_audio.play();
    
    if (app) tc_audio.play()
    else instance=createjs.Sound.play(click_url);
    
    //click_audio.play();
    bub_x=bub.x;
    bub_y=bub.y;
    dx=bub_x-pt[0]
    dy=bub_y-pt[1]

    all_ids=remove(bub_id,all_ids)
    t_i+=1;
    if (t_i==correct_tokens.length) {
        lang_aud_inst=createjs.Sound.play(cur_audio_path);
        
        cur_time=now()   
    }
    cur_token=correct_tokens[t_i];
    //main success animation function
    createjs.Tween.get(bub)
        .to({x:bub_x+dx*5,y:bub_y+dy*5},200)
        .to({x:canvas.width*0.5, y:canvas.height*0.5,scaleX:3,scaleY:3}, 200)
        .wait(1000)
        .call(function (){
            if (t_i==correct_tokens.length) {
                //cur_audio.play();
                //myApp.play(cur_audio)
                q_type=cur_qset[1]
                toks=cur_qset[3]
                if (q_type=="I") {
                    cur_qset[1]="R"
                    rep_I.push(cur_qset)
                    add_toks(all_toks,toks)
                }
                else if (q_type=="R") {}
                else {
                    cur_qset[1]="R"
                    rep_G.push(cur_qset)
                    add_toks(all_toks,toks)
                }
                //console.log(all_toks)


            }
            //if (app) dur=Math.min(3000,cur_audio.getDuration)
            //else dur=Math.min(3000,cur_audio.duration)
            dur=2000
            stage.removeChild(bub)
            createjs.Tween.get(bub)
            .wait(dur)
            .call(function (){
                
                            if (t_i==correct_tokens.length) {

                                console.log("Well Done!")
                                clean_lvl();
                                q_i+=1;
                                if (q_i==lvl_list.length){
                                    alert("Level Completed!")
                                    new_lvl()

                                }
                                else {
                                    //console.log(this)
                                    //load_Q();
                                    //myNameSpace.deployQ();
                                    //console.log("myNameSpace")
                                    //console.log(myNameSpace)
                                    //console.log("MyApp")
                                    //console.log(MyApp)
                                    deployQ();

                                }
                            }

            })

            
        }); 
} //end of right answer


function wrong_ans(){
    canvas.style.background = 'Crimson';
    health-=1;
    if (health==0) alert("Game Over!")
    else update_health(health)

    console.log("wrong")
}

function update_health(h_value){
    if (h_value>70) color="Green"
    else {
        if (h_value>30) color="Yellow"
        else color="Crimson"
    }
    stage.removeChild(health_bar);
    width=w*(health/100)
    health_bar=draw_rect(0,h-10,width,10,color);
    stage.addChild(health_bar);

}


function start(event) {
            
            //display.removeEventListener("click", handleClick, false);
            var myApp = new myNameSpace.MyApp();
            
        }
 
        this.myNameSpace = this.myNameSpace || {};
        (function() {
            function MyApp() {
                
                this.init();

            }
 
            MyApp.prototype = {
                displayMessage:null,
                counter:0,
                click_audio:null,
                bg_audio:null,
                cur_audio:null,
                tickProxy: null,
                mouseupProxy: null,
                mousedownProxy: null,
                soundInstance: null,
                src: null,
 

 
                init: function() {

                    
                    stage.removeChild(start_btn);
                    stage.addChild(hero);
                    cur_lname=av_lvls[l_i];
                    lvl_list=load_level(cur_lname)
                    
                    deployQ();
                    health_bar=draw_rect(0,h-10,w,10,"Green");
                    stage.addChild(health_bar);


                    stage.update();



                    this.tickProxy = createjs.proxy(this.handleTick, this);
                    createjs.Ticker.addEventListener("tick", this.tickProxy);
                    createjs.Ticker.setFPS(60);
                    this.mouseupProxy=createjs.proxy(this.handleMouseUp, this);
                    stage.addEventListener("stagemouseup", this.mouseupProxy);
                    this.mousedownProxy=createjs.proxy(this.handleMouseDown, this);
                    stage.addEventListener("stagemousedown", this.mousedownProxy);

                    //c_audio_path="audio/game/highup.mp3"
                    //click_audio=odio(c_audio_path)

                    //createjs.Sound.registerSound(c_audio_path);  // register sound, which preloads by default

                    //createjs.Sound.addEventListener("fileload", loadProxy);
                    //createjs.Sound.registerSounds(sounds, audioPath);
                },
 
                handleTick: function() {
                    if (cur_qtype=="Q" || cur_qtype=="R") canvas.style.background = 'Purple';
                    else canvas.style.background = 'LightSkyBlue';
                    if (paused) return;
                    if (elevating) {
                        

                        hero.y-=delta_y;
                        hero.x+=delta_x;
                        
                    }
                    else hero.y+=delta_y;
                    if (hero.y+hh>0.9*h) hero.y=0.9*h-hh;
                    if (hero.x+hw>w) hero.x=w-hw;
                    if (hero.y<0) hero.y=0;
                    if (hero.x<0) hero.x=0; 

                    max_x=w;
                    
                    if (deployed==true){
                        new_xs=[]
                        for (var b=0;b<all_ids.length;b++){
                            cur_id=all_ids[b]
                            cur_bubble=bubble_dict[cur_id];
                            //col_pt=get_col(hero,hw,hh,cur_bubble,cur_bubble.width,contour_dict);
                            col_pt=col(hero,hw,hh,contour_dict,cur_bubble,cur_bubble.width)
                            if (col_pt.length==2) check_ans(cur_bubble,col_pt);

                            cur_bubble.x-=2;
                            new_xs.push(cur_bubble.x)
                            //if (cur_bubble.x+cur_bubble.width*0.5>max_x) max_x=cur_bubble.x+cur_bubble.width*0.5;
                            //if (max_x<w) max_x=w;
                            if (cur_bubble.x<0) {
                                all_xs.sort(function(a, b){return b-a})
                                max_x=Math.max(w,all_xs[0]+cur_bubble.width*2)
                                cur_bubble.x=max_x; 
                            }

                        }
                        all_xs=new_xs;
                    }



                    //if (play_inst!=null) console.log(play_inst.playState)
                    if (cur_audio_loaded){
                        createjs.Sound.play(cur_audio_path);
                        cur_audio_loaded=false;
                    }
                    stage.update();


                },
                handleMouseUp: function(evt) {
                    elevating=false;
                },
                handleMouseDown: function(evt) {
                    elevating=true;
                    stageX=evt.stageX;
                    stageY=evt.stageY;
                    delta_x=5;
                    if (hero.x>stageX) delta_x=-5;

                },




            }
 
            myNameSpace.MyApp = MyApp;
        }());