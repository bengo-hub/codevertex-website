'use client';
import { useEffect, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuthStore } from '@/lib/store/auth-store';
import { consumeState } from '@/lib/auth/pkce';

export default function AuthCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const handled = useRef(false);
  const handleCallback = useAuthStore((s) => s.handleCallback);

  useEffect(() => {
    if (handled.current) return;
    handled.current = true;

    const code = searchParams.get('code');
    const state = searchParams.get('state');
    const error = searchParams.get('error');

    if (error || !code) {
      router.replace('/');
      return;
    }

    // Validate CSRF state
    const storedState = consumeState();
    if (storedState && storedState !== state) {
      router.replace('/');
      return;
    }

    const callbackUrl = `${window.location.origin}/auth/callback`;
    handleCallback(code, callbackUrl).then(() => {
      const returnTo = sessionStorage.getItem('sso_return_to') || '/';
      sessionStorage.removeItem('sso_return_to');
      router.replace(returnTo);
    });
  }, [searchParams, router, handleCallback]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="h-8 w-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
        <p className="text-sm text-muted-foreground">Signing you in…</p>
      </div>
    </div>
  );
}
