import { BrowserRouter, Link, Navigate, Route, Routes } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";
import useAuth from "./hooks/useAuth";
import HomePage from "./app/(main)/page";
import StatesPage from "./app/(main)/states/page";
import StateDetailPage from "./app/(main)/states/[stateSlug]/page";
import CityDetailPage from "./app/(main)/states/[stateSlug]/[citySlug]/page";
import PlacesPage from "./app/(main)/places/page";
import PlaceDetailPage from "./app/(main)/places/[placeSlug]/page";
import CategoryPage from "./app/(main)/categories/[category]/page";
import SearchPage from "./app/(main)/search/page";
import LoginPage from "./app/(auth)/login/page";
import RegisterPage from "./app/(auth)/register/page";
import AdminDashboardPage from "./app/admin/dashboard/page";
import AdminStatesPage from "./app/admin/states/page";
import AdminCategoriesPage from "./app/admin/categories/page";
import AdminPlacesPage from "./app/admin/places/page";
import NewPlacePage from "./app/admin/places/new/page";
import EditPlacePage from "./app/admin/places/[id]/edit/page";

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) return <div className="container"><p className="muted">Checking session...</p></div>;
  return user ? children : <Navigate to="/login" replace />;
}

function Shell({ children }) {
  const { user, logout } = useAuth();

  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="topbar-inner">
          <Link className="brand" to="/">
            <span className="brand-mark">TB</span> TravelBharat
          </Link>
          <nav className="nav-links">
            <Link className="nav-link" to="/states">
              States
            </Link>
            <Link className="nav-link" to="/places">
              Places
            </Link>
            <Link className="nav-link" to="/search">
              Search
            </Link>
            {user ? (
              <Link className="nav-link" to="/admin/dashboard">
                Admin
              </Link>
            ) : null}
            {user ? (
              <button className="btn btn-ghost" onClick={logout} type="button">
                Logout
              </button>
            ) : (
              <Link className="btn btn-primary" to="/login">
                Login
              </Link>
            )}
          </nav>
        </div>
      </header>
      {children}
    </div>
  );
}

export default function App() {
  return (
    <HelmetProvider>
      <Helmet>
        <title>TravelBharat - Explore India State by State</title>
        <meta
          name="description"
          content="Discover Indian tourist places by state, city, and category with practical travel details."
        />
      </Helmet>
      <BrowserRouter>
        <Shell>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/states" element={<StatesPage />} />
            <Route path="/states/:stateSlug" element={<StateDetailPage />} />
            <Route path="/states/:stateSlug/:citySlug" element={<CityDetailPage />} />
            <Route path="/places" element={<PlacesPage />} />
            <Route path="/places/:placeSlug" element={<PlaceDetailPage />} />
            <Route path="/categories/:category" element={<CategoryPage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute>
                  <AdminDashboardPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/states"
              element={
                <ProtectedRoute>
                  <AdminStatesPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/categories"
              element={
                <ProtectedRoute>
                  <AdminCategoriesPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/places"
              element={
                <ProtectedRoute>
                  <AdminPlacesPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/places/new"
              element={
                <ProtectedRoute>
                  <NewPlacePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/places/:id/edit"
              element={
                <ProtectedRoute>
                  <EditPlacePage />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<div className="container"><div className="card"><h2>Page not found</h2></div></div>} />
          </Routes>
        </Shell>
      </BrowserRouter>
    </HelmetProvider>
  );
}
