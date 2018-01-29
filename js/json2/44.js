var fs = require ("fs");
fs.readFile ("44.json",function(err,data){
    //var 
    var myJSON = JSON.parse(data);
    console.log(JSON.stringify(myJSON));
    //console.log(myJSON);
});
