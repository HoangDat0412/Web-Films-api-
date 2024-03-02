const {CheckoutBitcoins,Users, sequelize} = require("../models");
const createCheckout = async (req,res)=> {
    const uid = req.user.id;
    const userId = parseInt(uid)
    const deadline = new Date();
    deadline.setMonth(deadline.getMonth() + 1)
    const data = {
        userId,
        deadline,
        ...req.body
    }
    try {
        const result = await CheckoutBitcoins.create(data);
        if(result){
            if(req.user.userType === "USER"){
                await Users.update({
                    userType:"CLIENT"
                },{
                    where :{
                        id:userId
                    }
                })
            }
        }
        res.status(201).send(result)
    } catch (error) {
        res.status(400).send(error)
    }
}

const getCheckout = async (req,res)=>{
    const uid = req.user.id;
    const userId = parseInt(uid)
    try {
        const result = await CheckoutBitcoins.findAll({
            where:{
                userId
            }
        })
        res.status(200).send(result)
    } catch (error) {
        res.status(400).send(error)
    }
}

const getAllCheckout = async (req,res)=>{
    try {
        const result = await sequelize.query(`select Users.id as userId ,Users.email,CheckoutBitcoins.bitcoinprice,CheckoutBitcoins.createdAt,CheckoutBitcoins.walletaddress,CheckoutBitcoins.deadline from Users,CheckoutBitcoins 
        where Users.id = CheckoutBitcoins.userId;`)

        res.status(200).send(result[0])
    } catch (error) {
        res.status(400).send(error)
    }
}



module.exports = {
    createCheckout,
    getCheckout,
    getAllCheckout
}