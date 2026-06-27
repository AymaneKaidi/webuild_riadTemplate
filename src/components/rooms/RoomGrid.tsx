import RoomCard from './RoomCard';

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
  if (rooms.length === 0) {
    return (
      <div className="py-20 text-center font-body text-charcoal/60">
        No rooms found in this category.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-8">
      {rooms.map(room => (
        <RoomCard key={room.id} room={room} />
      ))}
    </div>
  );
}
