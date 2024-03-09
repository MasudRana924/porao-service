const { statusCodes } = require('./statusCodes.js');
const { errorCodes } = require('./errorCodes.js');
function getErrorBlock(code, message) {
  const errorObj = {};
  errorObj.code = code;
  Object.assign(errorObj, errorCodes[code]);
  if (message) {
    errorObj.message = message;
  }
  return errorObj;
}

const responseHandler = () => {
  return async (req, res, next) => {
    res.statusCodes = statusCodes;
    res.textOk = text => {
      res.status(statusCodes.OK);
      res.send(text);
    };

    res.success = (data = null, message = null, error = {}) => {
      res.status(res.statusCode < 400 ? res.statusCode : statusCodes.OK);
      res.json({ status: "success", data, error, message });
    };

    res.fail = (data = null, message = null, error = {}) => {
      res.status(
        res.statusCode >= 400 && res.statusCode < 500
          ? res.statusCode
          : statusCodes.BAD_REQUEST
      );
      res.json({ status: "fail", data, error, message });
    };

    res.error = (code = null, message = null, error = {}) => {
      res.status(
        res.statusCode < 500
          ? statusCodes.INTERNAL_SERVER_ERROR
          : res.statusCode
      );
      res.json({ status: "error", code, error, message });
    };

    res.okFail = (data = null, message = null, errorCode, errData = null) => {
      res.status(statusCodes.OK);

      const error = getErrorBlock(errorCode, message);

      if (errData) {
        error.data = errData;
      }
      res.success(data, message || error.message, error);
    };

    res.ok = (data, message) => {
      res.status(statusCodes.OK);
      res.success(data, message);
    };

    res.created = (data, message) => {
      res.status(statusCodes.CREATED);
      res.success(data, message);
    };

    res.accepted = (data, message) => {
      res.status(statusCodes.ACCEPTED);
      res.success(data, message);
    };

    res.noContent = (data, message) => {
      res.status(statusCodes.NO_CONTENT);
      res.success(data, message);
    };

    res.badRequest = (data, message, error) => {
      res.status(statusCodes.BAD_REQUEST);
      res.fail(data, message, error);
    };

    res.unauthorized = (data, message, error) => {
      res.status(statusCodes.UNAUTHORIZED);
      res.fail(data, message, error);
    };

    res.forbidden = (data, message, error) => {
      res.status(statusCodes.FORBIDDEN);
      res.fail(data, message, error);
    };

    res.notFound = (data, message, error) => {
      res.status(statusCodes.NOT_FOUND);
      res.fail(data, message, error);
    };

    res.internalServerError = (code, message, error) => {
      res.status(statusCodes.INTERNAL_SERVER_ERROR);
      res.error(code, message, error);
    };

    res.notImplemented = (code, message, error) => {
      res.status(statusCodes.NOT_IMPLEMENTED);
      res.error(code, message, error);
    };

    res.conflict = (data, message, error) => {
      res.status(statusCodes.CONFLICT);
      res.fail(data, message, error);
    };

    res.serviceUnavailable = (code, message, error) => {
      res.status(statusCodes.SERVICE_UNAVAILABLE);
      res.error(code, message, error);
    };
    await next();
  };
}

module.exports = { responseHandler };
