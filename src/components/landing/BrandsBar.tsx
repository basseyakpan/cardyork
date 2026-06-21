'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface Asset {
  _id: string;
  name: string;
  images: string[];
}

export default function BrandsBar() {
  const [shuffledAssets, setShuffledAssets] = useState<Asset[]>([]);
  const [failedIds, setFailedIds] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchPublicAssets() {
      try {
        const res = await fetch('https://cardyork-server.onrender.com/api/assets/users/get/all');
        const json = await res.json();
        if (json && json.data) {
          // Randomize initially once on mount
          const shuffled = [...json.data].sort(() => 0.5 - Math.random());
          setShuffledAssets(shuffled);
        }
      } catch (err) {
        console.error("Failed to fetch public assets", err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchPublicAssets();
  }, []);

  const displayAssets = useMemo(() => {
    if (!shuffledAssets.length) return [];
    // Filter out failed assets and pick the first 4
    return shuffledAssets.filter(asset => !failedIds.includes(asset._id)).slice(0, 6);
  }, [shuffledAssets, failedIds]);

  const handleImageError = (id: string) => {
    setFailedIds(prev => prev.includes(id) ? prev : [...prev, id]);
  };

  return (
    <section className="py-8 border-y border-outline-variant bg-white/60 dark:bg-surface-container-low/40 backdrop-blur-sm">
      <div className="max-w-[1200px] mx-auto px-6">
        <p className="text-center text-sm text-on-surface-variant font-medium mb-6 uppercase tracking-widest">
          We accept all major gift cards
        </p>
        <div className="flex flex-wrap items-center justify-center gap-10 md:gap-16">
          {/* Temporary hardcoded list as requested */}
          <div className="flex flex-col items-center gap-3 text-on-surface-variant hover:text-on-surface transition-colors opacity-80 hover:opacity-100">
            <span className="text-3xl font-black tracking-tighter uppercase" style={{ fontFamily: 'Impact, Arial Black, sans-serif' }}>XBOX</span>
          </div>
          <div className="flex flex-col items-center gap-3 text-on-surface-variant hover:text-on-surface transition-colors opacity-80 hover:opacity-100">
            <span className="text-3xl font-extrabold tracking-[0.2em] uppercase" style={{ fontFamily: 'Trebuchet MS, sans-serif' }}>STEAM</span>
          </div>
          <div className="flex flex-col items-center gap-3 text-on-surface-variant hover:text-on-surface transition-colors opacity-80 hover:opacity-100">
            <span className="text-3xl font-black italic tracking-tight" style={{ fontFamily: 'Verdana, sans-serif' }}>PlayStation</span>
          </div>
          <div className="flex flex-col items-center gap-3 text-on-surface-variant hover:text-on-surface transition-colors opacity-80 hover:opacity-100">
            <span className="text-2xl font-bold tracking-widest uppercase border-2 border-current px-3 py-1 rounded-sm" style={{ fontFamily: 'Courier New, monospace' }}>RAZER GOLD</span>
          </div>

          {/*
          {isLoading ? (
            <div className="flex items-center justify-center gap-10 md:gap-16 animate-pulse">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="flex flex-col items-center gap-3">
                  <div className="w-[100px] h-[100px] bg-surface-container-highest rounded-2xl"></div>
                  <div className="w-20 h-4 bg-surface-container-highest rounded-full"></div>
                </div>
              ))}
            </div>
          ) : displayAssets.length > 0 ? (
            displayAssets.map(asset => (
              <div key={asset._id} className="flex flex-col items-center gap-3 text-on-surface-variant hover:text-on-surface transition-colors group">
                <Image 
                  src={asset.images[0]}
                  alt={asset.name}
                  width={100}
                  height={100}
                  className="object-contain rounded-2xl bg-surface-container-lowest p-2 shadow-sm border border-outline-variant/30 group-hover:shadow-md transition-shadow"
                  onError={() => handleImageError(asset._id)}
                />
                <span className="text-sm font-bold tracking-tight text-center capitalize">{asset.name}</span>
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center gap-3 text-on-surface-variant hover:text-on-surface transition-colors">
              <span className="text-xl font-black tracking-tight" style={{ fontFamily: 'Georgia, serif' }}>Amazon</span>
            </div>
          )}
          */}
        </div>
        <div className="mt-8 text-center">
          <Link href="/login" className="text-primary hover:text-primary-dark text-sm font-bold uppercase tracking-widest no-underline hover:underline transition-colors inline-block">
            See More Brands →
          </Link>
        </div>
      </div>
    </section>
  );
}
