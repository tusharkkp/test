
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Home', href: '#hero' },
    { label: 'Problem', href: '#problem' },
    { label: 'Solution', href: '#solution' },
    { label: 'Technology', href: '#technology' },
    { label: 'Community', href: '#community' },
    { label: 'Impact', href: '#impact' },
    { label: 'Roadmap', href: '#roadmap' },
    { label: 'Team', href: '#team' },
    { label: 'Contact', href: '#contact' }
  ];

  return (
    <motion.nav
      id="navigation"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'glassmorphism py-2' : 'bg-transparent py-4'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <motion.div
          className="flex items-center space-x-3"
          whileHover={{ scale: 1.05 }}
        >
          <div className="w-10 h-10 bg-gradient-to-r from-electric-cyan to-bio-green rounded-lg flex items-center justify-center">
            <span className="text-forest-navy font-orbitron font-bold text-lg">V</span>
          </div>
          <h1 className="text-xl font-orbitron font-bold text-electric-cyan text-glow">
            VanRakshak AI
          </h1>
        </motion.div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-8">
          {navItems.map((item, index) => (
            <motion.a
              key={item.label}
              href={item.href}
              className="text-misty-white hover:text-electric-cyan transition-colors duration-300 font-medium relative group focus:outline-none focus:ring-2 focus:ring-electric-cyan rounded"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.1 }}
              aria-label={`Navigate to ${item.label} section`}
            >
              {item.label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-electric-cyan group-hover:w-full transition-all duration-300"></span>
            </motion.a>
          ))}
        </div>

        {/* Demo Button & Mobile Menu */}
        <div className="flex items-center space-x-4">
          <motion.button
            className="holographic px-6 py-2 rounded-lg font-semibold text-electric-cyan hover:text-forest-navy hover:bg-electric-cyan transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-electric-cyan"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Experience AI Demo"
          >
            Demo
          </motion.button>
          
          {/* Mobile Menu Button */}
          <button
            className="md:hidden glassmorphism p-2 rounded-lg text-electric-cyan focus:outline-none focus:ring-2 focus:ring-electric-cyan"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile menu"
            aria-expanded={isMobileMenuOpen}
          >
            <div className="w-6 h-6 flex flex-col justify-center space-y-1">
              <span className={`block w-full h-0.5 bg-electric-cyan transition-transform ${isMobileMenuOpen ? 'rotate-45 translate-y-1' : ''}`}></span>
              <span className={`block w-full h-0.5 bg-electric-cyan transition-opacity ${isMobileMenuOpen ? 'opacity-0' : ''}`}></span>
              <span className={`block w-full h-0.5 bg-electric-cyan transition-transform ${isMobileMenuOpen ? '-rotate-45 -translate-y-1' : ''}`}></span>
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div
          className="md:hidden glassmorphism mt-2 mx-6 rounded-lg"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
        >
          <div className="py-4 space-y-2">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="block px-4 py-2 text-misty-white hover:text-electric-cyan hover:bg-electric-cyan/10 transition-colors duration-300 rounded focus:outline-none focus:ring-2 focus:ring-electric-cyan"
                onClick={() => setIsMobileMenuOpen(false)}
                aria-label={`Navigate to ${item.label} section`}
              >
                {item.label}
              </a>
            ))}
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navigation;
