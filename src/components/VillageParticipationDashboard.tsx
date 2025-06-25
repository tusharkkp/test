
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const VillageParticipationDashboard = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const participationData = [
    { village: 'Rampur', participants: 450, activities: 12, rewards: 2400 },
    { village: 'Gangapur', participants: 380, activities: 9, rewards: 1950 },
    { village: 'Shivpur', participants: 520, activities: 15, rewards: 3100 },
    { village: 'Sundarpur', participants: 290, activities: 7, rewards: 1450 }
  ];

  const totalStats = {
    villages: 127,
    participants: 15420,
    activities: 342,
    totalRewards: 89750
  };

  return (
    <section ref={ref} className="py-20 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-orbitron font-bold text-transparent bg-clip-text bg-gradient-to-r from-bio-green to-neural-purple mb-8">
            Village Participation Dashboard
          </h2>
          <p className="text-xl text-misty-white max-w-4xl mx-auto">
            Community involvement in wildlife conservation across participating villages
          </p>
        </motion.div>

        {/* Total Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12"
        >
          <div className="glassmorphism p-6 rounded-xl text-center">
            <div className="text-4xl font-orbitron font-bold text-bio-green mb-2">
              {totalStats.villages}
            </div>
            <div className="text-electric-cyan">Participating Villages</div>
          </div>
          
          <div className="glassmorphism p-6 rounded-xl text-center">
            <div className="text-4xl font-orbitron font-bold text-neural-purple mb-2">
              {totalStats.participants.toLocaleString()}
            </div>
            <div className="text-electric-cyan">Active Members</div>
          </div>
          
          <div className="glassmorphism p-6 rounded-xl text-center">
            <div className="text-4xl font-orbitron font-bold text-tiger-orange mb-2">
              {totalStats.activities}
            </div>
            <div className="text-electric-cyan">Conservation Activities</div>
          </div>
          
          <div className="glassmorphism p-6 rounded-xl text-center">
            <div className="text-4xl font-orbitron font-bold text-electric-cyan mb-2">
              {totalStats.totalRewards.toLocaleString()}
            </div>
            <div className="text-electric-cyan">Total Reward Points</div>
          </div>
        </motion.div>

        {/* Village Participation Table */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="holographic rounded-xl overflow-hidden"
        >
          <div className="p-6 border-b border-electric-cyan/20">
            <h3 className="text-2xl font-orbitron font-bold text-electric-cyan">
              Top Performing Villages
            </h3>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-forest-navy/50">
                <tr>
                  <th className="px-6 py-4 text-left text-bio-green font-orbitron">Village Name</th>
                  <th className="px-6 py-4 text-left text-bio-green font-orbitron">Participants</th>
                  <th className="px-6 py-4 text-left text-bio-green font-orbitron">Activities</th>
                  <th className="px-6 py-4 text-left text-bio-green font-orbitron">Reward Points</th>
                  <th className="px-6 py-4 text-left text-bio-green font-orbitron">Progress</th>
                </tr>
              </thead>
              <tbody>
                {participationData.map((village, index) => (
                  <motion.tr
                    key={index}
                    initial={{ opacity: 0, x: -30 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                    className="border-b border-electric-cyan/10 hover:bg-electric-cyan/5 transition-colors"
                  >
                    <td className="px-6 py-4 text-misty-white font-medium">{village.village}</td>
                    <td className="px-6 py-4 text-electric-cyan">{village.participants}</td>
                    <td className="px-6 py-4 text-neural-purple">{village.activities}</td>
                    <td className="px-6 py-4 text-tiger-orange">{village.rewards}</td>
                    <td className="px-6 py-4">
                      <div className="w-full bg-forest-navy rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-bio-green to-electric-cyan h-2 rounded-full"
                          style={{ width: `${(village.participants / 600) * 100}%` }}
                        ></div>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default VillageParticipationDashboard;
