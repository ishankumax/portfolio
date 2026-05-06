import React, { createContext, useContext, useState, useEffect } from 'react';
import { subscribeToAuthChanges } from './lib/auth';

const AdminContext = createContext();

const ALLOWED_PHONES = ['+919501825673'];
const ALLOWED_EMAILS = ['ishankumax@gmail.com'];

export function AdminProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = subscribeToAuthChanges((u) => {
      const isAllowedPhone = u && u.phoneNumber && ALLOWED_PHONES.includes(u.phoneNumber);
      const isAllowedEmail = u && u.email && ALLOWED_EMAILS.includes(u.email.toLowerCase());
      
      if (isAllowedPhone || isAllowedEmail) {
        setUser(u);
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <AdminContext.Provider value={{ user }}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  return useContext(AdminContext);
}
