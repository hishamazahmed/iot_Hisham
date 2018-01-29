
var request = require("request");
const mraa = require('mraa'); 
// read analog data from edison anagol pin
var analogPin0 = new mraa.Aio(0);
var analogPin1 = new mraa.Aio(1);
var analogPin2 = new mraa.Aio(2);

// function for reading sensor data..
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

// jason object 
var json=  {
    name: "",
    id: 0,
    value: 0,
    unit: "",
    timestamp: ""
    
}


// send data to the server..
function sendData(sensorName,unit){
    json.id=rowCount++;
    json.name=sensorName;
    json.value= sensorValue(sensorName);
    json.unit = unit;
    json.timestamp = new Date();
    request({
        method: "PUT",
        url: "http://192.168.4.29:8081/1/"+sensorName,
        json:true,
        headers: {
            "content-type" : "application/json",
        },
        body: json
    
    
    },function(err,res,body){
        
    });
}

// set interval 5 second to send temprature sensor data 
setInterval(function(){
    sendData('temp','Cel');
},5000);

// set interval 5 second to send Light sensor data 
setInterval(function(){
    sendData('light','Lux');
},5000);

// set interval 5 second to send Sound sensro data 
setInterval(function(){
    sendData('sound','Dbl');
},5000);
