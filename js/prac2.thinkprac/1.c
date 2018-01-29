void adc_init(void){
	// Set the ADC input to PB2/ADC1
	ADMUX |= (1 << MUX1);
	ADMUX |= (1 << ADLAR);	
	// Set the prescaler to clock/128 & enable ADC
	// At 9.6 MHz this is 75 kHz.
	// See ATtiny13 datasheet, Table 14.4.
	ADCSRA |= (1 << ADPS1) | (1 << ADPS0) | (1 << ADEN);              //Do an initial conversion because this one is the slowest and to ensure that everything is up and running
}

uint16_t read_adc(){
	// Start the conversion
	ADCSRA |= (1 << ADSC);	
	// Wait for it to finish
	while (ADCSRA & (1 << ADSC));	
	return ADCH;                //Returns the ADC value of the chosen channel
}