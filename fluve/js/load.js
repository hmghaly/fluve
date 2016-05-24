//load text
lang1='en'
lang2='fr'

function loadText(lang1,lang2){
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
				if (lang1_loaded && lang2_loaded && clusters_loaded && meta_loaded && corr_loaded) txt_loaded=true;
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
				if (lang1_loaded && lang2_loaded && clusters_loaded && meta_loaded && corr_loaded) txt_loaded=true;
			});
			$.get('txt/clusters.txt', function(data1) {
				clusters_txt = data1
				clusters_2d = get_list(clusters_txt);
				clusters_loaded=true;
				if (lang1_loaded && lang2_loaded && clusters_loaded && meta_loaded && corr_loaded) txt_loaded=true;
			});
			$.get('txt/meta.txt', function(data1) {
				meta_txt = data1
				meta_2d = get_list(meta_txt);
				meta_loaded=true;
				if (lang1_loaded && lang2_loaded && clusters_loaded && meta_loaded && corr_loaded) txt_loaded=true;
			});
			$.get('txt/corr.txt', function(data1) {
				corr_txt = data1
				corr_2d = get_list(corr_txt);
				corr_loaded=true;
				if (lang1_loaded && lang2_loaded && clusters_loaded && meta_loaded && corr_loaded) txt_loaded=true;
				});
	}