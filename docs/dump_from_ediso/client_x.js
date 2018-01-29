//request= require("request");
var request = require("request");
const mraa = require('mraa'); 

 analogPin0 = new mraa.Aio(0);
 analogPin1 = new mraa.Aio(1);
 analogPin2 = new mraa.Aio(2);


function sensorValue(sensorName){

    if(sensorName=="temp"){
        var analogTemp = analogPin0.read(); 
       // var analogValueFloat = analogPin0.readFloat();
        resistance = (1023-analogTemp)*10000.0/analogTemp;
        temp =1/(Math.log(resistance/10000.0)/3975+1/298.15)-273.15;
        return Math.round( temp * 1e2 ) / 1e2;
    }
    if(sensorName=="sound"){
        var analogValue = analogPin1.read(); 
     //   var analogValueFloat = analogPin1.readFloat();
        return Math.round( analogValue * 1e2 ) / 1e2;
    }
    if(sensorName=="light"){
        var  analogLight = analogPin2.read(); 
       // var  analogValueFloat = analogPin2.readFloat();
        var L_sensor= (1023-analogLight)*10/analogLight;
        return Math.round(L_sensor * 1e2 ) / 1e2;
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
        method: "PUT",
        url: "http://192.168.4.69:8081/1/"+sensorName,
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

