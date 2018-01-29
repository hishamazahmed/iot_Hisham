var dgram = require("dgram");

var request = require("request");
const mraa = require('mraa');

var analogPin0 = new mraa.Aio(0);
// var analogPin1 = new mraa.Aio(1);
var analogPin2 = new mraa.Aio(2);

var digitalPin4= new mraa.Gpio(4);
digitalPin4.dir(mraa.DIR_OUT);

ip='.0.0.0.0'

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

var server = dgram.createSocket("udp4");
server.on("message", function (msg, rinfo) {
  port=rinfo.port;
  console.log(port);
  ip=rinfo.address;
  
  if(msg=="ldr"){
	  var val_light=sensorValue('light')+" ";
	  v= new Buffer(val_light);
	  server.send(v,0,v.length, port, ip,function(err){

	  });
   }


  if(msg=="temp"){
    var val_tem=sensorValue('temp')+" ";
    vt= new Buffer(val_tem);
    console.log(val_tem);
    server.send(vt,0,vt.length, port, ip,function(err){

    });
  }

  if(msg=='buz'){
    console.log("buzzer");
	digitalPin4.write(1);
	setTimeout(function(){
	digitalPin4.write(0);
},3000);
	
  }

  
    console.log("server got: " + msg + " from " +
    rinfo.address + ":" + rinfo.port);
    
    
});

server.on("listening", function () {
  var address = server.address();
  console.log("server listening " +
      address.address + ":" + address.port);
});

//setInterval(function(){
 // var val_light=sensorValue('light')+" ";
 // v= new Buffer(val_light);
 // server.send(v,0,v.length, 43211, ip,function(err){

 // });
//},1000);

server.bind(41234);
