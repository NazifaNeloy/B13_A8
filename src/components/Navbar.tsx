"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { Sun, Menu, LogOut, User as UserIcon, ShoppingBag } from "lucide-react";
import toast from "react-hot-toast";
import { useCart } from "@/context/CartContext";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const { cartCount } = useCart();

  const handleLogout = async () => {
    try {
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            toast.success("Successfully logged out!");
            router.push("/");
            router.refresh();
          },
        },
      });
    } catch (err: any) {
      toast.error(err?.message || "Failed to log out");
    }
  };

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Products", href: "/products" },
    { name: "My Profile", href: "/my-profile" },
  ];

  return (
    <header className="sticky top-0 z-50 glass-nav">
      <div className="navbar max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-[4rem]">
        {/* Navbar Start */}
        <div className="navbar-start">
          {/* Mobile menu dropdown */}
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden p-2" aria-label="Open Menu">
              <Menu className="h-6 w-6" />
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-3 shadow-xl bg-base-100 rounded-2xl w-52 gap-2 border border-stone-100"
            >
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={`px-4 py-2.5 rounded-xl font-medium transition-all ${
                        isActive
                          ? "bg-amber-500 text-white shadow-md shadow-amber-500/20"
                          : "hover:bg-stone-100 text-stone-600"
                      }`}
                    >
                      {link.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2.5 font-black text-2xl tracking-tight text-amber-600 hover:opacity-90 transition-opacity"
          >
            <div className="p-1.5 bg-amber-500 rounded-xl text-white shadow-md shadow-amber-500/20">
              <Sun className="h-6 w-6 animate__animated animate__spin animate__slow animate__infinite" />
            </div>
            <span className="hidden sm:inline font-bold text-stone-800">
              Sun<span className="text-amber-500">Cart</span>
            </span>
          </Link>
        </div>

        {/* Navbar Center */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 gap-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`px-5 py-2.5 rounded-xl font-semibold text-sm transition-all ${
                      isActive
                        ? "bg-amber-500 text-white shadow-md shadow-amber-500/20"
                        : "text-stone-600 hover:bg-amber-50 hover:text-amber-600"
                    }`}
                  >
                    {link.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Navbar End */}
        <div className="navbar-end gap-3">
          {/* Shopping Cart Button */}
          <Link
            href="/cart"
            className="btn btn-ghost btn-circle relative hover:bg-amber-50 hover:text-amber-600 text-stone-600 transition-colors"
            aria-label="Shopping Cart"
          >
            <ShoppingBag className="h-6 w-6" />
            {cartCount > 0 && (
              <span className="badge badge-sm bg-amber-500 text-white font-bold absolute top-1.5 right-1.5 h-5 min-w-5 flex items-center justify-center rounded-full border-none shadow-sm text-[10px]">
                {cartCount}
              </span>
            )}
          </Link>

          {isPending ? (
            <span className="loading loading-spinner loading-md text-amber-500"></span>
          ) : session?.user ? (
            <div className="flex items-center gap-4">
              <div className="dropdown dropdown-end">
                <label tabIndex={0} className="btn btn-ghost btn-circle avatar online ring-2 ring-amber-500/20 hover:ring-amber-500/50 transition-all">
                  <div className="w-10 rounded-full bg-stone-100 overflow-hidden">
                    {session.user.image ? (
                      <img
                        src={session.user.image}
                        alt={session.user.name}
                        referrerPolicy="no-referrer"
                        className="object-cover h-full w-full"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full w-full bg-amber-100 text-amber-700 font-bold text-lg">
                        {session.user.name.charAt(0).toUpperCase()}
                      </div>
                    )}
                  </div>
                </label>
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content mt-3 z-[1] p-3 shadow-2xl bg-base-100 rounded-2xl w-56 gap-1.5 border border-stone-100"
                >
                  <li className="px-3 py-2.5 border-b border-stone-100 mb-1.5">
                    <p className="font-bold text-stone-800 text-sm truncate max-w-full">
                      {session.user.name}
                    </p>
                    <p className="text-xs text-stone-500 truncate max-w-full">
                      {session.user.email}
                    </p>
                  </li>
                  <li>
                    <Link
                      href="/my-profile"
                      className="px-3 py-2.5 rounded-xl hover:bg-stone-50 text-stone-600 flex items-center gap-2.5 font-medium"
                    >
                      <UserIcon className="h-4.5 w-4.5 text-stone-400" />
                      My Profile
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={handleLogout}
                      className="px-3 py-2.5 rounded-xl hover:bg-red-50 text-red-600 flex items-center gap-2.5 font-medium transition-colors"
                    >
                      <LogOut className="h-4.5 w-4.5 text-red-400" />
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                href="/login"
                className="btn btn-ghost hover:bg-amber-50 hover:text-amber-600 rounded-xl px-4 font-semibold text-stone-600"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="btn bg-amber-500 hover:bg-amber-600 border-none text-white shadow-md shadow-amber-500/20 rounded-xl px-5 font-semibold transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
