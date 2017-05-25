--might need to run this a couple of times until the randoms Ids doon't conflict
DO $$
BEGIN
   FOR counter IN 1..1000 LOOP


 	INSERT INTO Journey VALUES(
	--random id
	(SELECT floor(random()*(1000000-1))+0 as id),

	--random time
	(select timestamp '2017-03-01 00:00:00' +
	random() * (timestamp '2017-07-01 00:00:00' -
                   timestamp '2017-03-01 00:00:00')),

       --random place
	(SELECT place_id
	FROM Place
	ORDER BY random()
	LIMIT 1),

	--random place
	(SELECT place_id
	FROM Place
	ORDER BY random()
	LIMIT 1),

	--randoom vehicle
	(SELECT vehicle_code
	FROM vehicle
	ORDER BY random()
	LIMIT 1),

	0	
	);
 
   END LOOP;
END; $$;

