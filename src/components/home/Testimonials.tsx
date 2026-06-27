import { Star } from 'lucide-react';
import { useRef, useEffect } from 'react';
import testimonials from '../../data/testimonials.json';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTranslation } from 'react-i18next';

gsap.registerPlugin(ScrollTrigger);

export default function Testimonials() {
  const displayedTestimonials = testimonials.slice(0, 3);
  const gridRef = useRef<HTMLDivElement>(null);
  const { t, i18n } = useTranslation();
  const currentLang = (i18n.language || 'en') as 'en' | 'fr' | 'ar';

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      if (!gridRef.current) return;
      
      gsap.from(gridRef.current.children, {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: gridRef.current,
          start: 'top 85%',
          once: true,
        },
      });
    }, gridRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="py-24 bg-charcoal text-sand overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="font-heading text-4xl text-teal-light mb-16">{t('testimonials.title')}</h2>
        
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {displayedTestimonials.map((tst, idx) => (
            <div key={idx} className="flex flex-col items-center">
              <div className="flex space-x-1 text-terracotta mb-6">
                {[...Array(tst.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-current" />
                ))}
              </div>
              <p className="font-body italic text-lg leading-relaxed mb-6 opacity-90 flex-grow">
                "{(tst.quote as unknown as Record<string, string>)[currentLang] || (tst.quote as unknown as Record<string, string>).en}"
              </p>
              <span className="font-heading text-xl text-teal-light">{tst.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
