import { useRef, useEffect } from 'react';
import RoomCard from './RoomCard';
import gsap from 'gsap';

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

export default function RoomGrid({ rooms }: { rooms: Room[] }) {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      if (!gridRef.current) return;
      const cards = gridRef.current.children;
      
      gsap.from(cards, {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: gridRef.current,
          start: 'top 85%',
          once: true,
        },
      });
    }, gridRef);

    return () => ctx.revert();
  }, [rooms]);

  if (rooms.length === 0) {
    return (
      <div className="py-20 text-center font-body text-charcoal/60">
        No rooms found in this category.
      </div>
    );
  }

  return (
    <div ref={gridRef} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
      {rooms.map((room) => (
        <RoomCard key={room.id} room={room} />
      ))}
    </div>
  );
}
