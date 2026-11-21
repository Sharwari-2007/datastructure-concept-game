import React, { useState } from 'react';
import { User, Volume2, VolumeX, Shield, Trash2, Award, Zap, Check, RotateCcw } from 'lucide-react';
import { useGame } from '../context/GameContext';
import { sound } from '../utils/soundEffects';

const AVATARS = ['⚔️', '🤖', '🧙‍♂️', '🚀', '🛡️', '⚡', '🐉', '🎯'];
const GOALS = ['College Exams', 'Interview Preparation', 'Complete DSA Mastery'];
const DIFFICULTIES = ['Beginner', 'Intermediate', 'Advanced'];

export const ProfileSettingsPage = () => {
  const { user, updateUserProfile, resetProgress, completedMissions, completedLevels } = useGame();
  const [username, setUsername] = useState(user.username || 'CyberKnight');
  const [showConfirmReset, setShowConfirmReset] = useState(false);

  const handleSaveUsername = (e) => {
    e.preventDefault();
    sound.playSuccess();
    updateUserProfile({ username });
  };

  const handleAvatarSelect = (avatar) => {
    sound.playClick();
    updateUserProfile({ avatar });
  };

  const handleToggleSound = () => {
    const newState = sound.toggleSound();
    updateUserProfile({ soundEnabled: newState });
    if (newState) sound.playClick();
  };

  return (
    <div className="p-4 sm:p-8 space-y-8 max-w-4xl mx-auto">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-gaming font-extrabold text-white flex items-center gap-2">
          <User className="w-7 h-7 text-cyan-400" /> Profile &amp; Battle Station Settings
        </h2>
        <p className="text-xs sm:text-sm font-mono text-slate-400 mt-1">
          Customize your player avatar, learning track, audio parameters, and persistent game data.
        </p>
      </div>

      {/* Main Settings Card */}
      <div className="cyber-panel p-6 sm:p-8 space-y-8">
        {/* Username & Avatar Form */}
        <form onSubmit={handleSaveUsername} className="space-y-4">
          <div>
            <label className="block text-xs font-mono font-bold text-cyan-400 mb-1">
              PLAYER USERNAME
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="flex-1 px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white font-mono text-sm focus:border-cyan-500 outline-none"
                required
              />
              <button type="submit" className="px-5 py-2.5 cyber-button-primary text-xs font-bold">
                Save
              </button>
            </div>
          </div>

          {/* Avatar Switcher */}
          <div>
            <label className="block text-xs font-mono font-bold text-cyan-400 mb-2">
              SELECT AVATAR
            </label>
            <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
              {AVATARS.map((av) => (
                <button
                  key={av}
                  type="button"
                  onClick={() => handleAvatarSelect(av)}
                  className={`h-12 rounded-xl text-2xl flex items-center justify-center border-2 transition ${
                    user.avatar === av
                      ? 'bg-cyan-500/20 border-cyan-400 scale-105 shadow-neon-cyan'
                      : 'bg-slate-950 border-slate-800 hover:border-slate-600'
                  }`}
                >
                  {av}
                </button>
              ))}
            </div>
          </div>
        </form>

        {/* Goal & Difficulty Preferences */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-800">
          <div>
            <label className="block text-xs font-mono font-bold text-cyan-400 mb-2">
              LEARNING GOAL
            </label>
            <div className="space-y-2">
              {GOALS.map((g) => (
                <button
                  key={g}
                  type="button"
                  onClick={() => { sound.playClick(); updateUserProfile({ goal: g }); }}
                  className={`w-full py-2.5 px-3 rounded-xl font-mono text-xs font-bold text-left transition border ${
                    user.goal === g
                      ? 'bg-purple-950 border-purple-500 text-purple-200'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  {g}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono font-bold text-cyan-400 mb-2">
              DIFFICULTY TIER
            </label>
            <div className="space-y-2">
              {DIFFICULTIES.map((d) => (
                <button
                  key={d}
                  type="button"
                  onClick={() => { sound.playClick(); updateUserProfile({ difficulty: d }); }}
                  className={`w-full py-2.5 px-3 rounded-xl font-mono text-xs font-bold text-left transition border ${
                    user.difficulty === d
                      ? 'bg-cyan-950 border-cyan-500 text-cyan-200'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Audio FX Setting */}
        <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
          <div>
            <span className="font-mono text-sm font-bold text-white block">Sound Effects</span>
            <span className="text-xs text-slate-400 font-mono">Synthesized Web Audio gaming feedback</span>
          </div>
          <button
            onClick={handleToggleSound}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-bold flex items-center gap-2 border transition ${
              user.soundEnabled
                ? 'bg-cyan-950 border-cyan-600 text-cyan-300'
                : 'bg-slate-950 border-slate-800 text-slate-500'
            }`}
          >
            {user.soundEnabled ? <Volume2 className="w-4 h-4 text-cyan-400" /> : <VolumeX className="w-4 h-4" />}
            <span>{user.soundEnabled ? 'Enabled' : 'Muted'}</span>
          </button>
        </div>

        {/* Danger Zone: Reset Progress */}
        <div className="pt-4 border-t border-slate-800 space-y-3">
          <span className="font-mono text-xs font-bold text-rose-400 block uppercase">
            Data Persistence Management
          </span>
          <p className="text-xs text-slate-400 font-mono">
            Clear all local storage saves, reset XP, unlocked worlds, and streak progress back to initial game state.
          </p>

          {!showConfirmReset ? (
            <button
              onClick={() => setShowConfirmReset(true)}
              className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-rose-950/60 border border-slate-800 hover:border-rose-700 text-rose-400 text-xs font-mono font-bold transition flex items-center gap-2"
            >
              <Trash2 className="w-4 h-4" /> Reset Game Data
            </button>
          ) : (
            <div className="p-4 rounded-xl bg-rose-950/50 border border-rose-600 space-y-3">
              <span className="text-xs font-mono text-rose-200 font-bold block">
                Are you sure you want to completely erase all progress?
              </span>
              <div className="flex gap-2 font-mono text-xs">
                <button
                  onClick={resetProgress}
                  className="px-4 py-2 rounded-lg bg-rose-600 text-white font-bold hover:bg-rose-500"
                >
                  Yes, Erase Everything
                </button>
                <button
                  onClick={() => setShowConfirmReset(false)}
                  className="px-4 py-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
