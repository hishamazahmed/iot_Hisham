#include <LiquidCrystal.h>
const int rs = 12, en = 11, d4 = 5, d5 = 4, d6 = 3, d7 = 2;
LiquidCrystal lcd(rs, en, d4, d5, d6, d7);
void setup() {
    lcd.begin(16, 2);    
}
void loop() {
       int y=1;
                  for (int X=0 ; X<15 ; X++)
                 
                   {
                    lcd.setCursor(X,0);
                    lcd.print(y);
                    delay(600);
                    y++;
          
            }

}
 