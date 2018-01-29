var udp = require('dgram');

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
    setInterval(function(){

    ldr=200;
    v=new Buffer(ldr);
    server.send(v,0,v.length,info.port,'192.168.0.103',function(error){
        if(error){   client.close();  }
        else{     }});}, 5000);

if(msg=='gettemp')
    {
        var temp=25;
        w=new Buffer(temp);
        
server.send(w,0,w.length,info.port,'192.168.0.103',function(error){
        if(error){        client.close();       }
        else{  console.log('Data sent !!!');    }       });
    }
else if(msg=='buzzer')
    {console.log('BUZZER')}

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


