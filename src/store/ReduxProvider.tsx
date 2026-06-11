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

  useEffect(() => {
    if (isAuthenticated && user?.userid) {
      dispatch(fetchUserProfile(user.userid));
      dispatch(fetchAssets(user.userid));
      dispatch(fetchRates(user.userid));
      dispatch(fetchCryptoCoins());
    }
  }, [dispatch, user?.userid, isAuthenticated]);

  return <>{children}</>;
}

export default function ReduxProvider({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <GlobalDataLoader>{children}</GlobalDataLoader>
    </Provider>
  );
}
