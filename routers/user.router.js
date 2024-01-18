const express = require("express");
const { createUser, getUser, login, deleteUser, updateUser } = require("../controllers/user.controllers");
const {authenticate} = require("../middlewares/auth/authenticate");
const { auAdmin } = require("../middlewares/auth/auAdmin");
const UserRouter = express.Router()

UserRouter.post("/",createUser);
UserRouter.post("/update/:id",authenticate,updateUser);
UserRouter.post("/login",login)
UserRouter.get("/",authenticate,auAdmin(["ADMIN"]),getUser);

UserRouter.delete("/:id",authenticate,auAdmin(["ADMIN"]),deleteUser);

module.exports = UserRouter