import { useNavigate } from 'react-router-dom';
import icons from '../../public/imgs/icons.svg';
import { Star } from 'lucide-react';
import { formatDate } from '../utils/formatDate';
import { useState } from 'react';
import { useReviews } from '../contexts/ReviewContext';
import Modal from './Modal';
import ReviewForm from './ReviewForm';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export default function ReviewItem({ review }) {
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);

  const { deleteReview } = useReviews();
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);
  const [isDeletingReview, setIsDeletingReview] = useState(false);
  const navigate = useNavigate();

  const handleDeleteReveiw = async function (e) {
    e.preventDefault();
    setIsDeletingReview(true);
    await deleteReview(review._id);
    setIsDeletingReview(false);
    navigate('/me/reviews');
  };

  return (
    <div className="mx-auto flex w-full max-w-lg flex-col overflow-hidden rounded-2xl border border-[#E2E8F0] bg-white shadow-[0_8px_24px_rgba(15,23,42,0.07)] lg:max-w-none lg:flex-row">
      <div className="aspect-video w-full shrink-0 overflow-hidden lg:aspect-auto lg:min-h-72 lg:w-2/5 xl:w-[36%]">
        <img
          className="h-full w-full object-cover object-center"
          src={`${BACKEND_URL}/img/tours/${review?.booking?.imageCover}`}
          alt={`${review?.booking?.tourName ?? 'Tour'} cover`}
        />
      </div>

      <div className="flex w-full flex-col lg:w-3/5 xl:w-[64%]">
        <div className="xs:px-6 xs:py-6 flex grow flex-col gap-5 px-5 py-5 text-[#64748B] lg:px-7 lg:py-7">
          <div className="xs:flex-row xs:justify-between xs:gap-4 flex flex-col items-start gap-3">
            <h2 className="text-lg leading-6 font-semibold tracking-tight text-[#0F172A] lg:text-xl lg:leading-7">
              {review?.booking?.tourName}
            </h2>

            <p className="flex shrink-0 items-center gap-1.5 rounded-full border border-[#FDE68A] bg-[#FFFBEB] px-3 py-1.5 text-[0.72rem] leading-none font-semibold text-[#A16207]">
              <Star
                size={16}
                strokeWidth={2}
                className="fill-[#F4B400] text-[#F4B400]"
              />

              <span>{`${review.rating} / 5`}</span>
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-medium text-[#94A3B8]">
            <svg className="h-4 w-4 shrink-0 fill-current text-[#0B7A31]">
              <use xlinkHref={`${icons}#icon-calendar`}></use>
            </svg>

            <span>{`Reviewed on ${formatDate(review.createdAt)}`}</span>
          </div>

          <p className="grow rounded-xl border border-[#E2E8F0] bg-[#F8FAF9] px-4 py-4 text-sm leading-6 font-normal text-[#475569]">
            {review?.review}
          </p>
        </div>

        <div className="xs:px-6 grid grid-cols-2 gap-2.5 border-t border-[#E2E8F0] bg-[#F8FAFC] px-5 py-4 lg:px-7">
          <button
            onClick={() => setDeleteModalIsOpen(true)}
            type="button"
            className="flex min-h-10 w-full cursor-pointer items-center justify-center rounded-lg border border-[#FECACA] bg-white px-4 py-2.5 text-[13px] font-semibold text-[#B91C1C] transition-colors duration-200 hover:border-[#F87171] hover:bg-[#FEF2F2] focus:ring-2 focus:ring-[#B91C1C]/10 focus:outline-none"
          >
            Delete
          </button>

          <button
            onClick={() => setEditModalIsOpen(true)}
            type="button"
            className="flex min-h-10 w-full cursor-pointer items-center justify-center rounded-lg bg-[#0B7A31] px-4 py-2.5 text-[13px] font-semibold text-white transition-colors duration-200 hover:bg-[#096529] focus:ring-2 focus:ring-[#0B7A31]/20 focus:outline-none"
          >
            Edit review
          </button>
        </div>
      </div>

      {deleteModalIsOpen && (
        <Modal onClose={() => setDeleteModalIsOpen(false)}>
          <div className="font-inter mx-auto w-[calc(100%-1.5rem)] max-w-sm rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-[0_20px_50px_rgba(15,23,42,0.18)]">
            <div className="mb-5">
              <h2 className="text-lg font-semibold tracking-tight text-[#0F172A]">
                Delete this review?
              </h2>

              <p className="mt-2 text-sm leading-6 text-[#64748B]">
                Are you sure you want to delete this review? This action cannot
                be undone.
              </p>
            </div>

            <div className="xs:flex-row xs:justify-end flex flex-col-reverse gap-3">
              <button
                type="button"
                onClick={() => setDeleteModalIsOpen(false)}
                disabled={isDeletingReview}
                className="xs:w-auto min-h-10 w-full cursor-pointer rounded-lg border border-[#D7E4DB] bg-white px-4 py-2.5 text-[13px] font-semibold text-[#0B7A31] transition-colors duration-200 hover:border-[#0B7A31] hover:bg-[#F0F7F2] focus:ring-2 focus:ring-[#0B7A31]/10 focus:outline-none disabled:cursor-not-allowed disabled:opacity-60"
              >
                Keep review
              </button>

              <button
                type="button"
                onClick={handleDeleteReveiw}
                disabled={isDeletingReview}
                className="xs:w-auto min-h-10 w-full cursor-pointer rounded-lg border border-[#B91C1C] bg-[#B91C1C] px-4 py-2.5 text-[13px] font-semibold text-white transition-colors duration-200 hover:bg-[#991B1B] focus:ring-2 focus:ring-[#B91C1C]/20 focus:outline-none disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isDeletingReview ? 'Deleting...' : 'Yes, delete review'}
              </button>
            </div>
          </div>
        </Modal>
      )}

      {editModalIsOpen && (
        <Modal onClose={() => setEditModalIsOpen(false)}>
          <ReviewForm
            imageCover={review?.booking?.imageCover}
            tourName={review?.booking?.tourName}
            startLocation={review?.booking?.tour?.startLocation?.description}
            startDate={review?.booking?.startDate}
            endDate={review?.booking?.endDate}
            review={review?.review}
            rating={review?.rating}
            bookingId={review?.booking}
            reviewId={review?._id}
            isEditing={true}
            onClose={() => setEditModalIsOpen(false)}
          />
        </Modal>
      )}
    </div>
  );
}
