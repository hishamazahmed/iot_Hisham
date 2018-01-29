/*
 * AVR_LED_8_Blinking.c
 *
 * Created: 23-Oct-17 7:22:30 AM
 * Author : user-3
 */ 

#define F_CPU 16000000UL
#include <avr/io.h>
#include <util/delay.h>

int main(void)
{
	DDRD |= 0xFF;
	while(1){
		for (int i=0; i<8 ; i++)
		{			
			PORTD |= (1<<i);
			_delay_ms (100);
			PORTD &=~ (1<<i);
			_delay_ms (100);
		}
		
		for (int j=6; j>0; j--)
		{
			PORTD |= (1<<j);
			_delay_ms (100);
			PORTD &=~ (1<<j);
			_delay_ms (100);
		}
	}
	return 0;
}
