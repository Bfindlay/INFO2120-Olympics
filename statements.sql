/*

TODO

Extras;
-Get type of person - done
-Get get full country name, team and event under details
-Retrive team details
-List sportvenues and events that run in the,
-List accommodation building and people inside it.
-List of people that are running an event
*/

/*

Staff for journeys/booking
A000026985
cool

Staff for booked_by
A000021705
chicago1

	
INSERT INTO olympics.Journey
	VALUES(1, '2017-05-11 00:00:00',2, 4, 'LBII-402', 1, '2017-05-11 00:30:00');  (Erskineville - Erskineville Road) (Newtown - Camperdown Memorial Park)
	
INSERT INTO olympics.Journey
	VALUES(2, '2017-05-12 00:00:00',4, 2, 'HRXN-121', 1, '2017-05-12 00:45:00');

INSERT INTO olympics.Journey
	VALUES(3, '2017-06-11 00:00:00',8, 10, 'DVOJ-135', 1, '2017-06-11 12:31:00');
	
INSERT INTO olympics.Journey
	VALUES(4, '2017-06-12 00:00:00',10, 8, 'EEOV-129', 1, '2017-06-12 01:46:52');
	
INSERT INTO olympics.Booking
	VALUES('A000026985', 'A000021705', '2016-04-11 00:00:00', 1);

INSERT INTO olympics.Booking
	VALUES('A000026985', 'A000021705', '2016-10-12 00:00:00', 2);
	
INSERT INTO olympics.Booking
	VALUES('A000026985', 'A000021705', '2016-10-12 00:01:00', 3);

INSERT INTO olympics.Booking
	VALUES('A000026985', 'A000021705', '2016-10-12 00:02:00', 4);

*/

--Get People in the current journey/booking
INSERT INTO olympics.booking
	VALUES('A000021704', 'A000021705', '2017-11-12 12:00:00' , 2);
	
SELECT given_names || ' ' || family_name AS Person
FROM olympics.booking B JOIN olympics.Member M ON (B.booked_for = M.member_id) JOIN olympics.journey J ON (B.journey_id = J.journey_id)
WHERE B.journey_id = 2;


-- Member Details
--Get member_id, accomodation building name, number of bookings
SELECT M.member_id as member_id, P.place_name as Accomodation, COUNT((SELECT COUNT(B.booked_for) FROM olympics.booking B WHERE booked_for = 'A000043404')) as bookings
FROM olympics.Member M JOIN olympics.place P ON (M.accommodation = P.place_id)
WHERE M.member_id = 'A000043404'
GROUP BY M.member_id, P.place_name;

--Member Login
SELECT * --Login status?
FROM olympics.Member M
WHERE M.memeber_id = 'login' AND M.password = 'password';

--Get type of member
--Returns Athelete, Staff or Offiial
SELECT CASE WHEN (SELECT EXISTS(SELECT * FROM olympics.Athlete A WHERE M.member_id = A.member_id)) = 't' THEN 'Athlete'
	    WHEN (SELECT EXISTS(SELECT * FROM olympics.official O WHERE M.member_id = O.member_id)) = 't' THEN 'Official'
	    WHEN (SELECT EXISTS(SELECT * FROM olympics.Staff S WHERE M.member_id = S.member_id)) = 't' THEN 'Staff' ELSE 'Unknown' END
FROM olympics.member M
WHERE M.member_id = 'A000021704';

--Get Team details



--Browse Bookings
--Shows full name raher than ID for booked_by and booked_for
--Shows full name for origin and destination

SELECT M.given_names || ' ' || M.family_name AS Booked_for, MM.given_names || ' ' || MM.family_name AS Booked_By, P.place_name AS to_place, PP.place_name AS from_place, depart_time, arrive_time
FROM olympics.booking B 
            JOIN olympics.journey J USING (journey_id) 
			JOIN olympics.member M ON (B.booked_for = M.member_id) 
			JOIN olympics.member MM ON (B.booked_by = MM.member_id) 
			JOIN olympics.place P ON (J.from_place = P.place_id)
			JOIn olympics.place PP ON (J.to_place = PP.place_id)
WHERE M.member_id = 'A000032115'

--Search Journeys
--Returns the departing time, the origin location, destination, number booked and space remaining (boolean)

SELECT depart_time AS Departing, P.place_name AS From, PP.place_name AS To, J.nbooked AS Booked, (SELECT EXISTS(SELECT capacity FROM olympics.vehicle V WHERE J.vehicle_code = V.vehicle_code AND J.nbooked <= V.capacity)) AS space_avail
FROM olympics.Journey J JOIN olympics.place P ON (J.from_place = P.place_id) JOIN olympics.place PP ON (J.to_place = PP.place_id)
WHERE depart_time >= '2017-04-01 10:20:36.031383'
    AND depart_time <= '2017-06-01 22:52:28.647764'
    AND to_place = 356
ORDER BY depart_time ASC;


/**
Combine These together so when a event is expaned, then the results will show up.
/*********************************************/
*/

--Browse Events, returns event name, gender, sport venue and start timestamp
SELECT E.event_name, CASE WHEN E.event_gender = 'M' THEN 'Male'WHEN E.event_gender = 'W' THEN 'Women' ELSE 'Unknown' END, P.place_name, E.event_start
FROM olympics.event E JOIN olympics.place P ON (E.sport_venue = P.place_id)

--Browse Event results 
SELECT M.given_names || ' ' || m.family_name AS Medallist, medal AS Medal, E.event_name AS Event
FROM olympics.participates P JOIN olympics.athlete A ON (P.athlete_id = A.member_id) 
                             JOIN olympics.event E ON (P.event_id = E.event_id) 
                             JOIN olympics.member M ON (A.member_id = M.member_id)
ORDER BY Medallist ASC;

--Get Event details (Event name, first last name of officials, roles)
SELECT E.event_name , M.given_names || ' ' || M.family_name AS name, role
FROM olympics.runsevent RE JOIN olympics.event E USING (event_id) JOIN olympics.member M ON (RE.member_id = M.member_id)
WHERE RE.event_id = 3;


/*********************************************/
--PAGED Results
--USE LIMIT xxx, etc


/**
TO DOCheck Staff is a valid tuple in olympics.staff
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


