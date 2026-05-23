import React, { useEffect } from 'react';
import { useAdmin } from '../../AdminContext';
import LoginModal from './LoginModal';
import { useNavigate } from 'react-router-dom';

export default function AdminPage() {
  const { user } = useAdmin();
  const navigate = useNavigate();

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
