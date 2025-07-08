
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';

const ConservationRewards = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [userPoints] = useState(2450);

  const rewardTiers = [
    { name: 'Bronze Guardian', points: 500, badge: '🥉', color: 'text-yellow-600' },
    { name: 'Silver Guardian', points: 1500, badge: '🥈', color: 'text-gray-400' },
    { name: 'Gold Guardian', points: 3000, badge: '🥇', color: 'text-yellow-400' },
    { name: 'Diamond Guardian', points: 5000, badge: '💎', color: 'text-blue-400' }
  ];

  const activities = [
    { name: 'Share Wildlife Photos', points: 50, icon: '📸' },
    { name: 'Report Illegal Activity', points: 200, icon: '🚨' },
    { name: 'Environmental Cleanup Drive', points: 150, icon: '🧹' },
    { name: 'Tree Planting Program', points: 100, icon: '🌱' },
    { name: 'Education Workshop Participation', points: 75, icon: '📚' }
  ];

  const currentTier = rewardTiers.find((tier, index) => 
    userPoints >= tier.points && (index === rewardTiers.length - 1 || userPoints < rewardTiers[index + 1].points)
  ) || rewardTiers[0];

  const nextTier = rewardTiers.find(tier => tier.points > userPoints);

  return (
    <section ref={ref} className="py-20 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-orbitron font-bold text-transparent bg-clip-text bg-gradient-to-r from-tiger-orange to-electric-cyan mb-8">
            Conservation Rewards System
          </h2>
          <p className="text-xl text-misty-white max-w-4xl mx-auto">
            Earn points for contributing to wildlife conservation efforts
          </p>
        </motion.div>

        {/* User Points Display */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="holographic p-8 rounded-xl text-center mb-12"
        >
          <div className="text-6xl mb-4">{currentTier.badge}</div>
          <h3 className="text-3xl font-orbitron font-bold text-electric-cyan mb-4">
            Your Total Points: {userPoints.toLocaleString()}
          </h3>
          <p className="text-xl text-bio-green mb-4">Current Level: {currentTier.name}</p>
          
          {nextTier && (
            <div className="max-w-md mx-auto">
              <p className="text-misty-white/80 mb-2">
                Next level in: {nextTier.points - userPoints} points
              </p>
              <div className="w-full bg-forest-navy rounded-full h-3">
                <div 
                  className="bg-gradient-to-r from-bio-green to-electric-cyan h-3 rounded-full transition-all duration-1000"
                  style={{ width: `${(userPoints / nextTier.points) * 100}%` }}
                ></div>
              </div>
            </div>
          )}
        </motion.div>

        {/* Reward Tiers */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12"
        >
          {rewardTiers.map((tier, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
              className={`glassmorphism p-6 rounded-xl text-center ${
                userPoints >= tier.points ? 'ring-2 ring-bio-green' : ''
              }`}
            >
              <div className="text-4xl mb-3">{tier.badge}</div>
              <h4 className={`text-lg font-orbitron font-bold mb-2 ${tier.color}`}>
                {tier.name}
              </h4>
              <p className="text-misty-white/80">{tier.points} points</p>
              {userPoints >= tier.points && (
                <div className="mt-3 text-bio-green text-sm font-semibold">Earned ✓</div>
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* Activities */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <h3 className="text-3xl font-orbitron font-bold text-neural-purple mb-8 text-center">
            Ways to Earn Points
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activities.map((activity, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
                className="glassmorphism p-6 rounded-xl hover:border-electric-cyan/50 transition-all duration-300"
              >
                <div className="flex items-center space-x-4">
                  <span className="text-3xl">{activity.icon}</span>
                  <div>
                    <h4 className="text-lg font-semibold text-electric-cyan mb-1">
                      {activity.name}
                    </h4>
                    <p className="text-tiger-orange font-bold">+{activity.points} points</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ConservationRewards;
