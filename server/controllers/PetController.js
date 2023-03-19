const appEnv = require("dotenv").config();
const { handleError, logger } = require("../lib/logger");
const { validatePet } = require("../validations/ajvValidation");
const UserDAO = require("../models/UsersDAO");
const PetsDAO = require("../models/PetsDAO");
const { PET_STATUS } = require("../config");


module.exports = class PetController {

    static async addPet(req, res) {
        try {
            const dbUser = req.authUser;
            const petData = req.body

            // Protected to admin only
            if (!dbUser.isAdmin) return res.status(403).json({ error: 'Only admins can add pets ' })

            //validate inputs:
            const valid = validatePet(petData);
            if (!valid) return res.status(400).json({ error: validatePet.errors[0].message })

            const savedPet = await PetsDAO.createPet(petData)
            return res.status(201).json(savedPet)

        } catch (error) {
            handleError(error);
            return res.status(500).json({ error: "Server error" });
        }
    }

    static async editPet(req, res) {
        try {
            const dbUser = req.authUser;
            const petData = req.body
            const petIdParams = req.params.id
            // Protected to admin only
            if (!dbUser.isAdmin) return res.status(403).json({ error: 'Only admins can add pets ' })

            //validate inputs:
            const valid = validatePet(petData);
            if (!valid) return res.status(400).json({ error: validatePet.errors[0].message })

            //
            const dbPet = await PetsDAO.findById(petIdParams)
            if (!dbPet) return res.status(404).json({ error: 'Pet not found' })
            Object.assign(dbPet, petData)
            const savedPet = await PetsDAO.save(dbPet)
            return res.status(201).json(savedPet)

        } catch (error) {
            handleError(error);
            return res.status(500).json({ error: "Server error" });
        }
    }



    static async getPets(req, res) {
        try {
            //conditions params: type, height_min, height_max, weight_max, weight_min, status, name
            const conditions = req.query
            const pets = await PetsDAO.find(conditions)
            return res.status(200).json({ pets })
        }
        catch (error) {
            handleError(error);
            return res.status(500).json({ error: "Server error" });
        }
    }


    static async adoptFosterPet(req, res) {
        try {
            //validations
            const user = req.authUser
            const petId = req.params.id
            if (!petId) return res.status(400).json({ error: 'pet id missing' })
            const newStatus = req.body.Type
            if (newStatus !== PET_STATUS.adopted && newStatus !== PET_STATUS.fostered) {
                return res.status(400).json({ error: 'No valid pet action: adopt or foster missing' })
            }
            const pet = await PetsDAO.findById(petId)
            if (!pet) return res.status(404).json({ error: 'pet not found' })

            //update pet
            pet.status = newStatus
            pet.careGiver = user._id
            await PetsDAO.save(pet)

            //update userPets array
            user.userPets = [...new Set([...user.userPets, petId])]
            await UserDAO.save(user)
            const userPetsPopulated = await UserDAO.getUserPets(user._id)

            res.status(200).json({ userPets: user.userPets, petsInUserCare: userPetsPopulated })

        } catch (error) {
            handleError(error);
            return res.status(500).json({ error: "Server error" });
        }
    }


    static async returnPet(req, res) {
        try {  //validations
            const user = req.authUser
            const petId = req.params.id
            if (!petId) return res.status(400).json({ error: 'pet id missing' })
            const pet = await PetsDAO.findById(petId)
            if (!pet) return res.status(404).json({ error: 'pet not found' })

            //update pet
            pet.status = PET_STATUS.available
            pet.careGiver = null
            await PetsDAO.save(pet)

            //update userPets array
            const newUserPets = user.userPets.filter(pet => pet != petId)
            user.userPets = newUserPets

            await UserDAO.save(user)
            const userPetsPopulated = await UserDAO.getUserPets(user._id)

            res.status(200).json({ userPets: user.userPets, petsInUserCare: userPetsPopulated })

        } catch (error) {
            handleError(error);
            return res.status(500).json({ error: "Server error" });
        }
    }

    static async savePet(req, res) {
        try {
            //validations
            const user = req.authUser
            const petId = req.params.id
            if (!petId) return res.status(400).json({ error: 'pet id missing' })
            const pet = await PetsDAO.findById(petId)
            if (!pet) return res.status(404).json({ error: 'pet not found' })

            //update userSavedPets array
            user.userSavedPets = [...new Set([...user.userSavedPets, petId])]
            await UserDAO.save(user)
            const userSavedPetsPopulated = await UserDAO.getUserSavedPets(user._id)

            res.status(200).json({ userSavedPets: user.userSavedPets, petsSavedByUser: userSavedPetsPopulated })

        } catch (error) {
            handleError(error);
            return res.status(500).json({ error: "Server error" });
        }
    }


    static async unSavePet(req, res) {
        try {
            //validations
            const user = req.authUser
            const petId = req.params.id
            if (!petId) return res.status(400).json({ error: 'pet id missing' })
            const pet = await PetsDAO.findById(petId)
            if (!pet) return res.status(404).json({ error: 'pet not found' })

            //update userPets array
            const newUserPets = user.userSavedPets.filter(pet => {
                return pet != petId
            })
            user.userSavedPets = newUserPets
            await UserDAO.save(user)
            const userSavedPetsPopulated = await UserDAO.getUserSavedPets(user._id)

            res.status(200).json({ userSavedPets: user.userSavedPets, petsSavedByUser: userSavedPetsPopulated })

        } catch (error) {
            handleError(error);
            return res.status(500).json({ error: "Server error" });
        }
    }



    static async getPetByID(req, res) {
        try {
            const id = req.params.id
            const pet = await PetsDAO.findById(id)
            //findById
            // Get a pet by ID should take an id and return 
            // the corresponding pet from the database. 

            res.status(200).json({ pet })

        } catch (error) {
            handleError(error);
            return res.status(500).json({ error: "Server error" });
        }
    }


    static async deletePet(req, res) {
        try {
            //confirm delete pet

            //delete pet from CareTaker

            //update userPets array
            if (deletedPet.careGiver) {
                const careGiver = UserDAO.findById(deletedPet.careGiver)
                
            }
            const newUserPets = user.userPets.filter(pet => pet != petId)
            user.userPets = newUserPets



            //delete pet from liked




        } catch (error) {
            handleError(error);
            return res.status(500).json({ error: "Server error" });
        }
    }


    static async handlePicUpload(req, res) {
        try {
            return res.json({
                fileName: req.file.filename
            })
        } catch (error) {
            handleError(error);
            return res.status(500).json({ error: "Server error" });
        }
    }
}

