import express from "express";
import axios from "axios";
import cors from "cors";
import dotenv from "dotenv";
import NodeCache from "node-cache";

dotenv.config();
const app = express();
app.use(cors());
const PORT = 3001;
const myCache = new NodeCache({ stdTTL: 24 * 60 * 60, checkperiod: 120 });

app.get("/api/list-timezones", async (req, res) => {
    const cacheKey = "list-timezones";
    const cachedData = myCache.get(cacheKey);
    if (cachedData) {
        console.log("Serving list of timezones from cache.");
        return res.json(cachedData);
    }
    try {
        const response = await axios.get("http://api.timezonedb.com/v2.1/list-time-zone", {
            params: {
                key: process.env.TIMEZONEDB_API_KEY,
                format: "json"
            }
        });
        myCache.set(cacheKey, response.data)
        res.json(response.data);
    } catch (err) {
        console.log("Error when searching for timezone");
        res.status(500).json({ error: "Error when searching for timezone"});
        console.error(err.response?.data || err.message);  
        res.status(500).json({ error: "Error when searching for timezone" });
    }
})

app.get("/api/timezone", async (req, res) => {
    const { zone } = req.query;
    if (!zone) {
        return res.status(400).json({ error: "Missing 'zone' parameter (e.g., ?zone=America/Fortaleza)" });
    }

    const cacheKey = `timezone-${zone}`;
    const cached = myCache.get(cacheKey);
    if (cached) {
        console.log(`Serving timezone '${zone}' from cache.`);
        return res.json(cached);
    }
    try {
        const response = await axios.get("http://api.timezonedb.com/v2.1/get-time-zone", {
            params: {
                key: process.env.TIMEZONEDB_API_KEY,
                format: "json",
                by: "zone",
                zone: zone
            }
        });
        myCache.set(cacheKey, response.data);
        console.log(`Timezone '${zone}' stored in cache.`);
        res.json(response.data);
    } catch (err) {
        console.error("Error when searching for specific timezone:", err.response?.data || err.message);
        res.status(500).json({ error: "Error when searching for timezone"});
    }
})

app.listen(PORT, () => {
    console.log(`Server running in http://localhost:${PORT}`)
})