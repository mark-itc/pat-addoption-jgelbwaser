const User = require("../models/User");
const router = require("express").Router();


// Signup API
// route: ‘/signup’ [POST]
// The signup api is responsible for signing up a new user. 
// Validate all the user input is valid
// Check that passwords match
// Make sure the email address is unique 
// Store the user in your DB and log the user in
// Be sure not to save the users password as a plain string. (bcrypt is a great tool for this)

// Fields:  
// Email Address
// Password (twice to make sure passwords match)
// First and last name
// Phone number

// Login API
// route: ‘/login’ [POST]
// The login api is responsible for logging in existing users
// Validate all the user input is valid
// Check the email and password match an existing user
// Retrieve the users data from the database and login the user.

// Fields: 
// Email address 
// Password



router.post("/register", async (req, res) => {

    try {
    const user =  new User ({
        email: req.body.email,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phoneNumber: req.body.phoneNumber
    })
        const userId =  await user.save();
        res.status(200).send(userId);        
    } catch (error) {
        return res.status(400).send(error.message); 
    }
    
});

module.exports = router;

