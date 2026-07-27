import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Spinner from './Spinner';

export default function GuestRoute() {
  const { user, isCheckingAuth } = useAuth();
  const location = useLocation();
  const targetDestination = location?.state?.from || '/me/settings';
  console.log('target destination in guest route....', targetDestination);

  if (isCheckingAuth) {
    return <Spinner />;
  }

  if (user) {
    return <Navigate to={targetDestination} replace />;
  }

  return <Outlet />;
}
