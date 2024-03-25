const express = require("express");
const { authenticate } = require("../middlewares/auth/authenticate");
const { auAdmin } = require("../middlewares/auth/auAdmin");
// checkout bitcoin
var coinbase = require('coinbase-commerce-node');
var resources = coinbase.resources
const BitcoinRouter = express.Router()

BitcoinRouter.post("/", async (req,res)=>{
    try {
        const charge = await resources.Charge({
            name: 'The Sovereign Individual',
            description: 'Mastering the Transition to the Information Age',
            pricing_type: 'fixed_price',
            local_price: {
                amount: 100.00,
                currency: 'USD'
            },
            metadata:{
                userId:2011,
            }
        })
        res.status(200).send(charge) 
    } catch (error) {
        console.log(error);
        res.send(error)
    }
})

module.exports = BitcoinRouter