byte byteRead;

void setup(){
  
  Serial.begin(9600); }
  
void loop(){
  if (Serial.available()){
    byteRead=Serial.read();
    delay(1000);
    Serial.write(byteRead);
    Serial.write(11);
  }
}

