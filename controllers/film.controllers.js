const {Films,Actor,FilmType, sequelize} = require("../models")

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
                id:films[index].id,
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
        let film = await Films.findOne({
            where:{
                id:numberId
            }
        })
        const actor = await Actor.findAll({
            where:{
                filmId:numberId
            }
        })
        const filmType = await FilmType.findAll({
            where:{
                filmId:numberId
            }
        })

       if(film){
        film = {
            name:film.name,
                hot:film.hot,
                des:film.des,
                yRelease:film.yRelease,
                director:film.director,
                src:film.src,
                status:film.status,
                img:film.img,
        }
        if(actor){
            film = {
                ...film,
                actor
            }
        }
        if(filmType){
            film = {
                ...film,
                filmType
            }
        }
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

const searchFilm = async (req,res)=>{
    const {name} = req.body;
    console.log(name);

    try {
        const result = await sequelize.query(`SELECT * FROM films
        WHERE name LIKE '%${name}%';`)
        if(result){
            res.status(200).send(result[0])
        }else{
            res.status(400).send("Not found !")
        }
    } catch (error) {
        res.status(500).send(error)
    }
}

module.exports = {
    createFilm,
    deleteFilm,
    updateFilm,
    getFilmAdmin,
    getFilmUser,
    getDetailFilm,
    searchFilm
}