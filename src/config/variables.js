require('dotenv').config();
const connectionString = process.env.MONGODB_CONN_STRING;
const variables = {
    connectionString,
};

module.exports = variables;