
#include <LiquidCrystal.h>
const int rs = 12, en = 11, d4 = 5, d5 = 4, d6 = 3, d7 = 2;
LiquidCrystal lcd(rs, en, d4, d5, d6, d7);
void setup() {
    lcd.begin(16, 2);
    lcd.print("Bangladesh");
    delay(500);
}
void loop() {
        for (int i=0;i<10;i++)
                {
                lcd.scrollDisplayLeft();
                delay(500);
                }
        for (int k=0 ;k<26;k++)
                  {
                  lcd.scrollDisplayRight();
                delay(500);
                  }
        for (int k=0 ;k<16;k++)
                  {
                  lcd.scrollDisplayLeft();
                delay(500);
                  }
            }
 
