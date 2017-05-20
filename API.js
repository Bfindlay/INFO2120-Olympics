
const Express = require('express');
const Router = Express.Router();
const bodyParser = require('body-parser');

Router.use(bodyParser.json()); // support json encoded bodies
Router.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

module.exports = Router;