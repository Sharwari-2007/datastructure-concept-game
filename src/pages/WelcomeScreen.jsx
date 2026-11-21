import React, { useState } from 'react';
import { Play, HelpCircle, Info, Sparkles, Check, ArrowRight, Shield, Award, Terminal, Zap } from 'lucide-react';
import { sound } from '../utils/soundEffects';
import { triggerCelebration } from '../utils/confetti';
import { useGame } from '../context/GameContext';

const AVATARS = ['⚔️', '🤖', '🧙‍♂️', '🚀', '🛡️', '⚡', '🐉', '🎯'];
const DIFFICULTIES = ['Beginner', 'Intermediate', 'Advanced'];
const GOALS = ['College Exams', 'Interview Preparation', 'Complete DSA Mastery'];

export const WelcomeScreen = () => {
  const { user, updateUserProfile, setActiveTab, addXP, addCoins } = useGame();
  const [showHowToPlay, setShowHowToPlay] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
  const [showSetup, setShowSetup] = useState(false);
  const [showTutorialMission, setShowTutorialMission] = useState(false);

  // Setup Form State
  const [username, setUsername] = useState(user.username || 'CyberKnight');
  const [selectedAvatar, setSelectedAvatar] = useState(user.avatar || '⚔️');
  const [selectedDifficulty, setSelectedDifficulty] = useState(user.difficulty || 'Beginner');
  const [selectedGoal, setSelectedGoal] = useState(user.goal || 'Complete DSA Mastery');

  // Tutorial Mission State
  const [tutorialAnswer, setTutorialAnswer] = useState(null);
  const [tutorialCompleted, setTutorialCompleted] = useState(false);

  const handleStartClick = () => {
    sound.playClick();
    setShowSetup(true);
  };

  const handleSaveSetupAndContinue = (e) => {
    e.preventDefault();
    sound.playSuccess();
    updateUserProfile({
      username,
      avatar: selectedAvatar,
      difficulty: selectedDifficulty,
      goal: selectedGoal
    });
    setShowSetup(false);
    setShowTutorialMission(true);
  };

  const handleTutorialSubmit = (answer) => {
    setTutorialAnswer(answer);
    if (answer === 0) {
      sound.playSuccess();
      triggerCelebration();
      setTutorialCompleted(true);
      addXP(50, 'Completed Tutorial Mission');
      addCoins(20);
    } else {
      sound.playError();
    }
  };

  const handleEnterMainGame = () => {
    sound.playLevelUp();
    triggerCelebration();
    setActiveTab('dashboard');
  };

  return (
    <div className="relative min-h-[calc(100vh-65px)] flex flex-col items-center justify-center p-4 sm:p-8 overflow-hidden cyber-grid">
      {/* Background Neon Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none animate-float"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none animate-float" style={{ animationDelay: '1.5s' }}></div>

      {/* Main Hero Card */}
      <div className="relative z-10 max-w-3xl w-full text-center space-y-8 p-6 sm:p-12 rounded-3xl bg-slate-900/80 backdrop-blur-xl border border-cyan-500/30 shadow-[0_0_50px_rgba(6,182,212,0.15)]">
        {/* Title & Tagline */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 font-mono text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" /> The Ultimate Gamified Learning Experience
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold font-gaming tracking-wide text-white">
            DSA <span className="text-gradient-cyan">QUEST</span>
          </h1>
          <p className="text-lg sm:text-2xl font-gaming font-semibold text-cyan-400 tracking-wide">
            Master the Logic, Conquer the Code
          </p>
          <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto leading-relaxed">
            Level up your algorithmic instincts through 8 interactive worlds, real-time data structure visualizers, combat mini-games, college exam prep, and simulated technical interview rounds!
          </p>
        </div>

        {/* Feature Highlights Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-left">
          <div className="p-3 rounded-2xl bg-slate-950/70 border border-slate-800 text-xs font-mono">
            <span className="text-cyan-400 font-bold block text-base mb-0.5">8 Major Worlds</span>
            <span className="text-slate-400 text-[11px]">Arrays to Graphs &amp; DP</span>
          </div>
          <div className="p-3 rounded-2xl bg-slate-950/70 border border-slate-800 text-xs font-mono">
            <span className="text-purple-400 font-bold block text-base mb-0.5">Live Visualizers</span>
            <span className="text-slate-400 text-[11px]">Step-by-step algorithms</span>
          </div>
          <div className="p-3 rounded-2xl bg-slate-950/70 border border-slate-800 text-xs font-mono">
            <span className="text-emerald-400 font-bold block text-base mb-0.5">Exam Arena</span>
            <span className="text-slate-400 text-[11px]">2M, 5M, 10M &amp; Mock Tests</span>
          </div>
          <div className="p-3 rounded-2xl bg-slate-950/70 border border-slate-800 text-xs font-mono">
            <span className="text-amber-400 font-bold block text-base mb-0.5">FAANG Rounds</span>
            <span className="text-slate-400 text-[11px]">5 Simulated Interviews</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          <button
            onClick={handleStartClick}
            className="w-full sm:w-auto px-8 py-4 cyber-button-primary text-base font-gaming uppercase tracking-wider flex items-center justify-center gap-3 group"
          >
            <Play className="w-5 h-5 fill-current" />
            <span>START GAME</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
          </button>

          <button
            onClick={() => { sound.playClick(); setShowHowToPlay(true); }}
            className="w-full sm:w-auto px-6 py-4 cyber-button-secondary text-sm font-mono flex items-center justify-center gap-2"
          >
            <HelpCircle className="w-4 h-4 text-cyan-400" />
            <span>HOW TO PLAY</span>
          </button>

          <button
            onClick={() => { sound.playClick(); setShowAbout(true); }}
            className="w-full sm:w-auto px-6 py-4 cyber-button-secondary text-sm font-mono flex items-center justify-center gap-2"
          >
            <Info className="w-4 h-4 text-purple-400" />
            <span>LEARN ABOUT GAME</span>
          </button>
        </div>
      </div>

      {/* MODAL 1: PLAYER SETUP */}
      {showSetup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
          <div className="w-full max-w-lg bg-slate-900 border border-cyan-500/50 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
            <div className="text-center space-y-1">
              <h3 className="text-2xl font-gaming font-bold text-white">Initialize Player Profile</h3>
              <p className="text-xs text-slate-400 font-mono">Configure your avatar and learning preferences.</p>
            </div>

            <form onSubmit={handleSaveSetupAndContinue} className="space-y-4">
              {/* Username */}
              <div>
                <label className="block text-xs font-mono font-bold text-cyan-400 mb-1">
                  PLAYER CODENAME
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white font-mono text-sm focus:border-cyan-500 outline-none"
                  required
                />
              </div>

              {/* Avatar Picker */}
              <div>
                <label className="block text-xs font-mono font-bold text-cyan-400 mb-2">
                  CHOOSE AVATAR
                </label>
                <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
                  {AVATARS.map((av) => (
                    <button
                      key={av}
                      type="button"
                      onClick={() => { setSelectedAvatar(av); sound.playClick(); }}
                      className={`h-12 rounded-xl text-2xl flex items-center justify-center border-2 transition ${
                        selectedAvatar === av
                          ? 'bg-cyan-500/20 border-cyan-400 scale-105 shadow-neon-cyan'
                          : 'bg-slate-950 border-slate-800 hover:border-slate-600'
                      }`}
                    >
                      {av}
                    </button>
                  ))}
                </div>
              </div>

              {/* Difficulty */}
              <div>
                <label className="block text-xs font-mono font-bold text-cyan-400 mb-1">
                  DIFFICULTY TIER
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {DIFFICULTIES.map((diff) => (
                    <button
                      key={diff}
                      type="button"
                      onClick={() => { setSelectedDifficulty(diff); sound.playClick(); }}
                      className={`py-2 rounded-xl font-mono text-xs font-bold transition border ${
                        selectedDifficulty === diff
                          ? 'bg-cyan-600 text-slate-950 border-cyan-400'
                          : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
                      }`}
                    >
                      {diff}
                    </button>
                  ))}
                </div>
              </div>

              {/* Learning Goal */}
              <div>
                <label className="block text-xs font-mono font-bold text-cyan-400 mb-1">
                  PRIMARY LEARNING GOAL
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {GOALS.map((g) => (
                    <button
                      key={g}
                      type="button"
                      onClick={() => { setSelectedGoal(g); sound.playClick(); }}
                      className={`py-2 px-2 text-center rounded-xl font-mono text-[11px] font-bold transition border ${
                        selectedGoal === g
                          ? 'bg-purple-600 text-white border-purple-400'
                          : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
                      }`}
                    >
                      {g}
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 cyber-button-primary text-sm font-gaming uppercase tracking-wider mt-4"
              >
                Proceed to Tutorial Mission ➔
              </button>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: PLAYABLE TUTORIAL MISSION */}
      {showTutorialMission && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
          <div className="w-full max-w-xl bg-slate-900 border border-cyan-500 rounded-3xl p-6 sm:p-8 space-y-6 shadow-[0_0_40px_rgba(6,182,212,0.3)]">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <span className="text-[10px] font-mono font-bold text-cyan-400 uppercase tracking-widest block">
                  TUTORIAL MISSION 01
                </span>
                <h3 className="text-xl font-gaming font-bold text-white">Array Access Calibration</h3>
              </div>
              <span className="px-3 py-1 rounded-full bg-cyan-950 border border-cyan-700 text-xs font-mono text-cyan-300 font-bold">
                +50 XP
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-mono">
              In an array <span className="text-cyan-400 font-bold">[10, 20, 30, 40, 50]</span> with Base Address 1000 and 4-byte integers, what is the exact index of the first element <span className="text-white font-bold">10</span>?
            </p>

            <div className="flex justify-center gap-3 py-2 font-mono">
              {[10, 20, 30, 40, 50].map((v, i) => (
                <div key={i} className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-xl bg-slate-950 border border-slate-700 flex items-center justify-center font-bold text-sm text-cyan-300">
                    {v}
                  </div>
                  <span className="text-[10px] text-slate-500 mt-1">[{i}]</span>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-3">
              {[
                { label: 'Index 0 (Zero-based)', val: 0 },
                { label: 'Index 1 (One-based)', val: 1 }
              ].map(opt => (
                <button
                  key={opt.val}
                  onClick={() => handleTutorialSubmit(opt.val)}
                  disabled={tutorialCompleted}
                  className={`py-3 px-4 rounded-xl font-mono text-xs font-bold border transition ${
                    tutorialAnswer === opt.val
                      ? opt.val === 0
                        ? 'bg-emerald-600 border-emerald-400 text-white'
                        : 'bg-rose-600 border-rose-400 text-white'
                      : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-cyan-500'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>

            {tutorialCompleted ? (
              <div className="space-y-4 pt-2">
                <div className="p-3.5 rounded-xl bg-emerald-950/70 border border-emerald-500 text-xs font-mono text-emerald-300 leading-relaxed">
                  🎉 Brilliant! Standard programming languages use zero-based indexing because the index directly represents the displacement offset from the base memory address: Base + (0 * 4) = Base!
                </div>
                <button
                  onClick={handleEnterMainGame}
                  className="w-full py-3.5 cyber-button-primary text-sm font-gaming uppercase tracking-wider"
                >
                  Enter Main Game Dashboard ⚔️
                </button>
              </div>
            ) : (
              <p className="text-[11px] text-slate-500 text-center font-mono">
                Click the correct answer above to calibrate your neuro-link and unlock the dashboard!
              </p>
            )}
          </div>
        </div>
      )}

      {/* MODAL 3: HOW TO PLAY */}
      {showHowToPlay && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
          <div className="w-full max-w-2xl bg-slate-900 border border-cyan-500/50 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <h3 className="text-2xl font-gaming font-bold text-cyan-400 flex items-center gap-2">
                <HelpCircle className="w-6 h-6" /> How to Play DSA Quest
              </h3>
              <button
                onClick={() => { sound.playClick(); setShowHowToPlay(false); }}
                className="text-slate-400 hover:text-white font-mono text-xs"
              >
                [CLOSE]
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono text-slate-300">
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <span className="text-cyan-400 font-bold block text-sm">1. Select a World</span>
                <p className="text-slate-400">
                  Begin at Array Kingdom. Complete missions to unlock Linked List Land, Stack/Queue Dungeon, Trees, Graphs and more.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <span className="text-purple-400 font-bold block text-sm">2. Use Real Visualizers</span>
                <p className="text-slate-400">
                  Step through actual underlying algorithmic operations: observe memory shifts, pointer swaps, and call stacks.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <span className="text-emerald-400 font-bold block text-sm">3. Earn XP &amp; Coins</span>
                <p className="text-slate-400">
                  10 XP for MCQs, 25 XP for Mini-Games, 50 XP for Level Missions, and 30 XP for Daily Quests. Climb from Beginner to DSA Champion!
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <span className="text-amber-400 font-bold block text-sm">4. Exam &amp; Interview Arenas</span>
                <p className="text-slate-400">
                  Practice 2-mark definitions, 5-mark algorithms, 10-mark proofs, and 5 rounds of simulated technical interview challenges.
                </p>
              </div>
            </div>

            <button
              onClick={() => { sound.playClick(); setShowHowToPlay(false); handleStartClick(); }}
              className="w-full py-3 cyber-button-primary text-xs font-bold uppercase tracking-wider"
            >
              Start Game Now
            </button>
          </div>
        </div>
      )}

      {/* MODAL 4: ABOUT THE GAME */}
      {showAbout && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
          <div className="w-full max-w-xl bg-slate-900 border border-purple-500/50 rounded-3xl p-6 sm:p-8 space-y-5 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-xl font-gaming font-bold text-purple-400 flex items-center gap-2">
                <Info className="w-5 h-5" /> About DSA Quest
              </h3>
              <button
                onClick={() => { sound.playClick(); setShowAbout(false); }}
                className="text-slate-400 hover:text-white font-mono text-xs"
              >
                [CLOSE]
              </button>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-mono">
              DSA Quest was engineered to transform abstract computer science concepts into vivid, interactive gaming encounters. Instead of passive rote memorization, learners manipulate pointers, trace memory cells, debug edge cases, and conquer university exams and FAANG interview rounds through intuitive gameplay.
            </p>
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-slate-400 space-y-1">
              <div><strong className="text-cyan-300">Stack:</strong> React, Vite, Tailwind CSS, Web Audio API</div>
              <div><strong className="text-purple-300">Persistence:</strong> HTML5 LocalStorage with live state restoration</div>
              <div><strong className="text-emerald-300">Engine:</strong> Pure JavaScript algorithmic execution state machines</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
