import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import { useEffect, useState } from 'react';

export function ProtectedRoute() {
  const { user, isLoading } = useAuth();
  const [toastShown, setToastShown] = useState(false);

  useEffect(() => {
    // Show toast only once when we confirm the user is not logged in
    if (!isLoading && !user && !toastShown) {
      toast.error('Please login to continue.');
      setToastShown(true);
    }
  }, [isLoading, user, toastShown]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full min-h-[calc(100vh-128px)]">
        <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-primary"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}