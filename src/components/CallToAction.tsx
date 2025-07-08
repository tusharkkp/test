
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useToast } from '@/hooks/use-toast';

interface FormData {
  name: string;
  email: string;
  organization: string;
  interest: string;
  message: string;
}

const CallToAction = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch
  } = useForm<FormData>({
    defaultValues: {
      name: '',
      email: '',
      organization: '',
      interest: 'partnership',
      message: ''
    }
  });

  const formValues = watch();

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    
    try {
      // Simulate form submission
      console.log('Form submitted:', data);
      
      // Simulate API call delay with visual feedback
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setSubmitted(true);
      toast({
        title: "Message Sent Successfully!",
        description: "Thank you for your interest. We'll get back to you within 24 hours.",
      });
      
      reset();
    } catch (error) {
      console.error('Form submission error:', error);
      toast({
        title: "Submission Failed",
        description: "There was an error sending your message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNewMessage = () => {
    setSubmitted(false);
    reset();
  };

  return (
    <section id="contact" ref={ref} className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-forest-navy via-forest-navy/95 to-forest-navy"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-orbitron font-bold text-transparent bg-clip-text bg-gradient-to-r from-tiger-orange to-electric-cyan mb-8">
            Join the Revolution
          </h2>
          
          <p className="text-xl md:text-2xl text-misty-white max-w-4xl mx-auto leading-relaxed mb-8">
            Partner with VanRakshak AI to transform wildlife conservation across India
          </p>
          
          <motion.div
            className="flex flex-wrap justify-center gap-4 text-lg"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <span className="text-bio-green">🤝 Partnership Opportunities</span>
            <span className="text-electric-cyan subtle-text-glow">💡 Innovation Collaboration</span>
            <span className="text-neural-purple">🌍 Global Impact</span>
          </motion.div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Left: Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="holographic p-6 md:p-8 rounded-2xl"
          >
            <h3 className="text-2xl md:text-3xl font-orbitron font-bold text-electric-cyan subtle-text-glow mb-8 text-center">
              Get in Touch
            </h3>
            
            {!submitted ? (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Name */}
                <div className="space-y-2">
                  <label htmlFor="name" className="block text-bio-green font-semibold text-sm md:text-base">
                    Full Name *
                  </label>
                  <input
                    {...register('name', { 
                      required: 'Full name is required',
                      minLength: { value: 2, message: 'Name must be at least 2 characters' }
                    })}
                    type="text"
                    id="name"
                    autoComplete="name"
                    className="w-full px-3 md:px-4 py-2 md:py-3 bg-forest-navy/50 border border-electric-cyan/30 rounded-lg text-misty-white placeholder:text-misty-white/50 focus:border-electric-cyan focus:outline-none focus:ring-2 focus:ring-electric-cyan/20 transition-all duration-300 text-sm md:text-base"
                    placeholder="Enter your full name"
                  />
                  {errors.name && (
                    <p className="text-red-400 text-xs md:text-sm">{errors.name.message}</p>
                  )}
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <label htmlFor="email" className="block text-bio-green font-semibold text-sm md:text-base">
                    Email Address *
                  </label>
                  <input
                    {...register('email', { 
                      required: 'Email is required',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Invalid email address'
                      }
                    })}
                    type="email"
                    id="email"
                    autoComplete="email"
                    className="w-full px-3 md:px-4 py-2 md:py-3 bg-forest-navy/50 border border-electric-cyan/30 rounded-lg text-misty-white placeholder:text-misty-white/50 focus:border-electric-cyan focus:outline-none focus:ring-2 focus:ring-electric-cyan/20 transition-all duration-300 text-sm md:text-base"
                    placeholder="your.email@organization.com"
                  />
                  {errors.email && (
                    <p className="text-red-400 text-xs md:text-sm">{errors.email.message}</p>
                  )}
                </div>

                {/* Organization */}
                <div className="space-y-2">
                  <label htmlFor="organization" className="block text-bio-green font-semibold text-sm md:text-base">
                    Organization
                  </label>
                  <input
                    {...register('organization')}
                    type="text"
                    id="organization"
                    autoComplete="organization"
                    className="w-full px-3 md:px-4 py-2 md:py-3 bg-forest-navy/50 border border-electric-cyan/30 rounded-lg text-misty-white placeholder:text-misty-white/50 focus:border-electric-cyan focus:outline-none focus:ring-2 focus:ring-electric-cyan/20 transition-all duration-300 text-sm md:text-base"
                    placeholder="Your organization name"
                  />
                </div>

                {/* Interest Type */}
                <div className="space-y-2">
                  <label htmlFor="interest" className="block text-bio-green font-semibold text-sm md:text-base">
                    Interest Type
                  </label>
                  <select
                    {...register('interest')}
                    id="interest"
                    className="w-full px-3 md:px-4 py-2 md:py-3 bg-forest-navy/50 border border-electric-cyan/30 rounded-lg text-misty-white focus:border-electric-cyan focus:outline-none focus:ring-2 focus:ring-electric-cyan/20 transition-all duration-300 text-sm md:text-base"
                  >
                    <option value="partnership">Strategic Partnership</option>
                    <option value="funding">Investment Opportunity</option>
                    <option value="technology">Technology Collaboration</option>
                    <option value="deployment">Deployment Support</option>
                    <option value="research">Research Collaboration</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                {/* Message */}
                <div className="space-y-2">
                  <label htmlFor="message" className="block text-bio-green font-semibold text-sm md:text-base">
                    Message
                  </label>
                  <textarea
                    {...register('message')}
                    id="message"
                    rows={4}
                    className="w-full px-3 md:px-4 py-2 md:py-3 bg-forest-navy/50 border border-electric-cyan/30 rounded-lg text-misty-white placeholder:text-misty-white/50 focus:border-electric-cyan focus:outline-none focus:ring-2 focus:ring-electric-cyan/20 transition-all duration-300 resize-none text-sm md:text-base"
                    placeholder="Tell us about your interest in VanRakshak AI..."
                  />
                </div>

                {/* Real-time form status */}
                <div className="text-xs text-misty-white/60">
                  Form status: {formValues.name && formValues.email ? 'Ready to submit' : 'Please fill required fields'}
                </div>

                {/* Submit Button with Cool Animation */}
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className={`relative w-full py-3 md:py-4 rounded-xl font-orbitron font-bold text-sm md:text-lg transition-all duration-300 overflow-hidden ${
                    isSubmitting
                      ? 'bg-neural-purple/50 text-misty-white/50 cursor-not-allowed'
                      : 'cyber-border holographic text-electric-cyan hover:text-forest-navy hover:bg-electric-cyan'
                  }`}
                  whileHover={!isSubmitting ? { scale: 1.02 } : {}}
                  whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                >
                  {/* Cool submit animation background */}
                  {isSubmitting && (
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-electric-cyan/20 via-bio-green/20 to-neural-purple/20"
                      animate={{ x: [-300, 300] }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    />
                  )}
                  
                  {isSubmitting ? (
                    <div className="flex items-center justify-center space-x-2 relative z-10">
                      <motion.div 
                        className="w-4 h-4 md:w-5 md:h-5 border-2 border-electric-cyan border-t-transparent rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      />
                      <motion.span
                        animate={{ opacity: [1, 0.5, 1] }}
                        transition={{ duration: 1, repeat: Infinity }}
                      >
                        Sending Message...
                      </motion.span>
                    </div>
                  ) : (
                    <span className="relative z-10">Send Message</span>
                  )}
                </motion.button>
              </form>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-8 md:py-12"
              >
                <motion.div 
                  className="text-4xl md:text-6xl text-bio-green mb-4 md:mb-6"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 0.5 }}
                >
                  ✅
                </motion.div>
                <h4 className="text-xl md:text-2xl font-orbitron font-bold text-electric-cyan subtle-text-glow mb-3 md:mb-4">
                  Message Sent Successfully!
                </h4>
                <p className="text-base md:text-lg text-misty-white mb-4 md:mb-6">
                  Thank you for your interest in VanRakshak AI. Our team will get back to you within 24 hours.
                </p>
                <motion.button
                  onClick={handleNewMessage}
                  className="glassmorphism px-4 md:px-6 py-2 md:py-3 rounded-lg text-electric-cyan subtle-text-glow hover:text-bio-green transition-colors duration-300 text-sm md:text-base"
                  whileHover={{ scale: 1.05 }}
                >
                  Send Another Message
                </motion.button>
              </motion.div>
            )}
          </motion.div>

          {/* Right: Contact Information & Social */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="space-y-8"
          >
            {/* Contact Details */}
            <div className="glassmorphism p-6 md:p-8 rounded-2xl">
              <h3 className="text-xl md:text-2xl font-orbitron font-bold text-neural-purple mb-4 md:mb-6">
                Contact Information
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-3 md:space-x-4">
                  <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-r from-electric-cyan to-bio-green rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    📧
                  </div>
                  <div className="min-w-0">
                    <div className="text-bio-green font-semibold text-sm md:text-base">Email</div>
                    <div className="text-misty-white text-sm md:text-base break-all">decluttersvanrakshakai@gmail.com</div>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 md:space-x-4">
                  <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-r from-neural-purple to-tiger-orange rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    📱
                  </div>
                  <div>
                    <div className="text-bio-green font-semibold text-sm md:text-base">Phone</div>
                    <div className="text-misty-white text-sm md:text-base">+91 9876 543 210</div>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 md:space-x-4">
                  <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-r from-tiger-orange to-electric-cyan rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    📍
                  </div>
                  <div>
                    <div className="text-bio-green font-semibold text-sm md:text-base">Address</div>
                    <div className="text-misty-white text-sm md:text-base">
                      MIT Academy of Engineering<br />
                      Alandi, Pune, Maharashtra
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Media & Links */}
            <div className="glassmorphism p-6 md:p-8 rounded-2xl">
              <h3 className="text-xl md:text-2xl font-orbitron font-bold text-electric-cyan subtle-text-glow mb-4 md:mb-6">
                Connect With Us
              </h3>
              
              <div className="grid grid-cols-2 gap-3 md:gap-4">
                {[
                  { name: 'LinkedIn', icon: '💼', color: 'from-blue-500 to-blue-600' },
                  { name: 'Twitter', icon: '🐦', color: 'from-sky-400 to-sky-500' },
                  { name: 'GitHub', icon: '🐙', color: 'from-gray-600 to-gray-700' },
                  { name: 'Research', icon: '🔬', color: 'from-green-500 to-green-600' }
                ].map((social, index) => (
                  <motion.a
                    key={index}
                    href="#"
                    className={`flex items-center space-x-2 md:space-x-3 p-3 md:p-4 bg-gradient-to-r ${social.color} rounded-lg text-white font-semibold hover:scale-105 transition-transform duration-300`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="text-lg md:text-2xl">{social.icon}</span>
                    <span className="text-xs md:text-base">{social.name}</span>
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Call to Action Stats */}
            <div className="glassmorphism p-6 md:p-8 rounded-2xl">
              <h3 className="text-xl md:text-2xl font-orbitron font-bold text-tiger-orange mb-4 md:mb-6">
                Why Partner With Us?
              </h3>
              
              <div className="space-y-3 md:space-y-4">
                {[
                  { stat: '95%+', label: 'AI Accuracy Rate', desc: 'Industry-leading precision' },
                  { stat: '24/7', label: 'Monitoring', desc: 'Continuous protection' },
                  { stat: '50+', label: 'Sanctuaries', desc: 'Planned coverage' },
                  { stat: '₹13.5cr', label: 'Total Investment', desc: '4-year program' }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center justify-between p-2 md:p-3 bg-forest-navy/30 rounded-lg"
                    whileHover={{ scale: 1.02 }}
                  >
                    <div>
                      <div className="text-base md:text-lg font-orbitron font-bold text-electric-cyan subtle-text-glow">
                        {item.stat}
                      </div>
                      <div className="text-xs md:text-sm text-misty-white/60">{item.desc}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-bio-green font-semibold text-sm md:text-base">{item.label}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 1 }}
          className="text-center mt-12 md:mt-16 pt-6 md:pt-8 border-t border-electric-cyan/20"
        >
          <p className="text-misty-white/60 mb-3 md:mb-4 text-sm md:text-base">
            © 2024 VanRakshak AI. All rights reserved. Built for ENVIROSITY'25 Hackathon.
          </p>
          <div className="flex justify-center space-x-4 md:space-x-8 text-xs md:text-sm text-misty-white/40">
            <a href="#" className="hover:text-electric-cyan transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-electric-cyan transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-electric-cyan transition-colors">Cookie Policy</a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CallToAction;
