const express = require('express');
const DbConnection = require('../db/index');
const User = require("../Models/UserSchema");
const Poll = require("../Models/PollSchema");
const Vote = require("../Models/VoteSchema");
const { getHomepage, getLogin } = require('../Controller');

const route = express.Router();
DbConnection();  //calling function to connect with database

route.get('/', getHomepage);   //route.route('/').get(getHomepage);   // route for the home
route.post('/login', getLogin);   //route.route('/login').post(getLogin);   // route for the login

module.exports = route;