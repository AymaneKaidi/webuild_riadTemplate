import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, MapPin, Phone, Mail } from 'lucide-react';
import faqData from '../data/faq.json';

export default function ContactPage() {
  const { t, i18n } = useTranslation();
  const currentLang = (i18n.language || 'en') as 'en' | 'fr' | 'ar';
  
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSuccess, setIsSuccess] = useState(false);
  
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = t('contact_page.form.error');
    if (!formData.email.trim()) newErrors.email = t('contact_page.form.error');
    if (!formData.message.trim()) newErrors.message = t('contact_page.form.error');

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    console.log("Contact Form Submitted payload:", formData);
    setIsSuccess(true);
    setFormData({ name: '', email: '', message: '' });
    setErrors({});
  };

  return (
    <div className="min-h-screen bg-sand text-charcoal pt-24 pb-24">
      <div className="max-w-7xl mx-auto px-6 py-12 text-center">
        <h1 className="font-heading text-5xl md:text-6xl text-teal mb-6">{t('contact_page.title')}</h1>
        <p className="font-body text-lg italic text-terracotta-dark mb-16">
          {t('contact_page.subtitle')}
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 text-start">
          
          {/* Form Section */}
          <div className="bg-white p-8 md:p-12 rounded-sm shadow-sm">
            <AnimatePresence mode="wait">
              {isSuccess ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-teal/5 border border-teal/20 text-teal p-8 text-center rounded-sm"
                >
                  <p className="font-body text-lg">{t('contact_page.form.success')}</p>
                  <button 
                    onClick={() => setIsSuccess(false)}
                    className="mt-6 text-terracotta underline font-body text-sm"
                  >
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="space-y-6"
                >
                  <div>
                    <label className="block text-xs font-body tracking-widest uppercase text-charcoal/60 mb-2">
                      {t('contact_page.form.name')}
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={e => { setFormData({...formData, name: e.target.value}); setErrors({...errors, name: ''}); }}
                      className={`w-full bg-sand/30 border ${errors.name ? 'border-terracotta' : 'border-charcoal/10'} px-4 py-3 font-body focus:outline-none focus:border-teal transition-colors`}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-body tracking-widest uppercase text-charcoal/60 mb-2">
                      {t('contact_page.form.email')}
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={e => { setFormData({...formData, email: e.target.value}); setErrors({...errors, email: ''}); }}
                      className={`w-full bg-sand/30 border ${errors.email ? 'border-terracotta' : 'border-charcoal/10'} px-4 py-3 font-body focus:outline-none focus:border-teal transition-colors`}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-body tracking-widest uppercase text-charcoal/60 mb-2">
                      {t('contact_page.form.message')}
                    </label>
                    <textarea
                      rows={5}
                      value={formData.message}
                      onChange={e => { setFormData({...formData, message: e.target.value}); setErrors({...errors, message: ''}); }}
                      className={`w-full bg-sand/30 border ${errors.message ? 'border-terracotta' : 'border-charcoal/10'} px-4 py-3 font-body focus:outline-none focus:border-teal transition-colors resize-none`}
                    ></textarea>
                  </div>
                  {Object.keys(errors).length > 0 && (
                    <p className="text-terracotta text-sm font-body">{t('contact_page.form.error')}</p>
                  )}
                  <button
                    type="submit"
                    className="w-full py-4 bg-terracotta text-white font-body uppercase tracking-widest text-sm hover:bg-terracotta-dark transition-colors"
                  >
                    {t('contact_page.form.submit')}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>

          {/* FAQ & Contact Info Section */}
          <div className="space-y-12">
            <div>
              <h2 className="font-heading text-3xl text-teal mb-8">{t('contact_page.find_us')}</h2>
              <ul className="space-y-6 font-body text-charcoal/80">
                <li className="flex items-center gap-x-4">
                  <div className="w-10 h-10 bg-charcoal/5 rounded-full flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-terracotta" />
                  </div>
                  <span>{t('contact_page.address')}</span>
                </li>
                <li className="flex items-center gap-x-4">
                  <div className="w-10 h-10 bg-charcoal/5 rounded-full flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5 text-terracotta" />
                  </div>
                  <span dir="ltr">{t('contact_page.phone')}</span>
                </li>
                <li className="flex items-center gap-x-4">
                  <div className="w-10 h-10 bg-charcoal/5 rounded-full flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5 text-terracotta" />
                  </div>
                  <span>{t('contact_page.email')}</span>
                </li>
              </ul>
            </div>

            <div>
              <h2 className="font-heading text-3xl text-teal mb-8">{t('contact_page.faq_title')}</h2>
              <div className="space-y-4">
                {faqData.map((faq, idx) => {
                  const q = (faq.question as unknown as Record<string, string>)[currentLang] || (faq.question as unknown as Record<string, string>).en;
                  const a = (faq.answer as unknown as Record<string, string>)[currentLang] || (faq.answer as unknown as Record<string, string>).en;
                  const isOpen = openFaqIndex === idx;

                  return (
                    <div key={idx} className="border border-charcoal/10 rounded-sm bg-white overflow-hidden">
                      <button
                        onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                        className="w-full flex items-center justify-between p-4 text-start hover:bg-sand/30 transition-colors"
                      >
                        <span className="font-heading text-lg text-teal">{q}</span>
                        <ChevronDown className={`w-5 h-5 text-terracotta transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                      </button>
                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0 }}
                            animate={{ height: 'auto' }}
                            exit={{ height: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="p-4 pt-0 text-charcoal/70 font-body text-sm leading-relaxed border-t border-charcoal/5">
                              {a}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
