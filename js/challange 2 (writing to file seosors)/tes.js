var fs  = require("fs");
//var c= require('./file_creator.js');
var rl= require('readline-specific');

var m=1;
var n=1;
var o=1;

//c.createFile();

function t(){
  
    var dt = new Date();
    console.log(dt);
rl.oneline('temp_sensor.txt', m, function(err, res) {
    if (err) console.error(err);	//handling error
    console.log(dt+","+res);	//print content
  });
  m++;
}

setInterval(t,2000);

