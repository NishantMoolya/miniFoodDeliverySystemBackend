const express = require('express');
const { getOrders, getOrderById, placeOrder } = require('../controllers/ordersController');
const ordersRouter = express.Router();

ordersRouter.get('/', getOrders);
ordersRouter.get('/:id', getOrderById);
ordersRouter.post('/', placeOrder);

module.exports = ordersRouter;