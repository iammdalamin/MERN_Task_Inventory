const mongoose = require("mongoose")

const TaskSchema = new mongoose.Schema({
    title:{type:String,trim:true,required: true,
    },
    desc: {
        type: String,
        trim: true,
        unique:false,
        required: true,
    },
    status: {
        type: String,
        default:"New"
    },
    
    email:{type:String},

   
}, {timestamps: true, versionKey: false })



const TaskModel = mongoose.model('tasks', TaskSchema)

module.exports = TaskModel;

