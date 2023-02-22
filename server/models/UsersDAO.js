const User = require("../models/User");

class UserDAO {

   static  async exists (data) {
        return await User.exists(data);
    }

    static async createUser (data) {
        const user = new User(data)
        return await user.save();
    }

    static async findOne (data) {
        return await User.findOne(data)
    }

    static async save (user) {
        return await user.save();
    }
}

module.exports =  UserDAO