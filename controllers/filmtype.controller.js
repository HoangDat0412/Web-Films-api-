const {FilmType} = require("../models")

const createFilmType= async (req,res)=>{
    const data = req.body 
    try {
        const filmType = await FilmType.create(data)
        res.status(201).send(filmType)
    } catch (error) {
        res.status(400).send(error)
    }

}

const deleteFilmType = async (req,res)=>{
    const ID = req.params.id 
    const id = parseInt(ID);
    
    try {
        await FilmType.destroy({
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
    createFilmType,
    deleteFilmType
}