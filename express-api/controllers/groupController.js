const express = require('express');
const router = express.Router();

router.use('/', function(req, res)
{
	console.log("GET /groups");
	res.send("GET /groups");
});

module.exports = router;