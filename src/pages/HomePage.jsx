import TourList from '../components/ToursList';
import SearchBar from '../components/SearchBar';
import { useState } from 'react';
import { useTours } from '../contexts/ToursContext';

export default function HomePage() {
  const { tours } = useTours();
  const [search, setSearch] = useState('');
  const [destination, setDestination] = useState('');
  const [duration, setDuration] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [sortBy, setSortBy] = useState('-ratingsAverage');
  const hasActiveFilters =
    destination !== '' ||
    duration !== '' ||
    difficulty !== '' ||
    sortBy !== '-ratingsAverage';

  const handleClearAll = function () {
    setDestination('');
    setDifficulty('');
    setDuration('');
    setSortBy('-ratingsAverage');
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
        search={search}
        setSearch={setSearch}
        handleClearAll={handleClearAll}
      />
      <div className="flex items-center justify-between px-12 pt-3">
        <p className="text-xs font-medium text-[#64748B]">
          {tours.length}
          {tours.length === 1 ? ' tour found' : ' tours found'}
        </p>

        {hasActiveFilters && (
          <button
            type="button"
            onClick={handleClearAll}
            className="cursor-pointer text-xs font-medium text-[#64748B] transition-colors duration-200 hover:text-[#0B7A31]"
          >
            Clear filters
          </button>
        )}
      </div>
      <TourList
        handleClearAll={handleClearAll}
        hasActiveFilters={hasActiveFilters}
      />
    </div>
  );
}
