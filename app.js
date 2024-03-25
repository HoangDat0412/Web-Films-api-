const express = require("express");
const app = express()
const path = require("path")
const {sequelize} = require('./models')
const RootRouters = require('./routers')
const cors = require('cors');
const rateLimit = require('express-rate-limit');
require('dotenv').config()


// // // bitcoin
// var coinbase = require('coinbase-commerce-node');
// var Client = coinbase.Client;
// Client.init("jkDA1Cr4ouPbA6aS");
// var resources = coinbase.resources
// // var Webhook = require('coinbase-commerce-node').Webhook;

// setup app using json
app.use(express.json());


// app.post("/checkout",async (req,res)=>{
 
//   const {amount,currency} = req.body
//   console.log("amount",amount);
//   try {
//     const charge = await resources.Charge.create({
//       name:"test charge",
//       description:"Test charge description",
//       local_price:{
//         amount:amount,
//         currency:currency
//       },
//       pricing_type:"fixed_price",
//       metadata:{
//         userID:12,
//       }
//     })
//     res.status(200).send(charge)
//   } catch (error) {
//     res.send(error)
//   }
// })

// Enable CORS for all routes
app.use(cors());

// Apply rate limiting middleware
const limiter = rateLimit({
  windowMs: 10 * 60 * 2000, // 15 minutes
  max: 1000, // Limit each IP to 100 requests per window (15 minutes)
  // Other options like custom headers can be configured here
});
app.use(limiter);



// set up router
app.use('/api/v1/films',RootRouters)

const publicPathhDirectory = path.join(__dirname,"./public")
app.use("/public",express.static(publicPathhDirectory))

const port = 4000;
app.listen(port,async ()=>{
    console.log(`App listen on port localhost ${port}`);
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
})

app.get("/hello",async (req,res)=>{
  
})


app.use((req, res, next) => {
  // Set the timeout for all HTTP requests
  req.setTimeout(1000*60*20, () => {
      let err = new Error('Request Timeout');
      err.status = 408;
      next(err);
  });

});

