#include <math.h>
String message = "SPEED:12.3;BATT:087;RANGE:169;TRQ:42;LBLINK:1;RBLINK:0";
unsigned long i = 0;
// the setup routine runs once when you press reset:
void setup() {
  Serial.begin(9600);
  randomSeed(25);
}

// the loop routine runs over and over again forever:
void loop() {

  int lBlink = abs(round(sin(i)));
  int rBlink = abs(round(sin(i+3)));

  int range = 50 + 50*cos(0.5*i);
  int mph = 48 + 48*sin(0.3*i +15);
  int torque = 15 + 10*cos(i+50);
  int battery = 50 + 50*sin(0.1*i+27);
  int trq = 50 + 50* cos(0.5*i+25);
  
  message[6] = mph/100 + 48;
  message[7] = mph/10%10 +48;
  message[9] = mph%10 +48;

  message[53] = rBlink + 48;
  message[44] = lBlink + 48;

  message[16] = battery/100 + 48;
  message[17] = battery/10%10 +48;
  message[18] = battery%10 +48;

  message[26] = range/100 + 48;
  message[27] = range/10%10 +48;
  message[28] = range%10 +48;

  message[34] = trq/10 +48;
  message[35] = trq%10 +48;
    
  
  Serial.println(message);
  delay(500);        // delay in between reads for stability
  i++;
}