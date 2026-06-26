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

    const attemptSignIn = async () => {
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
          onError: async (ctx) => {
            // Self-healing: If user tries to login with admin credentials but the DB is blank
            if (
              email === "admin@suncart.com" &&
              password === "adminpassword123" &&
              (ctx.error.message.toLowerCase().includes("credentials") ||
                ctx.error.message.toLowerCase().includes("user") ||
                ctx.error.message.toLowerCase().includes("invalid"))
            ) {
              try {
                toast.loading("Provisioning default admin session...", { id: "admin-auth" });
                // Sign up the admin user
                await authClient.signUp.email({
                  email: "admin@suncart.com",
                  password: "adminpassword123",
                  name: "Admin User",
                  image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
                });

                // Sign in the admin user
                await authClient.signIn.email(
                  {
                    email: "admin@suncart.com",
                    password: "adminpassword123",
                  },
                  {
                    onSuccess: () => {
                      toast.success("Admin Session Activated!", { id: "admin-auth" });
                      setIsLoading(false);
                      router.push(callbackUrl);
                      router.refresh();
                    },
                    onError: (ctx2) => {
                      setIsLoading(false);
                      setErrorMsg(ctx2.error.message || "Failed admin sign-in.");
                      toast.error("Failed admin sign-in.", { id: "admin-auth" });
                    },
                  }
                );
              } catch (signUpErr: any) {
                setIsLoading(false);
                setErrorMsg("Failed to auto-provision Admin account.");
                toast.error("Failed to auto-provision Admin account.", { id: "admin-auth" });
              }
            } else {
              setIsLoading(false);
              setErrorMsg(ctx.error.message || "Invalid email or password.");
              toast.error(ctx.error.message || "Login failed");
            }
          },
        }
      );
    };

    await attemptSignIn();
  };

  return (
    <div className="w-full max-w-md glass-card rounded-3xl shadow-2xl p-8 sm:p-10 border border-white/50 animate__animated animate__fadeInUp">
      <div className="flex flex-col items-center mb-6">
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
          className="btn w-full bg-amber-500 hover:bg-amber-600 border-none text-white rounded-2xl font-bold py-3.5 mt-4 shadow-lg shadow-amber-500/20 transition-all hover:scale-[1.01] active:scale-[0.99] disabled:bg-amber-300 flex items-center justify-center"
          disabled={isLoading}
        >
          {isLoading ? <span className="loading loading-spinner loading-sm"></span> : "Sign In"}
        </button>
      </form>

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
