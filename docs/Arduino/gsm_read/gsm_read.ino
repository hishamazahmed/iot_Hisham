#include <SoftwareSerial.h>
//#include <MFRC522.h>
#include <RFID.h>

#include <SPI.h>
SoftwareSerial GSM(9,10);
#define SS_PIN 6
#define RST_PIN 5
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
  delay(2000);
 
  ShowSerialData();
 
  GSM.println("AT+SAPBR=1,1");//setting the SAPBR
  delay(10000);
  ShowSerialData();

  //
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
    //GSM.println("AT+CIPSTART=\"TCP\",\"api.thingspeak.com\",\"80\"""");
    //delay(5000); ShowSerialData();
    //GSM.println("AT+CIPSEND");
    // ShowSerialData();
    //GSM.println("GET https://api.thingspeak.com/update?api_key=4NYF8BRP2PNG21YI&field1=210");
    // GSM.println(0x1a);

    
    GSM.println("AT+HTTPINIT"); //init the HTTP request
     delay(4000); 
  ShowSerialData();
 
  GSM.println("AT+HTTPPARA=\"URL\",\"http://hishamazahmed.000webhostapp.com/report1.php?cardnumber="+uidString+"\"");
  delay(5000);
 
  ShowSerialData();
GSM.println("AT+HTTPPARA=\"CID\",1");
  delay(10000);

  GSM.println("AT+HTTPACTION=0");//submit the request 
  delay(10000);//the delay is very important, the delay time is base on the return from the website, if the return datas are very large, the time required longer.
  //while(!SIM900.available());
 
  ShowSerialData();
 
  GSM.println("AT+HTTPREAD");// read the data from the website you access
  delay(1000);
  //changeLed();
  ShowSerialData();
 
  GSM.println("");
  delay(7000); ShowSerialData();

    GSM.println("AT+HTTPTERM");// read the data from the website you access
    delay(7000); ShowSerialData();
    
//    byte c;
//    if (c == '*')
//        { c=0x1a;}
      
   // GSM.println("*"); 
    //GSM.write(0x1a); //ctr+z
    
//    GSM.println("AT+CIPSHUT");
//     delay(3000);ShowSerialData();

     
 }
  rfid.halt();
}

 
void ShowSerialData()
{
  while(GSM.available()!=0)
    Serial.write(char (GSM.read()));
}


