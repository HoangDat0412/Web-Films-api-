const express = require("express");
const { authenticate } = require("../middlewares/auth/authenticate");
const { createFavouriteFilm,deleteFavouriteFilm,getFavouriteFilm } = require("../controllers/favouriteFilm.controller");

const FavouriteFilmRouter = express.Router()

// FAVOURITE FILM
FavouriteFilmRouter.post("/create",authenticate,createFavouriteFilm)
// delete film 
FavouriteFilmRouter.delete("/:id",authenticate,deleteFavouriteFilm)
// get film for user 
FavouriteFilmRouter.get("/",authenticate,getFavouriteFilm)

module.exports = FavouriteFilmRouter;
