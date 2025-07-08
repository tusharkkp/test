
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';

const ExpertTestimonials = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const testimonials = [
    {
      name: 'Dr. Rajesh Gopal',
      title: 'Former Director, Project Tiger',
      organization: 'Ministry of Environment & Forests',
      quote: 'VanRakshak AI represents a paradigm shift in wildlife conservation. The real-time threat detection capability has already prevented multiple poaching incidents across our protected areas.',
      image: '👨‍🔬',
      credentials: 'PhD Wildlife Biology, 25+ years experience'
    },
    {
      name: 'Dr. Priya Davidar',
      title: 'Wildlife Biologist',
      organization: 'Pondicherry University',
      quote: 'The species identification accuracy achieved by VanRakshak is unprecedented. We\'ve integrated it into our research protocols with remarkable success in behavioral studies.',
      image: '👩‍🔬',
      credentials: 'Professor of Ecology, 200+ publications'
    },
    {
      name: 'Belinda Wright',
      title: 'Executive Director',
      organization: 'Wildlife Protection Society of India',
      quote: 'This technology is a game-changer for anti-poaching operations. The predictive analytics have helped us deploy resources more effectively and save countless wildlife lives.',
      image: '👩‍💼',
      credentials: 'Conservation Leader, Whitley Award Winner'
    },
    {
      name: 'Dr. Ullas Karanth',
      title: 'Senior Conservation Scientist',
      organization: 'Wildlife Conservation Society',
      quote: 'The integration of AI with traditional conservation methods through VanRakshak has enhanced our monitoring capabilities exponentially. It\'s the future of wildlife protection.',
      image: '👨‍🎓',
      credentials: 'Tiger Expert, 40+ years field experience'
    }
  ];

  const researchMetrics = [
    {
      metric: '120+',
      label: 'Research Papers',
      description: 'Published using our data'
    },
    {
      metric: '85%',
      label: 'Accuracy Improvement',
      description: 'In species monitoring'
    },
    {
      metric: '15',
      label: 'Universities',
      description: 'Using our platform'
    },
    {
      metric: '300+',
      label: 'Wildlife Biologists',
      description: 'Trained on our system'
    }
  ];

  return (
    <section ref={ref} className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-forest-navy/50 to-forest-navy"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-orbitron font-bold text-transparent bg-clip-text bg-gradient-to-r from-neural-purple to-bio-green mb-8">
            Expert Testimonials
          </h2>
          <p className="text-xl md:text-2xl text-misty-white max-w-4xl mx-auto leading-relaxed">
            Trusted by leading wildlife biologists and conservation experts
          </p>
        </motion.div>

        {/* Main Testimonial Display */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="holographic p-8 md:p-12 rounded-2xl mb-12"
        >
          <div className="text-center mb-8">
            <motion.div
              key={activeTestimonial}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-8xl mb-6"
            >
              {testimonials[activeTestimonial].image}
            </motion.div>
            
            <motion.blockquote
              key={`quote-${activeTestimonial}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-2xl md:text-3xl text-misty-white leading-relaxed mb-8 max-w-4xl mx-auto italic"
            >
              "{testimonials[activeTestimonial].quote}"
            </motion.blockquote>
            
            <motion.div
              key={`author-${activeTestimonial}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <h4 className="text-2xl font-orbitron font-bold text-electric-cyan mb-2">
                {testimonials[activeTestimonial].name}
              </h4>
              <p className="text-lg text-bio-green font-semibold mb-1">
                {testimonials[activeTestimonial].title}
              </p>
              <p className="text-lg text-tiger-orange mb-2">
                {testimonials[activeTestimonial].organization}
              </p>
              <p className="text-sm text-misty-white/60">
                {testimonials[activeTestimonial].credentials}
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* Testimonial Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex justify-center space-x-4 mb-16"
        >
          {testimonials.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => setActiveTestimonial(index)}
              className={`w-4 h-4 rounded-full transition-all duration-300 ${
                index === activeTestimonial 
                  ? 'bg-electric-cyan scale-125' 
                  : 'bg-misty-white/30 hover:bg-misty-white/50'
              }`}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            />
          ))}
        </motion.div>

        {/* Research Impact Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <h3 className="text-3xl font-orbitron font-bold text-neural-purple mb-8 text-center">
            Research Impact & Collaboration
          </h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {researchMetrics.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
                className="glassmorphism p-6 rounded-xl text-center"
              >
                <div className="text-4xl font-orbitron font-bold text-bio-green mb-2">
                  {item.metric}
                </div>
                <div className="text-lg text-electric-cyan font-semibold mb-1">
                  {item.label}
                </div>
                <div className="text-sm text-misty-white/60">
                  {item.description}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Ethical AI Principles */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 1.4 }}
          className="mt-16 holographic p-8 rounded-2xl"
        >
          <h3 className="text-3xl font-orbitron font-bold text-tiger-orange mb-6 text-center">
            Our Ethical AI Principles
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-4xl mb-4">🛡️</div>
              <h4 className="text-xl font-semibold text-electric-cyan mb-2">Privacy First</h4>
              <p className="text-sm text-misty-white/80">
                All data is anonymized and used solely for conservation purposes
              </p>
            </div>
            
            <div className="text-center">
              <div className="text-4xl mb-4">🌱</div>
              <h4 className="text-xl font-semibold text-bio-green mb-2">Open Science</h4>
              <p className="text-sm text-misty-white/80">
                Research data shared with global conservation community
              </p>
            </div>
            
            <div className="text-center">
              <div className="text-4xl mb-4">⚖️</div>
              <h4 className="text-xl font-semibold text-neural-purple mb-2">Transparent AI</h4>
              <p className="text-sm text-misty-white/80">
                All algorithms and decisions are auditable and explainable
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ExpertTestimonials;
