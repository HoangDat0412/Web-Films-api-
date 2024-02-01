const {Actor} = require("../models")

const createActor = async (req,res)=>{
    const data = req.body 
    try {
        const actor = await Actor.create(data)
        res.status(201).send(actor)
    } catch (error) {
        res.status(400).send(error)
    }

}

const deleteActor = async (req,res)=>{
    const ID = req.params.id 
    const id = parseInt(ID);
    
    try {
        await Actor.destroy({
            where: {
                id
            }
          });
          res.status(200).send("Delete successful !")
    } catch (error) {
        res.status(400).send(error)
    }
}

module.exports = {
    createActor,
    deleteActor
}