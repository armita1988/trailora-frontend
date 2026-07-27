import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Toast from '../components/Toast';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [showToast, setShowToast] = useState(false);

  const { forgotPassword, error, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const wasSuccessful = await forgotPassword(email);
    setShowToast(true);
    if (wasSuccessful) {
      setTimeout(
        {
          function() {
            navigate('/login');
          },
        },
        3000,
      );
    }
  };

  return (
    <>
      {showToast && !error && (
        <Toast
          message="Password reset link has been sent to this email"
          status="success"
          handleShow={setShowToast}
        />
      )}

      {showToast && error && (
        <Toast
          message={error.message}
          status="error"
          handleShow={setShowToast}
        />
      )}

      <div className="xs:px-6 mx-auto my-10 flex w-11/12 max-w-md flex-col items-stretch gap-7 rounded-2xl border border-[#E2E8F0] bg-white px-5 py-7 shadow-[0_10px_30px_rgba(15,23,42,0.08)] sm:my-14 sm:px-8 sm:py-9">
        <div>
          <h2 className="mb-2 text-xl font-semibold tracking-tight text-[#0B7A31] sm:text-2xl">
            Forgot your password?
          </h2>

          <p className="text-sm leading-6 font-normal text-[#64748B]">
            Enter your email address and we’ll send you a link to reset your
            password.
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
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="mt-1 min-h-11 w-full cursor-pointer rounded-xl bg-[#0B7A31] px-6 py-2.5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-[#096529] focus:ring-2 focus:ring-[#0B7A31]/20 focus:outline-none disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isLoading ? 'Sending reset link...' : 'Send reset link'}
          </button>
        </form>

        <div className="border-t border-[#E2E8F0] pt-5 text-center">
          <Link
            to="/login"
            className="text-sm font-semibold text-[#0B7A31] transition-colors duration-200 hover:text-[#096529] hover:underline"
          >
            Back to login
          </Link>
        </div>
      </div>
    </>
  );
}
