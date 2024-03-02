'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Films extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Actor,Comments,FilmType}) {
      // define association here
      // this.hasMany(Comments);
      // this.hasMany(Actor);
      // this.hasMany(FilmType);
    }
  }
  Films.init({
    name: {
      type:DataTypes.STRING,
      validate: {
        notEmpty: true, 
      },
    },
    hot: {
      type:DataTypes.BOOLEAN,
    },
    des: {
      type:DataTypes.STRING,
      validate: {
        notEmpty: true, 
      },
    },
    yRelease: {
      type:DataTypes.STRING,
      validate: {
        notEmpty: true, 
      },
    },
    director: {
      type:DataTypes.STRING,
      validate: {
        notEmpty: true, 
      },
    },
    src: {
      type:DataTypes.STRING,
    },
    status: {
      type:DataTypes.BOOLEAN,
    },
    img: {
      type:DataTypes.STRING,
    },
    trailer: {
      type:DataTypes.STRING,
    },
    views: {
      type:DataTypes.INTEGER,
      defaultValue:0
    }  
  }, {
    sequelize,
    modelName: 'Films',
  });
  return Films;
};