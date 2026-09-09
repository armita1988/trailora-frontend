import FilterMenuItem from './FilterMenuItem';
import { X } from 'lucide-react';

export default function FilterMenuItems({
  items,
  onSelect,
  onClose,
  onClearAll,
  onApplyFilters,
}) {
  return (
    <div className="font-inter flex max-h-[calc(100dvh-1rem)] w-full flex-col overflow-hidden rounded-t-3xl border-t border-[#E2E8F0] bg-white shadow-[0_-14px_40px_rgba(15,23,42,0.16)] sm:max-h-[calc(100dvh-4rem)] sm:max-w-xl sm:rounded-3xl sm:border">
      <div className="flex shrink-0 justify-center pt-3 sm:hidden">
        <div className="h-1 w-10 rounded-full bg-[#CBD5E1]" />
      </div>

      {/* Header */}
      <div className="flex shrink-0 items-start justify-between gap-4 border-b border-[#E2E8F0] px-5 pt-4 pb-4 sm:px-6 sm:pt-5">
        <div className="min-w-0">
          <h2 className="text-lg leading-6 font-semibold tracking-tight text-[#0F172A]">
            Filters
          </h2>

          <p className="mt-1 text-[13px] leading-5 font-normal text-[#64748B]">
            Refine the tours shown in your results.
          </p>
        </div>

        <button
          onClick={onClose}
          className="flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-full text-[#64748B] transition-colors duration-200 hover:bg-[#F1F5F9] hover:text-[#0F172A] focus:ring-2 focus:ring-[#0B7A31]/15 focus:outline-none"
          type="button"
          aria-label="Close filters"
        >
          <X size={19} className="pointer-events-none" />
        </button>
      </div>

      {/* Filter rows */}
      <div className="xs:px-5 min-h-0 flex-1 overflow-y-auto px-4 py-4 sm:px-6">
        <div className="flex flex-col gap-2.5">
          {items.map((item) => (
            <FilterMenuItem key={item.key} item={item} onSelect={onSelect} />
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="xs:px-5 grid shrink-0 grid-cols-2 gap-3 border-t border-[#E2E8F0] bg-white px-4 py-4 sm:px-6">
        <button
          onClick={() => {
            onClearAll();
            onClose();
          }}
          type="button"
          className="flex min-h-11 w-full cursor-pointer items-center justify-center rounded-xl border border-[#CBD5E1] bg-white px-4 py-2.5 text-sm font-semibold text-[#475569] transition-colors duration-200 hover:border-[#94A3B8] hover:bg-[#F8FAFC] hover:text-[#0F172A] focus:ring-2 focus:ring-[#64748B]/10 focus:outline-none"
        >
          Clear Filters
        </button>

        <button
          onClick={(e) => onApplyFilters(e)}
          type="button"
          className="flex min-h-11 w-full cursor-pointer items-center justify-center rounded-xl bg-[#0B7A31] px-4 py-2.5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-[#096529] focus:ring-2 focus:ring-[#0B7A31]/20 focus:outline-none"
        >
          Apply Filters
        </button>
      </div>
    </div>
  );
}
