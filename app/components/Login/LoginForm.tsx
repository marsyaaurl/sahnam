'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import Link from 'next/link';

export default function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [fullNameFromLocal, setFullNameFromLocal] = useState<string | null>(null);
    const [role, setRole] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        if(typeof window !== 'undefined') {
            const name = localStorage.getItem('pending_full_name');
            if (name) setFullNameFromLocal(name);

            const userRole = localStorage.getItem('pending_role');
            if (userRole) setRole(userRole);
        }
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage('');
        setLoading(true);

        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (error) {
                setMessage(error.message);
                setLoading(false);
                return;
            }

            if (data.user) {
                const user = data.user;

                // Cek apakah user sudah ada di tabel users
                const { data: profileData, error: selectError } = await supabase
                    .from('users')
                    .select('*')
                    .eq('user_id', user.id)
                    .single();

                if (selectError && selectError.code !== 'PGRST116') {
                    // PGRST116 = no rows returned, yang artinya user belum ada
                    console.error("Select profile error:", selectError.message);
                    setMessage("Error checking user profile");
                    setLoading(false);
                    return;
                }

                // Jika user belum ada di tabel users, buat profile baru
                if (!profileData) {
                    const { error: insertError } = await supabase.from('users').insert([
                        {
                            user_id: user.id,
                            full_name: fullNameFromLocal || "New User",
                            email: user.email,
                            role: role || "user",
                        }
                    ]);

                    if (insertError) {
                        console.error("Insert profile error:", insertError.message);
                        setMessage("Error creating user profile");
                        setLoading(false);
                        return;
                    }
                }

                if (typeof window !== 'undefined') {
                    localStorage.removeItem('pending_full_name');
                    localStorage.removeItem('pending_role');
                }

                router.push('/Dashboard');
            }
        } catch (err) {
            console.error('Login error:', err);
            setMessage('An unexpected error occurred');
        }

        setLoading(false);
    };

    return (
        <div className="flex flex-col items-center justify-center py-44 gap-y-5">
            <h1 className="text-center font-bold text-2xl text-primary">Login</h1>
            <form onSubmit={handleSubmit} className="flex flex-col items-center gap-y-3">
                <input
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your Email"
                    className="border-2 border-primaryLight rounded-xl px-3 py-2 w-96 text-sm"
                    required
                />
                <input
                    type="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Your Password"
                    className="border-2 border-primaryLight rounded-xl px-3 py-2 w-96 text-sm"
                    required
                />
                <button
                    type="submit"
                    disabled={loading}
                    className="bg-primary w-96 text-center text-background font-semibold rounded-xl px-3 py-2 hover:bg-primaryLight hover:text-primary"
                >
                    {loading ? 'Logging in...' : 'Login'}
                </button>
                {message && <p className="text-sm text-center text-red-500">{message}</p>}
            </form>
            <p>Already have an account? <Link href="/Login" className='font-semibold text-primary'>Login</Link></p>
        </div>
    );
}