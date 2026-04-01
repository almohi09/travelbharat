import { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { MdMenu, MdClose, MdDashboard, MdPlace, MdCategory, MdMap } from 'react-icons/md';
import { useAuthStore } from '../../store/auth.store';

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { user } = useAuthStore();

  const menuItems = [
    { label: 'Dashboard', icon: MdDashboard, href: '/admin/dashboard' },
    { label: 'Places', icon: MdPlace, href: '/admin/places' },
    { label: 'States', icon: MdMap, href: '/admin/states' },
    { label: 'Categories', icon: MdCategory, href: '/admin/categories' },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`bg-gray-900 text-white transition-all duration-300 ${
          sidebarOpen ? 'w-64' : 'w-20'
        }`}
      >
        <div className="p-4 flex items-center justify-between">
          {sidebarOpen && <h1 className="font-bold text-xl">Admin</h1>}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-gray-800 rounded-lg"
          >
            {sidebarOpen ? <MdClose /> : <MdMenu />}
          </button>
        </div>

        <nav className="mt-8 space-y-2 px-2">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-800 transition-colors"
              title={!sidebarOpen ? item.label : ''}
            >
              <item.icon size={24} />
              {sidebarOpen && <span>{item.label}</span>}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="p-8">
          <div className="mb-6 flex justify-between items-center">
            <h2 className="text-2xl font-bold">Admin Dashboard</h2>
            <div className="text-sm text-gray-600">
              Welcome, <span className="font-semibold">{user?.name}</span>
            </div>
          </div>
          <Outlet />
        </div>
      </main>
    </div>
  );
}
