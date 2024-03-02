const express = require("express");
const { authenticate } = require("../middlewares/auth/authenticate");
const { auAdmin } = require("../middlewares/auth/auAdmin");
const { createRate, getRatePoint, getRatePointTotal } = require("../controllers/rate.controller");
const RateRouter = express.Router()

RateRouter.post("/",authenticate,auAdmin(["CLIENT","STAFF","ADMIN"]),createRate)
RateRouter.get("/:id",getRatePointTotal)
RateRouter.get("/user/:id",authenticate,getRatePoint)
module.exports = RateRouter;
