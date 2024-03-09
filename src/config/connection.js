const variables = require("./variables");
const mongoose = require("mongoose");
const connectDatabase = () => {
    mongoose.connect(variables.connectionString, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(() => {
        console.log("Database Connected Successfully ");
    }).catch((e) => {
        console.log(e);
    });
};
module.exports = connectDatabase;