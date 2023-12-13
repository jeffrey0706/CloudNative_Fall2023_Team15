USE test;

INSERT INTO ParkingLots (Name, SpotCounts)
VALUES 
('F1', 12),
('F2', 18),
('F3', 6);

INSERT INTO Areas (ParkingLotID, Name, Floor)
VALUES
(1, 'A', 1),
(1, 'B', 1),
(2, 'A', 1),
(2, 'B', 2),
(2, 'C', 2),
(3, 'A', 1);

INSERT INTO ParkingSpots (AreaID, Number, Available, Priority)
VALUES
(1, 1, 1, 'Prority'),
(1, 2, 0, 'General'),
(1, 3, 1, 'General'),
(1, 4, 0, 'General'),
(1, 5, 1, 'General'),
(1, 6, 0, 'General'),
(2, 1, 1, 'Prority'),
(2, 2, 1, 'Prority'),
(2, 3, 0, 'General'),
(2, 4, 1, 'General'),
(2, 5, 1, 'General'),
(2, 6, 1, 'General'),
(3, 1, 0, 'Prority'),
(3, 2, 0, 'Prority'),
(3, 3, 0, 'General'),
(3, 4, 0, 'General'),
(3, 5, 0, 'General'),
(3, 6, 0, 'General'),
(4, 1, 1, 'Prority'),
(4, 2, 1, 'Prority'),
(4, 3, 1, 'Prority'),
(4, 4, 1, 'General'),
(4, 5, 1, 'General'),
(4, 6, 1, 'General'),
(5, 1, 0, 'Prority'),
(5, 2, 0, 'General'),
(5, 3, 1, 'General'),
(5, 4, 1, 'General'),
(5, 5, 1, 'General'),
(5, 6, 1, 'General'),
(6, 1, 1, 'Prority'),
(6, 2, 1, 'Prority'),
(6, 3, 0, 'General'),
(6, 4, 1, 'General'),
(6, 5, 1, 'General'),
(6, 6, 0, 'General');



INSERT INTO Users (UserName, Password, Salt, HashedSaltedPassword, SessionKey, SessionExporedTime, Preference, Role, Priority, Expired)
VALUES
('Alice', 'alice', 'sender',  'alicesender', 'a', '2023-12-25 12:00:00', 1, 'Employee', 'Top', NULL),
('Bob', 'bob', 'receiver', 'bobreceiver', 'b', '2023-12-25 12:00:00', 1, 'Employee', 'Normal', NULL),
('Eve', 'eve', 'middle', 'evemiddle', 'c', '2023-12-25 12:00:00', 2, 'Attendant', 'Normal', NULL);

INSERT INTO Cars (UserID, Lisence)
VALUES
(1, 'AGE-6277'),
(2, 'GFD-8542'),
(3, 'ABC-8542');

-- INSERT INTO Appointments (CarID, ParkingSpotID, ReservationTime, ExpiredTime, ParkTime, ExitTime)
-- VALUES
-- (1, 3, '2023-12-13 12:00:00', '2023-12-13 15:00:00', NULL, NULL),
-- (3, 2, '2023-12-13 12:00:00', '2023-12-13 13:00:00', '2023-12-13 12:50:00', '2023-12-13 14:50:00'),
-- (2, 2, '2023-12-13 12:00:00', '2023-12-13 13:00:00', '2023-12-13 12:50:00', NULL);

-- INSERT INTO Records (CarID, ParkingSpotID, StartTime, ExitTime)
-- VALUES
-- ();