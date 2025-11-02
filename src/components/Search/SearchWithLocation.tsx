// Location feature - Hidden until backend implementation is ready
// import { Select, SelectItem } from '@heroui/react';
// import { PROVINCES } from '@/constants/provinces';
import React, { useState, useRef, useEffect } from 'react';
import { cn, useDisclosure } from '@heroui/react';
import { mentor_search } from '@/apis/mentor';
import { useDebounce } from '@/hooks/use-debounce';
import ClearIcon from '@/components/Icons/ClearIcon';
import SearchIcon from '@/components/Icons/SearchIcon';
import MentorInfoModal from '@/components/Modal/MentorInfoModal';
import { getProvince } from '@/utils/getProvince';
import { useMatchingStore } from '@/stores/matching-store';
import Input from '@/components/Input/Input';
import Button from '@/components/Button/Button';
import Image from 'next/image';
import AvatarPlaceholder from '/public/assets/avatar-placeholder.png';
import { Mentor } from '@/interfaces/MentorProfile';
import { STARTUP_SDG_GOALS } from '@/constants/sdgs';

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

interface SearchWithLocationProps {
  placeholder?: string;
  // Location feature - Hidden until backend implementation is ready
  // location: string;
  // onLocationChange: (value: string) => void;
  className?: string;
}

const SearchWithLocation: React.FC<SearchWithLocationProps> = ({
  placeholder = 'Search',
  // Location feature - Hidden until backend implementation is ready
  // location,
  // onLocationChange,
  className = '',
}) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<Mentor[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef<HTMLDivElement | null>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const debouncedQuery = useDebounce(query, 500);
  const {
    isOpen: isMentorInfoModalOpen,
    onOpen: onMentorInfoModalOpen,
    onOpenChange: onMentorInfoModalOpenChange,
  } = useDisclosure();
  const [selectedMentor, setSelectedMentor] = useState<any | null>(null);
  const matches = useMatchingStore((state) => state.matches);
  const [matchStatus, setMatchStatus] = useState<string | undefined>('');

  useEffect(() => {
    if (debouncedQuery.trim()) {
      setIsLoading(true);
      mentor_search(7, 1, debouncedQuery)
        .then((data) => {
          const mentors = Array.isArray(data.data) ? data.data : [];
          setSuggestions(mentors);
          setError(null);
        })
        .catch(() => setError('Failed to fetch mentor'))
        .finally(() => setIsLoading(false));
      setIsOpen(true);
      setSelectedIndex(-1);
    } else {
      setSuggestions([]);
      setIsOpen(false);
      setIsLoading(false);
      setError(null);
      setSelectedIndex(-1);
    }
  }, [debouncedQuery]);

  const handleInputChange = (value: string) => {
    setQuery(value);
    if (value.trim()) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
      setSelectedIndex(-1);
    }
    const inputElement = inputRef.current?.querySelector('input');
    inputElement?.focus();
  };

  const handleClear = () => {
    setQuery('');
    setSuggestions([]);
    setIsOpen(false);
    setError(null);
    setSelectedIndex(-1);
    const inputElement = inputRef.current?.querySelector('input');
    inputElement?.focus();
  };

  const handleSelectSuggestion = (suggestion: Mentor) => {
    setIsOpen(false);

    const mentor = suggestion;
    if (mentor) {
      setSelectedMentor(mentor);
      const match = matches?.find((m: any) => m.mentorId === mentor.id);
      setMatchStatus(match ? match.status : 'NOT_CONNECTED');
      onMentorInfoModalOpen();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen || suggestions.length === 0) return;
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
        setIsOpen(false);
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

  // Location feature - Hidden until backend implementation is ready
  // const handleLocationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
  //   onLocationChange(e.target.value);
  // };

  return (
    <div className={`${className} relative`}>
      <div className='flex items-center justify-center'>
        <div onKeyDown={handleKeyDown} onFocus={() => query.trim()} className='w-full'>
          <Input
            variant='text'
            preset='search-lg'
            value={query}
            onChange={handleInputChange}
            placeholder={placeholder}
            baseRef={inputRef}
            startContent={
              <SearchIcon className='text-2xl text-neutral-50 pointer-events-none flex-shrink-0' />
            }
            endContent={
              <div className='pr-extra-small flex items-center gap-small z-20'>
                {query && !isLoading && (
                  <Button
                    variant='ghost-sm'
                    onClick={handleClear}
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
      {isOpen && (
        <div className='absolute w-full top-full mt-small bg-neutral-20 border border-neutral-40 rounded-2xl shadow-xl z-50 overflow-hidden'>
          {error && (
            <div className='p-regular text-error text-sm border-b border-neutral-40'>
              <span className='font-medium'>Error:</span> {error}
            </div>
          )}

          {suggestions.length > 0 && (
            <ul ref={listRef} className='max-h-96 overflow-y-auto px-small py-small'>
              {suggestions.map((suggestion, index) => {
                const lowerName = suggestion.name.toLowerCase();
                const lowerQuery = query.toLowerCase();
                const matchIndex = lowerQuery ? lowerName.indexOf(lowerQuery) : -1;
                const mentorSdgs =
                  Array.isArray(suggestion.sdgFocusExpertises) &&
                  suggestion.sdgFocusExpertises.length
                    ? suggestion.sdgFocusExpertises
                        .map((sdg) => getSdgLabel(sdg) || sdg)
                        .filter((label): label is string => Boolean(label))
                        .join(', ')
                    : null;

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
                          alt={`${suggestion.name} avatar`}
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
                        {mentorSdgs && (
                          <span className='text-xs font-medium text-secondary/80 truncate'>
                            {mentorSdgs}
                          </span>
                        )}
                      </div>
                    </button>
                  </li>
                );
              })}
            </ul>
          )}

          {!isLoading && suggestions.length === 0 && query.trim() && (
            <div className='p-8 text-center text-neutral-50'>
              <p className='text-sm'>No suggestions found for &quot;{query}&quot;</p>
            </div>
          )}

          {suggestions.length > 0 && (
            <div className='px-regular py-small bg-neutral-40 text-xs text-neutral-50 border-t border-neutral-40'>
              Use ↑↓ to navigate, Enter to select, Esc to close
            </div>
          )}
        </div>
      )}
      <MentorInfoModal
        isOpen={isMentorInfoModalOpen}
        onOpenChange={onMentorInfoModalOpenChange}
        mentorName={selectedMentor?.name || ''}
        location={getProvince(selectedMentor?.locationBased || '')}
        avtUrl={selectedMentor?.avtUrl || ''}
        mentorDescription={selectedMentor?.description || ''}
        mentorSdgFocusExpertises={selectedMentor?.sdgFocusExpertises || []}
        mentorSkillOffered={selectedMentor?.skillOffered || []}
        mentorLanguagesSpoken={selectedMentor?.languagesSpoken || []}
        mentorId={selectedMentor?.id || ''}
        matchingStatus={matchStatus}
      />
    </div>
  );
};

export default SearchWithLocation;
