const Pet = require("./Pet");

class PetDAO {

   static  async exists (data) {
        return await Pet.exists(data);
    }

    static async createPet (data) {
        const user = new Pet(data)
        return await user.save();
    }

    static async findOne (data) {
        return await Pet.findOne(data)
    }

    static async findById(id) {
        return await Pet.findById(id)
    }

    static async save (pet) {
        return await pet.save();
    }
}

module.exports =  PetDAO