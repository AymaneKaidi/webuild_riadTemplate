import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { CheckCircle2, ArrowLeft } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import roomsData from '../data/rooms.json';

export default function BookingPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const currentLang = (i18n.language || 'en') as 'en' | 'fr' | 'ar';
  
  const roomRaw = roomsData.find(r => r.slug === slug);
  const roomName = (roomRaw?.name as unknown as Record<string, string>)?.[currentLang] || (roomRaw?.name as unknown as Record<string, string>)?.en;
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    checkIn: '',
    checkOut: '',
    guests: 1,
    message: ''
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!roomRaw) {
    return (
      <div className="min-h-screen bg-sand pt-32 px-6 text-center flex flex-col items-center justify-center">
        <h1 className="font-heading text-4xl text-charcoal mb-4">{t('rooms.not_found')}</h1>
        <button onClick={() => navigate('/rooms')} className="text-terracotta underline">{t('rooms.back')}</button>
      </div>
    );
  }

  const room = {
    name: roomName,
    price: roomRaw.price,
    currency: roomRaw.currency,
    capacity: roomRaw.guestCount,
    images: roomRaw.images
  };

  const validateField = (name: string, value: string | number) => {
    let error = '';
    if (name === 'name' && !String(value).trim()) error = t('booking.errors.nameReq');
    if (name === 'email') {
      if (!String(value).trim()) error = t('booking.errors.emailReq');
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value as string)) error = t('booking.errors.emailInvalid');
    }
    if (name === 'checkIn' && !value) error = t('booking.errors.checkInReq');
    if (name === 'checkOut') {
      if (!value) error = t('booking.errors.checkOutReq');
      else if (formData.checkIn && new Date(value) <= new Date(formData.checkIn)) {
        error = t('booking.errors.checkOutAfter');
      }
    }
    return error;
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: validateField(name, value) }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    Object.keys(formData).forEach(key => {
      if (key !== 'message' && key !== 'phone') {
        const error = validateField(key, formData[key as keyof typeof formData]);
        if (error) newErrors[key] = error;
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-sand text-charcoal pt-24 pb-24 px-6 flex items-center justify-center">
      <div className="w-full max-w-2xl">
        <Link 
          to={`/room/${slug}`}
          className="inline-flex items-center gap-x-2 text-charcoal/60 hover:text-terracotta transition-colors mb-8 font-body uppercase tracking-widest text-xs"
        >
          <ArrowLeft className="w-4 h-4 rtl:rotate-180" />
          {t('rooms.back')}
        </Link>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded shadow-sm overflow-hidden flex flex-col"
        >
          <div className="p-6 md:p-8 border-b border-charcoal/10 bg-white">
            <h2 className="font-heading text-2xl md:text-3xl text-teal">{t('booking.title')}</h2>
          </div>

          {isSuccess ? (
            <div className="p-12 flex flex-col items-center justify-center text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", bounce: 0.5 }}
              >
                <CheckCircle2 className="w-20 h-20 text-teal mb-6" />
              </motion.div>
              <h3 className="font-heading text-2xl md:text-3xl text-teal mb-4 leading-tight">{t('booking.success', { name: formData.name, room: room.name })}</h3>
              <Link 
                to="/rooms"
                className="mt-8 px-8 py-3 bg-terracotta text-white font-body text-sm uppercase tracking-widest hover:bg-terracotta-dark transition-colors"
              >
                {t('rooms.back')}
              </Link>
            </div>
          ) : (
            <>
              <div className="bg-sand/30 p-6 md:p-8 flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 border-b border-charcoal/10 text-center sm:text-start">
                <div className="w-24 h-24 md:w-32 md:h-32 bg-charcoal/10 rounded flex items-center justify-center text-[10px] uppercase font-body text-charcoal/40 shrink-0 overflow-hidden">
                  {room.images && room.images[0] && room.images[0] !== '/placeholder.jpg' ? (
                    <img src={room.images[0]} alt={room.name} className="w-full h-full object-cover" />
                  ) : (
                    t('common.image')
                  )}
                </div>
                <div className="flex flex-col justify-center h-full sm:pt-2">
                  <h2 className="font-heading text-2xl md:text-3xl text-teal mb-2 leading-tight">{room.name}</h2>
                  <p className="font-body text-charcoal/70 text-sm md:text-base">{room.price} {room.currency} / night</p>
                </div>
              </div>

              <div className="p-6 md:p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-charcoal/60 mb-2">{t('booking.labels.name')}</label>
                    <input 
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      className={`w-full bg-white border ${errors.name ? 'border-terracotta' : 'border-charcoal/20'} px-4 py-3 font-body text-charcoal focus:outline-none focus:border-teal transition-colors`}
                    />
                    {errors.name && <p className="text-terracotta text-xs mt-1">{errors.name}</p>}
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-widest text-charcoal/60 mb-2">{t('booking.labels.email')}</label>
                    <input 
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      className={`w-full bg-white border ${errors.email ? 'border-terracotta' : 'border-charcoal/20'} px-4 py-3 font-body text-charcoal focus:outline-none focus:border-teal transition-colors`}
                    />
                    {errors.email && <p className="text-terracotta text-xs mt-1">{errors.email}</p>}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs uppercase tracking-widest text-charcoal/60 mb-2">{t('booking.labels.checkIn')}</label>
                      <input 
                        type="date"
                        name="checkIn"
                        value={formData.checkIn}
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        min={new Date().toISOString().split('T')[0]}
                        className={`w-full bg-white border ${errors.checkIn ? 'border-terracotta' : 'border-charcoal/20'} px-4 py-3 font-body text-charcoal focus:outline-none focus:border-teal transition-colors`}
                      />
                      {errors.checkIn && <p className="text-terracotta text-xs mt-1">{errors.checkIn}</p>}
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-widest text-charcoal/60 mb-2">{t('booking.labels.checkOut')}</label>
                      <input 
                        type="date"
                        name="checkOut"
                        value={formData.checkOut}
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        min={formData.checkIn || new Date().toISOString().split('T')[0]}
                        className={`w-full bg-white border ${errors.checkOut ? 'border-terracotta' : 'border-charcoal/20'} px-4 py-3 font-body text-charcoal focus:outline-none focus:border-teal transition-colors`}
                      />
                      {errors.checkOut && <p className="text-terracotta text-xs mt-1">{errors.checkOut}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs uppercase tracking-widest text-charcoal/60 mb-2">{t('booking.labels.phone')}</label>
                      <input 
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full bg-white border border-charcoal/20 px-4 py-3 font-body text-charcoal focus:outline-none focus:border-teal transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-widest text-charcoal/60 mb-2">{t('booking.labels.guests')}</label>
                      <input 
                        type="number"
                        name="guests"
                        min="1"
                        max={room.capacity}
                        value={formData.guests}
                        onChange={handleInputChange}
                        className="w-full bg-white border border-charcoal/20 px-4 py-3 font-body text-charcoal focus:outline-none focus:border-teal transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-widest text-charcoal/60 mb-2">{t('booking.labels.message')}</label>
                    <textarea 
                      name="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleInputChange}
                      className="w-full bg-white border border-charcoal/20 px-4 py-3 font-body text-charcoal focus:outline-none focus:border-teal transition-colors resize-none"
                    />
                  </div>
                </div>

                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-terracotta text-white font-body text-sm uppercase tracking-widest hover:bg-terracotta-dark transition-colors disabled:bg-charcoal/20 disabled:cursor-not-allowed mt-4"
                >
                  {isSubmitting ? '...' : t('booking.submit')}
                </button>
                </form>
              </div>
            </>
          )}
        </motion.div>
      </div>
    </div>
  );
}
