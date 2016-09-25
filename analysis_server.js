const express = require("express");
const app = express();

const request = require("request");
const PythonShell = require("python-shell");
const bodyParser = require("body-parser");

// Setting trust proxy ip.
app.set("trust proxy" , "loopback, uniquelocal");

app.use( bodyParser.json({
    limit:"50mb",
}) );

app.use( bodyParser.urlencoded( {
		extended : false ,
		limit : "20mb",
		parameterLimit : '10000'
} ) );


app.post("/go_analyze/:analysis_mode",function(req,res,next){
    var t_start = new Date();

    go_analyze(req.body.analysis_ele , req.params.analysis_mode).then(function(result){
        console.log("------------------------------------------------------------------------------");
        console.log(req.params.analysis_mode + " done. use time :" + ((new Date()-t_start)/1000));
        res.json(result);
    }).catch(function(err){
        console.log(err);
        res.status(500).send("you got "+ req.params.analysis_mode +"error!!!");
    })
})

app.listen(32777,function(){
	console.log("Analysis server is running at : localhost:32777");
});


function go_analyze(a_ele , a_mode){
	return new Promise(function(resolve,reject){
		var pyshell  = new PythonShell({
			"topics_fptree" : '/tools/Topics_for_fptree.py',
		    "brands_fptree" : '/tools/Brands_for_fptree.py',
		    "brands_pmi"    : '/tools/Brands_for_pmi.py'
		}[a_mode], {mode:"json"});

        // Send data.
		pyshell.send(a_ele);

		// If we get data from .py stdin , then we print it.
		pyshell.on('message' , function(message){
			resolve(message);
		});

		// If we get error from .py stderr , then we print it.
		pyshell.on('error' , function(err){
			console.log(err["traceback"]);
			reject(err["traceback"]);
		})
	})
}
