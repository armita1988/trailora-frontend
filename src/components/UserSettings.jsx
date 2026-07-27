import { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import Toast from '../components/Toast';

export default function UserSettings() {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const [toast, setToast] = useState(null);

  const { user, updateUserSettings, updatePassword, error } =
    useOutletContext();

  const [name, setName] = useState(() => {
    return user.name || '';
  });

  const [email, setEmail] = useState(() => {
    return user.email || '';
  });

  const [preview, setPreview] = useState(() => {
    return `${BACKEND_URL}/img/users/${user?.photo ?? 'default.jpg'}`;
  });

  const [uploadedPhoto, setUploadedPhoto] = useState(null);

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleUploadPhoto = (e) => {
    const file = e.target.files[0];
    setToast(null);
    if (!file || !file.type.startsWith('image/')) {
      setToast({ status: 'error', message: 'please upload a valid image!' });
      return;
    }

    setUploadedPhoto(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSaveSettings = async (e) => {
    e.preventDefault();

    setToast(null);
    const formData = new FormData();

    formData.append('name', name);
    formData.append('email', email);

    if (uploadedPhoto instanceof File) {
      formData.append('photo', uploadedPhoto);
    }

    const wasSuccessful = await updateUserSettings(formData);
    if (wasSuccessful) {
      setToast({
        status: 'success',
        message: 'Setting updated successfully!',
      });
    }
  };

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    setToast(null);
    const wasSuccessful = await updatePassword(
      currentPassword,
      newPassword,
      confirmPassword,
    );
    if (wasSuccessful) {
      setToast({
        status: 'success',
        message: 'Password updated successfully!',
      });
    }
  };

  useEffect(
    function () {
      if (error) {
        setToast({
          status: 'error',
          message: error.message,
        });
      } else {
        return;
      }
    },
    [error],
  );

  return (
    <>
      {toast && (
        <Toast
          message={toast.message}
          status={toast.status}
          handleShow={() => setToast(null)}
        />
      )}

      <div className="flex w-full flex-1 flex-col items-stretch gap-6">
        <div className="shadow-overview xs:px-6 mx-auto w-full rounded-2xl border border-[#E2E8F0] bg-white px-5 py-7 sm:px-8 sm:py-9 lg:px-10">
          <h2 className="mb-2 text-xl font-semibold tracking-tight text-[#0B7A31] sm:text-2xl">
            Your account settings
          </h2>

          <p className="mb-8 text-sm leading-6 font-normal text-[#64748B]">
            Manage your personal information and profile photo.
          </p>

          <form
            onSubmit={handleSaveSettings}
            className="flex w-full max-w-3xl flex-col gap-5"
          >
            <div className="flex flex-col items-start gap-2">
              <label
                htmlFor="name"
                className="text-sm font-semibold text-[#334155]"
              >
                Name
              </label>

              <input
                className="font-inter w-full rounded-xl border border-[#DCE3E0] bg-[#F8FAF9] px-4 py-3.5 text-sm font-normal text-[#334155] transition-colors duration-200 placeholder:text-[#94A3B8] focus:border-[#0B7A31] focus:bg-white focus:ring-2 focus:ring-[#0B7A31]/10 focus:outline-none"
                placeholder={user.name || 'Your name'}
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
                placeholder={user.email || 'example@example.com'}
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="xs:flex-row xs:items-center xs:gap-5 flex flex-col items-start gap-4 pt-2">
              <img
                src={preview}
                alt={user.name}
                className="h-24 w-24 shrink-0 rounded-full border-4 border-white object-cover shadow-[0_5px_18px_rgba(15,23,42,0.12)] sm:h-28 sm:w-28"
              />

              <label
                htmlFor="user-photo"
                className="inline-flex cursor-pointer items-center justify-center rounded-xl border border-[#CFE0D5] bg-white px-4 py-2.5 text-sm font-semibold text-[#0B7A31] transition-colors duration-200 hover:border-[#0B7A31] hover:bg-[#F0F7F2]"
              >
                Choose new photo
              </label>

              <input
                type="file"
                accept="image/*"
                name="photo"
                id="user-photo"
                onChange={handleUploadPhoto}
                className="hidden"
              />
            </div>

            <button
              type="submit"
              className="xs:w-auto mt-3 min-h-11 w-full cursor-pointer self-end rounded-xl bg-[#0B7A31] px-6 py-2.5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-[#096529] focus:ring-2 focus:ring-[#0B7A31]/20 focus:outline-none"
            >
              Save settings
            </button>
          </form>
        </div>

        <div className="shadow-overview xs:px-6 mx-auto w-full rounded-2xl border border-[#E2E8F0] bg-white px-5 py-7 sm:px-8 sm:py-9 lg:px-10">
          <h2 className="mb-2 text-xl font-semibold tracking-tight text-[#0B7A31] sm:text-2xl">
            Password change
          </h2>

          <p className="mb-8 text-sm leading-6 font-normal text-[#64748B]">
            Use a strong and unique password to keep your account secure.
          </p>

          <form
            onSubmit={handleUpdatePassword}
            className="flex w-full max-w-3xl flex-col gap-5"
          >
            <div className="flex flex-col items-start gap-2">
              <label
                htmlFor="password-current"
                className="text-sm font-semibold text-[#334155]"
              >
                Current password
              </label>

              <input
                className="font-inter w-full rounded-xl border border-[#DCE3E0] bg-[#F8FAF9] px-4 py-3.5 text-sm font-normal text-[#334155] transition-colors duration-200 focus:border-[#0B7A31] focus:bg-white focus:ring-2 focus:ring-[#0B7A31]/10 focus:outline-none"
                id="password-current"
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                required
              />
            </div>

            <div className="flex flex-col items-start gap-2">
              <label
                htmlFor="password-new"
                className="text-sm font-semibold text-[#334155]"
              >
                New password
              </label>

              <input
                className="font-inter w-full rounded-xl border border-[#DCE3E0] bg-[#F8FAF9] px-4 py-3.5 text-sm font-normal text-[#334155] transition-colors duration-200 focus:border-[#0B7A31] focus:bg-white focus:ring-2 focus:ring-[#0B7A31]/10 focus:outline-none"
                id="password-new"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </div>

            <div className="flex flex-col items-start gap-2">
              <label
                htmlFor="password-confirm"
                className="text-sm font-semibold text-[#334155]"
              >
                Confirm password
              </label>

              <input
                className="font-inter w-full rounded-xl border border-[#DCE3E0] bg-[#F8FAF9] px-4 py-3.5 text-sm font-normal text-[#334155] transition-colors duration-200 focus:border-[#0B7A31] focus:bg-white focus:ring-2 focus:ring-[#0B7A31]/10 focus:outline-none"
                id="password-confirm"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="xs:w-auto mt-3 min-h-11 w-full cursor-pointer self-end rounded-xl bg-[#0B7A31] px-6 py-2.5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-[#096529] focus:ring-2 focus:ring-[#0B7A31]/20 focus:outline-none"
            >
              Update password
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
