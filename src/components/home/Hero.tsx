import { Link } from 'react-router-dom';
import { ArrowDown } from 'lucide-react';

export default function Hero() {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center text-center px-4"
         style={{
           background: 'linear-gradient(135deg, rgba(244,240,234,1) 0%, rgba(210,195,179,1) 100%)'
         }}>
      {/* Decorative subtle overlay */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-terracotta to-transparent pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto space-y-8 mt-16">
        <h1 className="font-heading text-6xl md:text-8xl text-teal tracking-wide leading-tight">
          A Sanctuary of <br /> Elegance & Light
        </h1>
        
        <p className="font-body text-xl md:text-2xl text-terracotta-dark italic max-w-2xl mx-auto">
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
