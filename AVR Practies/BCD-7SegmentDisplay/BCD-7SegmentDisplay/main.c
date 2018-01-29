#define F_CPU 8000000UL
#include <avr/io.h>
#include <util/delay.h>
int main(void)
{
   DDRC = 0xff;
   DDRB = 0xff;
   
       while (1) 
		
	for (int p=0;p<=99;p++);
	{
		PORTB=0;
				{	int q=0b00000000;
						for (int k=0;k<=9;k++)
						{
							for (int i=0; i<=9; i++)
							{
								PORTC=q|i;
								_delay_ms(200);
							}
							q=q+0b00010000;
						}
				}
				
	}
			
				




}