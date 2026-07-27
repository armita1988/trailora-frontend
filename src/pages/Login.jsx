import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Spinner from '../components/Spinner';
import Toast from '../components/Toast';

export default function Login() {
  const [showSuccess, setShowSuccess] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { login, user, error, isCheckingAuth, isLoading } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from || '/';

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await login(email, password);
      setShowSuccess(true);

      const options = {
        replace: true,
        state: {
          tourId: location.state?.tourId || undefined,
          from: location.state?.from || undefined,
        },
      };

      setTimeout(() => {
        navigate(from, options);
      }, 1);
    } catch {
      // console.log('login error in login component...', err);
    }
  };

  useEffect(
    function () {
      console.log('current user after login:...', user);
    },
    [user],
  );

  // if (isCheckingAuth || isLoading) return <Spinner />;

  return (
    <>
      {showSuccess && (
        <Toast
          message="Login successful!"
          status="success"
          handleShow={setShowSuccess}
        />
      )}

      <div className="xs:px-6 mx-auto my-10 flex w-10/12 max-w-md flex-col items-stretch gap-7 rounded-2xl border border-[#E2E8F0] bg-white px-5 py-7 shadow-[0_10px_30px_rgba(15,23,42,0.08)] sm:my-14 sm:px-8 sm:py-9">
        <div>
          <h2 className="mb-2 text-xl font-semibold tracking-tight text-[#0B7A31] sm:text-2xl">
            Log in to your account
          </h2>

          <p className="text-sm leading-6 font-normal text-[#64748B]">
            Welcome back. Enter your details to continue.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex w-full flex-col gap-5">
          <div className="flex flex-col items-start gap-2">
            <label
              htmlFor="email"
              className="text-sm font-semibold text-[#334155]"
            >
              Email address
            </label>

            <input
              className="font-inter w-full rounded-xl border border-[#DCE3E0] bg-[#F8FAF9] px-4 py-3.5 text-sm font-normal text-[#334155] transition-colors duration-200 placeholder:text-[#94A3B8] focus:border-[#0B7A31] focus:bg-white focus:ring-2 focus:ring-[#0B7A31]/10 focus:outline-none"
              placeholder="example@example.com"
              id="email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="flex flex-col items-start gap-2">
            <div className="flex w-full items-center justify-between gap-4">
              <label
                htmlFor="password"
                className="text-sm font-semibold text-[#334155]"
              >
                Password
              </label>

              <Link
                to="/forgot-password"
                className="text-xs font-semibold text-[#0B7A31] transition-colors duration-200 hover:text-[#096529] hover:underline"
              >
                Forgot password?
              </Link>
            </div>

            <input
              className="font-inter w-full rounded-xl border border-[#DCE3E0] bg-[#F8FAF9] px-4 py-3.5 text-sm font-normal text-[#334155] transition-colors duration-200 focus:border-[#0B7A31] focus:bg-white focus:ring-2 focus:ring-[#0B7A31]/10 focus:outline-none"
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="mt-2 min-h-11 w-full cursor-pointer rounded-xl bg-[#0B7A31] px-6 py-2.5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-[#096529] focus:ring-2 focus:ring-[#0B7A31]/20 focus:outline-none"
          >
            Login
          </button>
        </form>
      </div>
    </>
  );
}
