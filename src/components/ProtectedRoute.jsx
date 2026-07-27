import { useAuth } from '../contexts/AuthContext';
import Spinner from './Spinner';
import { Navigate, useLocation } from 'react-router-dom';

export default function ProtectedRoute({ children }) {
  const { isCheckingAuth, user } = useAuth();
  const location = useLocation();
  console.log('in protected location...', location);

  console.log('in protected: isCheckingAuth...', isCheckingAuth);
  if (isCheckingAuth) {
    return <Spinner />;
  }
  // console.log('in protected:', user);
  if (!user) return <Navigate to="/login" state={{ from: location }} />;
  return children;
}
