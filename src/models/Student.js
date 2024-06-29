const StudentAccount = require("../schema/studentSchema");
const createStudentAccount = async (data) => {
  const newStudentAccount = new StudentAccount(data);
  const createdStudentAccount = await newStudentAccount.save();
  return createdStudentAccount;
};
const findAccountByEmail = async (email) => {
  const studentAccount = await StudentAccount.findOne({ email }).lean();
  return studentAccount;
};
const findAccountByPhone = async (phone) => {
  const studentAccount = await StudentAccount.findOne({ phone }).lean();
  return studentAccount;
};
const findStudentDetailsByyStudentId = async (studentId) => {
  const studentDetails = await StudentAccount.findOne({ studentId });
  return studentDetails;
};
const changeStudentPassword = async (studentId, newUpdatedPassword) => {
  const updatedShop = await StudentAccount.findOneAndUpdate(
    { studentId },
    { $set: { password: newUpdatedPassword } },
    { new: true, runValidators: true, useFindAndModify: false }
  );
  return updatedShop;
};
module.exports = {
  createStudentAccount,
  findAccountByEmail,
  findAccountByPhone,
  changeStudentPassword,
  findStudentDetailsByyStudentId
};