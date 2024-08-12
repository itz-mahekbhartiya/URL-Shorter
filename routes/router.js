const express = require('express');
const {handleNewUrl,handleUrlData} = require('../controlers/handlers');

const router = express.Router();

/* This code snippet is defining routes for handling HTTP GET and POST requests to the '/url' endpoint. */
router
.route('/url')
.get(handleUrlData)
.post(handleNewUrl);


router
module.exports = router;