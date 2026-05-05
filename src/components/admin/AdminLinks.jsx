import React, { useEffect, useState } from 'react';
import { getLinks, addLink, deleteLink, updateLink } from '../../lib/db';

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
    if (confirm('Are you sure?')) {
      await deleteLink(id);
      fetchLinks();
    }
  }

  if (loading) return <div>Loading links...</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Manage Links</h1>
      
      <form onSubmit={handleAdd} className="bg-[#111] border border-[#333] p-4 rounded-lg mb-8 flex flex-wrap gap-4">
        <input type="text" placeholder="Title" value={newLink.title} onChange={e => setNewLink({...newLink, title: e.target.value})} className="bg-black border border-[#333] rounded px-3 py-1 flex-1 min-w-[200px]" required />
        <input type="url" placeholder="URL" value={newLink.url} onChange={e => setNewLink({...newLink, url: e.target.value})} className="bg-black border border-[#333] rounded px-3 py-1 flex-1 min-w-[200px]" required />
        <input type="text" placeholder="Icon Class (e.g. bi-github)" value={newLink.icon} onChange={e => setNewLink({...newLink, icon: e.target.value})} className="bg-black border border-[#333] rounded px-3 py-1 flex-1 min-w-[150px]" required />
        <input type="number" placeholder="Order" value={newLink.order_index} onChange={e => setNewLink({...newLink, order_index: e.target.value})} className="bg-black border border-[#333] rounded px-3 py-1 w-24" />
        <button type="submit" className="bg-[var(--accent)] text-black px-4 py-1 rounded font-bold">Add</button>
      </form>

      <div className="space-y-2">
        {links.map(link => (
          <div key={link.id} className="bg-[#111] border border-[#333] p-4 rounded-lg flex items-center justify-between">
            <div>
              <i className={`${link.icon} mr-2 text-[var(--accent)]`}></i>
              <span className="font-bold">{link.title}</span>
              <span className="text-gray-500 ml-2 text-sm">({link.url})</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-xs text-gray-500">Order: {link.order_index}</span>
              <button onClick={() => handleDelete(link.id)} className="text-red-400 hover:text-red-300">Delete</button>
            </div>
          </div>
        ))}
        {links.length === 0 && <p className="text-gray-500">No links found.</p>}
      </div>
    </div>
  );
}
