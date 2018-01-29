var ThingSpeakClient = require('thingspeakclient');
var client = new 
ThingSpeakClient({server:'https://api.thingspeak.com/'});
client.attachChannel(376108, { writeKey:'UG7F2VM21TQHO3VH', 
readKey:'6UTYN6RL9YN1LB0C'}, function(err,res,req){});

client.updateChannel(376108, {field1: Sending Data}, function(err, resp) 
{
    if (!err && resp > 0) {
        console.log('update successfully. Entry number was: ' + resp);
    }
});
