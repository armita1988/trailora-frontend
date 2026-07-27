//
import { NavLink } from 'react-router-dom';

export default function Footer() {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const logo = `${BACKEND_URL}/img/logo.png`;

  return (
    <footer className="xs:px-7 flex flex-col items-center gap-4 border-t border-[#E2E8F0] bg-[#F8FAF9] px-5 py-5 text-xs text-[#64748B] sm:flex-row sm:justify-between sm:gap-6 sm:px-8 md:px-10 md:py-4 md:text-sm lg:px-14 xl:px-20">
      <NavLink
        to="/"
        className="flex shrink-0 items-center justify-center sm:justify-start"
      >
        <img
          src={logo}
          alt="Natours logo"
          className="xs:h-14 h-12 w-auto object-contain md:h-16"
        />
      </NavLink>

      <div className="flex w-full flex-col items-center justify-center gap-2 text-center sm:flex-1 lg:flex-row lg:justify-between lg:text-left">
        <p className="leading-relaxed text-[#64748B]">
          &copy; Natours {new Date().getFullYear()}. All rights reserved.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-2 text-[#64748B]">
          <NavLink
            to="/privacy"
            className="transition-colors duration-200 hover:text-[#0B7A31]"
          >
            Privacy Policy
          </NavLink>

          <span className="text-[#94A3B8]">|</span>

          <NavLink
            to="/terms"
            className="transition-colors duration-200 hover:text-[#0B7A31]"
          >
            Terms & Conditions
          </NavLink>
        </div>
      </div>
    </footer>
  );
}
