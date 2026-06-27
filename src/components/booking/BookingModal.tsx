import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, CheckCircle2 } from 'lucide-react';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  room: {
    name: string;
    price: number;
    currency: string;
  };
}

export default function BookingModal({ isOpen, onClose, room }: BookingModalProps) {
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
    if (name === 'name' && !value) error = 'Name is required';
    if (name === 'email') {
      if (!value) error = 'Email is required';
      else if (!/\S+@\S+\.\S+/.test(value as string)) error = 'Invalid email format';
    }
    if (name === 'checkIn' && !value) error = 'Check-in date is required';
    if (name === 'checkOut') {
      if (!value) error = 'Check-out date is required';
      else if (formData.checkIn && new Date(value) <= new Date(formData.checkIn)) {
        error = 'Check-out must be after check-in';
      }
    }
    return error;
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Live validation if there's already an error
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: validateField(name, value) }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    // Validate all fields
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

    // Demo submission
    console.log('--- DEMO BOOKING PAYLOAD ---');
    console.log('Room:', room.name);
    console.log('Details:', formData);
    console.log('-----------------------------');

    setIsSuccess(true);
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
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 text-charcoal/60 hover:text-charcoal bg-white/50 rounded-full z-10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {isSuccess ? (
              <div className="p-12 flex flex-col items-center justify-center text-center h-full min-h-[400px]">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', bounce: 0.5 }}
                >
                  <CheckCircle2 className="w-20 h-20 text-teal mb-6" />
                </motion.div>
                <h2 className="font-heading text-3xl text-charcoal mb-4">Reservation Requested</h2>
                <p className="font-body text-charcoal/70 mb-8">
                  Thank you, {formData.name} — we'll confirm your stay for the <span className="font-semibold text-charcoal">{room.name}</span> shortly.
                </p>
                {/* Note: This is a demo-only success state with no backend connection */}
                <button
                  onClick={onClose}
                  className="px-8 py-3 bg-charcoal text-white font-body uppercase tracking-widest text-sm hover:bg-charcoal/90 transition-colors"
                >
                  Close
                </button>
              </div>
            ) : (
              <>
                <div className="bg-sand p-6 flex items-center space-x-4 border-b border-charcoal/10 shrink-0">
                  <div className="w-20 h-20 bg-charcoal/10 rounded flex items-center justify-center text-[10px] uppercase font-body text-charcoal/40 shrink-0">
                    Image
                  </div>
                  <div>
                    <h2 className="font-heading text-2xl text-teal">{room.name}</h2>
                    <p className="font-body text-charcoal/70">{room.price} {room.currency} / night</p>
                  </div>
                </div>

                <div className="p-6 overflow-y-auto flex-grow">
                  <form id="booking-form" onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block font-body text-sm text-charcoal mb-2">Full Name *</label>
                        <input
                          type="text" name="name"
                          value={formData.name} onChange={handleChange} onBlur={handleBlur}
                          className={`w-full p-3 bg-sand/30 border ${errors.name ? 'border-red-400' : 'border-charcoal/20'} focus:outline-none focus:border-terracotta transition-colors font-body`}
                        />
                        {errors.name && <p className="text-red-500 text-xs mt-1 font-body">{errors.name}</p>}
                      </div>

                      <div>
                        <label className="block font-body text-sm text-charcoal mb-2">Email Address *</label>
                        <input
                          type="email" name="email"
                          value={formData.email} onChange={handleChange} onBlur={handleBlur}
                          className={`w-full p-3 bg-sand/30 border ${errors.email ? 'border-red-400' : 'border-charcoal/20'} focus:outline-none focus:border-terracotta transition-colors font-body`}
                        />
                        {errors.email && <p className="text-red-500 text-xs mt-1 font-body">{errors.email}</p>}
                      </div>

                      <div>
                        <label className="block font-body text-sm text-charcoal mb-2">Check-in Date *</label>
                        <input
                          type="date" name="checkIn"
                          value={formData.checkIn} onChange={handleChange} onBlur={handleBlur}
                          className={`w-full p-3 bg-sand/30 border ${errors.checkIn ? 'border-red-400' : 'border-charcoal/20'} focus:outline-none focus:border-terracotta transition-colors font-body`}
                        />
                        {errors.checkIn && <p className="text-red-500 text-xs mt-1 font-body">{errors.checkIn}</p>}
                      </div>

                      <div>
                        <label className="block font-body text-sm text-charcoal mb-2">Check-out Date *</label>
                        <input
                          type="date" name="checkOut"
                          value={formData.checkOut} onChange={handleChange} onBlur={handleBlur}
                          className={`w-full p-3 bg-sand/30 border ${errors.checkOut ? 'border-red-400' : 'border-charcoal/20'} focus:outline-none focus:border-terracotta transition-colors font-body`}
                        />
                        {errors.checkOut && <p className="text-red-500 text-xs mt-1 font-body">{errors.checkOut}</p>}
                      </div>

                      <div>
                        <label className="block font-body text-sm text-charcoal mb-2">Phone (Optional)</label>
                        <input
                          type="tel" name="phone"
                          value={formData.phone} onChange={handleChange}
                          className="w-full p-3 bg-sand/30 border border-charcoal/20 focus:outline-none focus:border-terracotta transition-colors font-body"
                        />
                      </div>

                      <div>
                        <label className="block font-body text-sm text-charcoal mb-2">Guests *</label>
                        <input
                          type="number" name="guests" min="1"
                          value={formData.guests} onChange={handleChange}
                          className="w-full p-3 bg-sand/30 border border-charcoal/20 focus:outline-none focus:border-terracotta transition-colors font-body"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block font-body text-sm text-charcoal mb-2">Special Requests (Optional)</label>
                      <textarea
                        name="message" rows={3}
                        value={formData.message} onChange={handleChange}
                        className="w-full p-3 bg-sand/30 border border-charcoal/20 focus:outline-none focus:border-terracotta transition-colors font-body resize-none"
                      />
                    </div>
                  </form>
                </div>

                <div className="p-6 border-t border-charcoal/10 bg-sand/20 shrink-0">
                  <button
                    type="submit" form="booking-form"
                    className="w-full py-4 bg-terracotta text-white font-body uppercase tracking-widest text-sm hover:bg-terracotta-dark transition-colors"
                  >
                    Request Reservation
                  </button>
                </div>
              </>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
