import paho.mqtt.client as mqtt
import mraa
import pyupm_i2clcd as lcd

lcdDisplay = lcd.Jhd1313m1(0, 0x3E, 0x62)  #LCD initialization

#Callback  - called when the connection is established
def on_connect(client, userdata, flags, rc):
    print("Connected to server. Connection code: "+str(rc))

    # Do a subscribe to "MQTTEdison" topic whenever a new connection is 
done 
    client.subscribe("MQTTEdison")

# Callback - called when a new message is received / published
def on_message(client, userdata, msg):
	#writes on console screen the topic and the message received
	print("Topico: "+msg.topic+" - Mensagem recebida: 
"+str(msg.payload)) 
	
	#writes on LCD Display the message received
	lcdDisplay.setColor(0,255,255)
	lcdDisplay.setCursor(0, 0)
	lcdDisplay.write("Mensagem:")
	lcdDisplay.setCursor(1, 0)
	lcdDisplay.write(str(msg.payload))
	
#main program
client = mqtt.Client()
client.on_connect = on_connect   #configures callback for new connection 
established
client.on_message = on_message   #configures callback for new message 
received

client.connect("test.mosquitto.org", 1883, 60)  #connects to broker (the 
'60' parameter means keepalive time). If no messages are exchanged in 60 
seconds, This program automatically sends ping to broker (for keeping 
connection on)

#Stay here forever. Blocking function.
client.loop_forever()
