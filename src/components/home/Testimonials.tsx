import { Star } from 'lucide-react';
import testimonials from '../../data/testimonials.json';

export default function Testimonials() {
  const displayedTestimonials = testimonials.slice(0, 3);

  return (
    <section className="py-24 bg-charcoal text-sand">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="font-heading text-4xl text-teal-light mb-16">Guest Experiences</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {displayedTestimonials.map((t, idx) => (
            <div key={idx} className="flex flex-col items-center">
              <div className="flex space-x-1 text-terracotta mb-6">
                {[...Array(t.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-current" />
                ))}
              </div>
              <p className="font-body italic text-lg leading-relaxed mb-6 opacity-90 flex-grow">
                "{t.quote}"
              </p>
              <span className="font-heading text-xl text-teal-light">{t.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
