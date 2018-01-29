var request = require("request");
const mraa = require('mraa');
var LCD = require('jsump_i2clcd');

var analogPin0 = new mraa.Aio(0);
var analogPin1 = new mraa.Aio(1);
var analogPin2 = new mraa.Aio(2);

var lightValue; var tempValue; var soundValue;
var lcdMessage = "";
var myLCD = new LCD.Jhd1313ml(6,0x3E, 0x62);

loop();

function loop(){
	tempValue = analogPin0.read()
	tempValue= Math.round(tempValue*.1);
	soundValue = analogPin1.read();
	soundValue = Math.round(soundValue*.1);
	lightValue = analogPin2.read();
	lightValue = Math.round(lightValue*.1);

	lcdMessage ="L:" + lightValue+"%, T"+ tempValue;
myLCD.setCurson(1,0)
console.log(lcdMessage);
myLCD.write(lcdMessage);

setTimeout(loop,1000);
}
	

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

var rowCount = 1;

var json = {
    name: "",
    id: 0,
    value: 0,
    unit: "",
    timestamp: ""



}





function sendData(sensorName,unit) {
    json.id = rowCount++;
    json.name = sensorName;
    json.value = sensorValue(sensorName);
    json.unit = unit;
    json.timestamp = new Date();
    request({
        method: "PUT",
        url: "http://127.0.0.1:8081/1/" + sensorName,
        json: true,
        headers: {
            "content-type": "application/json",
        },
        body: json


    }, function (err, res, body) {

    });
}


setInterval(function () {
    sendData('temp',"C");
}, 5000);
setInterval(function () {
    sendData('light',"LUX");
}, 5000);
setInterval(function () {
    sendData('sound',"dB");
}, 5000);
