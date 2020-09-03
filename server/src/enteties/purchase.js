const { Sequelize, DataTypes } = require('sequelize');

let purchase;

async function init(db) {
  purchase = db.define('purchase', {
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
}

function getPurchase() {
  if (!purchase) throw new Error("Purchase entity is not initialized");

  return purchase;
}

module.exports = {
  init,
  getPurchase,
};