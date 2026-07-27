// export default function MobileFilterSheet({ children, onClose }) {
//   return (
//     <div
//       onClick={(e) => {
//         if (e.target === e.currentTarget) {
//           onClose();
//         }
//       }}
//       className="fixed inset-0 z-100 flex items-center justify-center bg-[#0f172a]/40 backdrop-blur-[3px]"
//     >
//       {children}
//     </div>
//   );
// }

export default function MobileFilterSheet({ children, onClose }) {
  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
      className="fixed inset-0 z-50 flex items-end justify-center bg-[#0F172A]/45 backdrop-blur-[2px] sm:items-center sm:px-5 sm:py-8"
    >
      {children}
    </div>
  );
}
