fs = require('fs');
express = require('express');
bodyParser = require('body-parser')
app = express();
app.use(bodyParser.json());
var Validator = require('jsonschema').Validator;
var v = new Validator();

version = 1;
temperature = "Temp";
light = 'Light';
sound = "Sound";

var schema = fs.readFileSync("./schema.text");
schema = JSON.parse(schema);

app.get("/" + version + '/:sensor/:id', function (req, res) {
    var sensor = req.params.sensor;///
    var id = req.params.id;

    switch (sensor.toLowerCase()) {
        case "temp": {
            console.log(sensor);
            console.log(id);
            res.end(sensor + " -- " + id);
        }
        case "light": {
            console.log(sensor);
            console.log(id);
            res.end(sensor + " -- " + id);
        }
        case "sound": {
            console.log(sensor);
            console.log(id);
            res.end(sensor + " -- " + id);
        }

    }

    res.end(sensor + "  " + id);
});

app.post('/' + version + '/:sensor', function (req, res) {
    var sensor = req.params.sensor;
    var sensorData = "";
    var t = JSON.stringify(req.body);
    var m = JSON.parse(t);
    var result = v.validate(m, schema);
    if (result.errors == "") {
        console.log(m);
        switch (sensor.toLowerCase()) {
            case "temp": {

                var data = fs.readFileSync('./database.json')
                var x = JSON.parse(data);
                x.datas.push(m);
                fs.writeFileSync("./database.json", JSON.stringify(x));

                break;
            }
            case "light": {
                var data = fs.readFileSync('./database.json')
                var x = JSON.parse(data);
                x.datas.push(m);
                fs.writeFileSync("./database.json", JSON.stringify(x));

                break;


            }
            case "sound": {
                var data = fs.readFileSync('./database.json')
                var x = JSON.parse(data);
                x.datas.push(m);
                fs.writeFileSync("./database.json", JSON.stringify(x));
                break;

            }
        }

    } else {
        console.log(result.errors);
    }

    res.end();

});



var server = app.listen(8081, function () {

    var host = server.address().address
    var port = server.address().port
    console.log("Example app listening at http://%s:%s", host, port)

});