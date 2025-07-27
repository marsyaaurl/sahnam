'use client';
import { useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';

export default function SignUpForm() {
  const searchParams = useSearchParams();
  const [userRole, setUserRole] = useState('');

  useEffect(() => {
    const role = searchParams.get('role');
    if (role) setUserRole(role);
  }, [searchParams]);

  const [full_name, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    setLoading(true);

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: 'http://localhost:3000/Login',
      }
    });

    if (error) {
      setMessage(error.message);
    } else {
      // Simpan ke localStorage supaya bisa diambil saat login
      if (typeof window !== 'undefined') {
        localStorage.setItem('pending_full_name', full_name);
        localStorage.setItem('pending_role', userRole);
      }
      setMessage("Signup successful! Please check your email to verify your account.");
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center py-44 gap-y-5">
      <h1 className="text-center font-bold text-2xl text-primary">Signup</h1>
      <form onSubmit={handleSubmit} className="flex flex-col items-center gap-y-3">
        <input
          type="text"
          name="full_name"
          value={full_name}
          onChange={(e) => setFullName( e.target.value )}
          placeholder="Your Full Name"
          className="border-2 border-primaryLight rounded-xl px-3 py-2 w-96 text-sm"
        />
        <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail( e.target.value )}
          placeholder="Your Email"
          className="border-2 border-primaryLight rounded-xl px-3 py-2 w-96 text-sm"
        />
        <input
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword( e.target.value )}
          placeholder="Your Password"
          className="border-2 border-primaryLight rounded-xl px-3 py-2 w-96 text-sm"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-primary w-96 text-center text-background font-semibold rounded-xl px-3 py-2 hover:bg-primaryLight hover:text-primary"
        >
          {loading ? 'Signing up...' : 'Signup'}
        </button>
        {message && <p className="text-sm text-center">{message}</p>}
      </form>
    </div>
  );
}
