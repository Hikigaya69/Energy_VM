import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Layout } from './components/layout/Layout';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { Alerts } from './pages/Alerts';
import { Analytics } from './pages/Analytics';
import { Dashboard } from './pages/Dashboard';
import { Help } from './pages/Help';
import { Login } from './pages/Login';
import { Reports } from './pages/Reports';
import { Settings } from './pages/Settings';
import { TestTagValues } from './pages/TestTagValues';
import { VirtualMeters } from './pages/VirtualMeters';

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
                {/* <Route path="users" element={<Users />} /> */}
                <Route path="settings" element={<Settings />} />
                <Route path="help" element={<Help />} />
                <Route path="test" element={<TestTagValues />} />

              </Route>
            </Routes>
          </Router>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;