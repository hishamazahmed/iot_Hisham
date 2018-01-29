var fs  = require("fs");//fs module build in
var events = require('events');//do 1
var functioncalling = require('./write.js'); // own made module(user defined)***being called by its path
var functioncalling2 = require('./write.js');
var rl = require('readline-specific');//npm downloaded

eventEmitter = new events.EventEmitter();//do 2

eventEmitter.on('sendtodatabase',function(data){
    fs.appendFile('database.txt',data,(error)=>{
        if(error) throw error;
    })
});
var temp_file_line_no=1;
var hum_file_line_no=1;
var acc_file_line_no=1;

functioncalling.jamal();///
 
ttt=setInterval(function(){
    var time=new Date;
    var data='';
    rl.oneline('temp_sensor.txt',temp_file_line_no,function(err,res){
        if (err) console.error(err);
        eventEmitter.emit('sendtodatabase',time+", "+ res+'\n');
        console.log(time+","+ res+'\n');
    })

},300)
