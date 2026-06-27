import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-charcoal text-sand py-16">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="col-span-1 md:col-span-1">
          <h2 className="font-heading text-3xl mb-4 text-teal-light">Dar Safaa</h2>
          <p className="font-body text-sm opacity-80 leading-relaxed mb-6">
            A sanctuary of purity and serenity in the heart of the Medina. Experience the authentic warmth of Moroccan hospitality.
          </p>
        </div>
        
        <div>
          <h3 className="font-heading text-xl mb-4 text-terracotta-light">Navigation</h3>
          <ul className="space-y-2 text-sm opacity-80 font-body">
            <li><Link to="/" className="hover:text-terracotta transition-colors">Home</Link></li>
            <li><Link to="/rooms" className="hover:text-terracotta transition-colors">Our Rooms</Link></li>
            <li><a href="#" className="hover:text-terracotta transition-colors">Amenities</a></li>
            <li><a href="#" className="hover:text-terracotta transition-colors">About Us</a></li>
            <li><a href="#" className="hover:text-terracotta transition-colors">Contact</a></li>
          </ul>
        </div>
        
        <div>
          <h3 className="font-heading text-xl mb-4 text-terracotta-light">Contact</h3>
          <ul className="space-y-2 text-sm opacity-80 font-body">
            <li>123 Derb Lalla, Medina</li>
            <li>Marrakech, Morocco</li>
            <li className="pt-2">info@darsafaa.com</li>
            <li>+212 524 123 456</li>
          </ul>
        </div>

        <div>
          <h3 className="font-heading text-xl mb-4 text-terracotta-light">Follow Us</h3>
          <div className="flex space-x-4 opacity-80">
            <a href="#" className="hover:text-terracotta transition-colors">Instagram</a>
            <a href="#" className="hover:text-terracotta transition-colors">Facebook</a>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-sand/20 text-center text-xs opacity-60">
        &copy; {new Date().getFullYear()} Dar Safaa. All rights reserved.
      </div>
    </footer>
  );
}
