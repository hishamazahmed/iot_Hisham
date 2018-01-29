const uint32_t JOB_PERIOD = 10000;  
void setup() {
  Serial.begin(9600);

}



void do_the_job()
{
    Serial.print(analogRead(A0));
    Serial.print('/');
}
static uint32_t previousMillis;
void loop()
{
    
    if (millis() - previousMillis >= JOB_PERIOD) {
        do_the_job();
        previousMillis += JOB_PERIOD;
    }
   
}


int i=0;
void serialEvent() {
  char ar[10];
  if (Serial.available() > 0) {
                
                int incomingByte = Serial.read();
                  
                if(incomingByte != '/'){
                  ar[i]=(char)incomingByte;
                  i++;
                }else{
                  i=0;
                  int m=atoi(ar);

                  
                    Serial.print(analogRead(A0));
                    Serial.print('/');
                    int mm=millis() - previousMillis;
                    previousMillis += mm;
                  
                  
                }
                
        }
}





