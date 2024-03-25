const express = require("express");
const { createFilm, updateFilm, deleteFilm, getFilmUser, getFilmAdmin, getDetailFilm, searchFilm, uploadFilm, getFilmWatching,handleView,searchFilmType,getidwithname,handleUpload,searchCountry,mostView,searchYear } = require("../controllers/film.controllers");
const {authenticate} = require("../middlewares/auth/authenticate")
const {auAdmin} = require("../middlewares/auth/auAdmin");
const { uploadVideo } = require("../middlewares/upload/uploadVideo");
const fs = require('fs');
const { uploadFile } = require("../middlewares/upload/uploadimage");
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
// get film for watching 
FilmRouter.get("/watching/:id",authenticate,auAdmin(["ADMIN","STAFF","CLIENT"]),getFilmWatching)
FilmRouter.get('/view/:id',handleView)
// search film 
FilmRouter.post("/search",searchFilm)
FilmRouter.post('/searchfilmtype',searchFilmType)
FilmRouter.post('/searchcountry',searchCountry)
FilmRouter.post('/searchyear',searchYear)


FilmRouter.get('/mostview',mostView)
FilmRouter.post('/getid',getidwithname)
FilmRouter.post('/uploadimg/:id',uploadFile('img'),handleUpload('img'))
FilmRouter.post('/uploadsrc/:id',uploadFile('src'),handleUpload('src'))
FilmRouter.post('/uploadtrailer/:id',uploadFile('trailer'),handleUpload('trailer'))

module.exports = FilmRouter;