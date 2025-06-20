import React, { useEffect, useState } from "react";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import api from '../services/api.js';

export default function ComboBox() {
    const [timezoneList, setTimezoneList] = useState([]);

    useEffect(() => {
        const fetchTimezoneList = async () => {
            try {
                const response = await api.get("/list-timezones");
                const zones = response.data.zones.map(zone => zone.zoneName);
                setTimezoneList(zones);
            } catch (err) {
                console.error("Error detected:", err);
            }
        }
        fetchTimezoneList();
    }, []);

    return (
        <Autocomplete
            disablePortal
            options={timezoneList}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="Select timezone" />}
        />
    );
}
