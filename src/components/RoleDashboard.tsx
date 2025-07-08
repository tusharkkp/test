
import { motion } from 'framer-motion';
import { useAuth } from '@/hooks/useAuth';
import { User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const RoleDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  if (!user) return null;

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const getDashboardContent = () => {
    switch (user.role) {
      case 'admin':
        return {
          title: 'System Administrator Dashboard',
          color: 'from-red-500 to-orange-500',
          sections: [
            { title: 'User Management', count: '847 Users', icon: '👥' },
            { title: 'System Status', count: 'All Online', icon: '⚡' },
            { title: 'Reports Queue', count: '23 Pending', icon: '📊' },
            { title: 'Settings', count: 'Configure', icon: '⚙️' }
          ]
        };
      case 'ranger':
        return {
          title: 'Forest Ranger Dashboard',
          color: 'from-bio-green to-electric-cyan',
          sections: [
            { title: 'Submit Report', count: 'Quick Entry', icon: '📝' },
            { title: 'Emergency Tools', count: 'SOS & Alerts', icon: '🚨' },
            { title: 'My Patrol Area', count: user.location || 'Zone 7-A', icon: '🗺️' },
            { title: 'Equipment Check', count: '5 Items', icon: '🎒' }
          ]
        };
      case 'ngo':
        return {
          title: 'NGO Partner Dashboard',
          color: 'from-neural-purple to-tiger-orange',
          sections: [
            { title: 'Analytics Hub', count: 'View Data', icon: '📈' },
            { title: 'Review Reports', count: '12 New', icon: '📋' },
            { title: 'Research Access', count: 'Database', icon: '🔬' },
            { title: 'Collaboration', count: '3 Projects', icon: '🤝' }
          ]
        };
      case 'public':
        return {
          title: 'Wildlife Information Portal',
          color: 'from-electric-cyan to-bio-green',
          sections: [
            { title: 'Animal Info', count: 'Learn More', icon: '🐾' },
            { title: 'Submit Sighting', count: 'Report Wildlife', icon: '📸' },
            { title: 'Conservation Tips', count: 'Get Involved', icon: '🌱' },
            { title: 'News & Updates', count: '7 Articles', icon: '📰' }
          ]
        };
      default:
        return null;
    }
  };

  const dashboardData = getDashboardContent();
  if (!dashboardData) return null;

  return (
    <div className="min-h-screen bg-forest-navy">
      {/* Header */}
      <div className="bg-gradient-to-r from-forest-navy/90 to-forest-navy border-b border-misty-white/20">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-bio-green to-electric-cyan rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-forest-navy" />
              </div>
              <div>
                <h1 className="text-xl font-orbitron font-bold text-misty-white">
                  Welcome, {user.name}
                </h1>
                <p className="text-sm text-misty-white/70">
                  {user.department || 'VanRakshak'} • {user.location || 'India'}
                </p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg transition-colors"
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className={`text-4xl md:text-5xl font-orbitron font-bold text-transparent bg-clip-text bg-gradient-to-r ${dashboardData.color} mb-12`}>
            {dashboardData.title}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {dashboardData.sections.map((section, index) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="glassmorphism p-6 rounded-xl hover:bg-misty-white/10 transition-colors cursor-pointer"
              >
                <div className="text-4xl mb-4">{section.icon}</div>
                <h3 className="text-lg font-orbitron font-bold text-electric-cyan mb-2">
                  {section.title}
                </h3>
                <p className="text-misty-white/80">{section.count}</p>
              </motion.div>
            ))}
          </div>

          {/* Role-specific content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="glassmorphism p-6 rounded-xl">
              <h3 className="text-xl font-orbitron font-bold text-electric-cyan mb-4">
                Recent Activity
              </h3>
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center space-x-3 p-3 bg-forest-navy/30 rounded-lg">
                    <div className="w-2 h-2 bg-bio-green rounded-full" />
                    <div className="flex-1">
                      <div className="text-sm text-misty-white">Activity item {i}</div>
                      <div className="text-xs text-misty-white/60">2 hours ago</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="glassmorphism p-6 rounded-xl">
              <h3 className="text-xl font-orbitron font-bold text-electric-cyan mb-4">
                Quick Actions
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {['Action 1', 'Action 2', 'Action 3', 'Action 4'].map((action) => (
                  <button
                    key={action}
                    className="p-3 bg-forest-navy/30 hover:bg-electric-cyan/20 rounded-lg text-misty-white transition-colors"
                  >
                    {action}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default RoleDashboard;
