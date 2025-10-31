// Location feature - Hidden until backend implementation is ready
// import { Select, SelectItem } from '@heroui/react';
// import { PROVINCES } from '@/constants/provinces';
import React, { useState, useRef, useEffect } from 'react';
import { cn, useDisclosure } from '@heroui/react';
import { mentor_search } from '@/apis/mentor';
import { useDebounce } from '@/hooks/use-debounce';
import { Spinner } from '@heroui/spinner';
import UsersIcon from '@/components/Icons/UsersIcon';
import ClearIcon from '@/components/Icons/ClearIcon';
import SearchIcon from '@/components/Icons/SearchIcon';
import MentorInfoModal from '@/components/Modal/MentorInfoModal';
import { getProvince } from '@/utils/getProvince';
import { useMatchingStore } from '@/stores/matching-store';
import Input from '@/components/Input/Input';
import Button from '@/components/Button/Button';

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
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const debouncedQuery = useDebounce(query, 300);
  const {
    isOpen: isMentorInfoModalOpen,
    onOpen: onMentorInfoModalOpen,
    onOpenChange: onMentorInfoModalOpenChange,
  } = useDisclosure();
  const [mentorList, setMentorList] = useState<any[]>([]);
  const [selectedMentor, setSelectedMentor] = useState<any | null>(null);
  const matches = useMatchingStore((state) => state.matches);
  const [matchStatus, setMatchStatus] = useState<string | undefined>('');

  useEffect(() => {
    if (debouncedQuery.trim()) {
      setIsLoading(true);
      mentor_search(7, 1, debouncedQuery)
        .then((data) => {
          const mentors = Array.isArray(data.data) ? data.data : [];
          setMentorList(mentors);
          setSuggestions(mentors.map((m: any) => m.name));
          setError(null);
        })
        .catch(() => setError('Failed to fetch mentor'))
        .finally(() => setIsLoading(false));
      setIsOpen(true);
      setSelectedIndex(-1);
    } else {
      setSuggestions([]);
      setMentorList([]);
      setIsOpen(false);
    }
  }, [debouncedQuery]);

  const handleInputChange = (value: string) => {
    setQuery(value);
  };

  const handleClear = () => {
    setQuery('');
    setSuggestions([]);
    setIsOpen(false);
    setError(null);
    inputRef.current?.focus();
  };

  const handleSelectSuggestion = (suggestion: string) => {
    setQuery(suggestion);
    setIsOpen(false);

    const mentor = mentorList.find((m) => m.name === suggestion);
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
        <div
          onKeyDown={handleKeyDown}
          onFocus={() => query.trim() && setIsOpen(true)}
          className='w-full'
        >
          <Input
            variant='text'
            preset='default-lg'
            value={query}
            onChange={handleInputChange}
            placeholder={placeholder}
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
            className='border-secondary shadow-md w-full'
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
            <ul ref={listRef} className='max-h-80 overflow-y-auto'>
              {suggestions.map((suggestion, index) => (
                <li key={index}>
                  <Button
                    variant='ghost-sm'
                    onClick={() => handleSelectSuggestion(suggestion)}
                    className={cn(
                      'w-full px-regular py-semi-regular text-left hover:bg-neutral-40 transition-colors flex items-center gap-semi-regular border-b border-neutral-40 last:border-b-0',
                      selectedIndex === index && 'bg-primary-20 text-primary'
                    )}
                  >
                    <UsersIcon className='h-4 w-4 text-neutral-50 flex-shrink-0' />
                    <span className='truncate'>
                      {(() => {
                        const lowerSuggestion = suggestion.toLowerCase();
                        const lowerQuery = query.toLowerCase();
                        const matchIndex = lowerSuggestion.indexOf(lowerQuery);

                        if (matchIndex === -1 || !query) {
                          return suggestion;
                        }

                        return (
                          <>
                            {suggestion.slice(0, matchIndex)}
                            <span className='font-medium text-primary'>
                              {suggestion.slice(matchIndex, matchIndex + query.length)}
                            </span>
                            {suggestion.slice(matchIndex + query.length)}
                          </>
                        );
                      })()}
                    </span>
                  </Button>
                </li>
              ))}
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
