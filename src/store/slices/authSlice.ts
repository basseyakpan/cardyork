import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface User {
  id: string;
  email: string;
  fullName: string;
  phone: string;
  avatar?: string;
  accountTier: 'Standard' | 'Vanguard' | 'Elite';
  balance: number;
  totalTrades: number;
  joinDate: string;
  bankName?: string;
  accountNumber?: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

// Mock users for demo
export const MOCK_USERS: User[] = [
  {
    id: 'usr_001',
    email: 'demo@cardyork.com',
    fullName: 'Alex Thompson',
    phone: '+234 802 684 6656',
    accountTier: 'Vanguard',
    balance: 12450000,
    totalTrades: 247,
    joinDate: '2023-01-15',
    bankName: 'GTBank',
    accountNumber: '0123456789',
  },
  {
    id: 'usr_002',
    email: 'jane@example.com',
    fullName: 'Jane Okonkwo',
    phone: '+234 812 345 6789',
    accountTier: 'Elite',
    balance: 8750000,
    totalTrades: 89,
    joinDate: '2023-06-20',
    bankName: 'First Bank',
    accountNumber: '9876543210',
  },
];

const MOCK_CREDENTIALS = [
  { email: 'demo@cardyork.com', password: 'Demo1234!' },
  { email: 'jane@example.com', password: 'Jane1234!' },
];

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart(state) {
      state.isLoading = true;
      state.error = null;
    },
    loginSuccess(state, action: PayloadAction<User>) {
      state.isLoading = false;
      state.user = action.payload;
      state.isAuthenticated = true;
      state.error = null;
    },
    loginFailure(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },
    logout(state) {
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
    },
    registerStart(state) {
      state.isLoading = true;
      state.error = null;
    },
    registerSuccess(state, action: PayloadAction<User>) {
      state.isLoading = false;
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    registerFailure(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },
    clearError(state) {
      state.error = null;
    },
  },
});

export const {
  loginStart, loginSuccess, loginFailure,
  logout, registerStart, registerSuccess, registerFailure, clearError,
} = authSlice.actions;

// Thunk: mock login
export const mockLogin = (email: string, password: string) => async (dispatch: any) => {
  dispatch(loginStart());
  await new Promise(r => setTimeout(r, 1200)); // simulate network
  const cred = MOCK_CREDENTIALS.find(c => c.email === email && c.password === password);
  if (cred) {
    const user = MOCK_USERS.find(u => u.email === email)!;
    dispatch(loginSuccess(user));
    return { success: true };
  } else {
    dispatch(loginFailure('Invalid email or password. Try demo@cardyork.com / Demo1234!'));
    return { success: false };
  }
};

// Thunk: mock register
export const mockRegister = (data: { fullName: string; email: string; phone: string; password: string }) => async (dispatch: any) => {
  dispatch(registerStart());
  await new Promise(r => setTimeout(r, 1400));
  const emailExists = MOCK_USERS.some(u => u.email === data.email);
  if (emailExists) {
    dispatch(registerFailure('An account with this email already exists.'));
    return { success: false };
  }
  const newUser: User = {
    id: `usr_${Date.now()}`,
    email: data.email,
    fullName: data.fullName,
    phone: data.phone,
    accountTier: 'Standard',
    balance: 0,
    totalTrades: 0,
    joinDate: new Date().toISOString().split('T')[0],
  };
  dispatch(registerSuccess(newUser));
  return { success: true };
};

export default authSlice.reducer;
