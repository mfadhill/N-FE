import { createAsyncThunk } from "@reduxjs/toolkit";
import { API, setAuthToken } from "../../lib/api";
import axios from "axios";
import { IUser } from "../../types/app";

export interface Ilogin {
    email: string;
    password: string;
}

export const loginAsync = createAsyncThunk<
    string,
    Ilogin,
    { rejectValue: string }
>("/login", async (props, { rejectWithValue }) => {
    try {
        console.log("props", props);
        const response = await axios.post("https://take-home-test-api.nutech-integrasi.com/login", props);

        console.log("response data", response.data);

        const token = response.data.data.token;
        localStorage.setItem("token", token);

        return token;
    } catch (error) {
        console.error("Login error:", error);
        return rejectWithValue("Login failed");
    }
});

export const checkAuth = createAsyncThunk<IUser, void, { rejectValue: string }>("/profile", async (_, { rejectWithValue }) => {
    try {
        const { data } = await API.get("/profile", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })
        return data
    } catch (error) {
        return rejectWithValue("error");
    }
})

export const logoutAsync = createAsyncThunk<
    void,
    void,
    { rejectValue: string }
>(
    "auth/logout",
    async (_, { rejectWithValue }) => {
        try {
            localStorage.removeItem("token");
            setAuthToken('')
            return;
        } catch (error) {

            return rejectWithValue("error");
        }
    }
);