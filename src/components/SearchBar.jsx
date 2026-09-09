import { useEffect, useState } from 'react';
import {
  Calendar,
  Search,
  MapPin,
  Gauge,
  ArrowUpDown,
  Filter,
  ChevronDown,
  SlidersHorizontal,
} from 'lucide-react';
import { useTours } from '../contexts/ToursContext';
import MobileFilterSheet from './MobileFilterSheet';
import FilterMenuItems from './FilterMenuItems';
import FilterOptions from './FilterOptions';

function DesktopDropdown({ value, onChange, options, icon, className = '' }) {
  const [isOpen, setIsOpen] = useState(false);

  const selectedOption = options.find((option) => option.value === value);

  return (
    <div
      className={`relative ${className}`}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) {
          setIsOpen(false);
        }
      }}
    >
      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        className={`font-inter flex h-11 w-full cursor-pointer items-center gap-2 rounded-xl border px-3 text-xs font-normal transition-all duration-200 outline-none xl:text-sm ${
          isOpen
            ? 'border-[#0B7A31] bg-white ring-2 ring-[#0B7A31]/15'
            : 'border-[#E5E7EB] bg-[#F9FAFB] text-[#111827] hover:border-[#C7D8CC]'
        }`}
      >
        <span className="shrink-0 text-[#0B7A31]">{icon}</span>

        <span className="flex-1 truncate text-left">
          {selectedOption?.label}
        </span>

        <ChevronDown
          size={15}
          className={`shrink-0 text-[#64748B] transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {isOpen && (
        <ul className="absolute top-13 left-0 z-50 w-full min-w-max rounded-xl border border-[#E2E8F0] bg-white p-1.5 shadow-[0_12px_30px_rgba(15,23,42,0.14)]">
          {options.map((option) => (
            <li key={option.value || 'all'}>
              <button
                type="button"
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
                className={`w-full cursor-pointer rounded-lg px-3 py-2 text-left text-sm transition-colors duration-150 ${
                  value === option.value
                    ? 'bg-[#ECFDF3] font-semibold text-[#0B7A31]'
                    : 'font-normal text-[#475569] hover:bg-[#F4F8F6] hover:text-[#0B7A31]'
                }`}
              >
                {option.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default function SearchBar({
  destination,
  setDestination,
  duration,
  setDuration,
  difficulty,
  setDifficulty,
  sortBy,
  setSortBy,
  clearFilters,
  appliedFilters,
  applyFilters,
  hasPendingFilterChanges,
  discardFilterChanges,
}) {
  const { getAllTours } = useTours();
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [filterSheetContent, setFilterSheetContent] = useState('');
  const [showFilterSheet, setShowFilterSheet] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);

  const filterItems = [
    {
      key: 'destination',
      name: 'Destinations',
      selectedValue: function () {
        return this.labels[this.values.indexOf(destination)];
      },
      labels: ['United States', 'Canada', 'All Destinations'],
      values: ['usa', 'can', ''],
      icon: (
        <MapPin
          size={16}
          className="pointer-events-none inline-block text-[#0B7A31]"
        />
      ),
      onSelect: function (selectedOption) {
        setDestination(selectedOption);
        // console.log('destinations clicked');
      },
    },
    {
      key: 'duration',
      name: 'Duration',
      selectedValue: function () {
        return this.labels[this.values.indexOf(duration)];
      },
      labels: ['1-3 Days', '4-7 Days', '8-10 Days', '10+ Days', 'Any Duration'],
      values: ['1-3', '4-7', '8-10', '10-+', ''],
      icon: (
        <Calendar
          size={16}
          className="pointer-events-none inline-block text-[#0B7A31]"
        />
      ),
      onSelect: function (selectedOption) {
        setDuration(selectedOption);
        // console.log('duration clicked');
      },
    },
    {
      key: 'difficulty',
      name: 'Difficulty',
      selectedValue: function () {
        return this.labels[this.values.indexOf(difficulty)];
      },
      labels: ['Easy', 'Medium', 'Difficult', 'Any Difficulty'],
      values: ['easy', 'medium', 'difficult', ''],
      icon: (
        <Gauge
          size={16}
          className="pointer-events-none inline-block text-[#0B7A31]"
        />
      ),
      onSelect: function (selectedOption) {
        setDifficulty(selectedOption);
        // console.log('difficulty clicked');
      },
    },
    {
      key: 'sort',
      name: 'Sort',
      selectedValue: function () {
        return this.labels[this.values.indexOf(sortBy)];
      },
      labels: [
        'Price: Low to High',
        'Price: High to Low',
        'Rating',
        'Duration',
      ],
      values: ['price', '-price', '-ratingsAverage', 'duration'],
      icon: (
        <Filter
          size={16}
          className="pointer-events-none inline-block text-[#0B7A31]"
        />
      ),
      onSelect: function (selectedOption) {
        setSortBy(selectedOption);
        // console.log('sort by clicked');
      },
    },
  ];

  const handleCloseFilterSheet = function () {
    discardFilterChanges();
    setShowFilterSheet(false);
  };

  const handleApplyFilters = function (e) {
    e?.preventDefault();
    applyFilters();
    setShowFilterSheet(false);
  };

  const handleSelectFilter = function (filter) {
    // console.log(filter);

    setSelectedFilter(filter);

    if (filter.key === 'destination') {
      setSelectedOption(destination);
    }

    if (filter.key === 'duration') {
      setSelectedOption(duration);
    }

    if (filter.key === 'difficulty') {
      setSelectedOption(difficulty);
    }

    if (filter.key === 'sort') {
      setSelectedOption(sortBy);
    }

    setFilterSheetContent('filterOptions');
  };

  const handleSelectOption = function (value) {
    const filter = filterItems.find((item) => item.key === selectedFilter.key);
    setSelectedOption(value);
    filter.onSelect(value);
    setFilterSheetContent('filter');
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 600);

    return () => {
      clearTimeout(timer);
    };
  }, [search]);

  useEffect(() => {
    const controller = new AbortController();

    const queryString = new URLSearchParams();

    if (debouncedSearch.trim() !== '') {
      queryString.append('search', debouncedSearch.toLowerCase().trim());
    }

    if (appliedFilters.destination !== '') {
      queryString.append('destination', appliedFilters.destination);
    }

    if (appliedFilters.duration !== '') {
      queryString.append(
        'duration[gte]',
        appliedFilters.duration.split('-')[0],
      );

      if (appliedFilters.duration.split('-')[1] !== '+') {
        queryString.append(
          'duration[lte]',
          appliedFilters.duration.split('-')[1],
        );
      }
    }

    if (appliedFilters.difficulty !== '') {
      queryString.append('difficulty', appliedFilters.difficulty);
    }

    queryString.append('sort', appliedFilters.sortBy);

    getAllTours(`?${queryString.toString()}`, controller.signal);

    return () => {
      controller.abort();
    };
  }, [debouncedSearch, appliedFilters, getAllTours]);

  return (
    <>
      {/* Mobile filters */}
      {/* Mobile filters */}
      <form
        onSubmit={(e) => e.preventDefault()}
        className="shadow-overview xs:-mt-24 xs:p-4 mx-auto -mt-22 grid w-11/12 max-w-3xl grid-cols-1 gap-3 rounded-2xl border border-[#E5E7EB] bg-white p-3 sm:-mt-26 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center lg:hidden"
      >
        {/* Search */}
        <div className="relative min-w-0">
          <Search
            size={16}
            className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-[#6B7280]"
          />

          <input
            className="font-inter xs:text-base xs:placeholder:text-sm h-11 w-full rounded-xl border border-[#E5E7EB] bg-[#F9FAFB] pr-3 pl-9 text-base font-normal text-[#111827] transition-all duration-200 outline-none placeholder:text-xs placeholder:font-light placeholder:text-[#9CA3AF] focus:border-[#0B7A31] focus:bg-white focus:ring-2 focus:ring-[#0B7A31]/15"
            name="search"
            type="search"
            enterKeyHint="search"
            placeholder="Search tours..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Filters button */}
        <button
          type="button"
          onClick={() => {
            setShowFilterSheet(true);
            setFilterSheetContent('filter');
          }}
          className="font-inter mx-auto flex min-h-11 w-full max-w-56 cursor-pointer items-center justify-center gap-2 rounded-xl border border-[#CFE0D5] bg-[#F3F8F5] px-5 py-2.5 text-sm font-semibold text-[#0B7A31] transition-all duration-200 hover:border-[#0B7A31] hover:bg-[#EAF5EE] focus-visible:ring-2 focus-visible:ring-[#0B7A31]/20 focus-visible:outline-none sm:w-auto sm:max-w-none sm:min-w-28"
        >
          <SlidersHorizontal
            size={17}
            strokeWidth={2}
            className="pointer-events-none shrink-0"
          />

          <span>Filters</span>
        </button>
      </form>

      {showFilterSheet && (
        <MobileFilterSheet onClose={handleCloseFilterSheet}>
          {filterSheetContent === 'filter' && (
            <FilterMenuItems
              items={filterItems}
              onSelect={handleSelectFilter}
              onClearAll={clearFilters}
              onApplyFilters={handleApplyFilters}
              hasPendingFilterChanges={hasPendingFilterChanges}
              onClose={handleCloseFilterSheet}
            />
          )}

          {filterSheetContent === 'filterOptions' && (
            <FilterOptions
              selectedFilter={selectedFilter}
              onSelectOption={handleSelectOption}
              selectedOption={selectedOption}
            />
          )}
        </MobileFilterSheet>
      )}
      {/* desktop filters */}
      <div className="mx-auto -mt-26 hidden max-w-6xl lg:block 2xl:max-w-7xl">
        <form
          onSubmit={handleApplyFilters}
          className="shadow-overview mx-auto -mt-26 hidden h-22 max-w-6xl items-center justify-center gap-3 rounded-2xl border border-[#E5E7EB] bg-white px-4 py-4 lg:flex xl:gap-4 xl:px-5 2xl:max-w-7xl 2xl:gap-5"
        >
          <div className="relative flex h-full items-center">
            <Search
              size={16}
              className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-[#6B7280]"
            />

            <input
              className="font-inter h-11 w-44 rounded-xl border border-[#E5E7EB] bg-[#F9FAFB] px-3 pl-9 text-xs font-normal text-[#111827] transition-all duration-300 outline-none placeholder:text-xs placeholder:font-light placeholder:text-[#9CA3AF] focus:border-[#0B7A31] focus:bg-white focus:ring-2 focus:ring-[#0B7A31]/15 xl:w-52 xl:text-sm"
              name="search"
              type="text"
              placeholder="Search tours..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <DesktopDropdown
            value={destination}
            onChange={setDestination}
            className="w-40 xl:w-44"
            icon={<MapPin size={16} />}
            options={[
              { value: '', label: 'All Destinations' },
              { value: 'usa', label: 'USA' },
              { value: 'can', label: 'Canada' },
            ]}
          />

          <DesktopDropdown
            value={duration}
            onChange={setDuration}
            className="w-36 xl:w-40"
            icon={<Calendar size={16} />}
            options={[
              { value: '', label: 'Any Duration' },
              { value: '1-3', label: '1–3 Days' },
              { value: '4-7', label: '4–7 Days' },
              { value: '8-10', label: '8–10 Days' },
              { value: '10-+', label: '10+ Days' },
            ]}
          />

          <DesktopDropdown
            value={difficulty}
            onChange={setDifficulty}
            className="w-36 xl:w-40"
            icon={<Gauge size={16} />}
            options={[
              { value: '', label: 'Any Difficulty' },
              { value: 'easy', label: 'Easy' },
              { value: 'medium', label: 'Medium' },
              { value: 'difficult', label: 'Difficult' },
            ]}
          />

          <DesktopDropdown
            value={sortBy}
            onChange={setSortBy}
            className="w-40 xl:w-48"
            icon={<ArrowUpDown size={16} />}
            options={[
              { value: '-ratingsAverage', label: 'Rating' },
              { value: 'price', label: 'Price: Low to High' },
              { value: '-price', label: 'Price: High to Low' },
              { value: 'duration', label: 'Duration' },
            ]}
          />

          <button
            type="submit"
            disabled={!hasPendingFilterChanges}
            className={`h-11 rounded-xl px-5 text-xs font-bold uppercase transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-[#0B7A31]/25 focus-visible:ring-offset-2 xl:px-6 xl:text-sm ${
              hasPendingFilterChanges
                ? 'cursor-pointer bg-[#0B7A31] text-white hover:bg-[#0A6B2B] hover:shadow-[0_0.5rem_1rem_rgba(0,0,0,0.12)]'
                : 'cursor-not-allowed border border-[#DCE6DF] bg-[#F1F5F2] text-[#718078]'
            }`}
          >
            Apply Filters
          </button>
        </form>
      </div>
    </>
  );
}
