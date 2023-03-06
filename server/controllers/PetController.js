const appEnv = require("dotenv").config();
const { handleError, logger } = require("../lib/logger");
const bcrypt = require('bcrypt');
const { validateUserUpdate, validatePet } = require("../validations/ajvValidation");
const UserDAO = require("../models/UsersDAO");
const AuthController = require("./AuthController");
const PetsDAO = require("../models/PetsDAO");


module.exports = class PetController {

    static async addPet(req, res) {
        try {
            
            const dbUser = req.authUser;
            const petData = req.body
            
            // TO DO: Uncomment (Protected to admin only)
            //if(!dbUser.isAdmin) return res.status(403).json({error: 'Only admins can add pets '})

            //validate inputs:
            
            console.log(petData)
            const valid = validatePet(petData);
            //if (!valid) return res.status(400).json({ error: validateUserUpdate?.errors})
            if (!valid) return res.status(400).json({ error: validatePet.errors[0].message })
          
            const savedPet = await PetsDAO.createPet(petData)
            console.log('savedPet', savedPet)
            
            
            // Fields: 
            // Type 
            // Name
            // Adoption Status (Adopted, Fostered, Available)
            // Picture (Picture location URL/Path)
            // Height (number)
            // Weight (Number)
            // Color
            // Bio
            // Hypoallergenic (Boolean)
            // Dietary restrictions
            // Breed
            return res.status(201).json(savedPet)

        } catch (error) {
            handleError(error);
            return res.status(500).json({ error: "Server error" });
        }
    }

    static async getPets(req, res) {
        try {

            // Route: ‘/pet’ [GET] 

            // The get pets API is responsible for retrieving pets that match the criteria given.
            // Can receive query parameters to search the database
            // Retrieve results to match query. If no parameters are passed it should return all the results.
            // Should only return the fields necessary 

            // Search Fields: 
            // Adoption Status
            // Type
            // Height
            // Weight
            // Name
            res.status(200).json('getPets called')


        } catch (error) {
            handleError(error);
            return res.status(500).json({ error: "Server error" });
        }
    }

    static async adoptFosterPet(req, res) {
        try {

            // Route ‘/pet/:id/adopt’ [POST] (protected to logged in users)
            // The Adopt/Foster API is responsible for adding the pet to the current users pets.
            // This API also should change the pet’s adoption status. 

            // Field: 
            // Type (Adopt or foster)

            res.status(200).json('adoptFosterPet called')


        } catch (error) {
            handleError(error);
            return res.status(500).json({ error: "Server error" });
        }
    }

    static async returnPet(req, res) {
        try {

            // Route ‘/pet/:id/return’ [POST] (protected to logged in users)
            // The Return Pet API is responsible for returning the pet to the agency. 
            // The API should change the pets status back to available
            // The API should remove the pet from the users pets.
            // // 
            res.status(200).json('Return Pet called')


        } catch (error) {
            handleError(error);
            return res.status(500).json({ error: "Server error" });
        }
    }

    static async likePet(req, res) {
        try {
            // Route ‘/pet/:id/save’ [POST] (protected to logged in users)
            // The save PET api allows a user to save a pet for later
            // The saved pet should be stored as saved in the users account

            res.status(200).json('likePet called')



        } catch (error) {
            handleError(error);
            return res.status(500).json({ error: "Server error" });
        }
    }

    static async unLikePet(req, res) {
        try {
            // Route ‘/pet/:id/save’ [DELETE] (protected to logged in users)
            // The save PET api allows a user to remove a saved pet.


            res.status(200).json('unLikePet called')


        } catch (error) {
            handleError(error);
            return res.status(500).json({ error: "Server error" });
        }
    }


    static async getPetByID(req, res) {
        try {
            // Get a pet by ID should take an id and return 
            // the corresponding pet from the database. 

            res.status(200).json('getPetById called')

        } catch (error) {
            handleError(error);
            return res.status(500).json({ error: "Server error" });
        }
    }

    static async editPet(req, res) {
        try {
            //  (protected to admin only)
            // The add pet api is responsible for editing pets
            // Validate all the user input is valid
            // Handle photo upload
            // Store pet information in the database

            // Fields: Same as Add Pet API
            res.status(200).json('getPetById called')


        } catch (error) {
            handleError(error);
            return res.status(500).json({ error: "Server error" });
        }
    }



    static async handlePicUpload(req, res) {
        try {
            console.log(req.file.path)
            console.log('reqFile:', req.file)
            return res.json({
                fileName: req.file.filename
            })
        } catch (error) {
            handleError(error);
            return res.status(500).json({ error: "Server error" });
        }
    }
}

