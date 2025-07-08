
import { useAuth } from '@/hooks/useAuth';
import RoleDashboard from '@/components/RoleDashboard';
import ProtectedRoute from '@/components/ProtectedRoute';

const Dashboard = () => {
  return (
    <ProtectedRoute>
      <RoleDashboard />
    </ProtectedRoute>
  );
};

export default Dashboard;
