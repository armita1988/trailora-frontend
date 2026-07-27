// import { Check } from 'lucide-react';
// export default function FilterOptions({
//   selectedFilter,
//   onSelectOption,
//   selectedOption,
// }) {
//   console.log(selectedFilter, 'selected item...');
//   console.log(selectedOption, 'selected option...');
//   return (
//     <div className="fixed right-0 bottom-0 left-0 rounded-t-4xl bg-white p-6">
//       <div
//         className={`grid grid-cols-1 grid-rows-${selectedFilter.values.length + 1} gap-x-10 gap-y-4`}
//       >
//         {selectedFilter.values.map((value, i) => (
//           <div
//             className={`cursor-pointer ${selectedOption === value ? 'bg-[#0B7A31]/15' : 'bg-white'} font-inter col-span-2 flex appearance-none items-center justify-between gap-4 rounded-lg border border-[#E5E7EB] p-2.5 text-sm font-normal text-[#111827] transition-all duration-300 outline-none focus:border-[#0B7A31] focus:ring-2 focus:ring-[#0B7A31]/15`}
//             onClick={() => onSelectOption(value)}
//           >
//             <p className="capitalize"> {selectedFilter.labels[i]}</p>
//             {selectedOption === value && (
//               <Check
//                 size={16}
//                 className="pointer-events-none inline-block text-[#0B7A31]"
//               />
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

import { Check } from 'lucide-react';

export default function FilterOptions({
  selectedFilter,
  onSelectOption,
  selectedOption,
}) {
  console.log(selectedFilter, 'selected filter...');
  console.log(selectedOption, 'selected option...');

  return (
    <div className="font-inter flex max-h-[calc(100dvh-1rem)] w-full flex-col overflow-hidden rounded-t-3xl border-t border-[#E2E8F0] bg-white shadow-[0_-14px_40px_rgba(15,23,42,0.16)] sm:max-h-[calc(100dvh-4rem)] sm:max-w-xl sm:rounded-3xl sm:border">
      <div className="flex shrink-0 justify-center pt-3 sm:hidden">
        <div className="h-1 w-10 rounded-full bg-[#CBD5E1]" />
      </div>

      {/* Header */}
      <div className="shrink-0 border-b border-[#E2E8F0] px-5 pt-4 pb-4 sm:px-6 sm:pt-5">
        <h2 className="text-lg leading-6 font-semibold tracking-tight text-[#0F172A]">
          Select an option
        </h2>

        <p className="mt-1 text-[13px] leading-5 font-normal text-[#64748B]">
          Choose the option that best matches your trip.
        </p>
      </div>

      {/* Options */}
      <div className="xs:px-5 min-h-0 flex-1 overflow-y-auto px-4 py-4 sm:px-6">
        <div className="flex flex-col gap-2.5">
          {selectedFilter.values.map((value, i) => {
            const isSelected = selectedOption === value;

            return (
              <button
                key={value}
                type="button"
                onClick={() => onSelectOption(value)}
                className={`flex min-h-12 w-full cursor-pointer items-center justify-between gap-4 rounded-xl border px-4 py-3 text-left text-sm transition-colors duration-200 focus:ring-2 focus:ring-[#0B7A31]/15 focus:outline-none ${
                  isSelected
                    ? 'border-[#A7D7B5] bg-[#ECFDF3] font-semibold text-[#0B7A31]'
                    : 'border-[#E2E8F0] bg-white font-medium text-[#334155] hover:border-[#CFE0D5] hover:bg-[#F8FAF9]'
                }`}
              >
                <span className="capitalize">{selectedFilter.labels[i]}</span>

                {isSelected && (
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#DDF3E5]">
                    <Check
                      size={15}
                      strokeWidth={2.5}
                      className="pointer-events-none text-[#0B7A31]"
                    />
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
