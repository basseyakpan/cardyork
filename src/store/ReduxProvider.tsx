'use client';
import { Provider } from 'react-redux';
import { store } from './store';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './hooks';
import { fetchAssets, fetchRates } from './slices/assetSlice';
import { fetchUserProfile } from './slices/authSlice';
import { fetchCryptoCoins } from './slices/cryptoSlice';

function GlobalDataLoader({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();
  const { user, isAuthenticated } = useAppSelector(s => s.auth);

  const userId = user?.userid || user?.id;

  useEffect(() => {
    if (isAuthenticated && userId) {
      dispatch(fetchUserProfile(userId));
      dispatch(fetchAssets(userId));
      dispatch(fetchRates(userId));
      dispatch(fetchCryptoCoins());
    }
  }, [dispatch, userId, isAuthenticated]);

  return <>{children}</>;
}

export default function ReduxProvider({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <GlobalDataLoader>{children}</GlobalDataLoader>
    </Provider>
  );
}
