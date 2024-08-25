import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface Service {
    service_code: string;
    service_name: string;
    service_icon: string;
    service_tariff: number;
}

interface ServicesState {
    services: Service[];
    selectedService: Service | null;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: ServicesState = {
    services: [],
    selectedService: null,
    status: "idle",
    error: null,
};

export const getServices = createAsyncThunk<
    Service[],
    void,
    { rejectValue: string }
>("services/getServicesAsync", async (_, { rejectWithValue }) => {
    try {
        const { data } = await axios.get("https://take-home-test-api.nutech-integrasi.com/services", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        });
        return data.data;
    } catch (error) {
        return rejectWithValue("Failed to fetch services");
    }
});

const servicesSlice = createSlice({
    name: "services",
    initialState,
    reducers: {
        setSelectedService(state, action) {
            state.selectedService = action.payload; // Reducer untuk mengatur layanan yang dipilih
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getServices.pending, (state) => {
                state.status = "loading";
            })
            .addCase(getServices.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.services = action.payload;
            })
            .addCase(getServices.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload as string;
            });
    }
});

export const { setSelectedService } = servicesSlice.actions;

export default servicesSlice.reducer;
