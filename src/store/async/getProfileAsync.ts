import { createAsyncThunk } from "@reduxjs/toolkit";
import { API } from "../../lib/api/";
import { IAuthor } from "../../types/app";
import axios from "axios";

export const getProfileAsync = createAsyncThunk<
    IAuthor,
    string,
    { rejectValue: string }>(
        "profile/getProfile", async (_, { rejectWithValue }) => {
            try {
                const { data } = await axios.get(`/https://take-home-test-api.nutech-integrasi.com/profile`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                })
                return data;
            } catch (error) {
                return rejectWithValue("error")
            }
        }
    )