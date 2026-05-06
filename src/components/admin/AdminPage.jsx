import React, { useState } from 'react';
import { useAdmin } from '../../AdminContext';
import LoginModal from './LoginModal';
import AdminDashboard from './AdminDashboard';
import AdminBlogs from './AdminBlogs';
import AdminLinks from './AdminLinks';
import { logout } from '../../lib/auth';
import { useNavigate } from 'react-router-dom';

export default function AdminPage() {
  const { user } = useAdmin();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  return (
    <div className="relative z-10 min-h-[60vh] flex flex-col items-center justify-center">
      <LoginModal forceOpen={true} onClose={() => navigate('/')} />
    </div>
  );
}
