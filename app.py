import eel
import threading
import random
from datetime import datetime
from time import sleep
import serial

eel.init('web')

num = 0

@eel.expose
def get_random_name():
    eel.prompt_alerts('Random name')

@eel.expose
def get_random_number():
    #eel.prompt_alerts(random.randint(1, 100))
    #return random.randint(10, 1000)/10
    global num
    num = (num + 0.1)% 99.9
    return num

@eel.expose
def get_date():
    eel.prompt_alerts(datetime.now().strftime("%d/%m/%Y %H:%M:%S"))

@eel.expose
def get_ip():
    eel.prompt_alerts('127.0.0.1')


def start_app():
    eel_thread = threading.Thread(target=eel_start) # Eel app start.
    eel_thread.setDaemon(True)
    eel_thread.start() # Run eel in a seperate thread.
    serial_start()


def eel_start():
    # EEL app start.
    print("Starting EEL")
    eel.start('index.html', mode='chrome', cmdline_args=['--kiosk'])


def serial_start():
    ser = serial.Serial("/dev/serial0", 9600)

    while True:
        line = ser.readline().decode("utf-8").rstrip()
        if line[0] == "S": #only parse full lines
            eel.parse(line)

    ser.close()
  

start_app() # Run app.

