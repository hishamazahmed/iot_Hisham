
#define F_CPU 16000000UL
#include <avr/io.h>
#include <util/delay.h>


int main(void)
{
	DDRD |= 0xFF;

char hello[]={0x3f,0x06,0x5b};
	
	while(1)
		{
int i;
for(i=0;i<=3;i++){
PORTD = hello[i];
_delay_ms(100);

			
		}
		}	
		
	
	return 0;
}
