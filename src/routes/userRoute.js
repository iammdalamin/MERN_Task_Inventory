const express = require("express")
const { registration, updateProfile, login, selectProfile, upload, forgetPass, resetPass } = require("../controllers/user")
const {requireSignIn} = require("../middlewares/AuthVerify")
const router = express.Router()


router.post("/upload", upload)

router.post("/registration", registration)
router.post("/login", login)
router.post("/forget-password", forgetPass)
router.post("/reset-password/:token", resetPass)
router.post("/updateProfile",requireSignIn, updateProfile)
router.get("/selectProfile",requireSignIn, selectProfile)

module.exports = router ;
