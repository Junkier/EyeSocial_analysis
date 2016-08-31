const PythonShell = require("python-shell");

exports.go_analyze = function(a_ele , a_mode){
	return new Promise(function(resolve,reject){
		// console.log(a_mode);
		// console.log(a_ele);
		var pyshell  = new PythonShell({
			"topics_fptree" : '/tools/Topics_for_fptree.py',
		    "brands_fptree" : '/tools/Brands_for_fptree.py',
		    "brands_pmi"    : '/tools/Brands_for_pmi.py'
		}[a_mode], {mode:"json"});
		//  {"fp_raw_data" : fptree_raw_data , "keyword" : req.body.keyword}
		pyshell.send(a_ele);

		// 這裡 O.K , 看起來卡在 python
		// If we get data from .py stdin , then we print it.
		pyshell.on('message' , function(message){
			console.log(message);
			// results = message ;
			// console.log(message);
			resolve(message);
		});
		// resolve("QQQQ");
		// If we get error from .py stderr , then we print it.
		pyshell.on('error' , function(err){
			console.log(err["traceback"]);
			reject(err["traceback"]);
		})

		// Like Finally block in try-catch.
		// pyshell.end(function(){
		// 	callback(results);
		// })
	})

}

// exports.Topics_for_fptree = function()
// 	// raw_data = {"fp_raw_data" : fptree_raw_data , "keyword" : req.body.keyword}
// 	// send data by stdin in json.
//
// })

// function Topics_for_fptree(raw_data,callback){
//
// 	// raw_data = {"fp_raw_data" : fptree_raw_data , "keyword" : req.body.keyword}
// 	// send data by stdin in json.
// 	var pyshell  = new PythonShell('/tools/Topics_for_fptree.py', {mode:"json" });
// 	pyshell.send(raw_data);
//
// 	var results ;
//
// 	// If we get data from .py stdin , then we print it.
// 	pyshell.on('message' , function(message){
// 		results = message ;
// 	});
//
// 	// If we get error from .py stderr , then we print it.
// 	pyshell.on('error' , function(err){
// 		console.log(err["traceback"]);
// 	})
//
// 	// Like Finally block in try-catch.
// 	pyshell.end(function(){
// 		callback(results);
// 	})
// }
// exports.Topics_for_fptree = Topics_for_fptree;
//
// function Brands_for_fptree(merged_data,callback){
//
// 	// merged_data = { "mergedQQ" : good_array , "brand": "台灣大哥大 台灣大 台哥大 台哥" }
// 	// send data by stdin in json.
// 	var pyshell  = new PythonShell('/tools/Brands_for_fptree.py', {mode:"json" });
// 	pyshell.send(merged_data);
//
// 	var results ;
//
// 	// If we get data from .py stdin , then we print it.
// 	pyshell.on('message' , function(message){
// 		results = message ;
// 	});
//
// 	// If we get error from .py stderr , then we print it.
// 	pyshell.on('error' , function(err){
// 		console.log(err["traceback"]);
// 	})
//
// 	// Like Finally block in try-catch.
// 	pyshell.end(function(){
// 		callback(results);
// 	})
// }
// exports.Brands_for_fptree = Brands_for_fptree;
//
// function Brands_for_pmi(merged_data,callback){
//
// 	// merged_data = { "merged_r_d" : good_array , "brands": chosen_brands }
// 	// send data by stdin in json.
//
// 	var pyshell  = new PythonShell('/tools/Brands_for_pmi.py', {mode:"json" });
// 	pyshell.send(merged_data);
// 	var results ;
//
// 	// If we get data from .py stdin , then we print it.
// 	pyshell.on('message' , function(message){
// 		results = message ;
// 	});
//
// 	// If we get error from .py stderr , then we print it.
// 	pyshell.on('error' , function(err){
// 		console.log(err["traceback"]);
// 	})
//
// 	// Like Finally block in try-catch.
// 	pyshell.end(function(){
// 		callback(results);
// 	})
//
// }
// exports.Brands_for_pmi = Brands_for_pmi;
