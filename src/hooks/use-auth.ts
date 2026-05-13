'use client';
import { useAuthStore } from '@/lib/store/auth-store';

export function useAuth() {
  const store = useAuthStore();
  return {
    user: store.user,
    isAuthenticated: store.status === 'authenticated',
    isLoading: store.status === 'loading',
    login: store.login,
    logout: store.logout,
    handleCallback: store.handleCallback,
  };
}
