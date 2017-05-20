
const Express = require('express');
const Router = Express.Router();
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken'); 
Router.use(bodyParser.json()); // support json encoded bodies
Router.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

//API Verification MiddleWare
Router.use(function(req, res, next) {
    console.log('auth middleware');
    const { body, method, url } = req;
    if(method === 'POST'){
        let token = body.token;
        if(url === '/login' || url === '/user')
            return next();
        if (token !== undefined) {
            jwt.verify(token, 'x1ODH27zt4sMUMW882iwCp3T6cvWBf38', function(err, decoded) {      
                if (err) {
                    return res.json({ success: false, message: 'Failed to authenticate token.' });    
                } else {
                    req.decoded = decoded;
                    return next();
                }
            });
        } else {
            return res.status(403).send({ 
                success: false, 
                message: 'No token provided.' 
            });
        }
    }else{
        // No token needed
        return next();
    }
}); 

Router.get('/', (req, res) => {
    console.log('home request');
})

Router.post('/login', (req, res) => {
    console.log('login request');
})
module.exports = Router;