--might need to run this a couple of times until the randoms Ids doon't conflict
DO $$
BEGIN
   FOR counter IN 1..1000 LOOP
	INSERT INTO Booking VALUES (

	--random booked for
	(SELECT member_id
	FROM Member
	ORDER BY random()
	LIMIT 1),

	--random booked by
	(SELECT member_id
	FROM Staff
	ORDER BY random()
	LIMIT 1),

	--random time of booking
	(select timestamp '2014-01-10 20:00:00' +
	random() * (timestamp '2017-05-20 00:00:00' -
		   timestamp '2014-01-01 00:00:00')),


	--random journey id
	(SELECT journey_id
	FROM journey
	ORDER BY random()
	LIMIT 1)
	);

  END LOOP;
END; $$;