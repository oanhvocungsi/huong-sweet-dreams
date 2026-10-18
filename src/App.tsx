import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { InvitationModal } from './components/InvitationModal';
import { HeroScene } from './components/HeroScene';
import { GreetingEditorial } from './components/GreetingEditorial';
import { DessertSurpriseBox } from './components/DessertSurpriseBox';
import { SweetnessGenerator } from './components/SweetnessGenerator';
import { ChillLounge } from './components/ChillLounge';
import { ClosingScene } from './components/ClosingScene';
import { AudioPlayerFloating } from './components/AudioPlayerFloating';

export function App() {
  const [isInvitationOpen, setIsInvitationOpen] = useState(true);

  const handleOpenExperience = () => {
    setIsInvitationOpen(false);
  };

  const handleReplay = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => {
      setIsInvitationOpen(true);
    }, 400);
  };

  return (
    <div className="relative min-h-screen text-[#2A1728] selection:bg-[#FFA4BD] selection:text-[#2A1728]">
      {/* Opening Invitation Modal (Scene A) */}
      <InvitationModal
        isOpen={isInvitationOpen}
        onOpenExperience={handleOpenExperience}
      />

      {/* Main Top Navigation */}
      <Navbar />

      {/* Main Interactive Sections */}
      <main>
        {/* Scene B: Hero Patisserie World */}
        <HeroScene />

        {/* Scene C: Personalized Editorial Greeting with Huong's Photo */}
        <GreetingEditorial />

        {/* Scene D: The Dessert Surprise Patisserie Box */}
        <DessertSurpriseBox />

        {/* Scene E: Sweetness Generator Machine */}
        <SweetnessGenerator />

        {/* Scene F: Chill Beats Turntable Lounge */}
        <ChillLounge />
      </main>

      {/* Scene G: Closing Scene & Memory Keepsake */}
      <ClosingScene onReplay={handleReplay} />

      {/* Floating Audio Player & Real-time Visualizer */}
      <AudioPlayerFloating />
    </div>
  );
}

export default App;
