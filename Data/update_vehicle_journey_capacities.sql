--update the capacity of all vehicles which already have too many bookings
UPDATE Vehicle as V1 SET capacity = newCap 
FROM (
	SELECT COUNT(booking.journey_id) as newCap, vehicle_code
	FROM booking NATURAL JOIN Journey NATURAL JOIN Vehicle
	GROUP BY journey_id, capacity, vehicle_code
	HAVING COUNT(booking.journey_id) > capacity
	) AS sq
WHERE V1.vehicle_code = sq.vehicle_code;

--update the nbooked for all journeys
UPDATE Journey as J1 SET nbooked = newCap
FROM (
	SELECT COUNT(booking.journey_id) as newCap, journey_id
	FROM booking NATURAL JOIN Journey NATURAL JOIN Vehicle
	GROUP BY journey_id, capacity, vehicle_code
	HAVING COUNT(booking.journey_id) > capacity
	) AS sq
WHERE J1.journey_id = sq.journey_id;