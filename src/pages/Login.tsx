
import { useAuth } from '@/hooks/useAuth';
import { Navigate } from 'react-router-dom';
import LoginForm from '@/components/LoginForm';

const Login = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-forest-navy flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-electric-cyan border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-misty-white">Loading...</p>
        </div>
      </div>
    );
  }

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return <LoginForm />;
};

export default Login;
