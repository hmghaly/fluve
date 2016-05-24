var src_sent;
var trg_sent;
var trg_sent_os;
var trg_audio_fname;
var sent_mode; //(male/female/respect..)
var q_type; //where G: Guiding or I: Important or Q: Question

var correct_tokens;
var q_tokens; //question tokens
var collected_tokens=[]; //tokens collected so far


var q_i; //question counter (within the level)
var cur_level_name;
var cur_level_list;

var av_levels; //available levels
var completed_levels=[];
var rep=[];//repretoire

var audio_dir="audio/lang/"

function nextQ(){
	//Get the following question info
	cur_src_sent="";
	cur_trg_sent="";
	cur_trg_os_sent="";
	cur_audio_fname="";
	cur_sent_mode="";
	cur_sent_type="";
	cur_audio_obj="";
	next_audio_obj=""; //we will need to load the audio obj after this one to save time


}

function nextL(){
	//check the available levels to play and randomly choose a level name
	cur_levl_name="";
	cur_level_list=load_level(cur_levl_name)

}

//this is where we load all the info of the new level
function load_level(l_name){
	//prepare the level list 
	cur_lvl_lines=lvl_line_dict[l_name]
	cur_level_list=[]
	var regExp = /\(([^)]+)\)/;
	
	//console.log(matches[1]);
	//console.log(matches);

	for (var li=0; li<cur_lvl_lines.length;li++){
		cl=cur_lvl_lines[li]; //current line
		cur_src_sent=src_sents[cl];
		cur_src_sent = cur_src_sent.replace(/[{()}]/g, '');
		cur_sent_type=qtype_arr[cl];
		cur_img=image_arr[cl];
		cur_trg_sent_split=trg_sents[cl].split("%");
		if (trg_tokens[cl]=="") continue;
		cur_trg_tokens_split=trg_tokens[cl].split("%");
		cur_fname_split=trg_audio_fnames[cl].split("%");
		for (var si=0; si<cur_trg_sent_split.length;si++){
			cur_trg_sent=$.trim(cur_trg_sent_split[si]);

			cur_trg_tokens=$.trim(cur_trg_tokens_split[si]).split(" ");
			var markers = regExp.exec(cur_trg_sent);
			cur_mode="";
			if (markers!=null && markers[1].length<3) {
				cur_mode=markers[1];
				cur_trg_sent = cur_trg_sent.replace(markers[0],"")

			}
			cur_trg_sent = cur_trg_sent.replace(/[{()}]/g, '');

			cur_audio_fname=$.trim(cur_fname_split[si]);
			cur_audio_fpath=audio_dir+lang2+"/"+cur_audio_fname+".mp3"
			cur_trg_os_sent="";
			if (trg_os_sents.length>0) cur_trg_os_sent=trg_os_sents[si];
			cur_level_list.push([cur_src_sent,cur_sent_type,cur_trg_sent,cur_trg_tokens,cur_audio_fpath,cur_mode,cur_img,cur_trg_os_sent])


		}


	}
	//Add to the end of it some of the answered questions from the repretoire
	return cur_level_list;
}

function deployQ(){
	//draw the question bubbles

}