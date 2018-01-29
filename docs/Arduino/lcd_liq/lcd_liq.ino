#include<LiquidCrystal.h>
LiquidCrystal lcd(12, 11, 5, 4, 3, 2); 
const int sensor=A1; // Assigning analog pin A1 to variable 'sensor'
float tempc;  //variable to store temperature in degree Celsius
float tempf;  //variable to store temperature in Fahreinheit 
float vout;  //temporary variable to hold sensor reading
const int uppin =10;
const int setpin = 9;
const int downpin = 8; 
int x=30;
int y = 30;
int buttonup=0;
int buttondown=0;
int buttonset=0;


void setup()
{
  
pinMode(uppin,INPUT);
pinMode(setpin,INPUT);
pinMode(downpin,INPUT);
pinMode(7,OUTPUT);
  
pinMode(sensor,INPUT); // Configuring pin A1 as input
Serial.begin(9600);
lcd.begin(16,2);  
  delay(500);
}
void loop() 
{
  int up = digitalRead(uppin);
  int down = digitalRead(downpin);
  int set = digitalRead(setpin);

if (up == HIGH){
  x=x+1;
    }
 if (down == HIGH){
  x=x-1;
  }
 if (set == HIGH){
  y=x;
  
  }

 if (tempc >= y){
  digitalWrite(7,HIGH);
  delay (500);
   
 }
 else{
  digitalWrite(7,LOW);
}
vout=analogRead(sensor);
vout=(vout*500)/1023;
tempc=vout; // Storing value in Degree Celsius
//tempf=(vout*1.8)+32; // Converting to Fahrenheit 
lcd.setCursor(0,0);
lcd.print("in DegreeC= ");
lcd.print(tempc);
lcd.setCursor(0,1);
//lcd.print("in Fahrenheit=");
lcd.print(x);
delay(1000); //Delay of 1 second for ease of viewing in serial monitor
}
