#include <Arduino.h>
#include <stdlib.h>

byte byteRead;

void setup() {
	// Turn the Serial Protocol ON
	Serial.begin(9600);
}
char my[10];
bool flag=false;
int i=0;
void loop() {
	
	if (Serial.available()) {
		/* read the most recent byte */
		byteRead = Serial.read();
		if(byteRead != (byte) '/'){
			my[i] =(char)byteRead;
			i++;
			}		else{
					flag=true;
					i=0;
					}		
	}	
	
	if (flag==true){
		int b=atoi(my);
		Serial.print(b,BIN);
		Serial.print(b,HEX);
		flag=false;
	}
}
