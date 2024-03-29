const express = require("express");
const { authenticate } = require("../middlewares/auth/authenticate");
const { createFavouriteFilm,deleteFavouriteFilm,getFavouriteFilm,checkFavouriteFilm } = require("../controllers/favouriteFilm.controller");

const FavouriteFilmRouter = express.Router()

// FAVOURITE FILM
FavouriteFilmRouter.post("/",authenticate,createFavouriteFilm)

// get film for user 
FavouriteFilmRouter.get("/",authenticate,getFavouriteFilm)

module.exports = FavouriteFilmRouter;
