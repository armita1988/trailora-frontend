import { useState } from 'react';
import icons from '../../public/imgs/icons.svg';
import { formatDate } from '../utils/formatDate';
import Rating from './Rating/Rating';
import { useReviews } from '../contexts/ReviewContext';
import { useNavigate } from 'react-router-dom';

export default function ReviewForm({
  review = '',
  rating = 1,
  tourName,
  bookingId,
  onClose,
  imageCover,
  startLocation,
  startDate,
  endDate,
  isEditing = false,
  tourId = null,
  reviewId = null,
}) {
  const [userRate, setUserRate] = useState(rating);
  const [previewRate, setPreviewRate] = useState();
  const [userReview, setUserReview] = useState(review);

  const { createReview, updateReview } = useReviews();
  const navigate = useNavigate();

  const handleSubmitReview = async function (e) {
    e.preventDefault();

    const reviewData = {
      booking: bookingId,
      review: userReview,
      rating: userRate,
    };

    if (isEditing) {
      await updateReview(reviewId, reviewData);
    } else {
      await createReview(tourId, reviewData);
    }

    onClose();
    navigate('/me/reviews');
  };

  return (
    <div className="xs:px-6 xs:py-6 relative mx-auto w-full max-w-md rounded-2xl border border-[#E2E8F0] bg-white px-5 py-5 shadow-[0_22px_55px_rgba(15,23,42,0.16)]">
      <button
        type="button"
        onClick={onClose}
        aria-label="Close review form"
        className="absolute top-3 right-3 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full text-xl leading-none text-[#64748B] transition-colors duration-200 hover:bg-[#F1F5F9] hover:text-[#0F172A]"
      >
        &times;
      </button>

      <div className="flex flex-col gap-6 text-[#0F172A]">
        <h2 className="xs:text-xl pr-10 text-lg leading-tight font-semibold tracking-tight text-[#0F172A]">
          {`${isEditing ? 'Edit' : 'Write'} review`}
        </h2>

        <section className="xs:p-4 flex flex-col gap-3 rounded-xl border border-[#E2E8F0] bg-[#F8FAF9] p-3.5">
          <div className="xs:flex-row xs:items-center xs:gap-4 flex flex-col gap-3">
            <img
              src={`${import.meta.env.VITE_BACKEND_URL}/img/tours/${imageCover}`}
              alt={tourName}
              className="xs:h-24 xs:w-32 h-32 w-full shrink-0 rounded-lg object-cover object-center sm:h-26 sm:w-36"
            />

            <div className="flex min-w-0 flex-col gap-2.5 text-sm font-normal text-[#64748B]">
              <h2 className="text-base leading-snug font-semibold text-[#0F172A]">
                {tourName}
              </h2>

              <div className="flex items-start gap-2">
                <svg className="mt-0.5 h-4 w-4 shrink-0 fill-current text-[#0B7A31]">
                  <use xlinkHref={`${icons}#icon-map-pin`}></use>
                </svg>

                <span className="text-[13px] leading-5">{startLocation}</span>
              </div>

              <div className="flex items-start gap-2">
                <svg className="mt-0.5 h-4 w-4 shrink-0 fill-current text-[#0B7A31]">
                  <use xlinkHref={`${icons}#icon-calendar`}></use>
                </svg>

                <span className="text-[13px] leading-5">
                  {`${formatDate(startDate).split(',')[0]} - ${formatDate(
                    endDate,
                  )}`}
                </span>
              </div>
            </div>
          </div>
        </section>

        <section className="flex flex-col gap-2.5 pb-0">
          <h2 className="text-sm font-semibold text-[#334155]">Your rating</h2>

          <Rating
            maxRating={5}
            defaultRating={userRate}
            color="#F4B400"
            onSetExtenalRate={setUserRate}
            onSetExtenalHoverRate={setPreviewRate}
          />

          <p className="text-xs leading-5 font-normal text-[#64748B]">
            Select a star to rate your experience.
          </p>

          <form
            onSubmit={handleSubmitReview}
            className="mt-5 flex w-full flex-col gap-12"
          >
            <div className="flex flex-col items-start gap-2">
              <label
                htmlFor="review"
                className="text-sm font-semibold text-[#334155]"
              >
                Your review
              </label>

              <textarea
                className="font-inter min-h-30 w-full resize-none rounded-xl border border-[#DCE3E0] bg-[#F8FAF9] px-4 py-3 text-sm leading-6 font-normal text-[#334155] transition-colors duration-200 placeholder:text-[#94A3B8] focus:border-[#0B7A31] focus:bg-white focus:ring-2 focus:ring-[#0B7A31]/10 focus:outline-none"
                placeholder="Share what you enjoyed and any helpful tips for other travelers..."
                id="review"
                value={userReview}
                onChange={(e) => setUserReview(e.target.value)}
                required
              />
            </div>

            <div className="flex w-full items-center gap-3">
              <button
                onClick={onClose}
                type="button"
                className="min-h-11 flex-1 cursor-pointer rounded-xl border border-[#CBD5E1] bg-white px-4 py-2.5 text-sm font-semibold text-[#475569] transition-colors duration-200 hover:border-[#94A3B8] hover:bg-[#F8FAFC] hover:text-[#0F172A]"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="min-h-11 flex-1 cursor-pointer rounded-xl bg-[#0B7A31] px-4 py-2.5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-[#096529] focus:ring-2 focus:ring-[#0B7A31]/20 focus:outline-none"
              >
                {isEditing ? 'Save changes' : 'Submit review'}
              </button>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
}
