const {handleError, logger} = require("../lib/logger");
const bcrypt = require('bcrypt');
const {validateSignIn, validateLogin} = require("../validations/ajvValidation");
const UserDAO = require("../models/UsersDAO");
const {BCRYPT_SALT, WAIT_BETWEEN_FAILED_LOGINS, LOGIN_ATTEMPTS_WITHOUT_WAIT} = require('../config')


module.exports = class UserController {

    static getWaitLoginMinutes(user) {
        console.log('getWaitLoginMinutes called')
        logger.info(`email: ${user.email}: attempts ${user.failedLoginAttempts}`)
        if (!user.lastFailedLogin) return 0
        const attemptWithWait = user.failedLoginAttempts - LOGIN_ATTEMPTS_WITHOUT_WAIT
        if(attemptWithWait <= 0) return 0
        console.log('user.failedLoginAttempts', user.failedLoginAttempts)

        const timeSinceLastAttempt =  new Date().getTime() - user.lastFailedLogin.getTime();
        console.log('timeSinceLastAttempt', timeSinceLastAttempt, Math.ceil( timeSinceLastAttempt / 60000))
        console.log('attemptWithWait', attemptWithWait)
        console.log('WAIT_BETWEEN_FAILED_LOGINS', WAIT_BETWEEN_FAILED_LOGINS)
        console.log('WAIT_BETWEEN_FAILED_LOGINS*attemptWithWait',WAIT_BETWEEN_FAILED_LOGINS*attemptWithWait)
        const waitTime = (attemptWithWait * WAIT_BETWEEN_FAILED_LOGINS) - timeSinceLastAttempt
        console.log('waitTime21', waitTime)
        
        if(waitTime <= 0) return 0
        const waitTimeInMinutes = Math.ceil( waitTime / 60000)
        return waitTimeInMinutes
    }

    static async handleInvalidPwd(user) {

            let errorMsg = "Wrong email/password combination."
            console.log('handleInvalidPwd called')

            //update failed attempts
            user.failedLoginAttempts ++
            user.lastFailedLogin = new Date();
            await UserDAO.save(user);
            
            //check if there's wait time
            const newWaitTime = UserController.getWaitLoginMinutes(user)
            console.log('newWaitTime', newWaitTime)
            console.log('errorMsg BRFORE', errorMsg)
            if (newWaitTime) { errorMsg += `You can try again in ${newWaitTime} minutes.`} //
            console.log('errorMsg AFTER', errorMsg)
            return errorMsg     
    }


    static async login(req, res) {
        const valid = validateLogin(req.body);

        if(!valid) return res.status(400).json({error: validateLogin.errors[0].message})

        try {
            //user exists
            const user = await UserDAO.findOne({email: req.body.email.toLowerCase()});
            if(!user) return res.status(401).json({error: "wrong email/password combination"})
            
            //check wait time
            const waitTime = UserController.getWaitLoginMinutes(user);
            console.log('waitTime', waitTime);
            if(waitTime) return res.status(401).json(`You have reached the maximum login attempts allowed. Please wait ${waitTime} minutes to try again`)

            //check password
            console.log('req.body.password: ', req.body.password);
            const validPassword = await bcrypt.compare(req.body.password, user.password)
            console.log('validPassword', validPassword)
            if(!validPassword) {
                const errorMsg = await UserController.handleInvalidPwd(user)
                console.log('errorMsg last', errorMsg)
                return res.status(401).json({error: errorMsg})
            }
             
            user.failedLoginAttempts = 0
            await UserDAO.save(user);
            return res.status(200).json(user)

        } catch (error) {
            handleError(error);
            return res.status(500).json({error: "Server error"})
        }
    }

    static Logout(req, res) {

    }

    
    static async register(req, res) {
        //validate inputs
        const valid = validateSignIn(req.body);
        if(!valid)  return res.status(400).json({error: validateSignIn.errors[0].message})
        if(req.body.password !== req.body.confirmPassword) return res.status(400).json({error: "Passwords don't match"});

        //check if email or phone exists
        const emailExists = await UserDAO.exists({email: req.body.email.toLowerCase()});
        if(emailExists)  return res.status(401).json({error: 'Email already registered: ' + req.body.email.toLowerCase()})
        const phoneExists = await UserDAO.exists({phoneNumber: req.body.phoneNumber});
        if(phoneExists)  return res.status(401).json({error: 'try a different phone number'})

        //save user
       
        try {
            const hashPassword = await bcrypt.hash(req.body.password, BCRYPT_SALT);

            const savedUser =  await UserDAO.createUser ({
                email: req.body.email,
                password: hashPassword,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                phoneNumber: req.body.phoneNumber
            })
                logger.debug('savedUser', savedUser)
                return res.status(200).json({id: savedUser._id}); 

        } catch (error) {
            handleError(error);
            return res.status(500).json({error: "Server error"});
        }
    };

}

