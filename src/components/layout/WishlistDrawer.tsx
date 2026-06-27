import { motion, AnimatePresence } from 'motion/react';
import { X, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useWishlist } from '../../context/WishlistContext';
import roomsData from '../../data/rooms.json';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function WishlistDrawer({ isOpen, onClose }: WishlistDrawerProps) {
  const { state, removeFromWishlist } = useWishlist();

  const savedRooms = state.wishlistIds
    .map(id => roomsData.find(r => r.id === id))
    .filter((room): room is NonNullable<typeof room> => room !== undefined);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-charcoal/40 backdrop-blur-sm z-50"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
            className="fixed top-0 right-0 w-full max-w-md h-full bg-sand shadow-2xl z-50 flex flex-col overflow-hidden"
          >
            <div className="flex items-center justify-between p-6 border-b border-charcoal/10">
              <h2 className="font-heading text-2xl text-teal">Your Wishlist</h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-charcoal/5 rounded-full transition-colors text-charcoal/70"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div data-lenis-prevent className="flex-grow overflow-y-auto p-6 flex flex-col space-y-6">
              {savedRooms.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-charcoal/50 font-body space-y-4">
                  <HeartIconEmpty />
                  <p>Your wishlist is empty.</p>
                  <button
                    onClick={onClose}
                    className="text-terracotta underline hover:text-terracotta-dark"
                  >
                    Explore our rooms
                  </button>
                </div>
              ) : (
                savedRooms.map(room => (
                  <div key={room.id} className="flex bg-white rounded shadow-sm overflow-hidden group">
                    <div className="w-24 bg-charcoal/5 flex-shrink-0 flex items-center justify-center text-charcoal/20 text-[10px] uppercase font-body">
                      Image
                    </div>
                    <div className="p-4 flex-grow flex flex-col">
                      <div className="flex justify-between items-start">
                        <Link
                          to={`/room/${room.slug}`}
                          onClick={onClose}
                          className="font-heading text-lg text-teal hover:text-terracotta transition-colors line-clamp-1 mr-2"
                        >
                          {room.name}
                        </Link>
                        <button
                          onClick={() => removeFromWishlist(room.id)}
                          className="text-charcoal/40 hover:text-terracotta transition-colors shrink-0"
                          title="Remove"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="mt-auto pt-4 flex items-center justify-between font-body">
                        <div>
                          <span className="font-medium text-charcoal">{room.price} {room.currency}</span>
                        </div>
                        <Link
                          to={`/room/${room.slug}`}
                          onClick={onClose}
                          className="text-xs uppercase tracking-widest text-terracotta hover:text-terracotta-dark font-semibold"
                        >
                          View
                        </Link>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function HeartIconEmpty() {
  return (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="opacity-40">
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </svg>
  );
}
