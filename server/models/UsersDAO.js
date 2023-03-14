const User = require("../models/User");

class UserDAO {

    static async exists(data) {
        return await User.exists(data);
    }

    static async createUser(data) {
        const user = new User(data)
        return await user.save();
    }

    static async findOne(data) {
        return await User.findOne(data)
    }

    static async findByEmail(email) {
        return await User.findOne({ email: email.toLowerCase() })
    }

    static async findById(id) {
        return await User.findById(id)
    }

    static async save(user) {
        return await user.save();
    }

    static async getUserPets(id) {
        const data = await User.findById(id)
            .populate('userPets')
            .select('userPets')
        return data.userPets
    }

    static async getUserSavedPets(id) {
        const data = await User.findById(id)
            .populate('userSavedPets')
            .select('userSavedPets')
        return data.userSavedPets
    }
}

module.exports = UserDAO