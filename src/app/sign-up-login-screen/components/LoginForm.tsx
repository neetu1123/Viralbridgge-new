'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { Eye, EyeOff, Loader2, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';
import { forgotPassword, login } from '@/src/lib/auth/api';
import { useAuth } from '@/src/components/AuthProvider';

interface LoginFormData {
  email: string;
  password: string;
  remember: boolean;
}

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showForgot, setShowForgot] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotError, setForgotError] = useState('');
  const [forgotSent, setForgotSent] = useState(false);
  const [forgotLoading, setForgotLoading] = useState(false);
  const router = useRouter();
  const { setUser } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    getValues,
  } = useForm<LoginFormData>();

  const onSubmit = async (data: LoginFormData) => {
    setLoading(true);
    try {
      const result = await login(data.email, data.password);
      setUser(result.user);
      toast.success('Welcome back!');
      const redirect = sessionStorage.getItem('auth_redirect');
      sessionStorage.removeItem('auth_redirect');
      router.push(redirect || '/');
    } catch (error) {
      setError('email', {
        message: error instanceof Error ? error.message : 'Invalid email or password',
      });
      toast.error(error instanceof Error ? error.message : 'Sign-in failed');
    } finally {
      setLoading(false);
    }
  };

  const sendResetLink = async (event: React.FormEvent) => {
    event.preventDefault();
    const email = forgotEmail.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setForgotError('Enter a valid email address');
      return;
    }
    setForgotError('');
    setForgotLoading(true);
    try {
      await forgotPassword(email, window.location.origin);
      setForgotSent(true);
      toast.success('Check your inbox for a reset link');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Could not send the reset email');
    } finally {
      setForgotLoading(false);
    }
  };

  if (showForgot) {
    return (
      <form onSubmit={sendResetLink} className="flex flex-col gap-5">
        <div>
          <h3 className="font-display font-700 text-lg text-[#1F1F2E]">Reset your password</h3>
          <p className="text-[#6B6B8A] text-sm mt-1">
            {forgotSent
              ? `If an account exists for ${forgotEmail.trim()}, a reset link is on its way. It expires in 30 minutes.`
              : 'Enter your email and we will send a link to choose a new password.'}
          </p>
        </div>
        {!forgotSent && (
          <div>
            <label className="block font-display font-600 text-[#1F1F2E] text-sm mb-1.5">
              Email address <span className="text-[#F357A8]">*</span>
            </label>
            <input
              type="email"
              value={forgotEmail}
              onChange={(event) => setForgotEmail(event.target.value)}
              placeholder="your@email.com"
              className={`w-full px-4 py-2.5 rounded-xl border text-[#1F1F2E] text-sm placeholder-[#9AA0B4] outline-none transition-all duration-150 focus:border-[#7B2FF7] focus:ring-2 focus:ring-[#7B2FF7]/10 ${
                forgotError ? 'border-red-400 bg-red-50' : 'border-[#E5E7EB] bg-white'
              }`}
            />
            {forgotError && <p className="text-red-500 text-xs mt-1">{forgotError}</p>}
          </div>
        )}
        {!forgotSent && (
          <button
            type="submit"
            disabled={forgotLoading}
            className="w-full py-3.5 rounded-xl font-display font-700 text-base text-white flex items-center justify-center gap-2 disabled:opacity-70"
            style={{ background: 'linear-gradient(90deg, #7B2FF7, #F357A8)' }}
          >
            {forgotLoading ? 'Sending...' : 'Send reset link'}
          </button>
        )}
        <button
          type="button"
          onClick={() => {
            setShowForgot(false);
            setForgotSent(false);
          }}
          className="text-[#7B2FF7] text-sm font-medium hover:underline"
        >
          Back to sign in
        </button>
      </form>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
      <div>
        <label className="block font-display font-600 text-[#1F1F2E] text-sm mb-1.5">
          Email address <span className="text-[#F357A8]">*</span>
        </label>
        <input
          {...register('email', {
            required: 'Email is required',
            pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Enter a valid email address' },
          })}
          type="email"
          placeholder="your@email.com"
          className={`w-full px-4 py-2.5 rounded-xl border text-[#1F1F2E] text-sm placeholder-[#9AA0B4] outline-none transition-all duration-150 focus:border-[#7B2FF7] focus:ring-2 focus:ring-[#7B2FF7]/10 ${
            errors.email ? 'border-red-400 bg-red-50' : 'border-[#E5E7EB] bg-white'
          }`}
        />
        {errors.email && (
          <p className="text-red-500 text-xs mt-1 form-error-enter">{errors.email.message}</p>
        )}
      </div>

      <div>
        <div className="flex items-center justify-between mb-1.5">
          <label className="font-display font-600 text-[#1F1F2E] text-sm">
            Password <span className="text-[#F357A8]">*</span>
          </label>
          <button
            type="button"
            onClick={() => {
              setForgotEmail(getValues('email') || '');
              setForgotError('');
              setForgotSent(false);
              setShowForgot(true);
            }}
            className="text-[#7B2FF7] text-xs font-medium hover:underline"
          >
            Forgot password?
          </button>
        </div>
        <div className="relative">
          <input
            {...register('password', { required: 'Password is required' })}
            type={showPassword ? 'text' : 'password'}
            placeholder="Your password"
            className={`w-full px-4 py-2.5 pr-10 rounded-xl border text-[#1F1F2E] text-sm placeholder-[#9AA0B4] outline-none transition-all duration-150 focus:border-[#7B2FF7] focus:ring-2 focus:ring-[#7B2FF7]/10 ${
              errors.password ? 'border-red-400 bg-red-50' : 'border-[#E5E7EB] bg-white'
            }`}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9AA0B4] hover:text-[#6B6B8A] transition-colors"
          >
            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>
        {errors.password && (
          <p className="text-red-500 text-xs mt-1 form-error-enter">{errors.password.message}</p>
        )}
      </div>

      <div className="flex items-center gap-2.5">
        <input
          {...register('remember')}
          type="checkbox"
          id="remember-me"
          className="w-4 h-4 rounded border-[#E5E7EB] accent-[#7B2FF7] cursor-pointer"
        />
        <label htmlFor="remember-me" className="text-[#6B6B8A] text-sm cursor-pointer">
          Remember me for 30 days
        </label>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full py-3.5 rounded-xl font-display font-700 text-base text-white flex items-center justify-center gap-2 transition-all duration-200 hover:shadow-lg hover:scale-[1.01] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed disabled:scale-100"
        style={{ background: 'linear-gradient(90deg, #7B2FF7, #F357A8)' }}
      >
        {loading ? (
          <>
            <Loader2 size={18} className="animate-spin" />
            Signing in...
          </>
        ) : (
          <>
            Sign In
            <ArrowRight size={16} />
          </>
        )}
      </button>
    </form>
  );
}
