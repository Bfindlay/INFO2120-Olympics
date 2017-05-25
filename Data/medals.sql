WITH goldmedalists AS (
    SELECT DISTINCT ON (event_id) event_id, athlete_id
    FROM Participates 
    WHERE medal IS NULL
    AND event_id NOT IN (SELECT event_id FROM Participates WHERE medal='G')
    ORDER BY event_id, random()
)
UPDATE Participates
SET medal='G'
WHERE (event_id, athlete_id) IN (SELECT event_id, athlete_id FROM goldmedalists);


WITH silvermedalists AS (
    SELECT DISTINCT ON (event_id) event_id, athlete_id, medal
    FROM Participates 
    WHERE medal IS NULL
    AND event_id NOT IN (SELECT event_id FROM Participates WHERE medal='S')
    ORDER BY event_id, random()
)
UPDATE Participates
SET medal='S'
WHERE (event_id, athlete_id) IN (SELECT event_id, athlete_id FROM silvermedalists);

WITH bronzemedalists AS (
    SELECT DISTINCT ON (event_id) event_id, athlete_id, medal
    FROM Participates 
    WHERE medal IS NULL
    AND event_id NOT IN (SELECT event_id FROM Participates WHERE medal='B')
    ORDER BY event_id, random()
)
UPDATE Participates
SET medal='B'
WHERE (event_id, athlete_id) IN (SELECT event_id, athlete_id FROM bronzemedalists);

select *
FROM Participates
ORDEr BY event_id, medal;