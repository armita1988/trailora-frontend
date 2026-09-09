import TourList from '../components/ToursList';
import SearchBar from '../components/SearchBar';
import { useState } from 'react';
import { useTours } from '../contexts/ToursContext';

const DEFAULT_FILTERS = {
  destination: '',
  duration: '',
  difficulty: '',
  sortBy: '-ratingsAverage',
};

export default function HomePage() {
  const { tours } = useTours();
  const [destination, setDestination] = useState(DEFAULT_FILTERS.destination);
  const [duration, setDuration] = useState(DEFAULT_FILTERS.duration);
  const [difficulty, setDifficulty] = useState(DEFAULT_FILTERS.difficulty);
  const [sortBy, setSortBy] = useState(DEFAULT_FILTERS.sortBy);
  const [appliedFilters, setAppliedFilters] = useState(DEFAULT_FILTERS);
  const applyFilters = function () {
    setAppliedFilters({
      destination,
      duration,
      difficulty,
      sortBy,
    });
  };

  const hasActiveFilters =
    appliedFilters.destination !== DEFAULT_FILTERS.destination ||
    appliedFilters.duration !== DEFAULT_FILTERS.duration ||
    appliedFilters.difficulty !== DEFAULT_FILTERS.difficulty ||
    appliedFilters.sortBy !== DEFAULT_FILTERS.sortBy;

  const hasPendingFilterChanges =
    destination !== appliedFilters.destination ||
    duration !== appliedFilters.duration ||
    difficulty !== appliedFilters.difficulty ||
    sortBy !== appliedFilters.sortBy;

  const discardFilterChanges = function () {
    setDestination(appliedFilters.destination);
    setDuration(appliedFilters.duration);
    setDifficulty(appliedFilters.difficulty);
    setSortBy(appliedFilters.sortBy);
  };

  const clearFilters = function () {
    setDestination(DEFAULT_FILTERS.destination);
    setDuration(DEFAULT_FILTERS.duration);
    setDifficulty(DEFAULT_FILTERS.difficulty);
    setSortBy(DEFAULT_FILTERS.sortBy);

    setAppliedFilters(DEFAULT_FILTERS);
  };

  return (
    <div className="xs:px-6 z-10 w-full px-5 py-14 sm:px-8 md:px-10 lg:py-18 xl:py-20">
      <SearchBar
        destination={destination}
        setDestination={setDestination}
        duration={duration}
        setDuration={setDuration}
        difficulty={difficulty}
        setDifficulty={setDifficulty}
        sortBy={sortBy}
        setSortBy={setSortBy}
        clearFilters={clearFilters}
        appliedFilters={appliedFilters}
        applyFilters={applyFilters}
        hasPendingFilterChanges={hasPendingFilterChanges}
        discardFilterChanges={discardFilterChanges}
      />
      <div className="mx-auto mt-4 flex w-full max-w-6xl items-center justify-between px-1 2xl:max-w-7xl">
        <p className="text-sm font-medium text-[#64748B]">
          <span className="font-semibold text-[#334155]">{tours.length}</span>
          {tours.length === 1 ? ' tour found' : ' tours found'}
        </p>

        {hasActiveFilters && (
          <button
            type="button"
            onClick={clearFilters}
            className="cursor-pointer rounded-lg px-3 py-1.5 text-sm font-medium text-[#64748B] transition-all duration-200 hover:bg-[#F1F7F3] hover:text-[#0B7A31] focus-visible:ring-2 focus-visible:ring-[#0B7A31]/20 focus-visible:outline-none"
          >
            Clear filters
          </button>
        )}
      </div>
      <TourList />
    </div>
  );
}
