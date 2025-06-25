
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';

const VanRakshakAvatar = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [selectedGuard, setSelectedGuard] = useState(0);

  const forestGuards = [
    {
      name: 'Raj Kumar',
      region: 'Ranthambore National Park',
      experience: '15 years',
      avatar: '👨‍🌾',
      specialization: 'Tiger Conservation',
      achievements: ['50+ rescue operations', 'Assisted in poacher arrests']
    },
    {
      name: 'Sunita Devi',
      region: 'Gir Wildlife Sanctuary',
      experience: '12 years',
      avatar: '👩‍🌾',
      specialization: 'Lion Conservation',
      achievements: ['Lion rehabilitation program', 'Rural awareness campaigns']
    },
    {
      name: 'Mohan Singh',
      region: 'Kaziranga National Park',
      experience: '20 years',
      avatar: '👨‍🦳',
      specialization: 'Rhino Conservation',
      achievements: ['Rhino population growth', 'International awards']
    }
  ];

  return (
    <section ref={ref} className="py-20 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-orbitron font-bold text-transparent bg-clip-text bg-gradient-to-r from-electric-cyan to-bio-green mb-8">
            Forest Guards - Our Forest Heroes
          </h2>
          <p className="text-xl text-misty-white max-w-4xl mx-auto">
            Meet the dedicated forest guards who work with VanRakshak AI to protect India's precious wildlife
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {forestGuards.map((guard, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className={`holographic p-6 rounded-xl cursor-pointer transition-all duration-300 ${
                selectedGuard === index ? 'ring-2 ring-electric-cyan' : ''
              }`}
              onClick={() => setSelectedGuard(index)}
              whileHover={{ scale: 1.05 }}
              role="button"
              tabIndex={0}
              aria-label={`Select ${guard.name} profile`}
              onKeyDown={(e) => e.key === 'Enter' && setSelectedGuard(index)}
            >
              <div className="text-6xl mb-4 text-center">{guard.avatar}</div>
              <h3 className="text-xl font-orbitron font-bold text-electric-cyan mb-2">
                {guard.name}
              </h3>
              <p className="text-bio-green mb-2">{guard.region}</p>
              <p className="text-misty-white/80 text-sm mb-3">
                Experience: {guard.experience}
              </p>
              <div className="text-sm text-neural-purple font-semibold">
                {guard.specialization}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="glassmorphism p-8 rounded-xl"
        >
          <h3 className="text-2xl font-orbitron font-bold text-tiger-orange mb-6">
            {forestGuards[selectedGuard].name}'s Achievements
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {forestGuards[selectedGuard].achievements.map((achievement, index) => (
              <div key={index} className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-bio-green rounded-full"></div>
                <span className="text-misty-white">{achievement}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default VanRakshakAvatar;
