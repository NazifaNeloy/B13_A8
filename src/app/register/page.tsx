"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { Sun, User, Mail, Link as LinkIcon, Lock, Eye, EyeOff } from "lucide-react";
import toast from "react-hot-toast";

export default function Register() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg("");

    if (!name || !email || !password) {
      setErrorMsg("Please fill in Name, Email, and Password.");
      setIsLoading(false);
      return;
    }

    try {
      await authClient.signUp.email(
        {
          email,
          password,
          name,
          image: photoUrl || undefined,
        },
        {
          onRequest: () => {
            setIsLoading(true);
          },
          onSuccess: () => {
            toast.success("Registration successful! Please login.");
            setIsLoading(false);
            router.push("/login");
          },
          onError: (ctx) => {
            setIsLoading(false);
            setErrorMsg(ctx.error.message || "Failed to register. Please try again.");
            toast.error(ctx.error.message || "Registration failed");
          },
        }
      );
    } catch (err: any) {
      setIsLoading(false);
      setErrorMsg(err.message || "Something went wrong.");
      toast.error(err.message || "Something went wrong.");
    }
  };

  return (
    <div className="flex-grow flex items-center justify-center py-16 px-4 relative overflow-hidden bg-gradient-to-br from-amber-50 via-stone-50 to-orange-50">
      {/* Decorative Blur Spheres */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-amber-200 rounded-full filter blur-3xl opacity-30 animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-orange-200 rounded-full filter blur-3xl opacity-35 animate-pulse duration-5000"></div>

      <div className="w-full max-w-md glass-card rounded-3xl shadow-2xl p-8 sm:p-10 border border-white/50 animate__animated animate__fadeInUp">
        <div className="flex flex-col items-center mb-8">
          <div className="p-3 bg-amber-500 rounded-2xl text-white shadow-lg shadow-amber-500/30 mb-4">
            <Sun className="h-8 w-8 animate__animated animate__spin animate__slow animate__infinite" />
          </div>
          <h2 className="text-3xl font-black text-stone-800 tracking-tight">Create Account</h2>
          <p className="text-stone-500 text-sm mt-2 text-center">
            Sign up to explore premium summer essentials
          </p>
        </div>

        {errorMsg && (
          <div className="alert alert-error rounded-2xl py-3 px-4 text-xs font-semibold mb-6 flex gap-2 animate__animated animate__shakeX">
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleRegister} className="space-y-5">
          {/* Name Field */}
          <div className="form-control">
            <label className="label py-1">
              <span className="label-text font-bold text-stone-700">Full Name</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
                <User className="h-5 w-5" />
              </div>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
                className="input input-bordered w-full pl-11 rounded-2xl focus:outline-none focus:border-amber-500 bg-white/70"
                required
              />
            </div>
          </div>

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

          {/* Photo URL Field */}
          <div className="form-control">
            <label className="label py-1">
              <span className="label-text font-bold text-stone-700">Photo URL (Optional)</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
                <LinkIcon className="h-5 w-5" />
              </div>
              <input
                type="url"
                value={photoUrl}
                onChange={(e) => setPhotoUrl(e.target.value)}
                placeholder="https://example.com/avatar.jpg"
                className="input input-bordered w-full pl-11 rounded-2xl focus:outline-none focus:border-amber-500 bg-white/70"
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="form-control">
            <label className="label py-1">
              <span className="label-text font-bold text-stone-700">Password</span>
            </label>
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

          {/* Register Button */}
          <button
            type="submit"
            className="btn w-full bg-amber-500 hover:bg-amber-600 border-none text-white rounded-2xl font-bold py-3.5 mt-4 shadow-lg shadow-amber-500/20 transition-all hover:scale-[1.01] active:scale-[0.99] disabled:bg-amber-300"
            disabled={isLoading}
          >
            {isLoading ? <span className="loading loading-spinner loading-sm"></span> : "Create Account"}
          </button>
        </form>

        <p className="text-center text-sm text-stone-600 mt-8">
          Already have an account?{" "}
          <Link href="/login" className="font-bold text-amber-500 hover:text-amber-600 transition-colors">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}
