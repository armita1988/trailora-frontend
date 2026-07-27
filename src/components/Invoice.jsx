import { useRef } from 'react';
import icons from '../../public/imgs/icons.svg';
import { formatDate } from '../utils/formatDate';
import html2pdf from 'html2pdf.js';
import { X } from 'lucide-react';

export default function Invoice({ booking, onClose }) {
  const invoiceRef = useRef(null);

  const travelerCount = Number(booking.numberOfTravelers) || 1;
  const totalPaid = Number(booking.totalPrice ?? booking.price) || 0;
  const pricePerTraveler = totalPaid / travelerCount;
  const currency = booking.currency?.toUpperCase() || 'CAD';
  const bookingRequest = booking.request?.trim() || '';

  const tourStartDate = new Date(booking?.tour?.nextStartDate);
  const tourEndDate = new Date(tourStartDate);

  if (!Number.isNaN(tourEndDate.getTime())) {
    tourEndDate.setDate(
      tourEndDate.getDate() + Number(booking?.tour?.duration || 1) - 1,
    );
  }

  const tourDateRange = !Number.isNaN(tourStartDate.getTime())
    ? `${formatDate(tourStartDate).split(',')[0]} - ${formatDate(tourEndDate)}`
    : 'Date unavailable';

  const formatMoney = (amount) => {
    return new Intl.NumberFormat('en-CA', {
      style: 'currency',
      currency,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  const handleDownloadPDF = (e) => {
    e.preventDefault();

    const element = invoiceRef.current;
    if (!element) return;

    const options = {
      margin: 0.5,
      filename: `${booking.invoiceNumber || 'invoice'}.pdf`,
      image: {
        type: 'jpeg',
        quality: 0.98,
      },
      html2canvas: {
        scale: 2,
        useCORS: true,
      },
      jsPDF: {
        unit: 'in',
        format: 'letter',
        orientation: 'portrait',
      },
    };

    html2pdf().set(options).from(element).save();
  };

  return (
    <div className="font-inter relative mx-auto w-full max-w-md overflow-hidden rounded-2xl border border-[#E2E8F0] bg-white shadow-[0_20px_50px_rgba(15,23,42,0.15)]">
      <button
        type="button"
        onClick={onClose}
        aria-label="Close invoice"
        className="absolute top-3 right-5 z-10 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-white text-xl leading-none font-normal text-[#64748B] transition-colors duration-200 hover:bg-[#F1F5F9] hover:text-[#0F172A]"
      >
        <X size={18} />
      </button>

      <div className="xs:px-5 xs:py-5 max-h-[86vh] overflow-y-auto px-4 py-4 sm:px-6">
        <div>
          <div
            ref={invoiceRef}
            className="xs:p-2 flex flex-col gap-4 bg-white p-1 text-[#334155]"
          >
            <div className="flex flex-col gap-2 border-b border-[#E2E8F0] pr-10 pb-4">
              <span className="inline-flex self-start rounded-full border border-[#BBF7D0] bg-[#ECFDF3] px-3 py-1.5 text-[0.65rem] font-semibold tracking-wide text-[#15803D] uppercase">
                {booking.paymentStatus}
              </span>

              <h2 className="text-lg leading-7 font-semibold tracking-tight text-[#0F172A]">
                {booking.invoiceNumber}
              </h2>

              <p className="text-xs leading-5 font-normal text-[#64748B]">
                Booking #{booking.bookingReference}
              </p>
            </div>

            <section className="flex flex-col gap-3 border-b border-[#E2E8F0] pb-4">
              <h2 className="text-sm font-semibold tracking-wide text-[#475569] uppercase">
                Customer
              </h2>

              <div className="xs:grid-cols-[5rem_1fr] xs:gap-y-2.5 grid grid-cols-1 gap-2 text-sm">
                <span className="text-xs font-medium text-[#64748B]">
                  Name:
                </span>

                <span className="min-w-0 text-[13px] font-normal text-[#1E293B]">
                  {booking.customerName}
                </span>

                <span className="text-xs font-medium text-[#64748B]">
                  Email:
                </span>

                <span className="min-w-0 text-[13px] font-normal break-all text-[#1E293B]">
                  {booking.customerEmail}
                </span>
              </div>
            </section>

            <section className="flex flex-col gap-3 border-b border-[#E2E8F0] pb-4">
              <h2 className="text-sm font-semibold tracking-wide text-[#475569] uppercase">
                {`${booking.tourName} Tour`}
              </h2>

              <div className="xs:flex-row xs:items-center xs:gap-4 flex flex-col gap-3">
                <img
                  src={`${import.meta.env.VITE_BACKEND_URL}/img/tours/${booking.imageCover}`}
                  alt={booking.tourName}
                  className="xs:h-24 xs:w-36 h-32 w-full shrink-0 rounded-xl object-cover object-center"
                />

                <div className="flex min-w-0 flex-col gap-2.5 text-[13px] leading-5 font-normal text-[#64748B]">
                  <div className="flex items-start gap-2">
                    <svg className="mt-0.5 h-4 w-4 shrink-0 fill-current text-[#0B7A31]">
                      <use xlinkHref={`${icons}#icon-map-pin`}></use>
                    </svg>

                    <span>{booking.tour.startLocation?.description}</span>
                  </div>

                  <div className="flex items-start gap-2">
                    <svg className="mt-0.5 h-4 w-4 shrink-0 fill-current text-[#0B7A31]">
                      <use xlinkHref={`${icons}#icon-calendar`}></use>
                    </svg>

                    <span>{tourDateRange}</span>
                  </div>

                  <div className="flex items-start gap-2">
                    <svg className="mt-0.5 h-4 w-4 shrink-0 fill-current text-[#0B7A31]">
                      <use xlinkHref={`${icons}#icon-user`}></use>
                    </svg>

                    <span>{`Travelers booked: ${travelerCount}`}</span>
                  </div>
                </div>
              </div>
            </section>

            {bookingRequest && (
              <section className="flex flex-col gap-3 border-b border-[#E2E8F0] pb-4">
                <div className="flex items-center justify-between gap-3">
                  <h2 className="text-sm font-semibold tracking-wide text-[#475569] uppercase">
                    Booking request
                  </h2>

                  <span className="rounded-full border border-[#BFDBFE] bg-[#EFF6FF] px-2.5 py-1 text-[0.65rem] font-semibold tracking-wide text-[#1D4ED8] uppercase">
                    Submitted
                  </span>
                </div>

                <div className="rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] px-4 py-3.5">
                  <p className="text-[13px] leading-6 font-normal whitespace-pre-line text-[#475569]">
                    {bookingRequest}
                  </p>
                </div>
              </section>
            )}

            <section className="flex flex-col gap-3 border-b border-[#E2E8F0] pb-4">
              <h2 className="text-sm font-semibold tracking-wide text-[#475569] uppercase">
                Payment details
              </h2>

              <div className="xs:grid-cols-[8rem_1fr] xs:gap-y-2.5 grid grid-cols-1 gap-2 text-sm">
                <span className="text-xs font-medium text-[#64748B]">
                  Payment date:
                </span>

                <span className="xs:text-right text-[13px] font-normal text-[#1E293B]">
                  {booking.createdAt.split('T')[0]}
                </span>

                <span className="text-xs font-medium text-[#64748B]">
                  Payment method:
                </span>

                <span className="xs:text-right text-[13px] font-normal text-[#1E293B]">
                  {booking.paymentMethodBrand?.toUpperCase()} ••••{' '}
                  {booking.paymentMethodLast4}
                </span>

                <span className="text-xs font-medium text-[#64748B]">
                  Transaction ID:
                </span>

                <span className="xs:text-right text-[12px] leading-5 font-normal break-all text-[#475569]">
                  {booking.stripePaymentIntentId}
                </span>
              </div>
            </section>

            <section className="flex flex-col gap-3 rounded-xl border border-[#DCE7E0] bg-[#F6F9F7] px-4 py-4">
              <h2 className="text-sm font-semibold tracking-wide text-[#475569] uppercase">
                Price summary
              </h2>

              <div className="grid grid-cols-[1fr_auto] items-center gap-x-4 gap-y-2.5">
                <span className="text-xs font-medium text-[#64748B]">
                  Tour price per traveler:
                </span>

                <span className="text-[13px] font-medium text-[#334155]">
                  {formatMoney(pricePerTraveler)}
                </span>

                <span className="text-xs font-medium text-[#64748B]">
                  Travelers booked:
                </span>

                <span className="text-[13px] font-medium text-[#334155]">
                  {travelerCount}
                </span>

                <span className="text-xs font-medium text-[#64748B]">
                  Total amount:
                </span>

                <span className="text-right text-[13px] font-medium text-[#334155]">
                  {formatMoney(pricePerTraveler)} × {travelerCount}
                </span>

                <span className="border-t border-[#D7E4DB] pt-3 text-sm font-semibold text-[#0F172A]">
                  Total paid:
                </span>

                <span className="border-t border-[#D7E4DB] pt-3 text-base font-semibold text-[#0B7A31]">
                  {formatMoney(totalPaid)}
                </span>
              </div>
            </section>
          </div>

          <div className="mt-4 flex justify-center">
            <button
              onClick={handleDownloadPDF}
              className="xs:w-auto xs:min-w-48 min-h-10 w-full cursor-pointer rounded-lg bg-[#0B7A31] px-6 py-2.5 text-[13px] font-semibold text-white transition-colors duration-200 hover:bg-[#096529] focus:ring-2 focus:ring-[#0B7A31]/20 focus:outline-none"
            >
              Download PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
