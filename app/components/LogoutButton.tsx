'use client';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      alert('Gagal logout: ' + error.message);
    } else {
      router.push('/Login');
    }
  };

  return (
    <div className='mt-8 w-full'>
        <button onClick={handleLogout} className="bg-primary rounded-lg font-semibold w-full py-2 text-white hover:bg-primaryLight hover:text-primary">
            Logout
        </button>
    </div>
  );
}
