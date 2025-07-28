'use client';
import supabase from '@/lib/supabaseClient';
import { SessionContextProvider } from '@supabase/auth-helpers-react';

export default function SessionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionContextProvider supabaseClient={supabase}>
      {children}
    </SessionContextProvider>
  );
}