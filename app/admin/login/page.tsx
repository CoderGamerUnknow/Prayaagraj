'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '@/firebase';

export default function AdminLogin() {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        router.push('/admin/dashboard');
      }
    });
    return () => unsubscribe();
  }, [router]);

  const handleLogin = async () => {
    setLoading(true);
    setError('');
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      router.push('/admin/dashboard');
    } catch (err: any) {
      console.error(err);
      setError('Failed to log in. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-orange-50/30">
      <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full">
        <h1 className="text-2xl font-serif font-bold text-gray-900 mb-6 text-center">Admin Portal</h1>
        <p className="text-gray-600 mb-8 text-center">Please sign in with your authorized Google account to access the dashboard.</p>
        
        {error && <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-lg text-sm">{error}</div>}
        
        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full py-3 px-4 bg-orange-600 hover:bg-orange-700 text-white rounded-full font-medium transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {loading ? 'Signing in...' : 'Sign in with Google'}
        </button>
      </div>
    </div>
  );
}
