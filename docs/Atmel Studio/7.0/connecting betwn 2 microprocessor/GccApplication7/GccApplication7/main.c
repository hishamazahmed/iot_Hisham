#define F_CPU 16000000UL
#include <avr/io.h>
#include <util/delay.h>
#include <stdlib.h>
#define BAUDRATE 19200
#define BAUD_PRESCALLER ((  (F_CPU / (BAUDRATE * 16UL))  ) - 1)

//Declaration of our functions
void USART_init(void);
unsigned char USART_receive(void);
void USART_send( unsigned char data);
void USART_putInt(int number);

int main(void)
{
				USART_init();        //Call the USART initialization code
	int i=1;
	DDRC = 0xFF;
				while(1)
								{        									
										UDR0 = i;										
										i++;										
										unsigned char y = USART_receive();																			
										PORTC = y;
										_delay_ms(150);
									}
			
}

void USART_init(void){
	
	UBRR0H = (uint8_t)(BAUD_PRESCALLER>>8);
	UBRR0L = (uint8_t)(BAUD_PRESCALLER);
	UCSR0B = (1<<RXEN0)|(1<<TXEN0);
	UCSR0C = (3<<UCSZ00);
}

unsigned char USART_receive(void)
			{
	
				while(!(UCSR0A & (1<<RXC0)));
				return UDR0;
				
	
			}

void USART_send( unsigned char data){
	
	while(!(UCSR0A & (1<<UDRE0)));
	UDR0 = data;
	
}

void USART_putin(int StringPtr){
	
	while(StringPtr != 0x00)
	{
		USART_send(StringPtr);
	}
}

// void USART_putInt(int number){
// 	char buffer [sizeof(unsigned int)*8+1];
// 
// 	utoa (number,buffer,10);
// 	
// 	USART_putstring(buffer);
// }

