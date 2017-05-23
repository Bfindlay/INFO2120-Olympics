
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


--


