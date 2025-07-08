
import { ReactNode } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { UserRole } from '@/types/user';
import LoginForm from './LoginForm';

interface ProtectedRouteProps {
  children: ReactNode;
  allowedRoles?: UserRole[];
  fallback?: ReactNode;
}

const ProtectedRoute = ({ children, allowedRoles, fallback }: ProtectedRouteProps) => {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <LoginForm />;
  }

  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    return (
      <div className="min-h-screen bg-forest-navy flex items-center justify-center px-6">
        <div className="text-center glassmorphism p-8 rounded-xl max-w-md">
          <div className="text-6xl mb-4">🚫</div>
          <h2 className="text-2xl font-orbitron font-bold text-electric-cyan mb-4">
            Access Denied
          </h2>
          <p className="text-misty-white mb-6">
            You don't have permission to access this area.
          </p>
          <p className="text-sm text-misty-white/70">
            Current role: {user.role}
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;
