
import { User, UserRole, AuthState } from '@/types/user';

// Mock user database - in production this would be handled by Supabase
const MOCK_USERS: Record<string, User> = {
  'admin@example.com': {
    id: 'admin-1',
    email: 'admin@example.com',
    name: 'System Administrator',
    role: 'admin',
    department: 'Forest Department HQ',
    location: 'New Delhi',
    permissions: ['full_access', 'user_management', 'system_settings'],
    createdAt: new Date().toISOString()
  },
  'ranger@example.com': {
    id: 'ranger-1',
    email: 'ranger@example.com',
    name: 'Forest Ranger Kumar',
    role: 'ranger',
    department: 'Jim Corbett National Park',
    location: 'Uttarakhand',
    permissions: ['submit_reports', 'emergency_tools', 'field_operations'],
    createdAt: new Date().toISOString()
  },
  'ngo@example.com': {
    id: 'ngo-1',
    email: 'ngo@example.com',
    name: 'Wildlife Conservation NGO',
    role: 'ngo',
    department: 'WWF India',
    location: 'Mumbai',
    permissions: ['view_analytics', 'review_reports', 'research_access'],
    createdAt: new Date().toISOString()
  },
  'public@example.com': {
    id: 'public-1',
    email: 'public@example.com',
    name: 'Wildlife Enthusiast',
    role: 'public',
    permissions: ['view_public_data', 'submit_sightings'],
    createdAt: new Date().toISOString()
  }
};

class AuthService {
  private currentUser: User | null = null;
  private listeners: ((user: User | null) => void)[] = [];

  constructor() {
    // Check for stored session
    const storedUser = localStorage.getItem('vanrakshak_user');
    if (storedUser) {
      this.currentUser = JSON.parse(storedUser);
    }
  }

  subscribe(listener: (user: User | null) => void) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  private notify() {
    this.listeners.forEach(listener => listener(this.currentUser));
  }

  async login(email: string, password: string): Promise<{ success: boolean; error?: string }> {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    const user = MOCK_USERS[email];
    if (!user) {
      return { success: false, error: 'User not found' };
    }

    // In production, password would be validated securely
    if (password !== 'password123') {
      return { success: false, error: 'Invalid password' };
    }

    this.currentUser = { ...user, lastLogin: new Date().toISOString() };
    localStorage.setItem('vanrakshak_user', JSON.stringify(this.currentUser));
    this.notify();

    return { success: true };
  }

  async logout() {
    this.currentUser = null;
    localStorage.removeItem('vanrakshak_user');
    this.notify();
  }

  getCurrentUser(): User | null {
    return this.currentUser;
  }

  hasPermission(permission: string): boolean {
    return this.currentUser?.permissions.includes(permission) || false;
  }

  hasRole(role: UserRole): boolean {
    return this.currentUser?.role === role;
  }

  canAccess(requiredRoles: UserRole[]): boolean {
    return this.currentUser ? requiredRoles.includes(this.currentUser.role) : false;
  }
}

export const authService = new AuthService();
