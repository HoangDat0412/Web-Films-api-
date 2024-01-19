const {Comments} = require("../models")

const createComment = async (req,res)=>{
    const data = {
        filmId:parseInt(req.body.filmId),
        userId:parseInt(req.user.id),
        comment:req.body.comment
    }
    try {
        const comment = await Comments.create(data)
        res.status(201).send(comment)
    } catch (error) {
        res.status(500).send(error)
    }

}

const deleteComment = async (req,res)=>{
    const ID = req.params.id;
    const id = parseInt(ID)
    try {
        await Comments.destroy({
            where:{
                id
            }
        })
        res.status(200).send("Delete success !")
    } catch (error) {
        res.status(500).send(error)
    }
}

const getAllComment = async (req,res)=>{
   const ID = req.params.id;
    const id = parseInt(ID)
    try {
        const listComment = await Comments.findAll({
            where : {
                filmId:id
            }
        })

        res.status(200).send(listComment)
    } catch (error) {
        
    }
}

module.exports = {
    createComment,
    deleteComment,
    getAllComment
}