const express = require("express");
const { createUser, getUser, login, deleteUser, updateUser, getUserInformation, getUserFromId, setAvatar } = require("../controllers/user.controllers");
const {authenticate} = require("../middlewares/auth/authenticate");
const { auAdmin } = require("../middlewares/auth/auAdmin");
const { uploadImg } = require("../middlewares/upload/uploadImg");
const UserRouter = express.Router()

UserRouter.post("/",createUser);
UserRouter.post("/update/:id",authenticate,updateUser);
UserRouter.post("/login",login)
UserRouter.get("/",authenticate,auAdmin(["ADMIN"]),getUser);
UserRouter.get("/information",authenticate,getUserInformation);
UserRouter.delete("/:id",authenticate,auAdmin(["ADMIN"]),deleteUser);
UserRouter.get("/detail/:id",authenticate,auAdmin(["ADMIN"]),getUserFromId);
UserRouter.post("/setavatar",authenticate,uploadImg("avatar"),setAvatar);

module.exports = UserRouter