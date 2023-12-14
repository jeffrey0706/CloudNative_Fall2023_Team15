CREATE DATABASE IF NOT EXISTS test;

USE test;

SET time_zone = "+08:00";

CREATE TABLE ParkingLots (
    ParkingLotID int AUTO_INCREMENT,
    Name varchar(255) UNIQUE,
    SpotCounts int,  -- total spot, not available spot
    longitude float,
    latitude float,
    PRIMARY KEY (ParkingLotID)
);

CREATE TABLE Areas (
    AreaID int AUTO_INCREMENT,
    ParkingLotID int NOT NULL,
    Name varchar(255) NOT NULL,
    Floor int,
    PRIMARY KEY (AreaID),
    FOREIGN KEY (ParkingLotID) REFERENCES ParkingLots(ParkingLotID),
    UNIQUE UniqueArea(`ParkingLotID`, `Name`, `Floor`)
);

CREATE TABLE ParkingSpots (
    ParkingSpotID int AUTO_INCREMENT,
    AreaID int NOT NULL,
    Number int NOT NULL,
    Available Boolean,
    Priority varchar(255),
    PRIMARY KEY (ParkingSpotID),
    FOREIGN KEY (AreaID) REFERENCES Areas(AreaID),
    UNIQUE UniqueParkingSpot(`AreaID`, `Number`)
);

CREATE TABLE Users (
    UserID int AUTO_INCREMENT,
    UserName varchar(255) NOT NULL,
    Password varchar(255) NOT NULL,
    Salt varchar(255) NOT NULL,
    HashedSaltedPassword varchar(255) NOT NULL,
    SessionKey varchar(255) NOT NULL,
    SessionExporedTime DATETIME NOT NULL,
    Preference int,
    Role varchar(255),
    Priority varchar(255),
    Expired DATETIME,
    PRIMARY KEY (UserID),
    FOREIGN KEY (Preference) REFERENCES ParkingLots(ParkingLotID)
);

CREATE TABLE Cars (
    CarID int AUTO_INCREMENT,
    Lisence varchar(255) not NULL,
    UserID int,
    FOREIGN KEY (UserID) REFERENCES Users(UserID),
    PRIMARY KEY (CarID)
);

CREATE TABLE Reservations (
    CarID int NOT NULL,
    ParkingSpotID int NOT NULL,
    ReservationTime DATETIME,
    ExpiredTime DATETIME,
    FOREIGN KEY (CarID) REFERENCES Cars(CarID),
    FOREIGN KEY (ParkingSpotID) REFERENCES ParkingSpots(ParkingSpotID),
    CONSTRAINT PK_Reservation PRIMARY KEY (CarID, ParkingSpotID)
);

CREATE TABLE Attendances (
    CarID int NOT NULL,
    ParkingSpotID int NOT NULL,
    ParkTime DATETIME,
    ExitTime DATETIME,
    FOREIGN KEY (CarID) REFERENCES Cars(CarID),
    FOREIGN KEY (ParkingSpotID) REFERENCES ParkingSpots(ParkingSpotID),
    CONSTRAINT PK_Attendance PRIMARY KEY (CarID, ParkingSpotID)
);

CREATE TABLE Records (
    RecordID int AUTO_INCREMENT,
    CarID int NOT NULL,
    ParkingSpotID int NOT NULL,
    ReservationTime DATETIME,
    ExpiredTime DATETIME,
    ParkTime DATETIME,
    ExitTime DATETIME,
    FOREIGN KEY (CarID) REFERENCES Cars(CarID),
    FOREIGN KEY (ParkingSpotID) REFERENCES ParkingSpots(ParkingSpotID),
    PRIMARY KEY (RecordID)
);

CREATE EVENT IF NOT EXISTS DeleteExpiredReservationsEvent
ON SCHEDULE EVERY 30 SECOND
DO
    DELETE FROM Reservations
    WHERE (DATE_ADD(ExpiredTime, INTERVAL 2 HOUR) <= NOW());

CREATE TRIGGER IF NOT EXISTS AtferDeleteFromReservations
AFTER DELETE ON Reservations
FOR EACH ROW
    INSERT INTO Records (CarID, ParkingSpotID, ReservationTime, ExpiredTime, ParkTime, ExitTime)
    VALUES (OLD.CarID, OLD.ParkingSpotID, OLD.ReservationTime, OLD.ExpiredTime, NULL, NULL);

CREATE TRIGGER IF NOT EXISTS AtferDeleteFromAttendances
AFTER DELETE ON Attendances
FOR EACH ROW
    UPDATE Records
    SET ParkTime = (
        OLD.ParkTime
    ),
    ExitTime = (
        OLD.ExitTime
    )
    WHERE ((CarID=OLD.CarID) AND (ParkingSpotID=OLD.ParkingSpotID))
    ORDER BY RecordID DESC LIMIT 1;