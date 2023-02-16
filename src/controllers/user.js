const { formidable } = require("formidable");
const  jwt  = require("jsonwebtoken");
const { hashPassword, comparePassword } = require("../helpers/auth");
const UserModel = require("../models/UserModel");
const cloudinary = require("cloudinary")
  .v2;
cloudinary.config({
  cloud_name: 'dzmhzssov',
    api_key: '793214593646265',
    api_secret: '0Xh0ypHZgbGUVBIWSwfm0Kh2VvQ',
    secure: true

});

exports.registration = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        console.log( req.body);
        if (!name.trim()) {
            return res.json({status:400,
                error:"Name is required"})
        }
        if (!email) {
            return res.json({
                status:400,

                error:"Email is required"
            })
        }
        if (!password || password.length<6) {
            return res.json({
                status:400,
                error:"Password must be at least 6 characters long"
            })
        }
        const existingUser = await UserModel.findOne({ email })
        if (existingUser) {
            return res.json({
                status:400,

                error:"Email is taken"
            })
        }
        const hashedPassword = await hashPassword(password)

        const user = await new UserModel({
            name,
            email,
            password:hashedPassword
        }).save()

        let Payload = { exp: Math.floor(Date.now() / 1000) * (24 * 60 * 60), data: user["email"] }
        let token =  jwt.sign(Payload, process.env.JWT_SECRET)
        console.log("user", user);
        
      return res.status(200).json({
            user: {
                name: user.name,
                email: user.email,
            },
            token

        })

    } catch (err) {
        res.status(400).json({
            error:"Something went wrong",

        })
  }
}



exports.login = (req, res) => {
    const { email, password } = req.body;
    if (!email) {
        return res.json({
            status:400,
            error: "Enter an email"
        })
    }
    if (!password || password.length < 6) {
        return res.json({
            status:400,

            error: "Password must be at least 6 characters long"
        })
    }
    UserModel.findOne({ email: email }, (err, data) => {
        try {
            if (!err) {
                const match = comparePassword(password, data.password)
                if (!match) {
                    res.json({
                        status:400,
    
                        error:"Password is incorrect"
                    })
                } else {
                    
                    let Payload = { exp: Math.floor(Date.now() / 1000) * (24 * 60 * 60), data: data["email"] }
                    let token = jwt.sign(Payload, process.env.JWT_SECRET)
                    
                    res.json({
                        status:200,
    
                        message: "Login Successfull",
                        user: {
                            name: data.name,
                            email: data.email,
                        },
                        token
                    })
                }
           }
        } catch {
                res.json({
                    status:400,
    
                   error:"User not found"
                })
        }
       
    })
}
   
exports.updateProfile = (req, res) => {

    let email = req.headers['email'];
    let reqBody = req.body;
    UserModel.updateOne({ email: email }, reqBody, (err, data) => {
        if (err) {
            res.status(400).json({
                status: "Fail to Update",
                data:err
            })
        } else {
            res.status(200).json({
                status: "Updated Successfull",
                data: data
            })
        }
    })
    
}
   
exports.selectProfile = (req, res) => {
    let email = req.headers['email'];
    UserModel.findOne({ email: email }, (err, data) => {
        if (err) {
            res.status(400).json({
                status: "Fail to Fetch",
                data:err
            })
        } else {
            res.status(200).json({
                status: "User profile getteing successfully",
                data: data
            })
        }
    })
    
}

exports.upload = async(req, res, next) => {
    const form = formidable({ multiples: true })
    form.parse(req, async(err, fields, files) => {
        if (err) {
            next(err);
            return
            
        }
        const options = {
            use_filename: true,
            unique_filename: false,
            overwrite: true,
          };
      
          try {
            // Upload the image
            const result =  await cloudinary.uploader.upload(`${files.img.filepath}`, options);
            console.log(result.public_id);
            return result.public_id;
          } catch (error) {
            console.error("error",error);
          }
        res.json({fields, files})
    })
}