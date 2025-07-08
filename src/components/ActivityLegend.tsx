
import { motion } from 'framer-motion';

const ActivityLegend = () => {
  const activityTypes = [
    { type: 'poaching', color: '#FF4444', label: 'Poaching Activity', icon: '🎯' },
    { type: 'animal-movement', color: '#39FF6A', label: 'Animal Movement', icon: '🦎' },
    { type: 'illegal-logging', color: '#FF8C00', label: 'Illegal Logging', icon: '🪓' },
    { type: 'vehicle-intrusion', color: '#8B5FFF', label: 'Vehicle Intrusion', icon: '🚗' },
    { type: 'fire-detection', color: '#FF0000', label: 'Fire Detection', icon: '🔥' },
    { type: 'conservation-patrol', color: '#00D4FF', label: 'Conservation Patrol', icon: '👮' }
  ];

  return (
    <div className="glassmorphism p-6 rounded-xl">
      <h3 className="text-lg font-orbitron font-bold text-electric-cyan mb-4">
        Activity Legend
      </h3>
      
      <div className="space-y-3">
        {activityTypes.map((activity, index) => (
          <motion.div
            key={activity.type}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="flex items-center space-x-3 p-2 rounded-lg hover:bg-misty-white/5 transition-colors"
          >
            <div className="flex items-center space-x-2">
              <div 
                className="w-4 h-4 rounded-full border-2"
                style={{ backgroundColor: activity.color, borderColor: activity.color }}
              />
              <span className="text-lg">{activity.icon}</span>
            </div>
            <span className="text-misty-white text-sm flex-1">
              {activity.label}
            </span>
          </motion.div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-misty-white/20">
        <h4 className="text-sm font-semibold text-bio-green mb-2">Severity Levels</h4>
        <div className="space-y-2">
          <div className="flex items-center space-x-2 text-xs">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <span className="text-misty-white/80">High Priority</span>
          </div>
          <div className="flex items-center space-x-2 text-xs">
            <div className="w-2 h-2 rounded-full bg-yellow-500" />
            <span className="text-misty-white/80">Medium Priority</span>
          </div>
          <div className="flex items-center space-x-2 text-xs">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
            <span className="text-misty-white/80">Low Priority</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityLegend;
