'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { db, handleFirestoreError, OperationType } from '@/firebase';
import { collection, onSnapshot } from 'firebase/firestore';

type GalleryImage = {
  id: string;
  src: string;
  title: string;
  tags: string[];
};

export default function Gallery() {
  const [keyword, setKeyword] = useState('');
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [allImages, setAllImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'gallery'), (snapshot) => {
      const fetchedImages = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as GalleryImage));
      setAllImages(fetchedImages);
      setImages(fetchedImages.slice(0, 5));
      setLoading(false);
    }, (err) => {
      handleFirestoreError(err, OperationType.GET, 'gallery');
      setError('Failed to load images.');
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    if (!keyword.trim()) {
      setImages(allImages.slice(0, 5));
      return;
    }

    const term = keyword.toLowerCase().trim();
    let results = allImages.filter(img => 
      img.title.toLowerCase().includes(term) || 
      (img.tags && img.tags.some(tag => tag.toLowerCase().includes(term)))
    );
    
    if (results.length === 0) {
      setError(`No exact matches for "${keyword}". Showing popular items instead.`);
      results = allImages.slice(0, 5);
    } else if (results.length < 5) {
      const remaining = allImages.filter(img => !results.includes(img));
      results = [...results, ...remaining].slice(0, 5);
    } else {
      results = results.slice(0, 5);
    }
    
    setImages(results);
  };

  return (
    <>
      <div className="sec-c">
        <span className="eyebrow">Gallery</span>
        <h2 className="stitle">Food, <em>Vibes & Moments</em></h2>
        <div className="bar"></div>
        
        <form onSubmit={handleSearch} className="mt-8 max-w-md mx-auto flex gap-2">
          <input 
            type="text" 
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="Search gallery (e.g., thali, vada pav, spices)"
            className="flex-1 px-4 py-2 rounded-full border border-orange-200 focus:outline-none focus:border-orange-500 bg-white/50"
          />
          <button type="submit" className="btn-f !py-2 !px-6">Search</button>
        </form>
      </div>
      
      <div className="gsec">
        {loading ? (
          <div className="text-center py-20 text-orange-800/50">Loading images...</div>
        ) : (
          <>
            {error && <div className="text-center pb-6 text-orange-600/80 text-sm">{error}</div>}
            <div className="gmosaic">
              {images.map((img, idx) => (
                <div key={img.id} className={`gi g${idx + 1} relative min-h-[200px] group overflow-hidden rounded-lg`}>
                  <Image src={img.src} alt={img.title} fill sizes="(max-width: 900px) 50vw, 40vw" className="object-cover transition-transform duration-500 group-hover:scale-110" referrerPolicy="no-referrer" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-5">
                    <span className="text-white font-serif font-medium text-xl tracking-wide">{img.title}</span>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
}
