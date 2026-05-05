import React, { useEffect, useState } from 'react';
import { getLinks, getBlogs } from '../../lib/db';

export default function AdminDashboard() {
  const [stats, setStats] = useState({ links: 0, blogs: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const [links, blogs] = await Promise.all([getLinks(), getBlogs()]);
        setStats({ links: links.length, blogs: blogs.length });
      } catch (error) {
        console.error("Error fetching stats", error);
      } finally {
        setLoading(false);
      }
    }
    fetchStats();
  }, []);

  if (loading) return <div className="animate-pulse tracking-widest text-sm uppercase">Loading Dashboard...</div>;

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold tracking-tight uppercase" style={{ color: 'var(--text-primary)' }}>Overview</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div 
          className="rounded-xl p-8 flex flex-col items-center justify-center transition-all hover:scale-[1.02]"
          style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-subtle)', boxShadow: '0 8px 32px rgba(0,0,0,0.1)' }}
        >
          <h3 className="text-xs tracking-widest uppercase mb-4" style={{ color: 'var(--text-secondary)' }}>Total Links</h3>
          <span className="text-6xl font-bold" style={{ color: 'var(--accent)' }}>{stats.links}</span>
        </div>
        
        <div 
          className="rounded-xl p-8 flex flex-col items-center justify-center transition-all hover:scale-[1.02]"
          style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-subtle)', boxShadow: '0 8px 32px rgba(0,0,0,0.1)' }}
        >
          <h3 className="text-xs tracking-widest uppercase mb-4" style={{ color: 'var(--text-secondary)' }}>Total Blogs</h3>
          <span className="text-6xl font-bold" style={{ color: 'var(--accent)' }}>{stats.blogs}</span>
        </div>
      </div>
    </div>
  );
}
