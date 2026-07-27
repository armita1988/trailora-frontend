import { useState } from 'react';
import { useBookings } from '../contexts/BookingsContext';
import { X } from 'lucide-react';
import Toast from './Toast';
import { useNavigate } from 'react-router-dom';

function formatDate(
  date,
  options = {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  },
  locales = 'en-US',
) {
  return new Date(date).toLocaleDateString(locales, options);
}

export default function Reservation({ selectedTour, user, onClose }) {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const [numberOfTravelers, setNumberOfTravelers] = useState(1);
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState('');
  const [request, setRequest] = useState('');
  const [toast, setToast] = useState(null);
  const navigate = useNavigate();

  const {
    createCheckoutSession,
    createBooking,
    isLoading: isCreatingCheckout,
  } = useBookings();

  const unitPrice = Number(selectedTour?.price) || 0;
  const travellersCount = Number(numberOfTravelers) || 1;
  const totalPrice = unitPrice * travellersCount;

  const currency = selectedTour?.currency?.toUpperCase() || 'CAD';

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-CA', {
      style: 'currency',
      currency,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const handleBooking = async function (e) {
    e.preventDefault();
    await createCheckoutSession(
      selectedTour._id,
      numberOfTravelers,
      request,
      phone,
    );
  };

  const handlePayLater = async function (e) {
    try {
      //   console.log('pay later clicked');
      e.preventDefault();
      let startDate = formatDate(selectedTour.nextStartDate);
      let endDate = new Date(startDate);
      formatDate(
        endDate.setDate(endDate.getDate() + selectedTour.duration - 1),
      );

      await createBooking(
        selectedTour,
        user,
        selectedTour.price * numberOfTravelers,
        'unpaid',
        'pending',
        user.email,
        user.name,
        selectedTour.name,
        selectedTour.imageCover,
        startDate,
        endDate,
        request,
        numberOfTravelers,
        phone,
      );
      setToast({ status: 'success', message: 'you successfully booked.' });
      navigate('/me/bookings');
    } catch (err) {
      setToast({ status: 'error', message: err.message });
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

      <div className="font-inter relative mx-auto flex max-h-[calc(100dvh-2rem)] w-[calc(100%-1.5rem)] max-w-xl flex-col overflow-hidden rounded-xl border border-[#E2E8F0] bg-white shadow-[0_24px_70px_rgba(15,23,42,0.22)] sm:max-h-[calc(100dvh-3rem)]">
        {/* Tour image and main information */}
        <div className="relative h-44 w-full shrink-0 overflow-hidden sm:h-48">
          <img
            className="h-full w-full object-cover object-center"
            src={`${BACKEND_URL}/img/tours/${selectedTour?.imageCover}`}
            alt={`${selectedTour?.name ?? 'Tour'} cover`}
          />
          <button
            type="button"
            onClick={onClose}
            className="absolute top-3 right-3 z-10 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-white text-xl leading-none font-normal text-[#64748B] transition-colors duration-200 hover:bg-[#F1F5F9] hover:text-[#0F172A]"
          >
            <X size={18} />
          </button>

          <div className="absolute inset-0 bg-linear-to-t from-[#0F172A]/80 via-[#0F172A]/15 to-transparent" />

          <div className="absolute right-5 bottom-4 left-5 flex items-end justify-between gap-4 sm:right-6 sm:left-6">
            <div className="min-w-0">
              <p className="text-xs font-semibold tracking-wide text-white/75 uppercase">
                Tour reservation
              </p>

              <h2 className="mt-1 truncate text-xl leading-tight font-semibold tracking-tight text-white sm:text-2xl">
                {selectedTour?.name}
              </h2>
            </div>

            <div className="flex shrink-0 flex-col items-center gap-1 rounded-xl border border-white/30 bg-white/95 px-3 py-2 text-right shadow-sm backdrop-blur-sm">
              <p className="text-base leading-none font-bold text-[#0B7A31] sm:text-lg">
                {formatPrice(unitPrice)}
              </p>

              <p className="mt-1 text-[10px] font-medium tracking-wide text-[#64748B] uppercase">
                per traveller
              </p>
            </div>
          </div>
        </div>

        {/* Scrollable content */}
        <div className="xs:px-6 min-h-0 flex-1 overflow-y-auto px-5 py-6 sm:px-8 sm:py-7">
          <div className="mb-6">
            <h3 className="text-xl font-semibold tracking-tight text-[#0F172A] sm:text-2xl">
              Complete your reservation
            </h3>

            <p className="mt-2 text-sm leading-6 font-normal text-[#64748B]">
              Confirm your contact details and review the booking summary before
              continuing.
            </p>
          </div>

          <form onSubmit={handleBooking} className="flex w-full flex-col gap-5">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              {/* Number of travellers */}
              <div className="flex flex-col items-start gap-2">
                <label
                  htmlFor="guests"
                  className="text-sm font-semibold text-[#334155]"
                >
                  Number of travellers
                </label>

                <input
                  className="h-12 w-full rounded-xl border border-[#DCE3E0] bg-[#F8FAF9] px-4 text-sm font-medium text-[#334155] transition-colors duration-200 focus:border-[#0B7A31] focus:bg-white focus:ring-2 focus:ring-[#0B7A31]/10 focus:outline-none"
                  id="guests"
                  name="numberOfTravelers"
                  type="number"
                  min={1}
                  max={selectedTour?.maxGroupSize}
                  value={numberOfTravelers}
                  onChange={(e) => setNumberOfTravelers(e.target.value)}
                  required
                />

                <p className="text-xs leading-5 text-[#94A3B8]">
                  Maximum {selectedTour?.maxGroupSize} travellers
                </p>
              </div>

              {/* Phone */}
              <div className="flex flex-col items-start gap-2">
                <label
                  htmlFor="phone"
                  className="text-sm font-semibold text-[#334155]"
                >
                  Contact Phone number
                </label>

                <input
                  className="h-12 w-full rounded-xl border border-[#DCE3E0] bg-[#F8FAF9] px-4 text-sm font-normal text-[#334155] transition-colors duration-200 placeholder:text-[#94A3B8] focus:border-[#0B7A31] focus:bg-white focus:ring-2 focus:ring-[#0B7A31]/10 focus:outline-none"
                  id="phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  placeholder="+1 555 000 0000"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div className="flex flex-col items-start gap-2">
              <label
                htmlFor="email"
                className="text-sm font-semibold text-[#334155]"
              >
                Contact email
              </label>

              <input
                className="h-12 w-full rounded-xl border border-[#DCE3E0] bg-[#F8FAF9] px-4 text-sm font-normal text-[#334155] transition-colors duration-200 placeholder:text-[#94A3B8] focus:border-[#0B7A31] focus:bg-white focus:ring-2 focus:ring-[#0B7A31]/10 focus:outline-none"
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="example@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled
              />

              <p className="text-xs leading-5 text-[#94A3B8]">
                Booking confirmation will be sent to this address.
              </p>
            </div>

            {/* Special request */}
            <div className="flex flex-col items-start gap-2">
              <div className="flex w-full items-center justify-between gap-4">
                <label
                  htmlFor="request"
                  className="text-sm font-semibold text-[#334155]"
                >
                  Special request
                </label>

                <span className="text-xs font-normal text-[#94A3B8]">
                  Optional
                </span>
              </div>

              <textarea
                className="min-h-28 w-full resize-none rounded-xl border border-[#DCE3E0] bg-[#F8FAF9] px-4 py-3.5 text-sm leading-6 font-normal text-[#334155] transition-colors duration-200 placeholder:text-[#94A3B8] focus:border-[#0B7A31] focus:bg-white focus:ring-2 focus:ring-[#0B7A31]/10 focus:outline-none"
                id="request"
                name="request"
                placeholder="Dietary needs, accessibility requests, or anything else we should know..."
                value={request}
                onChange={(e) => setRequest(e.target.value)}
              />
            </div>

            {/* Reservation summary */}
            <section className="rounded-2xl border border-[#DCE7E0] bg-[#F7FAF8] p-4 sm:p-5">
              <h4 className="mb-4 text-sm font-semibold tracking-wide text-[#0F172A]">
                Reservation summary
              </h4>

              <div className="flex flex-col gap-3 text-sm">
                <div className="flex items-start justify-between gap-5">
                  <span className="text-[#64748B]">Tour</span>

                  <span className="max-w-[65%] text-right font-semibold text-[#334155]">
                    {selectedTour?.name}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-5">
                  <span className="text-[#64748B]">Travellers</span>

                  <span className="font-semibold text-[#334155]">
                    {travellersCount}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-5">
                  <span className="text-[#64748B]">Price per traveller</span>

                  <span className="font-semibold text-[#334155]">
                    {formatPrice(unitPrice)}
                  </span>
                </div>

                <div className="mt-1 flex items-end justify-between gap-5 border-t border-[#DCE7E0] pt-4">
                  <div>
                    <p className="font-semibold text-[#0F172A]">Total</p>

                    <p className="mt-1 text-xs text-[#94A3B8]">
                      {`${formatPrice(unitPrice)} × ${travellersCount} travellers`}
                    </p>
                  </div>

                  <span className="text-xl font-bold tracking-tight text-[#0B7A31]">
                    {formatPrice(totalPrice)}
                  </span>
                </div>
              </div>
            </section>

            {/* Actions */}
            <div className="xs:flex-row xs:justify-end mt-1 flex flex-col-reverse gap-3 border-t border-[#E2E8F0] pt-5">
              <button
                onClick={handlePayLater}
                type="button"
                className="xs:w-auto min-h-11 w-full cursor-pointer rounded-xl border border-[#CFE0D5] bg-white px-5 py-2.5 text-sm font-semibold text-[#0B7A31] transition-colors duration-200 hover:border-[#0B7A31] hover:bg-[#F3F8F5] focus-visible:ring-2 focus-visible:ring-[#0B7A31]/15 focus-visible:outline-none"
              >
                Pay later
              </button>

              <button
                type="submit"
                disabled={isCreatingCheckout}
                className="xs:w-auto min-h-11 w-full cursor-pointer rounded-xl bg-[#0B7A31] px-6 py-2.5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-[#096529] focus-visible:ring-2 focus-visible:ring-[#0B7A31]/20 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isCreatingCheckout
                  ? 'Preparing payment...'
                  : `Continue to payment · ${formatPrice(totalPrice)}`}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
