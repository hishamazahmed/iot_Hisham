var request = require("request");
const mraa = require('mraa'); 

var analogPin0 = new mraa.Aio(0);
var analogPin1 = new mraa.Aio(1);
var analogPin2 = new mraa.Aio(2);


function sensorValue(sensorName){

    if(sensorName=="temp"){
        var analogValue = analogPin0.read(); 
        var analogValueFloat = analogPin0.readFloat();
        
        return Math.round( analogValueFloat * 1e2 ) / 1e2;
    }
    if(sensorName=="sound"){
        var analogValue = analogPin1.read(); 
        var analogValueFloat = analogPin1.readFloat();
        return Math.round( analogValueFloat * 1e2 ) / 1e2;
    }
    if(sensorName=="light"){
        var analogValue = analogPin2.read(); 
        var analogValueFloat = analogPin2.readFloat();
        return Math.round( analogValueFloat * 1e2 ) / 1e2;
    }
}

var  rowCount=1;
var json=  {
    name: "",
    id: 0,
    value: 0,
    timestamp: ""
    
}


function getRandom(min, max) {
    var value= (Math.random() * (max - min)) + min;
    return Math.round( value * 1e2 ) / 1e2;
}


function sendData(sensorName){
    json.id=rowCount++;
    json.name=sensorName;
    json.value= sensorValue(sensorName);
    json.timestamp = new Date();
    request({
        method: "POST",
        url: "http://192.168.4.60:8081/1/"+sensorName,
        json:true,
        headers: {
            "content-type" : "application/json",
        },
        body: json
    
    
    },function(err,res,body){
        
    });
}


setInterval(function(){
    sendData('temp');
},5000);
setInterval(function(){
    sendData('light');
},5000);
setInterval(function(){
    sendData('sound');
},5000);
