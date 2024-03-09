const BookedTeacherModel = require("../models/BookTeacher");
const { errorResponseHandler } = require("../helper/errorResponseHandler");
const { statusCodes } = require("../helper/statusCodes.js");
const bookTeacher = async (req, res) => {
  try {
    const {
      teacherId,
      teacherName,
      teacherEmail,
      studentName,
      studentEmail,
      slotId,
      day,
      startTime,
      endTime,
    } = req.body;
    const { studentId } = req.user;
    const bookingData = {
      teacherId,
      teacherName,
      teacherEmail,
      studentId,
      studentName,
      studentEmail,
      slotId,
      day,
      startTime,
      endTime,
    };
    const bookedTeacher = await BookedTeacherModel.createBookedTeacher(
      bookingData
    );
    res.success(bookedTeacher, "Teacher booked successfully");
  } catch (err) {
    errorResponseHandler(err, req, res);
  }
};

const updateBookedteacherStatus = async (req, res) => {
  try {
    const { teacherId } = req.user;
    const { status } = req.body;
    const { bookingId } = req.params;
    const updatedBookedTeacher =
      await BookedTeacherModel.updateBookteacherStatus(
        bookingId,
        status,
        teacherId
      );
    res.success(
      updatedBookedTeacher,
      "BookedTeacher status updated successfully"
    );
  } catch (err) {
    errorResponseHandler(err, req, res);
  }
};

const findteacherBookingById = async (req, res) => {
  try {
    const { teacherId } = req.user;
    const teacherBooking = await BookedTeacherModel.findBookByTeacherId(
      teacherId
    );
    res.success(teacherBooking, "Teacher Booking  get successfully.");
  } catch (err) {
    errorResponseHandler(err, req, res);
  }
};
const findBookingBySlotId = async (req, res) => {
  try {
    const { slotId } = req.body;
    const booking = await BookedTeacherModel.findBookBySlotId(
      slotId
    );
    if(!booking){
      throw Object.assign(new Error(), {
        status: statusCodes.NOT_FOUND,
        error: {
          code: 40405,
        },
      });
    }
    res.success(booking, "Booking by slotId get successfully.");
  } catch (err) {
    errorResponseHandler(err, req, res);
  }
};
const findBookingByStudentId = async (req, res) => {
  try {
    const { studentId } = req.user;
    const booking = await BookedTeacherModel.findBookByStudentId(
      studentId
    );
    if(!booking){
      throw Object.assign(new Error(), {
        status: statusCodes.NOT_FOUND,
        error: {
          code: 40405,
        },
      });
    }
    res.success(booking, "Booking by StudentId  get successfully.");
  } catch (err) {
    errorResponseHandler(err, req, res);
  }
};
module.exports = {
  bookTeacher,
  updateBookedteacherStatus,
  findteacherBookingById,
  findBookingBySlotId,
  findBookingByStudentId
};
