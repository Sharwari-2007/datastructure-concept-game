import React, { useState } from 'react';
import {
  LayoutDashboard,
  Map,
  BookOpen,
  Gamepad2,
  Cpu,
  GraduationCap,
  Briefcase,
  History,
  Trophy,
  Award,
  User,
  Zap,
  Terminal,
  Menu,
  X
} from 'lucide-react';
import { useGame } from '../../context/GameContext';
import { sound } from '../../utils/soundEffects';

const NAV_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'map', label: 'Adventure Map', icon: Map },
  { id: 'learn', label: 'Learn Hub', icon: BookOpen },
  { id: 'visualizer-lab', label: 'Visualizer Lab', icon: Cpu },
  { id: 'challenges', label: 'Play Challenges', icon: Gamepad2 },
  { id: 'code-lab', label: 'Code Lab', icon: Terminal },
  { id: 'exam-arena', label: 'Exam Arena', icon: GraduationCap },
  { id: 'interview-arena', label: 'Interview Arena', icon: Briefcase },
  { id: 'revision', label: 'Revision Center', icon: History },
  { id: 'achievements', label: 'Achievements', icon: Award },
  { id: 'leaderboard', label: 'Leaderboard', icon: Trophy },
  { id: 'profile', label: 'Profile & Settings', icon: User },
];

export const Sidebar = () => {
  const { activeTab, setActiveTab } = useGame();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNav = (tabId) => {
    sound.playClick();
    setActiveTab(tabId);
    setMobileMenuOpen(false);
  };

  const primaryMobileTabs = [
    { id: 'dashboard', label: 'Home', icon: LayoutDashboard },
    { id: 'map', label: 'Map', icon: Map },
    { id: 'learn', label: 'Learn', icon: BookOpen },
    { id: 'code-lab', label: 'Code', icon: Terminal },
  ];

  const isMoreActive = !primaryMobileTabs.some(t => t.id === activeTab);

  return (
    <>
      {/* Desktop Left Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 bg-slate-950/90 border-r border-slate-800/80 p-4 shrink-0 min-h-[calc(100vh-65px)] justify-between">
        <div className="space-y-1.5">
          <div className="text-[11px] font-mono uppercase tracking-wider text-slate-500 px-3 mb-2 font-bold">
            Main Terminal
          </div>
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNav(item.id)}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-mono text-xs font-semibold transition-all duration-200 ${
                  isActive
                    ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/10 text-cyan-300 border border-cyan-500/40 shadow-[0_0_15px_rgba(6,182,212,0.2)]'
                    : 'text-slate-400 hover:text-slate-100 hover:bg-slate-900 border border-transparent'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-cyan-400' : 'text-slate-500'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* Cyber bottom card */}
        <div className="p-3 rounded-2xl bg-gradient-to-br from-cyan-950/40 to-slate-900 border border-cyan-800/40 text-xs font-mono space-y-1 text-slate-400">
          <div className="flex items-center gap-1.5 text-cyan-300 font-bold">
            <Zap className="w-3.5 h-3.5 text-amber-400" /> Pro Tips
          </div>
          <p className="text-[11px] leading-relaxed text-slate-400">
            Revisit visualizers step-by-step before answering timed challenges to earn double XP!
          </p>
        </div>
      </aside>

      {/* Mobile Drawer (When More is clicked) */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex flex-col justify-end animate-fadeIn">
          <div className="bg-slate-900 border-t border-cyan-500/30 rounded-t-3xl p-6 max-h-[80vh] overflow-y-auto space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <span className="font-gaming font-bold text-sm text-cyan-400 uppercase tracking-wider flex items-center gap-2">
                <Menu className="w-4 h-4" /> All Game Navigation
              </span>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-1 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              {NAV_ITEMS.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNav(item.id)}
                    className={`flex items-center gap-2.5 p-3 rounded-xl font-mono text-xs font-bold text-left transition ${
                      isActive
                        ? 'bg-cyan-950 border border-cyan-500 text-cyan-300'
                        : 'bg-slate-950/80 border border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isActive ? 'text-cyan-400' : 'text-slate-400'}`} />
                    <span className="truncate">{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Mobile Bottom Navigation Bar */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-slate-950/95 backdrop-blur-lg border-t border-slate-800 px-3 py-2 flex items-center justify-between">
        {primaryMobileTabs.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => handleNav(item.id)}
              className={`flex flex-col items-center py-1 px-2 rounded-lg text-[10px] font-mono transition ${
                isActive ? 'text-cyan-400 font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Icon className="w-5 h-5 mb-0.5" />
              <span>{item.label}</span>
            </button>
          );
        })}

        {/* More Menu Button */}
        <button
          onClick={() => {
            sound.playClick();
            setMobileMenuOpen(true);
          }}
          className={`flex flex-col items-center py-1 px-2 rounded-lg text-[10px] font-mono transition ${
            isMoreActive ? 'text-cyan-400 font-bold' : 'text-slate-400 hover:text-white'
          }`}
        >
          <Menu className="w-5 h-5 mb-0.5" />
          <span>More...</span>
        </button>
      </nav>
    </>
  );
};
