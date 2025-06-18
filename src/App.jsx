import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Layout } from './components/layout/Layout';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { Dashboard } from './pages/Dashboard';
import { Login } from './pages/Login';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      cacheTime: 10 * 60 * 1000, // 10 minutes
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

// Placeholder components for other routes
const VirtualMeters = () => (
  <div className="p-6">
    <h1 className="text-2xl font-bold mb-4">Virtual Meters</h1>
    <p className="text-gray-600 dark:text-gray-400">Virtual meters management coming soon...</p>
  </div>
);

const Analytics = () => (
  <div className="p-6">
    <h1 className="text-2xl font-bold mb-4">Analytics</h1>
    <p className="text-gray-600 dark:text-gray-400">Advanced analytics coming soon...</p>
  </div>
);

const Reports = () => (
  <div className="p-6">
    <h1 className="text-2xl font-bold mb-4">Reports</h1>
    <p className="text-gray-600 dark:text-gray-400">Reporting system coming soon...</p>
  </div>
);

const Alerts = () => (
  <div className="p-6">
    <h1 className="text-2xl font-bold mb-4">Alerts</h1>
    <p className="text-gray-600 dark:text-gray-400">Alert management coming soon...</p>
  </div>
);

const Users = () => (
  <div className="p-6">
    <h1 className="text-2xl font-bold mb-4">Users</h1>
    <p className="text-gray-600 dark:text-gray-400">User management coming soon...</p>
  </div>
);

const Settings = () => (
  <div className="p-6">
    <h1 className="text-2xl font-bold mb-4">Settings</h1>
    <p className="text-gray-600 dark:text-gray-400">Settings panel coming soon...</p>
  </div>
);

const Help = () => (
  <div className="p-6">
    <h1 className="text-2xl font-bold mb-4">Help & Support</h1>
    <p className="text-gray-600 dark:text-gray-400">Help documentation coming soon...</p>
  </div>
);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AuthProvider>
          <Router>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <Layout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<Dashboard />} />
                <Route path="meters" element={<VirtualMeters />} />
                <Route path="analytics" element={<Analytics />} />
                <Route path="reports" element={<Reports />} />
                <Route path="alerts" element={<Alerts />} />
                <Route path="users" element={<Users />} />
                <Route path="settings" element={<Settings />} />
                <Route path="help" element={<Help />} />
              </Route>
            </Routes>
          </Router>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;