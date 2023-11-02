String message = "SPEED:12.3;BATT:087;RANGE:169;TRQ:42;LBLINK:1;RBLINK:0";

// the setup routine runs once when you press reset:
void setup() {
  Serial.begin(9600);
  randomSeed(25);
}

// the loop routine runs over and over again forever:
void loop() {

  int blinker = random(2);
  message[53] = blinker + 48;

  int mph = random(1000);
  message[6] = mph/100 + 48;
  message[7] = mph/10%10 +48;
  message[9] = mph%10 +48;
  
  
  Serial.println(message);
  delay(500);        // delay in between reads for stability
}