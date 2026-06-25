"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { User, Link as LinkIcon, ArrowLeft, RefreshCw } from "lucide-react";
import toast from "react-hot-toast";

export default function UpdateProfile() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Set default values when session is loaded
  useEffect(() => {
    if (!isPending && !session) {
      toast.error("Please login to update your profile information.");
      router.push("/login?callbackUrl=/my-profile/update");
    } else if (session) {
      setName(session.user.name || "");
      setImage(session.user.image || "");
    }
  }, [session, isPending, router]);

  if (isPending || !session) {
    return (
      <div className="flex-grow flex flex-col items-center justify-center min-h-[400px]">
        <span className="loading loading-spinner loading-lg text-amber-500"></span>
        <p className="text-stone-500 text-sm mt-4 font-semibold animate-pulse">
          Loading user information...
        </p>
      </div>
    );
  }

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (!name.trim()) {
      toast.error("Name field cannot be empty.");
      setIsLoading(false);
      return;
    }

    try {
      await authClient.updateUser(
        {
          name: name.trim(),
          image: image.trim() || null,
        },
        {
          onRequest: () => {
            setIsLoading(true);
          },
          onSuccess: () => {
            toast.success("Profile information updated successfully!");
            setIsLoading(false);
            router.push("/my-profile");
            router.refresh();
          },
          onError: (ctx) => {
            setIsLoading(false);
            toast.error(ctx.error.message || "Failed to update profile.");
          },
        }
      );
    } catch (err: any) {
      setIsLoading(false);
      toast.error(err.message || "Something went wrong.");
    }
  };

  return (
    <div className="flex-grow bg-stone-50/50 py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background blurs */}
      <div className="absolute top-10 left-10 w-64 h-64 bg-amber-200 rounded-full filter blur-3xl opacity-20"></div>
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-sky-200 rounded-full filter blur-3xl opacity-20"></div>

      <div className="max-w-md mx-auto relative z-10">
        {/* Back Link */}
        <div className="text-left mb-6 animate__animated animate__fadeIn">
          <button
            onClick={() => router.push("/my-profile")}
            className="inline-flex items-center gap-2 text-stone-500 hover:text-amber-500 font-semibold transition-colors bg-transparent border-none cursor-pointer"
          >
            <ArrowLeft className="h-5 w-5" />
            Back to Profile
          </button>
        </div>

        <div className="bg-white rounded-3xl border border-stone-100 shadow-2xl p-8 sm:p-10 border-white/50 animate__animated animate__fadeInUp">
          <div className="flex flex-col items-center mb-8">
            <h2 className="text-2xl font-black text-stone-800 tracking-tight">Update Information</h2>
            <p className="text-stone-500 text-sm mt-2 text-center">
              Update your public display name and avatar image URL
            </p>
          </div>

          <form onSubmit={handleUpdate} className="space-y-6">
            {/* Name Field */}
            <div className="form-control text-left">
              <label className="label py-1">
                <span className="label-text font-bold text-stone-700">Display Name</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
                  <User className="h-5 w-5" />
                </div>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your Name"
                  className="input input-bordered w-full pl-11 rounded-2xl focus:outline-none focus:border-amber-500 bg-white"
                  required
                />
              </div>
            </div>

            {/* Photo URL Field */}
            <div className="form-control text-left">
              <label className="label py-1">
                <span className="label-text font-bold text-stone-700">Photo URL / Link</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
                  <LinkIcon className="h-5 w-5" />
                </div>
                <input
                  type="url"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  placeholder="https://example.com/avatar.jpg"
                  className="input input-bordered w-full pl-11 rounded-2xl focus:outline-none focus:border-amber-500 bg-white"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="btn w-full bg-stone-900 hover:bg-amber-500 border-none text-white rounded-2xl font-bold py-3.5 mt-4 shadow-lg transition-all hover:scale-[1.01] active:scale-[0.99] disabled:bg-stone-300 flex items-center justify-center gap-2"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <RefreshCw className="h-5 w-5 animate-spin" />
                  Updating...
                </>
              ) : (
                "Update Information"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
