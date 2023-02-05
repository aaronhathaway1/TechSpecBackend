const routes = require('express').Router();
const myController = require('../controllers');

routes.get('/', myController.routingFunction);

module.exports = routes;
