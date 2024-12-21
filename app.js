const express = require('express');
const menuRouter = require('./routers/menuRouter');
const ordersRouter = require('./routers/ordersRouter');
const cityMapRouter = require('./routers/cityMapRouter');
const path = require('path');
require('./cronjobs/statusUpdater'); // Start the CRON job

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, 'static')));

const PORT = process.env.PORT || 8000;

app.use('/menu', menuRouter);
app.use('/orders', ordersRouter);
app.use('/map', cityMapRouter);

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
