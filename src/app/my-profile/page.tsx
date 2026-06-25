"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { User, Mail, ShieldAlert, Edit2, Calendar } from "lucide-react";
import toast from "react-hot-toast";

export default function MyProfile() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  useEffect(() => {
    if (!isPending && !session) {
      toast.error("Please login to view your profile.");
      router.push("/login?callbackUrl=/my-profile");
    }
  }, [session, isPending, router]);

  if (isPending || !session) {
    return (
      <div className="flex-grow flex flex-col items-center justify-center min-h-[400px]">
        <span className="loading loading-spinner loading-lg text-amber-500"></span>
        <p className="text-stone-500 text-sm mt-4 font-semibold animate-pulse">
          Retrieving profile data...
        </p>
      </div>
    );
  }

  // Formatting date of user creation if available
  const joinedDate = session.user.createdAt
    ? new Date(session.user.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "Recently Joined";

  return (
    <div className="flex-grow bg-stone-50/50 py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background blurs */}
      <div className="absolute top-10 left-10 w-64 h-64 bg-amber-200 rounded-full filter blur-3xl opacity-20"></div>
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-sky-200 rounded-full filter blur-3xl opacity-20"></div>

      <div className="max-w-2xl mx-auto relative z-10">
        <div className="bg-white rounded-3xl border border-stone-100 shadow-2xl overflow-hidden animate__animated animate__fadeInUp">
          {/* Cover Header */}
          <div className="h-36 summer-gradient relative">
            <div className="absolute -bottom-16 left-8 sm:left-12">
              <div className="avatar ring-4 ring-white rounded-full shadow-lg">
                <div className="w-28 h-28 rounded-full bg-stone-100 overflow-hidden relative">
                  {session.user.image ? (
                    <img
                      src={session.user.image}
                      alt={session.user.name}
                      referrerPolicy="no-referrer"
                      className="object-cover h-full w-full"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full w-full bg-amber-100 text-amber-700 font-black text-4xl">
                      {session.user.name.charAt(0).toUpperCase()}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Profile Content */}
          <div className="pt-20 pb-10 px-8 sm:px-12 text-left">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-100 pb-6 mb-6">
              <div>
                <h1 className="text-3xl font-black text-stone-800 tracking-tight">
                  {session.user.name}
                </h1>
                <p className="text-xs text-stone-400 font-bold uppercase tracking-wider mt-1 flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5" /> Joined: {joinedDate}
                </p>
              </div>

              <Link
                href="/my-profile/update"
                className="btn btn-sm bg-stone-900 hover:bg-amber-500 text-white border-none rounded-xl font-bold py-2 px-4.5 flex items-center gap-2 self-start sm:self-auto transition-all"
              >
                <Edit2 className="h-4 w-4" />
                Update Profile
              </Link>
            </div>

            {/* Profile Info Fields */}
            <div className="space-y-4">
              <h3 className="font-extrabold text-stone-700 text-sm mb-3">Profile Information</h3>

              <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center p-3 bg-stone-50 rounded-2xl border border-stone-100">
                <div className="sm:col-span-4 text-xs font-bold text-stone-400 uppercase flex items-center gap-2">
                  <User className="h-4.5 w-4.5 text-stone-400 shrink-0" />
                  Full Name
                </div>
                <div className="sm:col-span-8 text-sm font-semibold text-stone-700">
                  {session.user.name}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center p-3 bg-stone-50 rounded-2xl border border-stone-100">
                <div className="sm:col-span-4 text-xs font-bold text-stone-400 uppercase flex items-center gap-2">
                  <Mail className="h-4.5 w-4.5 text-stone-400 shrink-0" />
                  Email Address
                </div>
                <div className="sm:col-span-8 text-sm font-semibold text-stone-700 truncate">
                  {session.user.email}
                </div>
              </div>

              {session.user.emailVerified !== undefined && (
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center p-3 bg-stone-50 rounded-2xl border border-stone-100">
                  <div className="sm:col-span-4 text-xs font-bold text-stone-400 uppercase flex items-center gap-2">
                    <ShieldAlert className="h-4.5 w-4.5 text-stone-400 shrink-0" />
                    Status
                  </div>
                  <div className="sm:col-span-8">
                    <span className="badge bg-emerald-100 text-emerald-800 font-bold border-none text-xs rounded-lg px-2.5 py-1">
                      Active Session
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
