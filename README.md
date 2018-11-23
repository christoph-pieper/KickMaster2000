# KickMaster2000
Amazing IVU Tipp-Kick Clock

Vorbereitungen: Der Webserver greift auf eine MongoDB zu. Diese muss vor dem Start des Servers (Punkt 3) gestartet werden. Die Zugangsdaten zur Datenbank können unter "./webinterface/server/database/dbconfig.json" gesetzt werden.


Zum Starten (für Development) des Webinterfaces: 
1. Repository Pull
2. im Ordner ./webinterface Befehl "npm install" auswählen (installiert alle benötigten Bibliotheken)
3. anschließend in gleichem Ordner "npm start" für Starten des Backends ausführen
4. neue Konsole öffnen, ebenfalls im Ordner ./webinterface den Befehl "ng serve" ausführen für Start des Frontends. Ist anschließend unter localhost:4200 erreichbar.
