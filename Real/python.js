var request = require("request");
const mraa = require('mraa');

var analogPin0 = new mraa.Aio(0);
//var analogPin1 = new mraa.Aio(1);
//var analogPin2 = new mraa.Aio(2);


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


function sendData(sensorName,unit) {
    json.id = rowCount++;
    json.name = sensorName;
    json.value = sensorValue(sensorName);
    json.unit = unit;
    json.timestamp = new Date();
    request({
        method: "PUT",
        url: "http://192.168.4.122:5000/" + sensorName,
        json: true,
        headers: {
            "content-type": "application/json",
        },
        body: json


    }, function (err, res, body) {

    });
}


setInterval(function () {
	var d=sensorValue("temp");
	console.log (d);
    //sendData('temp',"C");
}, 1000);
