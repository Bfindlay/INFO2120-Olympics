
const Express = require('express');
const Router = Express.Router();
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken'); 
const bcrypt = require('bcrypt-nodejs');
const pg = require('pg');
const config = require('./dbconfig');
const SECRET_TOKEN = 'x1ODH27zt4sMUMW882iwCp3T6cvWBf38';

/**** TESTING **** */
let user = { id: 1234, name: 'Brett', type: 'Athlete' }


/**** DATABASE CONNECTION *****/
console.log('-----CONNECTING TO DATABASE ------');
const client = new pg.Client(config);
client.connect( err => {
    if(err){
        console.log('an error occured ', err);
    }else{
        console.log("Successfull database connection");
        let query = client.query("SELECT member_id, family_name, given_names FROM Member WHERE member_id = 'A000025646'");
        console.log(query)
    }
        
})
Router.use(bodyParser.json()); // support json encoded bodies
Router.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies


Router.post('/login', (req, res) => {
    const { auth } = req.body;
    const { id, password } = auth;
    console.log('login request', id, password);

    attemptLogin(auth).then( result => {
        //successfull login, send auth token to user
        let token = generateToken(user);
        console.log(token);
        res.send({token});

    }).catch(err => {
        //login failed
    })
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



/*** USER LOGIN AND VERIFICATION FUNCTIONS */
let registerUser = ( name, password, email) => {
	//TODO check if exists, resolve or reject depending on result
	return new Promise(function(resolve, reject) {
	
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
        //check database for a user
        if(true){
            resolve({});
        }else{
            reject('Wrong details');
        }
    })
}

let generateToken = user => {
     return jwt.sign({
            exp: Math.floor(Date.now() / 1000) + (60 * 60),
            data: { id : user.id, name: user.name, type: user.type}
        }, SECRET_TOKEN);
}


/**************************** */



module.exports = Router;