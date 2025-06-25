
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const GovernmentPartnerships = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const partnerships = [
    {
      name: 'Ministry of Environment',
      logo: '🏛️',
      status: 'Official Partner',
      since: '2022'
    },
    {
      name: 'Wildlife Institute of India',
      logo: '🔬',
      status: 'Research Collaboration',
      since: '2021'
    },
    {
      name: 'Indian Forest Service',
      logo: '🌲',
      status: 'Field Operations',
      since: '2023'
    },
    {
      name: 'Project Tiger',
      logo: '🐅',
      status: 'Conservation Initiative',
      since: '2022'
    }
  ];

  const achievements = [
    {
      title: 'UNESCO Recognition',
      description: 'AI for Wildlife Conservation Award',
      year: '2023',
      icon: '🏆'
    },
    {
      title: 'CITES Partnership',
      description: 'Anti-Trafficking Technology',
      year: '2023',
      icon: '🛡️'
    },
    {
      title: 'WWF Collaboration',
      description: 'Global Conservation Tech',
      year: '2022',
      icon: '🌍'
    }
  ];

  return (
    <section ref={ref} className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-forest-navy to-forest-navy/95"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-orbitron font-bold text-transparent bg-clip-text bg-gradient-to-r from-electric-cyan to-tiger-orange mb-8">
            Trusted by Government & NGOs
          </h2>
          <p className="text-xl md:text-2xl text-misty-white max-w-4xl mx-auto leading-relaxed">
            Official partnerships with leading conservation organizations
          </p>
        </motion.div>

        {/* Government Partnerships */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-16"
        >
          <h3 className="text-3xl font-orbitron font-bold text-bio-green mb-8 text-center">
            Government & Institutional Partners
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {partnerships.map((partner, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                className="glassmorphism p-6 rounded-xl text-center hover:border-electric-cyan/50 transition-colors duration-300"
              >
                <div className="text-6xl mb-4">{partner.logo}</div>
                <h4 className="text-lg font-orbitron font-bold text-electric-cyan mb-2">
                  {partner.name}
                </h4>
                <div className="text-sm text-bio-green font-semibold mb-1">
                  {partner.status}
                </div>
                <div className="text-xs text-misty-white/60">
                  Since {partner.since}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Awards & Recognition */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <h3 className="text-3xl font-orbitron font-bold text-neural-purple mb-8 text-center">
            Awards & Recognition
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {achievements.map((achievement, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.8 + index * 0.2 }}
                className="holographic p-6 rounded-xl"
              >
                <div className="flex items-start space-x-4">
                  <div className="text-4xl">{achievement.icon}</div>
                  <div>
                    <h4 className="text-xl font-orbitron font-bold text-tiger-orange mb-2">
                      {achievement.title}
                    </h4>
                    <p className="text-misty-white mb-2">{achievement.description}</p>
                    <div className="text-sm text-electric-cyan font-mono">
                      {achievement.year}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Credibility Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="mt-16 grid grid-cols-1 md:grid-cols-4 gap-6"
        >
          <div className="text-center glassmorphism p-6 rounded-xl">
            <div className="text-4xl font-orbitron font-bold text-bio-green mb-2">15+</div>
            <div className="text-lg text-electric-cyan mb-1">Government MoUs</div>
            <div className="text-sm text-misty-white/60">Active agreements</div>
          </div>
          
          <div className="text-center glassmorphism p-6 rounded-xl">
            <div className="text-4xl font-orbitron font-bold text-neural-purple mb-2">50+</div>
            <div className="text-lg text-electric-cyan mb-1">Research Papers</div>
            <div className="text-sm text-misty-white/60">Peer-reviewed</div>
          </div>
          
          <div className="text-center glassmorphism p-6 rounded-xl">
            <div className="text-4xl font-orbitron font-bold text-tiger-orange mb-2">24/7</div>
            <div className="text-lg text-electric-cyan mb-1">Monitoring</div>
            <div className="text-sm text-misty-white/60">Continuous surveillance</div>
          </div>
          
          <div className="text-center glassmorphism p-6 rounded-xl">
            <div className="text-4xl font-orbitron font-bold text-electric-cyan mb-2">99.2%</div>
            <div className="text-lg text-electric-cyan mb-1">Accuracy Rate</div>
            <div className="text-sm text-misty-white/60">Species identification</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default GovernmentPartnerships;
