import Hero from '../components/home/Hero';
import Testimonials from '../components/home/Testimonials';
import RoomGrid from '../components/rooms/RoomGrid';
import roomsData from '../data/rooms.json';

export default function Home() {
  const featuredRooms = roomsData.filter(room => room.featured);

  return (
    <div className="min-h-screen bg-sand text-charcoal flex flex-col">
      <Hero />
      
      <section className="py-24 px-6 max-w-7xl mx-auto w-full">
        <div className="text-center mb-16">
          <h2 className="font-heading text-4xl text-teal mb-4">Our Signature Rooms</h2>
          <p className="font-body text-terracotta-dark italic">Experience authentic luxury in our carefully curated suites.</p>
        </div>
        
        <RoomGrid rooms={featuredRooms} />
        
        <div className="mt-16 text-center">
          <a href="/rooms" className="inline-block px-8 py-3 border-2 border-terracotta text-terracotta font-body uppercase tracking-widest text-sm hover:bg-terracotta hover:text-white transition-colors">
            View All Accommodations
          </a>
        </div>
      </section>

      <Testimonials />
    </div>
  );
}
