const myEnv = require("dotenv").config();
var dotenvExpand = require('dotenv-expand')
dotenvExpand.expand(myEnv)

const express = require("express");
const app = express();
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require('cors');
const mongoose = require('mongoose');
const AuthController = require("./controllers/AuthController");
const {handleError, logger} = require("./lib/logger");
const UserController = require("./controllers/UserController");

//connect to MongoDB
mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGO_URL).
  then(() => logger.info("Connected to MongoDB")).
  catch((err) => handleError(err))

  
//middleware
app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));


app.post("/register", AuthController.register);
app.post("/login", AuthController.login);
app.get("/logout", AuthController.logout)
app.post('/refresh_token', AuthController.refreshToken)
app.post('/user/:id', AuthController.authenticateWithDB, UserController.updateUser)
app.get("/auth", AuthController.authenticateWithDB, (req, res) => {
  return res.status(200).json({data: req.tokenDecoded})
});



app.listen(8800, () => {
  logger.info("back server running")
})