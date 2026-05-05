import React, { useState, useEffect } from 'react';
import { setupRecaptcha, sendPhoneOTP, verifyOTP, login, logout } from '../../lib/auth';
import { useNavigate } from 'react-router-dom';

const ALLOWED_PHONES = ['+919501825673'];
const ALLOWED_EMAILS = ['ishankumax@gmail.com'];

export default function AdminLogin() {
  const [method, setMethod] = useState('phone'); // 'phone' or 'email'
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (method === 'phone') {
      setupRecaptcha('recaptcha-container');
    }
  }, [method]);

  // Rate Limiting Simulator (Frontend)
  const throttle = async (fn) => {
    setLoading(true);
    setError(null);
    await fn();
    // Prevent immediate retry on failure
    setTimeout(() => setLoading(false), 500); 
  };

  const handleSendOTP = async (e) => {
    e.preventDefault();
    throttle(async () => {
      const normalizedPhone = phone.replace(/\s+/g, '');
      if (!ALLOWED_PHONES.includes(normalizedPhone)) {
        setError("Unauthorized access. Number not whitelisted.");
        return;
      }

      const { success, error } = await sendPhoneOTP(normalizedPhone);
      if (success) {
        setOtpSent(true);
      } else {
        setError(error);
      }
    });
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    throttle(async () => {
      const { user, error } = await verifyOTP(otp);
      if (error) {
        setError(error);
      } else {
        if (!user || !ALLOWED_PHONES.includes(user.phoneNumber)) {
          await logout();
          setError("Unauthorized access.");
        } else {
          navigate('/admin');
        }
      }
    });
  };

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    throttle(async () => {
      if (!ALLOWED_EMAILS.includes(email.toLowerCase())) {
        setError("Unauthorized access. Email not whitelisted.");
        return;
      }

      const { user, error } = await login(email, password);
      if (error) {
        setError(error);
      } else {
        if (!user || !ALLOWED_EMAILS.includes(user.email)) {
          await logout();
          setError("Unauthorized access.");
        } else {
          navigate('/admin');
        }
      }
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 font-mono" style={{ backgroundColor: 'var(--bg-default)', color: 'var(--text-primary)' }}>
      <div 
        className="w-full max-w-sm p-8 rounded-xl relative overflow-hidden"
        style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-subtle)', boxShadow: '0 8px 32px rgba(0,0,0,0.5)' }}
      >
        <div className="mb-8 text-center">
          <h1 className="text-xl font-bold tracking-tighter uppercase" style={{ color: 'var(--accent)' }}>Secure Access</h1>
          <p className="text-xs mt-2" style={{ color: 'var(--text-muted)' }}>Admin authentication required</p>
        </div>

        {/* Tab Toggle */}
        <div className="flex bg-black/50 p-1 rounded-lg border mb-6" style={{ borderColor: 'var(--border-subtle)' }}>
          <button 
            className={`flex-1 py-1.5 text-xs tracking-widest uppercase rounded transition-colors ${method === 'phone' ? 'font-bold' : ''}`}
            style={method === 'phone' ? { background: 'var(--bg-navbar)', color: 'var(--accent)' } : { color: 'var(--text-muted)' }}
            onClick={() => setMethod('phone')}
          >
            OTP
          </button>
          <button 
            className={`flex-1 py-1.5 text-xs tracking-widest uppercase rounded transition-colors ${method === 'email' ? 'font-bold' : ''}`}
            style={method === 'email' ? { background: 'var(--bg-navbar)', color: 'var(--accent)' } : { color: 'var(--text-muted)' }}
            onClick={() => setMethod('email')}
          >
            Email
          </button>
        </div>
        
        {error && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-3 rounded mb-6 text-xs break-words animate-in fade-in zoom-in-95">
            {error}
          </div>
        )}

        <div className="space-y-4">
          {method === 'phone' ? (
            !otpSent ? (
              <form onSubmit={handleSendOTP} className="space-y-4 animate-in fade-in slide-in-from-right-4">
                <div>
                  <label className="block text-xs mb-1" style={{ color: 'var(--text-secondary)' }}>Phone Number</label>
                  <input
                    type="tel"
                    placeholder="+91..."
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full rounded p-2.5 text-sm outline-none transition-colors"
                    style={{ background: 'var(--bg-navbar)', border: '1px solid var(--border-subtle)', color: 'var(--text-primary)' }}
                    required
                  />
                </div>
                <div id="recaptcha-container" className="my-2 flex justify-center"></div>
                
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full font-bold py-2.5 rounded text-sm transition-all disabled:opacity-50 hover:opacity-90 mt-2"
                  style={{ background: 'var(--accent)', color: 'black' }}
                >
                  {loading ? 'Processing...' : 'Send OTP'}
                </button>
              </form>
            ) : (
              <form onSubmit={handleVerifyOTP} className="space-y-4 animate-in fade-in slide-in-from-right-4">
                <div>
                  <label className="block text-xs mb-1" style={{ color: 'var(--text-secondary)' }}>Enter 6-digit OTP</label>
                  <input
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="w-full rounded p-2.5 tracking-widest text-center text-lg outline-none transition-colors"
                    style={{ background: 'var(--bg-navbar)', border: '1px solid var(--border-subtle)', color: 'var(--text-primary)' }}
                    maxLength={6}
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full font-bold py-2.5 rounded text-sm transition-all disabled:opacity-50 hover:opacity-90 mt-2"
                  style={{ background: 'var(--accent)', color: 'black' }}
                >
                  {loading ? 'Verifying...' : 'Verify Access'}
                </button>
                <button 
                  type="button" 
                  onClick={() => setOtpSent(false)}
                  className="w-full text-xs transition-colors hover:underline"
                  style={{ color: 'var(--text-muted)' }}
                >
                  ← Use different number
                </button>
              </form>
            )
          ) : (
            <form onSubmit={handleEmailLogin} className="space-y-4 animate-in fade-in slide-in-from-left-4">
              <div>
                <label className="block text-xs mb-1" style={{ color: 'var(--text-secondary)' }}>Email</label>
                <input
                  type="email"
                  placeholder="admin@domain.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded p-2.5 text-sm outline-none transition-colors"
                  style={{ background: 'var(--bg-navbar)', border: '1px solid var(--border-subtle)', color: 'var(--text-primary)' }}
                  required
                />
              </div>
              <div>
                <label className="block text-xs mb-1" style={{ color: 'var(--text-secondary)' }}>Password</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded p-2.5 text-sm outline-none transition-colors"
                  style={{ background: 'var(--bg-navbar)', border: '1px solid var(--border-subtle)', color: 'var(--text-primary)' }}
                  required
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full font-bold py-2.5 rounded text-sm transition-all disabled:opacity-50 hover:opacity-90 mt-4"
                style={{ background: 'var(--accent)', color: 'black' }}
              >
                {loading ? 'Authenticating...' : 'Secure Login'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
