
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

const ImpactMetrics = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const [animatedValues, setAnimatedValues] = useState({
    wildlifeProtected: 0,
    camerasDeployed: 0,
    alertsProcessed: 0,
    communitiesEngaged: 0
  });

  const targetValues = {
    wildlifeProtected: 2847,
    camerasDeployed: 156,
    alertsProcessed: 4932,
    communitiesEngaged: 23
  };

  useEffect(() => {
    if (isInView) {
      const duration = 2000; // 2 seconds
      const steps = 60; // 60 fps
      const stepTime = duration / steps;

      Object.keys(targetValues).forEach(key => {
        let currentStep = 0;
        const targetValue = targetValues[key as keyof typeof targetValues];
        
        const timer = setInterval(() => {
          currentStep++;
          const progress = currentStep / steps;
          const easedProgress = 1 - Math.pow(1 - progress, 3); // Ease out cubic
          const currentValue = Math.floor(easedProgress * targetValue);
          
          setAnimatedValues(prev => ({
            ...prev,
            [key]: currentValue
          }));

          if (currentStep >= steps) {
            clearInterval(timer);
            setAnimatedValues(prev => ({
              ...prev,
              [key]: targetValue
            }));
          }
        }, stepTime);
      });
    }
  }, [isInView]);

  const metrics = [
    {
      value: animatedValues.wildlifeProtected,
      label: 'Wildlife Protected',
      description: 'Animals under AI monitoring',
      icon: '🐅',
      color: 'from-tiger-orange to-red-500',
      prefix: ''
    },
    {
      value: animatedValues.camerasDeployed,
      label: 'AI Cameras Deployed',
      description: 'Smart monitoring devices',
      icon: '📷',
      color: 'from-electric-cyan to-blue-500',
      prefix: ''
    },
    {
      value: animatedValues.alertsProcessed,
      label: 'Threats Detected',
      description: 'Real-time alerts processed',
      icon: '⚠️',
      color: 'from-neural-purple to-purple-500',
      prefix: ''
    },
    {
      value: animatedValues.communitiesEngaged,
      label: 'Communities Engaged',
      description: 'Local conservation partners',
      icon: '🤝',
      color: 'from-bio-green to-green-500',
      prefix: ''
    }
  ];

  const impactAreas = [
    {
      title: 'Poaching Prevention',
      before: '23 incidents/month',
      after: '3 incidents/month',
      improvement: '87% reduction',
      description: 'AI-powered early detection systems have dramatically reduced poaching incidents'
    },
    {
      title: 'Species Monitoring',
      before: 'Manual counting (6 months)',
      after: 'Automated tracking (real-time)',
      improvement: '99% faster',
      description: 'Continuous population monitoring with instant species identification'
    },
    {
      title: 'Habitat Protection',
      before: '15% forest coverage monitored',
      after: '78% forest coverage monitored',
      improvement: '5x increase',
      description: 'Comprehensive ecosystem surveillance with predictive analytics'
    },
    {
      title: 'Community Engagement',
      before: '12% local participation',
      after: '89% local participation',
      improvement: '7x growth',
      description: 'Gamified conservation apps connecting communities to wildlife protection'
    }
  ];

  return (
    <section id="impact" ref={ref} className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-forest-navy/90 to-forest-navy"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-orbitron font-bold text-transparent bg-clip-text bg-gradient-to-r from-bio-green to-electric-cyan mb-8">
            Conservation Impact
          </h2>
          
          <p className="text-xl md:text-2xl text-misty-white max-w-4xl mx-auto leading-relaxed">
            Measurable results from AI-powered wildlife protection systems
          </p>
        </motion.div>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {metrics.map((metric, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="relative group"
            >
              <div className="holographic p-8 rounded-2xl text-center hover:scale-105 transition-transform duration-300">
                {/* Background gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${metric.color} opacity-10 rounded-2xl`}></div>
                
                <div className="relative z-10">
                  {/* Icon */}
                  <div className="text-6xl mb-4 animate-float">{metric.icon}</div>
                  
                  {/* Value */}
                  <motion.div
                    className="text-4xl md:text-5xl font-orbitron font-black text-electric-cyan text-glow mb-2"
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    {metric.prefix}{metric.value.toLocaleString()}
                  </motion.div>
                  
                  {/* Label */}
                  <div className="text-lg font-semibold text-bio-green mb-2">
                    {metric.label}
                  </div>
                  
                  {/* Description */}
                  <div className="text-sm text-misty-white/80">
                    {metric.description}
                  </div>
                </div>

                {/* Hover effect */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${metric.color} opacity-0 rounded-2xl`}
                  whileHover={{ opacity: 0.05 }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Before/After Comparison */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mb-20"
        >
          <h3 className="text-3xl md:text-4xl font-orbitron font-bold text-center text-neural-purple mb-12">
            Transformation Metrics
          </h3>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {impactAreas.map((area, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 1 + index * 0.2 }}
                className="glassmorphism p-8 rounded-2xl"
                whileHover={{ scale: 1.02, y: -5 }}
              >
                <h4 className="text-2xl font-orbitron font-bold text-electric-cyan mb-6">
                  {area.title}
                </h4>
                
                <div className="space-y-4 mb-6">
                  {/* Before */}
                  <div className="flex items-center justify-between p-4 bg-red-500/10 rounded-lg border-l-4 border-red-500">
                    <div>
                      <div className="text-sm text-misty-white/60">BEFORE</div>
                      <div className="text-lg font-semibold text-misty-white">{area.before}</div>
                    </div>
                    <div className="text-3xl">❌</div>
                  </div>
                  
                  {/* After */}
                  <div className="flex items-center justify-between p-4 bg-bio-green/10 rounded-lg border-l-4 border-bio-green">
                    <div>
                      <div className="text-sm text-misty-white/60">AFTER</div>
                      <div className="text-lg font-semibold text-misty-white">{area.after}</div>
                    </div>
                    <div className="text-3xl">✅</div>
                  </div>
                </div>
                
                {/* Improvement Badge */}
                <div className="text-center mb-4">
                  <div className="inline-block bg-gradient-to-r from-tiger-orange to-neural-purple px-6 py-2 rounded-full">
                    <span className="text-xl font-orbitron font-bold text-misty-white">
                      {area.improvement}
                    </span>
                  </div>
                </div>
                
                {/* Description */}
                <p className="text-misty-white/80 text-center leading-relaxed">
                  {area.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ROI Calculator */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 1.5 }}
          className="text-center"
        >
          <div className="max-w-4xl mx-auto holographic p-12 rounded-3xl">
            <h3 className="text-3xl font-orbitron font-bold text-tiger-orange mb-8">
              Conservation Return on Investment
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-5xl font-orbitron font-bold text-bio-green mb-2">₹2.4M</div>
                <div className="text-lg text-misty-white">Investment Required</div>
                <div className="text-sm text-misty-white/60">One-time setup cost</div>
              </div>
              
              <div className="text-center">
                <div className="text-5xl font-orbitron font-bold text-electric-cyan mb-2">₹12.8M</div>
                <div className="text-lg text-misty-white">Value Generated</div>
                <div className="text-sm text-misty-white/60">5-year projection</div>
              </div>
              
              <div className="text-center">
                <div className="text-5xl font-orbitron font-bold text-neural-purple mb-2">533%</div>
                <div className="text-lg text-misty-white">ROI Achievement</div>
                <div className="text-sm text-misty-white/60">Conservation value</div>
              </div>
            </div>

            <motion.div
              className="mt-8 p-6 glassmorphism rounded-xl"
              whileHover={{ scale: 1.02 }}
            >
              <p className="text-lg text-misty-white leading-relaxed">
                <span className="text-bio-green font-bold">Every ₹1 invested</span> in VanRakshak AI generates 
                <span className="text-electric-cyan font-bold"> ₹5.33 in conservation value</span> through 
                reduced poaching losses, improved tourism, and ecosystem preservation.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ImpactMetrics;
