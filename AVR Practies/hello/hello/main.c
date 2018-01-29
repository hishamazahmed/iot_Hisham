#define F_CPU 16000000UL
#include <avr/io.h>
#include <util/delay.h>
int main(void)
{
	DDRC |= 0xFF;

	while(1){
		for (int i=0; i<8 ; i++)
		{			
			PORTC |= (1<<i);
			_delay_ms (100);
			
		}
	
		for (int j=7; j>=0; j--)
		{
			PORTC &= ~(1<<j);
			_delay_ms (100);
					}

		
	}
	return 0;
}
