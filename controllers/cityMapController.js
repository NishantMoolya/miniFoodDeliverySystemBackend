const { saveData, loadData } = require("../db/methods/handleFile");
const { dijkstra } = require("../helpers/cityMapHelper");
const path = require('path');

const cityMapPath = "./db/data/cityMap.json";
const distancesPath = "./db/cache/distances.json";

const calculateDistances = async (req, res) => {
    try {
        const { sourceNode } = req.body;

        if (!sourceNode) {
            return res.status(400).json({ data: null, message: "no source node was provided", error: "no source node" });
        }

        const cityGraph = loadData(cityMapPath);
        const shortestDistances = dijkstra(cityGraph, sourceNode);

        saveData(distancesPath, shortestDistances);
        res.status(200).json({ data: shortestDistances, message: `Shortest distances from ${sourceNode}` });
    } catch (error) {
        // console.log(error); 
        res.status(500).json({ data: null, message: 'Error in calculating', error: "server error" });
    }
};

const getCityMap = async (req, res) => {
    try {
        // Set headers
        res.set({
            'Content-Type': 'text/html', // Set content type to HTML
            'Cache-Control': 'no-store', // Prevent caching
            'X-Content-Type-Options': 'nosniff', // Security header
            'X-Frame-Options': 'DENY', // Prevent clickjacking
        });
        const cityMap = path.join(__dirname, '../static/cityMap.html');
        res.status(200).sendFile(cityMap);
    } catch (error) {
        console.log(error);
        res.status(500).json({ data: null, message: 'Error', error: "server error" });
    }
};

module.exports = { calculateDistances, getCityMap };