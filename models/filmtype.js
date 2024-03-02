'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class FilmType extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Films}) {
      // define association here
      // this.hasOne(Films,{
      //   foreignKey: {
      //     name: 'filmId'
      //   }
      // })

    }
  }
  FilmType.init({
    filmId: {
      type:DataTypes.INTEGER,
      validate: {
        notEmpty: true, 
      },
    },
    typeName: {
      type:DataTypes.STRING,
      validate: {
        notEmpty: true,
      },
    },
  }, {
    sequelize,
    modelName: 'FilmType',
  });
  return FilmType;
};