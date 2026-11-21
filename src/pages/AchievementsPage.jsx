import React from 'react';
import { Award, CheckCircle2, Lock, Sparkles, Trophy, Zap, Coins } from 'lucide-react';
import { ACHIEVEMENTS } from '../data/achievementsData';
import { useGame } from '../context/GameContext';
import { sound } from '../utils/soundEffects';

export const AchievementsPage = () => {
  const { unlockedAchievements } = useGame();

  const getRarityBadge = (rarity) => {
    switch (rarity) {
      case 'Legendary': return 'bg-amber-950 border-amber-500 text-amber-300';
      case 'Epic': return 'bg-purple-950 border-purple-500 text-purple-300';
      case 'Rare': return 'bg-cyan-950 border-cyan-500 text-cyan-300';
      default: return 'bg-slate-800 border-slate-600 text-slate-300';
    }
  };

  return (
    <div className="p-4 sm:p-8 space-y-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-950/80 border border-amber-800 text-amber-300 font-mono text-xs font-bold uppercase">
          <Trophy className="w-3.5 h-3.5 text-amber-400" /> Trophy Vault
        </div>
        <h2 className="text-3xl sm:text-4xl font-gaming font-extrabold text-white">
          Achievement Badges &amp; Honors
        </h2>
        <p className="text-xs sm:text-sm font-mono text-slate-400 max-w-xl mx-auto">
          Prove your mastery across algorithm challenges, continuous streaks, flawless exams, and technical interview simulations.
        </p>
      </div>

      {/* Stats Overview */}
      <div className="flex items-center justify-center gap-6 font-mono text-xs">
        <div className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800">
          <span className="text-slate-400">Unlocked: </span>
          <span className="text-cyan-400 font-bold">{unlockedAchievements.length} / {ACHIEVEMENTS.length}</span>
        </div>
      </div>

      {/* Badges Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {ACHIEVEMENTS.map(ach => {
          const isUnlocked = unlockedAchievements.includes(ach.id);
          return (
            <div
              key={ach.id}
              className={`p-6 rounded-3xl border transition-all duration-300 flex flex-col justify-between ${
                isUnlocked
                  ? 'bg-slate-900/90 border-slate-800 shadow-lg shadow-cyan-500/10'
                  : 'bg-slate-950/40 border-slate-900 opacity-50'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold border ${getRarityBadge(ach.rarity)}`}>
                    {ach.rarity}
                  </span>
                  {isUnlocked ? (
                    <span className="text-emerald-400 font-mono text-xs font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4" /> Unlocked
                    </span>
                  ) : (
                    <span className="text-slate-500 font-mono text-xs flex items-center gap-1">
                      <Lock className="w-4 h-4" /> Locked
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl ${
                    isUnlocked ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/50' : 'bg-slate-950 text-slate-600 border border-slate-800'
                  }`}>
                    🏆
                  </div>
                  <div>
                    <h4 className="text-lg font-gaming font-bold text-white">
                      {ach.title}
                    </h4>
                    <span className="text-[10px] font-mono text-cyan-400 font-bold">
                      {ach.category}
                    </span>
                  </div>
                </div>

                <p className="text-xs text-slate-400 font-mono leading-relaxed">
                  {ach.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between font-mono text-xs">
                <span className="text-cyan-400 font-bold flex items-center gap-1">
                  <Zap className="w-3.5 h-3.5" /> +{ach.xp} XP
                </span>
                <span className="text-amber-400 font-bold flex items-center gap-1">
                  <Coins className="w-3.5 h-3.5" /> +{ach.coins} Coins
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
