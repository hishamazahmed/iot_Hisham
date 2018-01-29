/*
 * motor.c
 *
 * Created: 11/16/2017 3:09:55 PM
 * Author : Ahmed Deep
 */ 
#define F_CPU 16000000UL
#include <avr/io.h>
//
#include <util/delay.h>

int main(void)
{
	DDRC=0xff;
	DDRD = 0x00;
    /* Replace with your application code */
    while (1) 
    {
		
		if (PIND & (1<<PD0)){
			PORTC=0b00000010;
			_delay_ms(5500);
			//return 0;
			if (PIND &(1<<PD0)){
				PORTC=0b00000010;
			}
			else{
				PORTC = 0b00000001;
			}
		}
		else{
// 			
			PORTC=0b00000001;
			
			
		}
		
		
    }
}

