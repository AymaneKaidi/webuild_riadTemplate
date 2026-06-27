import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import { ArrowDown } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

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

      <div className="relative z-10 max-w-4xl mx-auto space-y-8 mt-16">
        <h1 className="font-heading text-6xl md:text-8xl text-sand tracking-wide leading-tight drop-shadow-sm">
          A Sanctuary of <br /> Elegance & Light
        </h1>
        
        <p className="font-body text-xl md:text-2xl text-terracotta-light italic max-w-2xl mx-auto drop-shadow-sm">
          Experience the authentic soul of Marrakech in a haven designed to soothe the senses.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-8">
          <Link to="/rooms" className="px-10 py-4 bg-terracotta text-white font-body uppercase tracking-widest text-sm hover:bg-terracotta-dark transition-colors w-full sm:w-auto">
            Book Your Stay
          </Link>
          <Link to="/rooms" className="px-10 py-4 border border-charcoal text-charcoal font-body uppercase tracking-widest text-sm hover:bg-charcoal hover:text-white transition-colors w-full sm:w-auto">
            Explore Rooms
          </Link>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-charcoal/50">
        <ArrowDown className="w-6 h-6" />
      </div>
    </div>
  );
}
