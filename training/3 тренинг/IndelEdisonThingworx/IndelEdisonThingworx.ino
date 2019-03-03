#include <WiFi.h>
#include <Servo.h> 
#include <ArduinoJson.h>

//Параметры Wifi
WiFiClient client;
char ssid[] = "названиеWIFIсети"; //  your network SSID (name) 
char pass[] = "парольотWIFI";    // your network password (use for WPA, or use as key for WEP)
int keyIndex = 0;            // your network key Index number (needed only for WEP)
int status = WL_IDLE_STATUS;

// Параметры IoT сервера
char iot_server[] = "ptc.k36.org";
IPAddress iot_address(194, 226, 199, 73);
char appKey[] = "свойAPPKEY";
char thingName[] = "имявашейвещи";
char serviceName[] = "имясервиса";

// Параметры сенсоров для IoT сервера
#define sensorCount 4                                   
char* sensorNames[] = {"Active", "Temp", "Pressure", "Light"};
float sensorValues[sensorCount];
#define SENS_UPDATE_TIME 1000       // Частота опроса датчиков
#define BUTTON_CLICK_TIME 2000
#define WARNING_TIME 1500
#define IOT_UPDATE_TIME 1000         // Частота вывода данных на сервер IoT
long timer_button = 0;               // Таймер обновления опроса кнопки
long timer_sens = 0;                // Таймер обновления опроса датчиков
long timer_iot = 0;                 // Таймер обновления вывода на сервер IoT
long timer_iot_timeout = 0;         // Таймер ожидания прихода символов с сервера
#define IOT_TIMEOUT1 500            // Максимальное время ожидания ответа от сервера
#define IOT_TIMEOUT2 100
#define BUFF_LENGTH 256              // Размер приемного буффера
char buff[BUFF_LENGTH] = "";        // Приемный буфер

int LED=0;
int Angle=0;


// Переменные температуры
const int B=4275; 
#define SENS_TEMP A0
#define SENS_LIGHT A1
#define SENS_PRESSURE A2
#define BUTTON 2
#define LAMP 4
#define SERVO 5


Servo myservo;

void setup() {
  pinMode(BUTTON,INPUT);
  pinMode(LAMP,OUTPUT);
  digitalWrite(LAMP,HIGH);
  delay(300);
  digitalWrite(LAMP,LOW);
  Serial.begin(9600);
  if (WiFi.status() == WL_NO_SHIELD) {
    Serial.println("WiFi shield not present"); 
    while(true);
  } 

  String fv = WiFi.firmwareVersion();
  if( fv != "1.1.0" )
    Serial.println("Please upgrade the firmware");
  digitalWrite(LAMP,HIGH);
  delay(300);
  digitalWrite(LAMP,LOW);
  while (status != WL_CONNECTED) { 
    Serial.print("Attempting to connect to SSID: ");
    Serial.println(ssid); 
    status = WiFi.begin(ssid, pass);
    delay(1000);
    digitalWrite(LAMP,HIGH);
    delay(300);
    digitalWrite(LAMP,LOW);
    delay(300);
    digitalWrite(LAMP,HIGH);
    delay(300);
    digitalWrite(LAMP,LOW);
    delay(300);
  } 
  digitalWrite(LAMP,HIGH);
  delay(300);
  digitalWrite(LAMP,LOW);
  Serial.println("Connected to wifi");
  printWifiStatus();

  sensorValues[0] = 0;
  sensorValues[1] = 0;
  sensorValues[2] = 0;
  sensorValues[3] = 0;
  myservo.attach(SERVO);
  myservo.write(0);
}

void printWifiStatus() {
  Serial.print("SSID: ");
  Serial.println(WiFi.SSID());
  IPAddress ip = WiFi.localIP();
  Serial.print("IP Address: ");
  Serial.println(ip);
  long rssi = WiFi.RSSI();
  Serial.print("signal strength (RSSI):");
  Serial.print(rssi);
  Serial.println(" dBm");
}



void loop() {
  bool button_click=digitalRead(BUTTON);
  if ((millis() > timer_button + BUTTON_CLICK_TIME) && button_click)
    {
      if (sensorValues[0])
      {
        sensorValues[0]=0;
      }
      else
      {
        sensorValues[0]=1;
      }
      timer_button=millis(); 
  }
  if (millis() > timer_sens + SENS_UPDATE_TIME) // Опрос датчиков
  {
    readSensor();
    timer_sens = millis();
  }
  if (millis() > timer_iot + IOT_UPDATE_TIME) // Вывод данных на сервер IoT
  {
    sendDataIot();
    timer_iot = millis();
  }
}

void readSensor()
{
  int a = analogRead(SENS_TEMP);               //Чтение датчика температуры
  float R = 1023.0/((float)a)-1.0;
  R = 100000.0*R;
  float temperature=1.0/(log(R/100000.0)/B+1/298.15)-273.15;//convert to temperature via datasheet ;
  sensorValues[1]=temperature+10;
  Serial.print("Temp = ");
  Serial.println(sensorValues[1]);
  sensorValues[2] = map(analogRead(SENS_PRESSURE), 0, 1023, 720, 800);
  Serial.print("Pressure = ");
  Serial.println(sensorValues[2]); 
  sensorValues[3] = analogRead(SENS_LIGHT);    //Чтение датчика освещенности
  Serial.print("Light = ");
  Serial.println(sensorValues[3]);
}

void controlDevices()
{
  if (LED==1)
  {
    digitalWrite(LAMP,HIGH);
  }
  else
  {
    digitalWrite(LAMP,LOW);
  }
  if (Angle>=0 && Angle<=135)
  {
    myservo.write(Angle);
  }
  else
  {
    myservo.write(0);
  }
}

void sendDataIot()        // Подключение к серверу IoT ThingWorx
{
  Serial.println("Connecting to IoT server...");
  if (client.connect(iot_address, 80))
  {
    if (client.connected())    // Проверка установления соединения
    {
      Serial.println("Sending data to IoT server...\n");// Отправка заголовка сетевого пакета
      
      Serial.print("POST /Thingworx/Things/");
      client.print("POST /Thingworx/Things/");
      Serial.print(thingName);
      client.print(thingName);
      Serial.print("/Services/");
      client.print("/Services/");
      Serial.print(serviceName);
      client.print(serviceName);
      Serial.print("?appKey=");
      client.print("?appKey=");
      Serial.print(appKey);
      client.print(appKey);
      Serial.print("&method=post&x-thingworx-session=true");
      client.print("&method=post&x-thingworx-session=true");
      
      for (int idx = 0; idx < sensorCount; idx ++)// Отправка данных с датчиков
      {
        Serial.print("&");
        client.print("&");
        Serial.print(sensorNames[idx]);
        client.print(sensorNames[idx]);
        Serial.print("=");
        client.print("=");
        Serial.print(sensorValues[idx]);
        client.print(sensorValues[idx]);
      }
      // Закрываем пакет
      Serial.println(" HTTP/1.1");
      client.println(" HTTP/1.1");
      Serial.println("Accept: application/json");
      client.println("Accept: application/json");
      Serial.print("Host: ");
      client.print("Host: ");
      Serial.println(iot_server);
      client.println(iot_server);
      Serial.println("Content-Type: application/json");
      client.println("Content-Type: application/json");
      Serial.println();
      client.println();

      // Ждем ответа от сервера
      timer_iot_timeout = millis();
      while ((client.available() == 0) && (millis() < timer_iot_timeout + IOT_TIMEOUT1));

      // Выводим ответ о сервера, и, если медленное соединение, ждем выход по таймауту
      int iii = 0;
      bool currentLineIsBlank = true;
      bool flagJSON = false;
      timer_iot_timeout = millis();
      while ((millis() < timer_iot_timeout + IOT_TIMEOUT2) && (client.connected()))
      {
        while (client.available() > 0)
        {
          char symb = client.read();
          Serial.print(symb);
          if (symb == '{') flagJSON = true;
          else if (symb == '}') flagJSON = false;
          
          if (flagJSON == true)
          {
            buff[iii] = symb;
            iii ++;
          }
          timer_iot_timeout = millis();
        }
      }
      buff[iii] = '}';
      buff[iii + 1] = '\0';
      Serial.println(buff);
      client.println("Connection: close");
      client.stop();

      
      // Расшифровываем  ПОЛУЧЕНЫЙ ответ
      StaticJsonBuffer<BUFF_LENGTH> jsonBuffer;
      JsonObject& json_array = jsonBuffer.parseObject(buff);
      LED = json_array["LED"];
      Angle = json_array["Angle"];
      Serial.print("LED: ");
      Serial.println(LED);
      Serial.print("Angle: ");
      Serial.println(Angle);
      Serial.println();

      // Делаем управление устройствами
      controlDevices();

      Serial.println("Packet successfully sent!");
      Serial.println();
    }
  }
}





