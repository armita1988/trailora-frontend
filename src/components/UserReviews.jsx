import { useReviews } from '../contexts/ReviewContext';
import ReviewItem from './ReviewItem';

export default function UserReviews() {
  const { reviews } = useReviews();

  // useEffect(() => {
  //   getMyReviews();
  // }, []);

  return (
    <div className="flex w-full flex-1 flex-col items-stretch">
      <div className="xs:px-6 mx-auto w-full rounded-2xl border border-[#E2E8F0] bg-white px-5 py-7 shadow-[0_10px_30px_rgba(15,23,42,0.06)] sm:px-8 sm:py-9 lg:px-10">
        <h2 className="mb-2 text-xl font-semibold tracking-tight text-[#0B7A31] sm:text-2xl">
          Your reviews
        </h2>

        <p className="mb-7 text-sm leading-6 font-normal text-[#64748B]">
          View, edit, or remove reviews from your past tour experiences.
        </p>

        <ul className="flex w-full flex-col items-stretch gap-5 lg:gap-6">
          {reviews.map((review) => (
            <ReviewItem review={review} key={review._id} />
          ))}
        </ul>
      </div>
    </div>
  );
}
