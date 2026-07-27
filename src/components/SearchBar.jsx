import { useState } from 'react';
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
import SortMenu from './SortMenu';

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

export default function SearchBar() {
  const { getAllTours, error } = useTours();

  const [search, setSearch] = useState('');
  const [destination, setDestination] = useState('');
  const [duration, setDuration] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [sortBy, setSortBy] = useState('-ratingsAverage');
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
        console.log('destinations clicked');
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
        console.log('duration clicked');
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
        console.log('difficulty clicked');
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
        console.log('sort by clicked');
      },
    },
  ];

  const handleClearAll = function () {
    console.log('handleClearAll...');
    setDestination('');
    setDifficulty('');
    setDuration('');
  };

  const handleApplyFilters = async function (e) {
    console.log('on handleApplyFilters ... ');
    setShowFilterSheet(false);
    await handleSubmit(e);
  };

  // const handleSelectFilter = function (filter) {
  //   console.log(filter);
  //   setSelectedFilter(filter);
  //   setFilterSheetContent('filterOptions');
  // };

  const handleSelectFilter = function (filter) {
    console.log(filter);

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
    console.log('handleSelectedOption...', value);
    console.log('selectedFilter...', selectedFilter);
    const filter = filterItems.find((item) => item.key === selectedFilter.key);
    setSelectedOption(value);
    filter.onSelect(value);
    setFilterSheetContent('filter');
  };

  const handleSubmit = async function (e) {
    e.preventDefault();
    const queryString = new URLSearchParams();

    if (search !== '')
      queryString.append('search', search.toLowerCase().trim());
    if (destination !== '') queryString.append('destination', destination);
    if (duration !== '') {
      queryString.append('duration[gte]', duration.split('-')[0]);
      if (duration.split('-')[1] !== '+')
        queryString.append('duration[lte]', duration.split('-')[1]);
    }
    if (difficulty !== '') queryString.append('difficulty', difficulty);
    queryString.append('sort', sortBy);
    await getAllTours(`?${queryString.toString()}`, null);
  };

  return (
    <>
      {/* Mobile filters */}
      <form
        onSubmit={handleSubmit}
        className="shadow-overview xs:-mt-24 xs:p-4 mx-auto -mt-22 grid w-11/12 max-w-3xl grid-cols-2 gap-3 rounded-2xl border border-[#E5E7EB] bg-white p-3 sm:-mt-26 sm:grid-cols-[minmax(0,1fr)_auto_auto] sm:items-center lg:hidden"
      >
        <div className="relative col-span-2 min-w-0 sm:col-span-1">
          <Search
            size={16}
            className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-[#6B7280]"
          />

          <input
            className="font-inter xs:text-sm xs:placeholder:text-sm h-11 w-full rounded-xl border border-[#E5E7EB] bg-[#F9FAFB] pr-3 pl-9 text-xs font-normal text-[#111827] transition-all duration-200 outline-none placeholder:text-xs placeholder:font-light placeholder:text-[#9CA3AF] focus:border-[#0B7A31] focus:bg-white focus:ring-2 focus:ring-[#0B7A31]/15"
            name="search"
            type="search"
            enterKeyHint="search"
            placeholder="Search tours..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="font-inter flex min-h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#0B7A31] px-4 py-2.5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-[#096529] focus-visible:ring-2 focus-visible:ring-[#0B7A31]/25 focus-visible:ring-offset-2 focus-visible:outline-none sm:w-auto sm:min-w-26"
        >
          <Search
            size={16}
            strokeWidth={2}
            className="pointer-events-none shrink-0"
          />

          <span>Search</span>
        </button>

        <button
          onClick={() => {
            setShowFilterSheet(true);
            setFilterSheetContent('filter');
          }}
          type="button"
          className="font-inter flex min-h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-xl border border-[#CFE0D5] bg-[#F3F8F5] px-4 py-2.5 text-sm font-semibold text-[#0B7A31] transition-colors duration-200 hover:border-[#0B7A31] hover:bg-[#EAF5EE] focus-visible:ring-2 focus-visible:ring-[#0B7A31]/20 focus-visible:outline-none sm:w-auto sm:min-w-26"
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
        <MobileFilterSheet
          onClose={() => {
            setShowFilterSheet(false);
          }}
        >
          {filterSheetContent === 'filter' && (
            <FilterMenuItems
              items={filterItems}
              onSelect={handleSelectFilter}
              onClearAll={handleClearAll}
              onApplyFilters={handleApplyFilters}
              onClose={() => {
                setShowFilterSheet(false);
              }}
            />
          )}
          {/* {filterSheetContent === 'sort' && (
            <FilterOptions
              selectedFilter={filterItems.find((item) => item.key === 'sort')}
              onSelectOption={handleSelectOption}
              selectedOption={selectedOption}
            />
          )} */}
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
      <form
        onSubmit={handleSubmit}
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
            { value: 'price', label: 'Price: Low to High' },
            { value: '-price', label: 'Price: High to Low' },
            { value: '-ratingsAverage', label: 'Rating' },
            { value: 'duration', label: 'Duration' },
          ]}
        />

        <button
          type="submit"
          className="h-11 cursor-pointer rounded-xl bg-[#0B7A31] px-5 text-xs font-bold text-white uppercase transition-all duration-300 outline-none hover:bg-[#0A6B2B] hover:shadow-[0_0.5rem_1rem_rgba(0,0,0,0.12)] focus-visible:ring-2 focus-visible:ring-[#0B7A31]/25 focus-visible:ring-offset-2 xl:px-6 xl:text-sm"
        >
          Search
        </button>
      </form>
    </>
  );
}
