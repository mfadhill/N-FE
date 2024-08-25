import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getServicesAsync = createAsyncThunk<
    void,
    string,
    { rejectValue: string }>(
        "user/services", async (_, { rejectWithValue }) => {
            try {
                const { data } = await axios.get(`/https://take-home-test-api.nutech-integrasi.com/services`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                })
                console.log(data);

                return data;
            } catch (error) {
                return rejectWithValue("error")
            }
        }
    )