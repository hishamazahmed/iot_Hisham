/*
 * GccApplication1.c
 *
 * Created: 11/22/2017 2:35:31 PM
 * Author : Ahmed Deep
 */ 



#include <avr/io.h>

#define get_bit(reg,bitnum) ((reg & (1<<bitnum))>>bitnum)

int main(void)

{

	DDRD=0b11111000; // set the first 3 pins of PORTD to be inputs to read from the push buttons

	DDRB=0b11111111; // ensure that Pin3 in POrt B is output as this is the OC0 pin that wll produce the PWM.

	PORTD=0b00000000; // Initialize PORTD to zeros

	TCCR0=0b01110101; //Configure TCCR0 as explained in the article

	TIMSK=0b00000000;

	OCR0=255; // Set OCR0 to 255 so that the duty cycle is initially 0 and the motor is not rotating

	while(1)

	{

		if (get_bit(PIND,0)==1)

		{

			OCR0=178; //If button 1 is pressed, set OCR0=178 (duty cycle=10%).

		}

		if (get_bit(PIND,1)==1)

		{

			OCR0=102; //If button 2 is pressed, set OCR0=102 (duty cycle=60%).

		}

		if (get_bit(PIND,2)==1)

		{

			OCR0=25; //If button 3 is pressed, set OCR0=25 (duty cycle=90%).

		}      }  }