const express = require('express');
const { getMenu, getMenuById } = require('../controllers/menuController');
const menuRouter = express.Router();

menuRouter.get('/', getMenu);
menuRouter.get('/:id', getMenuById);

module.exports = menuRouter;