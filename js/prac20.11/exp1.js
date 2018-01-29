

var express = require('express');
var app = express();

app.get('/', function (req, res) { //('/')/url is homepage
   res.send('Hello World,this is node.express');
                        console.log(req);///to see outout
                        console.log("\n\n ... \n");  //to see output
                        console.log(res);////to see output

})

var server = app.listen(1111, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening at http://%s:%s", host, port)
})