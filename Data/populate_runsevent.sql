CREATE TABLE roles (
 role varchar(10) PRIMARY KEY
);

INSERT INTO roles VALUES('time keep');
INSERT INTO roles VALUES('judge');
INSERT INTO roles VALUES('boss');
INSERT INTO roles VALUES('food man');
INSERT INTO roles VALUES('cleaner');
INSERT INTO roles VALUES('ticketer');
INSERT INTO roles VALUES('crowd ctrl');

DO $$
BEGIN
	FOR counter IN 1..1000 LOOP
	INSERT INTO runsevent VALUES(

	--random event
	(SELECT event_id
	FROM event
	ORDER BY random()
	LIMIT 1),

	--random official
	(SELECT member_id
	FROM official
	ORDER BY random()
	LIMIT 1),

	--random role
	(SELECT * 
	FROM roles
	ORDER BY random()
	LIMIT 1)

	);
   END LOOP;
END; $$;

DROP TABLE roles;