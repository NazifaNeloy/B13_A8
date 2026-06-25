import Link from "next/link";
import { Sun, Mail, Phone, MapPin, Github, Twitter, Facebook, Instagram } from "lucide-react";

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
              <Facebook className="h-5 w-5" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="p-2 bg-stone-800 hover:bg-amber-500 hover:text-white rounded-xl transition-all" aria-label="Instagram">
              <Instagram className="h-5 w-5" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="p-2 bg-stone-800 hover:bg-amber-500 hover:text-white rounded-xl transition-all" aria-label="Twitter">
              <Twitter className="h-5 w-5" />
            </a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="p-2 bg-stone-800 hover:bg-amber-500 hover:text-white rounded-xl transition-all" aria-label="Github">
              <Github className="h-5 w-5" />
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
