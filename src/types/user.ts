
export type UserRole = 'admin' | 'ranger' | 'ngo' | 'public';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  department?: string;
  location?: string;
  permissions: string[];
  createdAt: string;
  lastLogin?: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface DashboardAccess {
  canViewFullDashboard: boolean;
  canSubmitReports: boolean;
  canManageUsers: boolean;
  canViewAnalytics: boolean;
  canAccessEmergencyTools: boolean;
  canViewPublicData: boolean;
}
