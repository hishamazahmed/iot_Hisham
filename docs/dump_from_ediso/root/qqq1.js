var mqtt = require('mqtt'); const thingsboardHost = 
"demo.thingsboard.io"; const accessToken = "58GCWwMIU1MDv0meXjoD"; const 
minTemperature = 17.5, maxTemperature = 30, minHumidity = 12, 
maxHumidity = 90;
 
var data = {
    temperature: minTemperature + (maxTemperature - minTemperature) * 
Math.random() ,
    humidity: minHumidity + (maxHumidity - minHumidity) * Math.random()
};
 console.log('Connecting to: %s using access token: %s', 
thingsboardHost, accessToken); var client = mqtt.connect('mqtt://'+ 
thingsboardHost, { username: accessToken });
 client.on('connect', function () {
    console.log('Client connected!');
    client.publish('v1/devices/me/attributes', 
JSON.stringify({"firmware_version":"1.0.1", "serial_number":"SN-001"}));
    console.log('Uploading temperature and humidity data once per second...');
    setInterval(publishTelemetry, 1000);
});
 function publishTelemetry() {
    data.temperature = genNextValue(data.temperature, minTemperature, 
maxTemperature);
    data.humidity = genNextValue(data.humidity, minHumidity, 
maxHumidity);
    client.publish('v1/devices/me/telemetry', JSON.stringify(data));
}
 function genNextValue(prevValue, min, max) {
    var value = prevValue + ((max - min) * (Math.random() - 0.5)) * 
0.03;
    value = Math.max(min, Math.min(max, value));
    return Math.round(value * 10) / 10;
};
//Catches ctrl+c event 
process.on('SIGINT', function () {
    console.log();
    console.log('Disconnecting...');
    client.end();
    console.log('Exited!');
    process.exit(2);
});
//Catches uncaught exceptions 
process.on('uncaughtException', 
function(e) {
    console.log('Uncaught Exception...');
    console.log(e.stack);
    process.exit(99);
});
