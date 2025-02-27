"use client"

import { useEffect, useState, useCallback } from 'react';
import StartupCard from '../components/StartupCard';
import Tabs from '../components/Tabs';
import SearchBar from '../components/SearchBar';
import { HeroSection } from '../components/HeroSection';
import { startup_list } from '@/apis/startup';
import { useRouter } from 'next/navigation';
interface Startup {
  id: number;
  name: string;
  description: string;
  category: string;
}

export default function Home() {
  const router = useRouter();
  const [startups, setStartups] = useState<Startup[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [selectedTabs, setSelectedTabs] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const fetchStartups = useCallback(async () => {
    try {
      let response = await startup_list(12, page, selectedTabs);
      const data = response.data;

      setStartups(prev => (page === 1 ? data.startups : [...prev, ...data.startups]));
      setHasMore(data.hasMore);
    } catch (error) {
      console.error('Failed to fetch startups:', error);
    }
  }, [page, selectedTabs]);

  useEffect(() => {
    setStartups([]);
    setPage(1);
  }, [selectedTabs]);

  useEffect(() => {
    fetchStartups();
  }, [page, fetchStartups]);

  const handleScroll = useCallback(() => {
    const bottomReached =
      window.innerHeight + window.scrollY >= document.documentElement.offsetHeight - 2;
    if (!bottomReached || !hasMore) return;
    setPage(prev => prev + 1);
  }, [hasMore]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const handleStartupDetail = (id: number) => {
    router.push(`/startup/${id}`);
  }

  return (
    <main className="flex flex-col items-center min-h-screen">
      {/* Content Section */}
      <div className="relative z-10 w-full flex flex-col items-center">
        <HeroSection />
        <SearchBar className="mb-8 w-full max-w-2xl shadow-md" />
        <Tabs setSelectedTabs={setSelectedTabs} selectedTabs={selectedTabs} />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-8">
          {startups.map((card, index) => (
            <StartupCard key={index} {...card} onClick={handleStartupDetail} />
          ))}
        </div>
      </div>
    </main>
  );
}
