const {FavouriteFilm, sequelize} = require("../models")

const createFavouriteFilm = async (req,res)=>{
    const fid = req.body.filmId;
    const uid = req.user.id;

    const filmId = parseInt(fid);
    const userId = parseInt(uid)

    const data = {
        filmId,
        userId
    }
    try {
        const checkExist = await FavouriteFilm.findOne({
            where : data
        })
        if (checkExist) {
            const result = await FavouriteFilm.destroy({
                where : data
            })
            res.status(200).send("Delete success !")
        } else {
            const result = await FavouriteFilm.create(data);
            res.status(201).send(result)
        }
    } catch (error) {
        res.status(400).send(error)
    }
}
const deleteFavouriteFilm = async (req,res)=>{
    const fid = req.params.id;
    const uid = req.user.id;
    const filmId = parseInt(fid);
    const userId = parseInt(uid)
    try {
        const result = await FavouriteFilm.destroy({
           where: {
            filmId,
            userId
           }
         });
         if(result){
            res.status(200).send("Delete successful !")
         }else{
            res.status(404).send("Not found !")
         }
       
   } catch (error) {
       res.status(400).send(err)
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
        res.status(400).send(error)
    }
}




const getFavouriteFilm = async (req,res)=>{
    const uid = req.user.id;
    const userId = parseInt(uid)
    try {
        const result = await sequelize.query(`select films.id,films.name,films.img from films,favouritefilms
        where films.id = favouritefilms.filmId and favouritefilms.userId=${userId};`)
        res.status(200).send(result[0]);
    } catch (error) {
        res.status(500).send(error);
    }
}

module.exports = {
    createFavouriteFilm,
    deleteFavouriteFilm,
    getFavouriteFilm
}