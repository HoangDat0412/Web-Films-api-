
const auAdmin = (arr) =>{
    return (req,res,next)=>{
        const {user} = req;
        if(arr.findIndex(ele=> ele === user.userType) > -1){
            next()
        }else{
            res.status(403).send("you do not have access !")
        }
    }
}

module.exports = {
    auAdmin
}