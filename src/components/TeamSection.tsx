
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const TeamSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const team = [
    {
      name: 'Dr. Arjun Sharma',
      role: 'AI Research Lead',
      expertise: 'Computer Vision & Machine Learning',
      avatar: '🧠',
      background: 'PhD in AI from IIT Delhi, 8+ years in wildlife tech',
      skills: ['TensorFlow', 'Computer Vision', 'Edge AI', 'Research'],
      achievements: [
        'Published 15+ papers on wildlife AI',
        'Led Google AI for Conservation project',
        'Winner of IBM Wildlife Challenge 2023'
      ],
      social: {
        linkedin: '#',
        github: '#',
        email: 'arjun@vanrakshak.ai'
      }
    },
    {
      name: 'Priya Patel',
      role: 'Conservation Technology Director',
      expertise: 'Wildlife Biology & IoT Systems',
      avatar: '🌿',
      background: 'MS in Wildlife Conservation, WWF India veteran',
      skills: ['IoT Networks', 'Ecology', 'Field Operations', 'Data Analysis'],
      achievements: [
        '10+ years in wildlife conservation',
        'Deployed 200+ camera traps across India',
        'Led tiger population surveys in 5 states'
      ],
      social: {
        linkedin: '#',
        twitter: '#',
        email: 'priya@vanrakshak.ai'
      }
    },
    {
      name: 'Rajesh Kumar',
      role: 'Full-Stack Engineer',
      expertise: 'Cloud Architecture & Mobile Development',
      avatar: '⚡',
      background: 'B.Tech CSE, Ex-Microsoft, Startup founder',
      skills: ['React', 'Node.js', 'AWS', 'Mobile Development'],
      achievements: [
        'Built scalable apps for 1M+ users',
        'Open source contributor (50K+ stars)',
        'Winner of Smart India Hackathon 2022'
      ],
      social: {
        linkedin: '#',
        github: '#',
        email: 'rajesh@vanrakshak.ai'
      }
    },
    {
      name: 'Dr. Meera Singh',
      role: 'Data Science Architect',
      expertise: 'Predictive Analytics & Acoustic Processing',
      avatar: '📊',
      background: 'PhD in Data Science, Ex-ISRO scientist',
      skills: ['Python', 'Big Data', 'Signal Processing', 'Statistics'],
      achievements: [
        'Led satellite data analysis projects',
        'Expert in acoustic species identification',
        'Authored "AI for Environmental Science" book'
      ],
      social: {
        linkedin: '#',
        researchgate: '#',
        email: 'meera@vanrakshak.ai'
      }
    }
  ];

  const advisors = [
    {
      name: 'Dr. Ullas Karanth',
      role: 'Wildlife Conservation Advisor',
      organization: 'Wildlife Conservation Society',
      expertise: 'Tiger ecology and population dynamics'
    },
    {
      name: 'Shailesh Nayak',
      role: 'Technology Advisor',
      organization: 'Former Secretary, MoES',
      expertise: 'Satellite technology and earth observation'
    },
    {
      name: 'Bittu Sahgal',
      role: 'Conservation Strategy Advisor',
      organization: 'Sanctuary Nature Foundation',
      expertise: 'Wildlife protection policies and advocacy'
    }
  ];

  return (
    <section id="team" ref={ref} className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-forest-navy via-forest-navy/95 to-forest-navy"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-orbitron font-bold text-transparent bg-clip-text bg-gradient-to-r from-electric-cyan to-bio-green mb-8">
            Expert Team
          </h2>
          
          <p className="text-xl md:text-2xl text-misty-white max-w-4xl mx-auto leading-relaxed">
            World-class researchers, engineers, and conservationists united for wildlife protection
          </p>
        </motion.div>

        {/* Core Team */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
          {team.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="holographic p-8 rounded-2xl group hover:scale-102 transition-all duration-500"
              whileHover={{ y: -10 }}
            >
              {/* Header */}
              <div className="flex items-start space-x-6 mb-6">
                {/* Avatar */}
                <motion.div
                  className="w-20 h-20 bg-gradient-to-br from-electric-cyan to-bio-green rounded-full flex items-center justify-center text-4xl"
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  {member.avatar}
                </motion.div>
                
                {/* Basic Info */}
                <div className="flex-1">
                  <h3 className="text-2xl font-orbitron font-bold text-electric-cyan mb-2">
                    {member.name}
                  </h3>
                  <div className="text-lg font-semibold text-bio-green mb-1">
                    {member.role}
                  </div>
                  <div className="text-sm text-neural-purple font-medium">
                    {member.expertise}
                  </div>
                </div>
              </div>

              {/* Background */}
              <div className="mb-6">
                <p className="text-misty-white/80 leading-relaxed">
                  {member.background}
                </p>
              </div>

              {/* Skills */}
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-tiger-orange mb-3">
                  Core Skills
                </h4>
                <div className="flex flex-wrap gap-2">
                  {member.skills.map((skill, skillIndex) => (
                    <motion.span
                      key={skillIndex}
                      className="px-3 py-1 bg-gradient-to-r from-electric-cyan/20 to-bio-green/20 rounded-full text-sm text-misty-white border border-electric-cyan/30"
                      whileHover={{ scale: 1.1 }}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </div>

              {/* Achievements */}
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-neural-purple mb-3">
                  Key Achievements
                </h4>
                <div className="space-y-2">
                  {member.achievements.map((achievement, achIndex) => (
                    <div key={achIndex} className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-bio-green rounded-full mt-2 animate-pulse"></div>
                      <span className="text-sm text-misty-white/80">{achievement}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Social Links */}
              <div className="flex space-x-4 pt-4 border-t border-electric-cyan/20">
                {Object.entries(member.social).map(([platform, link]) => (
                  <motion.a
                    key={platform}
                    href={link}
                    className="text-electric-cyan hover:text-bio-green transition-colors duration-300"
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {platform === 'linkedin' ? '💼' : 
                     platform === 'github' ? '🐙' : 
                     platform === 'twitter' ? '🐦' :
                     platform === 'researchgate' ? '🔬' : '📧'}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Advisory Board */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center"
        >
          <h3 className="text-3xl md:text-4xl font-orbitron font-bold text-neural-purple mb-12">
            Advisory Board
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {advisors.map((advisor, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 1 + index * 0.1 }}
                className="glassmorphism p-6 rounded-xl text-center"
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <div className="w-16 h-16 bg-gradient-to-br from-tiger-orange to-neural-purple rounded-full flex items-center justify-center text-2xl mx-auto mb-4">
                  🎯
                </div>
                
                <h4 className="text-xl font-orbitron font-bold text-electric-cyan mb-2">
                  {advisor.name}
                </h4>
                
                <div className="text-lg font-semibold text-bio-green mb-2">
                  {advisor.role}
                </div>
                
                <div className="text-sm text-neural-purple font-medium mb-3">
                  {advisor.organization}
                </div>
                
                <p className="text-sm text-misty-white/80">
                  {advisor.expertise}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Team Statistics */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="mt-20"
        >
          <div className="max-w-4xl mx-auto holographic p-8 rounded-2xl">
            <h3 className="text-3xl font-orbitron font-bold text-center text-tiger-orange mb-8">
              Team Strength
            </h3>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-4xl font-orbitron font-bold text-bio-green mb-2">25+</div>
                <div className="text-lg text-misty-white">Years Combined</div>
                <div className="text-sm text-misty-white/60">Conservation Experience</div>
              </div>
              
              <div className="text-center">
                <div className="text-4xl font-orbitron font-bold text-electric-cyan mb-2">50+</div>
                <div className="text-lg text-misty-white">Research Papers</div>
                <div className="text-sm text-misty-white/60">Published & Citations</div>
              </div>
              
              <div className="text-center">
                <div className="text-4xl font-orbitron font-bold text-neural-purple mb-2">15+</div>
                <div className="text-lg text-misty-white">Tech Awards</div>
                <div className="text-sm text-misty-white/60">Industry Recognition</div>
              </div>
              
              <div className="text-center">
                <div className="text-4xl font-orbitron font-bold text-tiger-orange mb-2">3</div>
                <div className="text-lg text-misty-white">PhDs</div>
                <div className="text-sm text-misty-white/60">Advanced Degrees</div>
              </div>
            </div>

            <motion.div
              className="mt-8 text-center"
              whileHover={{ scale: 1.02 }}
            >
              <p className="text-lg text-misty-white leading-relaxed">
                Our multidisciplinary team combines <span className="text-bio-green font-bold">cutting-edge AI research</span> 
                with <span className="text-electric-cyan font-bold">deep conservation expertise</span> and 
                <span className="text-neural-purple font-bold"> proven engineering excellence</span> to deliver 
                transformative wildlife protection solutions.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TeamSection;
