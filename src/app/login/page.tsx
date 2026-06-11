"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FiEye, FiEyeOff, FiMail, FiLock, FiArrowLeft, FiShield } from "react-icons/fi";
import { useAppDispatch } from "@/store/hooks";
import { showToast } from "@/store/slices/uiSlice";
import { login, loginWith2Fa, resendCode } from "@/store/slices/authSlice";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // OTP state — shown when API returns LOGIN_CODE_SENT (unverified account)
  const [showOtp, setShowOtp] = useState(false);
  const [otp, setOtp] = useState("");
  const [unverifiedEmail, setUnverifiedEmail] = useState("");
  const [unverifiedPassword, setUnverifiedPassword] = useState(""); // needed for /signin/2fa
  const [resendCountdown, setResendCountdown] = useState(60);

  const router = useRouter();
  const dispatch = useAppDispatch();

  // Countdown timer for OTP resend
  useEffect(() => {
    if (!showOtp || resendCountdown <= 0) return;
    const t = setTimeout(() => setResendCountdown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [showOtp, resendCountdown]);

  // ── Login submit ──
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await dispatch(login({ email, password })).unwrap();
      dispatch(showToast({ message: "Login Successful ✅", type: "success" }));
      router.push("/dashboard");
    } catch (error: any) {
      if (error?.type === "LOGIN_CODE_SENT") {
        setUnverifiedEmail(error?.email || email);
        setUnverifiedPassword(password);
        setShowOtp(true);
        setResendCountdown(60);
        dispatch(showToast({ message: "A verification code has been sent to your email.", type: "success" }));
      } else if (error?.type === "NO_PROFILE_DATA_FOUND") {
        dispatch(showToast({ message: "A verification code has been sent to your email. Please complete your activation.", type: "success" }));
        try {
          await dispatch(resendCode(email)).unwrap();
        } catch (e) {
          console.error("Failed to auto-resend OTP:", e);
        }
        router.push("/register");
      } else {
        dispatch(showToast({ message: typeof error === "string" ? error : error?.message || "Login details incorrect, try again", type: "error" }));
      }
    } finally {
      setIsLoading(false);
    }
  };

  // OTP verification — calls /signin/2fa
  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await dispatch(loginWith2Fa({ email: unverifiedEmail, password: unverifiedPassword, twoFaCode: otp.trim() })).unwrap();
      dispatch(showToast({ message: "Verified! ✅ Signing you in...", type: "success" }));
      window.location.href = "/dashboard";
    } catch (err: any) {
      dispatch(showToast({ message: err?.message || "Invalid or expired code", type: "error" }));
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    if (resendCountdown > 0) return;
    try {
      await dispatch(resendCode(unverifiedEmail)).unwrap();
      setResendCountdown(60);
      dispatch(showToast({ message: "Code resent! Check your email.", type: "success" }));
    } catch (err: any) {
      dispatch(showToast({ message: err?.message || "Resend failed", type: "error" }));
    }
  };

  return (
    <div className="min-h-screen bg-background flex">
      <div className="w-full lg:w-1/2 flex flex-col p-6 md:p-12 relative z-10 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2" />
        
        <div className="flex items-center justify-between mb-8 relative z-10">
          <Link href="/" className="text-2xl font-black tracking-tighter">
            CARD<span className="text-primary">YORK</span>
          </Link>
        </div>

        <Link href="/" className="inline-flex items-center gap-2 text-sm text-on-surface-variant hover:text-primary mb-8 relative z-10 w-max">
          <FiArrowLeft className="w-4 h-4" />
          Back to home
        </Link>

        <div className="flex-1 flex items-center justify-center relative z-10">
          <div className="w-full max-w-md">
            {!showOtp ? (
              <div className="animate-fade-in">
                <div className="text-center mb-8">
                  <h1 className="display-sm mb-2">Welcome Back!</h1>
                  <p className="text-on-surface-variant">Sign in to your account to continue trading</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="input-group">
                    <label htmlFor="email" className="input-label">Email Address</label>
                    <div className="relative">
                      <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-on-surface-variant" />
                      <input id="email" type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} className="input-field pl-10" required />
                    </div>
                  </div>

                  <div className="input-group">
                    <label htmlFor="password" className="input-label">Password</label>
                    <div className="relative">
                      <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-on-surface-variant" />
                      <input id="password" type={showPassword ? "text" : "password"} placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} className="input-field pl-10 pr-10" required />
                      <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-on-surface">
                        {showPassword ? <FiEyeOff className="w-4 h-4" /> : <FiEye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <button type="submit" className="btn btn-primary w-full h-12 text-base mt-2" disabled={isLoading}>
                    {isLoading ? "Signing in..." : "Sign In"}
                  </button>
                </form>

                <p className="text-center mt-8 text-on-surface-variant">
                  Don't have an account? <Link href="/register" className="text-primary font-bold hover:underline">Sign up</Link>
                </p>
              </div>
            ) : (
              <form onSubmit={handleOtpSubmit} className="space-y-6 text-center animate-fade-in">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto border border-primary/20">
                  <FiShield className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <h1 className="display-sm mb-2">Verify Your Email</h1>
                  <p className="text-on-surface-variant text-sm">
                    Enter the 6-digit code sent to <span className="font-bold text-on-surface">{unverifiedEmail}</span>
                  </p>
                  <p className="text-xs text-on-surface-variant/70 mt-1">Check your spam folder if not in inbox.</p>
                </div>

                <div className="input-group text-left">
                  <label className="input-label">Verification Code</label>
                  <input value={otp} onChange={(e) => setOtp(e.target.value.replace(/\s/g, ""))} placeholder="Enter 6-digit code" className="input-field text-center text-2xl tracking-[0.4em] h-14 font-mono font-bold bg-surface-container" maxLength={6} required autoFocus />
                </div>

                <button type="submit" className="btn btn-primary w-full h-12" disabled={isLoading || otp.length < 6}>
                  {isLoading ? "Verifying…" : "Verify & Continue"}
                </button>

                <p className="text-sm text-on-surface-variant">
                  Didn't receive the code?{' '}
                  {resendCountdown > 0 ? (
                    <span className="font-medium">Resend in {resendCountdown}s</span>
                  ) : (
                    <button type="button" onClick={handleResend} className="text-primary font-bold hover:underline">
                      Resend OTP
                    </button>
                  )}
                </p>

                <button type="button" onClick={() => { setShowOtp(false); setOtp(""); }} className="text-sm text-on-surface-variant hover:text-on-surface flex items-center gap-1 mx-auto mt-4 font-medium">
                  <FiArrowLeft className="w-3 h-3" /> Back to login
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      <div className="hidden lg:flex w-1/2 relative items-center justify-center bg-surface-container-high border-l border-primary/10">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1559526324-4b87b5e36e44?q=80&w=2071&auto=format&fit=crop')] bg-cover bg-center opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-br from-background/90 to-background/40" />
        <div className="relative z-10 max-w-lg p-12 text-center">
          <span className="chip chip-primary mb-6">CardYork Vanguard</span>
          <h2 className="display-md mb-6">Trade with Confidence</h2>
          <p className="text-on-surface-variant text-lg leading-relaxed">
            Access the highest market rates for your digital assets. Instant verification, zero delays.
          </p>
        </div>
      </div>
    </div>
  );
}
