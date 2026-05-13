// Next.js 16 / React 19.2 compatible ThemeToggle
// useTheme from next-themes + React 19 patterns
'use client';
import { useTheme } from 'next-themes';
import { Sun, Moon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface ThemeToggleProps {
  className?: string;
}

export function ThemeToggle({ className }: ThemeToggleProps) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch — only render after mount
  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return <div className="w-9 h-9 rounded-full bg-secondary border border-border" aria-hidden="true" />;
  }

  const isDark = resolvedTheme === 'dark';

  return (
    <button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className={cn(
        'w-9 h-9 rounded-full flex items-center justify-center transition-all',
        'bg-secondary hover:bg-secondary/80 text-secondary-foreground',
        'border border-border hover:border-primary/30',
        className
      )}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {isDark ? (
        <Sun className="h-4 w-4 text-amber-500" />
      ) : (
        <Moon className="h-4 w-4" />
      )}
    </button>
  );
}
