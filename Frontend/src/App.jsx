import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Layout from './components/Layout';
import Auth from './pages/Auth';
import SlotRequest from './pages/SlotRequest';
import Schedules from './pages/Schedules';
import Admin from './pages/Admin';

function PrivateRoute({ children }) {
  const { auth } = useAuth();
  return auth.token ? <>{children}</> : <Navigate to="/" />;
}

function AdminRoute({ children }) {
  const { auth } = useAuth();
  return auth.token && auth.user?.role === 'admin' ? (
    <>{children}</>
  ) : (
    <Navigate to="/" />
  );
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Auth />} />
            <Route
              path="/request"
              element={
                <PrivateRoute>
                  <SlotRequest />
                </PrivateRoute>
              }
            />
            <Route path="/schedules" element={<Schedules />} />
            <Route
              path="/admin"
              element={
                <AdminRoute>
                  <Admin />
                </AdminRoute>
              }
            />
          </Routes>
        </Layout>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;