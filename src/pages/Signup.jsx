import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import Spinner from '../components/Spinner';
import Toast from '../components/Toast';

export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [showToast, setShowToast] = useState(false);

  const { signup, error, isCheckingAuth, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const wasSuccessful = await signup(name, email, password, passwordConfirm);
    setShowToast(true);
    if (wasSuccessful) {
      setTimeout(function () {
        console.log('is navigating ...');
        navigate('/me');
      }, 1000);
    }
  };

  // useEffect(
  //   function () {
  //     if (user) {
  //       // console.log('current user after signup:...', user);
  //       navigate('/');
  //     }
  //   },
  //   [user, navigate],
  // );

  // if (error) return <Toast error={error} />;
  if (isCheckingAuth || isLoading) return <Spinner />;

  return (
    <>
      {showToast && !error && (
        <Toast
          message="You signed up successfully!"
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

      <div className="xs:px-6 mx-auto my-10 flex w-10/12 max-w-md flex-col items-stretch gap-7 rounded-2xl border border-[#E2E8F0] bg-white px-5 py-7 shadow-[0_10px_30px_rgba(15,23,42,0.08)] sm:my-14 sm:px-8 sm:py-9">
        <div>
          <h2 className="mb-2 text-xl font-semibold tracking-tight text-[#0B7A31] sm:text-2xl">
            Create your account
          </h2>

          <p className="text-sm leading-6 font-normal text-[#64748B]">
            Enter your details to start exploring and booking tours.
          </p>
        </div>

        {error && <p>{error.message}</p>}

        <form onSubmit={handleSubmit} className="flex w-full flex-col gap-5">
          <div className="flex flex-col items-start gap-2">
            <label
              htmlFor="name"
              className="text-sm font-semibold text-[#334155]"
            >
              Your name
            </label>

            <input
              className="font-inter w-full rounded-xl border border-[#DCE3E0] bg-[#F8FAF9] px-4 py-3.5 text-sm font-normal text-[#334155] transition-colors duration-200 placeholder:text-[#94A3B8] focus:border-[#0B7A31] focus:bg-white focus:ring-2 focus:ring-[#0B7A31]/10 focus:outline-none"
              placeholder="Your name"
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="flex flex-col items-start gap-2">
            <label
              htmlFor="email"
              className="text-sm font-semibold text-[#334155]"
            >
              Email address
            </label>

            <input
              className="font-inter w-full rounded-xl border border-[#DCE3E0] bg-[#F8FAF9] px-4 py-3.5 text-sm font-normal text-[#334155] transition-colors duration-200 placeholder:text-[#94A3B8] focus:border-[#0B7A31] focus:bg-white focus:ring-2 focus:ring-[#0B7A31]/10 focus:outline-none"
              placeholder="you@example.com"
              id="email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="flex flex-col items-start gap-2">
            <label
              htmlFor="password"
              className="text-sm font-semibold text-[#334155]"
            >
              Password
            </label>

            <input
              className="font-inter w-full rounded-xl border border-[#DCE3E0] bg-[#F8FAF9] px-4 py-3.5 text-sm font-normal text-[#334155] transition-colors duration-200 focus:border-[#0B7A31] focus:bg-white focus:ring-2 focus:ring-[#0B7A31]/10 focus:outline-none"
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="flex flex-col items-start gap-2">
            <label
              htmlFor="confirmpassword"
              className="text-sm font-semibold text-[#334155]"
            >
              Confirm password
            </label>

            <input
              className="font-inter w-full rounded-xl border border-[#DCE3E0] bg-[#F8FAF9] px-4 py-3.5 text-sm font-normal text-[#334155] transition-colors duration-200 focus:border-[#0B7A31] focus:bg-white focus:ring-2 focus:ring-[#0B7A31]/10 focus:outline-none"
              id="confirmpassword"
              type="password"
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="mt-2 min-h-11 w-full cursor-pointer rounded-xl bg-[#0B7A31] px-6 py-2.5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-[#096529] focus:ring-2 focus:ring-[#0B7A31]/20 focus:outline-none"
          >
            Sign up
          </button>
        </form>
      </div>
    </>
  );
}
