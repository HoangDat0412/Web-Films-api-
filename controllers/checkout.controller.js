const {Checkout,Users, sequelize,CheckoutBitcoins,Vnpays} = require("../models");

// const createCheckout = async (req,res)=>{
//     const uid = req.user.id;
//     const userId = parseInt(uid)
//     const deadline = new Date();
//     deadline.setMonth(deadline.getMonth() + 1)
//     const data = {
//         userId,
//         deadline,
//         ...req.body
//     }
//     try {
//         const result = await Checkout.create(data);
//         if(result){
//             if(req.user.userType === "USER"){
//                 await Users.update({
//                     userType:"CLIENT"
//                 },{
//                     where :{
//                         id:userId
//                     }
//                 })
//             }
//         }
//         res.status(201).send(result)
//     } catch (error) {
//         res.status(400).send(error)
//     }
// }

const getCheckout = async (req,res)=>{
    const uid = req.user.id;
    const userId = parseInt(uid)
    try {
        const result = await Vnpays.findAll({
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
        const result = await Vnpays.findAll()
        res.status(200).send(result)
    } catch (error) {
        res.status(400).send(error)
    }
}

const checkDeadline = async (req,res)=>{
    const userId = parseInt(req.user.id)
    if(req.user.userType === "USER"){
        res.status(200).send("tài khoản user")
    }else if(req.user.userType === "STAFF" || req.user.userType === "ADMIN"){
        res.status(200).send("tài khoản staff và admin không phải thực hiện checkout")
    }
    try {
        const listCheckout = await Vnpays.findAll({
            where :{
                userId:userId,
                status:true
            }
        })

        const listCheckoutBitcoin = await CheckoutBitcoins.findAll({
            where:{
                userId:userId
            }
        })

        if(listCheckout.length > 0 && listCheckoutBitcoin.length > 0){
            const checkout = listCheckout[listCheckout.length -1]
            const checkoutbitcoin = listCheckoutBitcoin[listCheckoutBitcoin.length -1]
            if(checkout.deadline > checkoutbitcoin.deadline){
                const today = new Date
                if(checkout.deadline < today){
                    await Users.update({
                        userType:"USER"
                    },{
                        where :{
                            id:userId
                        }
                    })
                    res.status(200).send(false)
                }else{
                    res.status(200).send(true)
                }
            }else{
                const today = new Date
                if(checkoutbitcoin.deadline < today){
                    await Users.update({
                        userType:"USER"
                    },{
                        where :{
                            id:userId
                        }
                    })
                    res.status(200).send(false)
                }else{
                    res.status(200).send(true)
                }
            }
        }
        if(listCheckout.length > 0){
            const checkout = listCheckout[listCheckout.length -1]
            const today = new Date
                if(checkout.deadline < today){
                    await Users.update({
                        userType:"USER"
                    },{
                        where :{
                            id:userId
                        }
                    })
                    res.status(200).send(false)
                }else{
                    res.status(200).send(true)
                }
        }
        if(listCheckoutBitcoin.length > 0){
            const checkoutbitcoin = listCheckoutBitcoin[listCheckoutBitcoin.length -1]
            const today = new Date
                if(checkoutbitcoin.deadline < today){
                    await Users.update({
                        userType:"USER"
                    },{
                        where :{
                            id:userId
                        }
                    })
                    res.status(200).send(false)
                }else{
                    res.status(200).send(true)
                }
        }

        


    } catch (error) {
        res.status(500).send(error)
    }
    
}
module.exports = {
    getCheckout,
    getAllCheckout,
    checkDeadline
}
