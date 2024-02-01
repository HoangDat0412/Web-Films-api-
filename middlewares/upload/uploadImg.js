const multer  = require('multer');
const { mkdirp } = require('mkdirp')
const uploadImg = (type) =>{
    const made = mkdirp.sync(`./public/img/user/${type}`)
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, `./public/img/user/${type}`)
        },
        filename: function (req, file, cb) {
            const uniqueSuffix = Date.now()
            cb(null,uniqueSuffix  + '-' + file.originalname)
        }
    })
    const upload = multer({ storage: storage,fileFilter : function (req,file,cb){
        const extensionImgList = [".jpg",".png"];
        const extension = file.originalname.slice(-4);
        const check = extensionImgList.includes(extension);
        if(check){
            cb(null,true)
        }else{
            cb(new Error("Đôi file không hợp lệ"))
        }
    } })

    return upload.single(type)
}

module.exports = {
    uploadImg
}