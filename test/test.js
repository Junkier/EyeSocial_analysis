const request = require("request");
const fs = require("fs");

// This is test job.

// Main func.
var go_test = new Test_Job();
var promise_test = Object.keys(go_test).map(method=>go_test[method]());

Promise.all(promise_test).then(function(result){
    console.log("Good , All pass!!!!");
}).catch(function(err){
    console.log("Somebody is dead...");
    console.log(err);
})


function Test_Job(){
    return {
        "topic_fptree" : function(){
            return new Promise(function(resolve,reject){
                fs.readFile("test_topic_fptree.json",function(err_fs,data){
                    if(err_fs){console.log(err_fs)};
                    request.post({
                        url:"http://localhost:32777/go_analyze/topics_fptree" ,
                        json:{"analysis_ele":{
                                "fp_raw_data":JSON.parse(data)["fptree"],
                                "keyword" :"htc"
                            }},
                        timeout:60000
                    },function(err, httpResponse, body){
                        if(err){console.log(err); reject("Topic_Fptree is Err.");};

                        // Checking function.
                        if(body["FPtree"] && body["FPtree"][0]["Level1"]){
                            console.log("Topic_Fptree is find ^.<");
                        } else {
                            console.log("Topic_Fptree is dead.....");
                        }

                        resolve("Topic_Fptree is done.")
                    })
                })
            })
        },
        "brand_fptree" : function(){
            return new Promise(function(resolve,reject){
                fs.readFile("test_brand_fptree.json",function(err_fs,data){
                    if(err_fs){console.log(err_fs)};
                    request.post({
                        url:"http://localhost:32777/go_analyze/brands_fptree" ,
                        json:{"analysis_ele":JSON.parse(data)},
                        timeout:60000
                    },function(err, httpResponse, body){
                        if(err){console.log(err);reject("Brand_Fptree is Err.");};
                        // Checking function.
                        if(body["中華電信 中華電 中華 種花"] && body["中華電信 中華電 中華 種花"][0]["weight"]){
                            console.log("Brand_Fptree is find ^.<");
                        } else {
                            console.log("Brand_Fptree is dead.....");
                        }

                        resolve("Brand_Fptree is done.")
                    })
                })
            })
        },
        "brand_pmi"    : function(){
            return new Promise(function(resolve,reject){
                fs.readFile("test_brand_pmi.json",function(err_fs,data){
                    if(err_fs){console.log(err_fs)};
                    request.post({
                        url:"http://localhost:32777/go_analyze/brands_pmi" ,
                        json:{"analysis_ele":JSON.parse(data)},
                        timeout:60000
                    },function(err, httpResponse, body){
                        if(err){console.log(err);reject("Brand_PMI is Err.");};
                        // Checking function.
                        if(body["2015-11"] && body["2015-11"]["華為"]["小米"]["correl"]){
                            console.log("Brand_PMI is find ^.<");
                        } else {
                            console.log("Brand_PMI is dead.....");
                        }

                        resolve("Brand_PMI is done.")
                        // fs.appendFile("brand_pmi_good.json",JSON.stringify(body,null,4));
                    })
                })
            })
        }
    }
}
