'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class FavouriteFilm extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Users,Films}) {
      // this.hasOne(Users,{
      //   foreignKey: {
      //     name: 'userId'
      //   }
      // })
      // this.hasOne(Films,{
      //   foreignKey: {
      //     name: 'filmId'
      //   }
      // })
    }
  }
  FavouriteFilm.init({
    userId: {
      type:DataTypes.INTEGER,
      validate: {
        notEmpty: true, 
      },
    },
    filmId: {
      type:DataTypes.INTEGER,
      validate: {
        notEmpty: true, 
      },
    }
  }, {
    sequelize,
    modelName: 'FavouriteFilm',
  });
  return FavouriteFilm;
};