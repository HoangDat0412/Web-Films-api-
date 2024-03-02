const {Films,Actor,FilmType, sequelize,Comments,FavouriteFilm,Rate} = require("../models")
const fs = require('fs');
const createFilm = async (req,res)=>{
    const data = req.body  
    try {
        const newFilm = await Films.create(data);
        res.status(201).send(newFilm)
    } catch (error) {
        res.status(400).send(error)
    }
}
const deleteFilm = async (req,res)=>{
    const id = req.params.id;
    const ID = parseInt(id)
    try {
        const result = await Films.findOne({
            where: {
              id:ID
            }
          });
        if(result){
            await Comments.destroy({
                where: {
                  filmId: ID
                },
            });
            await FavouriteFilm.destroy({
                where: {
                  filmId: ID
                },
            });
            await Rate.destroy({
                where: {
                  filmId: ID
                },
            });
            await Actor.destroy({
                where: {
                  filmId: ID
                },
            });
            await FilmType.destroy({
                where: {
                  filmId: ID
                },
            });
            await Films.destroy({
                where: {
                  id: ID
                },
              });
             if(result.img){
                fs.unlinkSync(result.img);
             }
             if(result.src){
                fs.unlinkSync(result.src);
             }
             if(result.trailer){
                fs.unlinkSync(result.trailer);
             }
             res.status(200).send("Delete successful !")
        }else{
         
            res.status(404).send("Not found !")
        }
        
       
   } catch (error) {
       res.status(400).send(error)
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
        res.status(400).send(error)
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
            trailer:film.trailer,
            views:film.views
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
        res.status(404).send("Not found")
       }
    } catch (error) {
        res.status(400).send(error)
    }
}

const getFilmWatching = async (req,res)=>{
    const id = req.params.id;
    const numberId = parseInt(id)
    try {
        let film = await Films.findOne({
            where:{
                id:numberId
            }
        })
        if(film){
            res.status(200).send(film)
        }else{
            res.status(404).send("not found !")
        }
    } catch (error) {
        res.status(400).send(error)
    }
}

const getFilmAdmin = async (req,res)=>{
    try {
        const result = await Films.findAll();
        if(result){
            res.status(200).send(result);
        }else{
            res.status(404).send("Not found !");
        }
    } catch (error) {
        res.status(400).send(error);
    }
}

const searchFilm = async (req,res)=>{
    const {name} = req.body;
    try {
        let result = await sequelize.query(`SELECT * FROM Films WHERE name LIKE '%${name}%'`)
        if(result[0].length > 0){
            res.status(200).send(result[0])
        }else{

             result = await sequelize.query(`SELECT * FROM FilmTypes
            LEFT JOIN Films ON FilmTypes.filmId = Films.id 
            where FilmTypes.typeName LIKE '%${name}%'`)
            
            if(result[0].length >0){
                res.status(200).send(result[0])
            }else{
                result = await sequelize.query(`SELECT * FROM Actors
                LEFT JOIN Films ON Actors.filmId = Films.id 
                where Actors.actorName LIKE '%${name}%'`)
                if(result[0].length >0){
                    res.status(200).send(result[0])
                }else{
                    res.status(404).send("Not found")
                }
            }
        }
    } catch (error) {
        res.status(400).send(error)
    }
}

const uploadFilm = async (req,res)=>{
    const img = req.files?.img[0].path;
    const trailer = req.files?.trailer[0].path;
    const src = req.files?.src[0].path;

    const id = parseInt(req.params.id)
    try {
        const result = await Films.findOne({
            where: {
                id
            }
        })
        if(result.img){
            fs.unlinkSync(result.img);
         }
         if(result.src){
            fs.unlinkSync(result.src);
         }
         if(result.trailer){
            fs.unlinkSync(result.trailer);
         }
        result.src = src;
        result.img = img;
        result.trailer = trailer;
        result.save()
        res.status(201).send(result)
    } catch (error) {
        res.status(400).send(error)
    }
}

const handleView = async (req,res)=>{
    const id = parseInt(req.params.id)

    try {
        const film = await Films.findOne({
            where :{
                id
            }
        })

        film.views +=1;
        film.save()
        res.status(200).send("success")
    } catch (error) {
        res.status(500).send(error)
    }
}

const setListFilmToDb = async (req,res)=>{
    const listFilm = [
        {
            "name": "Nhiệm Vụ: Bất Khả Thi 7 – Nghiệp Báo",
            "hot": true,
            "des": "Christopher McQuarrie",
            "yRelease": "2023",
            "director": "Christopher McQuarrie",
            "src": "public\\film\\1707137265389-giadinhlaso1.mp4",
            "status": true,
            "img": "public/film/1707137265374-nv.jpg",
            "trailer": "public\\film\\1707137265609-giadinhlaso1.mp4",
        },
        {
            "name": "Blue Beetle",
            "hot": true,
            "des": "K.C. Hodenfield",
            "yRelease": "2023",
            "director": "K.C. Hodenfield",
            "src": "public\\film\\1707137555090-giadinhlaso1.mp4",
            "status": true,
            "img": "public/film/1707137555083-nhanduyen.jpg",
            "trailer": "public\\film\\1707137555350-giadinhlaso1.mp4",
        },
        {
            "name": "Transformers 7: Quái Thú Trỗi Dậy ",
            "hot": false,
            "des": "Steven Caple Jr.",
            "yRelease": "2023",
            "director": "Steven Caple Jr.",
            "src": "public\\film\\1707137653112-giadinhlaso1.mp4",
            "status": true,
            "img": "public/film/1707137653112-transformers.jpg",
            "trailer": "public\\film\\1707137653332-giadinhlaso1.mp4",
        },
        {
            "name": "Biệt Đội Đánh Thuê 4",
            "hot": true,
            "des": "Brian Smrz",
            "yRelease": "2023",
            "director": "Brian Smrz",
            "src": "public\\film\\1707137811332-giadinhlaso1.mp4",
            "status": true,
            "img": "public/film/1707137811332-bietdoilinhdanhthue4.jpg",
            "trailer": "public\\film\\1707137811558-giadinhlaso1.mp4",
        },
        {
            "name": "Vệ Binh Dải Ngân Hà 3",
            "hot": true,
            "des": "James Gunn",
            "yRelease": "2023",
            "director": "James Gunn",
            "src": "public\\film\\1707138009214-giadinhlaso1.mp4",
            "status": true,
            "img": "public/film/1707138009214-vebinh3.jpg",
            "trailer": "public\\film\\1707138009429-giadinhlaso1.mp4",
        },
        {
            "name": "Yêu Lại Vợ Ngầu",
            "hot": true,
            "des": "Nam Dae-joong",
            "yRelease": "2023",
            "director": "Nam Dae-joong",
            "src": "public\\film\\1707138018093-giadinhlaso1.mp4",
            "status": true,
            "img": "public/film/1707138018093-yeulaivongau.jpg",
            "trailer": "public\\film\\1707138018327-giadinhlaso1.mp4",
        }
    ]

    try {
        for (let index = 0; index < listFilm.length; index++) {
            let result = await Films.create(listFilm[index]);    
        }

    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    createFilm,
    deleteFilm,
    updateFilm,
    getFilmAdmin,
    getFilmUser,
    getDetailFilm,
    searchFilm,
    uploadFilm,
    getFilmWatching,
    setListFilmToDb,
    handleView
}