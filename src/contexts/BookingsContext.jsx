import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
} from 'react';
import { useAuth } from './AuthContext';

const BookingsContext = createContext();
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const initialState = {
  checkoutUrl: '',
  bookings: [],
  isLoading: false,
  error: null,
};

function reducer(state, action) {
  switch (action.type) {
    case 'loading':
      return { ...state, isLoading: true, error: null };
    case 'bookings/loaded':
      return {
        ...state,
        error: null,
        bookings: action.payload,
        isLoading: false,
      };
    case 'booking/checkout-session':
      return {
        ...state,
        checkoutUrl: action.payload,
        error: null,
        isLoading: false,
      };
    case 'rejected':
      return {
        ...state,
        error: action.payload,
        isLoading: false,
        bookings: [],
      };
    default:
      throw new Error('Unknown action type');
  }
}

function BookingsProvider({ children }) {
  const { user: currentUser } = useAuth();
  const [{ bookings, isLoading, error }, dispatch] = useReducer(
    reducer,
    initialState,
  );
  const getMyBookings = useCallback(async function () {
    try {
      dispatch({ type: 'loading' });
      const res = await fetch(`${API_BASE_URL}/bookings/my-bookings`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(`${data.message}(${res.status})`);
      }
      dispatch({ type: 'bookings/loaded', payload: data?.data?.bookings });
    } catch (err) {
      dispatch({ type: 'rejected', payload: err });
    }
  }, []);

  async function updateBooking(bookingId) {
    try {
      dispatch({ type: 'loading' });
      const res = await fetch(`${API_BASE_URL}/bookings/${bookingId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          bookingStatus: 'cancelled',
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(`${data.message}(${res.status})`);
      }
      await getMyBookings();
    } catch (err) {
      dispatch({ type: 'rejected', payload: err });
      throw err;
    }
  }

  async function createBooking(
    tour,
    user,
    price,
    paymentStatus,
    bookingStatus,
    customerEmail,
    customerName,
    tourName,
    imageCover,
    startDate,
    endDate,
    request,
    numberOfTravelers,
    phone,
  ) {
    try {
      dispatch({ type: 'loading' });
      const res = await fetch(`${API_BASE_URL}/bookings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          tour,
          user,
          price,
          paymentStatus,
          bookingStatus,
          customerEmail,
          customerName,
          tourName,
          imageCover,
          startDate,
          endDate,
          request,
          numberOfTravelers,
          phone,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(`${data.message}(${res.status})`);
      }
      await getMyBookings();
    } catch (err) {
      dispatch({ type: 'rejected', payload: err });
      throw err;
    }
  }

  async function createCheckoutSession(
    tourId,
    numberOfTravelers,
    request,
    phone,
    bookingId = null,
  ) {
    try {
      dispatch({ type: 'loading' });
      const res = await fetch(
        `${API_BASE_URL}/bookings/checkout-session/${tourId}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify({
            bookingId,
            numberOfTravelers,
            request,
            phone,
          }),
        },
      );
      const data = await res.json();
      if (!res.ok) {
        throw new Error(`${data.message}(${res.status})`);
      }
      dispatch({
        type: 'booking/checkout-session',
        payload: data?.data?.url,
      });
      window.location.href = data.data.url;
    } catch (err) {
      dispatch({ type: 'rejected', payload: err });
    }
  }

  useEffect(
    function () {
      console.log('currentUser in useEffect of BookingsContext: ', currentUser);
      if (!currentUser) return;
      getMyBookings();
    },
    [currentUser, getMyBookings],
  );

  return (
    <BookingsContext.Provider
      value={{
        getMyBookings,
        createCheckoutSession,
        createBooking,
        updateBooking,
        bookings,
        isLoading,
        error,
      }}
    >
      {children}
    </BookingsContext.Provider>
  );
}

function useBookings() {
  const context = useContext(BookingsContext);
  if (!context) {
    throw new Error('useBookings must be used within a BookingsProvider');
  }
  return context;
}
// eslint-disable-next-line react-refresh/only-export-components
export { useBookings, BookingsProvider };
