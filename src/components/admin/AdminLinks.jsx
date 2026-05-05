import React, { useEffect, useState } from 'react';
import { getLinks, addLink, deleteLink } from '../../lib/db';

export default function AdminLinks() {
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newLink, setNewLink] = useState({ title: '', url: '', icon: '', order_index: 0 });

  useEffect(() => {
    fetchLinks();
  }, []);

  async function fetchLinks() {
    setLoading(true);
    const data = await getLinks();
    setLinks(data);
    setLoading(false);
  }

  async function handleAdd(e) {
    e.preventDefault();
    await addLink({ ...newLink, order_index: Number(newLink.order_index) });
    setNewLink({ title: '', url: '', icon: '', order_index: 0 });
    fetchLinks();
  }

  async function handleDelete(id) {
    if (confirm('Are you sure you want to delete this link?')) {
      await deleteLink(id);
      fetchLinks();
    }
  }

  if (loading) return <div className="animate-pulse tracking-widest text-sm uppercase">Loading links...</div>;

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold tracking-tight uppercase" style={{ color: 'var(--text-primary)' }}>Manage Links</h2>
      
      <form 
        onSubmit={handleAdd} 
        className="p-6 rounded-xl flex flex-col gap-4"
        style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-subtle)' }}
      >
        <h3 className="text-xs tracking-widest uppercase mb-2" style={{ color: 'var(--text-secondary)' }}>Add New Link</h3>
        <div className="flex flex-wrap gap-4">
          <input type="text" placeholder="Title" value={newLink.title} onChange={e => setNewLink({...newLink, title: e.target.value})} className="rounded px-4 py-2 flex-1 min-w-[200px] text-sm outline-none transition-colors focus:border-[color:var(--accent)]" style={{ background: 'var(--bg-navbar)', border: '1px solid var(--border-subtle)', color: 'var(--text-primary)' }} required />
          <input type="url" placeholder="URL" value={newLink.url} onChange={e => setNewLink({...newLink, url: e.target.value})} className="rounded px-4 py-2 flex-1 min-w-[200px] text-sm outline-none transition-colors focus:border-[color:var(--accent)]" style={{ background: 'var(--bg-navbar)', border: '1px solid var(--border-subtle)', color: 'var(--text-primary)' }} required />
          <input type="text" placeholder="Icon Class (e.g. bi-github)" value={newLink.icon} onChange={e => setNewLink({...newLink, icon: e.target.value})} className="rounded px-4 py-2 flex-1 min-w-[150px] text-sm outline-none transition-colors focus:border-[color:var(--accent)]" style={{ background: 'var(--bg-navbar)', border: '1px solid var(--border-subtle)', color: 'var(--text-primary)' }} required />
          <input type="number" placeholder="Order" value={newLink.order_index} onChange={e => setNewLink({...newLink, order_index: e.target.value})} className="rounded px-4 py-2 w-24 text-sm outline-none transition-colors focus:border-[color:var(--accent)]" style={{ background: 'var(--bg-navbar)', border: '1px solid var(--border-subtle)', color: 'var(--text-primary)' }} />
          <button type="submit" className="px-6 py-2 rounded text-sm font-bold transition-opacity hover:opacity-90" style={{ background: 'var(--accent)', color: 'black' }}>Add Link</button>
        </div>
      </form>

      <div className="space-y-3">
        {links.map(link => (
          <div key={link.id} className="p-4 rounded-lg flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-colors hover:bg-white/5" style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-subtle)' }}>
            <div className="flex items-center">
              <i className={`${link.icon} mr-4 text-lg`} style={{ color: 'var(--accent)' }}></i>
              <div>
                <span className="font-bold text-sm block" style={{ color: 'var(--text-primary)' }}>{link.title}</span>
                <span className="text-xs truncate block max-w-xs md:max-w-md" style={{ color: 'var(--text-secondary)' }}>{link.url}</span>
              </div>
            </div>
            <div className="flex items-center gap-6 justify-between sm:justify-end">
              <span className="text-xs tracking-widest uppercase" style={{ color: 'var(--text-muted)' }}>Order: {link.order_index}</span>
              <button 
                onClick={() => handleDelete(link.id)} 
                className="text-xs border px-3 py-1 rounded transition-colors hover:bg-red-500/10 hover:text-red-400 hover:border-red-500/50"
                style={{ color: 'var(--text-secondary)', borderColor: 'var(--border-subtle)' }}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
        {links.length === 0 && <p className="text-xs tracking-widest uppercase text-center mt-8" style={{ color: 'var(--text-muted)' }}>No links found.</p>}
      </div>
    </div>
  );
}
