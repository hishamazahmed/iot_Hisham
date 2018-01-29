int incomingByte = 0;   // for incoming serial data

void setup() {
        Serial.begin(9600);     // opens serial port, sets data rate to 9600 bps
        pinMode(12,INPUT_PULLUP);
}

char ar[10];
int i=0;
void loop() {

        // send data only when you receive data:
        if (Serial.available() > 0) {
                
                incomingByte = Serial.read();
                  
                if(incomingByte != '/'){
                  ar[i]=(char)incomingByte;
                  i++;
                }else{
                  i=0;
                  int m=atoi(ar);
                  Serial.println(m, DEC);
                  
                }
                
        }
        
        int x= digitalRead(12);
        //Serial.print(x);

        if(x==LOW){
          Serial.print("1");
          Serial.print('/');

          delay(100);
          
        }

        
}
