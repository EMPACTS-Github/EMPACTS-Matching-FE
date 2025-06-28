import React, { ChangeEvent, useState, useRef, useEffect } from 'react';
import { search_startup } from '@/apis/startup';
import Image from 'next/image';
import { Input, Select, SelectItem, cn } from '@heroui/react';
import { useDebounce } from "@/hooks/use-debounce";
import UsersIcon from "@/components/Icons/UsersIcon";
import ClearIcon from "@/components/Icons/ClearIcon";
import SearchIcon from "@/components/Icons/SearchIcon";
import { useRouter } from 'next/navigation';


interface SearchBarProps {
  placeholder?: string;
  className?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = 'Search for anything',
  className = '',
}) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const debouncedQuery = useDebounce(query, 300);
  const [startupList, setStartupList] = useState<any[]>([]);
  const [selectedStartup, setSelectedStartup] = useState<any | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (debouncedQuery.trim()) {
      setIsLoading(true);
      search_startup(debouncedQuery)
        .then((data) => {
          const startups = Array.isArray(data.data) ? data.data : [];
          setStartupList(startups);
          setSuggestions(startups.map((m: any) => m.name));
          setError(null);
        })
        .catch(() => setError("Failed to fetch startup"))
        .finally(() => setIsLoading(false));
      setIsOpen(true);
      setSelectedIndex(-1);
    } else {
      setSuggestions([]);
      setStartupList([]);
      setIsOpen(false);
    }
  }, [debouncedQuery]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleClear = () => {
    setQuery("");
    setSuggestions([]);
    setIsOpen(false);
    setError(null);
    inputRef.current?.focus();
  };

  const handleSelectSuggestion = (suggestion: string) => {
    setQuery(suggestion);
    setIsOpen(false);

    const startup = startupList.find((m) => m.name === suggestion);
    if (startup) {
      setSelectedStartup(startup);
      router.push(`/startup/${selectedStartup.id}`);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen || suggestions.length === 0) return;
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setSelectedIndex((prev) => (prev < suggestions.length - 1 ? prev + 1 : 0));
        break;
      case "ArrowUp":
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : suggestions.length - 1));
        break;
      case "Enter":
        e.preventDefault();
        if (selectedIndex >= 0) {
          handleSelectSuggestion(suggestions[selectedIndex]);
        }
        break;
      case "Escape":
        setIsOpen(false);
        setSelectedIndex(-1);
        break;
    }
  };

  useEffect(() => {
    if (selectedIndex >= 0 && listRef.current) {
      const selectedElement = listRef.current.children[selectedIndex] as HTMLElement;
      selectedElement?.scrollIntoView({ block: "nearest" });
    }
  }, [selectedIndex]);

  return (
    <div className='w-[60%] relative'>
      <div className="flex items-center justify-between">
        <Input
          ref={inputRef}
          value={query}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={() => query.trim() && setIsOpen(true)}
          radius='md'
          placeholder={placeholder}
          aria-label="Search input"
          startContent={
            <SearchIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
          }
          variant="bordered"
          color='primary'
          className='border-secondary'
          size='lg'
          endContent={
            <div className="pr-4 flex items-center gap-2 z-20">
              {query && !isLoading && (
                <button onClick={handleClear} className="p-1 hover:bg-gray-100 rounded-full transition-colors">
                  <ClearIcon className="h-4 w-4" />
                </button>
              )}
            </div>
          }
        >
        </Input>
      </div>
      {isOpen && (
        <div className="absolute w-full top-full mt-2 bg-white border border-gray-200 rounded-2xl shadow-xl z-50 overflow-hidden">
          {error && (
            <div className="p-4 text-red-600 text-sm border-b border-gray-100">
              <span className="font-medium">Error:</span> {error}
            </div>
          )}

          {suggestions.length > 0 && (
            <ul ref={listRef} className="max-h-80 overflow-y-auto">
              {suggestions.map((suggestion, index) => (
                <li key={index}>
                  <button
                    onClick={() => handleSelectSuggestion(suggestion)}
                    className={cn(
                      "w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors flex items-center gap-3 border-b border-gray-50 last:border-b-0",
                      selectedIndex === index && "bg-primary-50 text-primary",
                    )}
                  >
                    <UsersIcon className="h-4 w-4 text-gray-400 flex-shrink-0" />
                    <span className="truncate">
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
                            <span className="font-medium text-primary">
                              {suggestion.slice(matchIndex, matchIndex + query.length)}
                            </span>
                            {suggestion.slice(matchIndex + query.length)}
                          </>
                        );
                      })()}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          )}

          {!isLoading && suggestions.length === 0 && query.trim() && (
            <div className="p-8 text-center text-gray-500">
              <p className="text-sm">No suggestions found for &quot;{query}&quot;</p>
            </div>
          )}

          {suggestions.length > 0 && (
            <div className="px-4 py-2 bg-gray-50 text-xs text-gray-500 border-t border-gray-100">
              Use ↑↓ to navigate, Enter to select, Esc to close
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
