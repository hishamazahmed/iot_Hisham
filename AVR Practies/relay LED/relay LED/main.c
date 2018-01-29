#define F_CPU 8000000UL//
#include <avr/io.h>
#include <util/delay.h>
int main(void)
{
	char hello[]={0x3f,0x06,0x5b,0x4f,0x66,0x6d,0x7d,0x07,0xff,0x6f};
	DDRC = 0xff;
	DDRD = 0xff;   
    while (1) 
    {
		for (int u=0;u<=9;u++)
		{			
			for (int i=0;i<=9;i++)
				{					
					PORTD =(1<<PD0);
					PORTC = hello[u];								
					_delay_ms(200);	
					PORTD &=~ (1<<PD0);				
					PORTD =(1<<PD1);
					PORTC= hello[i];
					_delay_ms(200);			
					PORTD &=~ (1<<PD1);				
				}
		}		
    }
}

