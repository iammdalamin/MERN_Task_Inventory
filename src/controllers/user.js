const { formidable } = require("formidable");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const { hashPassword, comparePassword } = require("../helpers/auth");
const UserModel = require("../models/UserModel");
const cloudinary = require("cloudinary").v2;
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
  console.log(email, password);
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
    console.log(user[0].password);

    const passwordMatch = await comparePassword(password, user[0].password);
    console.log("match", passwordMatch);
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
      console.log(result.public_id);
      return result.public_id;
    } catch (error) {
      console.error("error", error);
    }
    res.json({ fields, files });
  });
};

exports.forgetPass = async (req, res) => {
  const { email } = req.body;
  console.log(req.body);
  console.log(req.headers.host);
  // Generate a unique token
  const token = Math.floor(100000 + Math.random() * 900000)
    ;
  const user = await UserModel.find({ email });
  if (user) {
    try {
      await UserModel.updateOne(
        { email },
        {
          passwordResetToken: token,
          passwordResetExpires: Date.now() + 3600000,
        }
      );
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: `${process.env.EMAIL}`,
          pass: `${process.env.EMAIL_PASS}`,
        },
      });

      const mailOptions = {
        from: `${process.env.EMAIL}`,
        to: email,
        subject: "Password Reset",
        text: `You are receiving this email because you (or someone else) has requested a password reset for your account.\n\n`,
        html: `<h1 style={{fontSize:"50px"}}>${ token}</h1>`, // html body

      };
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log("error==========>", error);
        } else {
          console.log(`Email sent: ${info.response}`);
        }
      });

      res.send(
        "An email has been sent to your account with further instructions."
      );
    } catch (err) {
      console.log("err=======", err);
      return res.json({
        status: 400,
        message: "Email sending failed!",
      });
    }
  } else {
    return res.json({
      status: 400,
      message: "User not found!",
    });
  }
};

exports.resetPass = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;
  if (!password || password.length < 6) {
    return res.json({
      status: 400,
      error: "Password must be at least 6 characters long",
    });
  }
  const hashedPassword = await hashPassword(password);

    let value = undefined;
      await UserModel.findOneAndUpdate(
        { passwordResetToken:token },
        {
          password: hashedPassword,
          passwordResetExpires: "",
          passwordResetToken: "",
        }
      ).then((data) => {
        res.json({
          data: data,
        });
      });
    }
  

