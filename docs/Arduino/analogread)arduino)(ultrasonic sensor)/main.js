var mraa = require('mraa');// Lib mraa: https://github.com/intel-iot-devkit/mraa/blob/master/docs/edison.md
console.log('MRAA Version: ' + mraa.getVersion());// Write the mraa version to the console


/* Constant value use for calculate the distance.
 * Example, if Δt = 500 microseconds, we know it took 250 microseconds for 
 * the ping to hit an object and another 250 microseconds to come back.
 * The approximate speed of sound in dry air is given by the formula:
 * c = 331.5 + 0.6 * [air temperature in degrees Celsius]
 * At 20°C, c = 331.5 + 0.6 * 20 = 343.5 m/s
 * If we convert the speed in centimetres per microseconds we get:
 * c = 343.5 * 100 / 1000000 = 0.03435 cm/ss
 * The distance is therefore, D = (Δt/2) * c
 * or D = 250 * 0.03435 = 8.6 cm
 */
var ULTRASONIC_SPREADING_VELOCITY_IN_AIR = 0.0003435;// milimeters per nanoseconds

var INITIATE_SIGNAL_TIME = 10000/*ns*/, TIME_FOR_NO_OBJECT_PRESENT = 38000000/*ns*/; 

var echoPin    = new mraa.Gpio(15),// pin J18-2
    triggerPin = new mraa.Gpio(14);// pin J18-1

echoPin.dir(mraa.DIR_IN);// sets the gpio direction to input
triggerPin.dir(mraa.DIR_OUT);// sets the gpio direction to output

triggerPin.write(0);// Make sure the output is LOW



var calculateDistanceFromTime = function(time) {
    if (time >= TIME_FOR_NO_OBJECT_PRESENT) return -1;
    return time / 2 * ULTRASONIC_SPREADING_VELOCITY_IN_AIR;
};

var GetDistance = function() {
    
    var promise = new Promise(function(resolve, reject) {
        triggerPin.write(1);// Sends the 'start' signal to the ultrasonic sensor
        
        var time = process.hrtime();// Initial time
        var tenMicroSecondsFlag = true;
        while (tenMicroSecondsFlag) {
            var diff = process.hrtime(time);// Gets the time elapsed
            diff = diff[0] * 1e9 + diff[1];// Converts the object into nanoseconds
            if (diff >= INITIATE_SIGNAL_TIME) {
                triggerPin.write(0);// Resets the trigger pin
                tenMicroSecondsFlag = false;
            }
        }
        
        
        while (echoPin.read() === 0) {};// Waits until first HIGH is read
        time = process.hrtime();// Initial echo time
        while (echoPin.read() === 1);// Waits until LOW is read
        var diff = process.hrtime(time);// Gets the time elapsed
                
        time = diff[0] * 1e9 + diff[1];// Converts the object into nanoseconds
        resolve({
            time: time,
            distance: calculateDistanceFromTime(time)
        });
    });
    
    return promise;
};


var task = function() {
    console.log("New cycle...");
    GetDistance()
    .then(function(result) {
        console.log("Distance is " + result.distance + "mm [" + result.time + "ns]");// Prints the current distance
        setTimeout(task, 500);
    })
    .catch(function(error) {console.log(error)});// Let's print the error if any
};


function exitHandler(cleanup, err) {
    if (cleanup) {
        triggerPin.write(0);// Make sure the output is LOW
        console.log("Cleaned up!");
    }
    if (err) console.log(err.stack);
    process.exit();
}

process.on('exit', exitHandler.bind(null, true));
process.on('SIGINT', exitHandler.bind(null, true));
process.on('uncaughtException', exitHandler.bind(null));


console.log("Started!");
task();