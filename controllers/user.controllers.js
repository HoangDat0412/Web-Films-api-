const {Users} = require('../models');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const createUser = async (req,res)=>{
    const data = req.body;
    // tạo ra 1 chuỗi ngẫu nhiên 
    const salt = bcrypt.genSaltSync(10);
    // mã hóa mật khẩu với salt 
    const password = bcrypt.hashSync(data.passWord,salt)
    data.passWord = password;
    data.userType = "USER";
    try {
        const newUser = await Users.create(data)
        res.status(201).send(newUser)
    } catch (error) {
        res.status(505).send(error)
    }
}
const getUser = async (req,res)=>{
    try {
        const users = await Users.findAll();
        if (users) {
            res.status(200).send(users)
        } else {
            res.status(404).send("Not found")
        }
    } catch (error) {
        res.status(505).send(error)
    }

}
const login = async (req,res)=>{
   
    const {email,passWord} = req.body;
    try {
        const user = await Users.findOne({
            where:{
                email:email
            }
        })
        if (user) {
            const match = bcrypt.compareSync(passWord,user.passWord)
            if(match){
                const token = jwt.sign({id:user.id,userType:user.userType},"20112003",{expiresIn:60*1000})
                res.status(200).send({
                    message:"Login success",
                    token:token
                })
            }else{
                res.status(500).send({
                    message:"email or password not correct"
                })
            }
        } else {
            res.status(404).send(`Not found user have email ${email}`)
        }
    } catch (error) {
        res.status(505).send(error)
    }
}

const updateUser = async (req,res)=>{
    const id = req.params.id;
    const numberId = parseInt(id)
    const data = req.body
    try {
        await Users.update(data,{
            where :{
                id:numberId
            }
        })
        const result = await Users.findOne({
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
const deleteUser = async (req,res)=>{
    const id = req.params.id
    const ID = parseInt(id)
    try {
         await Users.destroy({
            where: {
              id:ID
            }
          });
          res.status(200).send("Delete successful !")
        
    } catch (error) {
        res.status(500).send(err)
    }
}

const getUserInformation = async (req,res)=>{
    const id = parseInt(req.user.id)
    try {
        let user = await Users.findOne({
            where:{
                id
            }
        })


        res.status(200).send(user)
    } catch (error) {
        res.status(500).send(error)
    }
}


const getUserFromId = async (req,res)=>{
    const id = parseInt(req.params.id)
    try {
        let user = await Users.findOne({
            where:{
                id
            }
        })
        res.status(200).send(user)
    } catch (error) {
        res.status(500).send(error)
    }
}

const setAvatar = async (req,res)=>{
    const file = req.file;
    console.log(file);
    const urlImage = `http://localhost:4000/${file.path}`
    const {user} = req;
    const userfound = await Users.findOne({
        where :{
            id:user.id
        }
    })
    userfound.avatar = urlImage
    userfound.save()
    res.send(userfound)
}

module.exports = {
    createUser,
    getUser,
    login,
    updateUser,
    deleteUser,
    getUserInformation,
    getUserFromId,
    setAvatar
}