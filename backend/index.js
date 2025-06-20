import express from "express";
import axios from "axios";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(cors());
const PORT = 3002;

app.get("/api/timezones", async (req, res) => {
    try {
        const response = await axios.get("http://api.timezonedb.com/v2.1/list-time-zone", {
            params: {
                key: process.env.TIMEZONEDB_API_KEY,
                format: "json"
            }
        });
        res.json(response.data);
    } catch (err) {
        console.log("Error when searching for timezone");
        res.status(500).json({ error: "Error when searching for timezone"});
    }
    app.listen(PORT, () => {
        console.log(`Server running in http://localhost:${PORT}`)
    })
})