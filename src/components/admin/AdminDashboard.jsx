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

  if (loading) return <div>Loading dashboard...</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-[#111] border border-[#333] rounded-lg p-6 flex flex-col items-center justify-center">
          <h3 className="text-gray-400 text-sm mb-2">Total Links</h3>
          <span className="text-4xl text-[var(--accent)] font-bold">{stats.links}</span>
        </div>
        
        <div className="bg-[#111] border border-[#333] rounded-lg p-6 flex flex-col items-center justify-center">
          <h3 className="text-gray-400 text-sm mb-2">Total Blogs</h3>
          <span className="text-4xl text-[var(--accent)] font-bold">{stats.blogs}</span>
        </div>
      </div>
    </div>
  );
}
