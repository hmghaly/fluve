//JQuery
function $$(el_id){
	return 	document.getElementById(el_id);
}

function str(cur_obj){
	return JSON.stringify(cur_obj)
}

function remove(el,arr){
	var index = arr.indexOf(el);	
	if (index > -1) arr.splice(index, 1);
	return arr
}

function now(){
	t = new Date().getTime()
	return t;
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
