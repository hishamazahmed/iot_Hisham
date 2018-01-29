var fs=require ('fs');
fs.readFile ("22.json",function(err,data){
    jj=JSON.parse(data);
    delete jj.cars.car1;
    jj.cars.car2='sadid';
    console.log(jj.cars);
});

