import TourList from '../components/ToursList';
import SearchBar from '../components/SearchBar';

export default function HomePage() {
  return (
    <div className="xs:px-6 z-10 w-full px-5 py-14 sm:px-8 md:px-10 lg:py-18 xl:py-20">
      <SearchBar />

      <TourList />
    </div>
  );
}
