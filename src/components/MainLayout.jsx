import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import Toast from './Toast';
import { useAuth } from '../contexts/AuthContext';
import { useEffect, useState } from 'react';
import Hero from './Hero';
import SearchBar from './SearchBar';

export default function MainLayout() {
  const location = useLocation();
  const { error } = useAuth();
  const [showToast, setShowToast] = useState(false);
  useEffect(() => {
    if (error && error !== 'undefined') {
      setShowToast(true);
    }
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col bg-[#F8FAF9]">
      {error && showToast && (
        <Toast message={error.message} handleShow={setShowToast} />
      )}
      <Header />
      {location.pathname === '/' && <Hero />}
      <main className="flex grow justify-center">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
