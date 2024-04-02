const TeacherModel = require("../models/Teacher");
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
const teacherRegistration = async (req, res) => {
  try {
    const { name, phone, password, versityName, expert, experience } = req.body;
    validate(
      { phone, password },
      {
        phone: "required",
        password: "required",
      }
    );
    const isPhoneExist = await TeacherModel.findTeacherAccountByPhone(phone);
    if (isPhoneExist) {
      throw Object.assign(new Error(), {
        status: statusCodes.CONFLICT,
        error: {
          code: 40006,
        },
      });
    }
    const hashPassword = await bcrypt.hash(password, 9);
    const newTeacher = await TeacherModel.createTeacherAccount({
      name, phone, password, versityName, expert, experience,
      password: hashPassword,
    });
    res.created(
      newTeacher,
      "Teacher Registration is Successful. Your information will be verified."
    );
  } catch (err) {
    errorResponseHandler(err, req, res);
  }
};
const generateJWTToken = (teacher) => {
  const teacherData = {
    teacherId: teacher?.teacherId,
    role: teacher?.role,
  };
  const token = jwt.sign(teacherData, jwtSecret, {
    expiresIn: "7d",
  });
  return token;
};
const teacherLogin = async (req, res) => {
  try {
    const { phone, password } = req.body;
    const teacher = await TeacherModel.findTeacherAccountByPhone(phone);
    if (!teacher) {
      throw Object.assign(new Error(), {
        status: statusCodes.UNAUTHORIZED,
        error: {
          code: 40101,
        },
      });
    }
    const isValidPassword = await bcrypt.compare(password, teacher.password);
    if (!isValidPassword) {
      throw Object.assign(new Error(), {
        status: statusCodes.UNAUTHORIZED,
        error: {
          code: 40102,
        },
      });
    }
    const token = generateJWTToken(teacher);
    const responseData = {
      token,
      name: teacher?.name,
      email: teacher?.email,
      role: teacher?.role,
      phone: teacher?.phone,
      address: teacher?.address,
      image: teacher?.image,
      coverImage: teacher?.coverImage,
      degree: teacher?.degree,
      gender: teacher?.gender,
      expert: teacher?.expert,
      experience: teacher?.experience,
      versityName: teacher?.versityName,
      fees: teacher?.fees,
    };
    res.success(responseData, "You have Successfully Loged In.");
  } catch (err) {
    errorResponseHandler(err, req, res);
  }
};
const changeTeacherPassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const { teacherId } = req.user;
    validate(
      { currentPassword, newPassword },
      {
        currentPassword: "required",
        newPassword: "required",
      }
    );
    const teacher = await TeacherModel.findTeacherDetailsById(teacherId);
    if (!teacher) {
      throw Object.assign(new Error(), {
        status: statusCodes.NOT_FOUND,
        error: {
          code: 40404,
        },
      });
    }
    const isValidPassword = await bcrypt.compare(
      currentPassword,
      teacher.password
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
    const updatedTeacher = await TeacherModel.changeTeacherPassword(
      teacherId,
      newUpdatedPassword
    );
    res.success(updatedTeacher, "Password changed successfully");
  } catch (err) {
    errorResponseHandler(err, req, res);
  }
};

const updateTeacherSlots = async (req, res) => {
  try {
    const { teacherId } = req.user;
    const { day, startTime, endTime } = req.body;

    validate(
      { day, startTime, endTime },
      {
        day: "required",
        startTime: "required",
        endTime: "required",
      }
    );

    const slotsData = {
      day,
      startTime,
      endTime,
    };

    const updatedTeacher = await TeacherModel.updateTeacherSlots(
      teacherId,
      slotsData
    );

    res.success(updatedTeacher, "Teacher slots updated successfully");
  } catch (err) {
    errorResponseHandler(err, req, res);
  }
};

const getAllTeachers = async (req, res) => {
  try {
    const teachers = await TeacherModel.getAllTeachers();
    res.success(teachers, "Fetch all teachers successfully");
  } catch (err) {
    errorResponseHandler(err, req, res);
  }
};
const getSingleTeacher = async (req, res) => {
  try {
    const { teacherId } = req.params;
    const teacher = await TeacherModel.getSingleTeacher(teacherId);
    res.success(teacher, "Teacher get successfully.");
  } catch (err) {
    errorResponseHandler(err, req, res);
  }
};
const tutorProfileUpdate = async (req, res) => {
  try {
    const { name, email, phone, address, degree, expert, experience, gender, fees, versityName} = req.body;   
    const { teacherId } = req.user;
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
    const newData = { name, email, phone, address, degree, expert, experience, gender, fees, versityName };
    if (result.url) {
      newData.image = result.url;
    }
    const updateTutorProfile = await TeacherModel.tutorProfileUpdate(
      teacherId,
      role='teacher',
      newData
    );
    const responseData = {
      name: updateTutorProfile?.name,
      email: updateTutorProfile?.email,
      phone: updateTutorProfile?.phone,
      address: updateTutorProfile?.address,
      degree: updateTutorProfile?.degree,
      expert: updateTutorProfile?.expert,
      experience: updateTutorProfile?.experience,
      gender: updateTutorProfile?.gender || undefined,
      image: updateTutorProfile?.image || undefined,
      fees: updateTutorProfile?.fees,
      role: updateTutorProfile?.role,
      versityName: updateTutorProfile?.versityName,
    };
    console.log(responseData);
    res.created(responseData, "Tutor profile successfully updated");
  } catch (err) {
    errorResponseHandler(err, req, res);
  }
};
module.exports = {
  teacherRegistration,
  teacherLogin,
  changeTeacherPassword,
  updateTeacherSlots,
  getAllTeachers,
  getSingleTeacher,
  tutorProfileUpdate
};
