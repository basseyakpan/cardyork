"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  FiMail,
  FiLock,
  FiEye,
  FiEyeOff,
  FiArrowLeft,
  FiKey,
  FiCheckCircle,
} from "react-icons/fi";
import { useAppDispatch } from "@/store/hooks";
import { showToast } from "@/store/slices/uiSlice";
import { requestCode, resetPassword } from "@/store/slices/authSlice";

export default function ForgotPasswordPage() {
  const [step, setStep] = useState<1 | 2>(1);
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const dispatch = useAppDispatch();

  // Step 1: Request Code
  const handleRequestCode = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setIsLoading(true);
    try {
      const res = await dispatch(requestCode(email.trim())).unwrap();
      dispatch(
        showToast({
          message: res?.message || "Recovery code sent to your email! 📩",
          type: "success",
        }),
      );
      setStep(2);
    } catch (err: any) {
      dispatch(
        showToast({
          message:
            typeof err === "string"
              ? err
              : err?.message || "Failed to send reset code. Please check your email.",
          type: "error",
        }),
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Step 2: Reset Password
  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim() || !newPassword || !confirmPassword) return;

    if (newPassword !== confirmPassword) {
      dispatch(
        showToast({
          message: "New passwords do not match.",
          type: "error",
        }),
      );
      return;
    }

    if (newPassword.length < 6) {
      dispatch(
        showToast({
          message: "Password must be at least 6 characters long.",
          type: "error",
        }),
      );
      return;
    }

    setIsLoading(true);
    try {
      const res = await dispatch(
        resetPassword({
          email: email.trim(),
          recoverytoken: code.trim(),
          password: newPassword,
        }),
      ).unwrap();

      dispatch(
        showToast({
          message: res?.message || "Password updated successfully! ✅ Please login.",
          type: "success",
        }),
      );
      router.push("/login");
    } catch (err: any) {
      dispatch(
        showToast({
          message:
            typeof err === "string"
              ? err
              : err?.message || "Failed to reset password. Check recovery code.",
          type: "error",
        }),
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left Form Panel */}
      <div className="w-full lg:w-1/2 flex flex-col p-6 md:p-12 relative z-10 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2" />

        <div className="flex items-center justify-between mb-8 relative z-10">
          <Link
            href="/"
            className="flex items-center gap-2.5 text-xl font-extrabold tracking-tight no-underline"
          >
            <Image
              src="/logo.png"
              alt="CardYork Logo"
              width={140}
              height={40}
              className="object-contain"
              priority
            />
          </Link>
        </div>

        <Link
          href="/login"
          className="inline-flex items-center gap-2 text-sm text-on-surface-variant hover:text-primary mb-8 relative z-10 w-max"
        >
          <FiArrowLeft className="w-4 h-4" />
          Back to login
        </Link>

        <div className="flex-1 flex items-center justify-center relative z-10">
          <div className="w-full max-w-md">
            {step === 1 ? (
              <div className="animate-fade-in">
                <div className="text-center mb-8">
                  <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4 border border-primary/20">
                    <FiKey className="w-7 h-7 text-primary" />
                  </div>
                  <h1 className="display-sm mb-2">Forgot Password?</h1>
                  <p className="text-on-surface-variant">
                    Enter the email associated with your account and we&apos;ll send you a recovery code.
                  </p>
                </div>

                <form onSubmit={handleRequestCode} className="space-y-5">
                  <div className="input-group">
                    <label htmlFor="email" className="input-label">
                      Email Address
                    </label>
                    <div className="relative">
                      <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-on-surface-variant" />
                      <input
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="input-field pl-10"
                        required
                        autoFocus
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary w-full h-12 text-base mt-2"
                    disabled={isLoading || !email.trim()}
                  >
                    {isLoading ? "Sending Code..." : "Request Code"}
                  </button>
                </form>

                <p className="text-center mt-8 text-on-surface-variant text-sm">
                  Remembered your password?{" "}
                  <Link
                    href="/login"
                    className="text-primary font-bold hover:underline"
                  >
                    Sign In
                  </Link>
                </p>
              </div>
            ) : (
              <div className="animate-fade-in">
                <div className="text-center mb-8">
                  <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4 border border-primary/20">
                    <FiCheckCircle className="w-7 h-7 text-primary" />
                  </div>
                  <h1 className="display-sm mb-2">Reset Password</h1>
                  <p className="text-on-surface-variant text-sm">
                    Enter the recovery code sent to{" "}
                    <span className="font-bold text-on-surface">{email}</span> and your new password.
                  </p>
                </div>

                <form onSubmit={handleResetPassword} className="space-y-5">
                  <div className="input-group">
                    <label htmlFor="code" className="input-label">
                      Recovery Code
                    </label>
                    <div className="relative">
                      <FiKey className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-on-surface-variant" />
                      <input
                        id="code"
                        type="text"
                        placeholder="Enter recovery code"
                        value={code}
                        onChange={(e) => setCode(e.target.value.toUpperCase())}
                        className="input-field pl-10 uppercase tracking-widest font-mono font-bold"
                        required
                        autoFocus
                      />
                    </div>
                  </div>

                  <div className="input-group">
                    <label htmlFor="newPassword" className="input-label">
                      New Password
                    </label>
                    <div className="relative">
                      <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-on-surface-variant" />
                      <input
                        id="newPassword"
                        type={showNewPassword ? "text" : "password"}
                        placeholder="Enter new password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="input-field pl-10 pr-10"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-on-surface"
                      >
                        {showNewPassword ? (
                          <FiEyeOff className="w-4 h-4" />
                        ) : (
                          <FiEye className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="input-group">
                    <label htmlFor="confirmPassword" className="input-label">
                      Confirm New Password
                    </label>
                    <div className="relative">
                      <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-on-surface-variant" />
                      <input
                        id="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm new password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="input-field pl-10 pr-10"
                        required
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-on-surface"
                      >
                        {showConfirmPassword ? (
                          <FiEyeOff className="w-4 h-4" />
                        ) : (
                          <FiEye className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary w-full h-12 text-base mt-2"
                    disabled={
                      isLoading ||
                      !code.trim() ||
                      !newPassword ||
                      !confirmPassword
                    }
                  >
                    {isLoading ? "Resetting Password..." : "Proceed"}
                  </button>
                </form>

                <div className="flex justify-between items-center mt-6 text-sm">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="text-on-surface-variant hover:text-on-surface flex items-center gap-1 font-medium"
                  >
                    <FiArrowLeft className="w-3 h-3" /> Edit Email
                  </button>
                  <button
                    type="button"
                    onClick={handleRequestCode}
                    disabled={isLoading}
                    className="text-primary font-bold hover:underline"
                  >
                    Resend Code
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Right Hero Panel */}
      <div className="hidden lg:flex w-1/2 relative items-center justify-center bg-surface-container-high border-l border-primary/10">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1559526324-4b87b5e36e44?q=80&w=2071&auto=format&fit=crop')] bg-cover bg-center opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-br from-background/90 to-background/40" />
        <div className="relative z-10 max-w-lg p-12 text-center">
          <span className="chip chip-primary mb-6">CardYork</span>
          <h2 className="display-md mb-6">Account Recovery</h2>
          <p className="text-on-surface-variant text-lg leading-relaxed">
            Securely recover access to your CardYork account. Fast, seamless, and protected.
          </p>
        </div>
      </div>
    </div>
  );
}
