const { Sequelize } = require('sequelize');

const { user, pass, host, port, dbname } = require('./config').db;
const { getLogger } = require('./logger');

const { init: initUser } = require('./enteties/user');

let db;

async function init() {
  db = new Sequelize(`postgres://${user}:${pass}@${host}:${port}/${dbname}`, {
    logging: msg => getLogger().silly(msg),
    define: {
      freezeTableName: true,
    }
  });

  await initUser(db);
}

function getDb() {
  if (!db) {
    throw new Error("Db is not initialized");
  }
}

module.exports = {
  init,
  getDb,
};