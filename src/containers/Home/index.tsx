"use client"

import React from 'react';
import { useEffect, useState, useCallback } from 'react';
import { Spinner } from "@heroui/spinner";
import StartupCard from '@/containers/Home/StartupCard';
import CategoryList from '@/containers/Home/Category';
import SearchBar from '@/containers/Home/SearchBar';
import { HeroSection } from '@/containers/Home/HeroSection';
import { startup_list, search_startup } from '@/apis/startup';
import { useRouter } from 'next/navigation';
import { FETCH_STARTUP_LIMIT } from '@/constants';
import { HomepageStartup } from '@/interfaces/startup';

function Home() {
  const router = useRouter();
  const [startups, setStartups] = useState<HomepageStartup[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const fetchStartups = useCallback(async () => {
    try {
      setLoading(true);
      let response = await startup_list(FETCH_STARTUP_LIMIT, page, selectedCategory);
      const data = response.data;

      setStartups(prev => (page === 1 ? data.startups : [...prev, ...data.startups]));
      setHasMore(data.hasMore);
    } catch (error) {
      console.error('Failed to fetch startups:', error);
    } finally {
      setLoading(false);
    }
  }, [page, selectedCategory]);

  const handleSearch = async () => {
    try {
      setLoading(true);
      const response = await search_startup(searchQuery);
      setStartups(response.startups);
    } catch (error) {
      console.error('Failed to search startups:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setPage(1);
  }, [selectedCategory]);

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

  const handleStartupDetail = (id: string) => {
    router.push(`/startup/${id}`);
  }

  return (
    <main className="flex flex-col items-center min-h-screen">
      <div className="w-full flex flex-col items-center">
        <HeroSection />
        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          onSearch={handleSearch}
          className="mb-8 w-full max-w-2xl shadow-md"
        />
        <CategoryList setSelectedCategory={setSelectedCategory} selectedCategory={selectedCategory} />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-8">
          {startups.length > 0 ? (
            startups.map((card, index) => (
              <StartupCard key={index} {...card} onClick={handleStartupDetail} />
            ))
          ) : (
            !loading && <div className="text-center mt-8 text-black md:col-span-2 lg:col-span-4">No result found</div>
          )
          }
        </div>
        {loading && hasMore && (
          <Spinner color="secondary" className="flex justify-center items-center mt-8 mb-8" size="lg" />
        )}
      </div>
    </main>
  );
}

export default Home;
