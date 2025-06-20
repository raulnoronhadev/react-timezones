import axios from "axios";

const api = axios.create({
    baseURL: "http://api.timezonedb.com/v2.1",
})

export default api; 