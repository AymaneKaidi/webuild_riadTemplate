import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import Rooms from './pages/Rooms';
import RoomDetailPage from './pages/RoomDetailPage';
import './index.css';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen font-body antialiased bg-sand text-charcoal">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/rooms" element={<Rooms />} />
            <Route path="/room/:slug" element={<RoomDetailPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
