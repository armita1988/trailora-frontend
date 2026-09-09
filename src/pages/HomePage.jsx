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
        handleClearAll={clearFilters}
        appliedFilters={appliedFilters}
        applyFilters={applyFilters}
        hasPendingFilterChanges={hasPendingFilterChanges}
        discardFilterChanges={discardFilterChanges}
      />
      <div className="flex items-center justify-between px-12 pt-3">
        <p className="text-xs font-medium text-[#64748B]">
          {tours.length}
          {tours.length === 1 ? ' tour found' : ' tours found'}
        </p>

        {hasActiveFilters && (
          <button
            type="button"
            onClick={clearFilters}
            className="cursor-pointer text-xs font-medium text-[#64748B] transition-colors duration-200 hover:text-[#0B7A31]"
          >
            Clear filters
          </button>
        )}
      </div>
      <TourList />
    </div>
  );
}
