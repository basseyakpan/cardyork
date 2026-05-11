import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface GiftCard {
  id: string;
  name: string;
  brand: string;
  icon: string;
  ratePerDollar: number;
  minAmount: number;
  maxAmount: number;
  category: 'retail' | 'gaming' | 'streaming' | 'finance';
  popular: boolean;
}

export interface Trade {
  id: string;
  cardName: string;
  cardBrand: string;
  amount: number;
  ratePerDollar: number;
  nairaValue: number;
  status: 'completed' | 'pending' | 'processing' | 'failed';
  createdAt: string;
  completedAt?: string;
}

interface TradeState {
  giftCards: GiftCard[];
  trades: Trade[];
  selectedCard: GiftCard | null;
  isSubmitting: boolean;
  error: string | null;
}

export const MOCK_GIFT_CARDS: GiftCard[] = [
  { id: 'gc_amazon', name: 'Amazon Gift Card', brand: 'Amazon', icon: '🛒', ratePerDollar: 1580, minAmount: 10, maxAmount: 2000, category: 'retail', popular: true },
  { id: 'gc_itunes', name: 'iTunes Gift Card', brand: 'Apple', icon: '🎵', ratePerDollar: 1620, minAmount: 10, maxAmount: 1000, category: 'streaming', popular: true },
  { id: 'gc_steam', name: 'Steam Gift Card', brand: 'Steam', icon: '🎮', ratePerDollar: 1540, minAmount: 5, maxAmount: 500, category: 'gaming', popular: true },
  { id: 'gc_google', name: 'Google Play Gift Card', brand: 'Google', icon: '▶️', ratePerDollar: 1560, minAmount: 10, maxAmount: 1000, category: 'streaming', popular: false },
  { id: 'gc_apple', name: 'Apple Gift Card', brand: 'Apple', icon: '🍎', ratePerDollar: 1610, minAmount: 10, maxAmount: 1000, category: 'retail', popular: true },
  { id: 'gc_ebay', name: 'eBay Gift Card', brand: 'eBay', icon: '🏷️', ratePerDollar: 1520, minAmount: 10, maxAmount: 500, category: 'retail', popular: false },
  { id: 'gc_sephora', name: 'Sephora Gift Card', brand: 'Sephora', icon: '💄', ratePerDollar: 1490, minAmount: 10, maxAmount: 500, category: 'retail', popular: false },
  { id: 'gc_nike', name: 'Nike Gift Card', brand: 'Nike', icon: '👟', ratePerDollar: 1510, minAmount: 10, maxAmount: 500, category: 'retail', popular: false },
  { id: 'gc_razer', name: 'Razer Gold Gift Card', brand: 'Razer', icon: '🟢', ratePerDollar: 1470, minAmount: 5, maxAmount: 200, category: 'gaming', popular: false },
  { id: 'gc_vanilla', name: 'Vanilla Gift Card', brand: 'Vanilla', icon: '💳', ratePerDollar: 1530, minAmount: 10, maxAmount: 500, category: 'finance', popular: false },
  { id: 'gc_nordstrom', name: 'Nordstrom Gift Card', brand: 'Nordstrom', icon: '🛍️', ratePerDollar: 1500, minAmount: 10, maxAmount: 500, category: 'retail', popular: false },
  { id: 'gc_amex', name: 'Amex Gift Card', brand: 'Amex', icon: '💰', ratePerDollar: 1550, minAmount: 25, maxAmount: 1000, category: 'finance', popular: false },
];

export const MOCK_TRADES: Trade[] = [
  { id: 'tr_001', cardName: 'Amazon Gift Card', cardBrand: 'Amazon', amount: 200, ratePerDollar: 1580, nairaValue: 316000, status: 'completed', createdAt: '2024-12-10T09:23:00Z', completedAt: '2024-12-10T09:27:45Z' },
  { id: 'tr_002', cardName: 'iTunes Gift Card', cardBrand: 'Apple', amount: 50, ratePerDollar: 1620, nairaValue: 81000, status: 'completed', createdAt: '2024-12-08T14:11:00Z', completedAt: '2024-12-08T14:15:12Z' },
  { id: 'tr_003', cardName: 'Steam Gift Card', cardBrand: 'Steam', amount: 100, ratePerDollar: 1540, nairaValue: 154000, status: 'pending', createdAt: '2024-12-12T07:55:00Z' },
  { id: 'tr_004', cardName: 'Apple Gift Card', cardBrand: 'Apple', amount: 150, ratePerDollar: 1610, nairaValue: 241500, status: 'completed', createdAt: '2024-12-05T16:40:00Z', completedAt: '2024-12-05T16:44:30Z' },
  { id: 'tr_005', cardName: 'Google Play Gift Card', cardBrand: 'Google', amount: 25, ratePerDollar: 1560, nairaValue: 39000, status: 'processing', createdAt: '2024-12-12T10:30:00Z' },
];

const initialState: TradeState = {
  giftCards: MOCK_GIFT_CARDS,
  trades: MOCK_TRADES,
  selectedCard: null,
  isSubmitting: false,
  error: null,
};

const tradeSlice = createSlice({
  name: 'trade',
  initialState,
  reducers: {
    selectCard(state, action: PayloadAction<GiftCard | null>) {
      state.selectedCard = action.payload;
    },
    submitTradeStart(state) {
      state.isSubmitting = true;
      state.error = null;
    },
    submitTradeSuccess(state, action: PayloadAction<Trade>) {
      state.isSubmitting = false;
      state.trades.unshift(action.payload);
    },
    submitTradeFail(state, action: PayloadAction<string>) {
      state.isSubmitting = false;
      state.error = action.payload;
    },
    clearTradeError(state) {
      state.error = null;
    },
  },
});

export const { selectCard, submitTradeStart, submitTradeSuccess, submitTradeFail, clearTradeError } = tradeSlice.actions;

export const submitMockTrade = (card: GiftCard, amount: number) => async (dispatch: any) => {
  dispatch(submitTradeStart());
  await new Promise(r => setTimeout(r, 1500));
  const newTrade: Trade = {
    id: `tr_${Date.now()}`,
    cardName: card.name,
    cardBrand: card.brand,
    amount,
    ratePerDollar: card.ratePerDollar,
    nairaValue: amount * card.ratePerDollar,
    status: 'pending',
    createdAt: new Date().toISOString(),
  };
  dispatch(submitTradeSuccess(newTrade));
  return { success: true, trade: newTrade };
};

export default tradeSlice.reducer;
