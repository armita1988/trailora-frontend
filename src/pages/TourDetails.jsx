import { NavLink, useLocation } from 'react-router-dom';
import { useTours } from '../contexts/ToursContext';
import { useEffect, useRef, useState } from 'react';
import { formatDate } from '../utils/formatDate';
import Toast from '../components/Toast';
import Spinner from '../components/Spinner';
import { useAuth } from '../contexts/AuthContext';
import TourMap from '../components/TourMap';
import { useBookings } from '../contexts/BookingsContext';
import {
  Calendar,
  Clock,
  Gauge,
  LucideGauge,
  LucideStar,
  MapPin,
  ShieldCheck,
  Star,
  StarIcon,
  Users,
  Users2,
  UsersRound,
} from 'lucide-react';
import Reservation from '../components/Reservation';
import MobileFilterSheet from '../components/MobileFilterSheet';
import Modal from '../components/Modal';
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export default function TourDetails() {
  const location = useLocation();
  // console.log('location in tour details...', location);
  const tourId = location.state?.tourId;
  const { getTour, selectedTour, error, isLoading } = useTours();
  const { user, isCheckingAuth } = useAuth();
  const { bookings } = useBookings();
  const sectionRef = useRef(null);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const isBooked = bookings.find((item) => item.tour._id === tourId);
  console.log('is booked', isBooked);
  useEffect(
    function () {
      if (!selectedTour || !sectionRef.current) return;
      const id = setTimeout(function () {
        sectionRef?.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
        });
      }, 50);
      return () => clearTimeout(id);
    },
    [selectedTour],
  );

  useEffect(
    function () {
      const controller = new AbortController();
      getTour(tourId, controller.signal);
    },
    [tourId, getTour],
  );

  const visibleReviews = selectedTour?.reviews?.slice(0, 4) ?? [];
  const reviewsLayoutClass =
    visibleReviews.length === 0
      ? 'max-w-md grid-cols-1'
      : visibleReviews.length === 1
        ? 'max-w-md grid-cols-1 md:max-w-3xl md:grid-cols-2'
        : visibleReviews.length === 2
          ? 'max-w-md grid-cols-1 md:max-w-3xl md:grid-cols-2 lg:max-w-5xl lg:grid-cols-3'
          : visibleReviews.length === 3
            ? 'max-w-md grid-cols-1 md:max-w-3xl md:grid-cols-2 lg:max-w-5xl lg:grid-cols-3 xl:max-w-7xl xl:grid-cols-4'
            : 'max-w-md grid-cols-1 md:max-w-3xl md:grid-cols-2 lg:max-w-5xl lg:grid-cols-3 xl:max-w-7xl xl:grid-cols-4 2xl:max-w-screen-2xl 2xl:grid-cols-5';

  if (error) return <Toast error={error} />;
  if (isLoading || isCheckingAuth) return <Spinner />;
  return (
    <div>
      {/* Hero Section */}
      <section className="relative">
        <div className="xs:h-80 relative h-72 sm:h-96 md:h-110 lg:h-120 xl:h-128">
          <img
            className="h-full w-full object-cover object-center"
            src={`${BACKEND_URL}/img/tours/${selectedTour?.imageCover}`}
            alt={`${selectedTour?.name} cover`}
          />
        </div>

        <div className="font-inter shadow-overview xs:px-5 absolute bottom-0 left-1/2 z-10 flex w-11/12 max-w-4xl -translate-x-1/2 translate-y-1/2 flex-col items-center gap-4 rounded-2xl border border-[#E2E8F0] bg-white px-4 py-5 sm:w-10/12 sm:gap-5 sm:px-7 sm:py-6 md:w-8/12 lg:w-7/12 xl:w-6/12">
          <h1 className="xs:text-3xl px-2 text-center text-2xl leading-tight font-semibold tracking-tight text-[#0F172A] uppercase md:text-4xl">
            {`${selectedTour?.name} tour`}
          </h1>

          <div className="flex w-full flex-wrap items-center justify-center gap-x-4 gap-y-2 px-1 text-xs font-semibold text-[#1F2937] uppercase sm:gap-x-6 sm:gap-y-3 sm:text-sm md:justify-evenly">
            <div className="flex items-center gap-1.5">
              <Clock size={17} className="inline-block text-[#0B7A31]" />
              <span>{`${selectedTour?.duration}-days`}</span>
            </div>

            <div className="flex items-center gap-1.5">
              <MapPin size={17} className="inline-block text-[#0B7A31]" />
              <span>{selectedTour?.startLocation?.description}</span>
            </div>

            <div className="flex items-center gap-1.5">
              <Users size={17} className="inline-block text-[#0B7A31]" />
              <span>{selectedTour?.maxGroupSize} People</span>
            </div>

            <div className="flex items-center gap-1.5">
              <Star size={17} className="inline-block text-[#0B7A31]" />
              <span>{selectedTour?.ratingsAverage}</span>
            </div>
          </div>
        </div>
      </section>
      {/* About & Quick Facts */}
      <section className="mx-auto mt-32 grid max-w-9/10 grid-cols-1 gap-8 px-5 sm:mt-28 sm:gap-8 md:max-w-9/10 md:grid-cols-2 md:gap-10 lg:max-w-8/10 xl:gap-12">
        <div className="shadow-overview xs:px-6 rounded-2xl border border-[#E2E8F0] bg-white px-5 py-8 sm:px-7 sm:py-9 lg:px-8 lg:py-10">
          <div className="mb-8">
            <h2 className="mb-6 text-base font-semibold tracking-wide text-[#0B7A31] uppercase sm:text-lg">
              Quick Facts
            </h2>

            <div className="flex flex-col gap-4 text-sm font-normal text-[#64748B]">
              <div className="flex items-center gap-3">
                <Calendar size={18} className="shrink-0 text-[#0B7A31]" />

                <span className="xs:w-28 w-24 shrink-0 text-xs font-semibold tracking-wide text-[#475569] uppercase">
                  Next Date
                </span>

                <span className="text-sm text-[#64748B]">
                  {formatDate(selectedTour?.nextStartDate, {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  })}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <LucideGauge size={18} className="shrink-0 text-[#0B7A31]" />

                <div className="flex flex-1 items-center">
                  <span className="xs:w-28 w-24 shrink-0 text-xs font-semibold tracking-wide text-[#475569] uppercase">
                    Difficulty
                  </span>

                  <span className="text-sm text-[#64748B] first-letter:uppercase">
                    {selectedTour?.difficulty}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Users size={18} className="shrink-0 text-[#0B7A31]" />

                <div className="flex flex-1 items-center">
                  <span className="xs:w-28 w-24 shrink-0 text-xs font-semibold tracking-wide text-[#475569] uppercase">
                    Participants
                  </span>

                  <span className="text-sm text-[#64748B]">
                    {`${selectedTour?.maxGroupSize} People`}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3 border-b border-[#E2E8F0] pb-6">
                <Star size={18} className="shrink-0 text-[#0B7A31]" />

                <div className="flex items-center">
                  <span className="font-semibold text-[#0F172A]">
                    {selectedTour?.ratingsAverage}
                  </span>

                  <span className="ml-1 text-[#64748B]">/ 5</span>
                </div>
              </div>
            </div>
          </div>

          <div className="text-sm font-normal text-[#64748B]">
            <h2 className="mb-6 text-base font-semibold tracking-wide text-[#0B7A31] uppercase sm:text-lg">
              Your Tour Guides
            </h2>

            <div className="flex flex-col gap-4">
              {selectedTour?.guides?.map((el) => {
                return (
                  <div key={el._id} className="flex items-center gap-3">
                    <img
                      src={`${BACKEND_URL}/img/users/${el.photo}`}
                      alt="Guide"
                      className="h-10 w-10 shrink-0 rounded-full object-cover ring-1 ring-[#E2E8F0]"
                    />

                    <span className="w-24 shrink-0 text-xs font-semibold tracking-wide text-[#475569] uppercase">
                      {el?.role}
                    </span>

                    <span className="text-sm text-[#64748B]">{el?.name}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="shadow-overview xs:px-6 rounded-2xl border border-[#E2E8F0] bg-white px-5 py-8 sm:px-7 sm:py-9 lg:px-8 lg:py-10">
          <h2 className="mb-6 text-base leading-snug font-semibold tracking-wide text-[#0B7A31] uppercase sm:text-lg">
            {`About the ${selectedTour?.name}`}
          </h2>

          <p className="text-sm leading-7 font-normal text-[#64748B] sm:text-base sm:leading-8">
            {selectedTour?.description}
          </p>
        </div>
      </section>
      {/* Gallery */}
      <section className="xs:mt-12 xs:h-110 mx-auto mt-10 grid h-96 w-11/12 max-w-7xl grid-cols-2 grid-rows-2 gap-2 sm:h-125 sm:gap-3 md:mt-14 md:h-140 lg:mt-16 lg:h-150 lg:grid-cols-[2fr_1.5fr] lg:gap-4">
        {selectedTour?.images?.slice(0, 3).map((el, index) => {
          if (index === 0) {
            return (
              <div
                key={el}
                className="col-span-2 col-start-1 overflow-hidden rounded-2xl border border-[#E2E8F0] bg-white lg:col-end-2 lg:row-span-2"
              >
                <img
                  className="h-full w-full object-cover object-center transition-transform duration-500 lg:hover:scale-105"
                  src={`${BACKEND_URL}/img/tours/${el}`}
                  alt="Tour"
                />
              </div>
            );
          } else {
            return (
              <div
                key={el}
                className="overflow-hidden rounded-2xl border border-[#E2E8F0] bg-white lg:col-start-2"
              >
                <img
                  className="h-full w-full object-cover object-center transition-transform duration-500 lg:hover:scale-105"
                  src={`${BACKEND_URL}/img/tours/${el}`}
                  alt="Tour"
                />
              </div>
            );
          }
        })}
      </section>
      <TourMap selectedTour={selectedTour} />
      {/* CTA section */}
      <section
        ref={sectionRef}
        className="shadow-overview mx-auto my-14 flex w-11/12 max-w-7xl items-center justify-center overflow-hidden rounded-2xl border border-[#E2E8F0] bg-cover bg-center px-5 py-10 sm:my-16 sm:px-8 sm:py-12 lg:my-20"
        style={{
          backgroundImage: `linear-gradient(
      135deg,
      rgba(248, 250, 249, 0.7),
      rgba(238, 244, 240, 0.5)
    ), url('/imgs/cta-bg.png')`,
        }}
      >
        <div className="grid w-full max-w-xl grid-cols-1 justify-items-center gap-4 text-center">
          <h2 className="text-2xl leading-tight font-semibold tracking-tight text-[#0F172A] sm:text-3xl">
            Ready for your next adventure?
          </h2>

          <p className="font-inter max-w-lg text-sm leading-6 font-normal text-[#64748B] sm:text-base sm:leading-7">
            {`${selectedTour?.duration} days of adventure, remarkable scenery, and moments worth remembering.`}
          </p>

          {user ? (
            isBooked ? (
              <NavLink
                // to={{ pathname: '/me/bookings', hash: `#${selectedTour.slug}` }}
                to={{ pathname: '/me/bookings' }}
                className="mt-1 min-h-11 cursor-pointer rounded-xl bg-[#0B7A31] px-6 py-2.5 text-center text-sm font-semibold text-white uppercase transition-colors duration-200 hover:bg-[#096529] focus-visible:ring-2 focus-visible:ring-[#0B7A31]/20 focus-visible:outline-none sm:px-7"
              >
                Manage This Booking
              </NavLink>
            ) : (
              <button
                onClick={() => setIsModalOpen(true)}
                className="mt-1 min-h-11 cursor-pointer rounded-xl bg-[#0B7A31] px-6 py-2.5 text-sm font-semibold text-white uppercase transition-colors duration-200 hover:bg-[#096529] focus-visible:ring-2 focus-visible:ring-[#0B7A31]/20 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-60 sm:px-7"
              >
                Book this tour
              </button>
            )
          ) : (
            <NavLink
              to="/login"
              state={{
                from: location,
                tourId: selectedTour._id,
              }}
              className="mt-1 min-h-11 cursor-pointer rounded-xl bg-[#0B7A31] px-6 py-2.5 text-center text-sm font-semibold text-white uppercase transition-colors duration-200 hover:bg-[#096529] focus-visible:ring-2 focus-visible:ring-[#0B7A31]/20 focus-visible:outline-none sm:px-7"
            >
              Log in to book
            </NavLink>
          )}

          <div className="mt-1 flex items-center justify-center gap-2 text-xs font-medium text-[#64748B] sm:text-sm">
            <ShieldCheck size={17} className="shrink-0 text-[#0B7A31]" />

            <p>Secure booking • Free cancellation</p>
          </div>
        </div>
      </section>
      {/* Review Section */}
      <section
        className={`mx-auto mt-16 mb-20 grid w-11/12 auto-rows-fr items-stretch gap-6 sm:mb-24 ${reviewsLayoutClass}`}
      >
        {/* Rating summary */}
        <div className="shadow-overview flex h-full min-h-64 w-full flex-col rounded-2xl border border-[#E2E8F0] bg-white p-6">
          <div>
            <h2 className="text-xl font-semibold tracking-tight text-[#0B7A31]">
              Traveler Reviews
            </h2>
            <p className="mt-4 text-xs font-semibold tracking-wide text-[#64748B] uppercase">
              Overall Rating
            </p>
          </div>
          <div className="mt-5">
            <div className="flex items-end gap-2">
              <span className="text-4xl leading-none font-semibold text-[#0F172A]">
                {selectedTour?.ratingsAverage}
              </span>
              <span className="pb-1 text-lg font-medium text-[#64748B]">
                / 5
              </span>
            </div>
            <div className="mt-5 flex items-center gap-1.5">
              {Array.from({ length: 5 }, (_, index) => {
                const isFilled =
                  index < Math.round(selectedTour?.ratingsAverage ?? 0);
                return (
                  <LucideStar
                    key={index}
                    size={19}
                    className={`text-[#F4B400] ${isFilled ? 'fill-[#F4B400]' : ''}`}
                  />
                );
              })}
            </div>
          </div>
          <p className="mt-auto border-t border-[#E2E8F0] pt-4 text-sm font-normal text-[#64748B]">
            {`Based on ${selectedTour?.ratingsQuantity} reviews`}
          </p>
        </div>
        {/* Individual reviews */}
        {visibleReviews.map((el, index) => {
          return (
            <div
              key={el._id}
              className={`shadow-overview h-full min-h-64 w-full flex-col rounded-2xl border border-[#E2E8F0] bg-white p-6 text-sm text-[#64748B] ${index === 0 ? 'flex' : index === 1 ? 'hidden lg:flex' : index === 2 ? 'hidden xl:flex' : 'hidden 2xl:flex'}`}
            >
              <header className="flex items-center gap-3">
                <div className="h-12 w-12 shrink-0 overflow-hidden rounded-full">
                  <img
                    className="h-full w-full object-cover"
                    src={`${BACKEND_URL}/img/users/${el?.user?.photo ?? 'default.jpg'}`}
                    alt={`${el?.user?.name ?? 'Traveler'} avatar`}
                  />
                </div>
                <div className="flex flex-1 flex-col items-start gap-1.5">
                  <h6 className="text-sm font-semibold text-[#0F172A]">
                    {el?.user?.name?.split(' ')[0]}
                  </h6>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }, (_, starIndex) => {
                      const isFilled = starIndex < el?.rating;
                      return (
                        <LucideStar
                          key={starIndex}
                          size={13}
                          className={`text-[#F4B400] ${isFilled ? 'fill-[#F4B400]' : ''}`}
                        />
                      );
                    })}
                  </div>
                </div>
              </header>
              <p className="mt-5 grow text-sm leading-6 font-normal text-[#64748B]">
                {el?.review}
              </p>
              <div className="mt-5 flex items-center gap-1.5 border-t border-[#E2E8F0] pt-4 text-xs text-[#94A3B8]">
                <Calendar size={13} className="shrink-0 text-[#0B7A31]" />
                <span>{formatDate(el?.createdAt)}</span>
              </div>
            </div>
          );
        })}
      </section>

      {isModalOpen && (
        <Modal>
          <Reservation
            selectedTour={selectedTour}
            user={user}
            onClose={() => setIsModalOpen(false)}
          />
        </Modal>
      )}
    </div>
  );
}
