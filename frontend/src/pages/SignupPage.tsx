import { useState } from 'react';
import { Link } from 'react-router-dom';
import { User, Mail, Lock, UserPlus, CheckCircle2, X } from 'lucide-react';
import api from '../api'; // --- FIX 1: Import our new central 'api' instance instead of the raw 'axios' library ---
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';

// Self-contained Google Icon to prevent any import issues
const GoogleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
    <path fill="#4285F4" d="M22.56,12.25 C22.56,11.45 22.49,10.68 22.36,9.93 L12.25,9.93 L12.25,14.45 L18.06,14.45 C17.81,15.99 17.02,17.29 15.82,18.1 L15.82,21.1 L19.66,21.1 C21.66,19.24 22.56,16.25 22.56,12.25 Z" />
    <path fill="#34A853" d="M12.25,23 C15.45,23 18.1,21.92 19.66,20.08 L15.82,17.08 C14.75,17.81 13.6,18.25 12.25,18.25 C9.6,18.25 7.3,16.5 6.43,14.08 L2.45,14.08 L2.45,17.16 C4.18,20.53 7.89,23 12.25,23 Z" />
    <path fill="#FBBC05" d="M6.43,14.08 C6.2,13.43 6.08,12.75 6.08,12 C6.08,11.25 6.2,10.57 6.43,9.92 L6.43,6.84 L2.45,6.84 C1.63,8.45 1.17,10.17 1.17,12 C1.17,13.83 1.63,15.55 2.45,17.16 L6.43,14.08 Z" />
    <path fill="#EA4335" d="M12.25,5.75 C13.82,5.75 15.08,6.32 15.99,7.16 L19.74,3.41 C17.99,1.79 15.45,0.83 12.25,0.83 C7.89,0.83 4.18,3.47 2.45,6.84 L6.43,9.92 C7.3,7.5 9.6,5.75 12.25,5.75 Z" />
  </svg>
);

// We no longer need the API_BASE_URL constant here, as that logic is now handled in api.ts

export function SignupPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleGoogleLogin = () => {
    toast.custom(
      (t) => (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
          className={`
            bg-surface p-4 rounded-lg shadow-lg border border-gray-200
            flex items-start gap-4 w-full max-w-sm
          `}
        >
          <div className="text-2xl mt-1">🚀</div>
          <div className="flex-grow">
            <p className="font-bold text-text-heading">Feature Coming Soon</p>
            <p className="text-sm text-text-body mt-1">
              Google sign-up is not yet available but will be added in a future update.
            </p>
          </div>
          <button onClick={() => toast.dismiss(t.id)} className="p-1 text-text-subtle hover:text-text-heading">
            <X size={20} />
          </button>
        </motion.div>
      ),
      {
        duration: 5000,
        position: 'bottom-right',
      }
    );
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      // --- FIX 2: Use our new 'api' instance for the POST request ---
      // It already knows the correct base URL. We just need to provide the endpoint.
      await api.post('/auth/signup', {
        name,
        email,
        password,
      });
      setIsSuccess(true);
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Signup failed. Please try again.';
      setError(Array.isArray(errorMessage) ? errorMessage.join(', ') : errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] flex flex-col items-center justify-center p-4 bg-gradient-to-b from-white via-blue-50/30 to-white">
      <AnimatePresence mode="wait">
        <motion.div
          key={isSuccess ? 'success' : 'form'}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="w-full max-w-md"
        >
          {isSuccess ? (
            <div className="bg-surface text-center p-8 rounded-2xl shadow-lg border border-gray-200">
              <CheckCircle2 className="h-16 w-16 text-accent mx-auto mb-4" />
              <h1 className="text-2xl font-bold text-text-heading">🎉 Account created!</h1>
              <p className="text-text-body mt-2 mb-6">Please log in to continue.</p>
              <Link
                to="/login"
                className="w-full inline-block bg-primary text-white font-bold py-3 px-4 rounded-md hover:bg-primary-hover transition-transform duration-200 hover:-translate-y-1"
              >
                Go to Login
              </Link>
            </div>
          ) : (
            <div className="bg-surface p-8 rounded-2xl shadow-lg border border-gray-200">
              <div className="text-center mb-8">
                <h1 className="text-3xl font-extrabold text-text-heading">Create Your Account 🚀</h1>
                <p className="text-text-body mt-2">Get started by creating a free account.</p>
              </div>

              {error && (
                <div className="bg-red-50 text-red-700 p-3 rounded-md text-sm mb-6 text-center">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="space-y-6">
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input type="text" placeholder="Full Name" required value={name} onChange={(e) => setName(e.target.value)} className="w-full pl-10 pr-3 py-2 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary" />
                  </div>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input type="email" placeholder="Email Address" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full pl-10 pr-3 py-2 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary" />
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input type="password" placeholder="Password" required value={password} onChange={(e) => setPassword(e.target.value)} className="w-full pl-10 pr-3 py-2 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary" />
                  </div>
                  <div>
                    <button type="submit" disabled={isLoading} className="w-full bg-gradient-to-r from-primary to-emerald-400 text-white font-bold py-3 px-4 rounded-md transition-transform duration-200 hover:-translate-y-1 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                      <UserPlus className="h-5 w-5" /> {isLoading ? 'Creating Account...' : 'Create Account'}
                    </button>
                  </div>
                </div>
              </form>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-gray-300"></span></div>
                <div className="relative flex justify-center text-sm"><span className="bg-surface px-2 text-text-subtle">or continue with</span></div>
              </div>

              <div>
                <button 
                  type="button" 
                  onClick={handleGoogleLogin} 
                  className="w-full flex items-center justify-center gap-3 py-2 px-4 border border-gray-300 rounded-md hover:bg-gray-50 transition-all duration-200 hover:-translate-y-1"
                >
                  <GoogleIcon />
                  <span className="text-sm font-medium text-text-body">Sign up with Google</span>
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
      
      {!isSuccess && (
        <p className="text-center text-sm text-text-subtle mt-6">
          Already have an account?{' '}
          <Link to="/login" className="font-medium text-primary hover:underline">
            Login
          </Link>
        </p>
      )}
    </div>
  );
}