const { Sequelize, DataTypes } = require('sequelize');

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

  await user.sync({
    alter: true,
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