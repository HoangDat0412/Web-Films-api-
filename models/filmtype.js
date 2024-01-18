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
    static associate(models) {
      // define association here
    }
  }
  FilmType.init({
    filmId: {
      type:DataTypes.INTEGER,
      allowNull:false
    },
    typeName: {
      type:DataTypes.STRING,
      allowNull:false
    },
  }, {
    sequelize,
    modelName: 'FilmType',
  });
  return FilmType;
};