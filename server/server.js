const appEnv = require("dotenv").config();
var dotenvExpand = require('dotenv-expand')
dotenvExpand.expand(appEnv)

const express = require("express");
const app = express();
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require('cors');
const mongoose = require('mongoose');
const AuthController = require("./controllers/AuthController");
const { handleError, logger } = require("./lib/logger");
const UserController = require("./controllers/UserController");
const { UPLOADS_FOLDER_PICS } = require("./config");
const multer = require("multer");
const { upload } = require("./lib/multer");
const PetController = require("./controllers/PetController");


//connect to MongoDB
mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGO_URL).
  then(() => logger.info("Connected to MongoDB")).
  catch((err) => handleError(err))


//middleware
app.use(cors());
app.use(express.json());
app.use(helmet(
  {crossOriginEmbedderPolicy: false,
  crossOriginResourcePolicy: false,
  }
));
app.use(morgan("common"));
app.use(`/${process.env.UPLOADS_FOLDER_PICS}`, cors(), express.static(process.env.UPLOADS_FOLDER_PICS))


//TODO ONLY ADMIN
app.post('/upload_pic', upload.single('file'), PetController.handlePicUpload)
app.post("/register", AuthController.register);
app.post("/login", AuthController.login);
app.get("/logout", AuthController.logout)
app.post('/refresh_token', AuthController.refreshToken)
app.post('/user/:id', AuthController.authenticateWithDB, UserController.updateUser)

app.post( '/pet', PetController.addPet), //Only Admin
app.get( '/pet/:id', PetController.getPetByID),
app.put( '/pet/:id', PetController.editPet),//Only Admin
app.get( '/pet', PetController.getPets),
app.post( '/pet/:id/adopt', AuthController.authenticateWithDB, PetController.adoptFosterPet),//Only users
app.post( '/pet/:id/return', AuthController.authenticateWithDB, PetController.returnPet),//Only users
app.post( '/pet/:id/save', AuthController.authenticateWithDB, PetController.savePet),//Only users
app.delete( '/pet/:id/save', AuthController.authenticateWithDB, PetController.unSavePet),//Only users


app.get("/auth", AuthController.authenticateWithDB, (req, res) => {
  return res.status(200).json({ data: req.tokenDecoded })
});



app.listen(8800, () => {
  logger.info("back server running")
})