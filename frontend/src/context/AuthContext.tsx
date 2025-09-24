import { createContext, useState, useContext, type ReactNode, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

// --- THIS IS THE FIX: Added createdAt to the User interface ---
interface User {
  sub: string; // User ID
  email: string;
  name: string;
  createdAt: string; // Dates in JWT are typically strings
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem('authToken');
    if (storedToken) {
      try {
        const decodedUser: User = jwtDecode(storedToken);
        setUser(decodedUser);
        setToken(storedToken);
      } catch (error) {
        localStorage.removeItem('authToken');
      }
    }
    setIsLoading(false);
  }, []);

  const login = (newToken: string) => {
    try {
      const decodedUser: User = jwtDecode(newToken);
      localStorage.setItem('authToken', newToken);
      setToken(newToken);
      setUser(decodedUser);
    } catch (error) {
      console.error("Failed to decode token:", error);
    }
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    setToken(null);
    setUser(null);
  };

  const value = { user, token, login, logout, isLoading };

  return <AuthContext.Provider value={value}>{!isLoading && children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}