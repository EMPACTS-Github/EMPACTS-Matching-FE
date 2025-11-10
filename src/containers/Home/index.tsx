'use client';

import React, { useEffect, useState, useCallback, useRef } from 'react';
import { Spinner } from '@heroui/spinner';
import { cn } from '@heroui/react';
import { startup_list, search_startup } from '@/apis/startup';
import { useRouter } from 'next/navigation';
import { FETCH_STARTUP_LIMIT } from '@/constants';
import { HomepageStartup, SdgGoal, Startup } from '@/interfaces/startup';
import { STARTUP_SDG_GOALS } from '@/constants/sdgs';
import { useDebounce } from '@/hooks/use-debounce';
import Image from 'next/image';
import GroupIcon from '/public/assets/group.png';
import LabelIcon from '/public/assets/label.png';
import AvatarPlaceholder from '/public/assets/avatar-placeholder.png';
import { Avatar } from '@heroui/avatar';

// Import components
import Button from '@/components/Button/Button';
import Input from '@/components/Input/Input';
import ClearIcon from '@/components/Icons/ClearIcon';
import SearchIcon from '@/components/Icons/SearchIcon';
import ChevronDownIcon from '@/components/Icons/ChevronDownIcon';
import ChevronUpIcon from '@/components/Icons/ChevronUpIcon';

const SDG_LABEL_MAP: Record<string, string> = Object.values(STARTUP_SDG_GOALS).reduce(
  (acc, goal) => {
    acc[goal.textValue.toUpperCase()] = goal.label;
    acc[String(goal.value)] = goal.label;
    acc[goal.label.toUpperCase()] = goal.label;
    return acc;
  },
  {} as Record<string, string>
);

const getSdgLabel = (sdgCode?: string | number | null) => {
  if (sdgCode === undefined || sdgCode === null) return null;
  const key = typeof sdgCode === 'number' ? String(sdgCode) : sdgCode.toString().toUpperCase();
  return SDG_LABEL_MAP[key] || null;
};

const Home = () => {
  const router = useRouter();
  const [startups, setStartups] = useState<HomepageStartup[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  // Search states
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<Startup[]>([]);
  const [isSearchLoading, setIsSearchLoading] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const debouncedQuery = useDebounce(query, 500);

  // Category states
  const [showMore, setShowMore] = useState(false);
  const [selectAll, setSelectAll] = useState(true);

  const fetchStartups = useCallback(async () => {
    try {
      setLoading(true);
      let response = await startup_list(FETCH_STARTUP_LIMIT, page, selectedCategory);
      const data = response.data;

      setStartups((prev) => (page === 1 ? data.startups : [...prev, ...data.startups]));
      setHasMore(data.hasMore);
    } catch (error) {
      console.error('Failed to fetch startups:', error);
    } finally {
      setLoading(false);
    }
  }, [page, selectedCategory]);

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
    setPage((prev) => prev + 1);
  }, [hasMore]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const handleStartupDetail = (id: string) => {
    router.push(`/startup/${id}`);
  };

  // Search functionality
  useEffect(() => {
    if (debouncedQuery.trim()) {
      setIsSearchLoading(true);
      search_startup(debouncedQuery)
        .then((data) => {
          const startups = Array.isArray(data.data) ? data.data : [];
          setSuggestions(startups);
          setSearchError(null);
        })
        .catch(() => setSearchError('Failed to fetch startup'))
        .finally(() => setIsSearchLoading(false));
      setIsSearchOpen(true);
      setSelectedIndex(-1);
    } else {
      setSuggestions([]);
      setIsSearchOpen(false);
      setIsSearchLoading(false);
      setSearchError(null);
      setSelectedIndex(-1);
    }
  }, [debouncedQuery]);

  const handleInputChange = (value: string) => {
    setQuery(value);
  };

  const handleSearchClear = () => {
    setQuery('');
    setSuggestions([]);
    setIsSearchOpen(false);
    setSearchError(null);
    setSelectedIndex(-1);
    inputRef.current?.focus();
  };

  const handleSelectSuggestion = (suggestion: Startup) => {
    setIsSearchOpen(false);
    router.push(`/startup/${suggestion.id}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isSearchOpen || suggestions.length === 0) return;
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex((prev) => (prev < suggestions.length - 1 ? prev + 1 : 0));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : suggestions.length - 1));
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0) {
          handleSelectSuggestion(suggestions[selectedIndex]);
        }
        break;
      case 'Escape':
        setIsSearchOpen(false);
        setSelectedIndex(-1);
        break;
    }
  };

  useEffect(() => {
    if (selectedIndex >= 0 && listRef.current) {
      const selectedElement = listRef.current.children[selectedIndex] as HTMLElement;
      selectedElement?.scrollIntoView({ block: 'nearest' });
    }
  }, [selectedIndex]);

  // Category functionality
  const allCategories: SdgGoal[] = (
    Object.keys(STARTUP_SDG_GOALS) as Array<keyof typeof STARTUP_SDG_GOALS>
  ).map((key) => ({
    id: STARTUP_SDG_GOALS[key].textValue,
    label: STARTUP_SDG_GOALS[key].label,
  }));

  const initialCategories = allCategories.slice(0, 5);
  const moreTabs1 = allCategories.slice(5, 8);
  const moreTabs2 = allCategories.slice(8, 11);
  const moreTabs3 = allCategories.slice(11, 14);

  const handleSelectCategory = (tabId: string) => {
    setSelectAll(false);
    const isSelected = selectedCategory.includes(tabId);

    const updatedCategory = isSelected
      ? selectedCategory.filter((id) => id !== tabId)
      : [...selectedCategory, tabId];

    if (updatedCategory.length === 0) {
      setSelectAll(true);
    }
    setSelectedCategory(updatedCategory);
  };

  const handleSelectAll = () => {
    setSelectAll(true);
    setSelectedCategory([]);
  };

  const isUserLoggedIn = () => {
    const user = localStorage.getItem('user');
    return !!user;
  };

  const handleCreateProfile = () => {
    if (isUserLoggedIn()) {
      router.push('/profiles/new');
    } else {
      router.push('/auth/login');
    }
  };

  // Inline HeroSection component
  const HeroSection = () => (
    <div className='text-center py-extra-large'>
      <h1 className='text-4xl font-bold text-secondary'>Discover SDGs startups</h1>
      <p className='mt-small text-lg text-secondary cursor-pointer' onClick={handleCreateProfile}>
        or <span className='text-primary'>create your own</span>
      </p>
    </div>
  );

  // Inline StartupCard component
  const StartupCard = ({ id, avtUrl, name, description, memberQty, sdgGoal }: HomepageStartup) => (
    <div
      className='p-4 bg-neutral-20 rounded-lg flex flex-col items-center gap-5 shadow-md cursor-pointer'
      onClick={() => handleStartupDetail(id)}
    >
      <div className='flex flex-col items-center gap-2 w-full'>
        <Avatar
          src={avtUrl}
          name={name}
          radius='full'
          className='bg-neutral-20 w-[120px] h-[120px]'
          isBordered
          color='primary'
        />
        <h2 className='font-inter font-semibold text-lg text-secondary text-center w-full line-clamp-2'>
          {name}
        </h2>
      </div>
      <div className='flex flex-col justify-between w-full gap-[5px]'>
        <div className='flex items-center w-full gap-1'>
          <Image
            src={GroupIcon}
            alt='Members'
            width={24}
            height={24}
            className='object-cover w-6 h-6'
          />
          <span className='font-inter font-normal text-[14px] text-secondary text-wrap'>
            {memberQty} {memberQty === 1 ? 'Member' : 'Members'}
          </span>
        </div>
        <div className='flex items-start gap-1 overflow-hidden'>
          <Image
            src={LabelIcon}
            alt='Project'
            width={24}
            height={24}
            className='object-cover w-6 h-6'
          />
          <span className='font-inter font-normal text-[14px] text-secondary text-wrap'>
            {sdgGoal}
          </span>
        </div>
      </div>
      <div className='font-inter text-sm font-normal text-neutral-80 w-full line-clamp-4'>
        {description}
      </div>
    </div>
  );

  // Inline CategoryItem component
  const CategoryItem = ({ category }: { category: SdgGoal }) => (
    <Button
      key={category.id}
      onClick={() => handleSelectCategory(category.id)}
      variant={selectedCategory.includes(category.id) ? 'primary-md' : 'bordered-md'}
      radius='full'
      className={cn(
        'text-sm font-semibold',
        !selectedCategory.includes(category.id) && 'border-neutral-50 border-1'
      )}
    >
      <div className='text-regular'>{category.label}</div>
    </Button>
  );

  // Inline CategoryList component
  const CategoryList = () => (
    <div className='w-full p-medium'>
      <div className='flex gap-small overflow-x-auto justify-center whitespace-nowrap mb-small'>
        <Button
          onClick={handleSelectAll}
          variant={selectAll ? 'primary-md' : 'bordered-md'}
          radius='full'
          className={cn('text-sm', !selectAll && 'border-neutral-50 border-1')}
        >
          <div className='text-sm'>All</div>
        </Button>
        {initialCategories.map((category) => (
          <CategoryItem key={category.id} category={category} />
        ))}
        {!showMore && (
          <Button
            onClick={() => setShowMore(!showMore)}
            variant='bordered-md'
            radius='full'
            className='border-neutral-50 border-1'
            endContent={<ChevronDownIcon className='text-primary' />}
          >
            <div className='text-sm font-semibold'>More</div>
          </Button>
        )}
      </div>
      {showMore && (
        <div className='flex flex-col items-center'>
          <div className='flex gap-small overflow-x-auto mb-small justify-center whitespace-nowrap'>
            {moreTabs1.map((category) => (
              <CategoryItem key={category.id} category={category} />
            ))}
          </div>
          <div className='flex gap-small overflow-x-auto mb-small justify-center whitespace-nowrap'>
            {moreTabs2.map((category) => (
              <CategoryItem key={category.id} category={category} />
            ))}
          </div>
          <div className='flex gap-small overflow-x-auto mb-small justify-center whitespace-nowrap'>
            {moreTabs3.map((category) => (
              <CategoryItem key={category.id} category={category} />
            ))}
            <Button
              onClick={() => setShowMore(!showMore)}
              variant='bordered-md'
              radius='full'
              className='border-neutral-50 border-1'
              endContent={<ChevronUpIcon className='text-primary' />}
            >
              <div className='text-sm font-semibold'>Less</div>
            </Button>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <main className='flex flex-col items-center min-h-screen'>
      <div className='flex flex-col items-center w-full 2xl:px-[20%] xl:px-56 lg:px-48 md:px-32 sm:px-16 xs:px-8 px-extra-small gap-none mt-medium'>
        <HeroSection />

        {/* Search Bar Component. */}
        <div className='w-full max-w-2xl mx-auto relative'>
          <div className='flex items-center justify-center'>
            <div onKeyDown={handleKeyDown} onFocus={() => query.trim()} className='w-full'>
              <Input
                variant='text'
                preset='search-lg'
                value={query}
                onChange={handleInputChange}
                placeholder='Search for startups'
                startContent={
                  <SearchIcon className='text-2xl text-neutral-50 pointer-events-none flex-shrink-0' />
                }
                endContent={
                  <div className='pr-extra-small flex items-center gap-small z-20'>
                    {query && !isSearchLoading && (
                      <Button
                        variant='ghost-sm'
                        onClick={handleSearchClear}
                        isIconOnly
                        className='p-1 hover:bg-neutral-40 rounded-full transition-colors'
                      >
                        <ClearIcon className='h-4 w-4' />
                      </Button>
                    )}
                  </div>
                }
                className='shadow-md w-full rounded-full'
              />
            </div>
          </div>
          {isSearchOpen && (
            <div className='absolute w-full top-full mt-small bg-neutral-20 border border-neutral-40 rounded-2xl shadow-xl z-50 overflow-hidden'>
              {searchError && (
                <div className='p-regular text-error text-sm border-b border-neutral-40'>
                  <span className='font-medium'>Error:</span> {searchError}
                </div>
              )}

              {suggestions.length > 0 && (
                <ul ref={listRef} className='max-h-96 overflow-y-auto px-small py-small'>
                  {suggestions.map((suggestion, index) => {
                    const lowerName = suggestion.name.toLowerCase();
                    const lowerQuery = query.toLowerCase();
                    const matchIndex = lowerQuery ? lowerName.indexOf(lowerQuery) : -1;
                    const sdgLabel = getSdgLabel(suggestion.sdgGoal) || suggestion.sdgGoal;

                    return (
                      <li key={suggestion.id ?? index}>
                        <button
                          type='button'
                          onClick={() => handleSelectSuggestion(suggestion)}
                          className={cn(
                            'w-full flex h-14 items-center gap-medium justify-start rounded-xl border border-transparent bg-white px-medium text-left shadow-sm transition-all hover:bg-neutral-30 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40',
                            selectedIndex === index &&
                              'bg-primary-20/40 text-secondary ring-1 ring-primary'
                          )}
                        >
                          <div className='relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-full bg-neutral-30'>
                            <Image
                              src={suggestion.avtUrl || AvatarPlaceholder}
                              alt={`${suggestion.name} logo`}
                              fill
                              sizes='48px'
                              className='object-cover'
                            />
                          </div>
                          <div className='flex min-w-0 flex-1 flex-col items-start justify-center leading-tight'>
                            <span className='truncate text-sm font-semibold text-secondary'>
                              {matchIndex === -1 ? (
                                suggestion.name
                              ) : (
                                <>
                                  {suggestion.name.slice(0, matchIndex)}
                                  <span className='text-primary'>
                                    {suggestion.name.slice(matchIndex, matchIndex + query.length)}
                                  </span>
                                  {suggestion.name.slice(matchIndex + query.length)}
                                </>
                              )}
                            </span>
                            {sdgLabel && (
                              <span className='text-xs font-medium text-secondary/80 truncate'>
                                {sdgLabel}
                              </span>
                            )}
                          </div>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              )}

              {!isSearchLoading && suggestions.length === 0 && query.trim() && (
                <div className='p-8 text-center text-neutral-50'>
                  <p className='text-sm'>No suggestions found for &quot;{query}&quot;</p>
                </div>
              )}

              {suggestions.length > 0 && (
                <div className='px-medium py-small bg-neutral-30 text-xs text-neutral-60 border-t border-neutral-40'>
                  Use ↑↓ to navigate, Enter to select, Esc to close
                </div>
              )}
            </div>
          )}
        </div>
        <CategoryList />
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-regular gap-y-large mb-large'>
          {startups.length > 0
            ? startups.map((card, index) => <StartupCard key={index} {...card} />)
            : !loading && (
                <div className='text-center mt-large text-secondary md:col-span-2 lg:col-span-4'>
                  No result found
                </div>
              )}
        </div>
        {loading && hasMore && (
          <div className='flex justify-center items-center h-[50%]'>
            <Spinner
              classNames={{ label: 'text-foreground mt-regular' }}
              label='The system is fetching Startup. Please wait...'
              variant='wave'
            />
          </div>
        )}
      </div>
    </main>
  );
};

export default Home;
