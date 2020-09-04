const { Sequelize } = require('sequelize');

const { getLogger } = require('../logger')
const { getUser } = require('../enteties/user');
const { getProduct } = require('../enteties/product');
const { getPurchase } = require('../enteties/purchase');

async function dashboard(req, res) {
    const users = await getUser().findAll({
        include: {
            model: getProduct(),
            right: true
        }
    });

    const products = await getPurchase().findAll({
        group: ["product.id"],
        attributes: [
            [Sequelize.fn('SUM', Sequelize.col('quantity')), 'q']
        ],
        include: {
            model: getProduct(),
        }
    })
    res.send({users, products});
}


async function users(req, res) {
    const users = await getUser().findAll();
    res.json(users)
}

async function products(req, res) {
    const getProducts = await getProduct().findAll();
    res.json(getProducts)
}

async function createPurchase(req, res) {
    await getPurchase().create({
        userId: req.body.userId,
        productId: req.body.productId,
        quantity: req.body.quantity,
    });

    return res.status(200).send();
}

module.exports = {
    dashboard,
    users,
    products,
    createPurchase,
}