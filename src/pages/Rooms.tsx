import { useState } from 'react';
import FilterBar from '../components/rooms/FilterBar';
import RoomGrid from '../components/rooms/RoomGrid';
import roomsData from '../data/rooms.json';
import { useTranslation } from 'react-i18next';

export default function Rooms() {
  const [activeCategory, setActiveCategory] = useState('all');
  const { t } = useTranslation();

  const CATEGORIES = [
    { id: 'all', label: t('rooms.categories.all') },
    { id: 'suites', label: t('rooms.categories.suites') },
    { id: 'riad-rooms', label: t('rooms.categories.riad_rooms') },
    { id: 'garden-pool-view', label: t('rooms.categories.garden_pool_view') },
  ];

  const filteredRooms = activeCategory === 'all' 
    ? roomsData 
    : roomsData.filter(room => room.category === activeCategory);

  return (
    <div className="min-h-screen bg-sand text-charcoal pt-24">
      <div className="max-w-7xl mx-auto px-6 py-12 text-center">
        <h1 className="font-heading text-5xl md:text-6xl text-teal mb-6">{t('rooms.page_title')}</h1>
        <p className="font-body text-lg max-w-2xl mx-auto italic text-terracotta-dark">
          {t('rooms.page_subtitle')}
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
