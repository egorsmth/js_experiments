const { Sequelize, DataTypes } = require('sequelize');
const {getUser} = require('./user');
const {getPurchase} = require('./purchase');

let product;

async function init(db) {
  product = db.define('product', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.REAL(7, 2),
      allowNull: false,
    },
  }, {
    indexes: [{
      unique: true,
      fields: ['name'],
    }]
  });

}

function getProduct() {
  if (!product) throw new Error("Product entity is not initialized");

  return product;
}

module.exports = {
  init,
  getProduct,
};