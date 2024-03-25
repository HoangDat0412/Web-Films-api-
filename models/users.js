"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Comments,Checkout,FavouriteFilm,Rate}) {
      // this.hasMany(Comments);
      // this.hasMany(Checkout)
      // this.hasMany(FavouriteFilm)
      // this.hasMany(Rate)
      // define association here
    }
  }
  Users.init(
    {
      userName: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: true, 
        },
      },
      email: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: true, 
          isEmail: true,
        },
      },
      passWord: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: true, 
          min: 8,
          max: 20,
        },
      },
      userType: {
        type: DataTypes.STRING,
        defaultValue: "USER",
        validate: {
          notEmpty: true, 
          isIn: [["USER", "CLIENT", "STAFF", "ADMIN"]],
        }  
      },
      avatar: {
        type: DataTypes.STRING,
        defaultValue:
          "/usr/src/app/public/img/user/avatar/defaultavatar.jpg",
      },
    },
    {
      sequelize,
      modelName: "Users",
    }
  );
  return Users;
};
