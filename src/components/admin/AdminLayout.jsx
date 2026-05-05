import React, { useEffect, useState } from 'react';
import { Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import { subscribeToAuthChanges, logout } from '../../lib/auth';
import AdminLogin from './AdminLogin';
import AdminDashboard from './AdminDashboard';
import AdminLinks from './AdminLinks';
import AdminBlogs from './AdminBlogs';

export default function AdminLayout() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const unsubscribe = subscribeToAuthChanges((user) => {
      setUser(user);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate('/admin');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white font-mono">
        <div className="animate-pulse">Loading Admin...</div>
      </div>
    );
  }

  if (!user) {
    return <AdminLogin />;
  }

  const navItems = [
    { path: '/admin', label: 'Dashboard' },
    { path: '/admin/links', label: 'Manage Links' },
    { path: '/admin/blogs', label: 'Manage Blogs' }
  ];

  return (
    <div className="min-h-screen bg-black text-white font-mono flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 border-b md:border-b-0 md:border-r border-[#333] bg-[#0a0a0a] p-6 flex flex-col">
        <div className="mb-8">
          <h2 className="text-xl font-bold text-[var(--accent)]">Admin Panel</h2>
          <p className="text-xs text-gray-500 mt-1">{user.email}</p>
        </div>
        
        <nav className="flex-1 space-y-2">
          {navItems.map(item => {
            const active = location.pathname === item.path || 
                          (item.path !== '/admin' && location.pathname.startsWith(item.path));
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`block px-4 py-2 rounded text-sm transition-colors ${
                  active ? 'bg-[var(--accent)] text-black font-bold' : 'text-gray-400 hover:bg-[#222]'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="mt-8 pt-4 border-t border-[#333]">
          <Link to="/" className="block px-4 py-2 text-sm text-gray-400 hover:text-white mb-2">
            ← Back to Site
          </Link>
          <button
            onClick={handleLogout}
            className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-red-500/10 rounded transition-colors"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto">
        <Routes>
          <Route path="/" element={<AdminDashboard />} />
          <Route path="/links" element={<AdminLinks />} />
          <Route path="/blogs" element={<AdminBlogs />} />
        </Routes>
      </main>
    </div>
  );
}
