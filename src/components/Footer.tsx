import Link from "next/link";
import { Sun, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-stone-900 text-stone-300 mt-auto border-t border-stone-800">
      {/* Upper Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Brand Column */}
        <div className="flex flex-col gap-4">
          <Link href="/" className="flex items-center gap-2.5 font-black text-2xl tracking-tight text-amber-500">
            <div className="p-1.5 bg-amber-500 rounded-xl text-white shadow-md shadow-amber-500/20">
              <Sun className="h-6 w-6" />
            </div>
            <span className="font-bold text-white">
              Sun<span className="text-amber-500">Cart</span>
            </span>
          </Link>
          <p className="text-sm text-stone-400 mt-2 leading-relaxed">
            Your ultimate summer companion. Explore our curated summer essential collection from UV protection sunglasses to premium skincare.
          </p>
          <div className="flex items-center gap-4 mt-2">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="p-2 bg-stone-800 hover:bg-amber-500 hover:text-white rounded-xl transition-all" aria-label="Facebook">
              <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="p-2 bg-stone-800 hover:bg-amber-500 hover:text-white rounded-xl transition-all" aria-label="Instagram">
              <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
              </svg>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="p-2 bg-stone-800 hover:bg-amber-500 hover:text-white rounded-xl transition-all" aria-label="Twitter">
              <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
              </svg>
            </a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="p-2 bg-stone-800 hover:bg-amber-500 hover:text-white rounded-xl transition-all" aria-label="Github">
              <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.11.82-.26.82-.577v-2.234c-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22v3.293c0 .319.22.694.825.576C20.565 21.795 24 17.3 24 12c0-6.63-5.37-12-12-12z"/>
              </svg>
            </a>
          </div>
        </div>

        {/* Quick Links Column */}
        <div>
          <h3 className="font-bold text-white text-base tracking-wider uppercase mb-5">Quick Links</h3>
          <ul className="flex flex-col gap-3 text-sm">
            <li>
              <Link href="/" className="hover:text-amber-500 transition-colors">Home</Link>
            </li>
            <li>
              <Link href="/products" className="hover:text-amber-500 transition-colors">Products</Link>
            </li>
            <li>
              <Link href="/my-profile" className="hover:text-amber-500 transition-colors">My Profile</Link>
            </li>
          </ul>
        </div>

        {/* Categories Column */}
        <div>
          <h3 className="font-bold text-white text-base tracking-wider uppercase mb-5">Categories</h3>
          <ul className="flex flex-col gap-3 text-sm">
            <li>
              <Link href="/products?category=Accessories" className="hover:text-amber-500 transition-colors">Accessories</Link>
            </li>
            <li>
              <Link href="/products?category=Apparel" className="hover:text-amber-500 transition-colors">Apparel</Link>
            </li>
            <li>
              <Link href="/products?category=Skincare" className="hover:text-amber-500 transition-colors">Skincare</Link>
            </li>
            <li>
              <Link href="/products?category=Hydration" className="hover:text-amber-500 transition-colors">Hydration & Beach</Link>
            </li>
          </ul>
        </div>

        {/* Contact Column */}
        <div>
          <h3 className="font-bold text-white text-base tracking-wider uppercase mb-5">Contact Us</h3>
          <ul className="flex flex-col gap-3.5 text-sm text-stone-400">
            <li className="flex items-start gap-3">
              <MapPin className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
              <span>123 Sunny Coast Boulevard, Beachfront City, FL 33101</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone className="h-5 w-5 text-amber-500 shrink-0" />
              <span>+1 (800) 555-SUNCART</span>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="h-5 w-5 text-amber-500 shrink-0" />
              <span>support@suncart.com</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Lower Footer */}
      <div className="bg-stone-950 text-stone-500 text-xs py-6 border-t border-stone-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p>© {currentYear} SunCart. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-stone-300 transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-stone-300 transition-colors">Terms of Service</Link>
            <Link href="/cookies" className="hover:text-stone-300 transition-colors">Cookie Settings</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
