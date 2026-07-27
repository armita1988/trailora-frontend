import { useTours } from '../contexts/ToursContext';
import Spinner from './Spinner';
import TourItem from './TourItem';
import Toast from './Toast';

export default function TourList() {
  const { tours, error, isLoading } = useTours();

  if (isLoading) return <Spinner />;
  if (error) {
    return <Toast error={error} />;
  }

  return (
    <div className="xs:max-w-md mx-auto mt-4 flex max-w-7xl flex-col items-center gap-6 sm:max-w-4xl">
      <p className="self-start text-sm font-normal text-[#64748B]">
        <span className="font-semibold">{tours.length}</span>
        {tours.length === 1 ? ' tour found' : ' tours found'}
      </p>

      <div className="grid max-w-7xl grid-cols-1 gap-7 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3 lg:gap-9 xl:gap-10">
        {tours.map((tour) => (
          <TourItem key={tour._id} tour={tour} />
        ))}
      </div>
    </div>
  );
}
