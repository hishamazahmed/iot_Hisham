#define F_CPU 16000000UL

#include <avr/io.h>
#include <util/delay.h>
#include <stdio.h>
#include <stdlib.h>
#define BAUDRATE 19200
#define BAUD_PRESCALLER (((F_CPU / (BAUDRATE * 16UL))) - 1)

//Declaration of our functions
void USART_init(void);
unsigned char USART_receive(void);
void USART_send( unsigned char data);
void USART_putstring(char* StringPtr);
void USART_putInt(int number);

char String[]="Hello World!!";    //String[] is in fact an array but when we put the text between the " " symbols the compiler threats it as a String and automatically puts the null termination character in the end of the text
int m=100;
int main(void){
	USART_init();        //Call the USART initialization code
	
	while(1){        //Infinite loop
		USART_putstring(String);    //Pass the string to the USART_putstring function and sends it over the serial
		for(int i=100;i>0;i--){
			USART_putInt(i);
			//	_delay_ms(50);
			//}
			//Delay for 5 seconds so it will re-send the string every 5 seconds
		}
		
		return 0;
	}

	void USART_init(void){
		
		UBRR0H = (uint8_t)(BAUD_PRESCALLER>>8);
		UBRR0L = (uint8_t)(BAUD_PRESCALLER);
		UCSR0B = (1<<RXEN0)|(1<<TXEN0);
		UCSR0C = (3<<UCSZ00);
	}

	unsigned char USART_receive(void){
		
		while(!(UCSR0A & (1<<RXC0)));
		return UDR0;
		
	}

	void USART_send( unsigned char data){
		
		while(!(UCSR0A & (1<<UDRE0)));
		UDR0 = data;
		
	}

	void USART_putInt(int number){
		char buffer [sizeof(unsigned int)*8+1];

		utoa (number,buffer,10);
		
		USART_putstring(buffer);
	}

	void USART_putstring(char* StringPtr){
		
		while(*StringPtr != 0x00){
			USART_send(*StringPtr);
		StringPtr++;}
		
	}