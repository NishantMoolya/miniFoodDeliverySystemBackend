const express = require('express');
const { calculateDistances, getCityMap } = require('../controllers/cityMapController');
const cityMapRouter = express.Router();

cityMapRouter.get('/', getCityMap);
cityMapRouter.post('/calculate', calculateDistances);

module.exports = cityMapRouter;