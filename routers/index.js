const express = require("express");
const UserRouter = require("./user.router");
const FilmRouter = require("./film.router");
const FavouriteFilmRouter = require("./favouriteFilm.router");
const CheckoutRouter = require("./checkout.router");
const ActorRouter = require("./actor.router")
const FilmtypeRouter = require("./filmtype.router")
const RateRouter = require("./rate.router")
const CommentRouter = require("./comment.router")
const RootRouters = express.Router();

RootRouters.use("/user",UserRouter);
RootRouters.use("/film",FilmRouter);
RootRouters.use("/favouriteFilm",FavouriteFilmRouter)
RootRouters.use("/checkout",CheckoutRouter)
RootRouters.use("/actor",ActorRouter)
RootRouters.use("/filmtype",FilmtypeRouter)
RootRouters.use("/rate",RateRouter)
RootRouters.use("/comment",CommentRouter)

module.exports = RootRouters