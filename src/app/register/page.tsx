'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  FiEye, FiEyeOff, FiMail, FiLock, FiUser, FiPhone, FiGift,
  FiArrowLeft, FiCheck, FiShield, FiKey, FiAlertCircle,
} from 'react-icons/fi';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { showToast } from '@/store/slices/uiSlice';
import { signup, activateAccount, resendCode, updateProfile, sendPinOtp, setPin, setRegistrationStep, login } from '@/store/slices/authSlice';

// ─────────────────────────────────────────────
// Step 1: Sign Up Form
// ─────────────────────────────────────────────
function SignupForm({ onSuccess }: any) {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [gender, setGender] = useState<string>('');
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector(s => s.auth);

  const passwordRules = [
    { label: 'At least 8 characters', valid: password.length >= 8 },
    { label: 'One uppercase letter', valid: /[A-Z]/.test(password) },
    { label: 'One number', valid: /[0-9]/.test(password) },
  ];
  const isPasswordValid = passwordRules.every((r) => r.valid);

  const nameParts = fullName.trim().split(' ').filter(Boolean);
  const firstNameOk = (nameParts[0] ?? '').length >= 3;
  const lastNameOk = (nameParts.length > 1 ? nameParts.slice(1).join(' ') : nameParts[0] ?? '').length >= 3;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!firstNameOk || !lastNameOk) {
      dispatch(showToast({ message: 'Please enter your full name (at least 3 characters each for first and last name).', type: 'error' }));
      return;
    }
    if (!isPasswordValid) {
      dispatch(showToast({ message: 'Please follow the password requirements.', type: 'error' }));
      return;
    }
    if (password !== confirmPassword) {
      dispatch(showToast({ message: 'Passwords do not match', type: 'error' }));
      return;
    }
    if (!agreeTerms) {
      dispatch(showToast({ message: 'Please accept the terms and conditions', type: 'error' }));
      return;
    }

    try {
      await dispatch(signup({ email, password, phoneNumber: phone.trim() || undefined, fullName })).unwrap();
      dispatch(showToast({ message: 'OTP Sent! 📧 Check your email for the 6-digit activation code.', type: 'success' }));
      onSuccess({ email, phone: phone.trim(), password, fullName, gender });
    } catch (err: any) {
      const errMsg = err?.message || (typeof err === 'string' ? err : 'Something went wrong');
      dispatch(showToast({ message: errMsg, type: 'error' }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 animate-fade-in">
      <div className="text-center mb-6">
        <h1 className="display-sm mb-1">Create Account</h1>
        <p className="text-on-surface-variant text-sm">Join the Vanguard Trading Network</p>
      </div>

      <div className="input-group">
        <label className="input-label flex items-center gap-1"><FiUser className="w-3.5 h-3.5" />Full Name</label>
        <input className="input-field" value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="e.g. John Doe" required autoComplete="name" />
        {fullName.trim() && (!firstNameOk || !lastNameOk) && (
          <p className="text-xs text-error flex items-center gap-1 mt-1 font-medium"><FiAlertCircle className="w-3 h-3" /> Min 3 chars each for first and last name</p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="input-group">
          <label className="input-label flex items-center gap-1"><FiPhone className="w-3.5 h-3.5" />Phone </label>
          <input className="input-field" type="tel" value={phone} onChange={(e) => setPhone(e.target.value.replace(/[^0-9+]/g, ''))} placeholder="09012345678" autoComplete="tel" />
        </div>
        <div className="input-group">
          <label className="input-label">Gender</label>
          <select className="input-field appearance-none" value={gender} onChange={e => setGender(e.target.value)}>
            <option value="" disabled>Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Undefined">Rather not say</option>
          </select>
        </div>
      </div>

      <div className="input-group">
        <label className="input-label flex items-center gap-1"><FiMail className="w-3.5 h-3.5" />Email</label>
        <input className="input-field" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="your@email.com" required autoComplete="email" />
      </div>

      <div className="input-group">
        <label className="input-label flex items-center gap-1"><FiLock className="w-3.5 h-3.5" />Password</label>
        <div className="relative">
          <input className="input-field pr-10" type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Create a strong password" required autoComplete="new-password" />
          <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-on-surface">
            {showPassword ? <FiEyeOff className="w-4 h-4" /> : <FiEye className="w-4 h-4" />}
          </button>
        </div>
        {password && (
          <div className="mt-3 space-y-1.5 p-3 rounded-xl bg-surface-container/50 border border-primary/5">
            {passwordRules.map((rule, i) => (
              <div key={i} className="flex items-center gap-2 text-xs font-medium">
                <div className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 ${rule.valid ? 'bg-secondary text-white' : 'bg-surface-container-high text-on-surface-variant'}`}>
                  {rule.valid && <FiCheck className="w-2.5 h-2.5" />}
                </div>
                <span className={rule.valid ? 'text-secondary' : 'text-on-surface-variant'}>{rule.label}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="input-group">
        <label className="input-label">Confirm Password</label>
        <input className="input-field" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Re-enter your password" required autoComplete="new-password" />
        {confirmPassword && password !== confirmPassword && (
          <p className="text-xs text-error flex items-center gap-1 mt-1 font-medium"><FiAlertCircle className="w-3 h-3" /> Passwords do not match</p>
        )}
      </div>

      <div className="flex items-start gap-3 pt-2">
        <input type="checkbox" id="terms" checked={agreeTerms} onChange={(e) => setAgreeTerms(e.target.checked)} className="mt-1 w-4 h-4 text-primary bg-surface-container border-primary/20 rounded focus:ring-primary focus:ring-2" />
        <label htmlFor="terms" className="text-sm font-medium leading-relaxed text-on-surface-variant cursor-pointer">
          By signing up, you have read and agreed to our <Link href="#" className="text-primary hover:underline">Terms of Service</Link> and <Link href="#" className="text-primary hover:underline">Privacy Policy</Link>
        </label>
      </div>

      <button type="submit" className="btn btn-primary w-full h-12 text-base mt-2" disabled={isLoading || !agreeTerms}>
        {isLoading ? 'Creating account…' : 'Sign Up'}
      </button>
    </form>
  );
}

// ─────────────────────────────────────────────
// Step 2: OTP Verification
// ─────────────────────────────────────────────
function OtpStep({ tempEmail, onActivate, onResend }: any) {
  const [otp, setOtp] = useState('');
  const [resendCountdown, setResendCountdown] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const { isLoading } = useAppSelector(s => s.auth);

  useEffect(() => {
    if (resendCountdown <= 0) { setCanResend(true); return; }
    const t = setTimeout(() => setResendCountdown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [resendCountdown]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onActivate(otp.trim().toUpperCase());
  };

  const handleResend = async () => {
    if (!canResend) return;
    await onResend();
    setResendCountdown(60);
    setCanResend(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 animate-fade-in text-center">
      <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-primary/20">
        <FiMail className="w-8 h-8 text-primary" />
      </div>
      <h1 className="display-sm">Verify Email</h1>
      <p className="text-on-surface-variant mt-2 text-sm">
        Enter the 6-digit code sent to <span className="font-bold text-on-surface">{tempEmail}</span>
      </p>

      <div className="input-group text-left mt-6">
        <label htmlFor="otp" className="input-label">Verification Code</label>
        <input id="otp" value={otp} onChange={(e) => setOtp(e.target.value.replace(/\s/g, ''))} placeholder="Enter 6-digit code" className="input-field text-center text-2xl tracking-[0.4em] h-14 font-mono font-bold bg-surface-container" maxLength={6} required autoFocus />
      </div>

      <button type="submit" className="btn btn-primary w-full h-12" disabled={isLoading || otp.length < 6}>
        {isLoading ? 'Verifying…' : 'Verify & Continue'}
      </button>

      <p className="text-center text-sm text-on-surface-variant font-medium">
        Didn't receive the code?{' '}
        {canResend ? (
          <button type="button" onClick={handleResend} className="text-primary font-bold hover:underline" disabled={isLoading}>Resend OTP</button>
        ) : (
          <span className="text-on-surface-variant/70">Resend in {resendCountdown}s</span>
        )}
      </p>
    </form>
  );
}

// ─────────────────────────────────────────────
// Step 3: PIN Choice
// ─────────────────────────────────────────────
function PinChoiceStep({ tempUserId, password, onSendPinOtp, navigate, onSkip }: any) {
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector(s => s.auth);

  const handleSetupNow = async () => {
    try {
      await dispatch(sendPinOtp({ id: tempUserId!, password })).unwrap();
      dispatch(showToast({ message: 'OTP Sent! A verification code has been sent for PIN setup.', type: 'success' }));
      onSendPinOtp();
    } catch (err: any) {
      dispatch(showToast({ message: err.message, type: 'error' }));
    }
  };

  return (
    <div className="text-center space-y-6 animate-fade-in">
      <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto border border-primary/20">
        <FiShield className="w-8 h-8 text-primary" />
      </div>
      <div>
        <h1 className="display-sm">Secure Your Account</h1>
        <p className="text-on-surface-variant mt-2 text-sm leading-relaxed">Set up a 4-digit transaction PIN to securely authorize your trades and withdrawals.</p>
      </div>
      <div className="space-y-3 pt-4">
        <button onClick={handleSetupNow} className="btn btn-primary w-full h-12" disabled={isLoading}>
          {isLoading ? 'Initializing…' : 'Set Up PIN Now'}
        </button>
        <button onClick={onSkip || (() => navigate('/login'))} className="btn btn-outline-primary w-full h-12 border-transparent hover:border-primary/20">
          Skip for Later
        </button>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// Step 4: PIN Setup
// ─────────────────────────────────────────────
function PinSetupStep({ tempUserId }: any) {
  const [pinToken, setPinToken] = useState('');
  const [pin, setpinVal] = useState('');
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector(s => s.auth);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await dispatch(setPin({ id: tempUserId!, pin, token: pinToken })).unwrap();
      // the slice sets registrationStep = 'completed'
    } catch (err: any) {
      dispatch(showToast({ message: err.message, type: 'error' }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 text-center animate-fade-in">
      <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2 border border-primary/20">
        <FiKey className="w-8 h-8 text-primary" />
      </div>
      <div>
        <h1 className="display-sm">Create PIN</h1>
        <p className="text-on-surface-variant mt-2 text-sm leading-relaxed">Enter the authorization code sent to your email and set a new 4-digit PIN.</p>
      </div>
      <div className="space-y-4 text-left">
        <div className="input-group">
          <label className="input-label">Verification Code</label>
          <input value={pinToken} onChange={(e) => setPinToken(e.target.value)} placeholder="6-digit code" className="input-field text-center tracking-[0.3em] font-mono font-bold" required />
        </div>
        <div className="input-group">
          <label className="input-label">4-Digit PIN</label>
          <input type="password" value={pin} onChange={(e) => setpinVal(e.target.value)} maxLength={4} placeholder="••••" className="input-field text-center text-2xl h-14 tracking-widest font-bold" required />
        </div>
      </div>
      <button type="submit" className="btn btn-primary w-full h-12 mt-2" disabled={isLoading}>
        {isLoading ? 'Saving…' : 'Complete Registration'}
      </button>
    </form>
  );
}

// ─────────────────────────────────────────────
// Main Signup Page
// ─────────────────────────────────────────────
export default function RegisterPage() {
  const dispatch = useAppDispatch();
  const { registrationStep, tempEmail, tempUserId } = useAppSelector(s => s.auth);

  const [localData, setLocalData] = useState({ email: '', phone: '', password: '', fullName: '', gender: 'Undefined' });
  const [showPinSetup, setShowPinSetup] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleAutoLogin = async () => {
      if (registrationStep === 'completed') {
        if (localData.email && localData.password) {
          dispatch(showToast({ message: 'Registration Complete! ✅ Logging you in...', type: 'success' }));
          try {
            await dispatch(login({ email: localData.email, password: localData.password })).unwrap();
            setTimeout(() => { window.location.href = '/dashboard'; }, 200);
          } catch (err: any) {
            const errMsg = err?.message || (typeof err === 'string' ? err : null);
            dispatch(showToast({ message: errMsg || 'Your account is ready. Please log in manually.', type: 'error' }));
            setTimeout(() => { window.location.href = '/login'; }, 1500);
          }
        } else {
          dispatch(showToast({ message: 'Registration Complete! ✅ Your account is fully set up. Please log in.', type: 'success' }));
          setTimeout(() => { window.location.href = '/login'; }, 1500);
        }
      }
    };
    handleAutoLogin();
  }, [registrationStep, localData, dispatch]);

  const handleActivate = async (otp: string) => {
    try {
      const response: any = await dispatch(activateAccount({ email: tempEmail!, code: otp })).unwrap();
      const userid = response.data?.[0]?.userid || response.data?.[0]?.id || response.data?.[0]?.userId;
      
      if (!userid && !tempUserId) {
        throw new Error("User ID not found in activation response. Please try logging in.");
      }

      dispatch(showToast({ message: 'Email Verified! ✅ Setting up your profile…', type: 'success' }));
      await dispatch(updateProfile({ userid: userid || tempUserId, gender: localData.gender })).unwrap();
      dispatch(showToast({ message: 'Profile Ready! ✨ Your profile has been set up.', type: 'success' }));
    } catch (err: any) {
      const errMsg = err?.message || (typeof err === 'string' ? err : 'Verification or profile update failed');
      dispatch(showToast({ message: errMsg, type: 'error' }));
    }
  };

  const handleResend = async () => {
    try {
      await dispatch(resendCode(tempEmail!)).unwrap();
      dispatch(showToast({ message: 'Code resent! Check your email again.', type: 'success' }));
    } catch (err: any) {
      const errMsg = err?.message || (typeof err === 'string' ? err : 'Failed to resend code');
      dispatch(showToast({ message: errMsg, type: 'error' }));
    }
  };

  const renderStep = () => {
    switch (registrationStep) {
      case 'signup':
      default:
        return <SignupForm onSuccess={(data: any) => setLocalData(data)} />;
      case 'activation':
        return <OtpStep tempEmail={tempEmail} onActivate={handleActivate} onResend={handleResend} />;
      case 'profile':
        return (
          <div className="flex flex-col items-center justify-center py-12 text-center space-y-4 animate-fade-in">
            <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            <h2 className="text-xl font-bold">Setting up your profile</h2>
            <p className="text-on-surface-variant font-medium">Please wait a moment while we prepare your account...</p>
          </div>
        );
      case 'pin':
        if (showPinSetup) {
          return <PinSetupStep tempUserId={tempUserId} />;
        }
        return (
          <PinChoiceStep
            tempUserId={tempUserId}
            password={localData.password}
            onSendPinOtp={() => setShowPinSetup(true)}
            navigate={router.push}
            onSkip={() => dispatch(setRegistrationStep('completed'))}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left panel — form */}
      <div className="w-full lg:w-1/2 flex flex-col p-6 md:p-12 overflow-y-auto relative z-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary/5 blur-[100px] rounded-full -translate-y-1/2 -translate-x-1/2" />
        
        {/* Header */}
        <div className="flex items-center justify-between mb-6 relative z-10">
          <Link href="/" className="text-2xl font-black tracking-tighter">
            CARD<span className="text-primary">YORK</span>
          </Link>
        </div>

        {registrationStep === 'signup' && (
          <Link href="/" className="inline-flex items-center gap-2 text-sm text-on-surface-variant hover:text-primary mb-6 relative z-10 w-max">
            <FiArrowLeft className="w-4 h-4" /> Back to home
          </Link>
        )}

        {/* Step indicator */}
        <div className="flex items-center gap-2 mb-6 max-w-md w-full mx-auto relative z-10">
          {(['signup', 'activation', 'pin'] as const).map((step, i) => {
            const steps = ['signup', 'activation', 'pin'];
            const currentIdx = steps.indexOf(registrationStep === 'profile' ? 'activation' : registrationStep);
            const isActive = i <= currentIdx;
            return (
              <div key={step} className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full transition-all duration-300 ${isActive ? 'bg-primary scale-125' : 'bg-surface-container-highest'}`} />
                {i < 2 && <div className={`h-px flex-1 w-8 transition-colors duration-300 ${i < currentIdx ? 'bg-primary' : 'bg-surface-container-highest'}`} />}
              </div>
            );
          })}
          <span className="text-xs font-bold uppercase tracking-widest text-primary ml-auto">
            Step {(['signup', 'activation', 'pin'].indexOf(registrationStep === 'profile' ? 'activation' : registrationStep)) + 1} of 3
          </span>
        </div>

        {/* Form area */}
        <div className="flex-1 flex items-start justify-center relative z-10 pt-4">
          <div className="w-full max-w-md glass-card p-6 sm:p-8">
            {renderStep()}

            {registrationStep === 'signup' && (
              <div className="pt-6 mt-6 border-t border-primary/10 text-center">
                <p className="text-sm font-medium text-on-surface-variant">
                  Already have an account?{' '}
                  <Link href="/login" className="text-primary font-bold hover:underline">Sign in</Link>
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Right panel — decorative */}
      <div className="hidden lg:flex w-1/2 relative items-center justify-center bg-surface-container border-l border-primary/10 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1616198814651-e71f960c3180?q=80&w=1974&auto=format&fit=crop')] bg-cover bg-center opacity-20 mix-blend-overlay" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
        
        <div className="relative z-10 max-w-lg text-center p-12">
          <div className="w-24 h-24 mx-auto mb-8 rounded-3xl bg-surface-container-highest/50 border border-primary/20 flex items-center justify-center backdrop-blur-md shadow-glow-primary">
            <FiGift className="w-10 h-10 text-primary" />
          </div>
          <h2 className="display-md mb-6">Start Trading Today</h2>
          <p className="text-on-surface-variant text-lg mb-10 leading-relaxed">Join thousands of smart traders converting their gift cards into cash at the highest rates.</p>
          
          <div className="flex flex-col items-start gap-5 max-w-xs mx-auto">
            {['Instant Payouts Guaranteed', 'Bank-Level Security', '24/7 Dedicated Support'].map((item) => (
              <div key={item} className="flex items-center gap-4 bg-surface-container-high/50 w-full p-3 rounded-xl border border-primary/5">
                <div className="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center shrink-0">
                  <FiCheck className="w-4 h-4 text-secondary" />
                </div>
                <span className="font-bold text-sm">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
