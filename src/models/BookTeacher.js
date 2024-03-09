const BookedTeacher = require("../schema/bookedSchema");

const createBookedTeacher = async (data) => {
  try {
    const newBookedTeacher = new BookedTeacher(data);
    const createdBookedTeacher = await newBookedTeacher.save();
    return createdBookedTeacher;
  } catch (error) {
    throw error;
  }
};

const updateBookteacherStatus = async (bookingId, teacherId, status) => {
  try {
    const updatedBookTeacher = await BookedTeacher.findOneAndUpdate(
      {
        bookingId,
      },
      { $set: { status: status } },
      { new: true, runValidators: true, useFindAndModify: false }
    );
    if (!updatedBookTeacher) {
      throw new Error("Booking  not found");
    }
    return updatedBookTeacher;
  } catch (error) {
    throw error;
  }
};

const findBookByTeacherId = async (teacherId) => {
  const teacherBookingCount = await BookedTeacher.find({teacherId:teacherId}).count();
  const teacherBooking = await BookedTeacher.find({teacherId:teacherId});
  const teacherBook={teacherBookingCount,teacherBooking}
  return teacherBook;
};
const findBookBySlotId = async (slotId) => {
  const booking = await BookedTeacher.find({slotId});
  return booking;
};
const findBookByStudentId = async (studentId) => {
  const booking = await BookedTeacher.find({studentId:studentId});
  return booking;
};
module.exports = {
  createBookedTeacher,
  updateBookteacherStatus,
  updateBookteacherStatus,
  findBookByTeacherId,
  findBookBySlotId,
  findBookByStudentId
};
