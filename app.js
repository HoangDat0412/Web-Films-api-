const express = require("express");
const app = express()
const path = require("path")
const {sequelize} = require('./models')
const RootRouters = require('./routers')
// setup app using json
app.use(express.json());
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