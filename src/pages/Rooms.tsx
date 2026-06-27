import { useState } from 'react';
import FilterBar from '../components/rooms/FilterBar';
import RoomGrid from '../components/rooms/RoomGrid';
import roomsData from '../data/rooms.json';

const CATEGORIES = [
  { id: 'all', label: 'All Accommodations' },
  { id: 'suites', label: 'Luxury Suites' },
  { id: 'riad-rooms', label: 'Riad Rooms' },
  { id: 'garden-pool-view', label: 'Garden & Pool View' },
];

export default function Rooms() {
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredRooms = activeCategory === 'all' 
    ? roomsData 
    : roomsData.filter(room => room.category === activeCategory);

  return (
    <div className="min-h-screen bg-sand text-charcoal pt-24">
      <div className="max-w-7xl mx-auto px-6 py-12 text-center">
        <h1 className="font-heading text-5xl md:text-6xl text-teal mb-6">Our Accommodations</h1>
        <p className="font-body text-lg max-w-2xl mx-auto italic text-terracotta-dark">
          Discover your perfect sanctuary. Each room is uniquely designed with authentic Moroccan craftsmanship and modern comforts.
        </p>
      </div>

      <div className="bg-white border-y border-charcoal/5">
        <div className="max-w-7xl mx-auto px-6">
          <FilterBar 
            categories={CATEGORIES} 
            activeCategory={activeCategory} 
            onSelectCategory={setActiveCategory} 
          />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16">
        <RoomGrid rooms={filteredRooms} />
      </div>
    </div>
  );
}
