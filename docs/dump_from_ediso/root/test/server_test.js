

fs= require('fs');
express= require('express');
bodyParser = require('body-parser');
app= express();
app.use(bodyParser.json());  

var Validator = require('jsonschema').Validator;
var v = new Validator();

version=1;


var schema= fs.readFileSync("./schema.txt");
schema = JSON.parse(schema);


app.get("/"+version+'/:sensor',function(req,res){
    var sensor = req.params.sensor;
    var id = req.params.id;
    
    data= fs.readFileSync("./database.json");
    data= JSON.parse(data);
    var jsonObject="";
    for(i=0;i<data.datas.length;i++){
        if(data.datas[i].name==sensor){
            jsonObject+=JSON.stringify(data.datas[i])+"\n";
        }
    }

    // data.datas.find(function(item,i){
    //     if(item.name==sensor){
    //         jsonObject+=JSON.stringify(item)+"\n";
    //     }
    // });

    res.end(jsonObject);

    


});

app.put('/'+version+'/:sensor', function(req, res){
    var sensor = req.params.sensor;
    var sensorData="";
    var t= JSON.stringify(req.body);  
    var m= JSON.parse(t);
    var result = v.validate(m,schema);
    if(result.errors ==""){
        console.log(m);
        switch(sensor.toLowerCase()){
            case  "temp" :{
               
                var data=fs.readFileSync('./database.json')
                var x= JSON.parse(data);
                x.datas.push(m);
                fs.writeFileSync("./database.json",JSON.stringify(x));
                
                break;
            }
            case  "light" :{
                var data=fs.readFileSync('./database.json')
                    var x= JSON.parse(data);
                    x.datas.push(m);
                    
fs.writeFileSync("./database.json",JSON.stringify(x));
                  
                  break;
               
               
            }
            case  "sound" :{
                var data=fs.readFileSync('./database.json')
                var x= JSON.parse(data);
                x.datas.push(m);
                fs.writeFileSync("./database.json",JSON.stringify(x));
                  break;
              
            }
        }

    }else{
        console.log(result.errors);
    }
    res.end();
    
  });

  app.delete('/'+version+'/:sensor/:id', function(req, res){
    var sensor = req.params.sensor;
    var id = req.params.id;
    var data=fs.readFileSync('./database.json');
    data= JSON.parse(data);
    var index;
    
    data.datas.find(function(item,i){
        if(item.id==id && item.name==sensor){
           console.log(item);
            index=i;
        }
    });

    data.datas.splice(index,1);
    fs.writeFileSync("./database.json",JSON.stringify(data));

    res.end();
    
  });



var server = app.listen(8081, function () {
    
    var host = server.address().address
    var port = server.address().port
    console.log("Example app listening at http://%s:%s", host, port)
    
});
