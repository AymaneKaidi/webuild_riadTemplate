import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, Heart, Star, Users, BedDouble, 
  Sun, Droplets, Flame, Wind, Sofa, Eye, Bell, Trees
} from 'lucide-react';
import roomsData from '../data/rooms.json';
import RoomGrid from '../components/rooms/RoomGrid';
import { useWishlist } from '../context/WishlistContext';
import BookingModal from '../components/booking/BookingModal';

const amenityIconMap: Record<string, React.ReactNode> = {
  "King Bed": <BedDouble className="w-5 h-5" />,
  "Queen Bed": <BedDouble className="w-5 h-5" />,
  "1 King Bed": <BedDouble className="w-5 h-5" />,
  "2 Twin Beds": <BedDouble className="w-5 h-5" />,
  "Two King Beds": <BedDouble className="w-5 h-5" />,
  "Private Terrace": <Sun className="w-5 h-5" />,
  "Private Rooftop": <Sun className="w-5 h-5" />,
  "Private Patio": <Trees className="w-5 h-5" />,
  "Balcony": <Sun className="w-5 h-5" />,
  "Plunge Pool": <Droplets className="w-5 h-5" />,
  "Direct Pool Access": <Droplets className="w-5 h-5" />,
  "Rain Shower": <Droplets className="w-5 h-5" />,
  "Two Bathrooms": <Droplets className="w-5 h-5" />,
  "Fireplace": <Flame className="w-5 h-5" />,
  "Air Conditioning": <Wind className="w-5 h-5" />,
  "Sofa Bed": <Sofa className="w-5 h-5" />,
  "Living Area": <Sofa className="w-5 h-5" />,
  "Garden View": <Trees className="w-5 h-5" />,
  "Courtyard Access": <Trees className="w-5 h-5" />,
  "Medina View": <Eye className="w-5 h-5" />,
  "Panoramic Views": <Eye className="w-5 h-5" />,
  "Butler Service": <Bell className="w-5 h-5" />,
};

export default function RoomDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { state, toggleWishlist } = useWishlist();
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  // Scroll to top when slug changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  const room = roomsData.find(r => r.slug === slug);
  const isWishlisted = room ? state.wishlistIds.includes(room.id) : false;

  if (!room) {
    return (
      <div className="min-h-screen bg-sand pt-32 px-6 text-center">
        <h1 className="font-heading text-4xl text-charcoal mb-4">Room Not Found</h1>
        <button onClick={() => navigate('/rooms')} className="text-terracotta underline">Return to Rooms</button>
      </div>
    );
  }

  const relatedRooms = roomsData
    .filter(r => r.category === room.category && r.id !== room.id)
    .slice(0, 3); // Get up to 3

  return (
    <div className="min-h-screen bg-sand text-charcoal pt-24 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        {/* Back Button */}
        <Link to="/rooms" className="inline-flex items-center space-x-2 text-charcoal/60 hover:text-terracotta transition-colors mb-8 font-body text-sm uppercase tracking-widest">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Rooms</span>
        </Link>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          {/* Main Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            
            {/* Gallery Section */}
            <div className="lg:col-span-7">
              <div className="aspect-[4/3] bg-charcoal/5 rounded-sm relative overflow-hidden mb-4">
                <div className="absolute inset-0 flex items-center justify-center text-charcoal/20 font-body text-sm tracking-widest uppercase">
                  Main Image Preview
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                {[1, 2, 3].map(i => (
                  <div key={i} className="aspect-square bg-charcoal/5 rounded-sm relative overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center text-charcoal/20 font-body text-xs tracking-widest uppercase text-center p-2">
                      Gallery<br/>Image {i}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Details Section */}
            <div className="lg:col-span-5 flex flex-col">
              <div className="flex justify-between items-start mb-4">
                <h1 className="font-heading text-4xl md:text-5xl text-teal">{room.name}</h1>
                <button 
                  onClick={() => toggleWishlist(room.id)}
                  className="p-3 bg-white shadow-sm rounded-full hover:shadow-md transition-all shrink-0 ml-4"
                >
                  <Heart className={`w-6 h-6 transition-colors ${isWishlisted ? 'fill-terracotta text-terracotta' : 'text-charcoal'}`} />
                </button>
              </div>

              <div className="flex items-center space-x-6 text-sm font-body text-charcoal/70 mb-8 border-b border-charcoal/10 pb-6">
                <div className="flex items-center space-x-1">
                  <Users className="w-5 h-5 text-charcoal/50" />
                  <span>Up to {room.guestCount} Guests</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Star className="w-5 h-5 text-terracotta fill-terracotta" />
                  <span>{room.rating.toFixed(1)} Rating</span>
                </div>
              </div>

              <div className="mb-8">
                <div className="flex items-baseline mb-2">
                  <span className="font-body text-3xl font-medium text-charcoal">{room.price}</span>
                  <span className="font-body text-lg text-charcoal ml-2">{room.currency}</span>
                  <span className="font-body text-charcoal/60 ml-2">/ night</span>
                </div>
              </div>

              <div className="font-body text-charcoal/80 leading-relaxed space-y-4 mb-10">
                <p>{room.longDescription}</p>
                <p>Enjoy complimentary traditional Moroccan breakfast served daily on the rooftop or in your suite.</p>
              </div>

              <div className="mb-10">
                <h3 className="font-heading text-2xl text-teal mb-6">Room Amenities</h3>
                <div className="grid grid-cols-2 gap-y-4 gap-x-2 font-body text-sm text-charcoal/80">
                  {room.amenities.map((amenity, idx) => (
                    <div key={idx} className="flex items-center space-x-3">
                      <div className="text-terracotta-dark">
                        {amenityIconMap[amenity] || <Star className="w-5 h-5" />}
                      </div>
                      <span>{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button 
                onClick={() => setIsBookingOpen(true)}
                className="w-full py-4 bg-terracotta text-white font-body uppercase tracking-widest text-sm hover:bg-terracotta-dark transition-colors mt-auto"
              >
                Book Now
              </button>
            </div>
          </div>
        </motion.div>

        {/* You Might Also Like Section */}
        {relatedRooms.length > 0 && (
          <div className="mt-32 border-t border-charcoal/10 pt-16">
            <h2 className="font-heading text-3xl text-teal mb-10 text-center">You Might Also Like</h2>
            <RoomGrid rooms={relatedRooms} />
          </div>
        )}
      </div>

      {/* Booking Modal */}
      <BookingModal 
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        room={{ name: room.name, price: room.price, currency: room.currency }}
      />
    </div>
  );
}
