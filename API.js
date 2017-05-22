
const Express = require('express');
const Router = Express.Router();
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken'); 
const bcrypt = require('bcrypt-nodejs');
const pg = require('pg');
const config = require('./dbconfig');

/**** DATABASE CONNECTION *****/
console.log('-----CONNECTING TO DATABASE ------');
const client = new pg.Client(config);
client.connect( err => {
    if(err){
        console.log('an error occured ', err);
    }else{
        console.log("Successfull database connection");
    }
        
})
Router.use(bodyParser.json()); // support json encoded bodies
Router.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies


Router.post('/login', (req, res) => {
    const { auth } = req.body;
    console.log('login request', email, password);

    attemptLogin(auth).then( result => {
        //successfull login, send auth token to user

    }).catch(err => {
        //login failed
    })

    res.sendStatus(200);
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






module.exports = Router;