const express = require("express")
const mongoose = require("mongoose")
const userRoute =  require("./src/routes/userRoute") 
const taskRoute =  require("./src/routes/taskRoute") 

const bodyParser = require("body-parser")
const cors = require("cors")
const dotenv = require("dotenv")
const rateLimit = require('express-rate-limit')
const hpp = require("hpp")
const xss = require("xss-clean")
const helmet  = require("helmet")
const mongoSanitize = require("express-mongo-sanitize")


const app = new  express()
const corsOptions = {
    origin: "http://127.0.0.1:5173",
  };
app.use(bodyParser.json())
app.use(cors(corsOptions))
app.use(hpp())
app.use(xss())
app.use(helmet({
    crossOriginResourcePolicy: false,
  }))
app.use(mongoSanitize())

dotenv.config()

const limiter = rateLimit({ windowMS: 15 * 60 * 1000, max: 3000 })
app.use(limiter)



//Route Handle
app.use("/api/v1", userRoute)
app.use("/api/v1", taskRoute)
// app.use("/api/v1", categoryRoutes)

let OPTION = {
    autoIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    }
mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGODB_URL,OPTION,  (err) => {
    err ? console.log(err)
    :console.log("Server Connected");
})




module.exports=app