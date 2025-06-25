
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isSignup, setIsSignup] = useState(false);
  const { login, signup, isLoading, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      console.log('User is authenticated, redirecting to dashboard');
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (isSignup) {
      if (!name.trim()) {
        setError('Name is required');
        return;
      }
      const result = await signup(email, password, name);
      if (!result.success) {
        setError(result.error || 'Signup failed');
      } else {
        setSuccess('Account created successfully! You can now sign in.');
        setIsSignup(false);
        setName('');
        setPassword('');
      }
    } else {
      const result = await login(email, password);
      if (!result.success) {
        setError(result.error || 'Login failed');
      } else {
        setSuccess('Login successful! Redirecting...');
      }
    }
  };

  const handleDemoLogin = async (demoEmail: string) => {
    setEmail(demoEmail);
    setPassword('demo123');
    setError('');
    setSuccess('');
    
    const result = await login(demoEmail, 'demo123');
    if (!result.success) {
      setError(result.error || 'Demo login failed');
    } else {
      setSuccess('Demo login successful! Redirecting...');
    }
  };

  const demoAccounts = [
    { email: 'admin@vanrakshak.com', role: 'Administrator', description: 'Full system access' },
    { email: 'ranger@vanrakshak.com', role: 'Forest Ranger', description: 'Field operations & reports' },
    { email: 'ngo@vanrakshak.com', role: 'NGO Partner', description: 'Analytics & research' },
    { email: 'public@vanrakshak.com', role: 'Public User', description: 'Basic wildlife information' }
  ];

  return (
    <div className="min-h-screen bg-forest-navy flex items-center justify-center px-6 py-12">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-md w-full space-y-8"
      >
        <div className="text-center">
          <h2 className="text-4xl font-orbitron font-bold text-transparent bg-clip-text bg-gradient-to-r from-bio-green to-electric-cyan mb-4">
            VanRakshak Access
          </h2>
          <p className="text-misty-white">
            Secure multi-stakeholder conservation platform
          </p>
        </div>

        <form onSubmit={handleSubmit} className="glassmorphism p-8 rounded-xl space-y-6">
          <div className="flex justify-center mb-6">
            <div className="bg-forest-navy/50 rounded-lg p-1 flex">
              <button
                type="button"
                onClick={() => {
                  setIsSignup(false);
                  setError('');
                  setSuccess('');
                }}
                className={`px-4 py-2 rounded-md transition-colors ${
                  !isSignup 
                    ? 'bg-electric-cyan text-forest-navy' 
                    : 'text-misty-white hover:text-electric-cyan'
                }`}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsSignup(true);
                  setError('');
                  setSuccess('');
                }}
                className={`px-4 py-2 rounded-md transition-colors ${
                  isSignup 
                    ? 'bg-electric-cyan text-forest-navy' 
                    : 'text-misty-white hover:text-electric-cyan'
                }`}
              >
                Sign Up
              </button>
            </div>
          </div>

          {isSignup && (
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-misty-white mb-2">
                Full Name
              </label>
              <input
                id="name"
                type="text"
                required={isSignup}
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 bg-forest-navy/50 border border-misty-white/20 rounded-lg text-misty-white placeholder-misty-white/50 focus:border-electric-cyan focus:outline-none"
                placeholder="Enter your full name"
              />
            </div>
          )}

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-misty-white mb-2">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-forest-navy/50 border border-misty-white/20 rounded-lg text-misty-white placeholder-misty-white/50 focus:border-electric-cyan focus:outline-none"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-misty-white mb-2">
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-forest-navy/50 border border-misty-white/20 rounded-lg text-misty-white placeholder-misty-white/50 focus:border-electric-cyan focus:outline-none"
              placeholder="Enter your password"
              minLength={6}
            />
          </div>

          {error && (
            <div className="bg-red-500/20 border border-red-500/50 text-red-400 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          {success && (
            <div className="bg-green-500/20 border border-green-500/50 text-green-400 px-4 py-3 rounded-lg text-sm">
              {success}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-bio-green to-electric-cyan text-forest-navy font-semibold py-3 px-6 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {isLoading ? (isSignup ? 'Creating Account...' : 'Signing In...') : (isSignup ? 'Create Account' : 'Sign In')}
          </button>
        </form>

        {/* Demo Accounts - Only show for login */}
        {!isSignup && (
          <div className="glassmorphism p-6 rounded-xl">
            <h3 className="text-lg font-semibold text-electric-cyan mb-4">Demo Accounts</h3>
            <div className="space-y-3">
              {demoAccounts.map((account) => (
                <button
                  key={account.email}
                  onClick={() => handleDemoLogin(account.email)}
                  disabled={isLoading}
                  className="w-full text-left p-3 bg-forest-navy/30 hover:bg-forest-navy/50 rounded-lg transition-colors disabled:opacity-50"
                >
                  <div className="text-sm font-medium text-misty-white">{account.role}</div>
                  <div className="text-xs text-misty-white/70">{account.email}</div>
                  <div className="text-xs text-misty-white/50">{account.description}</div>
                </button>
              ))}
            </div>
            <p className="text-xs text-misty-white/60 mt-4">
              Password for all demo accounts: demo123
            </p>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default LoginForm;
