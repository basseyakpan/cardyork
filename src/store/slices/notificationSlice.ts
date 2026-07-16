import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

export interface NotificationModel {
  _id: string;
  title: string;
  message: string;
  isRead: boolean;
  type?: string;
  createdAt: string;
}

interface NotificationState {
  notifications: NotificationModel[];
  unreadCount: number;
  isLoading: boolean;
  error: string | null;
}

const initialState: NotificationState = {
  notifications: [],
  unreadCount: 0,
  isLoading: false,
  error: null,
};

const BASE_URL = 'https://cardyork-server.onrender.com/api';

const authHeaders = () => ({
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${localStorage.getItem('token')}`,
});

export const fetchNotifications = createAsyncThunk(
  'notification/fetchNotifications',
  async ({ userId, page = 0 }: { userId: string; page?: number }, { rejectWithValue }) => {
    try {
      // In case the ID has objectid wrapper from mongodb
      const cleanUserId = userId.replace(/ObjectId\(['"]?(.+?)['"]?\)/g, '$1');
      const response = await fetch(`${BASE_URL}/feedback/notification/${cleanUserId}?page=${page}`, {
        method: 'GET',
        headers: authHeaders(),
      });
      const data = await response.json();
      
      if (!response.ok) return rejectWithValue(data.message || 'Failed to fetch notifications');
      
      // Normalize - API may return array directly, or wrapped in data/notifications key
      const raw = data.data || data.notifications || data;
      const list = Array.isArray(raw) ? raw : [];
      return list as NotificationModel[];
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    markAsRead(state, action: PayloadAction<string>) {
      const notif = state.notifications.find(n => n._id === action.payload);
      if (notif && !notif.isRead) {
        notif.isRead = true;
        state.unreadCount = Math.max(0, state.unreadCount - 1);
      }
    },
    markAllAsRead(state) {
      state.notifications.forEach(n => { n.isRead = true; });
      state.unreadCount = 0;
    },
    clearError(state) {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotifications.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchNotifications.fulfilled, (state, action) => {
        state.isLoading = false;
        state.notifications = action.payload;
        state.unreadCount = action.payload.filter(n => !n.isRead).length;
      })
      .addCase(fetchNotifications.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  }
});

export const { markAsRead, markAllAsRead, clearError } = notificationSlice.actions;
export default notificationSlice.reducer;
