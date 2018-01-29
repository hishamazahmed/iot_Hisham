#define F_CPU 16000000UL
#include <avr/io.h>
#include <util/delay.h>
#include <stdlib.h>
#define BAUDRATE 19200
#define BAUD_PRESCALLER (((F_CPU / (BAUDRATE * 16UL))) - 1)
void USART_init();
void send( unsigned char data);
void converter(int number);
int main(void)
{
	USART_init();
	while(1){
		
		for(int i=57;i>47;i--)
		{
			for ( int j=57 ;j>47 ; j-- )
			{
				send(i);
				//_delay_ms(20);
				send(j);
				//_delay_ms(25);
				send(13);
				_delay_ms(10);
			}
			
			//_delay_ms(250);
		}
	}
	return 0;
}

void USART_init(void)
{
	UBRR0H = (uint8_t)(BAUD_PRESCALLER>>8);
	UBRR0L = (uint8_t)(BAUD_PRESCALLER);
	UCSR0B = (1<<RXEN0)|(1<<TXEN0);
	UCSR0C = (3<<UCSZ00);
}

void send( unsigned char data)
{
 	while(!(UCSR0A & (1<<UDRE0)));
	UDR0 = data;
	
	
}


