var fs = require("fs");

module.exports.jamal =kamal///called in another program by the name jamal
function kamal(){

                    var temp="";
                    var humidity="";
                    var accelerometer=""; 
            for (var k=0;k<101;k++)
                    {
                        temp += ("line "+k+",temp= "+getRandom(30,45)+"C\n");
                        humidity += ("line "+k+",humidity= "+getRandom(30,45)+"%\n");
                        accelerometer += ("line "+k+",accelerometer= "+getRandom(30,45)+"C\n");
                    }
            
            {
                fs.writeFileSync("temp_sensor.txt",temp);
                fs.writeFileSync("humidity_sensor.txt",humidity);
                fs.writeFileSync("accelerometer_sensor.txt",accelerometer)
                        }
        }


function getRandom(max,min) {
    var value= (Math.random() * (max - min)) + min;
    return value.toFixed(2); 
  }

