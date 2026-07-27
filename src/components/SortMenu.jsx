import { useState } from 'react';

export default function Dropdown({
  value,
  onChange,
  options,
  icon,
  className = '',
}) {
  const [isOpen, setIsOpen] = useState(false);

  const selectedOption = options.find((option) => option.value === value);

  return (
    <div
      className={`relative ${className}`}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) {
          setIsOpen(false);
        }
      }}
    >
      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        className={`font-inter flex h-11 w-full cursor-pointer items-center gap-2 rounded-xl border px-3 text-xs font-normal transition-all duration-200 outline-none xl:text-sm ${
          isOpen
            ? 'border-[#0B7A31] bg-white ring-2 ring-[#0B7A31]/15'
            : 'border-[#E5E7EB] bg-[#F9FAFB] text-[#111827] hover:border-[#C7D8CC]'
        }`}
      >
        <span className="shrink-0 text-[#0B7A31]">{icon}</span>

        <span className="flex-1 truncate text-left">
          {selectedOption?.label}
        </span>

        <ChevronDown
          size={15}
          className={`shrink-0 text-[#64748B] transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {isOpen && (
        <ul className="absolute top-13 left-0 z-50 w-full min-w-max rounded-xl border border-[#E2E8F0] bg-white p-1.5 shadow-[0_12px_30px_rgba(15,23,42,0.14)]">
          {options.map((option) => (
            <li key={option.value || 'all'}>
              <button
                type="button"
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
                className={`w-full cursor-pointer rounded-lg px-3 py-2 text-left text-sm transition-colors duration-150 ${
                  value === option.value
                    ? 'bg-[#ECFDF3] font-semibold text-[#0B7A31]'
                    : 'font-normal text-[#475569] hover:bg-[#F4F8F6] hover:text-[#0B7A31]'
                }`}
              >
                {option.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
