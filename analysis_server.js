const express = require("express");
const app = express();

const request = require("request");
const PythonShell = require("python-shell");
const bodyParser = require("body-parser");
const association = require("./tools/association_tool");

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


app.get("/",function(req,res,next){
    res.send("HiHi!!!");
})

app.post("/go_analyze/:analysis_mode",function(req,res,next){
    var t_start = new Date();
    // console.log( req.body.fptree);
    // {
    //     "topics_fptree" : association.Topics_for_fptree,
    //     "brands_fptree" : association.Brands_for_fptree,
    //     "brands_pmi"    : association.Brands_for_pmi
    // }[req.params.analysis_mode](req.body.analysis_ele)
    association.go_analyze(req.body.analysis_ele , req.params.analysis_mode).then(function(result){
        console.log(req.params.analysis_mode + " done. use time :" + ((new Date()-t_start)/1000));
        res.json(result);
    // new Promise(???).then.catch;

    }).catch(function(err){
        console.log(err);
        res.status(500).send("u got_error!!");
    })
    // res.json({
    //     "name":"Jeff",
    //     "issue":"I've missed Apple , and I feel so QQ ..."
    // });
})

app.listen(32777,function(){
	console.log("Server is running at : localhost:32777");
});
