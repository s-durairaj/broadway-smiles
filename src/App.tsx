import { Routes, Route } from 'react-router-dom';
import TopBar from './components/TopBar';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ChatBot from './components/ChatBot';
import Home from './pages/Home';
import About from './pages/About';
import GeneralDentistry from './pages/GeneralDentistry';
import ChildrensDentistry from './pages/ChildrensDentistry';
import DentalImplants from './pages/DentalImplants';
import EmergencyDental from './pages/EmergencyDental';
import Insurance from './pages/Insurance';
import FAQ from './pages/FAQ';
import Contact from './pages/Contact';

function App() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <TopBar />
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/general-dentistry" element={<GeneralDentistry />} />
          <Route path="/childrens-dentistry" element={<ChildrensDentistry />} />
          <Route path="/dental-implants" element={<DentalImplants />} />
          <Route path="/emergency-dental" element={<EmergencyDental />} />
          <Route path="/insurance" element={<Insurance />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
      <Footer />
      <ChatBot />
    </div>
  );
}

export default App;
