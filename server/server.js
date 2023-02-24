const myEnv = require("dotenv").config();
var dotenvExpand = require('dotenv-expand')
dotenvExpand.expand(myEnv)

const express = require("express");
const app = express();
const helmet = require("helmet");
const morgan = require("morgan");
const mongoose = require('mongoose');
const AuthController = require("./controllers/AuthController");
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


app.post("/register", AuthController.register);
app.post("/login", AuthController.login);
app.get("/auth", AuthController.authenticateWithDB, (req, res) => {
  return res.status(200).json({data: req.tokenDecoded})
});
app.get("/logout", AuthController.logout)
app.post('/refresh_token', AuthController.refreshToken)

app.listen(8800, () => {
  logger.info("back server running")
})