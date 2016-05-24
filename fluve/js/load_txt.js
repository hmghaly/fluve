var txt={};
var arr={};
var lang1="en";
var lang2="zh";
var lvl_line_dict={};
var lvl_names=[];
var av_lvls=[]; //available levles
var pre_req_dict={}; //prerequisits dictionary
var post_qui={}; //postquisite dictionary


var meta_files=["qtype.txt","prereq.txt","level_id.txt","image.txt","difficulty.txt","comment.txt"]
var loaded_txt_files=0;
var meta_loaded=false;
var meta_txt_keys=[];
var level_end_marker="what_like1" //Should be NA

var src_sents, trg_sents, trg_tokens, trg_audio_fnames, trg_os_sents;
var level_id_arr, qtype_arr, prereq_arr, difficulty_arr, comment_arr, image_arr;

for (var i=0;i<meta_files.length;i++){
	cur_fname=meta_files[i];
	cur_path="txt/"+cur_fname;
	authHeader=cur_path;
	$.ajax({
	    type: 'GET',
	    url:cur_path,
	    complete: function(result){
	    	f_key=this.url.split("/")[1].split(".")[0];

	    	res_txt=result.responseText;
	        txt[f_key]=res_txt;
	        meta_txt_keys.push(f_key)
	        loaded_txt_files+=1;
	        arr[f_key]=get_list(res_txt)
	        if (loaded_txt_files==meta_files.length) {
	        	
	        	//console.log(meta_txt_keys);
	        	level_id_arr=item_getter(arr["level_id"], 0)
	        	qtype_arr=item_getter(arr["qtype"], 0)
	        	prereq_arr=item_getter(arr["prereq"], 0)
	        	difficulty_arr=item_getter(arr["difficulty"], 0)
	        	comment_arr=item_getter(arr["comment"], 0)
	        	image_arr=item_getter(arr["image"], 0)
	        	prev_id=""; //Now we start setting up the dictionary identifying which lines correspond to which level
	        	for (var lvi=0;lvi<level_id_arr.length;lvi++){
	        		cur_lvl_id=level_id_arr[lvi]
	        		if (cur_lvl_id=="") cur_lvl_id=prev_id;
	        		if (cur_lvl_id!=prev_id) lvl_line_dict[cur_lvl_id]=[];
	        		lvl_line_dict[cur_lvl_id].push(lvi)
	        		prev_id=cur_lvl_id;
	        		cur_prereq=prereq_arr[lvi];
	        		if (cur_prereq!="") {
	        			split_pre=cur_prereq.split(";")
	        			cleaned_pre=[]
	        			for (pre_i=0;pre_i<split_pre.length;pre_i++){
	        				cur_pre=$.trim(split_pre[pre_i])
	        				cleaned_pre.push(cur_pre)
	        				if (post_qui[cur_pre]==null) post_qui[cur_pre]=[cur_lvl_id]
	        				else post_qui[cur_pre].push(cur_lvl_id)

	        			}
	        			pre_req_dict[cur_lvl_id]=cleaned_pre

	        		}
	        		if (lvl_names.indexOf(cur_lvl_id)==-1 &&cur_lvl_id!=level_end_marker) lvl_names.push(cur_lvl_id)
	        		if (cur_lvl_id==level_end_marker) {
	        			for (var lni=0;lni<lvl_names.length;lni++){
	        				cur_lname=lvl_names[lni]
	        				corr_pre=pre_req_dict[cur_lname]
	        				corr_post=post_qui[cur_lname]
	        				if (corr_pre==null) {
	        					av_lvls.push(cur_lname)
	        					corr_pre=[]
	        				}
	        				if (corr_post==null) corr_post=[]
	        				//console.log([cur_lname,corr_pre,corr_post])
	        			}
	        			av_lvls=shuffle(av_lvls);
	        			//console.log(av_lvls)
	        			break;
	        		}
	        		//if (cur_prereq!="") console.log([cur_lvl_id,cur_prereq])
	        	}
	        	meta_loaded=true;
	        	all_ready();

	        	//console.log(lvl_line_dict)
	    	}
	    }
	});
}

var lang_files=[lang1+".txt",lang2+".txt",lang2+"-os.txt"]
var loaded_lang_txt_files=0;
var lang_loaded=false;
var lang_txt_keys=[];

for (var i=0;i<lang_files.length;i++){
	cur_fname=lang_files[i];
	cur_path="txt/"+cur_fname;
	
	$.ajax({
	    type: 'GET',
	    url:cur_path,
	    complete: function(result){
	    	res_txt="";
	    	if (result.status==200) res_txt=result.responseText;
	    	f_key=this.url.split("/")[1].split(".")[0];
	        txt[f_key]=res_txt;
	        arr[f_key]=get_list(res_txt)

	        lang_txt_keys.push(f_key)
	        loaded_lang_txt_files+=1;
	        if (loaded_lang_txt_files==lang_files.length) {
	        	//console.log(lang_txt_keys)
	        	lang_loaded=true;
	        	src_2d=arr[lang1];
	        	src_sents=item_getter(src_2d, 0)
				trg_2d=arr[lang2];
	        	trg_sents=item_getter(trg_2d, 0)
	        	trg_tokens=item_getter(trg_2d, 1)
	        	trg_audio_fnames=item_getter(trg_2d, 2)
	        	trg_os_2d=arr[lang2+"-os"];
	        	trg_os_sents=item_getter(trg_os_2d, 0)
	        	all_ready();

	        	//console.log(trg_os_sents);
	    	}
	    }
	});
}