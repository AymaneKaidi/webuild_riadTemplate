import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-charcoal text-sand py-16">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="col-span-1 md:col-span-1">
          <Link to="/" className="font-heading text-3xl tracking-wide text-teal-light mb-6 block text-start">
            Dar Safaa
          </Link>
          <p className="font-body text-sand/70 text-sm leading-relaxed text-start">
            {t('footer.description')}
          </p>
        </div>
        
        <div>
          <h4 className="font-body text-xs uppercase tracking-widest text-teal-light mb-6 text-start">{t('nav.rooms')}</h4>
          <ul className="space-y-4 font-body text-sm text-sand/70 text-start">
            <li><Link to="/rooms" className="hover:text-terracotta transition-colors">{t('rooms.categories.Suite')}</Link></li>
            <li><Link to="/rooms" className="hover:text-terracotta transition-colors">{t('rooms.categories.Royal')}</Link></li>
            <li><Link to="/rooms" className="hover:text-terracotta transition-colors">{t('rooms.categories.Standard')}</Link></li>
          </ul>
        </div>
        
        <div>
          <h4 className="font-body text-xs uppercase tracking-widest text-teal-light mb-6 text-start">{t('nav.about')}</h4>
          <ul className="space-y-4 font-body text-sm text-sand/70 text-start">
            <li><Link to="/about" className="hover:text-terracotta transition-colors">{t('nav.about')}</Link></li>
            <li><Link to="/amenities" className="hover:text-terracotta transition-colors">{t('nav.amenities')}</Link></li>
            <li><Link to="/contact" className="hover:text-terracotta transition-colors">{t('nav.contact')}</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-heading text-xl mb-4 text-terracotta-light">{t('footer.contact')}</h3>
          <ul className="space-y-2 text-sm opacity-80 font-body">
            <li>123 Derb Lalla, Medina</li>
            <li>Marrakech, Morocco</li>
            <li className="pt-2">info@darsafaa.com</li>
            <li>+212 524 123 456</li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-sand/20 text-center text-xs opacity-60">
        {t('footer.rights', { year: new Date().getFullYear() })}
      </div>
    </footer>
  );
}
