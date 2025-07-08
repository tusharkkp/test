
import { useEffect } from 'react';

const AccessibilityEnhancements = () => {
  useEffect(() => {
    // Enhanced keyboard navigation
    const handleKeyboardNavigation = (e: KeyboardEvent) => {
      // Skip links for screen readers
      if (e.key === 'Tab' && e.shiftKey && e.ctrlKey) {
        const skipLink = document.getElementById('skip-to-main');
        if (skipLink) skipLink.focus();
      }
      
      // Enhanced focus management
      const focusableElements = document.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      
      focusableElements.forEach(element => {
        if (!element.getAttribute('aria-label') && !element.getAttribute('aria-labelledby')) {
          // Add aria-label for screen readers if missing
          const text = element.textContent?.trim();
          if (text && text.length > 0) {
            element.setAttribute('aria-label', text);
          }
        }
      });
    };

    // Voice command simulation (mockup)
    const handleVoiceCommands = (e: KeyboardEvent) => {
      if (e.altKey && e.shiftKey) {
        switch (e.code) {
          case 'KeyH':
            // Navigate to home
            window.location.hash = '#hero';
            announceToScreenReader('Navigating to home section');
            break;
          case 'KeyT':
            // Navigate to technology
            window.location.hash = '#technology';
            announceToScreenReader('Navigating to technology section');
            break;
          case 'KeyC':
            // Navigate to contact
            window.location.hash = '#contact';
            announceToScreenReader('Navigating to contact section');
            break;
        }
      }
    };

    // Announce to screen readers
    const announceToScreenReader = (message: string) => {
      const announcement = document.createElement('div');
      announcement.setAttribute('aria-live', 'polite');
      announcement.setAttribute('aria-atomic', 'true');
      announcement.setAttribute('class', 'sr-only');
      announcement.textContent = message;
      document.body.appendChild(announcement);
      
      setTimeout(() => {
        document.body.removeChild(announcement);
      }, 1000);
    };

    // Add event listeners
    document.addEventListener('keydown', handleKeyboardNavigation);
    document.addEventListener('keydown', handleVoiceCommands);

    // Enhanced focus indicators
    const style = document.createElement('style');
    style.textContent = `
      *:focus {
        outline: 3px solid #00D4FF !important;
        outline-offset: 2px !important;
        box-shadow: 0 0 0 5px rgba(0, 212, 255, 0.3) !important;
      }
      
      .sr-only {
        position: absolute !important;
        width: 1px !important;
        height: 1px !important;
        padding: 0 !important;
        margin: -1px !important;
        overflow: hidden !important;
        clip: rect(0, 0, 0, 0) !important;
        white-space: nowrap !important;
        border: 0 !important;
      }
      
      .skip-link {
        position: absolute;
        top: -40px;
        left: 6px;
        background: #00D4FF;
        color: #0B1426;
        padding: 8px;
        border-radius: 4px;
        text-decoration: none;
        font-weight: bold;
        z-index: 1000;
        transition: top 0.3s;
      }
      
      .skip-link:focus {
        top: 6px;
      }
      
      @media (prefers-reduced-motion: reduce) {
        *, *::before, *::after {
          animation-duration: 0.01ms !important;
          animation-iteration-count: 1 !important;
          transition-duration: 0.01ms !important;
        }
      }
      
      @media (prefers-color-scheme: dark) {
        .glassmorphism {
          background: rgba(11, 20, 38, 0.9) !important;
        }
      }
    `;
    document.head.appendChild(style);

    // High contrast mode support
    const mediaQuery = window.matchMedia('(prefers-contrast: high)');
    const handleHighContrast = (e: MediaQueryListEvent) => {
      if (e.matches) {
        document.body.classList.add('high-contrast');
      } else {
        document.body.classList.remove('high-contrast');
      }
    };
    mediaQuery.addEventListener('change', handleHighContrast);

    return () => {
      document.removeEventListener('keydown', handleKeyboardNavigation);
      document.removeEventListener('keydown', handleVoiceCommands);
      document.head.removeChild(style);
      mediaQuery.removeEventListener('change', handleHighContrast);
    };
  }, []);

  return (
    <>
      {/* Skip Links for Screen Readers */}
      <a href="#main-content" className="skip-link" id="skip-to-main">
        Skip to main content
      </a>
      <a href="#navigation" className="skip-link">
        Skip to navigation
      </a>
      
      {/* Screen Reader Instructions */}
      <div className="sr-only">
        <h1>VanRakshak AI - Wildlife Conservation Platform</h1>
        <p>
          This website uses artificial intelligence to protect India's wildlife. 
          Use Tab to navigate, Enter to activate buttons, and arrow keys to navigate through carousels.
          Press Alt+Shift+H for home, Alt+Shift+T for technology, Alt+Shift+C for contact.
        </p>
      </div>
      
      {/* Live Region for Announcements */}
      <div 
        id="live-region" 
        aria-live="polite" 
        aria-atomic="true" 
        className="sr-only"
      ></div>
    </>
  );
};

export default AccessibilityEnhancements;
