import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import assetReducer from './slices/assetSlice';
import cryptoReducer from './slices/cryptoSlice';
import tradeReducer from './slices/tradeSlice';
import walletReducer from './slices/walletSlice';
import adsReducer from './slices/adsSlice';
import uiReducer from './slices/uiSlice';
import notificationReducer from './slices/notificationSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    assets: assetReducer,
    trades: tradeReducer,
    trade: tradeReducer,
    crypto: cryptoReducer,
    wallet: walletReducer,
    ads: adsReducer,
    ui: uiReducer,
    notification: notificationReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
