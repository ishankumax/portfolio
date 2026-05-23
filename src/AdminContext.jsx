/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState, useEffect } from 'react';
import { subscribeToAuthChanges } from './lib/auth';

const AdminContext = createContext();

const ALLOWED_PHONES = ['+919501825673'];
const ALLOWED_EMAILS = ['ishankumax@gmail.com'];

export function AdminProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const unsubscribe = subscribeToAuthChanges((u) => {
      const isAllowedPhone = u && u.phoneNumber && ALLOWED_PHONES.includes(u.phoneNumber);
      const isAllowedEmail = u && u.email && ALLOWED_EMAILS.includes(u.email.toLowerCase());
      
      if (isAllowedPhone || isAllowedEmail) {
        setUser(u);
      } else {
        setUser(null);
        setIsEditing(false); // disable edit mode on logout
      }
    });
    return () => unsubscribe();
  }, []);

  const toggleEditing = () => setIsEditing(prev => !prev);
  const isAdmin = !!user;

  return (
    <AdminContext.Provider value={{ user, isAdmin, isEditing, toggleEditing }}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  return useContext(AdminContext);
}
