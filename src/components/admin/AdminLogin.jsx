import React, { useState, useEffect } from 'react';
import { login, setupRecaptcha, sendPhoneOTP, verifyOTP } from '../../lib/auth';

export default function AdminLogin() {
  const [method, setMethod] = useState('email'); // 'email' or 'phone'
  
  // Email state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // Phone state
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (method === 'phone') {
      setupRecaptcha('recaptcha-container');
    }
  }, [method]);

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const { user, error } = await login(email, password);
    if (error) setError(error);
    setLoading(false);
  };

  const handleSendOTP = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const { success, error } = await sendPhoneOTP(phone);
    if (success) {
      setOtpSent(true);
    } else {
      setError(error);
    }
    setLoading(false);
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const { user, error } = await verifyOTP(otp);
    if (error) setError(error);
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white font-mono p-4">
      <div className="w-full max-w-md border border-[#333] p-8 rounded-xl bg-[#111]">
        <h1 className="text-2xl mb-6 text-center text-[var(--accent)]">Admin Login</h1>
        
        {/* Toggle between Email and Phone */}
        <div className="flex bg-black p-1 rounded border border-[#333] mb-6">
          <button 
            className={`flex-1 py-1 text-sm rounded ${method === 'email' ? 'bg-[#222] font-bold text-[var(--accent)]' : 'text-gray-500 hover:text-white'}`}
            onClick={() => setMethod('email')}
          >
            Email
          </button>
          <button 
            className={`flex-1 py-1 text-sm rounded ${method === 'phone' ? 'bg-[#222] font-bold text-[var(--accent)]' : 'text-gray-500 hover:text-white'}`}
            onClick={() => setMethod('phone')}
          >
            Phone
          </button>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/50 text-red-400 p-3 rounded mb-6 text-sm break-words">
            {error}
          </div>
        )}

        {method === 'email' ? (
          <form onSubmit={handleEmailLogin} className="space-y-4">
            <div>
              <label className="block text-xs text-gray-400 mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-black border border-[#333] rounded p-2 text-white outline-none focus:border-[var(--accent)]"
                required
              />
            </div>
            <div>
              <label className="block text-xs text-gray-400 mb-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-black border border-[#333] rounded p-2 text-white outline-none focus:border-[var(--accent)]"
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[var(--accent)] text-black font-bold py-2 rounded hover:opacity-90 transition-opacity disabled:opacity-50 mt-2"
            >
              {loading ? 'Logging in...' : 'Login with Email'}
            </button>
          </form>
        ) : (
          <div className="space-y-4">
            {!otpSent ? (
              <form onSubmit={handleSendOTP} className="space-y-4">
                <div>
                  <label className="block text-xs text-gray-400 mb-1">Phone Number (with country code)</label>
                  <input
                    type="tel"
                    placeholder="+1234567890"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-black border border-[#333] rounded p-2 text-white outline-none focus:border-[var(--accent)]"
                    required
                  />
                </div>
                {/* ReCaptcha Container */}
                <div id="recaptcha-container" className="my-2 flex justify-center"></div>
                
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[var(--accent)] text-black font-bold py-2 rounded hover:opacity-90 transition-opacity disabled:opacity-50 mt-2"
                >
                  {loading ? 'Sending...' : 'Send OTP Code'}
                </button>
              </form>
            ) : (
              <form onSubmit={handleVerifyOTP} className="space-y-4">
                <div>
                  <label className="block text-xs text-gray-400 mb-1">Enter 6-digit OTP</label>
                  <input
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="w-full bg-black border border-[#333] rounded p-2 text-white outline-none focus:border-[var(--accent)] tracking-widest text-center text-lg"
                    maxLength={6}
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[var(--accent)] text-black font-bold py-2 rounded hover:opacity-90 transition-opacity disabled:opacity-50 mt-2"
                >
                  {loading ? 'Verifying...' : 'Verify & Login'}
                </button>
                <button 
                  type="button" 
                  onClick={() => setOtpSent(false)}
                  className="w-full text-xs text-gray-500 hover:text-white"
                >
                  Change phone number
                </button>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
