var dgram = require("dgram");


var request = require("request");
const mraa = require('mraa');

var analogPin0 = new mraa.Aio(0);
// var analogPin1 = new mraa.Aio(1);
var analogPin2 = new mraa.Aio(2);


function sensorValue(sensorName) {

    if (sensorName == "temp") {
        var analogTemp = analogPin0.read();
         resistance = (1023-analogTemp)*10000.0/analogTemp;
         temp =1/(Math.log(resistance/10000.0)/3975+1/298.15)-273.15;
         return Math.round( temp * 1e2 ) / 1e2;
    }
    
    if (sensorName == "light") {
        var  analogLight = analogPin2.read();
         var L_sensor= (1023-analogLight)*10/analogLight;
         return Math.round(L_sensor * 1e2 ) / 1e2;

    }
}



port=1000;
var i=0;
var server = dgram.createSocket("udp4");
server.on("message", function (msg, rinfo) {
  port=rinfo.port;
  console.log(port);
  
  if(port==43222){
    var val_tem=sensorValue('temp')
   // server.send(new Buffer(val_tem,'utf8'), port, 'localhost')
  }

  if(port==43223){
    console.log("buzzer");
  }

  
    console.log("server got: " + msg + " from " +
    rinfo.address + ":" + rinfo.port);
    
    
});

server.on("listening", function () {
  var address = server.address();
  console.log("server listening " +
      address.address + ":" + address.port);
});

setInterval(function(){
        var val_light =new  Buffer('sadid');
	
        console.log(val_light);
  server.send(val_light,0,val_light.length, 40321, 
'localhost',function(err){
	console.log("sd");
});
},1000);

server.bind(41234);
