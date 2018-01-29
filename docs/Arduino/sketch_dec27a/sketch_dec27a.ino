#include <SoftwareSerial.h> 
#include <RFID.h>

#include <SPI.h>
SoftwareSerial GSM(9,10);
#define SS_PIN 6
#define RST_PIN 5
String buff="";
//
RFID rfid(SS_PIN,RST_PIN);  //
//MFRC522 rfid(SS_PIN, RST_PIN); // Instance of the class

//MFRC522::MIFARE_Key key; 
//
int cards[][5] = {
  {23,61,989,187,152}};
bool access = false;
//
int b=0;
String uidString;

void setup() {     
  SPI.begin(); // Init SPI bus
  rfid.init();  //rfid.PCD_Init(); // Init MFRC522 
  Serial.begin(9600);
  GSM.begin(9600);
}


 
void loop()
{

   if(rfid.isCard())
   {    
        if(rfid.readCardSerial()){
            Serial.print(rfid.serNum[0]);           
            Serial.print(rfid.serNum[1]);            
            Serial.print(rfid.serNum[2]);           
            Serial.print(rfid.serNum[3]);
            Serial.print(rfid.serNum[4]);
            
           for(int x = 0; x < sizeof(cards); x++){
              for(int i = 0; i < sizeof(rfid.serNum); i++ ){
                  if(rfid.serNum[i] != cards[x][i]) {
                      access = false;
                      break;
                  } else {
                      access = true;
                  }
              }
              if(access) break;
            }
           
        }
        
       if(access){
          Serial.println("Welcome!");
                     
      } else {
           Serial.println("Not allowed!"); 
               
       }        
    
  uidString = String(rfid.serNum[0])+String(rfid.serNum[1])+String(rfid.serNum[2])+String(rfid.serNum[3]+rfid.serNum[4]);
  Serial.println(uidString);
  int b=uidString.toInt();
  Serial.println(b);
  delay(400); 
  
  GSM.println("AT+CSQ");
  delay(500); ShowSerialData();
  
//
GSM.println("AT+CPIN?"); 
  delay(500);ShowSerialData();
 GSM.println("AT+CREG?");
  delay(500);ShowSerialData();
  //
  GSM.println("AT+CGATT?"); //Attach or Detach from GPRS Support
  delay(500);ShowSerialData();

  GSM.println("AT+CIPSHUT");//closing existing connection
  delay(500);ShowSerialData();
    
  GSM.println("AT+SAPBR=3,1,\"CONTYPE\",\"GPRS\"");//setting the SAPBR, the connection type is using gprs
  delay(1000);
  ShowSerialData();
 
  Serial.println("AT+SAPBR=3,1,\"APN\",\"gpinternet\"");//setting the APN, Access point name string
  delay(200);
 
  ShowSerialData();
 
  GSM.println("AT+SAPBR=1,1");//setting the SAPBR
  delay(1000);
  ShowSerialData();
 
    GSM.println("AT+CIPSTATUS");
    delay(1000);  ShowSerialData();
     GSM.println("AT+CIPMUX=0");
    delay(1000); ShowSerialData();
     GSM.println("AT+CSTT=\"gpinternet\"");
  delay(1000); ShowSerialData();
     GSM.println("AT+CIICR");
    delay(1000); ShowSerialData();
    GSM.println("AT+CIFSR");
    delay(1000); ShowSerialData();
  
    GSM.println("AT+HTTPINIT"); //init the HTTP request
     delay(1000); 
  ShowSerialData();
 
  http://103.199.155.138/group4/DS18b20/ds18b20.txt
 
GSM.println("AT+HTTPPARA=\"CID\",1");
  delay(10000);
 ShowSerialData();
//https://hishamazahmed.000webhostapp.com/test.php?cardnumber=2233

 //GSM.println("AT+HTTPPARA=\"URL\",\"http://rfiddatasoft.000webhostapp.com/report.php?CardNo="+uidString+"\"");
    GSM.println("AT+HTTPPARA=\"URL\",\"http://hishamazahmed.000webhostapp.com/test.php?cardnumber=2233\"");
  delay(5000);
 ShowSerialData();

  GSM.println("AT+HTTPACTION=0");//submit the request 
  delay(10000);//the delay is very important, the delay time is base on the return from the website, if the return datas are very large, the time required longer.
  //while(!SIM900.available());
 
  ShowSerialData();
 
  GSM.println("AT+HTTPREAD");// read the data from the website you access
  delay(4000);
  //changeLed();
  //ShowSerialData();
  Serial.println();
  Serial.print("ghjdfgjdghj"+ShowData());
  
  GSM.println("");
  delay(7000); ShowSerialData();
 
 
     
 }
  rfid.halt();
}

 
void ShowSerialData()
{
  while(GSM.available()!=0)
    Serial.write(char (GSM.read()));
}
String ShowData()
{
  while(GSM.available()!=0){
    buff+=(char) (GSM.read());
  }
  return buff;
}

