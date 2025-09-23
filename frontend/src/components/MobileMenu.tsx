import { AnimatePresence, motion } from 'framer-motion';
import { X, LogIn, UserPlus, LogOut } from 'lucide-react';
import { NavLink } from 'react-router-dom'; // 1. Use NavLink instead of Link
import { useAuth } from '../context/AuthContext';

interface MobileMenuProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'Upload', href: '/upload' },
  { name: 'Dashboard', href: '/resumes/placeholder' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
];

export function MobileMenu({ isOpen, setIsOpen }: MobileMenuProps) {
  const { user, logout } = useAuth();

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          // 2. Added backdrop-blur-sm for the frosted glass effect
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        >
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed top-0 right-0 h-full w-80 bg-surface p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <button onClick={() => setIsOpen(false)} className="absolute top-4 right-4 p-2">
              <X className="h-6 w-6 text-text-subtle" />
            </button>
            <nav className="mt-12">
              <ul className="space-y-4">
                {navLinks.map((link) => (
                  <li key={link.name}>
                    {/* 3. Use NavLink to apply conditional active styles */}
                    <NavLink
                      to={link.href}
                      end={link.href === '/'}
                      onClick={() => setIsOpen(false)}
                      className={({ isActive }) =>
                        `text-2xl font-bold transition-colors block ${
                          isActive
                            ? 'text-primary'
                            : 'text-text-heading hover:text-primary'
                        }`
                      }
                    >
                      {link.name}
                    </NavLink>
                  </li>
                ))}
              </ul>
              <div className="border-t border-gray-200 mt-8 pt-6">
                {user ? (
                  <button
                    onClick={() => {
                      logout();
                      setIsOpen(false);
                    }}
                    className="w-full text-left text-lg font-bold text-error flex items-center gap-3"
                  >
                    <LogOut /> Logout
                  </button>
                ) : (
                  <div className="space-y-4">
                    <NavLink
                      to="/login"
                      onClick={() => setIsOpen(false)}
                      className="w-full text-left text-lg font-bold text-text-heading flex items-center gap-3"
                    >
                      <LogIn /> Login
                    </NavLink>
                    <NavLink
                      to="/signup"
                      onClick={() => setIsOpen(false)}
                      className="w-full bg-primary text-white font-bold py-3 px-4 rounded-md flex items-center justify-center gap-2"
                    >
                      <UserPlus /> Sign Up
                    </NavLink>
                  </div>
                )}
              </div>
            </nav>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}