const mongoose = require("mongoose")

const OTPSchema = new mongoose.Schema({
    email: { type: String },
    otp:{type:String}
    
    

   
}, {timestamps: true, versionKey: false })



const OTPModel = mongoose.model('otp', OTPSchema)

module.exports = OTPModel;

