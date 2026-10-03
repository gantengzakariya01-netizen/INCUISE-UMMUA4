import React, { useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { soundEffects } from '../../utils/soundEffects';

export const SoundToggle: React.FC = () => {
  const [enabled, setEnabled] = useState(soundEffects.getEnabled());

  const handleToggle = () => {
    const newState = soundEffects.toggle();
    setEnabled(newState);
  };

  return (
    <button
      onClick={handleToggle}
      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border transition-all text-xs font-semibold ${
        enabled
          ? 'bg-[#ff8c00]/20 border-[#ff8c00] text-[#ff8c00] shadow-[0_0_15px_rgba(255,140,0,0.3)]'
          : 'bg-white/5 border-white/10 text-white/50 hover:text-white/80'
      }`}
      title={enabled ? 'Matikan Suara (Sound OFF)' : 'Nyalakan Efek Suara (Sound ON)'}
    >
      {enabled ? (
        <>
          <Volume2 className="w-3.5 h-3.5 animate-pulse" />
          <span className="hidden xl:inline text-[11px] font-mono tracking-wider">SOUND ON</span>
        </>
      ) : (
        <>
          <VolumeX className="w-3.5 h-3.5" />
          <span className="hidden xl:inline text-[11px] font-mono tracking-wider">SOUND OFF</span>
        </>
      )}
    </button>
  );
};
