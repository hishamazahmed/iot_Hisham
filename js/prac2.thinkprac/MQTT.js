var mqtt = require('mqtt');

// connect to the message server
var client = mqtt.connect('mqtt://192.168.4.62');

// publish 'Hello mqtt' to 'test'
client.publish('topic', 'kashem');

// terminate the client
client.end();
