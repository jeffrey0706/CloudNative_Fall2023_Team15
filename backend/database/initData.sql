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



INSERT INTO Users (UserName, Password, Salt, HashedSaltedPassword , Preference, Role, Priority, Expired)
VALUES
('Alice', 'alice', 'sender', 'bc1f78f6f37c8c990f582dc8bee31007a2885f0295a4c3a4f5dae5d6bc0c4a689afedbb0dc05f50af71d7f41e95e3cb2a55c3616ff67f5bd08d3558638087be1', 1, 'Employee', 'Top', NULL),
('Bob', 'bob', 'receiver', 'b79ac182cb3dc585b5ded782f27308a0432895c51d2a74767badb87ac0b976f74cd04a9f6b0de520de925d11db8627a26340a5458506aab44c6c2e7dc43b240b', 1, 'Employee', 'Normal', NULL),
('Eve', 'eve', 'middle', '845ca0231c54416853637ec8d6b237b4c7a1245a70ef236f05677da19c2dc71f99dc20ec4360f81b16ab6a37b59e4e58872ae4962064857e852f8911c631fb31', 2, 'Attendant', 'Normal', NULL);


INSERT INTO Cars (UserID, Lisence)
VALUES
(1, 'AGE-6277'),
(2, 'GFD-8542'),
(3, 'EJF-8542');

-- INSERT INTO Reservations (CarID, ParkingSpotID, ReservationTime, ExpiredTime)
-- VALUES
-- (1, 1, '2023-12-14 12:00:00', '2023-12-14 13:00:00'),
-- (2, 2, '2023-12-14 12:00:00', '2023-12-14 17:00:00'),
-- (3, 3, '2023-12-14 12:00:00', '2023-12-14 13:00:00');

-- INSERT INTO Attendances (CarID, ParkingSpotID, ParkTime, ExitTime)
-- VALUES
-- (1, 1, '2023-12-14 14:30:00', '2023-12-14 15:30:00');

-- INSERT INTO Reservations (CarID, ParkingSpotID, ReservationTime, ExpiredTime)
-- VALUES
-- (1, 1, '2023-12-14 13:00:00', '2023-12-14 14:00:00');

-- delete from Attendances where CarID=1;