/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useReducer } from 'react';

const ToursContext = createContext();
// const BASE_URL = 'https://natours-backend-6br6.onrender.com/app/v1';
const BASE_URL = import.meta.env.VITE_API_BASE_URL;
const initialState = {
  tours: [],
  selectedTour: {},
  error: null,
  isLoading: false,
};

function reducer(state, action) {
  switch (action.type) {
    case 'loading':
      return { ...state, isLoading: true, error: null };
    case 'tours/loaded':
      return { ...state, tours: action.payload, isLoading: false };
    case 'tour/loaded':
      return { ...state, selectedTour: action.payload, isLoading: false };
    case 'rejected':
      return { ...state, error: action.payload, isLoading: false, tours: [] };
    default:
      throw new Error('Unknown action type');
  }
}

function ToursProvider({ children }) {
  const [{ tours, selectedTour, error, isLoading }, dispatch] = useReducer(
    reducer,
    initialState,
  );

  async function getAllTours(queryString, signal = null) {
    dispatch({ type: 'loading' });
    console.log('query string in get all tours:', queryString);
    try {
      const res = await fetch(`${BASE_URL}/tours${queryString}`, { signal });
      if (!res.ok) {
        throw new Error(`There was an error loading tours.(${res.status})`);
      }
      const data = await res.json();
      dispatch({ type: 'tours/loaded', payload: data.data.tours });
    } catch (err) {
      //   console.log('in catch block: ....*****', err);
      if (err.name === 'AbortError') return;
      dispatch({
        type: 'rejected',
        payload: err,
      });
    }
  }

  async function getTour(tourId, signal = null) {
    dispatch({ type: 'loading' });
    try {
      const res = await fetch(`${BASE_URL}/tours/${tourId}`, { signal });
      if (!res.ok) {
        throw new Error(`There was an error loading tour.(${res.status})`);
      }
      const data = await res.json();
      dispatch({ type: 'tour/loaded', payload: data.data.tour });
    } catch (err) {
      if (err.name === 'AbortError') return;
      //   console.log('error:', err);
      dispatch({
        type: 'rejected',
        payload: err,
      });
    }
  }

  useEffect(function () {
    const controller = new AbortController();
    getAllTours('/', controller.signal);
    return () => controller.abort();
  }, []);

  return (
    <ToursContext.Provider
      value={{ getAllTours, getTour, tours, selectedTour, error, isLoading }}
    >
      {children}
    </ToursContext.Provider>
  );
}

function useTours() {
  const context = useContext(ToursContext);
  if (context === undefined) {
    throw new Error('ToursContext was used outside the ToursProvider');
  }
  return context;
}

export { ToursProvider, useTours };
