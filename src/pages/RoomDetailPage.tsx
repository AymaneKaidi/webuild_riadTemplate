import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import {
  ArrowLeft, Heart, Star, Users, BedDouble,
  Sun, Droplets, Flame, Wind, Sofa, Eye, Bell, Trees
} from 'lucide-react';
import roomsData from '../data/rooms.json';
import { useWishlist } from '../context/WishlistContext';
import { useTranslation } from 'react-i18next';
import BookingModal from '../components/booking/BookingModal';
import RoomCard from '../components/rooms/RoomCard';

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
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const { t, i18n } = useTranslation();
  const currentLang = (i18n.language || 'en') as 'en' | 'fr' | 'ar';
  
  const room = roomsData.find(r => r.slug === slug);
  const roomName = (room?.name as unknown as Record<string, string>)?.[currentLang] || (room?.name as unknown as Record<string, string>)?.en;
  const isWishlisted = room ? state.wishlistIds.includes(room.id) : false;

  if (!room) {
    return (
      <div className="min-h-screen bg-sand pt-32 px-6 text-center">
        <h1 className="font-heading text-4xl text-charcoal mb-4">{t('rooms.not_found')}</h1>
        <button onClick={() => navigate('/rooms')} className="text-terracotta underline">{t('rooms.back')}</button>
      </div>
    );
  }



  const similarRooms = roomsData
    .filter(r => r.category === room.category && r.id !== room.id)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-sand text-charcoal pt-24 pb-24">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Back Button */}
        <button 
          onClick={() => navigate('/rooms')}
          className="flex items-center gap-x-2 text-charcoal/60 hover:text-terracotta transition-colors mb-8 font-body uppercase tracking-widest text-xs"
        >
          <ArrowLeft className="w-4 h-4 rtl:rotate-180" />
          {t('rooms.back')}
        </button>

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
                  {t('common.main_image_preview')}
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                {[1, 2, 3].map(i => (
                  <div key={i} className="aspect-square bg-charcoal/5 rounded-sm relative overflow-hidden">
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-charcoal/20 font-body text-xs tracking-widest uppercase text-center p-2">
                      <span>{t('common.gallery_image')}</span>
                      <span>{i}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Details Section */}
            <div className="lg:col-span-5 flex flex-col">
              <div className="flex justify-between items-start mb-4">
                <h1 className="font-heading text-4xl md:text-5xl text-teal">{roomName}</h1>
                <button
                  onClick={() => toggleWishlist(room.id)}
                  className="p-3 bg-white shadow-sm rounded-full hover:shadow-md transition-all shrink-0 ml-4"
                >
                  <Heart className={`w-6 h-6 transition-colors ${isWishlisted ? 'fill-terracotta text-terracotta' : 'text-charcoal'}`} />
                </button>
              </div>

              <div className="flex flex-wrap gap-6 text-sm font-body text-charcoal/70 pt-6 border-t border-charcoal/10">
                <div className="flex items-center gap-x-2">
                  <Users className="w-5 h-5 text-terracotta" />
                  <span>{t('rooms.guests', { count: room.guestCount })}</span>
                </div>
                <div className="flex items-center gap-x-2">
                  <Star className="w-5 h-5 text-terracotta fill-terracotta" />
                  <span>{room.rating} {t('rooms.rating')}</span>
                </div>
              </div>

              <div className="my-8">
                <div className="flex items-baseline mb-2">
                  <span className="font-heading text-4xl text-teal">{room.price} {room.currency}</span>
                  <span className="text-sm uppercase tracking-widest text-charcoal/60 ms-2">{t('rooms.per_night')}</span>
                </div>
              </div>

              <div className="font-body text-charcoal/80 leading-relaxed space-y-4 mb-10">
                <p>{(room.longDescription as unknown as Record<string, string>)[currentLang] || (room.longDescription as unknown as Record<string, string>).en}</p>
              </div>

              <div className="mb-10">
                <h3 className="font-heading text-2xl text-teal mb-6">{t('rooms.amenities')}</h3>
                <div className="grid grid-cols-2 gap-y-4 gap-x-2 font-body text-sm text-charcoal/80">
                  {room.amenities.map((amenity, idx) => (
                    <div key={idx} className="flex items-center space-x-3">
                      <div className="text-terracotta-dark">
                        {amenityIconMap[amenity] || <Star className="w-5 h-5" />}
                      </div>
                      <span>{t(`rooms.amenities_list.${amenity.replace(/\s+/g, '_').toLowerCase()}`, { defaultValue: amenity })}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={() => setIsBookingModalOpen(true)}
                className="w-full py-4 bg-terracotta text-white font-body uppercase tracking-widest text-sm hover:bg-terracotta-dark transition-colors mt-auto"
              >
                {t('rooms.book_now')}
              </button>
            </div>
          </div>
        </motion.div>

        {/* You Might Also Like Section */}
        {similarRooms.length > 0 && (
          <div className="mt-32 border-t border-charcoal/10 pt-16">
            <h2 className="font-heading text-4xl text-teal mb-12 text-center">{t('rooms.similar')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {similarRooms.map(similarRoom => (
                <RoomCard key={similarRoom.id} room={similarRoom} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Booking Modal */}
      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        room={{ name: roomName, price: room.price, currency: room.currency, capacity: room.guestCount }}
      />
    </div>
  );
}
