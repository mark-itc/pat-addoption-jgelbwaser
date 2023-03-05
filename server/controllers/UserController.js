const { handleError, logger } = require("../lib/logger");
const bcrypt = require('bcrypt');
const { validateSignIn, validateLogin, validateUserUpdate } = require("../validations/ajvValidation");
const UserDAO = require("../models/UsersDAO");
const { BCRYPT_SALT, WAIT_BETWEEN_FAILED_LOGINS, LOGIN_ATTEMPTS_WITHOUT_WAIT, JWT_ACCESS_TOKEN_EXPIRATION, JWT_REFRESH_TOKEN_EXPIRATION_SECONDS } = require('../config');
const AuthController = require("./AuthController");


module.exports = class UserController {

    static async updateUser(req, res) {
        try {
            const dbUser = req.authUser;
            const newUserData = req.body;

            //check updated User uid =  auth uid
            const idFromParams = req.params.id
            const idFromAuth = dbUser._id
            const idsMatch = idFromAuth.equals(idFromParams)
            if (!idsMatch) {
                return res.status(403).json({ error: 'You are not authorized to update this user' })
            }

            //validate inputs:
            const valid = validateUserUpdate(newUserData);
            if (!valid) return res.status(400).json({ error: validateUserUpdate.errors[0].message })
            if (newUserData.password !== newUserData.confirmPassword) return res.status(400).json({ error: "Passwords don't match" });

            //if email changed check if already exists
            const emailChanged = (newUserData.email.toLowerCase() !== dbUser.email)
            if (emailChanged) {
                console.log('email changed')
                const emailExists = await UserDAO.exists({ email: newUserData.email.toLowerCase() });
                if (emailExists) return res.status(401).json({ error: 'Email already registered: ' + newUserData.email.toLowerCase() })
            }

            //if phone changed check if already exists
            const phoneChanged = newUserData.phoneNumber.toString() !== dbUser.phoneNumber.toString()
            console.log(newUserData.phoneNumber, 'newUserData.phoneNumber')
            console.log(dbUser.phoneNumber, 'dbData.phoneNumber')
            if (phoneChanged) {
                console.log('phoneNumber changed')
                const phoneExists = await UserDAO.exists({ phoneNumber: newUserData.phoneNumber });
                if (phoneExists) return res.status(401).json({ error: 'try a different phone number' })
            }

            //Update updated fields from request in dbUser object
            newUserData.email ? dbUser.email = newUserData.email : null;
            newUserData.firstName ? dbUser.firstName = newUserData.firstName : null;
            newUserData.lastName ? dbUser.lastName = newUserData.lastName : null;
            newUserData.phoneNumber ? dbUser.phoneNumber = newUserData.phoneNumber : null;
            newUserData.bio ? dbUser.bio = newUserData.bio : null;

            if (newUserData.password) {
                const hashPassword = await bcrypt.hash(newUserData.password, BCRYPT_SALT);
                dbUser.hashPassword = hashPassword;
            }
            await UserDAO.save(dbUser)

            const userForClient = AuthController.getUserResponseObject(dbUser)
            res.status(200).json({ currentUser: userForClient })

        } catch (error) {
            handleError(error);
            return res.status(500).json({ error: "Server error" });
        }
    } 
}

