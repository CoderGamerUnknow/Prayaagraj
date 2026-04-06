'use client';

import { useState, useEffect } from 'react';
import { auth, db } from '@/firebase';
import { signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';

export default function Navbar({ onNavigate }: { onNavigate: (page: string) => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        // Create user profile if it doesn't exist
        const userRef = doc(db, 'users', currentUser.uid);
        const userSnap = await getDoc(userRef);
        if (!userSnap.exists()) {
          try {
            await setDoc(userRef, {
              uid: currentUser.uid,
              email: currentUser.email,
              displayName: currentUser.displayName,
              photoURL: currentUser.photoURL,
              createdAt: new Date(),
              role: 'user'
            });
          } catch (error) {
            console.error("Error creating user profile", error);
          }
        }
      }
    });
    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error('Error signing in', error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Error signing out', error);
    }
  };

  const navLinks = [
    { name: 'Home', id: 'home' },
    { name: 'Menu', id: 'menu' },
    { name: 'About', id: 'about' },
    { name: 'Reviews', id: 'reviews' },
    { name: 'Contact', id: 'contact' },
  ];

  return (
    <nav id="nav">
      <div className="nav-brand" onClick={() => onNavigate('home')}>
        <div className="nav-ico">🍛</div>
        <div>
          <div className="nav-n">Cafe Potoba</div>
          <div className="nav-s">Maharashtrian · Ilupeju Lagos</div>
        </div>
      </div>
      <div className={`nav-links ${isOpen ? 'open' : ''}`} id="navLinks">
        {navLinks.map((link) => (
          <a
            key={link.id}
            href="#"
            onClick={(e) => {
              e.preventDefault();
              onNavigate(link.id);
              setIsOpen(false);
            }}
          >
            {link.name}
          </a>
        ))}
      </div>
      <button className="hbg" onClick={() => setIsOpen(!isOpen)} aria-label="Menu">
        <span></span>
        <span></span>
        <span></span>
      </button>
    </nav>
  );
}
