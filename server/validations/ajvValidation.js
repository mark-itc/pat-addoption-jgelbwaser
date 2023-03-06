const Ajv = require("ajv")
const addFormats = require("ajv-formats");
const { PET_TYPES_ENUM, PET_STATUS_ENUM } = require("../config");

const ajv = new Ajv({ allErrors: true })
require("ajv-errors")(ajv, { singleError: true })
addFormats(ajv)

const patternTxtWithPossibleSingleSpaces = "^[\\p{L}]+( \\p{L}+)*$".toString();

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
            'lastName': 'lastName must include 2-50 chars. Only letters and single spaces are allowed without starting or ending with a space.',
            'firstName': 'firstName must include 2-50 chars. Only letters and single spaces are allowed without starting or ending with a space.',
            'phoneNumber': 'phoneNumber should contain a number of 5 to 15 digits',
            'password': 'Passwords must NOT have fewer than 6 characters',
            'confirmPassword': 'Passwords must NOT have fewer than 6 characters',
            'email': "Email must be a valid email address"
        },
    },
    additionalProperties: false
}

const requiredFields = {
    signIn: ["email", "password", "confirmPassword", "firstName", "lastName", "phoneNumber"],
    login: ["email", "password"],
    userUpdate: ["email", "firstName", "lastName", "phoneNumber"]
}

const signInSchema = { ...userSchema, required: [...requiredFields.signIn] };
const loginSchema = { ...userSchema, required: [...requiredFields.login] }
const userUpdateSchema = { ...userSchema, required: [...requiredFields.userUpdate] }


module.exports.validateSignIn = ajv.compile(signInSchema)
module.exports.validateLogin = ajv.compile(loginSchema)
module.exports.validateUserUpdate = ajv.compile(userUpdateSchema)


const petSchema = {
    type: "object",
    properties: {
        type: {
            type: 'number',
            enum: PET_TYPES_ENUM
        },
        name: {
            type: "string",
            pattern: patternTxtWithPossibleSingleSpaces,
            minLength: 2,
            maxLength: 50,
        },
        status: {
            type: 'number',
            enum: PET_STATUS_ENUM
        },
        picture: {
            type: 'string',
        },
        height: {
            type: 'number',
            minimum: 0,
            maximum: 150
        },
        weight: {
            type: 'number',
            minimum: 0,
            maximum: 40000
        },
        color: {
            type: "string",
            maxLength: 50
        },
        bio: {
            type: "string",
            maxLength: 500,
        },
        hypoallergenic: {
            type: 'boolean'
        },
        DietaryRestrictions: {
            type: "string",
            maxLength: 500,
        },
        breed: {
            type: "string",
            maxLength: 50
        },
    },
    errorMessage: {
        'properties': {
            'name': 'Name must include 2-50 chars. Only letters and single spaces are allowed without starting or ending with a space.',
            'status': 'Status must be an option number',
            'type': 'type must be an option number',
            'picture': 'picture  must be a string with the file name',
            'height': 'height must be a number between 0-150 (units: cm)',
            'weight': 'Weight must be a number between 0-4000 (units: gr)',
            'color': 'color must be a string max 50 chars',
            'bio': 'bio must be a string max 500 chars',
            'hypoallergenic': 'hypoallergenic must be true or false',
            'DietaryRestrictions': 'DietaryRestrictions must be a string max 500 chars',
            'bread': 'bread must be a string max 50 chars',
        }
    },
     required: ['name', 'height', 'weight', 'type'],
     additionalProperties: false
}

module.exports.validatePet = ajv.compile(petSchema)