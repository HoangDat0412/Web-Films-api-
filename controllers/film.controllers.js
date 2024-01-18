const {Films} = require("../models")

const createFilm = async (req,res)=>{
    const data = req.body
    try {
        const newFilm = await Films.create(data);
        res.status(201).send(newFilm)
    } catch (error) {
        res.status(505).send(error)
    }
}
const deleteFilm = async (req,res)=>{
    const id = req.params.id;
    const ID = parseInt(id)
    try {
        await Films.destroy({
           where: {
             id:ID
           }
         });
         res.status(200).send("Delete successful !")
       
   } catch (error) {
       res.status(500).send(err)
   }
}
const updateFilm = async (req,res)=>{
    const id = req.params.id;
    const numberId = parseInt(id)
    const data = req.body
    try {
        await Films.update(data,{
            where :{
                id:numberId
            }
        })
        const result = await Films.findOne({
            where:{
                id:numberId
            }
        })
        if (result) {
            res.status(200).send(result)
        } else {
            res.status(404).send("Not found")
        }

    } catch (error) {
        res.status(505).send(error)
    }
}
const getFilmUser = async (req,res)=>{
    
    try {
        let films = await Films.findAll();
        const result = []
        for (let index = 0; index < films.length; index++) {
            result.push({
                img:films[index].img,
                name:films[index].name,
                status:films[index].status,
                hot:films[index].hot,
            })
            
        }
        res.status(200).send(result);

    } catch (error) {
        res.status(505).send(error)
    }
}
const getDetailFilm = async (req,res)=>{
    const id = req.params.id;
    const numberId = parseInt(id)
    try {
        const film = await Films.findOne({
            where:{
                id:numberId
            }
        })
       if(film){
        res.status(200).send(film)
       }else{
        res.status(400).send("Not found")
       }
    } catch (error) {
        res.status(500).send(error)
    }
}


const getFilmAdmin = async (req,res)=>{
    try {
        const result = await Films.findAll();
        res.status(200).send(result);
    } catch (error) {
        res.status(500).send(error);
    }
}

module.exports = {
    createFilm,
    deleteFilm,
    updateFilm,
    getFilmAdmin,
    getFilmUser,
    getDetailFilm
}