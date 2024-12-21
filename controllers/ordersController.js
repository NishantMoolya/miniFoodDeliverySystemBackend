const { loadData, saveData } = require("../db/methods/handleFile");

const ordersPath = "./db/data/orders.json";

const getOrders = async (req, res) => {
        try {
            const orders = loadData(ordersPath);
            if (orders.length === 0) {
                return res.status(200).json({ message:"no orders found", data:null, error:null });
            }
            res.status(200).json({ data:orders });
        } catch (error) {
            console.log(error);
            res.status(500).json({ data:null,message: 'Error parsing orders data',error:"server error" });
        }
};

const placeOrder = async (req, res) => {
    try {
        const { name,items,location } = req.body;

        const orders = loadData(ordersPath);

        const userOrder = { id:orders.length+1,name,items,location,placedAt:Date.now(),status:"preparing" };
        orders.push(userOrder);

        saveData(ordersPath,orders);

        res.status(200).json({ data:userOrder,message:"order placed successfully" });
    } catch (error) {
        // console.log(error);
        res.status(500).json({ data:null,message: 'Error in placing order',error:"server error" });
    }
};

const getOrderById = async (req, res) => {
    try {
        const { id } = req.params;

        const orders = loadData(ordersPath);
        if (orders.length === 0) {
            return res.status(200).json({ message:"no orders found", data:null, error:null });
        }

        const order = orders.filter(item => item.id == id);
        if (order.length !== 0) {
            res.status(200).json({ data:order });
        }else res.status(200).json({ message:"no order found with given id", data:null, error:null });

    } catch (error) {
        // console.log(error);
        res.status(500).json({ data:null,message: 'Error in placing order',error:"server error" });
    }
};

module.exports = { getOrders,placeOrder,getOrderById };