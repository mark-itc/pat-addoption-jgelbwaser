const myEnv = require("dotenv").config();
var dotenvExpand = require('dotenv-expand')
dotenvExpand.expand(myEnv)

const express = require("express");
const app = express();
const helmet = require("helmet");
const morgan = require("morgan");
const mongoose = require('mongoose');
const userRoute = require('./routes/users')
const authRoute = require('./routes/auth');
const UserController = require("./controllers/UserController");
const {handleError, logger} = require("./lib/logger");


//connect to MongoDB
mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGO_URL).
  then(() => logger.info("Connected to MongoDB")).
  catch((err) => handleError(err))

  
//middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

// app.use("/users", userRoute);
// app.use("/auth", authRoute);

app.post("/register", UserController.register);
app.post("/login", UserController.login);

app.listen(8800, () => {
  logger.info("back server running")
})