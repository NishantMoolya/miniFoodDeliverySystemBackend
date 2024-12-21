const { loadData } = require("../db/methods/handleFile");

const menuPath = "./db/data/menu.json";

const getMenu = async (req, res) => {
        try {
            const menu = loadData(menuPath);
            if (menu.length === 0) {
                return res.status(200).json({ message:"no dishes found", data:null, error:null });
            }
            res.status(200).json({ data:menu });
        } catch (error) {
            // console.log(error); 
            res.status(500).json({ data:null,message: 'Error parsing menu data',error:"server error" });
        }
};

const getMenuById = async (req, res) => {
    try {
        const { id } = req.params;
        const menu = loadData(menuPath);
        
        if (menu.length === 0) {
            return res.status(200).json({ message:"no dishes found", data:null, error:null });
        }

        const dish = menu.filter(item => item.id == id);
        
        if (dish.length !== 0) {
            res.status(200).json({ data:dish });
        }else res.status(200).json({ message:"no dish found with given id", data:null, error:null });

    } catch (parseError) {
        res.status(500).json({ data:null,message: 'Error parsing menu data',error:"server error" });
    }
};

module.exports = { getMenu,getMenuById };