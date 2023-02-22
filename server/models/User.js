const mongoose = require('mongoose');


const UserSchema = new mongoose.Schema({
  email: { 
    type: String, 
    trim: true,
    lowercase: true,
    unique: true,
    required: 'Email address is required',
},
  password: {type:String, required:true, minlength:6},
  firstName: {type:String, required:true},
  lastName: {type:String, required:true},
  phoneNumber: {type:Number,  unique: true, required:true},
  failedLoginAttempts: {type:Number, default:0},
  lastFailedLogin: {type:Date, default:null},
  userPets:{type:Array, default:[]},
  userSavedPets:{type:Array, default:[]},
  isAdmin: {type:Boolean, default: "false"},
},
{timestamps: true}
); 

module.exports = mongoose.model('User',UserSchema)