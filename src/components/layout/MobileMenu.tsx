import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  // Lock body scroll when the menu is open to prevent Lenis/native scroll conflicts
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const links = [
    { name: 'Home', path: '/' },
    { name: 'Rooms', path: '/rooms' },
    { name: 'Amenities', path: '#' },
    { name: 'About', path: '#' },
    { name: 'Contact', path: '#' },
  ];

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, transition: { duration: 0.3 } }
  };

  const staggerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          variants={prefersReducedMotion ? undefined : overlayVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="fixed inset-0 z-[60] bg-sand flex flex-col"
          data-lenis-prevent
        >
          {/* Header */}
          <div className="px-6 py-4 flex items-center justify-between border-b border-charcoal/10">
            <span className="font-heading text-3xl tracking-wide text-teal">
              Dar Safaa
            </span>
            <button 
              onClick={onClose}
              className="p-2 -mr-2 text-charcoal hover:text-terracotta transition-colors"
            >
              <X className="w-8 h-8" />
            </button>
          </div>

          {/* Links */}
          <motion.div 
            variants={prefersReducedMotion ? undefined : staggerVariants}
            initial="hidden"
            animate="visible"
            className="flex-grow flex flex-col justify-center items-center space-y-8 px-6"
          >
            {links.map((link) => (
              <motion.div key={link.name} variants={prefersReducedMotion ? undefined : itemVariants}>
                <Link 
                  to={link.path} 
                  onClick={onClose}
                  className="font-heading text-5xl text-charcoal hover:text-terracotta transition-colors"
                >
                  {link.name}
                </Link>
              </motion.div>
            ))}
            
            {/* Language Switcher */}
            <motion.div variants={prefersReducedMotion ? undefined : itemVariants} className="pt-8 mt-8 border-t border-charcoal/10 flex space-x-6 text-charcoal/60 font-body uppercase tracking-widest text-sm">
              <span className="text-terracotta font-bold">EN</span>
              <a href="#" className="hover:text-terracotta transition-colors">FR</a>
              <a href="#" className="hover:text-terracotta transition-colors">AR</a>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
