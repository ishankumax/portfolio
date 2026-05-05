import React, { useEffect, useState } from 'react';
import { getBlogs, addBlog, deleteBlog } from '../../lib/db';

export default function AdminBlogs() {
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
    fetchBlogs();
  }

  async function handleDelete(id) {
    if (confirm('Are you sure you want to delete this blog?')) {
      await deleteBlog(id);
      fetchBlogs();
    }
  }

  if (loading) return <div>Loading blogs...</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Manage Blogs</h1>
        <button onClick={() => setIsFormOpen(!isFormOpen)} className="bg-[var(--accent)] text-black px-4 py-2 rounded font-bold">
          {isFormOpen ? 'Cancel' : 'New Blog'}
        </button>
      </div>
      
      {isFormOpen && (
        <form onSubmit={handleAdd} className="bg-[#111] border border-[#333] p-6 rounded-lg mb-8 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-gray-400 mb-1">Title</label>
              <input type="text" value={newBlog.title} onChange={e => setNewBlog({...newBlog, title: e.target.value})} className="w-full bg-black border border-[#333] rounded px-3 py-2" required />
            </div>
            <div>
              <label className="block text-xs text-gray-400 mb-1">Slug</label>
              <input type="text" value={newBlog.slug} onChange={e => setNewBlog({...newBlog, slug: e.target.value})} className="w-full bg-black border border-[#333] rounded px-3 py-2" required />
            </div>
          </div>
          <div>
            <label className="block text-xs text-gray-400 mb-1">Excerpt</label>
            <textarea value={newBlog.excerpt} onChange={e => setNewBlog({...newBlog, excerpt: e.target.value})} className="w-full bg-black border border-[#333] rounded px-3 py-2 h-20" required></textarea>
          </div>
          <div>
            <label className="block text-xs text-gray-400 mb-1">Content (Markdown)</label>
            <textarea value={newBlog.content} onChange={e => setNewBlog({...newBlog, content: e.target.value})} className="w-full bg-black border border-[#333] rounded px-3 py-2 h-64 font-mono text-sm" required></textarea>
          </div>
          <div className="flex items-center gap-2">
            <input type="checkbox" id="published" checked={newBlog.is_published} onChange={e => setNewBlog({...newBlog, is_published: e.target.checked})} />
            <label htmlFor="published" className="text-sm">Published</label>
          </div>
          <button type="submit" className="bg-[var(--accent)] text-black px-6 py-2 rounded font-bold w-full">Save Blog</button>
        </form>
      )}

      <div className="space-y-4">
        {blogs.map(blog => (
          <div key={blog.id} className="bg-[#111] border border-[#333] p-4 rounded-lg flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h3 className="font-bold text-lg flex items-center gap-2">
                {blog.title}
                {!blog.is_published && <span className="bg-yellow-500/20 text-yellow-500 text-[10px] px-2 py-0.5 rounded">Draft</span>}
              </h3>
              <p className="text-sm text-gray-500 mt-1">/{blog.slug} • {new Date(blog.created_at).toLocaleDateString()}</p>
            </div>
            <div className="flex items-center gap-4">
              <button onClick={() => handleDelete(blog.id)} className="text-red-400 hover:text-red-300 px-3 py-1 border border-red-900 rounded">Delete</button>
            </div>
          </div>
        ))}
        {blogs.length === 0 && <p className="text-gray-500">No blogs found.</p>}
      </div>
    </div>
  );
}
