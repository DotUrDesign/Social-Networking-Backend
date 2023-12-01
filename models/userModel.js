const emailValidator = require('email-validator');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName : {
        type : String,
        required: true,
        min: 3,
        max: 50
    },
    lastName : {
        type : String,
        required: true,
        min: 3,
        max: 50
    },
    email : {
        type : String,
        required: true,
        unique: true,
        min: 3,
        max: 50,
        validate : function(){
            return emailValidator.validate(this.email);
        }
    },
    password : {
        type : String,
        required: true,
        min: 4,
        max: 100
    },
    picturePath: {
        type: String,
        default: ""
    },
    friends: {
        type : String,
        default : []
    },
    location: String,
    occupation: String,
    viewedProfile: {
        type: Number,
        default : Math.floor(Math.random()*1000)
    },
    impressions: {
        type : Number,
        default : Math.floor(Math.random() * 1000)
    }
});

userSchema.pre('save', async function(){
    let salt = await bcrypt.genSalt();
    let hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
})

const userModel = mongoose.model('userModel', userSchema);
module.exports = userModel;