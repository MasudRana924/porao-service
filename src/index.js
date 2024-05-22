const express = require('express');
const connectDatabase = require('./config/connection');
const cookieParser = require("cookie-parser");
const morgan = require('morgan');
const bodyParser = require("body-parser");
const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io');
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
// const server = app.listen(port, () => {
//   console.log(`Server is running on port  ${port}`);
// });
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
      origin: "http://localhost:3000", // Allow requests from this origin
      methods: ["GET", "POST"],
      allowedHeaders: ["my-custom-header"],
      credentials: true
  }
});
app.set('socketio', io);
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
module.exports = server;