import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Eye, EyeOff, Lock, Mail, ArrowRight, Loader2, Sparkles, Compass } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const { login } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/dashboard';

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    if (errorMessage) setErrorMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      setErrorMessage('Please enter both email and password.');
      return;
    }

    try {
      setSubmitting(true);
      setErrorMessage('');
      await login(formData.email, formData.password);
      addToast('Welcome back to FloatChat Ocean Console!', 'success');
      navigate(from, { replace: true });
    } catch (err) {
      console.error('Login error:', err);
      const msg = err.response?.data?.message || err.message || 'Unable to log in. Please check your credentials.';
      setErrorMessage(msg);
      addToast(msg, 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const handleForgotPassword = (e) => {
    e.preventDefault();
    addToast('Password reset link has been dispatched if this email exists.', 'info');
  };

  const handleGoogleAuth = () => {
    addToast('Google Single Sign-On will be activated in the next ARGO institutional update.', 'info');
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-white text-slate-900">
      {/* Left Column: Atmospheric Ocean Imagery & Storytelling (Desktop) */}
      <div
        className="relative hidden lg:flex lg:w-1/2 flex-col justify-between p-12 overflow-hidden bg-cover bg-center"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1800&q=80')`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-tr from-slate-950/90 via-slate-900/75 to-sky-950/60" />

        {/* Brand Header */}
        <div className="relative z-10">
          <Link to="/" className="inline-flex items-center gap-3 text-white group">
            <img
              src="/logo.jpg"
              alt="FloatChat"
              className="w-11 h-11 rounded-full object-cover ring-2 ring-white/40 shadow-md group-hover:scale-105 transition-transform duration-300"
            />
            <div className="flex flex-col">
              <span className="text-2xl font-bold tracking-tight font-['Outfit',sans-serif]">
                FloatChat
              </span>
              <span className="text-[11px] font-medium tracking-widest uppercase text-sky-200/90 -mt-1">
                AI Ocean Intelligence Platform
              </span>
            </div>
          </Link>
        </div>

        {/* Narrative & Scientific Telemetry Preview */}
        <div className="relative z-10 max-w-lg space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 border border-white/25 text-white text-xs font-semibold uppercase tracking-wider backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-sky-300" />
            <span>Planetary Climate Telemetry</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-['Outfit',sans-serif] leading-tight">
            "The ocean is the planetary heart of our climate system."
          </h2>

          <p className="text-slate-200 text-sm leading-relaxed">
            Access calibrated temperature anomalies, salinity thermoclines, and depth profiles from over 3,900 autonomous ARGO floats traversing the world's oceans.
          </p>

          <div className="p-4 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 shadow-lg flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg bg-white/15 border border-white/25 flex items-center justify-center text-sky-200 shrink-0">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-semibold text-white">Global Observation Node</div>
              <div className="text-[11px] text-sky-200 font-mono">Real-time sync with ARGO NetCDF servers</div>
            </div>
          </div>
        </div>

        {/* Bottom citation */}
        <div className="relative z-10 text-xs text-slate-300">
          In partnership with global ocean observation repositories: ARGO • NOAA • INCOIS • NASA
        </div>
      </div>

      {/* Right Column: Clean White Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 lg:p-16 bg-white relative">
        <div className="w-full max-w-md space-y-8">
          {/* Mobile Brand Link */}
          <div className="lg:hidden flex items-center justify-between pb-6 border-b border-slate-200">
            <Link to="/" className="flex items-center gap-2.5 text-slate-900">
              <img src="/logo.jpg" alt="FloatChat" className="w-8 h-8 rounded-full object-cover ring-1 ring-slate-200" />
              <span className="font-bold text-lg font-['Outfit',sans-serif]">FloatChat</span>
            </Link>
            <Link to="/" className="text-xs text-sky-600 font-semibold hover:underline">
              Return to Home
            </Link>
          </div>

          {/* Form Header */}
          <div className="space-y-2">
            <h1 className="text-3xl font-extrabold text-slate-900 font-['Outfit',sans-serif] tracking-tight">
              Welcome Back
            </h1>
            <p className="text-slate-600 text-sm">
              Continue exploring the mysteries of our oceans.
            </p>
          </div>

          {/* Error Alert */}
          {errorMessage && (
            <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2 animate-in fade-in">
              <span className="w-2 h-2 rounded-full bg-rose-500 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Field */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 block">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="oceanographer@floatchat.org"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:bg-white focus:border-slate-900 focus:ring-1 focus:ring-slate-900 transition-colors"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-slate-700 block">
                  Password
                </label>
                <button
                  type="button"
                  onClick={handleForgotPassword}
                  className="text-xs text-sky-600 hover:text-sky-700 font-medium transition-colors cursor-pointer"
                >
                  Forgot Password?
                </button>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  required
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:bg-white focus:border-slate-900 focus:ring-1 focus:ring-slate-900 transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-700 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center">
              <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-600">
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                  className="rounded border-slate-300 bg-white text-slate-900 focus:ring-slate-900"
                />
                <span>Remember this device for 30 days</span>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3 px-4 rounded-xl text-sm font-semibold text-white bg-slate-900 hover:bg-slate-800 shadow-sm transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {submitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Signing in...</span>
                </>
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            {/* Divider */}
            <div className="relative my-4 flex items-center justify-center">
              <div className="border-t border-slate-200 w-full" />
              <span className="bg-white px-3 text-[11px] uppercase tracking-wider text-slate-400 absolute font-medium">
                Or continue with
              </span>
            </div>

            {/* Google OAuth Button */}
            <button
              type="button"
              onClick={handleGoogleAuth}
              className="w-full py-2.5 px-4 rounded-xl border border-slate-300 hover:border-slate-400 bg-white hover:bg-slate-50 text-slate-700 hover:text-slate-900 text-xs font-medium flex items-center justify-center gap-2.5 transition-all shadow-xs"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>Continue with Google (Institutional SSO)</span>
            </button>
          </form>

          {/* Footer Navigation Link */}
          <div className="text-center pt-2 text-xs text-slate-600">
            Don't have an ocean research account?{' '}
            <Link to="/signup" className="text-sky-600 hover:text-sky-700 font-semibold transition-colors">
              Create an Account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
