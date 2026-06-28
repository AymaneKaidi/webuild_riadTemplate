import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useTranslation } from 'react-i18next';

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      // Small delay to not overwhelm on immediate load
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem('cookieConsent', 'declined');
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="fixed bottom-4 left-4 right-4 md:bottom-8 md:left-8 md:max-w-md z-50 bg-white border border-charcoal/10 shadow-xl rounded p-6 font-body text-charcoal flex flex-col gap-4"
        >
          <div className="flex flex-col gap-2">
            <h3 className="font-heading text-xl text-teal">{t('cookie_banner.title', 'Cookie Preferences')}</h3>
            <p className="text-sm text-charcoal/70 leading-relaxed">
              {t('cookie_banner.description', 'We use cookies to improve your browsing experience, personalize content, and analyze our traffic.')}
            </p>
          </div>
          <div className="flex flex-row gap-3 pt-2">
            <button 
              onClick={handleAccept}
              className="flex-1 py-2.5 bg-terracotta text-white text-xs uppercase tracking-widest hover:bg-terracotta-dark transition-colors text-center"
            >
              {t('cookie_banner.accept', 'Accept')}
            </button>
            <button 
              onClick={handleDecline}
              className="flex-1 py-2.5 bg-white border border-charcoal/20 text-charcoal text-xs uppercase tracking-widest hover:border-charcoal hover:bg-sand transition-colors text-center"
            >
              {t('cookie_banner.decline', 'Decline')}
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
