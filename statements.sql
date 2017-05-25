
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
FROM olympics.Member M
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
FROM olympics.Journey
WHERE depart_time >= date.entered 
    AND depart_time <= date.entered 
    AND to_place = location.entered
ORDER BY depart_time ASC;

--Make booking

--Trigger?


--Browse Events
SELECT *
From Event;

--Browse Event results 
SELECT M.given_names || ' ' || m.family_name AS Medallist, medal AS Medal, E.event_name AS Event
FROM olympics.participates P JOIN olympics.athlete A ON (P.athlete_id = A.member_id) 
                             JOIN olympics.event E ON (P.event_id = E.event_id) 
                             JOIN olympics.member M ON (A.member_id = M.member_id)
ORDER BY Medallist ASC;

--PAGED Results
--USE LIMIT xxx, etc


/**
Check Staff is a valid tuple in olympics.staff
Returns true for existing, false for not existing

SELECT EXISTS(SELECT 1 FROM Olympics.staff S WHERE S.member_id = 'A000021703');


//UNTESTED

BEGIN TRANSACTION
--Check member does not exist in the booking to update

IF SELECT EXISTS(SELECT 1 FROM olympics.booking  B WHERE B.booked_for = '${memeber_id}) THEN
    ROLLBACK;
ELSE
--Check Journey nbooked capcacity, If exceeded rollback
IF SELECT COUNT(nbooked) FROM olympics.Journey J JOIN olympics.vehicle V USING (vehicle_code) WHERE J.nbooked < V.capacity > 1
--Add new Booking Entry
INSERT INTO olympics.bookings
    SET('${member_id}, '${member_id}', ${date}, ${journey_id});

--Update nbooked
UPDATE olympics.journey
    SET(nbooked = nbooked + 1);
COMMIT;

ELSE
ROLLBACK;
 */


