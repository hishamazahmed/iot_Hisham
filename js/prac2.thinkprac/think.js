var ThingSpeakClient = require('thingspeakclient');
var client = new ThingSpeakClient({server:'https://api.thingspeak.com/'});
client.attachChannel(376095, { writeKey:'COMMYCT3T60PMAFT', readKey:'35EUNMWMA35E2SIB'}, function(err,res,req){});

client.updateChannel(376095, {field1: "real",field2 : "haque"}, function(err, resp) {
    if (!err && resp > 0) {
        console.log('update successfully. Entry number was: ' + resp);
    }
});