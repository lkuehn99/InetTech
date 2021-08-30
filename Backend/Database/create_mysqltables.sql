DROP TABLE if exists Benutzer;
DROP TABLE if exists Vorlesungen;
DROP TABLE if exists Modul;
DROP TABLE if exists Studiengruppen;
DROP TABLE if exists hat;

CREATE Table Modul(
	ID_Modul INTEGER PRIMARY KEY,
	Name VARCHAR (200) NOT NULL
);
CREATE Table Studiengruppen(
	ID_Studiengruppe INTEGER PRIMARY KEY,
	Name VARCHAR (30) NOT NULL
);

CREATE Table Benutzer(
	Benutzername VARCHAR (30) PRIMARY KEY,
	Vorname VARCHAR (30) NOT NULL,
	Nachname VARCHAR (30) NOT NULL,
	rolle ENUM('Student', 'Admin'), 
	Passwort VARCHAR (255),
	ID_Studiengruppe INTEGER REFERENCES Studiengruppen
);
CREATE Table Vorlesungen(
	ID_Vorlesung INTEGER PRIMARY KEY,
	Beginn timestamp,
	Ende timestamp,
	Prot VARCHAR (30) REFERENCES Benutzer,
	ID_Modul INTEGER REFERENCES Modul
);
CREATE Table hat(
	ID_Studiengruppe INTEGER REFERENCES Studiengruppen,
	ID_Modul INTEGER REFERENCES Modul,
	PRIMARY KEY (ID_Modul, ID_Studiengruppe)
);

INSERT INTO Studiengruppen(ID_Studiengruppe, Name)
VALUES(1, 'WS-18-II'),
(2, 'WS-19-II');

INSERT INTO Modul(ID_Modul, Name)
VALUES(1, 'Datenbanken'),
(2, 'Elektronische Dokumente'),
(3, 'Accounting');

INSERT INTO Benutzer(Benutzername, Vorname, Nachname, rolle, Passwort, ID_Studiengruppe)
VALUES('treinig','Thomas','Reinig','Student','4fcaf07c3790bd48a564ef8e05c7abdc',1),
('nengel','Niklas','Engel','Student','17ac5400676655300e7898906fbfcf33',1),
('lkuehn','Leon','Kuehn','Student','0ed260a8f7f8c7534859e1edd52337a0',2),
('fvoss','Frederik','Voss','Student','692359073981e56c2b10ab2d592ac2f9',1),
('dsuffel','Dennis','Suffel','Student','51782ea7286c92803385c67f667155c1',2);

INSERT INTO Vorlesungen(ID_Vorlesung, Beginn, Ende, Prot, ID_Modul)
VALUES(1, '2021-10-01 08:30:00', '2021-10-01 11:45:00', 'nengel', 2),
(2, '2021-10-02 08:30:00', '2021-10-02 11:45:00', 'lkuehn', 1),
(3, '2021-10-03 08:30:00', '2021-10-03 11:45:00', 'treinig', 3),
(4, '2021-10-06 12:45:00', '2021-10-06 16:00:00', 'dsuffel', 1),
(5, '2021-10-07 12:45:00', '2021-10-07 16:00:00', 'fvoss', 2),
(6, '2021-10-08 12:45:00', '2021-10-07 16:00:00', 'nengel', 3),
(7, '2021-10-09 08:30:00', '2021-10-03 11:45:00', 'treinig', 3);

INSERT INTO hat(ID_Studiengruppe, ID_Modul)
VALUES(1,3),
(2,1),
(1,2),
(1,1);
