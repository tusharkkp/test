
import { motion } from 'framer-motion';

interface HeatmapStatsProps {
  stats: {
    total: number;
    poaching: number;
    movement: number;
    threats: number;
    activeAlerts: number;
  };
}

const HeatmapStats = ({ stats }: HeatmapStatsProps) => {
  const statItems = [
    { label: 'Total Activities', value: stats.total, color: 'text-electric-cyan', icon: '📊' },
    { label: 'Animal Movement', value: stats.movement, color: 'text-bio-green', icon: '🦎' },
    { label: 'Threat Alerts', value: stats.threats, color: 'text-tiger-orange', icon: '⚠️' },
    { label: 'Active Alerts', value: stats.activeAlerts, color: 'text-red-400', icon: '🚨' }
  ];

  return (
    <div className="glassmorphism p-6 rounded-xl">
      <h3 className="text-lg font-orbitron font-bold text-electric-cyan mb-4">
        Live Statistics
      </h3>
      
      <div className="space-y-4">
        {statItems.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="flex items-center justify-between p-3 bg-forest-navy/50 rounded-lg"
          >
            <div className="flex items-center space-x-2">
              <span className="text-lg">{stat.icon}</span>
              <span className="text-misty-white/80 text-sm">{stat.label}</span>
            </div>
            <motion.span
              className={`font-orbitron font-bold text-lg ${stat.color}`}
              key={stat.value}
              initial={{ scale: 1.2 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              {stat.value}
            </motion.span>
          </motion.div>
        ))}
      </div>

      <div className="mt-4 p-3 bg-bio-green/10 border border-bio-green/30 rounded-lg">
        <div className="flex items-center space-x-2 mb-1">
          <div className="w-2 h-2 bg-bio-green rounded-full animate-pulse" />
          <span className="text-bio-green text-sm font-semibold">System Status</span>
        </div>
        <p className="text-misty-white/80 text-xs">
          All monitoring systems operational
        </p>
      </div>
    </div>
  );
};

export default HeatmapStats;
