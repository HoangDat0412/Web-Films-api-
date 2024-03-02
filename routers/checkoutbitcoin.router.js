const express = require("express");
const { authenticate } = require("../middlewares/auth/authenticate");
const { auAdmin } = require("../middlewares/auth/auAdmin");
const {createCheckout,getCheckout,getAllCheckout} = require("../controllers/checkoutbitcoin.controllers")

const CheckoutBitcoinRouter = express.Router()


CheckoutBitcoinRouter.post("/create",authenticate,createCheckout)

CheckoutBitcoinRouter.get("/",authenticate,getCheckout)

CheckoutBitcoinRouter.get("/getall",getAllCheckout)




module.exports = CheckoutBitcoinRouter;
