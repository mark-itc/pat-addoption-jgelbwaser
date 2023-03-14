const { handleError, logger } = require("../lib/logger");
const bcrypt = require('bcrypt');
const { validateSignIn, validateLogin } = require("../validations/ajvValidation");
const UserDAO = require("../models/UsersDAO");
const { BCRYPT_SALT, WAIT_BETWEEN_FAILED_LOGINS, LOGIN_ATTEMPTS_WITHOUT_WAIT, JWT_ACCESS_TOKEN_EXPIRATION, JWT_REFRESH_TOKEN_EXPIRATION_SECONDS } = require('../config')
const jwt = require('jsonwebtoken')

module.exports = class AuthController {

    static getWaitLoginMinutes(user) {

        logger.info(`email: ${user.email}: attempts ${user.failedLoginAttempts}`)
        if (!user.lastFailedLogin) return 0
        const attemptWithWait = user.failedLoginAttempts - LOGIN_ATTEMPTS_WITHOUT_WAIT
        if (attemptWithWait <= 0) return 0

        const timeSinceLastAttempt = new Date().getTime() - user.lastFailedLogin.getTime();
        const waitTime = (attemptWithWait * WAIT_BETWEEN_FAILED_LOGINS) - timeSinceLastAttempt

        if (waitTime <= 0) return 0
        const waitTimeInMinutes = Math.ceil(waitTime / 60000)
        return waitTimeInMinutes
    }

    static async refreshToken(req, res) {
        try {
            const refreshToken = req.body.token
            if (!refreshToken) return res.status(401).json("Token missing");

            jwt.verify(refreshToken, process.env.JWT_SECRET_REFRESH_TOKEN, async (err, decoded) => {
                if (err) {
                    return res.status(403).json({ error: 'Invalid token', loggedOut: true })
                }
                const user = await UserDAO.findById(decoded.uid);
                if (!user.hashRefreshTokenSignature) {
                    return res.status(403).json({ error: 'Invalid token', loggedOut: true })
                }
                const validToken = await bcrypt.compare(refreshToken.split('.')[2], user.hashRefreshTokenSignature);
                if (!validToken) {
                    return res.status(403).json({ error: 'Invalid token', loggedOut: true })
                }
                //Check expiration - TODO exempt TRUSTED devices and/or IPS from Expiration
                const expirationTimeInSeconds = decoded.iat + JWT_REFRESH_TOKEN_EXPIRATION_SECONDS
                const currentTimeInSeconds = Date.now() / 1000
                if (currentTimeInSeconds > expirationTimeInSeconds) {
                    return res.status(401).json({ error: 'Refresh token expired', loggedOut: true })
                }
                const newAccessToken = AuthController.generateAccessToken(user);
                const newRefreshToken = AuthController.generateRefreshToken(user);

                user.hashRefreshTokenSignature = await bcrypt.hash(newRefreshToken.split('.')[2], BCRYPT_SALT);
                await UserDAO.save(user);

                res.status(200).json({
                    accessToken: newAccessToken,
                    refreshToken: newRefreshToken,
                });

            })

        } catch (error) {
            handleError(error);
            return res.status(500).json({ error: "Server error" });
        }
    }


    static async handleInvalidPwd(user) {

        let errorMsg = "Wrong email/password combination."

        //update failed attempts
        user.failedLoginAttempts++
        user.lastFailedLogin = new Date();
        await UserDAO.save(user);

        //check if there's wait time
        const newWaitTime = AuthController.getWaitLoginMinutes(user)
        if (newWaitTime) { errorMsg += `You can try again in ${newWaitTime} minutes.` } //
        return errorMsg
    }


    static generateRefreshToken(user) {
        return jwt.sign(
            {
                uid: user._id,
                isAdmin: user.isAdmin
            },
            process.env.JWT_SECRET_REFRESH_TOKEN);
    }


    static generateAccessToken(user) {
        return jwt.sign(
            {
                uid: user._id,
                isAdmin: user.isAdmin
            },
            process.env.JWT_SECRET_ACCESS_TOKEN,
            { expiresIn: JWT_ACCESS_TOKEN_EXPIRATION });
    }


    static async login(req, res) {
        const valid = validateLogin(req.body);

        if (!valid) return res.status(400).json({ error: validateLogin.errors[0].message })

        try {
            //user exists
            const user = await UserDAO.findByEmail(req.body.email);
            if (!user) return res.status(401).json({ error: "wrong email/password combination", loggedOut: true })
            //check wait time
            const waitTime = AuthController.getWaitLoginMinutes(user);
            if (waitTime) return res.status(401).json({error:`You have reached the maximum login attempts allowed. Please wait ${waitTime} minutes to try again`, loggedOut: true})
            //check password
            const validPassword = await bcrypt.compare(req.body.password, user.hashPassword)
            if (!validPassword) {
                const errorMsg = await AuthController.handleInvalidPwd(user)
                return res.status(401).json({ error: errorMsg, loggedOut: true })
            }

            //LOGIN SUCCESS:
            const {accessToken, refreshToken,currentUser,petsInUserCare, petsSavedByUser} =  await AuthController.logUser(user)
            return res.status(200).json({ accessToken, refreshToken,currentUser,petsInUserCare, petsSavedByUser })

        } catch (error) {
            handleError(error);
            return res.status(500).json({ error: "Server error" })
        }
    }

    static async logUser(user) {
        const accessToken = AuthController.generateAccessToken(user);
        const refreshToken = AuthController.generateRefreshToken(user)

        user.failedLoginAttempts = 0
        user.hashRefreshTokenSignature = await bcrypt.hash(refreshToken.split('.')[2], BCRYPT_SALT);
        await UserDAO.save(user);
        const currentUser = AuthController.getUserResponseObject(user)
        const petsInUserCare = await UserDAO.getUserPets(user._id)
        const petsSavedByUser = await UserDAO.getUserSavedPets(user._id)
        return {accessToken, refreshToken,currentUser, petsInUserCare, petsSavedByUser}
    }

    static async logout(req, res) {
        try {
            const logout = async () => {
                const user = await UserDAO.findById(req.tokenDecoded.uid)
                user.hashRefreshTokenSignature = null
                user.lastLogout = new Date()
                await UserDAO.save(user);
                return res.status(200).json('user logged out');
            }
            AuthController.authenticate(req, res, logout)

        } catch (error) {
            handleError(error);
            return res.status(500).json({ error: "Server error" });
        }
    }


    static authenticate(req, res, next) {
        try {
            const authHeaders = req.headers.authorization;
            if (!authHeaders) return res.status(401).json({ error: 'Authentification failed' })

            const token = authHeaders.split(" ")[1]
            jwt.verify(token, process.env.JWT_SECRET_ACCESS_TOKEN, (err, decoded) => {
                if (err) {
                    if (err.name === 'TokenExpiredError') {
                        return res.status(403).json({ error: 'Token expired', loggedOut: true});
                    } else {
                        return res.status(403).json({ error: 'Invalid token', loggedOut: true });
                    }
                }
                req.tokenDecoded = decoded
                next()
            })
        } catch (error) {
            handleError(error);
            return res.status(500).json({ error: "Server error" });
        }
    }

    static async authenticateWithDB(req, res, next) {
        try {
            const checkWithDB = async () => {
                const user = await UserDAO.findById(req.tokenDecoded.uid)
                if (!user) return res.status(404).json({ error: 'User in token not found', loggedOut: true })
                // console.log('user logout', user.lastLogout)
                // console.log('user iat', req.tokenDecoded.iat)
                if (user.lastLogout && user.lastLogout.getTime() > req.tokenDecoded.iat * 1000) {
                    // console.log('user logout', user.lastLogout.getTime())
                    // console.log('user iat', req.tokenDecoded.iat)
                    return res.status(403).json({ error: 'Token expired', loggedOut: true });
                }
                req.authUser = user;
                next();
            }
            AuthController.authenticate(req, res, checkWithDB)

        } catch (error) {
            handleError(error);
            return res.status(500).json({ error: "Server error" });
        }
    }


    static async register(req, res) {
        
        //validate inputs
        const valid = validateSignIn(req.body);
        if (!valid) return res.status(400).json({ error: validateSignIn.errors[0].message })
        if (req.body.password !== req.body.confirmPassword) return res.status(400).json({ error: "Passwords don't match" });

        //check if email or phone exists
        const emailExists = await UserDAO.exists({ email: req.body.email.toLowerCase() });
        if (emailExists) return res.status(401).json({ error: 'Email already registered: ' + req.body.email.toLowerCase() })
        const phoneExists = await UserDAO.exists({ phoneNumber: req.body.phoneNumber });
        if (phoneExists) return res.status(401).json({ error: 'try a different phone number' })

        //save user     
        try {
            const hashPassword = await bcrypt.hash(req.body.password, BCRYPT_SALT);

            const savedUser = await UserDAO.createUser({
                email: req.body.email,
                hashPassword: hashPassword,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                phoneNumber: req.body.phoneNumber
            })

            const {accessToken, refreshToken,currentUser, petsInUserCare, petsSavedByUser} = await AuthController.logUser(savedUser)
            return res.status(200).json({ accessToken, refreshToken, currentUser, petsInUserCare, petsSavedByUser });

            //return res.status(200).json({ id: savedUser._id });

        } catch (error) {
            handleError(error);
            return res.status(500).json({ error: "Server error" });
        }
    };

    static getUserResponseObject(user) {
        return {
            uid: user._id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            phoneNumber: user.phoneNumber,
            userPets:user.userPets,
            userSavedPets:user.userSavedPets,
            isAdmin: user.isAdmin,
            bio: user.bio
        }
    }

}

