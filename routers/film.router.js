const express = require("express");
const { createFilm, updateFilm, deleteFilm, getFilmUser, getFilmAdmin, getDetailFilm, searchFilm } = require("../controllers/film.controllers");
const {authenticate} = require("../middlewares/auth/authenticate")
const {auAdmin} = require("../middlewares/auth/auAdmin")
const FilmRouter = express.Router();

// CRUD
// Create Film 
FilmRouter.post("/create",authenticate,auAdmin(["ADMIN","STAFF"]),createFilm)
// update film
FilmRouter.post("/update/:id",authenticate,auAdmin(["ADMIN","STAFF"]),updateFilm)
// delete film 
FilmRouter.delete("/:id",authenticate,auAdmin(["ADMIN","STAFF"]),deleteFilm)
// get film for user 
FilmRouter.get("/",getFilmUser)
// get detail film
FilmRouter.get("/detail/:id",authenticate,getDetailFilm)
// get film for admin
FilmRouter.get("/admin",authenticate,auAdmin(["ADMIN","STAFF"]),getFilmAdmin)
// search film 
FilmRouter.get("/search",searchFilm)


module.exports = FilmRouter;