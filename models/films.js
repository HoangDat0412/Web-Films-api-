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
    static associate(models) {
      // define association here
    }
  }
  Films.init({
    name: {
      type:DataTypes.STRING,
      allowNull:false
    },
    hot: {
      type:DataTypes.BOOLEAN,
    },
    des: {
      type:DataTypes.STRING,
      allowNull:false
    },
    yRelease: {
      type:DataTypes.STRING,
      allowNull:false
    },
    director: {
      type:DataTypes.STRING,
      allowNull:false
    },
    src: {
      type:DataTypes.STRING,
      allowNull:true
    },
    status: {
      type:DataTypes.BOOLEAN,
    },
    img: {
      type:DataTypes.STRING,
      allowNull:true
    },
    trailer: {
      type:DataTypes.STRING,
      allowNull:true
    }  
  }, {
    sequelize,
    modelName: 'Films',
  });
  return Films;
};