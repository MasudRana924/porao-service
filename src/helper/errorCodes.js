const errorCodes = {
  40001: {
    reason: "ValidationInvalidField",
    message: "Invalid parameter(s)",
  },
  40002: {
    reason: "ValidationExpired",
    message: "secretCode is invalid/expired",
  },
  40003: {
    reason: "ValidationError",
    message: "Message sent failed",
  },
  40005: {
    reason: "ValidationError",
    message: "Email is already in use",
  },
  40006: {
    reason: "ValidationError",
    message: "Phone is already in use",
  },
  40007: {
    reason: "ValidationInvalidField",
    message: "Email format is not valid",
  },
  40008: {
    reason: "ValidationInvalidField",
    message: "Phone format is not valid",
  },
  40009: {
    reason: "ValidationError",
    message: "Phone number is not valid",
  },
  40012: {
    reason: "ValidationError",
    message: "Requested planId is not subscribed",
  },
  40016: {
    reason: "PasswordValidationError",
    message: "You are using old password. Please use different password. ",
  },
  40101: {
    reason: "NoUser",
    message: "User doesn't exists. Please check your credentials.",
  },
  40102: {
    reason: "InvalidPassword",
    message: "Invalid password.",
  },

  // ======================= Request Object ==================
  40201: {
    reason: "RequestObjectNotCompleted",
    message: "Image File is Missing",
  },
  // ================== Authorizer error codes ==================
  40110: {
    reason: "TokenExpired",
    message: "Authentication failed: Token has expired'",
  },
  40111: {
    reason: "InvalidToken",
    message: "Token validation fail",
  },
  40112: {
    reason: "InvalidToken",
    message: "Token verification fail",
  },
  40113: {
    reason: "NoTokenProvided",
    message: "Authentication failed: No token provided",
  },
  40114: {
    reason: "InsufficientPrivileges",
    message: "Access denied. This resource is only accessible to  student.",
  },
  40125: {
    reason: "PasswordValidationError",
    message: "Wrong password.",
  },
  40107: {
    reason: "UserUnverified",
    message: "Old password does not matched",
  },
  40401: {
    reason: "NotFound",
    message: "User not found",
  },
  40404: {
    reason: "NotFound",
    message: "User not found",
  },
  40405: {
    reason: "NotFound",
    message: "No booking is Found ",
  },
  40406: {
    reason: "NotFound",
    message: "No student found  ",
  },
  40407: {
    reason: "NotFound",
    message: "No attendance with this slot  ",
  },
  40901: {
    reason: "ConflictAuthUser",
    message: "User is already exists",
  },
  50001: {
    reason: "UnknownError",
    message: "An unknown error occurred.",
  },

};

module.exports = { errorCodes };
