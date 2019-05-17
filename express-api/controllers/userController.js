const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();

const User = require('../models/userSchema');

router.get('/', function(req, res)
{
	User.find({}, function(err, foundUsers)
	{
		if (err) {console.log(err);}
		else
		{
			console.log("GET /users");
			res.send("GET /users");
		}
	});
});

router.get('/new', function(req, res)
{
	if (req.session.username && req.session.usertype !== 'admin')
	{
		res.send("You must log off before trying to create a new user!");
	}
	else //if logged out, or an administrator user!
	{
		console.log("GET /users/new");
		res.send("GET /users/new");
	}
});

router.post('/', function(req, res) //POST route to create a new user!!
{

	if (req.body.password !== req.body.password2)
	{
		//Uh oh, the passwords don't match!! We gotta get out of here...
		//res.send(`Passwords did not match! Try again...<br><a href="/users/new">Back to registration page</a>`);
		res.json(
		{
			success: false
		});
	}
	else
	{

		const password = req.body.password;
		const passwordHash = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

		const lcusername = req.body.username.toLowerCase(); //make sure the username is all lower case!!
		if (req.body.usertype == null) {req.body.usertype = 'std';}

		const userDbEntry =
		{
			username: lcusername,
			usertype: req.body.usertype,
			email: req.body.email,
			password: passwordHash,
			displayname: req.body.displayname,
			entries: []
		};

		User.findOne({username: lcusername}, function(err, foundUser)
		{
			if (err) {console.log(err);}
			else
			{
				if (!foundUser) //username doesn't already exist! We are good to create a new user:
				{
					User.create(userDbEntry, function(err, createdUser)
					{
						if (err) {console.log(err);}
						else
						{
							console.log("Created a new user");
							//res.send(`Congratulations ${req.body.username}, you have now registered as a user! Be sure to log in now!<br><a href="/auth/login">Go to login page</a>`);
							res.json(
							{
								success: true
							});
						}
					});
				}
				else
				{
					console.log("User create failed: username already exists");
					//res.send("This username is taken! Try a different one.");
					res.json(
					{
						success: false
					});
				}
			}
		});
	}//end of password matching if statement

});

router.get('/:id', function(req, res)
{
	User.findById(req.params.id, function(err, foundUser)
	{
		if (err) {console.log(err);}
		else
		{
			console.log(`GET /users/${req.params.id}`);
			//res.send(`GET /users/${req.params.id}`);
			res.json(foundUser);
		}
	});
});


router.get('/:id/edit', function(req, res)
{
	if (req.session.curuserid == req.params.id || req.session.usertype == 'admin')
	{
		User.findById(req.params.id, function(err, userToEdit)
		{
			if (err) {console.log(err);}
			else
			{
				console.log(`GET /users/${req.params.id}/edit`);
				res.send(`GET /users/${req.params.id}/edit`);
			}
		});
	}
	else
	{
		res.send(`You can't edit the settings for a user you're not logged in as!<br><a href="/">Back to home</a>`);
	}
});

router.put('/:id', function(req, res)
{
	User.findByIdAndUpdate(req.params.id, req.body, function(err, userEdited)
	{
		if (err) {console.log(err);}
		else
		{
			console.log(`PUT /users/${req.params.id}`);
			res.send(`PUT /users/${req.params.id}`);
			//res.redirect('/users');
		}
	});
});


module.exports = router;
