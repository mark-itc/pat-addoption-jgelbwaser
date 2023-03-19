const { PET_TYPES_ENUM, PET_STATUS_ENUM } = require("../config");
const Pet = require("./Pet");

class PetDAO {

    static async exists(data) {
        return await Pet.exists(data);
    }

    static async createPet(data) {
        const user = new Pet(data)
        return await user.save();
    }

    static async findOne(data) {
        return await Pet.findOne(data)
    }

    static async findById(id) {
        return await Pet.findById(id)
    }

    static async find(conditions = {}) {
        const {type, height_min, height_max, weight_max, weight_min, status, name} = conditions;
        const queryArgs = {}

        if (type && PET_TYPES_ENUM.includes(parseInt(type))) {
            queryArgs.type = parseInt(type)
        }
        if (type && PET_STATUS_ENUM.includes(parseInt(status))) {
            queryArgs.status = parseInt(status)
        }
        if (height_max || height_min) {
            queryArgs.height = {}
            height_min ? queryArgs.height['$gte'] = height_min : null;
            height_max ? queryArgs.height['$lte'] = height_max : null;
        }
        if (weight_max || weight_min) {
            queryArgs.weight = {}
            weight_min ? queryArgs.weight['$gte'] = weight_min : null;
            weight_max ? queryArgs.weight['$lte'] = weight_max : null;
        }
        if(name) {
            queryArgs.name = { $regex: name, $options: "i" }
        }
        return await Pet.find(queryArgs)
    }

    static async findById(id) {
        return await Pet.findById(id)
    }


    static async save(pet) {
        return await pet.save(pet);
    }
}

module.exports = PetDAO