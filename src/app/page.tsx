"use client"

import { useEffect, useState, useCallback } from 'react';
import { Spinner } from "@heroui/spinner";
import StartupCard from '@/components/StartupCard';
import Tabs from '@/components/Tabs';
import SearchBar from '@/components/SearchBar';
import { HeroSection } from '@/components/HeroSection';
import { startup_list, search_startup } from '@/apis/startup';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
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
  const [searchResults, setSearchResults] = useState<Startup[] | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchStartups = useCallback(async () => {
    try {
      setLoading(true);
      let response = await startup_list(12, page, selectedTabs);
      const data = response.data;

      setStartups(prev => (page === 1 ? data.startups : [...prev, ...data.startups]));
      setHasMore(data.hasMore);
    } catch (error) {
      console.error('Failed to fetch startups:', error);
    } finally {
      setLoading(false);
    }
  }, [page, selectedTabs]);

  const handleSearch = async () => {
    try {
      setLoading(true);
      const response = await search_startup(searchQuery);
      setSearchResults(response.startups);
    } catch (error) {
      console.error('Failed to search startups:', error);
    } finally {
      setLoading(false);
    }
  };

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
    <>
      <Header />
      <main className="flex flex-col items-center min-h-screen">
        {/* Content Section */}
        <div className="relative z-10 w-full flex flex-col items-center">
          <HeroSection />
          <SearchBar 
            value={searchQuery}
            onChange={setSearchQuery}
            onSearch={handleSearch} // Trigger search on Enter or icon click
            className="mb-8 w-full max-w-2xl shadow-md" />
          <Tabs setSelectedTabs={setSelectedTabs} selectedTabs={selectedTabs} />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-8">
            {searchResults ? (
              searchResults.length > 0 ? (
                searchResults.map((card, index) => (
                  <StartupCard key={index} {...card} onClick={handleStartupDetail} />
                ))
              ) : (
                <div className="text-center mt-8 text-black md:col-span-2 lg:col-span-4">No result found</div>
              )
            ) : (
              startups.length > 0 ? (
                startups.map((card, index) => (
                  <StartupCard key={index} {...card} onClick={handleStartupDetail} />
                ))
              ) : (
                !loading && <div className="text-center mt-8 text-black md:col-span-2 lg:col-span-4">No result found</div>
              )
            )}
          </div>
          {loading && hasMore && (
            <Spinner color="secondary" className="flex justify-center items-center mt-8 mb-8" size="lg" />
          )}
        </div>
      </main>
    </>
  );
}
