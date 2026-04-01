import { useState } from 'react';
import { Link } from 'react-router-dom';
import { MdMenu, MdClose, MdSearch, MdPerson } from 'react-icons/md';
import { useAuthStore } from '../../store/auth.store';
import Button from '../ui/Button';

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { user, logout } = useAuthStore();

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Places', href: '/places' },
    { label: 'States', href: '/states' },
  ];

  return (
    <nav className="topbar">
      <div className="topbar-inner">
        <Link to="/" className="brand">
          🌍 TravelBharat
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex nav-links flex-1 justify-center">
          {navLinks.map((link) => (
            <Link key={link.href} to={link.href} className="nav-link">
              {link.label}
            </Link>
          ))}
        </div>

        {/* Search Bar */}
        <div className="hidden md:flex items-center gap-2 flex-1 max-w-xs">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search places..."
              className="w-full input text-sm pl-10"
            />
            <MdSearch className="absolute left-3 top-2.5 text-gray-400" />
          </div>
        </div>

        {/* User Menu */}
        <div className="flex items-center gap-3">
          {user ? (
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                aria-label="User menu"
              >
                <MdPerson size={20} />
              </button>
              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                  <div className="p-4 border-b border-gray-200">
                    <p className="font-semibold text-sm">{user.name}</p>
                    <p className="text-xs text-gray-500">{user.email}</p>
                  </div>
                  <div className="p-2">
                    <Link to="/profile" className="block px-3 py-2 text-sm hover:bg-gray-100 rounded-lg transition-colors">
                      Profile
                    </Link>
                    {user.role === 'admin' && (
                      <Link to="/admin/dashboard" className="block px-3 py-2 text-sm hover:bg-gray-100 rounded-lg transition-colors">
                        Admin Dashboard
                      </Link>
                    )}
                    <button
                      onClick={() => {
                        logout();
                        setShowUserMenu(false);
                      }}
                      className="w-full text-left px-3 py-2 text-sm hover:bg-red-50 text-red-600 rounded-lg transition-colors"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link to="/login">
                <Button variant="ghost" size="sm">
                  Login
                </Button>
              </Link>
              <Link to="/register">
                <Button variant="primary" size="sm">
                  Register
                </Button>
              </Link>
            </>
          )}

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 hover:bg-gray-100 rounded-lg"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <MdClose size={24} /> : <MdMenu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white">
          <div className="p-4 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                onClick={() => setMobileOpen(false)}
                className="block px-4 py-2 text-sm font-medium hover:bg-gray-100 rounded-lg transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <input
              type="text"
              placeholder="Search..."
              className="w-full input mt-2"
            />
          </div>
        </div>
      )}
    </nav>
  );
}
