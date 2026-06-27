import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import { ArrowDown } from 'lucide-react';
import { useTranslation } from 'react-i18next';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      gsap.to(bgRef.current, {
        y: '15%',
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={heroRef} className="relative min-h-[100vh] flex flex-col items-center justify-center text-center px-4 overflow-hidden">
      {/* Background layer for parallax */}
      <div 
         ref={bgRef}
         className="absolute inset-0 w-full h-[120%] -top-[10%]"
         style={{
           background: 'linear-gradient(135deg, #18332F 0%, #7A3326 50%, #222525 100%)'
         }} 
      />
      {/* Decorative subtle overlay */}
      <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-terracotta to-transparent pointer-events-none" />
      
      {/* Dark overlay specifically for Nav/Hero text legibility */}
      <div className="absolute inset-0 bg-gradient-to-b from-charcoal/80 via-charcoal/40 to-charcoal/10 pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-4xl mx-auto flex flex-col items-center">
        <h1 className="font-heading text-5xl md:text-7xl text-sand mb-6 tracking-wide drop-shadow-md">
          {t('hero.title')}
        </h1>
        <p className="font-body text-lg md:text-xl text-sand/90 max-w-2xl mx-auto mb-10 drop-shadow">
          {t('hero.subtitle')}
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            to="/rooms" 
            className="px-8 py-4 bg-terracotta text-white font-body uppercase tracking-widest text-sm hover:bg-terracotta-dark transition-colors"
          >
            {t('hero.explore')}
          </Link>
          <button className="px-8 py-4 bg-transparent border border-sand text-sand font-body uppercase tracking-widest text-sm hover:bg-sand hover:text-charcoal transition-colors">
            {t('hero.book')}
          </button>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-charcoal/50">
        <ArrowDown className="w-6 h-6" />
      </div>
    </div>
  );
}
