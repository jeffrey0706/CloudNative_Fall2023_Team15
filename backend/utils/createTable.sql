CREATE TABLE ParkingLots (
    ParkingLotID int AUTO_INCREMENT,
    Name varchar(255),
    SpotCounts int,
    PRIMARY KEY (ParkingLotID)
);

CREATE TABLE Area (
    AreaID int AUTO_INCREMENT,
    ParkingLotID int NOT NULL,
    Name varchar(255) NOT NULL,
    Floor int,
    Preference int,
    PRIMARY KEY (AreaID),
    FOREIGN KEY (ParkingLotID) REFERENCES ParkingLots(ParkingLotID)
);

CREATE TABLE ParkingSpots (
    ParkingSpotID int AUTO_INCREMENT,
    AreaID int NOT NULL,
    Number int NOT NULL,
    Available Boolean,
    Priority varchar(255),
    PRIMARY KEY (ParkingSpotID),
    FOREIGN KEY (AreaID) REFERENCES Area(AreaID)
);

CREATE TABLE Users (
    UserID int NOT NULL,
    Preference int,
    Role varchar(255),
    Priority varchar(255),
    Expired DATETIME,
    PRIMARY KEY (UserID),
    FOREIGN KEY (Preference) REFERENCES Area(AreaID)
);

CREATE TABLE Cars (
    CarID int NOT NULL,
    UserID int,
    FOREIGN KEY (UserID) REFERENCES Users(UserID),
    PRIMARY KEY (CarID)
);

CREATE TABLE Reservation (
    CarID int NOT NULL,
    ParkingSpotID int NOT NULL,
    StartTime DATETIME,
    ExitTime DATETIME,
    FOREIGN KEY (CarID) REFERENCES Cars(CarID),
    FOREIGN KEY (ParkingSpotID) REFERENCES ParkingSpots(ParkingSpotID),
    CONSTRAINT PK_Reservation PRIMARY KEY (CarID, ParkingSpotID)
);

CREATE TABLE Record (
    CarID int NOT NULL,
    ParkingSpotID int NOT NULL,
    StartTime DATETIME,
    ExitTime DATETIME,
    FOREIGN KEY (CarID) REFERENCES Cars(CarID),
    FOREIGN KEY (ParkingSpotID) REFERENCES ParkingSpots(ParkingSpotID),
    CONSTRAINT PK_Record PRIMARY KEY (CarID, ParkingSpotID)
);