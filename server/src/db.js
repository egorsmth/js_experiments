const { Sequelize } = require('sequelize');

const { user, pass, host, port, dbname } = require('./config').db;
const { getLogger } = require('./logger');

const { init: initUser, getUser } = require('./enteties/user');
const { init: initPurchase, getPurchase } = require('./enteties/purchase');
const { init: initProduct, getProduct } = require('./enteties/product');

let db;

async function init() {
  db = new Sequelize(`postgres://${user}:${pass}@${host}:${port}/${dbname}`, {
    logging: msg => getLogger().silly(msg),
    define: {
      freezeTableName: true,
    }
  });

  await initPurchase(db);
  await initProduct(db);
  await initUser(db);

  getUser().belongsToMany(getProduct(), { through: getPurchase() });
  getProduct().belongsToMany(getUser(), { through: getPurchase() });
  getPurchase().belongsTo(getProduct(), { foreignKey: 'productId' });
  getPurchase().belongsTo(getUser(), { foreignKey: 'userId' });

  await db.sync({
    alter: true,
  });
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