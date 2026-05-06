import React, { useState, useEffect } from 'react';
import { setupRecaptcha, sendPhoneOTP, verifyOTP, login } from '../../lib/auth';
import { useAdmin } from '../../AdminContext';

const ALLOWED_PHONES = ['+919501825673'];
const ALLOWED_EMAILS = ['ishankumax@gmail.com'];

export default function LoginModal({ forceOpen = false, onClose }) {
  const { user } = useAdmin();
  const [method, setMethod] = useState('email'); 
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (forceOpen && method === 'phone' && !user) {
      setTimeout(() => setupRecaptcha('recaptcha-container-modal'), 100);
    }
  }, [forceOpen, method, user]);

  if (!forceOpen || user) return null;

  const throttle = async (fn) => {
    setLoading(true);
    setError(null);
    await fn();
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
      const { user: authedUser, error } = await verifyOTP(otp);
      if (error) setError(error);
      else if (!authedUser || !ALLOWED_PHONES.includes(authedUser.phoneNumber)) {
        setError("Unauthorized access.");
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
      const { user: authedUser, error } = await login(email, password);
      if (error) setError(error);
      else if (!authedUser || !ALLOWED_EMAILS.includes(authedUser.email)) {
        setError("Unauthorized access.");
      }
    });
  };

  return (
    <div className={forceOpen ? "w-full flex justify-center" : "fixed inset-0 z-[999] flex items-center justify-center p-4 font-mono animate-in fade-in duration-200"}>
      {/* Modal */}
      <div 
        className={`relative w-full max-w-sm p-8 rounded-xl overflow-hidden shadow-2xl animate-in ${forceOpen ? 'zoom-in-100' : 'zoom-in-95'}`}
        style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-subtle)' }}
      >
        {onClose && (
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 text-xs tracking-widest uppercase hover:text-white transition-colors"
            style={{ color: 'var(--text-muted)' }}
            aria-label="Close"
          >
            [x]
          </button>
        )}

        <div className="mb-8 text-center mt-2">
          <h1 className="text-xl font-bold tracking-tighter uppercase" style={{ color: 'var(--accent)' }}>Secure Access</h1>
          <p className="text-xs mt-2" style={{ color: 'var(--text-muted)' }}>Admin authentication required</p>
        </div>

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
                <div id="recaptcha-container-modal" className="my-2 flex justify-center"></div>
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
                  <input
                    type="text"
                    placeholder="123456"
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
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded p-2.5 text-sm outline-none transition-colors pr-10"
                  style={{ background: 'var(--bg-navbar)', border: '1px solid var(--border-subtle)', color: 'var(--text-primary)' }}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-sm transition-colors hover:text-white"
                  style={{ color: 'var(--text-muted)' }}
                  title={showPassword ? "Hide Password" : "Show Password"}
                >
                  {showPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                  )}
                </button>
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
