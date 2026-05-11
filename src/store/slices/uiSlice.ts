import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UIState {
  sidebarOpen: boolean;
  mobileMenuOpen: boolean;
  activeModal: string | null;
  toast: { message: string; type: 'success' | 'error' | 'info' } | null;
}

const initialState: UIState = {
  sidebarOpen: true,
  mobileMenuOpen: false,
  activeModal: null,
  toast: null,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleSidebar(state) { state.sidebarOpen = !state.sidebarOpen; },
    setSidebarOpen(state, action: PayloadAction<boolean>) { state.sidebarOpen = action.payload; },
    toggleMobileMenu(state) { state.mobileMenuOpen = !state.mobileMenuOpen; },
    setMobileMenuOpen(state, action: PayloadAction<boolean>) { state.mobileMenuOpen = action.payload; },
    openModal(state, action: PayloadAction<string>) { state.activeModal = action.payload; },
    closeModal(state) { state.activeModal = null; },
    showToast(state, action: PayloadAction<{ message: string; type: 'success' | 'error' | 'info' }>) {
      state.toast = action.payload;
    },
    clearToast(state) { state.toast = null; },
  },
});

export const { toggleSidebar, setSidebarOpen, toggleMobileMenu, setMobileMenuOpen, openModal, closeModal, showToast, clearToast } = uiSlice.actions;
export default uiSlice.reducer;
