const express = require("express");
const { authenticate } = require("../middlewares/auth/authenticate");
const { auAdmin } = require("../middlewares/auth/auAdmin");
const { createFilmType, deleteFilmType } = require("../controllers/filmtype.controller");

const FilmtypeRouter = express.Router()


FilmtypeRouter.post("/",authenticate,auAdmin(["ADMIN","STAFF"]),createFilmType)

FilmtypeRouter.delete("/:id",authenticate,auAdmin(["ADMIN","STAFF"]),deleteFilmType)


module.exports = FilmtypeRouter;
