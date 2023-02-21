const jwt = require("jsonwebtoken");
const UserModel = require("../models/UserModel");


exports.requireSignIn = (req, res, next) => {
    
    try {
        let token = req.headers["token"]
        // console.log(token);
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                console.log("err", err);

                res.status(400).json({
                    err:"Unauthorized Token"
                })
            } else {
                // console.log("Decoded==>",decoded);
                let email = decoded
                ["data"]
            
                req.headers.email = email
                next()
            }
           
         
      
   
       })
    } catch (err) {
        console.log(err);
    }

     
}


