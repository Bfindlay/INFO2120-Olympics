
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

/**** TESTING **** */

/**** DATABASE CONNECTION *****/
console.log('-----CONNECTING TO DATABASE ------');
const pool = new pg.Pool(config);
pool.on('error', function (err, client) {
  console.error('idle client error', err.message, err.stack);
});


/**** FOR TESTING  ******/

Router.post('/Test', (req,res) =>{
    const { query } = req.body
    
     pool.query(query, (err, res) => {
        if(err)
           return console.error(err);
        console.log(res);
     });

})

/****** API ENDPOINTS ************/

Router.get('/details/:member_id', (req, res) =>{
    const { member_id } = req.params;
    pool.query(`SELECT M.member_id as member_id, accommodation as Accomodation, COUNT((SELECT COUNT(B.booked_for) FROM olympics.booking B 
        WHERE booked_for = '${member_id}')) as bookings FROM olympics.Member M WHERE M.member_id = '${member_id}'GROUP BY M.member_id;`, (err, response ) =>{
            if(err){
                console.log(err);   //TODO handle errors
                res.status(500).send("error");
            }
            res.send(response.rows);
    });
});

Router.get('/bookings/:member_id', (req, res) =>{
    const { member_id } = req.params;
    pool.query(`SELECT B.booked_for, B.booked_by, J.depart_time FROM olympics.booking B JOIN olympics.journey J ON (J.journey_id = B.journey_id) 
        WHERE booked_for = '${member_id}' ORDER by J.depart_time ASC;`, (err, response) => {
            if(err){
                console.log(err); //TODO ERROR HANDLING
                res.status(500).send("error in booking search");
            }else{
                 res.send(response.rows);
            }
        });
});

Router.post('/journey/:id/:from/:to/:date', (req, res) =>{
    const { id, from, to, date } = req.params;
    const newDate = new Date(date.replace(' ', 'T'));
    console.log('date is now', newDate);
    const { token } = req.body;
    console.log(date);
    pool.query(`SELECT depart_time, from_place, to_place, nbooked  FROM olympics.Journey WHERE depart_time = ${date}  
                 AND to_place = ${to} AND from_place = ${from} AND member_id = ${id} ORDER BY depart_time ASC;`, (err, response) => {
        if(err){
            console.log(err); //TODO ERROR HANDLING
            res.status(500).send("error in journey search");
        }else{
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
        let token = generateToken({ title, member_id, family_name, given_names, country_code, accommodation });
        res.send({token});

    }).catch(err => {
        //login failed
        console.log(err);
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
        pool.query(`SELECT * FROM olympics.Member WHERE member_id = '${id}'`, (err, res) => {
            const { pass_word, rowCount } = res.rows[0];
            if( rowCount == 0){
                // User doesnt exist, reject login request
                 reject('User Doesnt Exist!');
            }else{
                // User exists check password hash
                // bcrypt.compare(password, pass_word, (err,res) => {
				//     if (err) 
                //         reject(err);
				//     return (res) ? resolve(res) : reject('Wrong Password');
			    // });
                return ( password == pass_word) ? resolve(res.rows[0]) : reject("Wrong Password");
            }
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