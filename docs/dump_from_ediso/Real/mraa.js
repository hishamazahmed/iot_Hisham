var udp = require('dgram');
var B = 3975;
const mraa = require("mraa");
var myAnalogPin = new mraa.Aio(0);
var myAnalogPin1 = new mraa.Aio(2);
var digitalPin4=  new mraa.Gpio(4);
digitalPin4.dir(mraa.DIR_OUT);

// creating a udp server
var server = udp.createSocket('udp4');

// emits when any error occurs
server.on('error',function(error){
  console.log('Error: ' + error);
  server.close();
});

// emits on new datagram msg
server.on('message',function(msg,info){
  console.log('Data from Client : ' + msg.toString());
  
    //Sending LDR Values
//    setInterval(function(){
//	var alight= myAnalogPin1.read();
//	var ares = (1023 -alight) * 10 / alight; 
  // 	 ldr=ares.toFixed(2);
    //	v=new Buffer(ldr);
//	console.log(ldr);    
//	
//server.send(v,0,v.length,info.port,'192.168.0.103',function(error){
  //      if(error){   client.close();  }
    //    else{     }});}, 10000);

if(msg=='gettemp')
    {
        var a = myAnalogPin.read();
        var resistance = (1023 - a) * 10000 / a; 
        var temp = 1 / (Math.log(resistance / 10000) / B + 1 / 298.15) - 273.15;
        temp=temp.toFixed(2);
	var max=new Buffer(temp);

        
server.send(max,0,max.length,info.port,'192.168.0.103',function(error){
        if(error){        client.close();       }
        else{  console.log('Temp sent !!!');    }       });
    }
else if(msg=='buzzer')
    {console.log('BUZZER')
	digitalPin4.write(1);
	setTimeout(function(){
	digitalPin4.write(0)
},2500);
}

});

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

server.bind(9999);


