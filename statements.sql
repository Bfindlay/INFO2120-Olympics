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
-----------------------------------------------


--Get detailed booking details
SELECT M.given_names || ' ' || M.family_name, vehicle_code, depart_time, date(J.depart_time), P.place_name As to, PP.place_name AS from, MM.given_names AS booked_by, when_booked
FROM olympics.booking B JOIN olympics.member M ON (B.booked_for = M.member_id) 
			 JOIN olympics.member MM ON (B.booked_by = MM.member_id)
			 JOIN olympics.journey J ON(B.journey_id = J.journey_id)
			 JOIN olympics.place P ON (P.place_id = J.from_place)
			 JOIN olympics.place PP ON (PP.place_id = J.to_place)
			 JOIN olympics.vehicle V USING(vehicle_code)
WHERE booked_for = 'A000026985';
-----------------------------------------------

-- Member Details
--Get member_id, accomodation building name, number of bookings
SELECT M.member_id as member_id, P.place_name as Accomodation, COUNT((SELECT COUNT(B.booked_for) FROM olympics.booking B WHERE booked_for = 'A000043404')) as bookings
FROM olympics.Member M JOIN olympics.place P ON (M.accommodation = P.place_id)
WHERE M.member_id = 'A000043404'
GROUP BY M.member_id, P.place_name;
-----------------------------------------------
--Member Login
SELECT * --Login status?
FROM olympics.Member M
WHERE M.memeber_id = 'login' AND M.password = 'password';
-----------------------------------------------
--Get type of member
--Returns Athelete, Staff or Offiial
SELECT CASE WHEN (SELECT EXISTS(SELECT * FROM olympics.Athlete A WHERE M.member_id = A.member_id)) = 't' THEN 'Athlete'
	    WHEN (SELECT EXISTS(SELECT * FROM olympics.official O WHERE M.member_id = O.member_id)) = 't' THEN 'Official'
	    WHEN (SELECT EXISTS(SELECT * FROM olympics.Staff S WHERE M.member_id = S.member_id)) = 't' THEN 'Staff' ELSE 'Unknown' END
FROM olympics.member M
WHERE M.member_id = 'A000021704';
-----------------------------------------------

--Get Team details
-----------------------------------------------
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
-----------------------------------------------
--Search Journeys
--Returns the departing time, the origin location, destination, number booked and space remaining (boolean)

SELECT depart_time AS Departing, P.place_name AS From, PP.place_name AS To, J.nbooked AS Booked, (SELECT EXISTS(SELECT capacity FROM olympics.vehicle V WHERE J.vehicle_code = V.vehicle_code AND J.nbooked <= V.capacity)) AS space_avail
FROM olympics.Journey J JOIN olympics.place P ON (J.from_place = P.place_id) JOIN olympics.place PP ON (J.to_place = PP.place_id)
WHERE depart_time >= '2017-04-01 10:20:36.031383'
    AND depart_time <= '2017-06-01 22:52:28.647764'
    AND to_place = 356
ORDER BY depart_time ASC;
-----------------------------------------------

/**
Combine These together so when a event is expaned, then the results will show up.
/*********************************************/
--Browse Events, returns event name, gender, sport venue and start timestamp
SELECT E.event_name, CASE WHEN E.event_gender = 'M' THEN 'Male'WHEN E.event_gender = 'W' THEN 'Women' ELSE 'Unknown' END, P.place_name, E.event_start
FROM olympics.event E JOIN olympics.place P ON (E.sport_venue = P.place_id)

--Browse Event results 
SELECT M.given_names || ' ' || m.family_name AS Medallist, medal AS Medal, E.event_name AS Event, sport_name, discipline
FROM olympics.participates P JOIN olympics.athlete A ON (P.athlete_id = A.member_id) 
                             JOIN olympics.event E ON (P.event_id = E.event_id) 
                             JOIN olympics.member M ON (A.member_id = M.member_id)
                             JOIN olympics.sport S USING (sport_id)
WHERE medal IS NOT NULL
ORDER BY Medallist ASC;

--Search for events
SELECT * FROM olympics.Event WHERE Event_name LIKE '%';
-----------------------------------------------

--Get Event details (Event name, first last name of officials, roles)
SELECT E.event_name , M.given_names || ' ' || M.family_name AS name, role
FROM olympics.runsevent RE JOIN olympics.event E USING (event_id) JOIN olympics.member M ON (RE.member_id = M.member_id)
WHERE RE.event_id = 3;


/******nbooked updated when booking is added ******/
--"HRXN-121" Max of 2
--Adding A000030765 to Journey 2


DELETE FROM olympics.booking
	WHERE journey_id = 2;
	
DELETE FROM olympics.journey
	WHERE journey_id = 2;
	
CREATE FUNCTION Staff_Booking()
	RETURNS TRIGGER AS
		$Staff_Booking$
	DECLARE
		_count INTEGER;
		_capacity INTEGER;
		_staffBool bool;
	BEGIN
		SELECT nbooked INTO _count
		FROM olympics.journey
		WHERE journey_id = NEW.journey_id;

		SELECT capacity INTO _capacity
		FROM olympics.journey J JOIN olympics.vehicle V USING (vehicle_code)
		WHERE J.journey_id = NEW.journey_id;

		SELECT EXISTS(SELECT * FROM olympics.Staff S JOIN olympics.member M USING (member_id) WHERE M.member_id = NEW.booked_by) INTO _staffBool;
	
		IF _count >= _capacity THEN
			RAISE EXCEPTION 'Capacity Reached';
			ROLLBACK;
		ELSIF  _staffBool = 'f' THEN
			RAISE EXCEPTION 'Not a Staff Member';
			ROLLBACK;
		END IF;
		UPDATE olympics.journey
		SET nbooked = nbooked + 1
		WHERE journey_id = NEW.journey_id;
		RETURN NEW;
	COMMIT;
	END;
	$Staff_Booking$ LANGUAGE plpgsql;

CREATE TRIGGER Staff_Booking BEFORE INSERT OR UPDATE ON olympics.booking
FOR EACH ROW EXECUTE PROCEDURE Staff_Booking();

SELECT * FROM olympics.journey WHERE journey_id = 2;

INSERT INTO olympics.Journey
	VALUES(2, '2017-05-12 00:00:00',4, 2, 'HRXN-121', 0, '2017-05-12 00:45:00');

INSERT INTO olympics.booking
	VALUES('A000028072', 'A000021705', '2014-05-23 12:00:00', 2);
	
INSERT INTO olympics.Booking
	VALUES('A000026985', 'A000021705', '2016-10-12 00:00:00', 2);
	
INSERT INTO olympics.booking
	VALUES('A000028995', 'A000021705', '2014-05-23 12:00:00', 2);
SELECT * FROM olympics.journey WHERE journey_id = 2;

-----------------------------------------------
--Query for Player
--Shows Event name medals and total number of medals.

INSERT INTO olympics.participates
	VALUES(23, 'A000031618', 'G');
	
INSERT INTO olympics.participates
	VALUES(25 ,'A000031618', 'S');
	
SELECT E.event_name, P.medal, (SELECT COUNT(medal) FROM olympics.participates WHERE athlete_id ='A000031618') AS Total_Events
FROM olympics.participates P JOIN olympics.event E USING (event_id)
WHERE P.athlete_id = 'A000031618'
GROUP BY event_name, medal;

--Get team query

