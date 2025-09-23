import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useScroll } from '../hooks/useScroll';
import { useAuth } from '../context/AuthContext';
import { ProfileDropdown } from './ProfileDropdown';
import { MobileMenu } from './MobileMenu';
import { Menu } from 'lucide-react';

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'Upload', href: '/upload' },
  { name: 'Dashboard', href: '/resumes/placeholder' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
];

export function Navbar() {
  const scrolled = useScroll();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user } = useAuth();

  return (
    <>
      <nav
        className={`
          sticky top-0 z-50 h-20 
          bg-surface/80 backdrop-blur-sm border-b border-gray-200
          transition-shadow duration-300
          ${scrolled ? 'shadow-sm' : 'shadow-none'}
        `}
      >
        <div className="max-w-7xl mx-auto px-8 h-full">
          <div className="flex items-center justify-between h-full">
            {/* Branding */}
            <Link to="/" className="flex items-center gap-2 transition-transform hover:scale-105">
              <img src="/logo.png" alt="ResueMay Logo" className="h-8 w-auto" />
              <span className="text-lg font-bold text-text-heading">ResueMay</span>
            </Link>

            {/* Desktop Center Navigation */}
            <div className="hidden lg:flex items-center gap-6">
              {navLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.href}
                  end={link.href === '/'}
                  className={({ isActive }) =>
                    `relative group text-sm font-medium transition-colors ${
                      isActive ? 'text-primary' : 'text-text-subtle hover:text-primary'
                    }`
                  }
                >
                   {({ isActive }) => (
                    <>
                      {link.name}
                      <span
                        className={`absolute -bottom-1 left-0 w-full h-0.5 bg-primary transition-transform duration-300 ease-out ${
                          isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                        }`}
                      ></span>
                    </>
                  )}
                </NavLink>
              ))}
            </div>

            {/* Profile Area & Mobile Menu Trigger */}
            <div className="flex items-center gap-4">
              {user ? (
                // Logged-in state
                <div className="hidden lg:flex items-center gap-4">
                  <span className="text-sm font-medium text-gray-700">
                    Hi, {user.name.split(' ')[0]} 👋
                  </span>
                  <ProfileDropdown />
                </div>
              ) : (
                // Logged-out state
                <div className="hidden lg:flex items-center gap-4">
                  <Link
                    to="/login"
                    className="text-sm font-medium text-text-subtle transition-colors hover:text-primary"
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="bg-primary text-white font-bold text-sm px-4 py-2 rounded-md hover:bg-primary-hover transition-colors"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
              <div className="lg:hidden">
                <button onClick={() => setIsMobileMenuOpen(true)} className="p-2">
                  <Menu className="h-6 w-6 text-text-heading" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <MobileMenu isOpen={isMobileMenuOpen} setIsOpen={setIsMobileMenuOpen} />
    </>
  );
}