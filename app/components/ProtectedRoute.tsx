'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from '@supabase/auth-helpers-react';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const session = useSession();
  const [hasCheckedSession, setHasCheckedSession] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!session) {
        router.push('/Login');
      }
      setHasCheckedSession(true);
    }, 500);

    return () => clearTimeout(timer);
  }, [session, router]);

  if (!hasCheckedSession) {
    return <div className="p-10 text-center">Loading...</div>;
  }

  return <>{children}</>;
}
