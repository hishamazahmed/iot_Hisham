"use strict" ;


var B = 3975;
var mraa = require("mraa");
var myAnalogPin = new mraa.Aio(0);

function startSensorWatch(socket) {

    setInterval(function () {
        var a = myAnalogPin.read();
        console.log("Analog Pin (A0) Output: " + a);
        var resistance = (1023 - a) * 10000 / a; 
        var celsius_temperature = 1 / (Math.log(resistance / 10000) / B + 1 / 298.15) - 273.15;
        var fahrenheit_temperature = (celsius_temperature * (9 / 5)) + 32;
        console.log("Fahrenheit Temperature: " + fahrenheit_temperature);
        socket.emit("message", fahrenheit_temperature);


        var dgram = require("dgram");
        var fs = require("fs");
        var stream = fs.createWriteStream("received.json",{ flags: 'w',
          encoding: "utf8",
          mode: 0666 });
        
        var server = dgram.createSocket("udp4");
        server.on("message", function (msg, rinfo) {
          console.log("server got: " + msg + " from " +
            rinfo.address + ":" + rinfo.port);
            stream.write(msg);
            server.send(Buffer.from(fahrenheit_temperature), rinfo.port, 'localhost')
        });
        
        server.on("listening", function () {
          var address = server.address();
          console.log("server listening " +
              address.address + ":" + address.port);
        });
        
        server.bind(41234);

    }, 4000);
}

//////


