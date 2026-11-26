import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Lock, Mail, User, ArrowRight, Loader2, CheckCircle2, AlertCircle, Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

export default function Signup() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const { register } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();

  // Password strength calculation
  const getPasswordStrength = (pass) => {
    if (!pass) return { score: 0, label: 'None', color: 'bg-slate-700' };
    let score = 0;
    if (pass.length >= 8) score += 1;
    if (/[A-Z]/.test(pass)) score += 1;
    if (/[0-9]/.test(pass)) score += 1;
    if (/[^A-Za-z0-9]/.test(pass)) score += 1;

    if (score <= 1) return { score: 1, label: 'Weak', color: 'bg-rose-500' };
    if (score === 2) return { score: 2, label: 'Fair', color: 'bg-amber-500' };
    if (score === 3) return { score: 3, label: 'Good', color: 'bg-cyan-500' };
    return { score: 4, label: 'Strong', color: 'bg-emerald-500' };
  };

  const strength = getPasswordStrength(formData.password);

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

    // Validations
    if (!formData.name.trim()) {
      setErrorMessage('Please provide your full name.');
      return;
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(formData.email)) {
      setErrorMessage('Please provide a valid email address.');
      return;
    }

    if (formData.password.length < 8) {
      setErrorMessage('Password must be at least 8 characters long.');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setErrorMessage('Passwords do not match. Please verify both fields.');
      return;
    }

    if (!formData.agreeTerms) {
      setErrorMessage('Please accept the scientific data usage agreement & terms.');
      return;
    }

    try {
      setSubmitting(true);
      setErrorMessage('');
      await register(formData.name, formData.email, formData.password);
      addToast('Account created successfully! Welcome aboard FloatChat.', 'success');
      navigate('/dashboard', { replace: true });
    } catch (err) {
      console.error('Registration error:', err);
      const msg = err.response?.data?.message || err.message || 'Registration failed. Please try again.';
      setErrorMessage(msg);
      addToast(msg, 'error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-white text-slate-900">
      {/* Left Column: Atmospheric Ocean Imagery & Storytelling (Desktop) */}
      <div 
        className="relative hidden lg:flex lg:w-1/2 flex-col justify-between p-12 overflow-hidden bg-cover bg-center"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1800&q=80')`,
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

        {/* Narrative & Benefits */}
        <div className="relative z-10 max-w-lg space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 border border-white/25 text-white text-xs font-semibold uppercase tracking-wider backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-sky-300" />
            <span>Open Ocean Science</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-['Outfit',sans-serif] leading-tight">
            Unlock the secrets of planetary ocean currents.
          </h2>

          <div className="space-y-3 text-slate-200 text-sm">
            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-sky-300 mt-0.5 shrink-0" />
              <span>Direct access to ARGO NetCDF observations without scientific software overhead.</span>
            </div>
            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-sky-300 mt-0.5 shrink-0" />
              <span>Conversational AI trained to understand salinity, temperature, and ocean physics.</span>
            </div>
            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-sky-300 mt-0.5 shrink-0" />
              <span>Real-time anomaly detection for marine heatwaves and hypoxia risks.</span>
            </div>
          </div>
        </div>

        {/* Bottom citation */}
        <div className="relative z-10 text-xs text-slate-300">
          Complies with Global Ocean Observing System (GOOS) and open data principles.
        </div>
      </div>

      {/* Right Column: Clean White Registration Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 lg:p-16 bg-white relative">
        <div className="w-full max-w-md space-y-7">
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
              Join the Ocean Exploration Journey
            </h1>
            <p className="text-slate-600 text-sm">
              Create your FloatChat account and start discovering ocean insights.
            </p>
          </div>

          {/* Error Alert */}
          {errorMessage && (
            <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2 animate-in fade-in">
              <AlertCircle className="w-4 h-4 text-rose-500 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 block">
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <User className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="Dr. Sylvia Earle"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:bg-white focus:border-slate-900 focus:ring-1 focus:ring-slate-900 transition-colors"
                />
              </div>
            </div>

            {/* Email Address */}
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
                  placeholder="researcher@ocean.org"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:bg-white focus:border-slate-900 focus:ring-1 focus:ring-slate-900 transition-colors"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 block">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  required
                  placeholder="Minimum 8 characters"
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

              {/* Password Strength Indicator */}
              {formData.password && (
                <div className="pt-1.5 space-y-1">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-slate-500">Password Strength:</span>
                    <span className="font-semibold text-slate-800">{strength.label}</span>
                  </div>
                  <div className="grid grid-cols-4 gap-1 h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
                    <div className={`h-full ${strength.score >= 1 ? strength.color : 'bg-transparent'}`} />
                    <div className={`h-full ${strength.score >= 2 ? strength.color : 'bg-transparent'}`} />
                    <div className={`h-full ${strength.score >= 3 ? strength.color : 'bg-transparent'}`} />
                    <div className={`h-full ${strength.score >= 4 ? strength.color : 'bg-transparent'}`} />
                  </div>
                </div>
              )}
            </div>

            {/* Confirm Password Field */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 block">
                Confirm Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  required
                  placeholder="Repeat your password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:bg-white focus:border-slate-900 focus:ring-1 focus:ring-slate-900 transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-700 transition-colors"
                >
                  {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Terms and Conditions Checkbox */}
            <div className="pt-1">
              <label className="flex items-start gap-2.5 cursor-pointer text-xs text-slate-600">
                <input
                  type="checkbox"
                  name="agreeTerms"
                  checked={formData.agreeTerms}
                  onChange={handleChange}
                  className="mt-0.5 rounded border-slate-300 bg-white text-slate-900 focus:ring-slate-900"
                />
                <span className="leading-relaxed">
                  I agree to the{' '}
                  <span className="text-sky-600 font-medium">FloatChat Terms of Service</span>{' '}
                  and open scientific data sharing ethics.
                </span>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3 px-4 rounded-xl text-sm font-semibold text-white bg-slate-900 hover:bg-slate-800 shadow-sm transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed mt-2"
            >
              {submitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Creating Researcher Account...</span>
                </>
              ) : (
                <>
                  <span>Create Account</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Footer Navigation Link */}
          <div className="text-center pt-2 text-xs text-slate-600">
            Already have an account?{' '}
            <Link to="/login" className="text-sky-600 hover:text-sky-700 font-semibold transition-colors">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
