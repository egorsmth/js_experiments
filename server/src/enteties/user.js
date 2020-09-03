const { Sequelize, DataTypes } = require('sequelize');
const { getProduct } = require('./product')
const { getPurchase } = require('./purchase')

let user;

async function init(db) {
  user = db.define('user', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    pass: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    indexes: [{
      unique: true,
      fields: ['name'],
    }]
  });
}

function getUser() {
  if (!user) throw new Error("User entity is not initialized");

  return user;
}

module.exports = {
  init,
  getUser,
};