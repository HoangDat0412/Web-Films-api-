const express = require("express");
const { authenticate } = require("../middlewares/auth/authenticate");

const { auAdmin } = require("../middlewares/auth/auAdmin");
const { createActor, deleteActor } = require("../controllers/actor.controller");


const ActorRouter = express.Router()


ActorRouter.post("/",authenticate,auAdmin(["ADMIN","STAFF"]),createActor)

ActorRouter.delete("/:id",authenticate,auAdmin(["ADMIN","STAFF"]),deleteActor)




module.exports = ActorRouter;
