
const Express = require('express');
const Router = Express.Router();
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken'); 
const bcrypt = require('bcrypt-nodejs');
const pg = require('pg');
const config = require('./dbconfig');
const SECRET_TOKEN = 'x1ODH27zt4sMUMW882iwCp3T6cvWBf38';
Router.use(bodyParser.json()); // support json encoded bodies
Router.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies


/**** DATABASE CONNECTION *****/
console.log('-----CONNECTING TO DATABASE ------');
const pool = new pg.Pool(config);
pool.on('error', function (err, client) {
  console.error('idle client error', err.message, err.stack);
});


/**** FOR TESTING  ******/

Router.post('/Test', (req,res) =>{
    const { query } = req.body
    console.log('Hello World');
     pool.query(query, (err, res) => {
        if(err)
           return console.error(err);
        console.log(res);
     });

})

/****** API ENDPOINTS ************/
//TODO VERIFY USING TOKEN IN REQ BODY

//Returns Member Id, Place_name, number of bookings

Router.post('/details/:member_id', (req, res) =>{
    const { member_id } = req.params;
    pool.query(`SELECT M.member_id as member_id, p.place_name, COUNT((SELECT COUNT(B.booked_for) FROM olympics.booking B
        WHERE booked_for = '${member_id}')) as bookings FROM olympics.Member M JOIN olympics.place P ON (M.accommodation = P.place_id) WHERE M.member_id = '${member_id}' AND M.accommodation = P.place_id GROUP BY M.member_id, p.place_name;`, (err, response ) =>{
            if(err){
                console.log(err);   //TODO handle errors
                res.status(500).send("error");
            }
            res.send(response.rows[0]);
    });
});


Router.post('/bookings/:member_id', (req, res) =>{
    const { member_id } = req.params;
    console.log(member_id);
    pool.query(`SELECT M.given_names || ' ' || M.family_name AS Booked_for, MM.given_names || ' ' || MM.family_name AS Booked_By, P.place_name AS to_place, PP.place_name AS from_place, depart_time, arrive_time, vehicle_code, journey_id
FROM olympics.booking B 
            JOIN olympics.journey J USING (journey_id) 
			JOIN olympics.member M ON (B.booked_for = M.member_id) 
			JOIN olympics.member MM ON (B.booked_by = MM.member_id) 
			JOIN olympics.place P ON (J.from_place = P.place_id)
			JOIn olympics.place PP ON (J.to_place = PP.place_id)
            WHERE M.member_id = '${member_id}' ORDER BY depart_time ASC`, (err, response) => {
            if(err){
                console.log('err', err); //TODO ERROR HANDLING
                res.status(500).send("error in booking search");
            }else{
                res.send(response.rows);
            }
        });
});

Router.get('/journeys', (req, res) =>{
    pool.query(`SELECT DISTINCT P.place_name AS to_place, PP.place_name AS from_place, depart_time, arrive_time, journey_id
    FROM olympics.booking B 
            JOIN olympics.journey J USING (journey_id) 
			JOIN olympics.member M ON (B.booked_for = M.member_id) 
			JOIN olympics.member MM ON (B.booked_by = MM.member_id) 
			JOIN olympics.place P ON (J.from_place = P.place_id)
			JOIn olympics.place PP ON (J.to_place = PP.place_id) ORDER BY depart_time ASC`, (err, response) => {
            if(err){
                console.log('err', err); //TODO ERROR HANDLING
                res.status(500).send("error in booking search");
            }else{
                res.send(response.rows);
            }
        });
});

Router.get('/places', (req, res) => {
    pool.query('select place_id, place_name FROM olympics.place ORDER BY place_name ASC;', (err, response) => {
        if(err){
            return res.status(500).send(err);
        }else if( response.rowCount <= 0){
            return res.status(500).send("Error in query format");
        }
        res.send(response.rows);
    })
})


Router.get('/booking/:member_id/:journey_id', (req, res) => {
    const { journey_id , member_id} = req.params;
    pool.query(`SELECT M.given_names || ' ' || M.family_name, vehicle_code, depart_time, date(J.depart_time), P.place_name As to, PP.place_name AS from, MM.given_names AS booked_by, when_booked
            FROM olympics.booking B JOIN olympics.member M ON (B.booked_for = M.member_id) 
			 JOIN olympics.member MM ON (B.booked_by = MM.member_id)
			 JOIN olympics.journey J ON(B.journey_id = J.journey_id)
			 JOIN olympics.place P ON (P.place_id = J.from_place)
			 JOIN olympics.place PP ON (PP.place_id = J.to_place)
			 JOIN olympics.vehicle V USING(vehicle_code)
            WHERE booked_for = '${member_id}' AND J.journey_id = ${journey_id};`, (err, response) => {
        if(err){
            return res.status(500).send(err);
        }else if( response.rowCount <= 0){
            return res.status(500).send("Error in query format");
        }
        console.log(response.rows);
        res.send(response.rows);
            
    })
})

Router.post('/create/booking', (req, res) => {
    const { bookedFor, journeyID, bookedBy } = req.body.booking;
    console.log(req.body.booking);
    pool.query(`INSERT INTO olympics.booking (booked_for, booked_by, when_booked, journey_id) VALUES('${bookedFor}', '${bookedBy}', clock_timestamp(), ${journeyID})`, (err, response) => {
        if(err){
            console.log("err", err);
            return res.status(500).send(err);
        }else if( response.rowCount <= 0){
            return res.status(500).send("Error in query format");
        }
        console.log(response);
        res.send(response.rows);
    });
});

Router.get('/events/:sport', (req, res) => {
    const { sport } = req.params;
    pool.query(`SELECT M.given_names || ' ' || m.family_name AS Medallist, medal AS Medal, E.event_name AS Event, sport_name, discipline, event_start, place_name, E.event_id
                FROM olympics.participates P JOIN olympics.athlete A ON (P.athlete_id = A.member_id) 
                JOIN olympics.event E ON (P.event_id = E.event_id) 
                JOIN olympics.member M ON (A.member_id = M.member_id)
                JOIN olympics.place PL ON (PL.place_id = E.sport_venue)
                JOIN olympics.sport S USING (sport_id)  WHERE discipline ILIKE '%${sport}%' ORDER BY Medallist ASC;`, (err, response) =>{
                if(err){
                    console.log('error', err);
                    return res.status(500).send(err);
                }
                res.send(response.rows);
            })
})

Router.get('/events', (req, res) => {
    const { sport } = req.params;
    pool.query(`SELECT M.given_names || ' ' || m.family_name AS Medallist, medal AS Medal, E.event_name AS Event, sport_name, discipline, event_start, place_name, event_id
                FROM olympics.participates P JOIN olympics.athlete A ON (P.athlete_id = A.member_id) 
                JOIN olympics.event E ON (P.event_id = E.event_id) 
                JOIN olympics.member M ON (A.member_id = M.member_id)
                 JOIN olympics.place PL ON (PL.place_id = E.sport_venue)
                JOIN olympics.sport S USING (sport_id) ORDER BY Medallist ASC;`, (err, response) =>{
                if(err){
                    console.log('error', err);
                    return res.status(500).send(err);
                }
                res.send(response.rows);
            })
})

/*
SELECT * FROM olympics.runsevent RE JOIN olympics.event E USING (event_id) JOIN olympics.member M ON (RE.member_id = M.member_id)
SELECT * FROM olympics.participates RE JOIN olympics.event E USING (event_id) JOIN olympics.member M ON (RE.athlete_id = M.member_id) WHERE event_id = 11          
*/

Router.get(`/event/result/:id`, (req, res) => {
    const { id } = req.params;
    pool.query(`SELECT M.member_id, RE.role FROM olympics.runsevent RE JOIN olympics.event E USING (event_id) JOIN olympics.member M ON (RE.member_id = M.member_id)
                WHERE RE.event_id = ${id};`, (err, officials) => {
        if(err){
            console.log('error', err);
            return res.status(500).send(err);
        }
        pool.query(`SELECT event_name, discipline, member_id, medal, event_gender, event_start, title, family_name, given_names, country_name, place_name FROM olympics.participates RE JOIN olympics.event E USING (event_id) JOIN olympics.member M ON (RE.athlete_id = M.member_id) JOIN olympics.country USING (country_code) JOIN olympics.sport SP USING(sport_id) JOIN olympics.place PL ON (E.sport_venue = PL.place_id) WHERE event_id = ${id}`, 
        (err, athletes) => {
            if(err){
                console.log('error', err);
                return res.status(500).send(err);
            }
            console.log(athletes.rows);
            res.send({athletes: athletes.rows, officials: officials.rows});                 
        });                
    });
});
/*

Test Query

SELECT depart_time, from_place, to_place, nbooked  
FROM olympics.Booking B JOIN olympics.journey J USING (journey_id) 
WHERE depart_time = '2017-05-11 00:00:00' AND to_place = 4 AND from_place = 2 AND B.booked_for = 'A000043404'

*/
Router.post('/journey/:id/:from/:to/:date', (req, res) =>{
    const { id, from, to, date } = req.params;
    const { token } = req.body;
    pool.query(`SELECT depart_time, from_place, to_place, nbooked, vehicle_code FROM olympics.Journey J JOIN olympics.booking B on (B.journey_id = J.journey_id) WHERE depart_time >= '${date}'
                 AND to_place = ${to} AND from_place = ${from} AND B.booked_for = '${id}' ORDER BY depart_time ASC;`, (err, response) => {
        if(err){
            console.log('error', err); //TODO ERROR HANDLING
            return res.status(500).send("error in journey search");
        }else{
            console.log(response.rows);
            res.send(response.rows);
        } 
    });
})


Router.post('/login', (req, res) => {
    const { auth } = req.body;
    const { id, password } = auth;
    console.log('login request', id, password);
    attemptLogin(auth).then( result => {
        //successfull login, send auth token to user
        const { title, member_id, family_name, given_names, country_code, accommodation } = result;
        pool.query(`SELECT CASE WHEN (SELECT EXISTS(SELECT * FROM olympics.Athlete A WHERE M.member_id = A.member_id)) = 't' THEN 'Athlete'
	            WHEN (SELECT EXISTS(SELECT * FROM olympics.official O WHERE M.member_id = O.member_id)) = 't' THEN 'Official'
	            WHEN (SELECT EXISTS(SELECT * FROM olympics.Staff S WHERE M.member_id = S.member_id)) = 't' THEN 'Staff' ELSE 'Unknown' END FROM olympics.member M WHERE M.member_id = '${member_id}';`, (err, response) =>{
            if(err => console.log(err));
            if(response.rowCount <= 0)
                return console.log('error with type check');
            const type = response.rows[0].case;
            let token = generateToken({ title, member_id, family_name, given_names, country_code, accommodation, type: type });
            res.send({token});
        })
    }).catch(err => {
        //login failed
        console.log('err', err);
        res.status(401).send(err);
    });
});

Router.post('/', (req, res) => {
    console.log('success post', req.body);
    res.sendStatus(200);
});


Router.get('/', (req, res) => {
    console.log('home request');
    res.send("hello");
});

Router.post('/sign-up', function(req, res) {
    const { email, pass } = req.body.auth;
	hashPassword(pass).then(function(response) {
        registerUser( name.toLowerCase(), response, email.toLowerCase())
			.then(function(result) {
                // Save user to db
                return res.status(200).send('Success');
			}).catch(function(err) {
                return res.status(400).send(err);
			});
	});
});





/***************USER LOGIN AND VERIFICATION FUNCTIONS ***************/
let registerUser = ( name, password, email) => {
	//TODO check if exists, resolve or reject depending on result
	return new Promise(function(resolve, reject) {
        pool.query(`INSERT INTO member VALUES()'`, (err, res) => {

        });
	});
};

let hashPassword = (password_plain_text) => {
	return new Promise(function(resolve, reject) {
		bcrypt.hash(password_plain_text, null,null, function(err, hash) {
			if (err) reject("Error hashing the password");
			else {
				resolve(hash);
			}
		});
	});
};

const attemptLogin = auth => {
    return new Promise( (resolve, reject ) => {
        const{ id, password } = auth;
        pool.query(`SELECT * FROM olympics.member WHERE member_id = '${id}'`, (err, res) => {
            const { rowCount } = res;
            if(rowCount <= 0 ){
                return reject('User does not exist');
            }

            const { pass_word  } = res.rows[0];
            
                // User exists check password hash
                // bcrypt.compare(password, pass_word, (err,res) => {
				//     if (err) 
                //         reject(err);
				//     return (res) ? resolve(res) : reject('Wrong Password');
			    // });
            return ( password == pass_word) ? resolve(res.rows[0]) : reject("Wrong Password");
        });
    })
}

let generateToken = user => {
     return jwt.sign({
            exp: Math.floor(Date.now() / 1000) + (60 * 60),
            data: user
        }, SECRET_TOKEN);
}


/**************************** */



module.exports = Router;
