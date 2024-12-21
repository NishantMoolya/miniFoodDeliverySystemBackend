const fs = require('fs');
// Load data from JSON file
const loadData = (fileName) => {
    try {
        const data = fs.readFileSync(fileName);
        return JSON.parse(data);
    } catch (err) {
        console.log(err);
        return [];
    }
};

// Save data to JSON file
const saveData = (fileName, data) => {
    try {
        fs.writeFileSync(fileName, JSON.stringify(data, null, 2));
    } catch (err) {
        console.log("cannot save", err);
    }
};

module.exports = { loadData, saveData };