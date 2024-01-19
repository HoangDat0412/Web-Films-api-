const express = require("express");
const { authenticate } = require("../middlewares/auth/authenticate");
const { auAdmin } = require("../middlewares/auth/auAdmin");
const { createRate } = require("../controllers/rate.controller");
const RateRouter = express.Router()

RateRouter.post("/",authenticate,createRate)

module.exports = RateRouter;
