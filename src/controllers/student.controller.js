const StudentModel = require("../models/Student");
const OtpModel = require("../models/Otp.js");
const { errorResponseHandler } = require("../helper/errorResponseHandler");
const validate = require("../validator/validate.js");
const { statusCodes } = require("../helper/statusCodes.js");
const jwtSecret = process.env.JWT_SECRET;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const cloudinary = require("cloudinary");
cloudinary.config({
  cloud_name: "dwcbsche7",
  api_key: "793652735628756",
  api_secret: "4lddg6ilcxsou-HotzvGd7L6fjA",
});
const studentRegistration = async (req, res) => {
  try {
    const { email, password } = req.body;
    const isExist = await StudentModel.findAccountByEmail(email);
    if (isExist) {
      throw Object.assign(new Error(), {
        status: statusCodes.CONFLICT,
        error: {
          code: 40005,
        },
      });
    }
    const hashPassword = await bcrypt.hash(password, 9);
    const newStudent = await StudentModel.createStudentAccount({
      email,
      password: hashPassword,
    });
    res.created(
      newStudent,
      "Student Registration is Successful. Your information will be verified."
    );
  } catch (err) {
    errorResponseHandler(err, req, res);
  }
};

const generateJWTToken = (student) => {
  const studentData = {
    studentId: student.studentId,
    email: student.email,
    role: student.role,
  };
  const token = jwt.sign(studentData, jwtSecret, {
    expiresIn: "30d",
  });
  return token;
};
const studentLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const student = await StudentModel.findAccountByEmail(email);
    if (!student) {
      throw Object.assign(new Error(), {
        status: statusCodes.UNAUTHORIZED,
        error: {
          code: 40101,
        },
      });
    }
    const isValidPassword = await bcrypt.compare(password, student.password);
    if (!isValidPassword) {
      throw Object.assign(new Error(), {
        status: statusCodes.UNAUTHORIZED,
        error: {
          code: 40102,
        },
      });
    }
    const token = generateJWTToken(student);
    const responseData = {
      token,
      name: student?.name,
      email: student?.email,
      role: student?.role,
      standard: student?.standard,
      phoneNumber: student?.phoneNumber,
      institution: student?.institution,
      gender: student?.gender,
      address: student?.address,
      image: student?.image,
    };
    res.success(responseData, "You have Successfully Loged In.");
  } catch (err) {
    errorResponseHandler(err, req, res);
  }
};

const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const { studentId } = req.user;
    validate(
      { currentPassword, newPassword },
      {
        currentPassword: "required",
        newPassword: "required",
      }
    );
    const student = await StudentModel.findStudentDetailsByyStudentId(
      studentId
    );
    if (!student) {
      throw Object.assign(new Error(), {
        status: statusCodes.NOT_FOUND,
        error: {
          code: 40404,
        },
      });
    }
    const isValidPassword = await bcrypt.compare(
      currentPassword,
      student.password
    );
    if (!isValidPassword) {
      throw Object.assign(new Error(), {
        status: statusCodes.UNAUTHORIZED,
        error: {
          code: 40107,
        },
      });
    }
    const newUpdatedPassword = await bcrypt.hash(newPassword, 9);
    const updatedStudent = await StudentModel.changeStudentPassword(
      studentId,
      newUpdatedPassword
    );
    res.success(updatedStudent, "Password changed successfully");
  } catch (err) {
    errorResponseHandler(err, req, res);
  }
};
const studentProfileUpdate = async (req, res) => {
  try {
    const {
      name, email, phoneNumber, address, institution, gender, standard, image
    } = req.body;
    console.log("body",req.body);
    const { studentId } = req.user;
    let result = {};
    const options = {
      use_filename: true,
      unique_filename: false,
      overwrite: true,
    };

    if (req.file) {
      const file = req.file;
      result = await cloudinary.uploader.upload(file.path, options);
      fs.unlink(file.path, function (err) {
        if (err) throw err;
      });
    }
    const newData = {
      name,
      email,
      phoneNumber,
      address,
      institution,
      gender,
      standard,
      image
    };
    if (result.url) {
      newData.image = result.url;
    }
    const updateStudentProfile = await StudentModel.studentProfileUpdate({
      studentId,
      newData,
    });
    const responseData = {
      name: updateStudentProfile?.name,
      email: updateStudentProfile?.email,
      phone: updateStudentProfile?.phoneNumber,
      address: updateStudentProfile?.address,
      degree: updateStudentProfile?.degree,
      institution: updateStudentProfile?.institution,
      standard: updateStudentProfile?.standard,
      gender: updateStudentProfile?.gender || undefined,
      image: updateStudentProfile?.image || undefined,
      role: updateStudentProfile?.role,
    };
    res.created(responseData, "Student profile successfully updated");
  } catch (err) {
    errorResponseHandler(err, req, res);
  }
};
module.exports = {
  studentRegistration,
  studentLogin,
  changePassword,
  studentProfileUpdate
};
