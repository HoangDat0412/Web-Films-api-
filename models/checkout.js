'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Checkout extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Users}) {
      // define association here
      // this.hasOne(Users,{
      //   foreignKey: {
      //     name: 'userId'
      //   }
      // })
    }
  }
  Checkout.init({
    userId: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: true, 
      },
    },
    moneyPay: {
      type:DataTypes.INTEGER,
      validate: {
        notEmpty: true, 
      },
    },
    accountNumber: {
      type:DataTypes.STRING,
      validate: {
        notEmpty: true, 
      },
    },
    bank: {
      type:DataTypes.STRING,
      validate: {
        notEmpty: true, 
      },
    },
    deadline: {
      type: DataTypes.DATE,
    },
  }, {
    sequelize,
    modelName: 'Checkout',
  });
  return Checkout;
};