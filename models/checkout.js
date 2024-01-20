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
    static associate(models) {
      // define association here
    }
  }
  Checkout.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull:false
    },
    moneyPay: {
      type:DataTypes.INTEGER,
      allowNull:false
    },
    accountNumber: {
      type:DataTypes.STRING,
      allowNull:false
    },
    bank: {
      type:DataTypes.STRING,
      allowNull:false
    }
  }, {
    sequelize,
    modelName: 'Checkout',
  });
  return Checkout;
};