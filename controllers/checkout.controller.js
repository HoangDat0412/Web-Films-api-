const {Checkout,Users, sequelize} = require("../models");

const createCheckout = async (req,res)=>{
    const uid = req.user.id;
    const userId = parseInt(uid)
    const data = {
        userId,
        ...req.body
    }
    try {
        const result = await Checkout.create(data);
        if(result){
            await Users.update({
                userType:"CLIENT"
            },{
                where :{
                    id:userId
                }
            })
        }
        res.status(201).send(result)
    } catch (error) {
        res.status(505).send(error)
    }
}

const getCheckout = async (req,res)=>{
    const uid = req.user.id;
    const userId = parseInt(uid)
    try {
        const result = await Checkout.findAll({
            where:{
                userId
            }
        })
        res.status(200).send(result)
    } catch (error) {
        res.status(500).send(error)
    }
}
const getAllCheckout = async (req,res)=>{
    try {
        const result = await sequelize.query(`select users.id as userId ,users.email,checkouts.moneyPay,checkouts.createdAt,checkouts.accountNumber,checkouts.bank from users,checkouts 
        where users.id = checkouts.userId;`)

        res.status(200).send(result[0])
    } catch (error) {
        res.status(500).send(error)
    }
}
module.exports = {
    createCheckout,
    getCheckout,
    getAllCheckout
}
