export default function Modal({ children, onClose = null }) {
  return (
    <div
      className="fixed inset-0 z-9999 flex items-center justify-center overflow-y-auto bg-[#0F172A]/35 px-8 py-8 backdrop-blur-[2px] sm:items-center sm:px-6 sm:py-6"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      {children}
    </div>
  );
}
