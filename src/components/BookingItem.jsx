import { Link, NavLink } from 'react-router-dom';
import icons from '../../public/imgs/icons.svg';
import { formatDate } from '../utils/formatDate';
import { useState } from 'react';
import Modal from './Modal';
import Invoice from './Invoice';
import ReviewForm from './ReviewForm';
import { useBookings } from '../contexts/BookingsContext';
import Toast from './Toast';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const bookingStatusStyles = {
  confirmed: 'border-[#BBF7D0] bg-[#ECFDF3] text-[#15803D]',
  // pending: 'border-[#BFDBFE] bg-[#EFF6FF] text-[#1D4ED8]',
  pending: 'border-[#FDE68A] bg-[#FFFBEB] text-[#B45309]',
  upcoming: 'border-[#A7F3D0] bg-[#F0FDF4] text-[#047857]',
  completed: 'border-[#CBD5E1] bg-[#F8FAFC] text-[#475569]',
  cancelled: 'border-[#FECACA] bg-[#FEF2F2] text-[#B91C1C]',
  expired: 'border-[#FECACA] bg-[#FEF2F2] text-[#B91C1C]',
};

const paymentStatusStyles = {
  paid: 'border-[#BBF7D0] bg-[#ECFDF3] text-[#15803D]',
  unpaid: 'border-[#FDE68A] bg-[#FFFBEB] text-[#B45309]',
  pending: 'border-[#BFDBFE] bg-[#EFF6FF] text-[#1D4ED8]',
  failed: 'border-[#FECACA] bg-[#FEF2F2] text-[#B91C1C]',
  refunded: 'border-[#DDD6FE] bg-[#F5F3FF] text-[#6D28D9]',
};

export default function BookingItem({ booking }) {
  const [invoiceModalIsOpen, setInvoiceModalIsOpen] = useState(false);
  const [reviewModalIsOpen, setReviewModalIsOpen] = useState(false);
  const [toast, setToast] = useState(null);
  const { createCheckoutSession, updateBooking } = useBookings();
  const [cancelModalIsOpen, setCancelModalIsOpen] = useState(false);
  const [isCancelling, setIsCancelling] = useState(false);

  let startDate = new Date(booking?.tour?.nextStartDate);
  let endDate = new Date(startDate);
  endDate.setDate(endDate.getDate() + booking.tour.duration - 1);

  const today = new Date();
  // today.setMonth(today.getMonth() + 3);
  let bookingStatus = booking.bookingStatus;

  if (booking.bookingStatus === 'confirmed') {
    if (today > endDate) {
      bookingStatus = 'completed';
    } else if (today < startDate) {
      bookingStatus = 'upcoming';
    }
  }

  if (booking.bookingStatus === 'pending' && today >= startDate) {
    bookingStatus = 'expired';
  }

  const handlePayNow = async function (e) {
    e.preventDefault();
    await createCheckoutSession(
      booking.tour.id,
      booking.numberOfTravelers,
      booking.request,
      booking.phone,
      booking._id,
    );
  };

  const handleConfirmCancelBooking = async function (e) {
    e.preventDefault();
    setToast(null);
    setIsCancelling(true);

    try {
      await updateBooking(booking._id);
      setCancelModalIsOpen(false);
      setToast({
        status: 'success',
        message: 'Booking cancelled successfully.',
      });
    } catch (err) {
      setToast({
        status: 'error',
        message: err.message,
      });
    } finally {
      setIsCancelling(false);
    }
  };

  return (
    <>
      {toast && (
        <Toast
          message={toast.message}
          status={toast.status}
          handleShow={() => setToast(null)}
        />
      )}
      <div
        id={booking.tour.slug}
        className="mx-auto flex w-full max-w-lg flex-col overflow-hidden rounded-2xl border border-[#E2E8F0] bg-white shadow-[0_8px_24px_rgba(15,23,42,0.07)] lg:max-w-none lg:flex-row"
      >
        <div className="aspect-video w-full shrink-0 overflow-hidden lg:aspect-auto lg:min-h-72 lg:w-2/5 xl:w-[36%]">
          <NavLink
            to={`/tour/${booking.tour.slug}`}
            state={{ tourId: `${booking.tour._id}` }}
          >
            <img
              className="h-full w-full object-cover object-center"
              src={`${BACKEND_URL}/img/tours/${booking.imageCover}`}
              alt={`${booking?.tour?.name} cover`}
            />
          </NavLink>
        </div>

        <div className="flex w-full flex-col lg:w-3/5 xl:w-[64%]">
          <div className="xs:px-6 xs:py-6 flex grow flex-col gap-5 px-5 py-5 text-[#64748B] lg:px-7 lg:py-7">
            <div className="xs:flex-row xs:justify-between xs:gap-4 flex flex-col items-start gap-3">
              <h2 className="text-lg leading-6 font-semibold tracking-tight text-[#0F172A] lg:text-xl lg:leading-7">
                <NavLink
                  to={`/tour/${booking.tour.slug}`}
                  state={{ tourId: `${booking.tour._id}` }}
                >
                  {booking?.tour?.name}
                </NavLink>
              </h2>

              <p
                className={`flex shrink-0 items-center rounded-full border px-3 py-1.5 text-[0.68rem] leading-none font-semibold tracking-wide uppercase ${
                  bookingStatusStyles[bookingStatus] ?? ''
                }`}
              >
                <span>{bookingStatus}</span>
              </p>
            </div>

            <div className="xs:grid-cols-2 xs:gap-6 grid grid-cols-1 gap-5 lg:gap-7">
              <div className="flex flex-col gap-3.5">
                <div className="flex items-start gap-2.5 text-sm leading-5 font-normal text-[#64748B]">
                  <svg className="mt-0.5 h-4.5 w-4.5 shrink-0 fill-current text-[#0B7A31]">
                    <use xlinkHref={`${icons}#icon-map-pin`}></use>
                  </svg>

                  <span>{booking.tour.startLocation?.description}</span>
                </div>

                <div className="flex items-start gap-2.5 text-sm leading-5 font-normal text-[#64748B]">
                  <svg className="mt-0.5 h-4.5 w-4.5 shrink-0 fill-current text-[#0B7A31]">
                    <use xlinkHref={`${icons}#icon-calendar`}></use>
                  </svg>

                  <span>
                    {`${formatDate(startDate).split(',')[0]} - ${formatDate(endDate)}`}
                  </span>
                </div>

                <div className="flex items-start gap-2.5 text-sm leading-5 font-normal text-[#64748B]">
                  <svg className="mt-0.5 h-4.5 w-4.5 shrink-0 fill-current text-[#0B7A31]">
                    <use xlinkHref={`${icons}#icon-user`}></use>
                  </svg>

                  <span>{`Guests Booked: ${booking.numberOfTravelers}`}</span>
                </div>
              </div>

              <div className="xs:items-end xs:border-t-0 xs:pt-0 flex flex-col items-start justify-end gap-3 border-t border-[#E2E8F0] pt-4 md:pt-4 lg:items-end lg:border-t-0 lg:pt-0">
                <div className="flex items-baseline gap-1.5">
                  <span className="text-xl font-semibold tracking-tight text-[#0F172A]">
                    {`$${booking.price}`}
                  </span>

                  <span className="text-xs font-medium tracking-wide text-[#64748B] uppercase">
                    {booking.currency}
                  </span>
                </div>

                <p className="flex items-center gap-1.5">
                  <svg
                    className={`h-4.5 w-4.5 shrink-0 fill-current ${paymentStatusStyles[`${booking.paymentStatus}`]}`}
                  >
                    <use xlinkHref={`${icons}#icon-check-circle`}></use>
                  </svg>

                  <span
                    className={`text-xs font-semibold tracking-wide ${paymentStatusStyles[`${booking.paymentStatus}`]} uppercase`}
                  >
                    {booking.paymentStatus}
                  </span>
                </p>
              </div>
            </div>
          </div>

          <div
            className={`${bookingStatus === 'cancelled' || bookingStatus === 'expired' ? 'hidden' : ''} xs:grid-cols-2 xs:px-6 grid grid-cols-1 gap-2.5 border-t border-[#E2E8F0] bg-[#F8FAFC] px-5 py-4 lg:px-7`}
          >
            {/* <Link
              className="flex min-h-10 w-full items-center justify-center rounded-lg bg-[#0B7A31] px-4 py-2.5 text-[13px] font-semibold text-white transition-colors duration-200 hover:bg-[#096529] focus:ring-2 focus:ring-[#0B7A31]/20 focus:outline-none"
              to={`/tour/${booking.tour.slug}`}
              state={{ tourId: `${booking.tour._id}` }}
            >
              View tour
            </Link> */}
            {bookingStatus === 'upcoming' || bookingStatus === 'completed' ? (
              <button
                className={`flex min-h-10 w-full cursor-pointer items-center justify-center rounded-lg border border-[#D7E4DB] bg-white px-4 py-2.5 text-[0.81rem] font-semibold text-[#0B7A31] transition-colors duration-200 hover:border-[#0B7A31] hover:bg-[#F0F7F2] focus:ring-2 focus:ring-[#0B7A31]/10 focus:outline-none`}
                onClick={(e) => {
                  e.preventDefault();
                  setInvoiceModalIsOpen(true);
                }}
              >
                Invoice
              </button>
            ) : (
              bookingStatus === 'pending' && (
                <>
                  <button
                    className={`flex min-h-10 w-full cursor-pointer items-center justify-center rounded-lg border border-[#D7E4DB] bg-white px-4 py-2.5 text-[13px] font-semibold text-[#0B7A31] transition-colors duration-200 hover:border-[#0B7A31] hover:bg-[#F0F7F2] focus:ring-2 focus:ring-[#0B7A31]/10 focus:outline-none`}
                    onClick={handlePayNow}
                  >
                    Pay now
                  </button>

                  <button
                    type="button"
                    className="flex min-h-10 w-full cursor-pointer items-center justify-center rounded-lg border border-[#FECACA] bg-white px-4 py-2.5 text-[13px] font-semibold text-[#B91C1C] transition-colors duration-200 hover:border-[#B91C1C] hover:bg-[#FEF2F2] focus:ring-2 focus:ring-[#B91C1C]/10 focus:outline-none"
                    onClick={(e) => {
                      e.preventDefault();
                      setCancelModalIsOpen(true);
                    }}
                  >
                    Cancel
                  </button>
                </>
              )
            )}

            {booking.paymentStatus === 'paid' && !booking.review && (
              <button
                className={`flex min-h-10 w-full items-center justify-center rounded-lg border px-4 py-2.5 text-[13px] font-semibold transition-colors duration-200 xl:col-span-1 ${
                  bookingStatus === 'upcoming' || bookingStatus === 'pending'
                    ? 'cursor-not-allowed border-[#DCE6DF] bg-[#F1F5F2] text-[#718078]'
                    : 'cursor-pointer border-[#C6DCCB] bg-[#EEF8F2] text-[#0B7A31] hover:border-[#0B7A31] hover:bg-[#E3F4EA]'
                } `}
                onClick={(e) => {
                  e.preventDefault();
                  setReviewModalIsOpen(true);
                }}
                disabled={bookingStatus === 'upcoming'}
              >
                {bookingStatus === 'upcoming'
                  ? 'Write review later'
                  : bookingStatus === 'completed'
                    ? 'Write review'
                    : ' '}
              </button>
            )}
          </div>

          {cancelModalIsOpen && (
            <Modal onClose={() => setCancelModalIsOpen(false)}>
              <div className="font-inter mx-auto w-[calc(100%-1.5rem)] max-w-sm rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-[0_20px_50px_rgba(15,23,42,0.18)]">
                <div className="mb-5">
                  <h2 className="text-lg font-semibold tracking-tight text-[#0F172A]">
                    Cancel this booking?
                  </h2>

                  <p className="mt-2 text-sm leading-6 text-[#64748B]">
                    Are you sure you want to cancel this booking? This action
                    cannot be undone.
                  </p>
                </div>

                <div className="xs:flex-row xs:justify-end flex flex-col-reverse gap-3">
                  <button
                    type="button"
                    onClick={() => setCancelModalIsOpen(false)}
                    disabled={isCancelling}
                    className="xs:w-auto min-h-10 w-full cursor-pointer rounded-lg border border-[#D7E4DB] bg-white px-4 py-2.5 text-[13px] font-semibold text-[#0B7A31] transition-colors duration-200 hover:border-[#0B7A31] hover:bg-[#F0F7F2] focus:ring-2 focus:ring-[#0B7A31]/10 focus:outline-none disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    Keep booking
                  </button>

                  <button
                    type="button"
                    onClick={handleConfirmCancelBooking}
                    disabled={isCancelling}
                    className="xs:w-auto min-h-10 w-full cursor-pointer rounded-lg border border-[#B91C1C] bg-[#B91C1C] px-4 py-2.5 text-[13px] font-semibold text-white transition-colors duration-200 hover:bg-[#991B1B] focus:ring-2 focus:ring-[#B91C1C]/20 focus:outline-none disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {isCancelling ? 'Cancelling...' : 'Yes, cancel booking'}
                  </button>
                </div>
              </div>
            </Modal>
          )}

          {invoiceModalIsOpen && (
            <Modal onClose={() => setInvoiceModalIsOpen(false)}>
              <Invoice
                booking={booking}
                onClose={() => setInvoiceModalIsOpen(false)}
              />
            </Modal>
          )}

          {reviewModalIsOpen && (
            <Modal onClose={() => setReviewModalIsOpen(false)}>
              <ReviewForm
                imageCover={booking?.imageCover}
                tourName={booking?.tourName}
                startLocation={booking?.tour.startLocation?.description}
                startDate={booking?.startDate}
                endDate={booking?.endDate}
                onClose={() => setReviewModalIsOpen(false)}
                bookingId={booking?._id}
                tourId={booking?.tour?._id}
              />
            </Modal>
          )}
        </div>
      </div>
    </>
  );
}
