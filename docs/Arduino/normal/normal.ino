
#include <LiquidCrystal.h>
const int rs = 12, en = 11, d4 = 5, d5 = 4, d6 = 3, d7 = 2;
LiquidCrystal lcd(rs, en, d4, d5, d6, d7);
void setup() {
    lcd.begin(16, 2);    
            }
void loop() {
                        for (int i=0;i<3;i++)
                                {
                                lcd.setCursor(7,0);
                                lcd.print("bangladesh");
                                delay(200);
                                lcd.clear();
                                }
                
        for (int k=0 ;k<15;k++)
                  {
                     lcd.setCursor(2,1);
                     lcd.print("bangladesh");
                  lcd.scrollDisplayRight();
                delay(500);
                
                  }
        for (int k=0 ;k<16;k++)
                  {
                     //lcd.setCursor(7,1);
                  lcd.scrollDisplayLeft();
                delay(500);
               
                  }
            }
 
