const { formidable } = require("formidable");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const { hashPassword, comparePassword } = require("../helpers/auth");
const UserModel = require("../models/UserModel");
const cloudinary = require("cloudinary").v2;
const OTPModel = require("../models/OTPModel");
const { SendEmailUtility } = require("../utility/SendEmailUtility");
cloudinary.config({
  cloud_name: "dzmhzssov",
  api_key: "793214593646265",
  api_secret: "0Xh0ypHZgbGUVBIWSwfm0Kh2VvQ",
  secure: true,
});

exports.registration = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name.trim()) {
      return res.json({ status: 400, error: "Name is required" });
    }
    if (!email) {
      return res.json({
        status: 400,

        error: "Email is required",
      });
    }
    if (!password || password.length < 6) {
      return res.json({
        status: 400,
        error: "Password must be at least 6 characters long",
      });
    }
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.json({
        status: 400,

        error: "Email is taken",
      });
    }
    const hashedPassword = await hashPassword(password);

    const user = await new UserModel({
      name,
      email,
      password: hashedPassword,
    }).save();

    let Payload = {
      exp: Math.floor(Date.now() / 1000) * (24 * 60 * 60),
      data: user["email"],
    };
    let token = jwt.sign(Payload, process.env.JWT_SECRET);

    return res.status(200).json({
      user: {
        name: user.name,
        email: user.email,
      },
      token,
    });
  } catch (err) {
    res.status(400).json({
      error: "Something went wrong",
    });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  if (!email) {
    return res.json({
      status: 400,
      error: "Enter an email",
    });
  }
  if (!password || password.length < 6) {
    return res.json({
      status: 400,

      error: "Password must be at least 6 characters long",
    });
  }

  try {
    const user = await UserModel.aggregate([{ $match: { email } }]);

    const passwordMatch = await comparePassword(password, user[0].password);
    if (!passwordMatch) {
      return res.json({
        status: 400,

        error: "Password is incorrect",
      });
    } else {
      let Payload = {
        exp: Math.floor(Date.now() / 1000) * (24 * 60 * 60),
        data: user[0].email,
      };
      let token = jwt.sign(Payload, process.env.JWT_SECRET);

      return res.json({
        status: 200,

        message: "Login Successfull",
        user: {
          name: user[0].name,
          email: user[0].email,
        },
        token,
      });
    }
  } catch (err) {
    res.json({
      status: 400,
      message: "User not found",
    });
  }
};

exports.updateProfile = (req, res) => {
  let email = req.headers["email"];
  let reqBody = req.body;
  UserModel.updateOne({ email: email }, reqBody, (err, data) => {
    if (err) {
      res.status(400).json({
        status: "Fail to Update",
        data: err,
      });
    } else {
      res.status(200).json({
        status: "Updated Successfull",
        data: data,
      });
    }
  });
};

exports.selectProfile = (req, res) => {
  let email = req.headers["email"];
  UserModel.findOne({ email: email }, (err, data) => {
    if (err) {
      res.status(400).json({
        status: "Fail to Fetch",
        data: err,
      });
    } else {
      res.status(200).json({
        status: "User profile getteing successfully",
        data: data,
      });
    }
  });
};

exports.upload = async (req, res, next) => {
  const form = formidable({ multiples: true });
  form.parse(req, async (err, fields, files) => {
    if (err) {
      next(err);
      return;
    }
    const options = {
      use_filename: true,
      unique_filename: false,
      overwrite: true,
    };

    try {
      // Upload the image
      const result = await cloudinary.uploader.upload(
        `${files.img.filepath}`,
        options
      );
      return result.public_id;
    } catch (error) {
      console.error("error", error);
    }
    res.json({ fields, files });
  });
};

exports.forgetPass = async (req, res) => {
  const { email } = req.params;
  // Generate a unique token
  const OTPcode = Math.floor(100000 + Math.random() * 900000)
    ;
  try {
    const UserCount = (await UserModel.aggregate([{ $match: { email: email } }, { $count: "total" }]))
  if (UserCount.length > 0) {
    let createOTP = await OTPModel.create({ email: email, otp: OTPcode })
    let SendEmail = await SendEmailUtility(email, "Your OTP is " + OTPcode, "Task Inventory OTP Verification").then((result) => {
      res.status(200).json({
        message: "Email Sent!",
        data:result
      })    })
   
 
  } else {
    res.status(400).json({
      message:"Email sending failed!"
    })
  }} catch (err) {
    res.status(400).json({
      message: "Failed to processing",
      data:err
    })
  }
 
};

exports.otpVerify = async (req, res) => {
  const {email,otp} = req.params;
  try {
    const user = await OTPModel.aggregate([{ $match: { email: email, otp: otp } }])
  if (user.length > 0) {
      await OTPModel.updateOne({ email: email, otp: otp }).then((data) => {
      res.status(200).json({
        message: "Success",
        email: email,
        otp: otp,
        data: data
      })
    })
  } else {
    res.status(400).json({
      message: "Invalid OTP",
      data: err
    })
  }
  } catch (err) {
    res.status(400).json({
      message: "Fail to verify",
      data: err
    })
  }
  
}



exports.resetPass = async (req, res) => {
  const { otp, email, password } = req.body;
  if (!password || password.length < 6) {
    return res.json({
      status: 400,
      error: "Password must be at least 6 characters long",
    });
  }
  try {
    let user = await OTPModel.findOne({ email: email, otp: otp, })
  if (user) {
    const hashedPassword = await hashPassword(password);

    let passwordUpdate = await UserModel.updateOne({ email: email }, { password: hashedPassword })
    if (passwordUpdate) {
       await OTPModel.deleteOne({ email: email })
    }
    res.status(200).json({
      message: "Password Updated",
      data:passwordUpdate
    })
  } else {
    res.status(400).json({
      message: "Failed",
      data:user
    })
  }
}catch (err) {
  res.status(400).json({
    message: "Fail to reset",
    data: err
  })
}

}
  
