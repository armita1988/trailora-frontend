import { ChevronRight } from 'lucide-react';
export default function FilterMenuItem({ item, onSelect }) {
  console.log('FilterMenuItem....', item);
  return (
    <div
      onClick={() => onSelect(item)}
      className="font-inter col-span-2 flex cursor-pointer appearance-none items-center gap-4 rounded-lg border border-[#E5E7EB] bg-white p-2.5 text-sm font-normal text-[#111827] transition-all duration-300 outline-none hover:border-[#0B7A31] hover:bg-[#EEF8F2] focus:border-[#0B7A31] focus:ring-2 focus:ring-[#0B7A31]/15"
    >
      {item.icon}
      <p className="cursor-pointer text-xs text-[#111827] uppercase outline-none">
        {item.name}
      </p>
      <p className="ml-auto text-sm text-[#6B7280]">{item.selectedValue()}</p>
      <ChevronRight
        size={16}
        className="pointer-events-none inline-block text-[#0B7A31]"
      />
    </div>
  );
}
