
/*
INSERT INTO olympics.Vehicle
	VALUES('ABC', 10);
	
INSERT INTO olympics.Journey
	VALUES(1, '2017-05-11 00:00:00',2,4, 'ABC', 1);
	
INSERT INTO olympics.Booking
	VALUES('A000043404', 'A000021703', '2017-05-11 00:00:00', 1);

*/

-- Member Details
--WHERE clause should match the member_id from login screen.	
SELECT M.member_id as member_id, accommodation as Accomodation, COUNT((SELECT COUNT(B.booked_for) FROM olympics.booking B WHERE booked_for = 'A000043404')) as bookings
FROM Member M
WHERE M.member_id = 'A000043404'
GROUP BY M.member_id;

--Member Login
SELECT * --Login status?
FROM olympics.Member M
WHERE M.memeber_id = 'login' AND M.password = 'password';

--Browse Bookings
SELECT B.booked_for, B.booked_by, J.depart_time
FROM olympics.booking B JOIN olympics.journey J ON (J.journey_id = B.journey_id)
WHERE booked_for = login.member_id //'login member_id'
ORDER by J.depart_time ASC;

--Search Journeys
SELECT depart_time AS Departing, from_place AS From, to_place AS To, nbooked AS Booked,
FROM Journey
WHERE depart_time >= date.entered 
    AND depart_time <= date.entered 
    AND to_place = location.entered
ORDER BY depart_time ASC;

--Make booking

--Trigger?


--Browse Events
SELECT *
From Event;

--Browse Event results (Dunno if it works)
SELECT M.given_name || m.famiy_name AS Medallist, medal AS Medal, E.event_name AS Event
FROM participates P JOIN Athelete A ON (P.athelete_id = A.member_id) 
                    JOIN event E ON (P.event_id = E.event_id) 
                    JOIN member M ON (A.athelete_id = M.member_id)
ORDER BY Medallist ASC;

