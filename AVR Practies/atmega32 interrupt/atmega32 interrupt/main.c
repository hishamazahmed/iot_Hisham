#define F_CPU 16000000UL//
#include <avr/io.h>
#include <avr/interrupt.h>

volatile uint8_t kill=0;

ISR(TIMER0_OVF_vect)
{
	kill++;
	if (kill > 122)
	{
		
		kill=0;
		PORTD ^=(1<<PD0);
	}
}
int main(void)
{
	DDRD = 0xff;
	TCCR0 =(1<<CS02);
	TIFR = (1<<TOV0);
	TIMSK = (1<<TOIE0);
	sei(); 		
	   while (1) 
    {
		
		
    }
}

