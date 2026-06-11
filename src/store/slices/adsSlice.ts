import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

export interface Ad {
  _id: string;
  title: string;
  image_url: string;
  adsRef: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  url?: string;
}

interface AdsState {
  ads: Ad[];
  isLoading: boolean;
  error: string | null;
  recordCount: number;
}

const initialState: AdsState = {
  ads: [],
  isLoading: false,
  error: null,
  recordCount: 0,
};

const BASE_URL = "https://cardyork-server.onrender.com/api";

export const fetchAds = createAsyncThunk(
  "ads/fetchAds",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BASE_URL}/ads?page=1`);
      const data = await response.json();
      if (!response.ok) return rejectWithValue(data.message || "Failed to fetch ads");
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const adsSlice = createSlice({
  name: "ads",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAds.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAds.fulfilled, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.ads = action.payload.ads;
        state.recordCount = action.payload.recordCount;
      })
      .addCase(fetchAds.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export default adsSlice.reducer;
