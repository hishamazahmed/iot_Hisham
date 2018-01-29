var fs = require("fs");

//console.log("Program Ended1");
var buf=new Buffer(100);
fs.readFile('iinput.txt', function (err, data) {
   if (err){
      console.log(err.stack);
      return;
    }
 buf=data;
 console.log(buf[1]);
console.log(buf[1].toString('ascii'));
   
  // console.log(data);
});

//console.log("Program Ended");