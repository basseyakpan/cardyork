import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

interface Trade {
  _id: string;
  id?: string;
  cardName?: string;
  nairaValue?: number;
  amount?: number;
  assetName: string;
  assetImage: string[];
  rate: number;
  userAmount: number;
  actualAmount: number;
  cost: number;
  type:string;
  country:string;
  country_info?:{name:string}
  quantity: number;
  images: string[]; // User uploaded images
  status: string;
  createdAt: number; // Timestamp
  rateInfo: {
    _id: string;
    currency: string;
    rate: number;
    asset: string; // Asset ID
    // Add other rateInfo fields if needed
  };
  // Add other fields from API if needed
}

interface TradeState {
  trades: Trade[];
  currentTrade: Trade | null;
  isLoading: boolean;
  isSubmitting?: boolean;
  error: string | null;
}

const initialState: TradeState = {
  trades: [],
  currentTrade: null,
  isLoading: false,
  error: null,
};

// const BASE_URL = 'http://localhost:7000/api';
// const BASE_URL = 'https://legitcards.onrender.com/api';
const BASE_URL = 'https://cardyork-server.onrender.com/api';

interface StartTradePayload {
  id: string;
  data: {
    rateSpec: string;
    images: string[];
    userAmount: number;
    quantity: number;
    comments?: string; 
    cardType?: string;
  }[];
}

interface FetchTradesPayload {
  id: string;
  start?: number;
  sort?: "DESC" | "ASC";
  filter?: {
    status: string;
  };
}

export const startTrade = createAsyncThunk(
  'trades/start',
  async (payload: StartTradePayload, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BASE_URL}/trade/users/start`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(payload),
      });
      
      const data = await response.json();
      if (!response.ok) {
        return rejectWithValue(data.message || 'Failed to start trade');
      }
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchTrades = createAsyncThunk(
  'trades/fetchAll',
  async (payload: FetchTradesPayload, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BASE_URL}/trade/users/get`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      if (!response.ok) return rejectWithValue(data.message || 'Failed to fetch trades');
      
      // console.log(data);
      // API returns data in `data` field based on user request example
      return data.data || []; 
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const tradeSlice = createSlice({
  name: 'trades',
  initialState,
  reducers: {
    clearTradeError: (state) => {
      state.error = null;
      state.isLoading = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(startTrade.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(startTrade.fulfilled, (state) => {
        state.isLoading = false;
        // Handle successful trade start
      })
      .addCase(startTrade.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchTrades.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchTrades.fulfilled, (state, action) => {
        state.isLoading = false;
        
        // Check if we are appending (start > 0)
        // We can check the action.meta.arg to see if start was passed
        const { start } = action.meta.arg;
        
        if (start && start > 0) {
            state.trades = [...state.trades, ...action.payload];
        } else {
            state.trades = action.payload;
        }
      })
      .addCase(fetchTrades.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearTradeError } = tradeSlice.actions;

export const submitMockTrade = createAsyncThunk<any, any>('trades/mockStart', async (data) => data);

export default tradeSlice.reducer;
