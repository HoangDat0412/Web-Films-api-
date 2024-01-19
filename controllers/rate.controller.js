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
        res.status(500).send(error);
    }
}

module.exports = {
    createRate
}