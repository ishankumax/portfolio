import React, { useState, useEffect } from 'react';
import { db } from '../../lib/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { useAdmin } from '../../AdminContext';
import { RiEditLine, RiSaveLine, RiCloseLine } from 'react-icons/ri';
import ReactMarkdown from 'react-markdown';

export default function EditableText({ id, section, defaultText, as: Component = 'span', className = '', renderAsMarkdown = false }) {
  const { isAdmin, isEditing: globalIsEditing } = useAdmin();
  const [content, setContent] = useState(defaultText);
  const [isEditMode, setIsEditMode] = useState(false);
  const [draft, setDraft] = useState(defaultText);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function fetchContent() {
      try {
        const docRef = doc(db, 'content_blocks', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setContent(docSnap.data().content);
          setDraft(docSnap.data().content);
        }
      } catch (err) {
        console.error("Failed to fetch content block:", id, err);
      }
    }
    fetchContent();
  }, [id]);

  const handleSave = async () => {
    setSaving(true);
    try {
      await setDoc(doc(db, 'content_blocks', id), {
        id,
        section,
        content: draft,
        updatedAt: new Date()
      }, { merge: true });
      setContent(draft);
      setIsEditMode(false);
    } catch (err) {
      console.error("Failed to save content:", err);
      alert("Failed to save. Check console for details.");
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setDraft(content);
    setIsEditMode(false);
  };

  // If we are actively editing this block
  if (isEditMode) {
    return (
      <div className={`relative ${className}`} style={{ minWidth: '100%' }}>
        {Component === 'p' || Component === 'div' ? (
          <textarea
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            className="w-full bg-black/50 text-white border border-[var(--accent)] p-2 rounded outline-none font-mono text-sm min-h-[300px]"
          />
        ) : (
          <input
            type="text"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            className="w-full bg-black/50 text-white border border-[var(--accent)] p-1 rounded outline-none font-mono"
          />
        )}
        <div className="flex gap-2 mt-2 justify-end">
          <button 
            onClick={handleCancel}
            disabled={saving}
            className="flex items-center gap-1 text-[10px] uppercase font-bold tracking-widest hover:text-white transition-colors"
            style={{ color: 'var(--text-muted)' }}
          >
            <RiCloseLine /> Cancel
          </button>
          <button 
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-1 text-[10px] uppercase font-bold tracking-widest transition-colors"
            style={{ color: 'var(--accent)' }}
          >
            <RiSaveLine /> {saving ? 'Saving...' : 'Save'}
          </button>
        </div>
      </div>
    );
  }

  // Normal view (or admin view with hover icon)
  return (
    <Component className={`relative group ${className}`}>
      {renderAsMarkdown ? <ReactMarkdown>{content}</ReactMarkdown> : content}
      {isAdmin && globalIsEditing && (
        <button
          onClick={() => setIsEditMode(true)}
          className="absolute -top-3 -right-3 p-1.5 rounded-full transition-opacity bg-black/80 border z-50 shadow-[0_0_15px_rgba(0,0,0,0.5)]"
          style={{ borderColor: 'var(--accent)', color: 'var(--accent)' }}
          title={`Edit ${id}`}
        >
          <RiEditLine size={16} />
        </button>
      )}
    </Component>
  );
}
