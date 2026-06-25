"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { Sun, Mail, Lock, Eye, EyeOff } from "lucide-react";
import toast from "react-hot-toast";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg("");

    if (!email || !password) {
      setErrorMsg("Please enter both email and password.");
      setIsLoading(false);
      return;
    }

    try {
      await authClient.signIn.email(
        {
          email,
          password,
        },
        {
          onRequest: () => {
            setIsLoading(true);
          },
          onSuccess: () => {
            toast.success("Welcome back! Logged in successfully.");
            setIsLoading(false);
            router.push(callbackUrl);
            router.refresh();
          },
          onError: (ctx) => {
            setIsLoading(false);
            setErrorMsg(ctx.error.message || "Invalid email or password.");
            toast.error(ctx.error.message || "Login failed");
          },
        }
      );
    } catch (err: any) {
      setIsLoading(false);
      setErrorMsg(err.message || "Something went wrong.");
      toast.error(err.message || "Something went wrong.");
    }
  };

  const handleMockGoogleLogin = async () => {
    const mockEmail = "google-examiner@suncart.com";
    const mockName = "Google Examiner";
    const mockImage = "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80";
    const mockPassword = "GoogleMockPassword123!";

    try {
      toast.loading("Connecting mock Google account...", { id: "google-auth" });

      await authClient.signIn.email(
        {
          email: mockEmail,
          password: mockPassword,
        },
        {
          onSuccess: () => {
            toast.success("Successfully logged in as Google User!", { id: "google-auth" });
            router.push(callbackUrl);
            router.refresh();
          },
          onError: async (ctx) => {
            // If account doesn't exist, create it then sign in
            if (
              ctx.error.message.toLowerCase().includes("credentials") ||
              ctx.error.message.toLowerCase().includes("user") ||
              ctx.error.message.toLowerCase().includes("invalid")
            ) {
              try {
                await authClient.signUp.email({
                  email: mockEmail,
                  password: mockPassword,
                  name: mockName,
                  image: mockImage,
                });

                await authClient.signIn.email(
                  {
                    email: mockEmail,
                    password: mockPassword,
                  },
                  {
                    onSuccess: () => {
                      toast.success("Successfully logged in as Google User!", { id: "google-auth" });
                      router.push(callbackUrl);
                      router.refresh();
                    },
                    onError: (ctx2) => {
                      toast.error(ctx2.error.message || "Failed mock login", { id: "google-auth" });
                    },
                  }
                );
              } catch (signUpErr: any) {
                toast.error(signUpErr.message || "Failed to register mock Google account", { id: "google-auth" });
              }
            } else {
              toast.error(ctx.error.message || "Failed mock login", { id: "google-auth" });
            }
          },
        }
      );
    } catch (err: any) {
      toast.error(err.message || "Something went wrong", { id: "google-auth" });
    }
  };

  return (
    <div className="w-full max-w-md glass-card rounded-3xl shadow-2xl p-8 sm:p-10 border border-white/50 animate__animated animate__fadeInUp">
      <div className="flex flex-col items-center mb-8">
        <div className="p-3 bg-amber-500 rounded-2xl text-white shadow-lg shadow-amber-500/30 mb-4">
          <Sun className="h-8 w-8 animate__animated animate__spin animate__slow animate__infinite" />
        </div>
        <h2 className="text-3xl font-black text-stone-800 tracking-tight">Welcome Back</h2>
        <p className="text-stone-500 text-sm mt-2 text-center">
          Login to manage your summer shopping cart
        </p>
      </div>

      {errorMsg && (
        <div className="alert alert-error rounded-2xl py-3 px-4 text-xs font-semibold mb-6 flex gap-2 animate__animated animate__shakeX">
          <span>{errorMsg}</span>
        </div>
      )}

      <form onSubmit={handleLogin} className="space-y-5">
        {/* Email Field */}
        <div className="form-control">
          <label className="label py-1">
            <span className="label-text font-bold text-stone-700">Email Address</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
              <Mail className="h-5 w-5" />
            </div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              className="input input-bordered w-full pl-11 rounded-2xl focus:outline-none focus:border-amber-500 bg-white/70"
              required
            />
          </div>
        </div>

        {/* Password Field */}
        <div className="form-control">
          <div className="flex justify-between items-center py-1">
            <span className="label-text font-bold text-stone-700">Password</span>
          </div>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
              <Lock className="h-5 w-5" />
            </div>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="input input-bordered w-full pl-11 pr-10 rounded-2xl focus:outline-none focus:border-amber-500 bg-white/70"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-stone-400 hover:text-stone-600"
            >
              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Login Button */}
        <button
          type="submit"
          className="btn w-full bg-amber-500 hover:bg-amber-600 border-none text-white rounded-2xl font-bold py-3 mt-4 shadow-lg shadow-amber-500/20 transition-all hover:scale-[1.01] active:scale-[0.99] disabled:bg-amber-300"
          disabled={isLoading}
        >
          {isLoading ? <span className="loading loading-spinner loading-sm"></span> : "Sign In"}
        </button>
      </form>

      {/* Divider */}
      <div className="relative my-7">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-stone-200"></div>
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-transparent px-2.5 text-stone-500 font-semibold">Or continue with</span>
        </div>
      </div>

      {/* Social Login Button */}
      <button
        onClick={handleMockGoogleLogin}
        type="button"
        className="btn w-full bg-white hover:bg-stone-50 text-stone-700 border border-stone-200 hover:border-stone-300 rounded-2xl font-bold py-3 flex items-center justify-center gap-2.5 shadow-sm transition-all active:scale-[0.99]"
      >
        {/* Google Icon SVG */}
        <svg className="h-5 w-5" viewBox="0 0 24 24" width="24" height="24">
          <g transform="matrix(1, 0, 0, 1, 0, 0)">
            <path
              d="M21.35,11.1H12v2.7h5.38c-0.24,1.28 -0.99,2.37 -2.1,3.12v2.6h3.39c1.98,-1.82 3.12,-4.5 3.12,-7.62c0,-0.61 -0.06,-1.2 -0.16,-1.8Z"
              fill="#4285F4"
            />
            <path
              d="M12,20.7c2.43,0 4.47,-0.81 5.96,-2.2l-3.39,-2.6c-0.94,0.63 -2.14,1.01 -3.57,1.01c-2.75,0 -5.07,-1.86 -5.9,-4.36H1.58v2.68c1.55,3.09 4.77,5.07 8.42,5.07Z"
              fill="#34A853"
            />
            <path
              d="M6.1,12.55c-0.22,-0.66 -0.35,-1.37 -0.35,-2.1c0,-0.73 0.13,-1.44 0.35,-2.1V5.68H1.58c-0.78,1.55 -1.22,3.31 -1.22,5.17c0,1.86 0.44,3.62 1.22,5.17l3.82,-2.68c-0.22,-0.66 -0.35,-1.37 -0.35,-2.1Z"
              fill="#FBBC05"
            />
            <path
              d="M12,4.8c1.32,0 2.51,0.45 3.44,1.35l2.58,-2.58C16.46,2.1 14.43,1.3 12,1.3C8.35,1.3 5.13,3.28 3.58,6.37l3.82,2.68C8.23,6.54 10.55,4.8 12,4.8Z"
              fill="#EA4335"
            />
          </g>
        </svg>
        Google Social Login
      </button>

      <p className="text-center text-sm text-stone-600 mt-8">
        Don&apos;t have an account?{" "}
        <Link href="/register" className="font-bold text-amber-500 hover:text-amber-600 transition-colors">
          Register here
        </Link>
      </p>
    </div>
  );
}

export default function Login() {
  return (
    <div className="flex-grow flex items-center justify-center py-16 px-4 relative overflow-hidden bg-gradient-to-br from-amber-50 via-stone-50 to-orange-50">
      {/* Decorative Blur Spheres */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-amber-200 rounded-full filter blur-3xl opacity-30 animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-orange-200 rounded-full filter blur-3xl opacity-35 animate-pulse duration-5000"></div>

      <Suspense fallback={
        <div className="w-full max-w-md glass-card rounded-3xl shadow-2xl p-8 sm:p-10 border border-white/50 flex flex-col items-center justify-center min-h-[400px]">
          <span className="loading loading-spinner loading-lg text-amber-500"></span>
          <p className="text-stone-500 text-sm mt-4 font-semibold">Loading authentication form...</p>
        </div>
      }>
        <LoginForm />
      </Suspense>
    </div>
  );
}
