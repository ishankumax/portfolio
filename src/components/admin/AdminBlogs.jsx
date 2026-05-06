import React, { useEffect, useState } from 'react';
import { getBlogs, addBlog, deleteBlog } from '../../lib/db';
import { useContent } from '../../ContentContext';

export default function AdminBlogs() {
  const { refreshContent } = useContent();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [newBlog, setNewBlog] = useState({ title: '', slug: '', excerpt: '', content: '', is_published: false });

  useEffect(() => {
    fetchBlogs();
  }, []);

  async function fetchBlogs() {
    setLoading(true);
    const data = await getBlogs();
    setBlogs(data);
    setLoading(false);
  }

  async function handleAdd(e) {
    e.preventDefault();
    await addBlog({ 
      ...newBlog, 
      created_at: new Date().toISOString()
    });
    setNewBlog({ title: '', slug: '', excerpt: '', content: '', is_published: false });
    setIsFormOpen(false);
    await fetchBlogs();
    refreshContent();
  }

  async function handleDelete(id) {
    if (confirm('Are you sure you want to delete this blog?')) {
      await deleteBlog(id);
      await fetchBlogs();
      refreshContent();
    }
  }

  if (loading) return <div className="animate-pulse tracking-widest text-sm uppercase">Loading blogs...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold tracking-tight uppercase" style={{ color: 'var(--text-primary)' }}>Manage Blogs</h2>
        <button 
          onClick={() => setIsFormOpen(!isFormOpen)} 
          className="px-6 py-2 rounded text-sm font-bold transition-opacity hover:opacity-90"
          style={{ background: 'var(--accent)', color: 'black' }}
        >
          {isFormOpen ? 'Cancel' : 'New Blog'}
        </button>
      </div>
      
      {isFormOpen && (
        <form 
          onSubmit={handleAdd} 
          className="p-6 rounded-xl space-y-4 mb-8"
          style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-subtle)' }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs mb-1 tracking-widest uppercase" style={{ color: 'var(--text-secondary)' }}>Title</label>
              <input type="text" value={newBlog.title} onChange={e => setNewBlog({...newBlog, title: e.target.value})} className="w-full rounded px-4 py-2 text-sm outline-none transition-colors focus:border-[color:var(--accent)]" style={{ background: 'var(--bg-navbar)', border: '1px solid var(--border-subtle)', color: 'var(--text-primary)' }} required />
            </div>
            <div>
              <label className="block text-xs mb-1 tracking-widest uppercase" style={{ color: 'var(--text-secondary)' }}>Slug</label>
              <input type="text" value={newBlog.slug} onChange={e => setNewBlog({...newBlog, slug: e.target.value})} className="w-full rounded px-4 py-2 text-sm outline-none transition-colors focus:border-[color:var(--accent)]" style={{ background: 'var(--bg-navbar)', border: '1px solid var(--border-subtle)', color: 'var(--text-primary)' }} required />
            </div>
          </div>
          <div>
            <label className="block text-xs mb-1 tracking-widest uppercase" style={{ color: 'var(--text-secondary)' }}>Excerpt</label>
            <textarea value={newBlog.excerpt} onChange={e => setNewBlog({...newBlog, excerpt: e.target.value})} className="w-full rounded px-4 py-2 h-20 text-sm outline-none transition-colors focus:border-[color:var(--accent)]" style={{ background: 'var(--bg-navbar)', border: '1px solid var(--border-subtle)', color: 'var(--text-primary)' }} required></textarea>
          </div>
          <div>
            <label className="block text-xs mb-1 tracking-widest uppercase" style={{ color: 'var(--text-secondary)' }}>Content (Markdown)</label>
            <textarea value={newBlog.content} onChange={e => setNewBlog({...newBlog, content: e.target.value})} className="w-full rounded px-4 py-3 h-64 font-mono text-sm outline-none transition-colors focus:border-[color:var(--accent)]" style={{ background: 'var(--bg-navbar)', border: '1px solid var(--border-subtle)', color: 'var(--text-primary)' }} required></textarea>
          </div>
          <div className="flex items-center gap-2 pt-2">
            <input type="checkbox" id="published" checked={newBlog.is_published} onChange={e => setNewBlog({...newBlog, is_published: e.target.checked})} className="accent-[var(--accent)]" />
            <label htmlFor="published" className="text-sm cursor-pointer" style={{ color: 'var(--text-primary)' }}>Published to live site</label>
          </div>
          <button type="submit" className="w-full py-3 mt-4 rounded text-sm font-bold transition-opacity hover:opacity-90" style={{ background: 'var(--accent)', color: 'black' }}>Save Blog</button>
        </form>
      )}

      <div className="space-y-4">
        {blogs.map(blog => (
          <div key={blog.id} className="p-5 rounded-lg flex flex-col md:flex-row md:items-center justify-between gap-4 transition-colors hover:bg-white/5" style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-subtle)' }}>
            <div>
              <h3 className="font-bold text-base flex items-center gap-3" style={{ color: 'var(--text-primary)' }}>
                {blog.title}
                {!blog.is_published && <span className="text-[9px] px-1.5 py-0.5 rounded border tracking-widest uppercase" style={{ color: 'orange', borderColor: 'orange', background: 'rgba(255, 165, 0, 0.1)' }}>Draft</span>}
              </h3>
              <p className="text-xs mt-1.5" style={{ color: 'var(--text-secondary)' }}>/{blog.slug} • {new Date(blog.created_at).toLocaleDateString()}</p>
            </div>
            <div className="flex items-center gap-4">
              <button 
                onClick={() => handleDelete(blog.id)} 
                className="text-xs border px-4 py-1.5 rounded transition-colors hover:bg-red-500/10 hover:text-red-400 hover:border-red-500/50"
                style={{ color: 'var(--text-secondary)', borderColor: 'var(--border-subtle)' }}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
        {blogs.length === 0 && <p className="text-xs tracking-widest uppercase text-center mt-8" style={{ color: 'var(--text-muted)' }}>No blogs found.</p>}
      </div>
    </div>
  );
}
