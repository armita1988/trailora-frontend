import { Navigate, Route, Routes } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import TourDetails from '../pages/TourDetails';
import MainLayout from './MainLayout';
import NotFound from '../pages/NotFound';
import Dashboard from '../pages/Dashboard';
import UserSettings from './UserSettings';
import UserBookings from './UserBookings';
import UserReviews from './UserReviews';
import UserBills from './UserBills';
import ProtectedRoute from './ProtectedRoute';
import ForgotPassword from '../pages/ForgotPassword';
import GuestRoute from './GuestRoute';

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />}></Route>
        <Route element={<GuestRoute />}>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/forgot-password" element={<ForgotPassword />}></Route>
        </Route>

        <Route path="/tour/:name" element={<TourDetails />}></Route>
        <Route
          path="/me"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="settings" replace />} />
          <Route path="settings" element={<UserSettings />} />
          <Route path="bookings" element={<UserBookings />} />
          <Route path="reviews" element={<UserReviews />} />
          <Route path="bills" element={<UserBills />} />
        </Route>
      </Route>
      <Route path="*" element={<NotFound />}></Route>
    </Routes>
  );
}

export default App;
