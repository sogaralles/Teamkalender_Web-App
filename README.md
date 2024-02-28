# TeamKalender

##Achtung Server IP muss im Code vorab angepasst werden! markiert durch //bwcloud IP can be changed
app.module.ts -> url + redirectUri
calender.component.ts -> GET Request
create-appointment.ts -> POST Request
daily-appointment.component.ts -> GET Request
home.component.ts -> GET Request
Für genauere Details siehe Dokumentation Kapitel Inbetriebnahme.

## Node v16.14.2 installieren

curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
nvm install 16.14.2

npm install express


##Docker 24.0.7 installieren
Sudo apt-get update
sudo apt-get install ca-certificates curl
sudo install -m 0755-d /etc/apt/keyrings

sudo curl -fsSL
https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
sudo chmod a+r /etc/apt/keyrings/docker.asc 

echo\
"deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu \
  $(. /etc/os-release &&echo"$VERSION_CODENAME") stable"|\
sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt-get update
VERSION_STRING=5:24.0.7-1~ubuntu.20.04~focal
sudo apt-get install docker-ce=$VERSION_STRING docker-ce-cli=$VERSION_STRING containerd.io docker-buildx-plugin docker-compose-plugin



##Agular CLI 14 installieren
npm install -g @angular/cli@14

##Frontend Docker-image bauen
docker build -t <imageName> .
docker run -d -p 4200:80 <imageName>

##Keycloak starten
cd Teamkalender/keycloak/
sudo docker-compose up -d
docker ps -a
docker exec -it {contaierID} bash
cd /opt/jboss/keycloak/bin
./kcadm.sh config credentials --server http://<ServerIP>:8080/auth --realm master --user admin1

Passwort: admin1

./kcadm.sh update realms/master -s sslRequired=NONE

Im Browser auf der Administrationsoberflaeche unter '<ServerIP>:8080' anmelden mit:
Benutzer: admin1
Passwort: admin1

importiere über Select Realm das im keycloakRealm Ordner liegende Realm
Wichtig! 
Name: teamkalender-realm
enabled: on

Wieder zurueck zum virtuellen Server, immernoch im Docker Container:
./kcadm.sh update realms/teamkalender-realm -s sslRequired=NONE

exit

## Backend im Hintergrund starten
cd ..
cd backend/
node app.js &


Nun kann im Browser das Frontend ueber 'http://<ServerIP>:4200' aufgerufen werden.




