import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './components/App.jsx';
import { BrowserRouter } from 'react-router-dom';
import { ToursProvider } from './contexts/ToursContext.jsx';
import { AuthProvider } from './contexts/AuthContext.jsx';
import '../index.css';
import 'leaflet/dist/leaflet.css';
import { BookingsProvider } from './contexts/BookingsContext.jsx';
import { ReviewProvider } from './contexts/ReviewContext.jsx';
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <BookingsProvider>
          <ReviewProvider>
            <ToursProvider>
              <App />
            </ToursProvider>
          </ReviewProvider>
        </BookingsProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
);
