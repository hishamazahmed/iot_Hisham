"use strict" ;
var APP_NAME = "IoT Digital Write" ;
var Cfg = require("./utl/cfg-app-platform.js") ;    // get Cfg() 
constructor
var cfg = new Cfg() ;                               // init and config 

process.on("exit", function(code) {                 // define up front, 
    clearInterval(intervalID) ;
    }) ;


// confirm that we have a version of libmraa and Node.js that works
// exit this app if we do not

cfg.identify() ;                // prints some interesting platform 


if( !cfg.test() ) {
    process.exit(1) ;
}

if( !cfg.init() ) {
    process.exit(2) ;
}


// configure (initialize) our I/O pins for usage (gives us an I/O 

// configuration is based on parameters provided by the call to 


cfg.io = new cfg.mraa.Gpio(cfg.ioPin, cfg.ioOwner, cfg.ioRaw) ;
cfg.io.dir(cfg.mraa.DIR_OUT) ;                  // configure the gpio 


console.log("Using digital output pin number: " + cfg.ioPin) ;


// now we are going to write the digital output at a periodic interval

var digOut ;
var periodicActivity = function() {
    digOut = cfg.io.read() ;                    // get the current state 
    cfg.io.write(digOut?0:1) ;                  
    process.stdout.write(digOut?'0':'1') ;      // and write an unending 
} ;
var intervalID = setInterval(periodicActivity, 1000) ;  // start the

