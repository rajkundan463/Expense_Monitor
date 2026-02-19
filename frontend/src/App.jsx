import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Layout from "./layouts/Layout";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import Analytics from "./pages/Analytics";
import Budget from "./pages/Budget";
import Admin from "./pages/Admin";

/* =========================
   Protected Route Wrapper
========================= */
const Protected = ({ children, role }) => {
  const { user } = useAuth();

  // Not logged in → go to auth page
  if (!user) return <Navigate to="/auth" replace />;

  // Role restriction (admin only route)
  if (role && user.role !== role) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>

          {/* Auth Page (Login + Signup Toggle) */}
          <Route path="/auth" element={<Auth />} />

          {/* Protected Layout */}
          <Route element={<Layout />}>

            {/* Dashboard */}
            <Route
              path="/"
              element={
                <Protected>
                  <Dashboard />
                </Protected>
              }
            />

            {/* Analytics */}
            <Route
              path="/analytics"
              element={
                <Protected>
                  <Analytics />
                </Protected>
              }
            />

            {/* Budget */}
            <Route
              path="/budget"
              element={
                <Protected>
                  <Budget />
                </Protected>
              }
            />

            {/* Admin (Role Protected) */}
            <Route
              path="/admin"
              element={
                <Protected role="admin">
                  <Admin />
                </Protected>
              }
            />

          </Route>

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/auth" replace />} />

        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
