const express = require("express");
const { createFilm, updateFilm, deleteFilm, getFilmUser, getFilmAdmin, getDetailFilm, searchFilm, uploadFilm, getFilmWatching,setListFilmToDb,handleView } = require("../controllers/film.controllers");
const {authenticate} = require("../middlewares/auth/authenticate")
const {auAdmin} = require("../middlewares/auth/auAdmin");
const { uploadVideo } = require("../middlewares/upload/uploadVideo");
const fs = require('fs');
const FilmRouter = express.Router();

// CRUD
// Create Film 
// ,authenticate,auAdmin(["ADMIN","STAFF"])
FilmRouter.post("/create",authenticate,auAdmin(["ADMIN","STAFF"]),createFilm)
// upload file to film 
FilmRouter.post("/uploadfilm/:id",authenticate,auAdmin(["ADMIN","STAFF"]),uploadVideo(),uploadFilm)
// update film
FilmRouter.post("/update/:id",authenticate,auAdmin(["ADMIN","STAFF"]),updateFilm)
// delete film 
FilmRouter.delete("/:id",authenticate,auAdmin(["ADMIN","STAFF"]),deleteFilm)
// get film for user 
FilmRouter.get("/",getFilmUser)
// get detail film
FilmRouter.get("/detail/:id",getDetailFilm)
// get film for admin
FilmRouter.get("/admin",authenticate,auAdmin(["ADMIN","STAFF"]),getFilmAdmin)
// search film 
FilmRouter.post("/search",searchFilm)
// get film for watching 
FilmRouter.get("/watching/:id",authenticate,auAdmin(["ADMIN","STAFF","CLIENT"]),getFilmWatching)

FilmRouter.get("/setListfilm",setListFilmToDb)

FilmRouter.get('/view/:id',handleView)

module.exports = FilmRouter;