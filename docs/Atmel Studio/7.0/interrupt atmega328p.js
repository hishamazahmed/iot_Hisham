/*
 * GccApplication5.c
 *
 * Created: 26-Oct-17 3:28:52 PM
 * Author : user-3
 */ 
#define 8000000UL
#include <avr/io.h>
#include <avr/interrupt.h>


ISR(TIMER0_COMPA_vect){
	PORTB ^= (1<<0);
}

int main(void)
{
	DDRB =0xFF;
	TCCR0A= (1<<WGM01);
	OCR0A= 78;
	TIMSK0= (1<<OCIE0A);
	sei();
	TCCR0B=(1<<CS02) | (1<<CS00);
    /* Replace with your application code */
    while (1) 
    {
    }
}

