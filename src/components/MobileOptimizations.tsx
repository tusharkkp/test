
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const MobileOptimizations = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [touchSupport, setTouchSupport] = useState(false);

  useEffect(() => {
    // Detect mobile device
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
      setTouchSupport('ontouchstart' in window);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    // Touch gesture handlers
    let startX = 0;
    let startY = 0;
    let startTime = 0;

    const handleTouchStart = (e: TouchEvent) => {
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
      startTime = Date.now();
    };

    const handleTouchEnd = (e: TouchEvent) => {
      const endX = e.changedTouches[0].clientX;
      const endY = e.changedTouches[0].clientY;
      const endTime = Date.now();
      
      const deltaX = endX - startX;
      const deltaY = endY - startY;
      const deltaTime = endTime - startTime;
      
      // Swipe detection
      if (Math.abs(deltaX) > 50 && deltaTime < 300) {
        if (deltaX > 0) {
          // Swipe right - previous section
          navigateSection('prev');
        } else {
          // Swipe left - next section
          navigateSection('next');
        }
      }
    };

    const navigateSection = (direction: 'prev' | 'next') => {
      const sections = ['hero', 'problem', 'solution', 'technology', 'impact', 'roadmap', 'team', 'contact'];
      const currentHash = window.location.hash.replace('#', '');
      const currentIndex = sections.indexOf(currentHash);
      
      let nextIndex;
      if (direction === 'next') {
        nextIndex = (currentIndex + 1) % sections.length;
      } else {
        nextIndex = currentIndex === 0 ? sections.length - 1 : currentIndex - 1;
      }
      
      window.location.hash = `#${sections[nextIndex]}`;
    };

    // Performance optimizations for mobile
    const optimizeForMobile = () => {
      if (isMobile) {
        // Reduce particle count on mobile
        const particles = document.querySelectorAll('.particle');
        particles.forEach((particle, index) => {
          if (index % 3 !== 0) {
            (particle as HTMLElement).style.display = 'none';
          }
        });

        // Simplify animations on mobile
        const animatedElements = document.querySelectorAll('[class*="animate-"]');
        animatedElements.forEach(element => {
          element.classList.add('mobile-optimized');
        });
      }
    };

    // Add mobile-specific styles
    const mobileStyles = document.createElement('style');
    mobileStyles.textContent = `
      @media (max-width: 768px) {
        .mobile-optimized {
          animation-duration: 0.3s !important;
        }
        
        .glassmorphism {
          backdrop-filter: blur(5px) !important;
        }
        
        .holographic {
          backdrop-filter: blur(10px) !important;
        }
        
        /* Touch-friendly tap targets */
        button, a, [role="button"] {
          min-height: 44px;
          min-width: 44px;
          touch-action: manipulation;
        }
        
        /* Improve scrolling performance */
        * {
          -webkit-overflow-scrolling: touch;
        }
        
        /* Reduce motion for better performance */
        .particle-container {
          display: none;
        }
        
        /* Mobile-friendly spacing */
        .container {
          padding-left: 1rem;
          padding-right: 1rem;
        }
        
        /* Optimize text rendering */
        body {
          text-rendering: optimizeSpeed;
          -webkit-font-smoothing: antialiased;
        }
      }
      
      @media (max-width: 480px) {
        /* Extra small screens */
        .text-6xl, .text-5xl {
          font-size: 2.5rem !important;
        }
        
        .text-4xl {
          font-size: 2rem !important;
        }
        
        .text-3xl {
          font-size: 1.5rem !important;
        }
      }
      
      /* Touch feedback */
      @media (hover: none) {
        .hover\\:scale-105:active {
          transform: scale(0.95);
        }
        
        button:active,
        [role="button"]:active {
          transform: scale(0.95);
          transition: transform 0.1s;
        }
      }
      
      /* Loading optimization */
      @media (max-width: 768px) {
        img, video {
          loading: lazy;
        }
      }
    `;
    
    document.head.appendChild(mobileStyles);

    // Add touch event listeners
    if (touchSupport) {
      document.addEventListener('touchstart', handleTouchStart, { passive: true });
      document.addEventListener('touchend', handleTouchEnd, { passive: true });
    }

    optimizeForMobile();

    return () => {
      window.removeEventListener('resize', checkMobile);
      if (touchSupport) {
        document.removeEventListener('touchstart', handleTouchStart);
        document.removeEventListener('touchend', handleTouchEnd);
      }
      document.head.removeChild(mobileStyles);
    };
  }, [isMobile]);

  // Mobile navigation indicator
  if (isMobile) {
    return (
      <motion.div
        className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 glassmorphism px-4 py-2 rounded-full"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 0.5 }}
      >
        <div className="flex items-center space-x-2 text-electric-cyan text-sm">
          <span>👈</span>
          <span>Swipe to navigate</span>
          <span>👉</span>
        </div>
      </motion.div>
    );
  }

  return null;
};

export default MobileOptimizations;
