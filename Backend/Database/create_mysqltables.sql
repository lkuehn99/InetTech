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
	Beginn timestamp DEFAULT CURRENT_TIMESTAMP,
	Ende timestamp DEFAULT CURRENT_TIMESTAMP,
	Prot VARCHAR (30) REFERENCES Benutzer,
	ID_Hat INTEGER REFERENCES hat
);
CREATE Table hat(
	ID_Hat INTEGER PRIMARY KEY,
	ID_Studiengruppe INTEGER REFERENCES Studiengruppen,
	ID_Modul INTEGER REFERENCES Modul
);

INSERT INTO Studiengruppen(ID_Studiengruppe, Name)
VALUES(1, 'WS-18-II'),
(2, 'WS-19-II');

INSERT INTO Modul(ID_Modul, Name)
VALUES(1, 'Datenbanken'),
(2, 'Elektronische Dokumente'),
(3, 'Accounting');

INSERT INTO Benutzer(Benutzername, Vorname, Nachname, rolle, Passwort, ID_Studiengruppe)
VALUES('treinig','Thomas','Reinig','Student','$argon2i$v=19$m=16,t=2,p=1$UHZSTUlNY1JTODlKUFF6TQ$YM5esz6E4ofoxF0jC88kvA',1),
('nengel','Niklas','Engel','Student','$argon2i$v=19$m=16,t=2,p=1$UHZSTUlNY1JTODlKUFF6TQ$M1QvgKDzeogLWVPpoeXhSw',1),
('lkuehn','Leon','Kuehn','Student','$argon2i$v=19$m=16,t=2,p=1$UHZSTUlNY1JTODlKUFF6TQ$lsLB2ec6LW6m31hvzS4Yvg',2),
('fvoss','Frederik','Voss','Student','$argon2i$v=19$m=16,t=2,p=1$UHZSTUlNY1JTODlKUFF6TQ$5NevnsyR2rK1QfqfTh5Jkw',1),
('dsuffel','Dennis','Suffel','Student','$argon2i$v=19$m=16,t=2,p=1$UHZSTUlNY1JTODlKUFF6TQ$I+3kA9bWMBTF9uZzGrWfzw',2);

INSERT INTO Vorlesungen(ID_Vorlesung, Beginn, Ende, Prot, ID_Hat)
VALUES(1, '2021-10-01 08:30:00', '2021-10-01 11:45:00', 'nengel', 3),
(2, '2021-10-02 08:30:00', '2021-10-02 11:45:00', 'lkuehn', 2),
(3, '2021-08-30 08:30:00', '2021-10-03 11:45:00', 'treinig', 1),
(4, '2021-10-06 12:45:00', '2021-10-06 16:00:00', 'dsuffel', 2),
(5, '2021-10-07 12:45:00', '2021-10-07 16:00:00', 'fvoss', 3),
(6, '2021-10-08 12:45:00', '2021-10-07 16:00:00', 'nengel', 1),
(7, '2021-10-09 08:30:00', '2021-10-03 11:45:00', 'treinig', 1),
(8, '2021-10-10 08:30:00', '2021-10-03 11:45:00', 'fvoss', 4);

INSERT INTO hat
VALUES(1,1,3),
(2,2,1),
(3,1,2),
(4,1,1);
