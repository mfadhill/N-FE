import { createAsyncThunk } from "@reduxjs/toolkit";
import { API } from "../../lib/api/";
import { IAuthor } from "../../types/app";
import axios from "axios";

export const getBannerAsync = createAsyncThunk<
    IAuthor,
    string,
    { rejectValue: string }>(
        "user/banner", async (userId: string, { rejectWithValue }) => {
            try {
                const { data } = await axios.get(`/https://take-home-test-api.nutech-integrasi.com/banner`, {
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