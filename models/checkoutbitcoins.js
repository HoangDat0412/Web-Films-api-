'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CheckoutBitcoins extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  CheckoutBitcoins.init({
    userId: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: true, 
      },
    },
    walletaddress: {
      type:DataTypes.STRING,
      validate: {
        notEmpty: true, 
      },
    },
    bitcoinprice:{
      type:DataTypes.FLOAT,
      validate: {
        notEmpty: true, 
      },
    },
    deadline: {
      type: DataTypes.DATE,
    }
  }, {
    sequelize,
    modelName: 'CheckoutBitcoins',
  });
  return CheckoutBitcoins;
};