
	
	var PORT = 3000;
	var HOST = '192.168.0.102';

	var dgram = require('dgram');
	var client = dgram.createSocket('udp4');
	
	var fs = require("fs");
	var stream = fs.createWriteStream("received.json",{ flags: 'w',
	encoding: "utf8",
	mode: 0666 });

	var server = dgram.createSocket("udp4");
	server.on("message", function (msg, rinfo) {
	console.log("server got: " + msg + " from " +
    rinfo.address + ":" + rinfo.port);
    stream.write(msg);
    server.send(Buffer.from('abc'), rinfo.port, '192.168.0.102')
	});

	server.on("listening", function () {
	var address = server.address();
	console.log("server listening " +
    address.address + ":" + address.port);
});

server.bind(3000);


	var B = 3975;
	var mraa = require("mraa");
	var myAnalogPin = new mraa.Aio(0);
	var a = myAnalogPin.read();
	var resistance = (1023 - a) * 10000 / a; 
	var temp = 1 / (Math.log(resistance / 10000) / B + 1 / 298.15) - 273.15;
	temp=temp.toFixed(2);
	
	
	var analogPin2= new mraa.Aio(2);
	var  analogLight = analogPin2.read();
    var L_sensor= (1023-analogLight)*10/analogLight;
    return Math.round(L_sensor * 1e2 ) / 1e2;
	light=L_sensor.toFixed(2);
	console.log("Temperature: " + temp +" degree C" );
	console.log(" light: " +light +" lux");
	
	var message=new Buffer("Temperature: " + temp +" degree C" + " light: " +light +" lux");
	
	
	
	
	





