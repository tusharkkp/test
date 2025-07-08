
import { motion } from 'framer-motion';
import { ActivityType } from '@/types/forestActivity';

interface ActivityControlsProps {
  selectedActivityType: ActivityType | 'all';
  onActivityTypeChange: (type: ActivityType | 'all') => void;
  isRealTimeEnabled: boolean;
  onRealTimeToggle: (enabled: boolean) => void;
}

const ActivityControls = ({
  selectedActivityType,
  onActivityTypeChange,
  isRealTimeEnabled,
  onRealTimeToggle
}: ActivityControlsProps) => {
  const filterOptions = [
    { value: 'all', label: 'All Activities', icon: '🌍' },
    { value: 'poaching', label: 'Poaching', icon: '🎯' },
    { value: 'animal-movement', label: 'Animal Movement', icon: '🦎' },
    { value: 'illegal-logging', label: 'Illegal Logging', icon: '🪓' },
    { value: 'vehicle-intrusion', label: 'Vehicle Intrusion', icon: '🚗' },
    { value: 'fire-detection', label: 'Fire Detection', icon: '🔥' },
    { value: 'conservation-patrol', label: 'Conservation Patrol', icon: '👮' }
  ];

  return (
    <div className="glassmorphism p-6 rounded-xl">
      <h3 className="text-lg font-orbitron font-bold text-electric-cyan mb-4">
        Map Controls
      </h3>
      
      {/* Real-time Toggle */}
      <div className="mb-6">
        <div className="flex items-center justify-between p-3 bg-forest-navy/50 rounded-lg">
          <span className="text-misty-white font-medium">Real-time Updates</span>
          <motion.button
            className={`relative w-12 h-6 rounded-full transition-colors duration-300 ${
              isRealTimeEnabled ? 'bg-bio-green' : 'bg-gray-600'
            }`}
            onClick={() => onRealTimeToggle(!isRealTimeEnabled)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              className="absolute top-1 left-1 w-4 h-4 bg-white rounded-full"
              animate={{ x: isRealTimeEnabled ? 24 : 0 }}
              transition={{ duration: 0.3 }}
            />
          </motion.button>
        </div>
      </div>

      {/* Activity Filter */}
      <div>
        <h4 className="text-sm font-semibold text-bio-green mb-3">Filter by Activity</h4>
        <div className="space-y-2">
          {filterOptions.map((option) => (
            <motion.button
              key={option.value}
              className={`w-full p-3 rounded-lg text-left transition-all duration-300 ${
                selectedActivityType === option.value 
                  ? 'bg-electric-cyan/20 border border-electric-cyan text-electric-cyan' 
                  : 'hover:bg-misty-white/10 border border-transparent text-misty-white'
              }`}
              onClick={() => onActivityTypeChange(option.value as ActivityType | 'all')}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center space-x-3">
                <span className="text-lg">{option.icon}</span>
                <span className="font-medium text-sm">
                  {option.label}
                </span>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ActivityControls;
