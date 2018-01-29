var udp = require('dgram');
var B = 3975;
const mraa = require("mraa");
var myAnalogPin = new mraa.Aio(0);


// creating a udp server
var server = udp.createSocket('udp4');

// emits when any error occurs
server.on('error',function(error){
  console.log('Error: ' + error);
  server.close();
});

// emits on new datagram msg
server.on('message',function(msg,info){
//console.log('Data from Client : ' + msg.toString());
  });
setInterval(	function(){
        var a = myAnalogPin.read();
        var resistance = (1023 - a) * 10000 / a; 
        var temp = 1 / (Math.log(resistance / 10000) / B + 1 / 298.15) - 273.15;
        temp=temp.toFixed(2);
	var max=new Buffer(temp);
	
        
server.send(max,0,max.length,9999,'192.168.4.201',function(error){
        if(error){        client.close();       }
        else{  console.log('Temp sent !!!');    }       });
   } , 5000);

//emits when socket is ready and listening for datagram msgs
server.on('listening',function(){
  var address = server.address();
  var port = address.port;
  var family = address.family;
  var ipaddr = address.address;
  console.log('Listening at ip:'+ ipaddr+', port' + port);
 
});

//emits after the socket is closed using socket.close();
server.on('close',function(){
  console.log('Socket is closed !');
});

//server.bind(9999);
