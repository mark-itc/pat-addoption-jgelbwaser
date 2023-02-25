const Ajv = require("ajv")
const addFormats = require("ajv-formats");

const ajv = new Ajv({allErrors: true})
require("ajv-errors")(ajv , {singleError: true})
addFormats(ajv)

const patternTxtWithPossibleSingleSpaces ="^[\\p{L}]+( \\p{L}+)*$".toString();
//"^[a-zA-Z]+( [a-zA-Z]+)*$"
//'^([\p{L}]+ )*[\p{L}]+$'
//'/^([\p{L}]+ )*[\p{L}]+$/'
///^\+[0-9]{9,12}$/.toString()

const userSchema = {
    type: "object",
    properties: {
        email:
            { type: "string", format: "email", maxLength: 100 },
        password:
            { type: "string", minLength: 6 },
        confirmPassword:
            { type: "string", minLength: 6 },
        firstName: {
            type: "string",
            minLength: 2,
            maxLength: 50,
            pattern: patternTxtWithPossibleSingleSpaces,
        },
        lastName: {
            type: "string",
            pattern: patternTxtWithPossibleSingleSpaces,
            minLength: 2,
            maxLength: 50,
        },
        phoneNumber: {
            type: "string",
            minLength: 5,
            maxLength: 15,
            pattern: '^\\d{5,15}$'
        },
        bio: {
            type: "string",
            maxLength: 500,
        },

    },
    errorMessage: {
        'properties': {
            'lastName':  'lastName must include 2-50 chars. Only letters and single spaces are allowed without starting or ending with a space.' ,
            'firstName':  'firstName must include 2-50 chars. Only letters and single spaces are allowed without starting or ending with a space.' ,
            'phoneNumber': 'phoneNumber should contain a number of 5 to 15 digits', 
            'password': 'Passwords must NOT have fewer than 6 characters',
            'confirmPassword': 'Passwords must NOT have fewer than 6 characters',
            'email': "Email must be a valid email address"
        },
      },
}

const requiredFields = {
    signIn: ["email", "password", "confirmPassword", "firstName", "lastName", "phoneNumber"],
    login: ["email", "password"]
}

const signInSchema = {...userSchema, required: [...requiredFields.signIn] };
const loginSchema = {...userSchema, required: [...requiredFields.login]}
//console.log('signInSchema', signInSchema)

module.exports.validateSignIn = ajv.compile(signInSchema)
module.exports.validateLogin = ajv.compile(loginSchema)




