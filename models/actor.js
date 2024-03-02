'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Actor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Films}) {
      // define association here
    //  this.hasOne(Films,{
    //   foreignKey: {
    //     name: 'filmId'
    //   }
    // })
    }
  }
  Actor.init({
    filmId: {
      type:DataTypes.INTEGER,
      validate: {
        notEmpty: true, 
      },
    },
    actorName: {
      type:DataTypes.STRING,
      validate: {
        notEmpty: true, 
      },
    }
  }, {
    sequelize,
    modelName: 'Actor',
  });
  return Actor;
};