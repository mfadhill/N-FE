import axios from "axios";

export const API = axios.create({
    baseURL: "https://take-home-test-api.nutech-integrasi.com",
});

export const setAuthToken = (token?: string) => {
    if (token) {
        API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
        delete API.defaults.headers.common["Authorization"];
    }
};
