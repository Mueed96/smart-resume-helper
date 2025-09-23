import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, LogIn, CheckCircle2, X } from 'lucide-react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { AnimatePresence, motion } from 'framer-motion';
import { GoogleIcon } from '../components/GoogleIcon';
import toast from 'react-hot-toast';

export function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleForgotPassword = () => {
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
          <div className="text-2xl mt-1">🔑</div>
          <div className="flex-grow">
            <p className="font-bold text-text-heading">Password Reset</p>
            <p className="text-sm text-text-body mt-1">
              This feature is coming soon. For now, please contact support if you need help.
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

  // --- NEW HANDLER FOR GOOGLE BUTTON ---
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
              Google sign-in is not yet available but will be added in a future update.
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
      const response = await axios.post('http://localhost:3001/auth/login', {
        email,
        password,
      });

      setIsSuccess(true);
      await new Promise(resolve => setTimeout(resolve, 1500));
      login(response.data.access_token);
      navigate('/upload');
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Login failed. Please check your credentials.';
      setError(Array.isArray(errorMessage) ? errorMessage.join(', ') : errorMessage);
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
              <h1 className="text-2xl font-bold text-text-heading">Logged In Successfully!</h1>
              <p className="text-text-body mt-2">Redirecting you to the dashboard...</p>
            </div>
          ) : (
            <div className="bg-surface p-8 rounded-2xl shadow-lg border border-gray-200">
              <div className="text-center mb-8">
                <h1 className="text-3xl font-extrabold text-text-heading">Welcome Back 👋</h1>
                <p className="text-text-body mt-2">Sign in to continue to ResueMay.</p>
              </div>

              {error && (
                <div className="bg-red-50 text-red-700 p-3 rounded-md text-sm mb-6 text-center">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input type="email" placeholder="Email Address" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full pl-10 pr-3 py-2 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary" />
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input type="password" placeholder="Password" required value={password} onChange={(e) => setPassword(e.target.value)} className="w-full pl-10 pr-3 py-2 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary" />
                  </div>
                  
                  <div className="text-right">
                    <button
                      type="button"
                      onClick={handleForgotPassword}
                      className="text-sm font-medium text-primary hover:underline"
                    >
                      Forgot Password?
                    </button>
                  </div>
                  
                  <div>
                    <button type="submit" disabled={isLoading} className="w-full bg-gradient-to-r from-primary to-emerald-400 text-white font-bold py-3 px-4 rounded-md transition-transform duration-200 hover:-translate-y-1 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                      <LogIn className="h-5 w-5" /> {isLoading ? 'Signing In...' : 'Sign In'}
                    </button>
                  </div>
                </div>
              </form>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-gray-300"></span></div>
                <div className="relative flex justify-center text-sm"><span className="bg-surface px-2 text-text-subtle">or continue with</span></div>
              </div>

              <div>
                {/* --- UPDATED GOOGLE BUTTON --- */}
                <button 
                  type="button" 
                  onClick={handleGoogleLogin} 
                  className="w-full flex items-center justify-center gap-3 py-2 px-4 border border-gray-300 rounded-md hover:bg-gray-50 transition-all duration-200 hover:-translate-y-1"
                >
                  <GoogleIcon />
                  <span className="text-sm font-medium text-text-body">Sign in with Google</span>
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {!isSuccess && (
        <p className="text-center text-sm text-text-subtle mt-6">
          Don’t have an account?{' '}
          <Link to="/signup" className="font-medium text-primary hover:underline">
            Sign up
          </Link>
        </p>
      )}
    </div>
  );
}