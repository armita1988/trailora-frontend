import { Link, NavLink } from 'react-router-dom';
import icons from '../../public/imgs/icons.svg';
import { formatDate } from '../utils/formatDate';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const difficultyStyles = {
  easy: 'bg-[#ECFDF3] text-[#15803D]',
  medium: 'bg-[#FFF7E6] text-[#B45309]',
  difficult: 'bg-[#FEF2F2] text-[#B91C1C]',
};

export default function TourItem({ tour }) {
  return (
    <div className="shadow-overview flex h-full flex-col overflow-hidden rounded-2xl border border-[#E2E8F0] bg-white transition-all duration-300 lg:hover:-translate-y-1 lg:hover:shadow-[0_1rem_2rem_rgba(15,23,42,0.12)]">
      <div className="xs:h-52 relative h-48 sm:h-50 lg:h-48 xl:h-52">
        <NavLink to={`/tour/${tour.slug}`} state={{ tourId: `${tour._id}` }}>
          <img
            className="h-full w-full object-cover"
            src={`${BACKEND_URL}/img/tours/${tour.imageCover}`}
            alt={`${tour.name} cover`}
          />
        </NavLink>

        <p
          className={`absolute top-4 left-4 flex items-center rounded-full px-3 py-1.5 text-[0.68rem] font-semibold tracking-wide uppercase ${
            difficultyStyles[tour?.difficulty] ?? ''
          }`}
        >
          {tour.difficulty}
        </p>
      </div>

      <div className="xs:px-6 grid grow grid-cols-2 gap-x-5 gap-y-4 px-5 py-5 text-[#475569]">
        <h2 className="col-span-2 text-base leading-snug font-semibold text-[#0F172A] xl:text-lg">
          {tour.name}
        </h2>

        <h4 className="col-span-2 text-xs font-semibold tracking-wide text-[#64748B] uppercase">
          {`${tour.duration}-day tour`}
        </h4>

        <p className="col-span-2 text-sm leading-relaxed font-normal text-[#64748B]">
          {tour.summary}
        </p>

        <div className="flex items-start gap-1.5 text-[0.82rem] leading-snug font-normal">
          <svg className="h-5 w-5 shrink-0 fill-current text-[#0B7A31]">
            <use xlinkHref={`${icons}#icon-map-pin`}></use>
          </svg>

          <span>{tour.startLocation?.description}</span>
        </div>

        <div className="flex items-start gap-1.5 text-[0.82rem] leading-snug font-normal">
          <svg className="h-5 w-5 shrink-0 fill-current text-[#0B7A31]">
            <use xlinkHref={`${icons}#icon-calendar`}></use>
          </svg>

          <span>{formatDate(tour.nextStartDate)}</span>
        </div>

        <div className="flex items-start gap-1.5 text-[0.82rem] leading-snug font-normal">
          <svg className="h-5 w-5 shrink-0 fill-current text-[#0B7A31]">
            <use xlinkHref={`${icons}#icon-flag`}></use>
          </svg>

          <span>{`${tour?.locations?.length ?? 0} stops`}</span>
        </div>

        <div className="flex items-start gap-1.5 text-[0.82rem] leading-snug font-normal">
          <svg className="h-5 w-5 shrink-0 fill-current text-[#0B7A31]">
            <use xlinkHref={`${icons}#icon-user`}></use>
          </svg>

          <span>{`${tour.maxGroupSize} people`}</span>
        </div>
      </div>

      <div className="xs:px-6 grid grid-cols-[2fr_1fr] grid-rows-2 items-center gap-x-3 gap-y-1.5 border-t border-[#E2E8F0] bg-[#F8FAFC] px-5 py-4 text-sm font-normal text-[#64748B]">
        <p className="col-start-1 row-start-1 flex items-baseline">
          <span className="text-lg font-semibold text-[#0F172A]">
            {`$${tour.price}`}
          </span>

          <span className="ml-1 text-xs font-medium text-[#64748B]">CAD</span>
        </p>

        <p className="col-start-1 row-start-2 flex items-center gap-1">
          <svg className="h-4 w-4 fill-current text-[#F4B400]">
            <use xlinkHref={`${icons}#icon-star-fill`}></use>
          </svg>

          <span className="font-semibold text-[#0F172A]">
            {tour.ratingsAverage}
          </span>

          <span className="text-xs text-[#94A3B8]">
            {`(${tour.ratingsQuantity})`}
          </span>
        </p>

        <Link
          className="col-start-2 row-span-2 row-start-1 self-center justify-self-end rounded-lg bg-[#0B7A31] px-4 py-2.5 text-sm font-semibold tracking-wide text-white transition-all duration-300 hover:bg-[#096529] hover:shadow-[0_0.5rem_1rem_rgba(15,23,42,0.12)] focus:ring-2 focus:ring-[#0B7A31]/20 focus:outline-none"
          to={`/tour/${tour.slug}`}
          state={{ tourId: `${tour._id}` }}
        >
          Details
        </Link>
      </div>
    </div>
  );
}
