import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, CheckCircle2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useScrollLock } from '../../hooks/useScrollLock';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  room: {
    name: string;
    price: number;
    currency: string;
    capacity: number;
    images?: string[];
  };
}

export default function BookingModal({ isOpen, onClose, room }: BookingModalProps) {
  useScrollLock(isOpen);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { t } = useTranslation();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    checkIn: '',
    checkOut: '',
    guests: 1,
    message: ''
  });

  // Reset state when modal closes
  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setIsSuccess(false);
        setErrors({});
        setFormData({
          name: '',
          email: '',
          phone: '',
          checkIn: '',
          checkOut: '',
          guests: 1,
          message: ''
        });
      }, 300); // wait for animation
    }
  }, [isOpen]);

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
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-charcoal/60 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-2xl bg-white rounded shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
          >
            <div className="flex items-center justify-between p-6 border-b border-charcoal/10 bg-white sticky top-0 z-10">
              <h2 className="font-heading text-2xl text-teal">{t('booking.title')}</h2>
              <button 
                onClick={onClose}
                className="p-2 -me-2 text-charcoal/40 hover:text-terracotta transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {isSuccess ? (
              <div className="p-12 flex flex-col items-center justify-center text-center h-full">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", bounce: 0.5 }}
                >
                  <CheckCircle2 className="w-20 h-20 text-teal mb-6" />
                </motion.div>
                <h3 className="font-heading text-3xl text-teal mb-4">{t('booking.success', { name: formData.name, room: room.name })}</h3>
                <button 
                  onClick={onClose}
                  className="mt-8 px-8 py-3 bg-terracotta text-white font-body text-sm uppercase tracking-widest hover:bg-terracotta-dark transition-colors"
                >
                  {t('booking.close')}
                </button>
              </div>
            ) : (
              <>
                <div className="bg-sand p-6 flex items-center space-x-4 border-b border-charcoal/10 shrink-0">
                  <div className="w-20 h-20 bg-charcoal/10 rounded flex items-center justify-center text-[10px] uppercase font-body text-charcoal/40 shrink-0 overflow-hidden">
                    {room.images && room.images[0] && room.images[0] !== '/placeholder.jpg' ? (
                      <img src={room.images[0]} alt={room.name} className="w-full h-full object-cover" />
                    ) : (
                      t('common.image')
                    )}
                  </div>
                  <div>
                    <h2 className="font-heading text-2xl text-teal">{room.name}</h2>
                    <p className="font-body text-charcoal/70">{room.price} {room.currency} / night</p>
                  </div>
                </div>

                <div className="p-6 overflow-y-auto flex-grow">
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

                    <div className="grid grid-cols-2 gap-4">
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

                    <div className="grid grid-cols-2 gap-4">
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
                        rows={3}
                        value={formData.message}
                        onChange={handleInputChange}
                        className="w-full bg-white border border-charcoal/20 px-4 py-3 font-body text-charcoal focus:outline-none focus:border-teal transition-colors resize-none"
                      />
                    </div>
                  </div>

                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 bg-terracotta text-white font-body text-sm uppercase tracking-widest hover:bg-terracotta-dark transition-colors disabled:bg-charcoal/20 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? '...' : t('booking.submit')}
                  </button>
                  </form>
                </div>
              </>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
