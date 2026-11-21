import React from 'react';
import { Flame, Coins, Sparkles, Volume2, VolumeX, Bot, Shield, Zap } from 'lucide-react';
import { useGame } from '../../context/GameContext';
import { sound } from '../../utils/soundEffects';

export const Navbar = () => {
  const { user, updateUserProfile, openAITutor, rewardNotification } = useGame();

  const handleToggleSound = () => {
    const newState = sound.toggleSound();
    updateUserProfile({ soundEnabled: newState });
    if (newState) sound.playClick();
  };

  // Calculate XP towards next rank
  const getRankThreshold = (rank) => {
    switch (rank) {
      case 'Beginner': return { next: 'Explorer', currentMin: 0, nextMin: 400 };
      case 'Explorer': return { next: 'Problem Solver', currentMin: 400, nextMin: 1000 };
      case 'Problem Solver': return { next: 'Algorithm Master', currentMin: 1000, nextMin: 2000 };
      case 'Algorithm Master': return { next: 'DSA Champion', currentMin: 2000, nextMin: 3500 };
      default: return { next: 'MAX RANK', currentMin: 3500, nextMin: 5000 };
    }
  };

  const threshold = getRankThreshold(user.rankTitle);
  const progressPercent = Math.min(100, Math.max(0, ((user.xp - threshold.currentMin) / (threshold.nextMin - threshold.currentMin)) * 100));

  return (
    <header className="sticky top-0 z-40 w-full bg-slate-950/80 backdrop-blur-md border-b border-slate-800/80 px-4 lg:px-8 py-3">
      <div className="flex items-center justify-between gap-4">
        {/* Brand Logo & Title */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-purple-600 flex items-center justify-center text-xl shadow-[0_0_15px_rgba(6,182,212,0.4)]">
            ⚔️
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-gaming font-extrabold text-xl tracking-wider text-white">
                DSA <span className="text-cyan-400">QUEST</span>
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-950/90 text-cyan-300 border border-cyan-800/60 font-mono font-bold hidden sm:inline-block">
                v2.0 HUD
              </span>
            </div>
            <p className="text-[11px] font-mono text-slate-400 hidden sm:block">
              Learn It. Play It. Master It.
            </p>
          </div>
        </div>

        {/* Player Gamer Stats HUD */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* XP Progress Bar */}
          <div className="hidden md:flex flex-col w-40 lg:w-48 text-right font-mono">
            <div className="flex justify-between text-[11px] mb-1">
              <span className="text-cyan-300 font-bold">{user.rankTitle}</span>
              <span className="text-slate-400">{user.xp} / {threshold.nextMin} XP</span>
            </div>
            <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden border border-slate-700">
              <div
                className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Coins Pill */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-amber-500/30 font-mono text-xs font-bold text-amber-300 shadow-sm">
            <Coins className="w-4 h-4 text-amber-400" />
            <span>{user.coins}</span>
          </div>

          {/* Daily Streak Flame */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-rose-500/30 font-mono text-xs font-bold text-rose-400 shadow-sm">
            <Flame className="w-4 h-4 text-rose-500 animate-pulse" />
            <span>{user.streak}d</span>
          </div>

          {/* Ask AI Tutor Pill */}
          <button
            onClick={() => openAITutor()}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-cyan-600/20 to-blue-600/20 hover:from-cyan-600/30 hover:to-blue-600/30 border border-cyan-500/50 text-cyan-300 font-mono text-xs font-bold transition shadow-[0_0_12px_rgba(6,182,212,0.2)]"
          >
            <Bot className="w-4 h-4 text-cyan-400" />
            <span className="hidden sm:inline">AI Tutor</span>
          </button>

          {/* Sound Toggle */}
          <button
            onClick={handleToggleSound}
            className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 transition"
            title={user.soundEnabled ? 'Mute Sounds' : 'Enable Sounds'}
          >
            {user.soundEnabled ? (
              <Volume2 className="w-4 h-4 text-cyan-400" />
            ) : (
              <VolumeX className="w-4 h-4 text-slate-500" />
            )}
          </button>

          {/* Avatar Icon */}
          <div className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-700 flex items-center justify-center text-lg select-none">
            {user.avatar || '⚔️'}
          </div>
        </div>
      </div>

      {/* Floating Reward Toast Notification */}
      {rewardNotification && (
        <div className="fixed top-16 right-6 z-50 animate-bounce p-3 px-5 rounded-2xl bg-gradient-to-r from-cyan-950 via-slate-900 to-purple-950 border-2 border-cyan-400 text-cyan-200 font-mono font-bold text-sm shadow-[0_0_25px_rgba(6,182,212,0.6)] flex items-center gap-3">
          <Sparkles className="w-5 h-5 text-amber-400 animate-spin" />
          <span>{rewardNotification.text}</span>
        </div>
      )}
    </header>
  );
};
