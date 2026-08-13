import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

interface User {
  id: string;
  _id?: string;
  userid?: string;
  email: string;
  firstName?: string;
  lastName?: string;
  firstname?: string;
  lastname?: string;
  phone?: string;
  phoneNumber?: string;
  username?: string;
  gender?: string;
  bankName?: string;
  accountNumber?: string;
  accountName?: string;
  isVerified?: boolean;
  fullName?: string;
  balance?: number;
  accountTier?: string;
  totalTrades?: number;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  registrationStep: "signup" | "activation" | "profile" | "pin" | "completed";
  tempUserId: string | null;
  tempEmail: string | null;
  tempPassword: string | null;
  tempFullName: string | null;
  tempPhone: string | null;
}

// Helper: persist pending registration state so it survives page refresh.
// SECURITY: passwords are never written to localStorage.
const savePendingRegistration = (data: {
  step: string;
  email: string;
  password?: string | null; // accepted in signature but intentionally NOT persisted
  fullName?: string | null;
  phone?: string | null;
  userId?: string | null;
}) => {
  localStorage.setItem("pendingStep", data.step);
  localStorage.setItem("pendingEmail", data.email);
  // password is deliberately omitted — kept in Redux memory only
  if (data.fullName) localStorage.setItem("pendingFullName", data.fullName);
  if (data.phone) localStorage.setItem("pendingPhone", data.phone);
  if (data.userId) localStorage.setItem("pendingUserId", data.userId);
};

// Helper: clear pending registration after completion or login
const clearPendingRegistration = () => {
  [
    "pendingStep",
    "pendingEmail",
    "pendingFullName",
    "pendingPhone",
    "pendingUserId",
  ].forEach((k) => localStorage.removeItem(k));
};

// SSR-safe initialState — localStorage is not available on the server
const initialState: AuthState = {
  user:
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("user") || "null")
      : null,
  token: typeof window !== "undefined" ? localStorage.getItem("token") : null,
  isAuthenticated:
    typeof window !== "undefined" ? !!localStorage.getItem("token") : false,
  isLoading: false,
  error: null,
  // Restore any pending registration so users can resume after a page refresh
  registrationStep:
    typeof window !== "undefined"
      ? (localStorage.getItem("pendingStep") as AuthState["registrationStep"]) || "signup"
      : "signup",
  tempUserId:
    typeof window !== "undefined"
      ? localStorage.getItem("pendingUserId")
      : null,
  tempEmail:
    typeof window !== "undefined" ? localStorage.getItem("pendingEmail") : null,
  // NOTE: passwords are never persisted to localStorage for security reasons.
  // tempPassword is held in Redux memory only and is cleared on page close.
  tempPassword: null,
  tempFullName:
    typeof window !== "undefined"
      ? localStorage.getItem("pendingFullName")
      : null,
  tempPhone:
    typeof window !== "undefined" ? localStorage.getItem("pendingPhone") : null,
};

const BASE_URL = "https://cardyork-server.onrender.com/api";

const getDeviceInfo = () => {
  // Guard for SSR
  if (typeof navigator === "undefined") {
    return {
      devicename: "Web Browser",
      devicetype: "Desktop",
      deviceos: "Unknown",
    };
  }
  const ua = navigator.userAgent;
  let devicename = "Web Browser";
  let devicetype = "Desktop";
  let deviceos = navigator.platform;

  if (/Mobi|Android/i.test(ua)) {
    devicetype = "Mobile";
  } else {
    devicetype = "Laptop";
  }

  // Detect Browser Name for devicename
  if (ua.indexOf("Firefox") > -1) {
    devicename = "Mozilla Firefox";
  } else if (ua.indexOf("SamsungBrowser") > -1) {
    devicename = "Samsung Internet";
  } else if (ua.indexOf("Opera") > -1 || ua.indexOf("OPR") > -1) {
    devicename = "Opera";
  } else if (ua.indexOf("Trident") > -1) {
    devicename = "Internet Explorer";
  } else if (ua.indexOf("Edge") > -1 || ua.indexOf("Edg") > -1) {
    devicename = "Microsoft Edge";
  } else if (ua.indexOf("Chrome") > -1) {
    devicename = "Google Chrome";
  } else if (ua.indexOf("Safari") > -1) {
    devicename = "Safari";
  }

  if (/Windows/i.test(ua)) {
    deviceos = "Windows";
  } else if (/Mac/i.test(ua)) {
    deviceos = "macOS";
  } else if (/Linux/i.test(ua)) {
    deviceos = "Linux";
  } else if (/Android/i.test(ua)) {
    deviceos = "Android";
  } else if (/iPhone|iPad|iPod/i.test(ua)) {
    deviceos = "iOS";
  }

  return { devicename, devicetype, deviceos };
};

// Helper: set auth cookie for Next.js middleware (7-day expiry)
const setAuthCookie = (token: string) => {
  document.cookie = `token=${token}; path=/; max-age=${60 * 60 * 24 * 7}; SameSite=Strict`;
};

// Helper: clear auth cookie on logout
const clearAuthCookie = () => {
  document.cookie =
    "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Strict";
};

export const signup = createAsyncThunk(
  "auth/signup",
  async (userData: { email: string; password: string; phoneNumber?: string; fullName?: string }, { rejectWithValue }) => {
    try {
      const deviceInfo = getDeviceInfo();

      // Normalize phone to +234 format, or omit if not provided
      let normalizedPhone: string | undefined;
      if (userData.phoneNumber) {
        let p = userData.phoneNumber.trim().replace(/\s/g, "");
        if (p.startsWith("+")) {
          normalizedPhone = p;
        } else if (p.startsWith("0")) {
          normalizedPhone = `+234${p.slice(1)}`;
        } else if (p.length === 10) {
          normalizedPhone = `+234${p}`;
        } else {
          normalizedPhone = `+${p}`;
        }
      }

      // Only send fields the API expects — fullName is NOT a create-endpoint field
      const body: Record<string, any> = {
        email: userData.email,
        password: userData.password,
        ...deviceInfo,
      };
      if (normalizedPhone) body.phoneNumber = normalizedPhone;

      const response = await fetch(`${BASE_URL}/auth/users/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await response.json();
      if (!response.ok) return rejectWithValue(data);
      return { ...data, email: userData.email, normalizedPhone };
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);


export const activateAccount = createAsyncThunk(
  "auth/activate",
  async (payload: { email: string; code: string }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BASE_URL}/auth/users/activate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      if (!response.ok)
        return rejectWithValue(data.message || "Activation failed");
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

export const resendCode = createAsyncThunk(
  "auth/resendCode",
  async (email: string, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BASE_URL}/auth/users/resend_code`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      if (!response.ok)
        return rejectWithValue(data.message || "Failed to resend code");
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

// Login with 2FA/OTP code — used when API returns LOGIN_CODE_SENT on signin
// Mirrors the mobile app's loginWith2Fa → POST /api/auth/users/signin/2fa
export const loginWith2Fa = createAsyncThunk(
  "auth/loginWith2Fa",
  async (
    payload: { email: string; password: string; twoFaCode: string },
    { rejectWithValue },
  ) => {
    try {
      const deviceInfo = getDeviceInfo();
      const response = await fetch(`${BASE_URL}/auth/users/signin/2fa`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...payload, ...deviceInfo }),
      });
      const data = await response.json();
      if (!response.ok)
        return rejectWithValue(data.message || "Verification failed");
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

export const updateProfile = createAsyncThunk(
  "auth/updateProfile",
  async (profileData: any, { rejectWithValue, getState }) => {
    try {
      const state = getState() as { auth: AuthState };
      const password = state.auth.tempPassword;
      const fullName = state.auth.tempFullName || "";
      let phone = state.auth.tempPhone || "";

      // Ensure phone is normalized (redundant but safe)
      if (phone && !phone.startsWith("+")) {
        if (phone.startsWith("0")) {
          phone = `+234${phone.slice(1)}`;
        } else if (phone.length === 10) {
          phone = `+234${phone}`;
        } else {
          phone = `+${phone}`;
        }
      }

      // Derive firstname, lastname, username from fullName if not provided
      const parts = fullName.trim().split(" ");
      const firstname = profileData.firstname || (parts[0] ?? "");
      const lastname = profileData.lastname || (parts.length > 1 ? parts.slice(1).join(" ") : parts[0] ?? "");
      const username = profileData.username || `${parts[0] ?? "user"}${Math.floor(1000 + Math.random() * 900000)}`;
      const phoneNumber = profileData.phoneNumber || phone || undefined;

      const payload = {
        userid: profileData.userid || state.auth.tempUserId, // fallback to state
        ...profileData,
        firstname,
        lastname,
        username,
        phoneNumber,
        password,
        gender: profileData.gender || "Undefined",
      };

      const response = await fetch(`${BASE_URL}/auth/users/update`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      if (!response.ok)
        return rejectWithValue(data.message || "Profile update failed");
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

export const sendPinOtp = createAsyncThunk(
  "auth/sendPinOtp",
  async (payload: { id: string; password?: string }, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${BASE_URL}/auth/users/account/pin/send_otp`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(payload),
        },
      );
      const data = await response.json();
      if (!response.ok)
        return rejectWithValue(data.message || "Failed to send PIN OTP");
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

export const setPin = createAsyncThunk(
  "auth/setPin",
  async (
    payload: { id: string; pin: string; token: string },
    { rejectWithValue },
  ) => {
    try {
      const response = await fetch(`${BASE_URL}/auth/users/account/pin/set`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      if (!response.ok)
        return rejectWithValue(data.message || "Failed to set PIN");
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

export const fetchUserProfile = createAsyncThunk(
  "auth/fetchProfile",
  async (userId: string, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${BASE_URL}/auth/users/account/profile?id=${userId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );
      const data = await response.json();
      if (!response.ok)
        return rejectWithValue(data.message || "Failed to fetch profile");
      return data.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

export const updateUserProfile = createAsyncThunk(
  "auth/updateUserProfile",
  async (
    profileData: { id: string; [key: string]: any },
    { rejectWithValue },
  ) => {
    try {
      const response = await fetch(
        `${BASE_URL}/auth/users/account/profile/update`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(profileData),
        },
      );
      const data = await response.json();
      if (!response.ok)
        return rejectWithValue(data.message || "Failed to update profile");
      return data.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

export const requestCode = createAsyncThunk(
  "auth/requestCode",
  async (email: string, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BASE_URL}/auth/users/password/sendcode`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      if (!response.ok || data.status === false)
        return rejectWithValue(data.message || "Failed to send reset code");
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async (
    payload: { email: string; recoverytoken: string; password: string },
    { rejectWithValue },
  ) => {
    try {
      const response = await fetch(`${BASE_URL}/auth/users/password/reset`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: payload.email,
          recoverytoken: payload.recoverytoken.toUpperCase(),
          password: payload.password,
        }),
      });
      const data = await response.json();
      if (!response.ok || data.status === false)
        return rejectWithValue(data.message || "Failed to reset password");
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

export const changePassword = createAsyncThunk(
  "auth/changePassword",
  async (
    passwordData: { id: string; oldPassword: string; password: string },
    { rejectWithValue },
  ) => {
    try {
      const response = await fetch(
        `${BASE_URL}/auth/users/account/password/update`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(passwordData),
        },
      );
      const data = await response.json();
      if (!response.ok || data.status === false || (data.statusCode && data.statusCode !== "UPDATED"))
        return rejectWithValue(data.message || "Failed to change password");
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

export const login = createAsyncThunk(
  "auth/login",
  async (credentials: any, { rejectWithValue }) => {
    try {
      const deviceInfo = getDeviceInfo();
      const response = await fetch(`${BASE_URL}/auth/users/signin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...credentials,
          ...deviceInfo,
        }),
      });
      const data = await response.json();

      // Unverified account: API sends OTP and returns LOGIN_CODE_SENT
      if (data.statusCode === "LOGIN_CODE_SENT") {
        return rejectWithValue({
          type: "LOGIN_CODE_SENT",
          email: credentials.email,
          message: data.message || "Please verify your email to continue.",
        });
      }

      // Account exists but profile data (activation) is missing
      if (data.statusCode === "NO_PROFILE_DATA_FOUND") {
        return rejectWithValue({
          type: "NO_PROFILE_DATA_FOUND",
          userid: data.data[0]?.userid || data.data[0]?.id, // ensure we get the ID
          email: credentials.email,
          password: credentials.password, // save password for subsequent updateProfile
          message: data.message || "Kindly update your profile to activate your account.",
        });
      }

      // Unverified account: registered but never verified — API tells us to re-register / resend OTP
      if (data.statusCode === "UNVERIFIED_ACCOUNT") {
        return rejectWithValue({
          type: "UNVERIFIED_ACCOUNT",
          email: credentials.email,
          message:
            data.message ||
            "Account not verified. Please complete your registration.",
        });
      }

      if (!response.ok) return rejectWithValue(data.message || "Login failed");

      const firstItem = Array.isArray(data.data)
        ? data.data[0]
        : data.data || data;
      const token = firstItem?.token || data.token;
      const user = firstItem?.userInfo || firstItem?.user || firstItem;

      if (token && user) {
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
        setAuthCookie(token);
      }

      return { user, token };
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.registrationStep = "signup";
      state.tempUserId = null;
      state.tempEmail = null;
      state.tempPassword = null;
      state.tempFullName = null;
      state.tempPhone = null;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      clearAuthCookie();
      clearPendingRegistration();
    },
    clearError: (state) => {
      state.error = null;
    },
    setRegistrationStep: (
      state,
      action: PayloadAction<AuthState["registrationStep"]>,
    ) => {
      state.registrationStep = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        login.fulfilled,
        (state, action: PayloadAction<{ user: User; token: string }>) => {
          state.isLoading = false;
          state.isAuthenticated = true;
          state.user = action.payload.user;
          state.token = action.payload.token;
          // Successful login — clear any pending registration remnants
          state.registrationStep = "signup";
          state.tempEmail = null;
          state.tempPassword = null;
          state.tempFullName = null;
          state.tempPhone = null;
          state.tempUserId = null;
          clearPendingRegistration();
        },
      )
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        const payload = action.payload as any;
        if (payload?.type === "NO_PROFILE_DATA_FOUND") {
          // Account exists but profile not set up — push back to activation
          state.tempUserId = payload.userid;
          state.tempEmail = payload.email;
          state.tempPassword = payload.password;
          state.registrationStep = "activation";
          state.error = payload.message;
          savePendingRegistration({
            step: "activation",
            email: payload.email,
            password: payload.password,
            userId: payload.userid,
          });
        } else if (payload?.type === "LOGIN_CODE_SENT") {
          // Unverified account — OTP was sent by the API, handle inline in login page
          state.tempEmail = payload.email;
          state.error = payload.message;
        } else if (payload?.type === "UNVERIFIED_ACCOUNT") {
          // Registered but never verified — auto-resend OTP and redirect to activation step
          state.tempEmail = payload.email;
          state.registrationStep = "activation";
          state.error = null;
          savePendingRegistration({
            step: "activation",
            email: payload.email,
          });
        } else {
          state.error = (payload as string) || "Login failed";
        }
      })
      .addCase(signup.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.isLoading = false;
        state.registrationStep = "activation";
        state.tempEmail = action.payload.email;
        state.tempPassword = action.meta.arg.password || null;
        state.tempFullName = action.meta.arg.fullName || null;
        state.tempPhone =
          action.payload.normalizedPhone || action.meta.arg.phoneNumber || null;
        // Persist so the user can come back and complete verification
        savePendingRegistration({
          step: "activation",
          email: action.payload.email,
          password: action.meta.arg.password,
          fullName: action.meta.arg.fullName,
          phone: action.payload.normalizedPhone || action.meta.arg.phoneNumber,
        });
      })
      .addCase(signup.rejected, (state, action) => {
        state.isLoading = false;
        const payload = action.payload as any;
        const msg =
          typeof payload === "string" ? payload : payload?.message || "";
        const code = typeof payload === "object" ? payload?.statusCode : "";

        // The API returns EMAIL_EXISTS: RESEND_OTP when the email is already registered
        // but not yet verified. It also auto-resends the OTP. Mirror the mobile app:
        // navigate to the OTP screen instead of showing a dead-end error.
        const isResendCase =
          code === "EMAIL_EXISTS: RESEND_OTP" ||
          msg.includes("EMAIL_EXISTS") ||
          msg.toLowerCase().includes("resend") ||
          msg.toLowerCase().includes("already started") ||
          msg.toLowerCase().includes("already registered") ||
          msg.toLowerCase().includes("already exists");

        if (isResendCase) {
          state.registrationStep = "activation";
          state.tempEmail = action.meta.arg.email;
          state.tempPassword = action.meta.arg.password || null;
          state.tempFullName = action.meta.arg.fullName || null;
          state.tempPhone = action.meta.arg.phoneNumber || null;
          state.error = null; // not an error — user should proceed to OTP
          savePendingRegistration({
            step: "activation",
            email: action.meta.arg.email,
            password: action.meta.arg.password,
            fullName: action.meta.arg.fullName,
            phone: action.meta.arg.phoneNumber,
          });
        } else {
          state.error = msg || "Signup failed";
        }
      })
      .addCase(resendCode.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(resendCode.fulfilled, (state, action) => {
        state.isLoading = false;
        state.registrationStep = "activation";
        state.tempEmail = action.meta.arg;
        state.error = null;
        savePendingRegistration({
          step: "activation",
          email: action.meta.arg,
        });
      })
      .addCase(resendCode.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(activateAccount.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(activateAccount.fulfilled, (state, action) => {
        state.isLoading = false;
        state.registrationStep = "profile";
        const userId =
          action.payload.data?.[0]?.userid || action.payload.data?.[0]?.id;
        state.tempUserId = userId;
        // Update persisted userId now that we have it
        if (userId) localStorage.setItem("pendingUserId", userId);
      })
      .addCase(activateAccount.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(loginWith2Fa.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginWith2Fa.fulfilled, (state, action) => {
        state.isLoading = false;
        const firstItem = Array.isArray(action.payload.data)
          ? action.payload.data[0]
          : action.payload.data || action.payload;
        const token = firstItem?.token || action.payload.token;
        const user = firstItem?.userInfo || firstItem?.user || firstItem;
        if (token && user) {
          state.token = token;
          state.user = user;
          localStorage.setItem("token", token);
          localStorage.setItem("user", JSON.stringify(user));
          document.cookie = `token=${token}; path=/; max-age=${60 * 60 * 24 * 30}; SameSite=Strict`;
        }
      })
      .addCase(loginWith2Fa.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(updateProfile.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateProfile.fulfilled, (state) => {
        state.isLoading = false;
        state.registrationStep = "pin";
        state.tempPassword = null;
        state.tempFullName = null;
        state.tempPhone = null;
        // Update step in localStorage — user can resume at PIN setup if they leave
        localStorage.setItem("pendingStep", "pin");
        localStorage.removeItem("pendingPassword");
        localStorage.removeItem("pendingFullName");
        localStorage.removeItem("pendingPhone");
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(setPin.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(setPin.fulfilled, (state) => {
        state.isLoading = false;
        state.registrationStep = "completed";
        // Registration fully done — wipe all pending state
        clearPendingRegistration();
      })
      .addCase(setPin.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchUserProfile.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload) {
          state.user = { ...state.user, ...action.payload };
          localStorage.setItem("user", JSON.stringify(state.user));
        }
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(updateUserProfile.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload) {
          state.user = { ...state.user, ...action.payload };
          localStorage.setItem("user", JSON.stringify(state.user));
        }
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(changePassword.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(changePassword.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(requestCode.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(requestCode.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(requestCode.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(resetPassword.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { logout, clearError, setRegistrationStep } = authSlice.actions;

export default authSlice.reducer;
