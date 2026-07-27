/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useReducer } from 'react';

// const BASE_URL = 'https://natours-backend-6br6.onrender.com/app/v1';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const AuthContext = createContext();
const initialState = {
  user: null,
  error: null,
  isLoading: false,
  isCheckingAuth: true,
};

function reducer(state, action) {
  switch (action.type) {
    case 'loading':
      return { ...state, isLoading: true, error: null };
    case 'auth/checking':
      return { ...state, isCheckingAuth: true, error: null };
    case 'user/loaded':
      return {
        ...state,
        user: action.payload,
        error: null,
        isLoading: false,
        isCheckingAuth: false,
      };
    case 'user/logout':
      return {
        ...state,
        error: null,
        user: null,
        isLoading: false,
        isCheckingAuth: false,
      };
    case 'user/updated':
      return {
        ...state,
        user: action.payload,
        error: null,
        isLoading: false,
        isCheckingAuth: false,
      };
    case 'user/forgotPassword':
      return { ...state, error: null, isLoading: false, isCheckingAuth: false };
    case 'user/passwordUpdated':
      return { ...state, error: null, isLoading: false, isCheckingAuth: false };

    case 'rejected':
      return {
        ...state,
        error: action.payload,
        isLoading: false,
        isCheckingAuth: false,
      };
    default:
      throw new Error('action type is not defined.');
  }
}

function AuthProvider({ children }) {
  const [{ user, error, isLoading, isCheckingAuth }, dispatch] = useReducer(
    reducer,
    initialState,
  );

  async function updateUserSettings(formData) {
    // console.log(' update user settings in AuthContext...', [
    //   ...formData.entries(),
    // ]);
    try {
      dispatch({ type: 'loading' });
      const res = await fetch(`${API_BASE_URL}/users/updateMe`, {
        method: 'PATCH',
        credentials: 'include',
        body: formData,
      });
      const data = await res.json();
      // console.log('update user settings response data...', data);
      // console.log('update user settings response...', res);
      if (!res.ok) {
        throw new Error(`${data.message}(${res.status})`);
      }
      dispatch({ type: 'user/updated', payload: data?.data?.user });
      return true;
    } catch (err) {
      // console.log('in update user settings catch...', err);
      dispatch({ type: 'rejected', payload: err });
      return false;
    }
  }

  async function login(email, password) {
    try {
      dispatch({ type: 'auth/checking' });

      const res = await fetch(`${API_BASE_URL}/users/login`, {
        headers: { 'content-type': 'application/json' },
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(`${data.message}(${res.status})`);
      }
      dispatch({ type: 'user/loaded', payload: data.data.user });
    } catch (err) {
      dispatch({ type: 'rejected', payload: err });
      throw err;
    }
  }
  async function signup(name, email, password, passwordConfirm) {
    try {
      // console.log('input data for signup .....', {
      //   name,
      //   email,
      //   password,
      //   passwordConfirm,
      // });
      dispatch({ type: 'loading' });
      const res = await fetch(`${API_BASE_URL}/users/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ name, email, password, passwordConfirm }),
      });
      const data = await res.json();
      // console.log('signup responbse data:....', data);
      // console.log('signup responbse response:....', res);
      if (!res.ok) {
        throw new Error(`${data.message} (${res.status})`);
      }
      dispatch({ type: 'user/loaded', payload: data?.data?.user });
      return true;
    } catch (err) {
      // console.log('in catch...', err);
      dispatch({ type: 'rejected', payload: err });
      return false;
    }
  }

  async function getCurrentUser() {
    try {
      dispatch({ type: 'auth/checking' });
      const res = await fetch(`${API_BASE_URL}/users/me`, {
        credentials: 'include',
      });
      const data = await res.json();
      if (res.status === 401 || res.status === 403) {
        // console.log('RESPONSE in get current user....', res);
        // console.log('DATA in get current user ....', data);
        dispatch({ type: 'user/logout' });
        return;
      }
      if (!res.ok) {
        // console.log(data.message);
        throw new Error(`${data.message} (${res.status})`);
      }
      dispatch({ type: 'user/loaded', payload: data?.data?.user ?? null });
    } catch (err) {
      dispatch({ type: 'rejected', payload: err });
    }
  }

  async function logout() {
    try {
      dispatch({ type: 'loading' });
      const res = await fetch(`${API_BASE_URL}/users/logout`, {
        method: 'POST',
        credentials: 'include',
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(`${data.message} (${res.status})`);
      }
    } catch (err) {
      console.error('Logout request failed:', err);
    } finally {
      dispatch({ type: 'user/logout' });
    }
  }

  async function forgotPassword(email) {
    try {
      dispatch({ type: 'loading' });
      const res = await fetch(`${API_BASE_URL}/users/forgotPassword`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
        // credentials: 'include',
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(`${data.message} (${res.status})`);
      }

      dispatch({ type: 'user/forgotPassword' });
      return true;
    } catch (err) {
      dispatch({ type: 'rejected', payload: err });
      return false;
    }
  }

  async function updatePassword(passwordCurrent, password, passwordConfirm) {
    try {
      dispatch({ type: 'loading' });
      const res = await fetch(`${API_BASE_URL}/users/updateMyPassword`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ passwordCurrent, password, passwordConfirm }),
        credentials: 'include',
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(`${data.message} (${res.status})`);
      }

      dispatch({ type: 'user/passwordUpdated' });
      return true;
    } catch (err) {
      dispatch({ type: 'rejected', payload: err });
      return false;
    }
  }

  //load current user
  useEffect(function () {
    getCurrentUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        error,
        isLoading,
        isCheckingAuth,
        login,
        signup,
        logout,
        getCurrentUser,
        updateUserSettings,
        forgotPassword,
        updatePassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('AuthContext was used outside the AuthProvider');
  }
  return context;
}

export { AuthProvider, useAuth };
