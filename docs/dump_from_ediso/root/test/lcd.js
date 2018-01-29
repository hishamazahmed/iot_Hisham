var mraa = require ('mraa'); var LCD = require ('jsupm_i2clcd'); 
console.log('Current version of MRAA is', mraa.getVersion()); var light 
= new mraa.Aio(2); var lightValue; var temp = new mraa.Aio(0); var 
tempvalue; var lcdMessage=" "; var myLCD = new LCD.Jhd1313m1(6, 0x3E, 
0x62); loop(); function loop(){
    lightValue = light.read();
    lightValue = Math.round( lightValue*.1);
    
    
    tempvalue = temp.read();
    tempvalue= Math.round( tempvalue*.1);
    lcdMessage = "L:"+lightValue+"%, T"+tempvalue;
    myLCD.setCursor(1,0);
    console.log(lcdMessage);
    myLCD.write(lcdMessage);
    
       setTimeout(loop,1000);
    
}
