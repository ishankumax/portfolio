import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, query, orderBy, getDoc, setDoc } from 'firebase/firestore';
import { db } from './firebase';

// ==========================================
// CONTENT API
// ==========================================

export async function getContentDocument(docId) {
  const docRef = doc(db, 'content', docId);
  const snapshot = await getDoc(docRef);
  if (snapshot.exists()) {
    return snapshot.data();
  }
  return null;
}

export async function updateContentDocument(docId, data) {
  const docRef = doc(db, 'content', docId);
  await setDoc(docRef, data, { merge: true });
}

// ==========================================
// LINKS API
// ==========================================

export async function getLinks() {
  const linksRef = collection(db, 'links');
  const q = query(linksRef, orderBy('order_index', 'asc'));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

export async function addLink(linkData) {
  const linksRef = collection(db, 'links');
  const docRef = await addDoc(linksRef, linkData);
  return { id: docRef.id, ...linkData };
}

export async function updateLink(id, linkData) {
  const linkRef = doc(db, 'links', id);
  await updateDoc(linkRef, linkData);
}

export async function deleteLink(id) {
  const linkRef = doc(db, 'links', id);
  await deleteDoc(linkRef);
}

// ==========================================
// BLOGS API
// ==========================================

export async function getBlogs() {
  const blogsRef = collection(db, 'blogs');
  const q = query(blogsRef, orderBy('created_at', 'desc'));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

export async function addBlog(blogData) {
  const blogsRef = collection(db, 'blogs');
  const docRef = await addDoc(blogsRef, blogData);
  return { id: docRef.id, ...blogData };
}

export async function updateBlog(id, blogData) {
  const blogRef = doc(db, 'blogs', id);
  await updateDoc(blogRef, blogData);
}

export async function deleteBlog(id) {
  const blogRef = doc(db, 'blogs', id);
  await deleteDoc(blogRef);
}

// ==========================================
// SHORT LINKS API
// ==========================================

export async function createShortLink(longUrl, customSlug) {
  const slug = customSlug || Math.random().toString(36).substring(2, 8);
  const docRef = doc(db, 'short_links', slug);
  await setDoc(docRef, {
    longUrl,
    createdAt: new Date(),
    clicks: 0
  });
  return slug;
}

export async function getLongUrl(slug) {
  const docRef = doc(db, 'short_links', slug);
  const snapshot = await getDoc(docRef);
  if (snapshot.exists()) {
    // Increment clicks (fire and forget)
    updateDoc(docRef, { clicks: snapshot.data().clicks + 1 });
    return snapshot.data().longUrl;
  }
  return null;
}
