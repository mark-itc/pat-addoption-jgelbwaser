const mongoose = require('mongoose');
const { PET_TYPES_ENUM, PET_STATUS_ENUM } = require('../config');


const PetSchema = new mongoose.Schema({
    type: {
        type: Number,
        enum: PET_TYPES_ENUM,
        required: true
    },
    name: {type:String, required:true},
    status:{
        type: Number,
        enum: PET_STATUS_ENUM,
        required: true,
        default: 0,
    },
    picture: {type:String},
    height: {type: Number, min:0, required:true},
    weight: {type: Number, min:0, required:true},
    color: {type:String},
    bio: {type:String},
    hypoallergenic:{type:Boolean, default: "false"},
    DietaryRestrictions:{type:String},
    breed:{type:String},
    careGiver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
},
{timestamps: true}
); 

module.exports = mongoose.model('Pet',PetSchema)