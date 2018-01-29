/*
 * attiny13.c
 *
 * Created: 06-Dec-17 12:46:54 PM
 * Author : Ahmed Deep
 */ 
#define F_CPU 16000000UL
#include <avr/io.h>
//#define BAUDRATE 19200
//#define BAUD_PRESCALLER (((F_CPU / (BAUDRATE * 16UL))) - 1)
#include <util/delay.h>
void adc_init(void);            //Function to initialize/configure the ADC
uint16_t read_adc();    //Function to read an arbitrary analogic channel/pin

uint8_t inputTemp=0;

int main(void)
{
	DDRB |=  (1<<PB1);
	DDRB |=  (1<<PB3);
	DDRB |=  (1<<PB2);
	DDRB &=~ (1<<PB0);
adc_init(); 
    
    while (1) 
    {	
		inputTemp = PINB & 0x01  ;
	if (inputTemp ==0x00)
		{
			PORTB |= (1<<PB2);
			
		}
		else
		{
			PORTB  &=~(1<<PB2);
			
		}
uint16_t x= read_adc();


if (x >= 128){
	PORTB|=(1<<PB1);
	PORTB &=~ (1<<PB3);
	//_delay_ms(500);
}
else{
	
	PORTB|=(1<<PB3);
	PORTB &=~ (1<<PB1);
}


    }
}

void adc_init(void){
	// Set the ADC input to PB2/ADC1
	ADMUX |= (1 << MUX1);
	//ADMUX |= (1<<REFS0); 
	ADMUX |= (1 << ADLAR);	
	// Set the prescaler to clock/128 & enable ADC
	// At 9.6 MHz this is 75 kHz.
	// See ATtiny13 datasheet, Table 14.4.
	ADCSRA |= (1 << ADPS2) |(1 << ADPS1) | (1 << ADPS0) | (1 << ADEN);              //Do an initial conversion because this one is the slowest and to ensure that everything is up and running
}

uint16_t read_adc(){
	// Start the conversion
	ADCSRA |= (1 << ADSC);	
	// Wait for it to finish
	while (ADCSRA & (1 << ADSC));	
	return ADCH;                //Returns the ADC value of the chosen channel
}