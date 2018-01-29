var request = require("request");
const mraa = require('mraa');

var analogPin0 = new mraa.Aio(0);
var analogPin1 = new mraa.Aio(1);
var analogPin2 = new mraa.Aio(2);


function sensorValue(sensorName) {

    if (sensorName == "temp") {
        var analogTemp = analogPin0.read();
         resistance = (1023-analogTemp)*10000.0/analogTemp;
         temp =1/(Math.log(resistance/10000.0)/3975+1/298.15)-273.15;
         return Math.round( temp * 1e2 ) / 1e2;
    }
    if (sensorName == "sound") {
        var analogValue = analogPin1.read();
        return Math.round( analogValue * 1e2 ) / 1e2;
   
    }
    if (sensorName == "light") {
        var  analogLight = analogPin2.read();
         var L_sensor= (1023-analogLight)*10/analogLight;
         return Math.round(L_sensor * 1e2 ) / 1e2;
 
    }
}

var flag=1;

var i=100;
var j=100;
var k=100;

function sendData() {

    
    var temp=sensorValue("temp");
    var sound=sensorValue("sound");
    var light=sensorValue("light");
    request({
        method: "POST",
        url: 
"https://api.thingspeak.com/update?api_key=4810LOSDBMXUMZMB&field1="+temp+"&field2="+sound+"&field3="+light,


    }, function (err, res, body) {

    });
}


setInterval(function () {
    sendData();
}, 5000);
