var Cylon = require('cylon');
 
Cylon.robot({
  connections: {
    edison: { adaptor: 'intel-iot' }
  },
 
  devices: {
    led: { driver: 'led', pin: 12 }
  },
 
  work: function(my) {
    every((1).second(), my.led.toggle);
  }
}).start();
