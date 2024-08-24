import { createAsyncThunk } from "@reduxjs/toolkit";
import { API, setAuthToken } from "../../lib/api";

export interface Ilogin {
    email: string;
    password: string;
}

export const loginAsync = createAsyncThunk<
    string,
    Ilogin,
    { rejectValue: string }
>("auth/login", async (props, { rejectWithValue }) => {
    try {
        console.log("props", props);
        const { data } = await API.post("/login", props);

        console.log("data", data.token);
        const token = data.token;
        localStorage.setItem("token", token);

        return token;
    } catch (error) {
        return rejectWithValue("error");
    }
});

export const checkAuth = createAsyncThunk<IUser, void, { rejectValue: string }>("auth/profile", async (_, { rejectWithValue }) => {
    try {
        const { data } = await API.get("/auth/check", {
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