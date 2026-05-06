import React, { useState } from 'react';
import { useAdmin } from '../../AdminContext';
import LoginModal from './LoginModal';
import AdminDashboard from './AdminDashboard';
import AdminBlogs from './AdminBlogs';
import AdminLinks from './AdminLinks';
import { logout } from '../../lib/auth';
import { useNavigate } from 'react-router-dom';

export default function AdminPage() {
  const { user } = useAdmin();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  if (!user) {
    return (
      <div className="relative z-10 min-h-[60vh] flex flex-col items-center justify-center">
        <LoginModal forceOpen={true} />
      </div>
    );
  }

  return (
    <div className="relative z-10 animate-in fade-in max-w-4xl mx-auto w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 gap-4">
        <div>
          <p className="text-[10px] uppercase tracking-[0.3em] font-mono mb-2 opacity-50" style={{ color: 'var(--text-primary)' }}>
            portfolio / admin
          </p>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tighter">
            Admin Dashboard<span className="animate-pulse ml-1" style={{ color: 'var(--accent)' }}>_</span>
          </h1>
        </div>
        
        <button
          onClick={handleLogout}
          className="text-xs px-4 py-2 rounded border transition-colors hover:bg-red-500/10 hover:text-red-400 hover:border-red-500/50 uppercase tracking-widest font-mono"
          style={{ color: 'var(--text-secondary)', borderColor: 'var(--border-subtle)' }}
        >
          Logout
        </button>
      </div>

      {/* Navigation Tabs */}
      <div className="flex flex-wrap gap-2 mb-10 border-b pb-4" style={{ borderColor: 'var(--border-subtle)' }}>
        {['dashboard', 'content', 'blogs', 'links', 'media'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 text-xs tracking-widest uppercase transition-colors rounded ${
              activeTab === tab 
                ? 'font-bold bg-[var(--text-primary)] text-[var(--bg-base)]' 
                : 'hover:text-[var(--accent)]'
            }`}
            style={{ 
              color: activeTab === tab ? '' : 'var(--text-secondary)'
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Content Area */}
      <div className="min-h-[50vh]">
        {activeTab === 'dashboard' && <AdminDashboard />}
        {activeTab === 'content' && (
          <div className="border border-dashed p-10 text-center rounded-xl" style={{ borderColor: 'var(--border-subtle)' }}>
            <p className="text-sm font-mono" style={{ color: 'var(--text-muted)' }}>Content Editor coming soon.</p>
          </div>
        )}
        {activeTab === 'blogs' && <AdminBlogs />}
        {activeTab === 'links' && <AdminLinks />}
        {activeTab === 'media' && (
          <div className="border border-dashed p-10 text-center rounded-xl" style={{ borderColor: 'var(--border-subtle)' }}>
            <p className="text-sm font-mono" style={{ color: 'var(--text-muted)' }}>Media Manager coming soon.</p>
          </div>
        )}
      </div>
    </div>
  );
}
