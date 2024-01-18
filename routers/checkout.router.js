const express = require("express");
const { authenticate } = require("../middlewares/auth/authenticate");
const { createCheckout, getCheckout, getAllCheckout } = require("../controllers/checkout.controller");
const { auAdmin } = require("../middlewares/auth/auAdmin");


const CheckoutRouter = express.Router()


CheckoutRouter.post("/create",authenticate,createCheckout)

CheckoutRouter.get("/",authenticate,getCheckout)

CheckoutRouter.get("/getall",authenticate,auAdmin(["ADMIN"]),getAllCheckout)




module.exports = CheckoutRouter;
