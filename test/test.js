const request = require("request");
const fs = require("fs");

// Test -  Fptree for Soap. 
fs.readFile("test_data.json",function(err_fs,data){
    if(err_fs){console.log(err_fs)};
    // console.log(JSON.parse(data));
    request.post({
        url:"http://localhost:32777/go_analyze/topics_fptree" ,
        json:{"analysis_ele":{
                "fp_raw_data":JSON.parse(data)["fptree"],
                "keyword" :"htc"
            }},
        timeout:60000
    },function(err, httpResponse, body){
        if(err){console.log(err)};
        console.log(body);
    })
})

// test




// Fptree for Brand.


// PMI for Brand.
