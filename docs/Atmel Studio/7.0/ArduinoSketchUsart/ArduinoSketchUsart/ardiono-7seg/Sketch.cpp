/*Begining of Auto generated code by Atmel studio */
#include <Arduino.h>

void setup() {
	// Open serial communications and wait for port to open:
	Serial.begin(121212);
	while (!Serial) {
		; // wait for serial port to connect. Needed for native USB port only
	}
	Serial.println("Goodmorning  ^(moon!)");	
}

void loop() { // run over and over
	
	Serial.println("Goodnight moon!");
	delay(200);
}