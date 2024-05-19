const express = require('express');
const connectDatabase = require('./config/connection');
const cookieParser = require("cookie-parser");
const morgan = require('morgan');
const bodyParser = require("body-parser");
const cors = require('cors');
require('dotenv').config();
const routes = require('./routes/index.js');
const { responseHandler } = require('./helper/responseHandler');
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(morgan('dev'));
app.use(responseHandler());
app.use('/api/v1', routes);
const port = process.env.PORT;
connectDatabase();
const server = app.listen(port, () => {
  console.log(`Server is running on port  ${port}`);
});
module.exports = server;