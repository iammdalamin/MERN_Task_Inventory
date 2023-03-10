const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: [true, "Please write your Email"],
},
    email: {
        type: String,
        trim: [true, "Please write your Email"],
        required: [true,"It should be require"],
        unique:true},
    password: {
        type: String, required: true,
        min: 6,
        max: 64
    },
    profile_img: {type:String},
    cloudinary_id: {type:String},
    passwordResetToken: { type: String, default: undefined },
    passwordResetExpires: { type: String, default: undefined },
   
}, {timestamps: true, versionKey: false })



const UserModel = mongoose.model('users', UserSchema)

module.exports = UserModel;

