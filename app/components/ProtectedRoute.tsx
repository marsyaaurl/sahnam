'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession, useSessionContext } from '@supabase/auth-helpers-react';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const session = useSession();
  const { isLoading } = useSessionContext();

  useEffect(() => {
    if (!isLoading && !session) {
      router.push('/Login');
    }
  }, [session, isLoading]);

  if (isLoading || !session) {
    return <div className="p-10 text-center">Loading...</div>;
  }

  return <>{children}</>;
}
