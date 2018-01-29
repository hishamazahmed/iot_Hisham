var fs=require ('fs');
fs.readFile ("33.json",function(err,data){
    jj=JSON.parse(data);
    console.log(jj.cars[2].models);
});

