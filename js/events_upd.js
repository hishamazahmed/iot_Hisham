var fs  = require("fs");//fs module build in
var events = require('events');//do 1

eventEmitter = new events.EventEmitter();//do 2

eventEmitter.on('sendtodatabase',function(data){
    fs.appendFile('database.txt',data,(error)=>{
        if(error) throw error;
    })
});

eventEmitter.emit('sendtodatabase',time+", "+ res+'\n');