import { createContext, useContext, useEffect, useReducer } from 'react';
import { useAuth } from './AuthContext';

const ReviewContext = createContext();
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const initialState = {
  isLoading: false,
  error: null,
  reviews: [],
};
function reducer(state, action) {
  switch (action.type) {
    case 'loading':
      return { ...state, isLoading: true, error: null };
    case 'reviews/loaded':
      return {
        ...state,
        isLoading: false,
        error: null,
        reviews: action.payload,
      };
    case 'review/created':
      return {
        ...state,
        isLoading: false,
        error: null,
        reviews: [action.payload, ...state.reviews],
      };
    case 'review/updated':
      return {
        ...state,
        isLoading: false,
        error: null,
        reviews: state.reviews.map((review) =>
          review._id === action.payload._id ? action.payload : review,
        ),
      };
    case 'review/deleted':
      return {
        ...state,
        isLoading: false,
        error: null,
        reviews: state.reviews.filter(
          (review) => review._id !== action.payload,
        ),
      };
    case 'rejected':
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };

    default:
      throw new Error('unknown action type');
  }
}

function ReviewProvider({ children }) {
  const { user: currentUser } = useAuth();
  const [{ reviews, error, isLoading }, dispatch] = useReducer(
    reducer,
    initialState,
  );

  async function createReview(tourId, review) {
    try {
      dispatch({ type: 'loading' });
      const res = await fetch(`${API_BASE_URL}/tours/${tourId}/reviews/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(review),
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(`${data.message}(${res.status})`);
      }

      // dispatch({ type: 'review/created', payload: data?.data?.review });
      await getMyReviews();
    } catch (err) {
      dispatch({ type: 'rejected', payload: err });
    }
  }

  async function deleteReview(reviewId) {
    try {
      dispatch({ type: 'loading' });
      const res = await fetch(`${API_BASE_URL}/reviews/${reviewId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      });

      if (!res.ok) {
        throw new Error(`Failed to delete review. (${res.status})`);
      }

      dispatch({ type: 'review/deleted', payload: reviewId });
    } catch (err) {
      dispatch({ type: 'rejected', payload: err });
    }
  }

  async function updateReview(reviewId, review) {
    try {
      dispatch({ type: 'loading' });
      const res = await fetch(`${API_BASE_URL}/reviews/${reviewId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(review),
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(`${data.message}(${res.status})`);
      }

      // dispatch({ type: 'review/updated', payload: data?.data?.review });
      await getMyReviews();
    } catch (err) {
      dispatch({ type: 'rejected', payload: err });
    }
  }

  async function getMyReviews() {
    try {
      dispatch({ type: 'loading' });
      const res = await fetch(`${API_BASE_URL}/reviews/my-reviews`, {
        credentials: 'include',
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(`${data.message}(${res.status})`);
      }

      dispatch({ type: 'reviews/loaded', payload: data?.data?.reviews ?? [] });
    } catch (err) {
      dispatch({ type: 'rejected', payload: err });
    }
  }

  useEffect(() => {
    if (!currentUser) return;
    getMyReviews();
  }, [currentUser]);
  return (
    <ReviewContext.Provider
      value={{
        getMyReviews,
        createReview,
        updateReview,
        deleteReview,
        reviews,
        error,
        isLoading,
      }}
    >
      {children}
    </ReviewContext.Provider>
  );
}

function useReviews() {
  const context = useContext(ReviewContext);
  if (context === undefined) {
    throw new Error('useReviews must be used within a ReviewProvider');
  } else {
    return context;
  }
}
// eslint-disable-next-line react-refresh/only-export-components
export { ReviewProvider, useReviews };
