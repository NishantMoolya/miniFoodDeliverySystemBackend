const cron = require('node-cron');
const { loadData, saveData } = require('../db/methods/handleFile');

const ordersPath = "./db/data/orders.json";
const menuPath = "./db/data/menu.json";
const distancesPath = "./db/cache/distances.json";

// Function to update status
cron.schedule('*/10 * * * * *', () => { // Every 1 minutes
    console.log("checking orders");
    
    const orders = loadData(ordersPath);
    const menu = loadData(menuPath);
    const distances = loadData(distancesPath);

    orders.forEach((order) => {
        if (order.status === 'preparing') {

            const dishWithPrepareTime = order.items.map(item => {
                return menu.filter(dish => {
                    if (dish.id == item) {
                        return dish.prepare_time;
                    }
                });
            }).flat();

            const totalTime = dishWithPrepareTime.reduce((total, dish) => total + dish.prepare_time, 0)*60*1000;
            const isPrepared = order.placedAt + totalTime <= Date.now();
            console.log(totalTime,isPrepared);

            if (isPrepared) {
                order.status = 'ready';
                order.placedAt = Date.now();
                console.log(`Order ${order.id} is now ready and out for Delivery.`);
            }
        } else if (order.status === 'ready') {
            const isDelivered = order.placedAt + distances[order.location]*1000 <= Date.now();
            if (isDelivered) {
                order.status = 'delivered';
                order.placedAt = Date.now();
                console.log(`Order ${order.id} has been Delivered.`);
            }
        }
    });
    saveData(ordersPath,orders);
});

