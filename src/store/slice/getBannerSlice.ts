import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface Banner {
    banner_name: string;
    banner_image: string;
    description: string;
}

interface BannerState {
    banners: Banner[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: BannerState = {
    banners: [],
    status: "idle",
    error: null
};

export const getBanner = createAsyncThunk<
    Banner[],
    void,
    { rejectValue: string }
>("banners/getBannerAsync", async (_, { rejectWithValue }) => {
    try {
        const { data } = await axios.get("https://take-home-test-api.nutech-integrasi.com/banner", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }

        });
        console.log(data.data);
        return data.data;
    } catch (error) {
        return rejectWithValue("Failed to fetch banners");
    }
});

const bannerSlice = createSlice({
    name: "banners",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getBanner.pending, (state) => {
                state.status = "loading";
            })
            .addCase(getBanner.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.banners = action.payload;
            })
            .addCase(getBanner.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload as string;
            });
    }
});

export default bannerSlice.reducer;
