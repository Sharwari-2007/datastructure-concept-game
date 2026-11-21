import React from 'react';
import { Map, Lock, CheckCircle2, Star, ArrowRight, Shield, Zap, Sparkles } from 'lucide-react';
import { useGame } from '../context/GameContext';
import { WORLDS } from '../data/worldsData';
import { sound } from '../utils/soundEffects';

export const AdventureMap = () => {
  const { unlockedWorlds, completedLevels, setSelectedWorldId, setActiveTab } = useGame();

  const handleSelectWorld = (worldId) => {
    if (!unlockedWorlds.includes(worldId)) {
      sound.playError();
      return;
    }
    sound.playClick();
    setSelectedWorldId(worldId);
    setActiveTab('world-detail');
  };

  return (
    <div className="p-4 sm:p-8 space-y-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-800 text-cyan-300 font-mono text-xs font-bold uppercase">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" /> RPG Adventure Map
        </div>
        <h2 className="text-3xl sm:text-4xl font-gaming font-extrabold text-white">
          The 8 Realms of Data Structures
        </h2>
        <p className="text-xs sm:text-sm font-mono text-slate-400 max-w-xl mx-auto">
          Traverse the connected archipelago. Complete each realm’s missions to breach firewalls and unlock advanced kingdoms!
        </p>
      </div>

      {/* Connected Path Map */}
      <div className="relative py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {WORLDS.map((world, idx) => {
            const isUnlocked = unlockedWorlds.includes(world.id);
            const worldLevels = world.levels;
            const completedInThisWorld = worldLevels.filter(lvl => completedLevels.includes(lvl.id)).length;
            const isFullyCompleted = completedInThisWorld === worldLevels.length;

            return (
              <div
                key={world.id}
                onClick={() => handleSelectWorld(world.id)}
                className={`relative rounded-3xl p-6 border transition-all duration-300 flex flex-col justify-between overflow-hidden ${
                  isUnlocked
                    ? 'bg-slate-900/80 border-slate-800 hover:border-cyan-400/60 hover:shadow-neon-cyan hover:-translate-y-1.5 cursor-pointer'
                    : 'bg-slate-950/40 border-slate-900 opacity-60 cursor-not-allowed'
                }`}
              >
                {/* Background Accent Glow */}
                <div
                  className="absolute -top-16 -right-16 w-36 h-36 rounded-full blur-2xl pointer-events-none opacity-30"
                  style={{ backgroundColor: world.accentColor }}
                />

                <div className="space-y-4">
                  {/* Top Badge & Lock Status */}
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-cyan-300">
                      {world.tag}
                    </span>
                    {isUnlocked ? (
                      isFullyCompleted ? (
                        <span className="flex items-center gap-1 text-xs font-mono font-bold text-amber-400">
                          <Star className="w-3.5 h-3.5 fill-current" /> Mastered
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-xs font-mono font-bold text-emerald-400">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Unlocked
                        </span>
                      )
                    ) : (
                      <span className="flex items-center gap-1 text-xs font-mono text-slate-500">
                        <Lock className="w-3.5 h-3.5" /> Locked
                      </span>
                    )}
                  </div>

                  {/* World Info */}
                  <div>
                    <h3 className="text-xl font-gaming font-bold text-white mb-1">
                      {world.name}
                    </h3>
                    <p className="text-xs font-mono text-cyan-400 mb-2">
                      {world.subtitle}
                    </p>
                    <p className="text-xs text-slate-400 leading-relaxed line-clamp-3">
                      {world.description}
                    </p>
                  </div>
                </div>

                {/* Progress Footer */}
                <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono">
                  <div className="flex items-center gap-2">
                    <div className="w-16 h-1.5 rounded-full bg-slate-800 overflow-hidden">
                      <div
                        className="h-full bg-cyan-400 rounded-full"
                        style={{ width: `${(completedInThisWorld / worldLevels.length) * 100}%` }}
                      />
                    </div>
                    <span className="text-slate-400 text-[11px]">
                      {completedInThisWorld} / {worldLevels.length} Levels
                    </span>
                  </div>

                  {isUnlocked && (
                    <span className="text-cyan-300 font-bold flex items-center gap-1">
                      Enter ➔
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
