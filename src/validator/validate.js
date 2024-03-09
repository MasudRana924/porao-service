const Validator = require('validatorjs');
const { statusCodes } = require('../helper/statusCodes');

const validate = (data , rules) => {
    const validation = new Validator(data, rules);
    if(validation.fails()){
        throw{
            status: statusCodes.BAD_REQUEST,
            message: `Invalid Parameter(s): ${Object.keys(
                validation.errors.all()
            ).join(", ")}`,
            data: validation.errors.all()
        };
    }
};

module.exports = validate;