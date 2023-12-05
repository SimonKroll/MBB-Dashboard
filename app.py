import eel
import threading
import random
from datetime import datetime
from time import sleep
import serial
import pynmea2
import io
from time import time

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
    gps_thread = threading.Thread(target=gps_start) # gps app start.
    gps_thread.setDaemon(True)
    gps_thread.start() # Run gps in a seperate thread.
    serial_start()


def eel_start():
    # EEL app start.
    print("Starting EEL")
    eel.start('index.html', mode='chrome', cmdline_args=['--kiosk'])


def serial_start():
    ser = serial.Serial("/dev/ttyUSB0", 9600)
    run = True

    while run:
        try:
            line = ser.readline().decode("utf-8").rstrip()
            if line[0] == "S": #only parse full lines
                eel.parse(line)
                #print(line)
        except:
            print("Serial Error Occured")
            run = False
    ser.close()

def gps_start():
    ser = serial.Serial('/dev/ttyAMA1', 9600, timeout=5.0)
    sio = io.TextIOWrapper(io.BufferedRWPair(ser, ser))

    VTG = {"speed":0.0, "timestamp":time()}
    RMC = {"speed":0.0, "timestamp":time()}
    speed_out = 0

    while 1:
        try:
            line = sio.readline()
            msg = pynmea2.parse(line)
            #print(repr(msg))
            if isinstance(msg, pynmea2.VTG):
                if msg.spd_over_grnd_kmph == None or msg.spd_over_grnd_kmph == '':
                    print(f"GPVTG:\tWAITING")
                else:
                    #Speed is valid
                    VTG["speed"] = float(msg.spd_over_grnd_kmph)*0.6214
                    VTG["timestamp"] = time()
                    #print(f"GPVTG:\t{float(msg.spd_over_grnd_kmph)*0.6214}")
            if isinstance(msg, pynmea2.RMC):
                if msg.spd_over_grnd == None or msg.spd_over_grnd == '':
                    print("\t\t\t\tGPRMC:\tWAITING")
                else:
                    #speed is valid
                    RMC["speed"] = float(msg.spd_over_grnd)*1.151
                    RMC["timestamp"] = time()
                    #print(f"\t\t\t\tGPRMC:\t{float(msg.spd_over_grnd)*1.151}")
            
            if time()-VTG["timestamp"] < 10 and time()-RMC["timestamp"] <10:
                speed_out = (VTG["speed"] + RMC["speed"])/2
            elif  time()-VTG["timestamp"] < 10:
                speed_out = speed_out = VTG["speed"]
            elif  time()-RMC["timestamp"] < 10:
                speed_out = speed_out = RMC["speed"]
            else:
                speed_out = 0
            
            # limit at low speeds
            if  speed_out < 3.5 :
                speed_out = 0
        
            
            eel.update_speed(speed_out)


        except serial.SerialException as e:
            print('Device error: {}'.format(e))
            continue
        except pynmea2.ParseError as e:
            print('Parse error: {}'.format(e))
            continue
        except Exception as e:
            print("Other Error: {}".format(e))
            continue

start_app() # Run app.

