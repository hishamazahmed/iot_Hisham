
#include "Timer.h"  
    Timer t;
    int ledEvent;
    int inPin =8;
    int incomingByte = 0;
    int val = 0;
    char buf[12];
    int value = 0;
    void setup()
    {
      Serial.begin(9600);
      pinMode(8,INPUT_PULLUP);
      int tickEvent = t.every(5000, doSomething);
    }
     
    void loop()
    {
      val = digitalRead(inPin); 
      if(val == LOW){
         doSomething();
      }
      else{
         t.update();
      }
    }
      
    void doSomething()
    {
        Serial.write('1');
        delay(500);
        if (Serial.available() > 0){
          Serial.print("Sensor value: ");
          while(Serial.available() > 0){
            incomingByte = Serial.read();
            if(incomingByte!= 0){
              value = incomingByte - 48;
              Serial.print(value);
            }
          }
          
        }
        Serial.println("\n");
    }

