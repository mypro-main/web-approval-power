// scrollbar
import 'simplebar-react/dist/simplebar.min.css';

// image
import 'react-lazy-load-image-component/src/effects/blur.css';

import 'react-toastify/dist/ReactToastify.css';

import 'react-quill/dist/quill.snow.css';

// ----------------------------------------------------------------------

// routes
// theme
import ThemeProvider from 'src/theme';
// hooks
import { useScrollToTop } from 'src/hooks/use-scroll-to-top';
// components
import { MotionLazy } from 'src/components/animate/motion-lazy';
import ProgressBar from 'src/components/progress-bar';
import { SettingsDrawer, SettingsProvider } from 'src/components/settings';
// auth
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { APIProvider } from '@vis.gl/react-google-maps';
import { id } from 'date-fns/locale/id';
import { Outlet, ScrollRestoration } from 'react-router-dom';
import { AuthConsumer, AuthProvider } from 'src/auth/context/jwt';
import Toaster from './components/toaster';

// ----------------------------------------------------------------------

const MAP_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

// Create a client
const queryClient = new QueryClient();

export default function App() {
  useScrollToTop();

  return (
    <QueryClientProvider client={queryClient}>
      <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={id}>
        <AuthProvider>
          <SettingsProvider
            defaultSettings={{
              themeMode: 'light', // 'light' | 'dark'
              themeDirection: 'ltr', //  'rtl' | 'ltr'
              themeContrast: 'default', // 'default' | 'bold'
              themeLayout: 'vertical', // 'vertical' | 'horizontal' | 'mini'
              themeColorPresets: 'default', // 'default' | 'cyan' | 'purple' | 'blue' | 'orange' | 'red'
              themeStretch: false,
            }}
          >
            <ThemeProvider>
              <APIProvider apiKey={MAP_API_KEY}>
                <MotionLazy>
                  <AuthConsumer>
                    <Outlet />
                    <SettingsDrawer />
                    <ProgressBar />
                    <Toaster />
                    <ScrollRestoration />
                  </AuthConsumer>
                </MotionLazy>
              </APIProvider>
            </ThemeProvider>
          </SettingsProvider>
        </AuthProvider>
      </LocalizationProvider>
    </QueryClientProvider>
  );
}
