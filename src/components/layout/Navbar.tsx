import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Heart, Globe, Menu } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useWishlist } from '../../context/WishlistContext';
import WishlistDrawer from './WishlistDrawer';
import MobileMenu from './MobileMenu';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';
  const { state } = useWishlist();
  const { t, i18n } = useTranslation();

  const cycleLanguage = () => {
    const langs = ['en', 'fr', 'ar'];
    const next = langs[(langs.indexOf(i18n.language) + 1) % langs.length];
    i18n.changeLanguage(next);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navBg = isHome && !isScrolled ? 'bg-transparent text-sand' : 'bg-sand text-charcoal shadow-sm';
  const logoColor = isHome && !isScrolled ? 'text-sand' : 'text-teal';

  return (
    <nav className={`fixed w-full z-50 transition-colors duration-300 ${navBg}`}>
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className={`font-heading text-3xl tracking-wide ${logoColor}`}>
          Dar Safaa
        </Link>

        <div className="hidden md:flex items-center gap-x-8 font-body text-sm uppercase tracking-widest">
          <Link to="/" className="hover:text-terracotta transition-colors">{t('nav.home')}</Link>
          <Link to="/rooms" className="hover:text-terracotta transition-colors">{t('nav.rooms')}</Link>
          <Link to="/amenities" className="hover:text-terracotta transition-colors">{t('nav.amenities')}</Link>
          <Link to="/about" className="hover:text-terracotta transition-colors">{t('nav.about')}</Link>
          <Link to="/contact" className="hover:text-terracotta transition-colors">{t('nav.contact')}</Link>
        </div>

        <div className="flex items-center gap-x-4">
          <div 
            onClick={cycleLanguage}
            className="hidden md:flex items-center gap-x-1 cursor-pointer hover:text-terracotta transition-colors"
          >
            <Globe className="w-5 h-5" />
            <span className="text-xs font-medium uppercase">{i18n.language}</span>
          </div>
          <button
            onClick={() => setIsDrawerOpen(true)}
            className="relative hover:text-terracotta transition-colors"
          >
            <Heart className="w-6 h-6" />
            {state.wishlistIds.length > 0 && (
              <span className="absolute -top-1 -end-1 bg-terracotta text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                {state.wishlistIds.length}
              </span>
            )}
          </button>

          <button 
            onClick={() => setIsMobileMenuOpen(true)}
            className="md:hidden ms-4 p-1 hover:text-terracotta transition-colors"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>

      <WishlistDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      />

      <MobileMenu 
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </nav>
  );
}
