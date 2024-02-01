const {Rate} = require("../models")

const createRate = async (req,res)=>{
    const data = req.body;
    const newRate = {
        filmId:parseInt(data.filmId),
        userId:parseInt(req.user.id),
        rate:parseInt(data.rate),
    }
    try {
        const checkexist = await Rate.findOne({
            where : {
                filmId:newRate.filmId,
                userId:newRate.userId
            }
        })
        if (checkexist) {
            const resultUpdate = await Rate.update(newRate,{
                where:{
                    filmId:newRate.filmId,
                    userId:newRate.userId
                }
            })
            res.status(201).send(resultUpdate);
        } else {
            const result = await Rate.create(newRate)
            res.status(201).send(result);
        }

    } catch (error) {
        res.status(400).send(error);
    }
}

const getRatePointTotal = async (req,res)=>{
    const Id =req.params.id
    const id = parseInt(Id)
    try {
        const result = await Rate.findAll({
            where :{
                filmId:id
            }
        })
        if(result){
            res.status(200).send(result);
        }else{
            res.status(404).send("not found")
        }
       
    } catch (error) {
        res.status(400).send(error)
    }

}

const getRatePoint = async(req,res)=>{
    const userId = parseInt(req.user.id);
    const Id =req.params.id
    const filmId = parseInt(Id)
    try {
        const result = await Rate.findOne({
            where:{
                userId,
                filmId
            }
        })

        res.status(200).send(result)
    } catch (error) {
        res.status(400).send(error)
    }
}

module.exports = {
    createRate,
    getRatePointTotal,
    getRatePoint
}