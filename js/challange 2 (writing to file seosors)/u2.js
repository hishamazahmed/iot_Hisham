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
    console.log(res);	//print content
  });
  m++;
}

function a(){
    var dt = new Date();
    console.log(dt);
    
    rl.oneline('accelerometer_sensor.txt', n, function(err, res) {
        if (err) console.error(err);	//handling error
        console.log(res);	//print content
      });
      n++;
    }

function h(){
    var dt = new Date();
    console.log(dt);
    
    rl.oneline('humidity_sensor.txt', o, function(err, res) {
        if (err) console.error(err);	//handling error
        console.log(res);	//print content
      });
      o++;
    }

setInterval(t,2000);
setInterval(a,9000);
setInterval(h,5000);

