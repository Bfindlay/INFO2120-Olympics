/*

TODO

Extras;
-Get type of person
-Get get full country name, team and event under details
-Retrive team details
-List sportvenues and events that run in the,
-List accommodation building and people inside it.
-List of people that are running an event


*/


-- Member Details
--Get memeber_id, accomodation building name, number of bookings
SELECT M.member_id as member_id, P.place_name as Accomodation, COUNT((SELECT COUNT(B.booked_for) FROM olympics.booking B WHERE booked_for = 'A000043404')) as bookings
FROM olympics.Member M JOIN olympics.place P ON (M.accommodation = P.place_id)
WHERE M.member_id = 'A000043404'
GROUP BY M.member_id, P.place_name;

--Member Login
SELECT * --Login status?
FROM olympics.Member M
WHERE M.memeber_id = 'login' AND M.password = 'password';

--Browse Bookings
--Shows full name raher than ID for booked_by and booked_for
--Shows full name for origin and destination

SELECT M.given_names || ' ' || M.family_name AS Booked_for, MM.given_names || ' ' || MM.family_name AS Booked_By, P.place_name AS to_place, PP.place_name AS from_place, depart_time
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
SELECT E.event_name, CASE WHEN E.event_gender = 'M' THEN 'Male'WHEN E.event_gender = 'F' THEN 'Female' ELSE 'Unknown' END, P.place_name, E.event_start
FROM olympics.event E JOIN olympics.place P ON (E.sport_venue = P.place_id)

--Browse Event results 
SELECT M.given_names || ' ' || m.family_name AS Medallist, medal AS Medal, E.event_name AS Event
FROM olympics.participates P JOIN olympics.athlete A ON (P.athlete_id = A.member_id) 
                             JOIN olympics.event E ON (P.event_id = E.event_id) 
                             JOIN olympics.member M ON (A.member_id = M.member_id)
ORDER BY Medallist ASC;

/*********************************************/
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


