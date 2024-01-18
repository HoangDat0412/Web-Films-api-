const express = require("express");
const UserRouter = require("./user.router");
const FilmRouter = require("./film.router");
const FavouriteFilmRouter = require("./favouriteFilm.router");
const CheckoutRouter = require("./checkout.router");
const RootRouters = express.Router();

RootRouters.use("/user",UserRouter);
RootRouters.use("/film",FilmRouter);
RootRouters.use("/favouriteFilm",FavouriteFilmRouter)
RootRouters.use("/checkout",CheckoutRouter)

module.exports = RootRouters