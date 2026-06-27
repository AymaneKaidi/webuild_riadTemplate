import { Heart, Star, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useWishlist } from '../../context/WishlistContext';

interface Room {
  id: string;
  name: string;
  slug: string;
  category: string;
  price: number;
  currency: string;
  rating: number;
  guestCount: number;
  shortDescription: string;
}

export default function RoomCard({ room }: { room: Room }) {
  const { state, toggleWishlist } = useWishlist();
  const isWishlisted = state.wishlistIds.includes(room.id);

  const handleToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(room.id);
  };

  return (
    <motion.div whileHover={{ y: -5 }} className="h-full">
      <Link 
        to={`/room/${room.slug}`}
        className="group flex flex-col h-full bg-white overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 cursor-pointer"
      >
        {/* Image Placeholder */}
        <div className="relative aspect-[4/3] bg-charcoal/5 overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center text-charcoal/20 font-body text-sm tracking-widest uppercase">
            Image Preview
          </div>
          <button 
            onClick={handleToggle}
            className="absolute top-4 right-4 z-10 p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors"
          >
            <Heart className={`w-5 h-5 transition-colors ${isWishlisted ? 'fill-terracotta text-terracotta' : 'text-charcoal'}`} />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 md:p-6 flex flex-col flex-grow">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-heading text-xl md:text-2xl text-teal">{room.name}</h3>
          </div>
          
          <div className="flex items-center space-x-4 text-xs md:text-sm font-body text-charcoal/70 mb-4">
            <div className="flex items-center space-x-1">
              <Users className="w-4 h-4" />
              <span>{room.guestCount} Guests</span>
            </div>
            <div className="flex items-center space-x-1">
              <Star className="w-4 h-4 text-terracotta fill-terracotta" />
              <span>{room.rating.toFixed(1)}</span>
            </div>
          </div>

          <p className="font-body text-sm text-charcoal/80 mb-6 flex-grow line-clamp-2">
            {room.shortDescription}
          </p>

          <div className="flex items-center justify-between mt-auto pt-4 border-t border-sand">
            <div className="font-body">
              <span className="text-lg font-medium text-charcoal">{room.price} {room.currency}</span>
              <span className="text-xs text-charcoal/60 ml-1">/ night</span>
            </div>
            <div className="px-4 py-2 bg-terracotta text-white font-body text-xs uppercase tracking-widest hover:bg-terracotta-dark transition-colors">
              View Room
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
