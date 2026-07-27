// import { useEffect } from 'react';

// export default function Toast({
//   message,
//   handleShow,
//   status = 'error',
//   duration = 5000,
// }) {
//   useEffect(() => {
//     const timer = setTimeout(() => handleShow(false), duration);
//     return () => clearTimeout(timer);
//   }, [handleShow, duration]);

//   return (
//     <div
//       className={`fixed top-0 left-1/2 -translate-x-1/2 w-1/3 text-center p-3 rounded-sm text-white text-lg font-light  z-50

//          ${status === 'error' ? 'bg-red-500' : 'bg-green-500'}
//          `}
//     >
//       <span>{`${message.split('(')[0]}!`}</span>
//     </div>
//   );
// }

import { useEffect } from 'react';

export default function Toast({
  message,
  handleShow,
  status = 'error',
  duration = 5000,
}) {
  useEffect(() => {
    const timer = setTimeout(() => handleShow(false), duration);
    return () => clearTimeout(timer);
  }, [handleShow, duration]);

  return (
    <div
      className={`fixed top-4 left-1/2 z-50 w-[calc(100%-2rem)] max-w-md -translate-x-1/2 rounded-xl border px-4 py-3.5 text-center text-sm font-semibold shadow-[0_12px_30px_rgba(15,23,42,0.16)] ${
        status === 'error'
          ? 'border-[#FECACA] bg-[#FEF2F2] text-[#B91C1C]'
          : 'border-[#BBF7D0] bg-[#ECFDF3] text-[#15803D]'
      } `}
    >
      <span>{`${message}`}</span>
    </div>
  );
}
