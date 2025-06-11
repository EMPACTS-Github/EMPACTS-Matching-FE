import { Input, Select, SelectItem } from '@heroui/react';
import { PROVINCES } from '@/constants/provinces';
import React, { useState, useRef, useEffect } from "react";
import { cn, useDisclosure } from "@heroui/react";
import { mentor_search } from "@/apis/mentor";
import { useDebounce } from "@/hooks/use-debounce";
import { Spinner } from "@heroui/spinner";
import UsersIcon from "@/components/Icons/UsersIcon";
import FlashIcon from "@/components/Icons/FlashIcon";
import MentorInfoModal from '@/components/Modal/MentorInfoModal';
import { getProvince } from '@/utils/getProvince';
import { useMatchingStore } from '@/stores/matching-store';


interface SearchWithLocationProps {
  placeholder?: string;
  location: string;
  onLocationChange: (value: string) => void;
  className?: string;
}

const SearchWithLocation: React.FC<SearchWithLocationProps> = ({
  placeholder = 'Search',
  location,
  onLocationChange,
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
  const { isOpen: isMentorInfoModalOpen, onOpen: onMentorInfoModalOpen, onOpenChange: onMentorInfoModalOpenChange } = useDisclosure();
  const [mentorList, setMentorList] = useState<any[]>([]);
  const [selectedMentor, setSelectedMentor] = useState<any | null>(null);
  const matches = useMatchingStore((state) => state.matches);
  const [matchStatus, setMatchStatus] = useState<string | undefined>("");


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
        .catch(() => setError("Failed to fetch mentor"))
        .finally(() => setIsLoading(false));
      setIsOpen(true);
      setSelectedIndex(-1);
    } else {
      setSuggestions([]);
      setMentorList([]);
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

    const mentor = mentorList.find((m) => m.name === suggestion);
    if (mentor) {
      setSelectedMentor(mentor);
      const match = matches?.find((m: any) => m.mentorId === mentor.id);
      setMatchStatus(match ? match.status : "NOT_CONNECTED");
      onMentorInfoModalOpen();
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
  const handleLocationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onLocationChange(e.target.value);
  }

  return (
    <div className={`${className} relative`}>
      {/* Outer container with better hover/focus styling */}
      <div className="flex items-center justify-between bg-white rounded-[64px] border border-gray-200 h-[52px] transition-all duration-200 hover:border-primary focus-within:border-primary focus-within:ring-1 focus-within:ring-primary/30">
        {/* Search Input – full width with no internal focus/hover highlighting */}
        <div className="flex flex-grow items-center pl-8 justify-between">
          <Input
            ref={inputRef}
            value={query}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onFocus={() => query.trim() && setIsOpen(true)}
            placeholder={placeholder}
            aria-label="Search input"
            variant="flat"
            classNames={{
              base: "w-full",
              mainWrapper: "w-full",
              input: "text-base pl-2 focus:outline-none bg-transparent hover:bg-transparent focus:bg-transparent",
              inputWrapper: "h-[40px] min-h-[40px] border-0 bg-transparent shadow-none rounded-none focus:shadow-none hover:shadow-none hover:bg-transparent data-[hover=true]:bg-transparent group-data-[focus=true]:bg-transparent",
              innerWrapper: "bg-transparent"
            }}
          />
          <div className="pr-4 flex items-center gap-2">
            {isLoading && <Spinner size="sm" color="white" />}
            {query && !isLoading && (
              <button onClick={handleClear} className="p-1 hover:bg-gray-100 rounded-full transition-colors">
                <FlashIcon className="h-4 w-4 text-gray-400" />
              </button>
            )}
          </div>
        </div>

        {/* Divider Line */}
        <div className="h-6 w-px bg-gray-300 mx-3"></div>

        {/* Location Dropdown */}
        <div className="flex-shrink-0 w-[170px] pr-6">
          <div className="flex items-center">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
              xmlns="http://www.w3.org/2000/svg" className="mr-2">
              <path d="M12 13.4299C13.7231 13.4299 15.12 12.0331 15.12 10.3099C15.12 8.58681 13.7231 7.18994 12 7.18994C10.2769 7.18994 8.88 8.58681 8.88 10.3099C8.88 12.0331 10.2769 13.4299 12 13.4299Z"
                stroke="#292D32" strokeWidth="1.5" />
              <path d="M3.62001 8.49C5.59001 -0.169998 18.42 -0.159998 20.38 8.5C21.53 13.58 18.37 17.88 15.6 20.54C13.59 22.48 10.41 22.48 8.39001 20.54C5.63001 17.88 2.47001 13.57 3.62001 8.49Z"
                stroke="#292D32" strokeWidth="1.5" />
            </svg>
            <Select
              placeholder="Location"
              value={location}
              onChange={handleLocationChange}
              variant="flat"
              size="md"
              classNames={{
                base: "min-w-0 w-full",
                trigger: "h-[40px] min-h-[40px] border-0 bg-transparent shadow-none cursor-pointer",
                value: "text-sm font-normal",
                listbox: "text-base bg-white py-2 px-2"
              }}
              popoverProps={{
                classNames: {
                  content: "bg-white w-[220px] shadow-lg border border-gray-200 rounded-lg max-h-[300px] overflow-y-auto z-50"
                },
                placement: "bottom-end",
                offset: 5,
                backdrop: "transparent"
              }}
              listboxProps={{
                itemClasses: {
                  base: "text-gray-800 py-2 px-3 hover:bg-gray-100 rounded cursor-pointer"
                }
              }}
              isVirtualized={false}
            >
              {PROVINCES.map((province) => (
                <SelectItem key={province.key}>
                  {province.label}
                </SelectItem>
              ))}
            </Select>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-2xl shadow-xl z-50 overflow-hidden">
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
      <MentorInfoModal
        isOpen={isMentorInfoModalOpen}
        onOpenChange={onMentorInfoModalOpenChange}
        mentorName={selectedMentor?.name || ""}
        location={getProvince(selectedMentor?.locationBased || "")}
        avtUrl={selectedMentor?.avtUrl || ""}
        mentorDescription={selectedMentor?.description || ""}
        mentorSdgFocusExpertises={selectedMentor?.sdgFocusExpertises || []}
        mentorSkillOffered={selectedMentor?.skillOffered || []}
        mentorLanguagesSpoken={selectedMentor?.languagesSpoken || []}
        mentorId={selectedMentor?.id || ""}
        matchingStatus={matchStatus}
      />
    </div>
  );
};

export default SearchWithLocation;