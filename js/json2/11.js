var fs=require ('fs');
fs.readFile ("111.json",function(err,data){
    jj=JSON.parse(data);
    console.log(jj.name);
});

