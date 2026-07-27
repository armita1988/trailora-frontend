// import FilterMenuItem from './FilterMenuItem';
// import {
//   Calendar,
//   Search,
//   MapPin,
//   Gauge,
//   ArrowUpDown,
//   ChevronRight,
//   ChevronDown,
//   Filter,
//   X,
// } from 'lucide-react';

// export default function FilterMenuItems({
//   items,
//   onSelect,
//   onClose,
//   onClearAll,
//   onApplyFilters,
// }) {
//   return (
//     <div className="font-inter fixed right-0 bottom-0 left-0 rounded-t-4xl bg-white p-6">
//       <div
//         className={`grid grid-cols-2 grid-rows-${items.length + 2} gap-x-10 gap-y-4 rounded-t-4xl`}
//       >
//         <p className="flex items-center pl-2.5 text-base font-bold text-[#111827]">
//           Filters
//         </p>

//         <button
//           onClick={onClose}
//           className="flex items-center justify-end p-4 font-semibold text-[#6B7280]"
//           type="button"
//         >
//           <X size={18} className="pointer-events-none" />
//         </button>
//         {items.map((item) => (
//           <FilterMenuItem key={item.key} item={item} onSelect={onSelect} />
//         ))}

//         <div className="flex w-2/3 items-center justify-center gap-2 justify-self-end rounded-lg border border-[#DDE3DF] px-5 py-3 hover:border hover:border-[#0B7A31] focus:border-[#0B7A31] focus:ring-2 focus:ring-[#0B7A31]/15">
//           {/* <ArrowUpDown
//             size={16}
//             className="pointer-events-none inline-block text-[#0B7A31]"
//           /> */}
//           <button
//             onClick={onClearAll}
//             type="button"
//             className="inline-block cursor-pointer text-xs text-[#0B7A31] uppercase outline-none"
//           >
//             Reset
//           </button>
//         </div>
//         <div className="flex w-2/3 items-center justify-center gap-2 justify-self-start rounded-lg border border-[#DDE3DF] bg-[#0B7A31] px-5 py-3 hover:border hover:border-[#0B7A31] focus:border-[#0B7A31] focus:ring-2 focus:ring-[#0B7A31]/15">
//           {/* <ArrowUpDown
//             size={16}
//             className="pointer-events-none inline-block text-[#0B7A31]"
//           /> */}
//           <button
//             onClick={(e) => onApplyFilters(e)}
//             type="button"
//             className="cursor-pointer text-xs text-white uppercase outline-none"
//           >
//             Apply Filters
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

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
          onClick={onClearAll}
          type="button"
          className="flex min-h-11 w-full cursor-pointer items-center justify-center rounded-xl border border-[#CBD5E1] bg-white px-4 py-2.5 text-sm font-semibold text-[#475569] transition-colors duration-200 hover:border-[#94A3B8] hover:bg-[#F8FAFC] hover:text-[#0F172A] focus:ring-2 focus:ring-[#64748B]/10 focus:outline-none"
        >
          Reset
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
