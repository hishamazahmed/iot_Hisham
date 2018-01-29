var Cylon = require('cylon');

var sensorData =

Cylon.robot({
  connections: {
    bluetooth: { adaptor: 'ble', uuid: '001018019b4b' }
  },

  devices: {
    wiced: { driver: 'wiced-sense' }
  },

  work: function(my) {
    my.wiced.getData(function(err, data) {
      if (!!err) {
        console.log("Error: ", err);
        return;
      }

	setInterval(console.log("Data: ", data), 5000);
    });
  }
});

setInterval(sensorData, 2000);

sensorData.start();
