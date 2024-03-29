const StudentModel = require("../models/Student");
const OtpModel = require("../models/Otp.js");
const { errorResponseHandler } = require("../helper/errorResponseHandler");
const validate = require("../validator/validate.js");
const { statusCodes } = require("../helper/statusCodes.js");
const jwtSecret = process.env.JWT_SECRET;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const studentRegistration = async (req, res) => {
  try {
    const { firstName, lastName, email, phone, password } = req.body;
    const isExist = await StudentModel.findAccountByPhone(phone);
    if (isExist) {
      throw Object.assign(new Error(), {
        status: statusCodes.CONFLICT,
        error: {
          code: 40006,
        },
      });
    }
    const hashPassword = await bcrypt.hash(password, 9);
    const newStudent = await StudentModel.createStudentAccount({
      firstName, lastName, email,
      phone,
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
    const { phone, password } = req.body;
    const student = await StudentModel.findAccountByPhone(phone);
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
      class: student?.class,
      phone: student?.phone,
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

module.exports = {
  studentRegistration,
  studentLogin,
  changePassword,
};
