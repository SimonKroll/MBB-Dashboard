import eel
import threading
import random
from datetime import datetime

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



eel.start('index.html', mode='chrome', cmdline_args=['--kiosk'])


"""
def start_app():
    eel_thread = threading.Thread(target=eel_start) # Eel app start.
    eel_thread.setDaemon(True)
    eel_thread.start() # Run eel in a seperate thread.

    webview_start() # Start pywebview web browser.

def eel_start():
    # EEL app start.
    eel.start("index.html", port=8000, mode=None,  shutdown_delay=0.0)

def webview_start():
    # pywebview start.
    webview.create_window("App Name", "http://localhost:8000/index.html", fullscreen=True,frameless=True)
    webview.start()
  

start_app() # Run app.
"""