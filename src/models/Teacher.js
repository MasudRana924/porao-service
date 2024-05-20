const TeacherAccount = require("../schema/teacherSchema");
const createTeacherAccount = async (data) => {
  const newTeacherAccount = new TeacherAccount(data);
  const createdTeacherAccount = await newTeacherAccount.save();
  return createdTeacherAccount;
};
const findTeacherAccountByEmail = async (email) => {
  const teacherAccount = await TeacherAccount.findOne({ email }).lean();
  return teacherAccount;
};
const findTeacherAccountByPhone = async (phone) => {
  const teacherAccount = await TeacherAccount.findOne({ phone }).lean();
  return teacherAccount;
};
const findTeacherDetailsById = async (teacherId) => {
  const teacherDetails = await TeacherAccount.findOne({ teacherId });
  return teacherDetails;
};
const changeTeacherPassword = async (teacherId, newUpdatedPassword) => {
  const updatedShop = await TeacherAccount.findOneAndUpdate(
    { teacherId },
    { $set: { password: newUpdatedPassword } },
    { new: true, runValidators: true, useFindAndModify: false }
  );
  return updatedShop;
};
const updateTeacherSlots = async (teacherId, slotsData) => {
  try {
    const updatedTeacher = await TeacherAccount.findOneAndUpdate(
      { teacherId },
      { $push: { slots: slotsData } },
      { new: true, runValidators: true, useFindAndModify: false }
    );

    if (!updatedTeacher) {
      throw new Error("Teacher not found");
    }

    return updatedTeacher;
  } catch (error) {
    throw error;
  }
};
const getAllTeachers = async () => {
  const teachers = await TeacherAccount.find().sort({ createdAt: -1 });
  return teachers;
};
const getSingleTeacher = async (teacherId) => {
  const teacher = await TeacherAccount.findOne({ teacherId: teacherId });
  return teacher;
};
const tutorProfileUpdate = async ({teacherId, newData}) => {
  console.log("teacherId",teacherId);
  console.log("data from controller ----",newData);
  const updatedTutorProfile = await TeacherAccount.findOneAndUpdate(
    { teacherId: teacherId },
    newData,
    {
      runValidators: true,
      useFindAndModify: false,
      new: true,
    }

  );
  console.log("updatedTutorProfile----",updatedTutorProfile);
  return updatedTutorProfile;
};
module.exports = {
  createTeacherAccount,
  findTeacherAccountByEmail,
  findTeacherAccountByPhone,
  changeTeacherPassword,
  findTeacherDetailsById,
  updateTeacherSlots,
  getSingleTeacher,
  getAllTeachers,
  tutorProfileUpdate
};
