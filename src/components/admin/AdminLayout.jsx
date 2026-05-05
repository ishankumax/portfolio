import React, { useEffect, useState } from 'react';
import { Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import { subscribeToAuthChanges, logout } from '../../lib/auth';
import AdminLogin from './AdminLogin';
import AdminDashboard from './AdminDashboard';
import AdminLinks from './AdminLinks';
import AdminBlogs from './AdminBlogs';

// We will create AdminContent next
const AdminContent = () => (
  <div className="p-6 animate-in fade-in zoom-in-95">
    <h2 className="text-xl font-bold mb-4 uppercase tracking-tight" style={{ color: 'var(--text-primary)' }}>Content Manager</h2>
    <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>Editable sections (hero, about, etc.) will go here.</p>
  </div>
);

// Whitelisted phone numbers and emails (matches Login)
const ALLOWED_PHONES = ['+919501825673'];
const ALLOWED_EMAILS = ['ishankumax@gmail.com'];

export default function AdminLayout() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const unsubscribe = subscribeToAuthChanges((u) => {
      // Check both phone and email
      const isAllowedPhone = u && u.phoneNumber && ALLOWED_PHONES.includes(u.phoneNumber);
      const isAllowedEmail = u && u.email && ALLOWED_EMAILS.includes(u.email.toLowerCase());
      
      if (isAllowedPhone || isAllowedEmail) {
        setUser(u);
      } else {
        setUser(null);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center font-mono animate-in fade-in" style={{ backgroundColor: 'var(--bg-default)', color: 'var(--text-primary)' }}>
        <div className="animate-pulse tracking-widest text-sm uppercase">Loading System...</div>
      </div>
    );
  }

  // Block direct access if unauthenticated
  if (!user) {
    return <AdminLogin />;
  }

  const navItems = [
    { path: '/admin', label: 'Dashboard' },
    { path: '/admin/content', label: 'Content' },
    { path: '/admin/blogs', label: 'Blogs' },
    { path: '/admin/links', label: 'Links' }
  ];

  const currentNav = navItems.find(n => n.path === location.pathname) || { label: 'Admin' };
  const userIdentifier = user.email || user.phoneNumber;

  return (
    <div className="min-h-screen font-mono flex flex-col md:flex-row animate-in fade-in" style={{ backgroundColor: 'var(--bg-default)', color: 'var(--text-primary)' }}>
      {/* Sidebar */}
      <aside 
        className="w-full md:w-64 border-b md:border-b-0 md:border-r flex flex-col shrink-0"
        style={{ backgroundColor: 'var(--bg-navbar)', borderColor: 'var(--border-subtle)' }}
      >
        <div className="p-6 border-b" style={{ borderColor: 'var(--border-subtle)' }}>
          <div className="flex items-center gap-2 mb-1">
            <h2 className="text-lg font-bold uppercase tracking-tighter" style={{ color: 'var(--accent)' }}>Admin Panel</h2>
            {/* Dev Badge */}
            <span className="text-[9px] px-1.5 py-0.5 rounded border tracking-widest uppercase" style={{ color: 'var(--accent)', borderColor: 'var(--accent)', background: 'var(--bg-elevated)' }}>Secure</span>
          </div>
          <p className="text-[10px] truncate" style={{ color: 'var(--text-muted)' }}>{userIdentifier}</p>
        </div>
        
        <nav className="flex-1 space-y-1 p-4">
          {navItems.map(item => {
            const active = location.pathname === item.path || 
                          (item.path !== '/admin' && location.pathname.startsWith(item.path));
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`block px-4 py-2.5 rounded text-sm transition-all ${
                  active ? 'font-bold tracking-tight' : 'hover:opacity-80 hover:translate-x-1'
                }`}
                style={active ? { background: 'var(--accent)', color: 'black' } : { color: 'var(--text-secondary)' }}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t" style={{ borderColor: 'var(--border-subtle)' }}>
          <Link to="/" className="block px-4 py-2 text-xs transition-all hover:text-white mb-2" style={{ color: 'var(--text-muted)' }}>
            ← Back to Site
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Topbar */}
        <header className="h-16 px-6 border-b flex items-center justify-between shrink-0" style={{ borderColor: 'var(--border-subtle)', backgroundColor: 'var(--bg-navbar)' }}>
          <h1 className="text-lg font-bold tracking-tight uppercase">{currentNav.label}</h1>
          <button
            onClick={handleLogout}
            className="text-xs px-4 py-1.5 rounded transition-all hover:bg-red-500/10 hover:text-red-400"
            style={{ color: 'var(--text-secondary)', border: '1px solid var(--border-subtle)' }}
          >
            Logout
          </button>
        </header>

        {/* Scrollable Content Area */}
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-4xl mx-auto w-full p-6 md:p-10">
            <Routes>
              <Route path="/" element={<AdminDashboard />} />
              <Route path="/content" element={<AdminContent />} />
              <Route path="/links" element={<AdminLinks />} />
              <Route path="/blogs" element={<AdminBlogs />} />
            </Routes>
          </div>
        </main>
      </div>
    </div>
  );
}
