const { type } = require("os");
const {Films,Actor,FilmType, sequelize,Comments,FavouriteFilm,Rate} = require("../models")
const fs = require('fs');
const createFilm = async (req,res)=>{
    const data = req.body  
    try {
        const newFilm = await Films.create(data);
        res.status(201).send(newFilm)
    } catch (error) {
        res.status(500).send(error)
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
                views:films[index].views,
                yRelease:films[index].yRelease,
                country:films[index].country,
            })
            
        }
        res.status(200).send(result.reverse());

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
            views:film.views,
            country:film.country
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
                    result = await Films.findAll({
                        where:{
                            country:name
                        }
                    })
                    if(result){
                        res.status(200).send(result)
                    }else{
                        res.status(404).send("Not found")
                    }
                }
            }
        }
    } catch (error) {
        res.status(400).send(error)
    }
}
const uploadFilm = async (req,res)=>{
    console.log(req.files);
    const img = req.files['img'][0].path;
    const src = req.files['src'][0].path;
    const trailer = req.files['trailer'][0].path;
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
const searchFilmType = async (req,res)=>{
    let {name,pag} = req.body;
    
    try {
        const  result = await sequelize.query(`SELECT * FROM FilmTypes
        LEFT JOIN Films ON FilmTypes.filmId = Films.id 
        where FilmTypes.typeName LIKE '%${name}%'`)

        if(result[0].length >0){
            const length = result[0].length
            const numberpage = Math.ceil(length/24)
            
            if(pag){
                pag = parseInt(pag)
                console.log("haha");
                let startfilm = (pag-1)*24;
                if(startfilm > length || startfilm<0){
                    return res.status(404).send("Not found")
                }else{
                    const films = result[0].slice(startfilm,startfilm+24)
                    return res.status(200).send({
                        pages:numberpage,
                        films:films  
                    })
                }
            }

            res.status(200).send({
                pages:numberpage,
                films:result[0].slice(0,24)
                
            })
        }else{
            res.status(404).send("not found")
        }
        
    } catch (error) {
        res.status(500).send(error)
    }
}
const searchCountry = async (req,res)=>{
    let {country,pag}  = req.body;
    try {
        const result = await Films.findAll({
            where:{
                country:country
            }
        })
        if(result.length >0){
            const length = result.length
            const numberpage = Math.ceil(length/24)
            if(pag){
                pag = parseInt(pag)
                let startfilm = (pag-1)*24;
                if(startfilm > length || startfilm<0){
                    return res.status(404).send("Not found")
                }else{
                    const films = result.slice(startfilm,startfilm+24)
                    return res.status(200).send({
                        pages:numberpage,
                        films:films  
                    })
                }
            }

            res.status(200).send({
                pages:numberpage,
                films:result.slice(0,24)
                
            })
        }else{
            res.status(404).send("not found")
        }
    } catch (error) {
        console.log(error);
        res.status(500).send(error)
    }
}
const searchYear = async (req,res)=>{
    let {year,pag} = req.body;
    try {
        const result = await sequelize.query(`select * from Films where yRelease like '%${year}%'`)
        if(result[0].length >0){
            const length = result[0].length
            const numberpage = Math.ceil(length/24)
            
            if(pag){
                pag = parseInt(pag)
                console.log("haha");
                let startfilm = (pag-1)*24;
                if(startfilm > length || startfilm<0){
                    return res.status(404).send("Not found")
                }else{
                    const films = result[0].slice(startfilm,startfilm+24)
                    return res.status(200).send({
                        pages:numberpage,
                        films:films  
                    })
                }
            }

            res.status(200).send({
                pages:numberpage,
                films:result[0].slice(0,24)
            })
        }else{
            res.status(404).send("not found")
        }
    } catch (error) {
        res.status(500).send(error)
    }
}
const getidwithname = async (req,res)=>{
    const {name,director} = req.body
    try {
        const result = await Films.findOne({
            where :{
                name:name,
                director:director
            }
        })
        res.status(200).send(result)
    } catch (error) {
        res.status(500).send(error)
    }
}
const handleUpload = (type) =>{
    return async (req,res)=>{
        const file = req.file;
        let linkfile = file.path
        const id = parseInt(req.params.id)
        try {
            const result = await Films.findOne({
                where: {
                    id
                }
            })
            if(result[type]){
                fs.unlinkSync(result[type]);
             }
             result[type] = linkfile
            result.save()
            res.status(201).send(result)
        } catch (error) {
            res.status(400).send(error)
        }
    }
}
const mostView = async (req,res)=>{
    try {
        const result = await sequelize.query(`select * from Films order by views desc`)
        if(result){
            res.status(200).send(result[0].slice(0,10))
        }else{
            res.status(404).send("not found !")
        }
    } catch (error) {
        res.status(500).send(error)
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
    handleView,
    searchFilmType,
    getidwithname,
    handleUpload,
    searchCountry,
    mostView,
    searchYear
}