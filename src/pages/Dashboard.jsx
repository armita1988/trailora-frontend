import { LogOut } from 'lucide-react';
import { NavLink, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function Dashboard() {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const { user, updateUserSettings, updatePassword, error, logout } = useAuth();

  const handleLogout = async (e) => {
    try {
      e.preventDefault();
      await logout();
    } catch (err) {
      console.log('during logout...', err);
    }
  };

  const backgroundUrl = `${BACKEND_URL}/img/dashboard-bg.png`;

  const navLinkClass = ({ isActive }) =>
    `flex min-h-14 w-full flex-col items-center justify-center gap-1 rounded-lg border-b-2 px-1 py-2 text-[0.68rem] font-medium transition-colors duration-200
    xs:text-xs
    md:min-h-0 md:flex-row md:justify-start md:gap-3 md:rounded-xl md:border-b-0 md:border-l-4 md:px-4 md:py-3 md:text-sm
    ${
      isActive
        ? 'border-[#0B7A31] bg-[#F0F7F2] font-semibold text-[#0B7A31]'
        : 'border-transparent text-[#64748B] hover:bg-[#F6F9F7] hover:text-[#0B7A31]'
    }`;

  return (
    <div className="xs:px-5 mx-auto flex w-full max-w-7xl flex-col items-stretch gap-6 bg-[#F8FAF9] px-4 py-6 sm:px-6 md:flex-row md:gap-8 md:py-12 lg:px-8 xl:py-14">
      <nav
        style={{
          '--dashboard-background': `
            linear-gradient(
              to bottom,
              rgba(248, 250, 249, 0.96),
              rgba(242, 248, 244, 0.90),
              rgba(226, 239, 231, 0.40)
            ),
            url('${backgroundUrl}')
          `,
        }}
        className="flex w-full shrink-0 overflow-hidden rounded-xl border border-[#E2E8F0] bg-white [background-image:none] shadow-[0_10px_30px_rgba(15,23,42,0.08)] md:min-h-150 md:w-64 md:rounded-2xl md:[background-image:var(--dashboard-background)] md:bg-cover md:bg-bottom md:bg-no-repeat lg:w-72"
      >
        <ul className="grid w-full list-none grid-cols-4 gap-1 p-1.5 md:flex md:flex-col md:gap-2 md:p-4">
          <li className="w-full">
            <NavLink to="settings" className={navLinkClass}>
              <svg className="h-5 w-5 shrink-0 fill-current">
                <use xlinkHref="/imgs/icons.svg#icon-settings"></use>
              </svg>

              <span>Settings</span>
            </NavLink>
          </li>

          <li className="w-full">
            <NavLink to="bookings" className={navLinkClass}>
              <svg className="h-5 w-5 shrink-0 fill-current">
                <use xlinkHref="/imgs/icons.svg#icon-briefcase"></use>
              </svg>

              <span>Bookings</span>
            </NavLink>
          </li>

          <li className="w-full">
            <NavLink to="reviews" className={navLinkClass}>
              <svg className="h-5 w-5 shrink-0 fill-current">
                <use xlinkHref="/imgs/icons.svg#icon-star"></use>
              </svg>

              <span>Reviews</span>
            </NavLink>
          </li>

          {/* <li className="w-full">
            <NavLink to="bills" className={navLinkClass}>
              <svg className="h-5 w-5 shrink-0 fill-current">
                <use xlinkHref="/imgs/icons.svg#icon-credit-card"></use>
              </svg>

              <span>Bills</span>
            </NavLink>
          </li> */}
          <li className="w-full">
            <NavLink to="/" className={navLinkClass} onClick={handleLogout}>
              <LogOut size={20} className="" />
              <span>Log Out</span>
            </NavLink>
          </li>
        </ul>
      </nav>

      <Outlet context={{ user, updateUserSettings, updatePassword, error }} />
    </div>
  );
}
