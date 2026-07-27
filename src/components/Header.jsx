import { NavLink } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useState } from 'react';
import {
  Mountain,
  Lock,
  UserPlus,
  MailIcon,
  BuildingIcon,
  CircleUserRound,
  LogOut,
  Menu,
  X,
} from 'lucide-react';

export default function Header() {
  const { user } = useAuth();

  const isAuthenticated = !!user;
  const [isOpen, setIsOpen] = useState(false);

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const logo = `${BACKEND_URL}/img/logo-text.png`;

  // const handleLogOut = async (e) => {
  //   try {
  //     e.preventDefault();
  //     setIsOpen(false);
  //     navigate('/');
  //     await logout();
  //   } catch (err) {
  //     console.log('during logout...', err);
  //   }
  // };

  const closeMobileMenu = () => {
    setIsOpen(false);
  };

  const mobileItemClass =
    'group flex min-h-10 w-full items-center gap-2.5 rounded-lg px-3 py-2 text-[13px] font-medium leading-5 text-[#1F2937] transition-colors duration-200 hover:bg-[#F4F8F6] hover:text-[#0B7A31] md:block md:min-h-0 md:w-auto md:rounded-none md:bg-transparent md:p-0 md:text-sm md:font-semibold md:leading-normal md:text-[#111827] md:hover:bg-transparent';

  const mobileIconClass =
    'shrink-0 text-[#64748B] transition-colors duration-200 group-hover:text-[#0B7A31] md:hidden';

  const mobileLinkClass = 'block flex-1 md:inline-block';

  return (
    <header className="font-inter border-b border-[#E2E8F0] bg-[#F8FAF9] py-3 text-[#111827]">
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 sm:px-6 lg:px-8">
        <div className="flex items-center">
          <NavLink to="/" onClick={closeMobileMenu}>
            <img
              className="h-11 w-auto md:h-12"
              src={logo}
              alt="Trailora logo"
            />
          </NavLink>
        </div>

        <div className="relative ml-auto">
          <button
            type="button"
            onClick={() => setIsOpen((open) => !open)}
            className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg text-[#334155] transition-colors duration-200 hover:bg-[#EEF4F0] focus-visible:ring-2 focus-visible:ring-[#0B7A31]/15 focus-visible:outline-none md:hidden"
            aria-label={
              isOpen ? 'Close navigation menu' : 'Open navigation menu'
            }
            aria-expanded={isOpen}
            aria-controls="main-navigation"
          >
            {isOpen ? (
              <X size={20} strokeWidth={2} />
            ) : (
              <Menu size={21} strokeWidth={2} />
            )}
          </button>

          <ul
            id="main-navigation"
            className={`shadow-mobile-navbar absolute top-11 right-0 z-20 flex w-48 origin-top-right flex-col items-stretch gap-0.5 rounded-xl border border-[#E2E8F0] bg-white p-2 text-[13px] transition-all duration-200 ease-out md:static md:z-auto md:w-auto md:translate-y-0 md:scale-100 md:flex-row md:items-center md:gap-6 md:rounded-none md:border-none md:bg-transparent md:p-0 md:text-sm md:opacity-100 md:shadow-none ${
              isOpen
                ? 'pointer-events-auto translate-y-0 scale-100 opacity-100'
                : 'pointer-events-none -translate-y-2 scale-95 opacity-0 md:pointer-events-auto'
            }`}
          >
            <li className={mobileItemClass}>
              <Mountain size={16} strokeWidth={2} className={mobileIconClass} />

              <NavLink
                to="/"
                onClick={closeMobileMenu}
                className={mobileLinkClass}
              >
                Tours
              </NavLink>
            </li>

            {/* <li className={mobileItemClass}>
              <BuildingIcon
                size={16}
                strokeWidth={2}
                className={mobileIconClass}
              />

              <NavLink
                to="#"
                onClick={closeMobileMenu}
                className={mobileLinkClass}
              >
                About Us
              </NavLink>
            </li>

            <li className={mobileItemClass}>
              <MailIcon size={16} strokeWidth={2} className={mobileIconClass} />

              <NavLink
                to="#"
                onClick={closeMobileMenu}
                className={mobileLinkClass}
              >
                Contact
              </NavLink>
            </li> */}

            {isAuthenticated ? (
              <>
                {/* <li className={mobileItemClass}>
                  <LogOut
                    size={16}
                    strokeWidth={2}
                    className={mobileIconClass}
                  />

                  <NavLink
                    to="/"
                    onClick={handleLogOut}
                    className={mobileLinkClass}
                  >
                    Logout
                  </NavLink>
                </li> */}

                <li className={mobileItemClass}>
                  <NavLink
                    to="/me"
                    onClick={closeMobileMenu}
                    className="flex flex-1 items-center gap-2.5 md:inline-flex md:gap-2"
                  >
                    {/* <img
                      src={`${BACKEND_URL}/img/users/${
                        user?.photo ?? 'default.jpg'
                      }`}
                      alt={user?.name ?? 'User'}
                      className="hidden h-9 w-9 rounded-full object-cover md:inline-block"
                    /> */}

                    <CircleUserRound
                      size={16}
                      strokeWidth={2}
                      className={mobileIconClass}
                    />

                    <span className="capitalize md:transition-colors md:duration-200 md:hover:text-[#0B7A31]">
                      {user?.name
                        ? `Hello, ${user.name.split(' ')[0]}!`
                        : 'Account'}
                    </span>
                  </NavLink>
                </li>
              </>
            ) : (
              <>
                <li className={mobileItemClass}>
                  <Lock size={16} strokeWidth={2} className={mobileIconClass} />

                  <NavLink
                    to="/login"
                    onClick={closeMobileMenu}
                    className={mobileLinkClass}
                  >
                    Login
                  </NavLink>
                </li>

                <li className="group mt-1 flex min-h-10 w-full items-center gap-2.5 rounded-lg bg-[#0B7A31] px-3 py-2 text-[13px] leading-5 font-semibold text-white transition-colors duration-200 hover:bg-[#096529] md:mt-0 md:block md:min-h-0 md:w-auto md:bg-transparent md:p-0 md:text-sm md:leading-normal md:text-[#111827] md:hover:bg-transparent">
                  <UserPlus
                    size={16}
                    strokeWidth={2}
                    className="shrink-0 text-white md:hidden"
                  />

                  <NavLink
                    to="/signup"
                    onClick={closeMobileMenu}
                    className="block flex-1 hover:border-[#0B7A31] md:inline-block md:rounded-4xl md:border-[0.8px] md:border-solid md:border-[#111827] md:px-4 md:py-1 md:transition-colors md:duration-200 md:hover:text-[#0B7A31]"
                  >
                    Sign Up
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
    </header>
  );
}
