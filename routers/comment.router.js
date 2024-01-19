const express = require("express");
const { authenticate } = require("../middlewares/auth/authenticate");
const { auAdmin } = require("../middlewares/auth/auAdmin");
const { createComment, deleteComment, getAllComment } = require("../controllers/comment.controller");

const CommentRouter = express.Router()

CommentRouter.post("/",authenticate,createComment)
CommentRouter.delete("/:id",authenticate,deleteComment)
CommentRouter.get("/:id",authenticate,getAllComment)
module.exports = CommentRouter;
